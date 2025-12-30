/**
 * Calculation Engine v1 (Real Calculation Pipeline)
 * [L=1] Lunar/Solar Conversion
 * [T=1] True Solar Time Correction
 */
import { toSolar, toLunar } from "kor-lunar";

export interface AstroInput {
    birthDate: string; // YYYY-MM-DD
    birthTime: string | null; // HH:mm
    timeUnknown: boolean;
    sex: 'male' | 'female';
    calendar: 'solar' | 'lunar';
    isLeapMonth?: boolean;
    timezone: string;
}

export interface Pillar {
    stem: string;
    branch: string;
    label: string;
}

export interface AstroCalculationV1 {
    algorithmVersion: string;
    schemaVersion: string;
    computedAt: string;
    normalization: {
        originalDate: string;
        isLeapMonth: boolean;
        solarDate: string;
        solarYMD: { y: number; m: number; d: number };
    };
    forensicTime?: {
        localTime: string | null;
        equationOfTimeMin: number;
        longitudeOffsetMin: number;
        totalOffsetMin: number;
        trueSolarHHmm: string;
        dayShift: number; // -1, 0, 1
        classification: string; // "야자시", "조자시", "일반" 등
    };
    pillars: {
        year: Pillar;
        month: Pillar;
        day: Pillar;
        hour: Pillar | null;
    };
    warnings: string[];
}

const STEMS = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
const BRANCHES = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];

function getEquationOfTime(date: Date): number {
    const startOfYear = new Date(date.getFullYear(), 0, 0);
    const diff = date.getTime() - startOfYear.getTime();
    const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));

    const b = (360 / 365.24) * (dayOfYear - 81) * (Math.PI / 180);
    const eot = 9.87 * Math.sin(2 * b) - 7.53 * Math.cos(b) - 1.5 * Math.sin(b);
    return parseFloat(eot.toFixed(2));
}

export const calculateV1 = (input: AstroInput): AstroCalculationV1 => {
    const warnings: string[] = [];
    const [year, month, day] = input.birthDate.split('-').map(Number);

    // 1. [L=1] Lunar/Solar Normalization
    let solarYMD: { year: number; month: number; day: number };

    if (input.calendar === 'lunar') {
        const converted = toSolar(year, month, day, input.isLeapMonth || false);
        solarYMD = { year: converted.year, month: converted.month, day: converted.day };
    } else {
        solarYMD = { year, month, day };
    }

    const solarDateStr = `${solarYMD.year}-${String(solarYMD.month).padStart(2, '0')}-${String(solarYMD.day).padStart(2, '0')}`;
    const solarDateObj = new Date(solarDateStr);

    // 2. [T=1] True Solar Time Correction
    let forensic: AstroCalculationV1['forensicTime'] | undefined;
    let effectiveDate = solarDateObj;

    if (!input.timeUnknown && input.birthTime) {
        const [hh, mm] = input.birthTime.split(':').map(Number);
        const localMinutes = hh * 60 + mm;

        const longitude = 127.0;
        const stdMeridian = 135.0;
        const longitudeOffset = (longitude - stdMeridian) * 4;
        const eot = getEquationOfTime(solarDateObj);
        const totalOffset = eot + longitudeOffset;

        let trueSolarMinutes = localMinutes + totalOffset;
        let dayShift = 0;

        if (trueSolarMinutes < 0) {
            trueSolarMinutes += 1440;
            dayShift = -1;
        } else if (trueSolarMinutes >= 1440) {
            trueSolarMinutes -= 1440;
            dayShift = 1;
        }

        const trueHH = Math.floor(trueSolarMinutes / 60);
        const trueMM = Math.floor(trueSolarMinutes % 60);
        const trueSolarHHmm = `${String(trueHH).padStart(2, '0')}:${String(trueMM).padStart(2, '0')}`;

        let classification = "일반";
        if (trueSolarMinutes >= 1410 || trueSolarMinutes < 90) {
            if (trueSolarMinutes >= 1410) {
                classification = "야자시";
            } else if (trueSolarMinutes < 90) {
                classification = "조자시";
            }
        }

        effectiveDate = new Date(solarDateObj);
        effectiveDate.setDate(effectiveDate.getDate() + dayShift);

        forensic = {
            localTime: input.birthTime,
            equationOfTimeMin: eot,
            longitudeOffsetMin: longitudeOffset,
            totalOffsetMin: parseFloat(totalOffset.toFixed(2)),
            trueSolarHHmm,
            dayShift,
            classification
        };
    }

    // 3. Pillars (사주 간지)
    // 보정된 양력 날짜를 다시 음력 변환 객체(LunarDate)로 바꾸면 간지가 나옴
    const finalLunarData = toLunar(effectiveDate.getFullYear(), effectiveDate.getMonth() + 1, effectiveDate.getDate());

    const yearPillar: Pillar = { stem: finalLunarData.secha[0], branch: finalLunarData.secha[1], label: finalLunarData.secha };
    const monthPillar: Pillar = { stem: finalLunarData.wolgeon[0], branch: finalLunarData.wolgeon[1], label: finalLunarData.wolgeon };
    const dayPillar: Pillar = { stem: finalLunarData.iljin[0], branch: finalLunarData.iljin[1], label: finalLunarData.iljin };

    let hourPillar: Pillar | null = null;
    if (forensic) {
        const trueHH = parseInt(forensic.trueSolarHHmm.split(':')[0]);
        const trueMM = parseInt(forensic.trueSolarHHmm.split(':')[1]);
        const tMinutes = trueHH * 60 + trueMM;

        let branchIdx = Math.floor((tMinutes + 30) / 120) % 12;

        const dayStemIdx = STEMS.indexOf(dayPillar.stem);
        const startHourStemIdx = ((dayStemIdx % 5) * 2) % 10;
        const hourStemIdx = (startHourStemIdx + branchIdx) % 10;

        hourPillar = {
            stem: STEMS[hourStemIdx],
            branch: BRANCHES[branchIdx],
            label: `${STEMS[hourStemIdx]}${BRANCHES[branchIdx]}`
        };
    } else {
        warnings.push("시간 정보가 없어 시주(時柱)를 산출하지 못했습니다.");
    }

    return {
        algorithmVersion: "Genesis-V1.1-RealCalc",
        schemaVersion: "report/v1",
        computedAt: new Date().toISOString(),
        normalization: {
            originalDate: input.birthDate,
            isLeapMonth: !!input.isLeapMonth,
            solarDate: solarDateStr,
            solarYMD: { y: solarYMD.year, m: solarYMD.month, d: solarYMD.day }
        },
        forensicTime: forensic,
        pillars: {
            year: yearPillar,
            month: monthPillar,
            day: dayPillar,
            hour: hourPillar
        },
        warnings
    };
};
