"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateV1 = void 0;
/**
 * Calculation Engine v1 (Real Calculation Pipeline)
 * [L=1] Lunar/Solar Conversion
 * [T=1] True Solar Time Correction
 */
const kor_lunar_1 = require("kor-lunar");
const STEMS = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
const BRANCHES = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];
function getEquationOfTime(date) {
    const startOfYear = new Date(date.getFullYear(), 0, 0);
    const diff = date.getTime() - startOfYear.getTime();
    const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
    const b = (360 / 365.24) * (dayOfYear - 81) * (Math.PI / 180);
    const eot = 9.87 * Math.sin(2 * b) - 7.53 * Math.cos(b) - 1.5 * Math.sin(b);
    return parseFloat(eot.toFixed(2));
}
const calculateV1 = (input) => {
    const warnings = [];
    const [year, month, day] = input.birthDate.split('-').map(Number);
    // 1. [L=1] Lunar/Solar Normalization
    let solarYMD;
    if (input.calendar === 'lunar') {
        const converted = (0, kor_lunar_1.toSolar)(year, month, day, input.isLeapMonth || false);
        solarYMD = { year: converted.year, month: converted.month, day: converted.day };
    }
    else {
        solarYMD = { year, month, day };
    }
    const solarDateStr = `${solarYMD.year}-${String(solarYMD.month).padStart(2, '0')}-${String(solarYMD.day).padStart(2, '0')}`;
    const solarDateObj = new Date(solarDateStr);
    // 2. [T=1] True Solar Time Correction
    let forensic;
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
        }
        else if (trueSolarMinutes >= 1440) {
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
            }
            else if (trueSolarMinutes < 90) {
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
    const finalLunarData = (0, kor_lunar_1.toLunar)(effectiveDate.getFullYear(), effectiveDate.getMonth() + 1, effectiveDate.getDate());
    const yearPillar = { stem: finalLunarData.secha[0], branch: finalLunarData.secha[1], label: finalLunarData.secha };
    const monthPillar = { stem: finalLunarData.wolgeon[0], branch: finalLunarData.wolgeon[1], label: finalLunarData.wolgeon };
    const dayPillar = { stem: finalLunarData.iljin[0], branch: finalLunarData.iljin[1], label: finalLunarData.iljin };
    let hourPillar = null;
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
    }
    else {
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
exports.calculateV1 = calculateV1;
//# sourceMappingURL=v1.js.map