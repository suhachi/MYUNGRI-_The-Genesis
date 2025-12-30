"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateV1 = void 0;
/**
 * Calculation Engine v1.2 (Hardened)
 * [L=1+] Fixed Import, Hanja Ganji Mapping, Leap-Month Wolgeon Safety
 * [T=1+] UTC-based Date Math (Timezone Independent)
 */
// [L=1+] Safe Import for kor-lunar (README recommended style with fallback)
const kl = require("kor-lunar");
const toSolar = kl.toSolar || kl.default?.toSolar;
const toLunar = kl.toLunar || kl.default?.toLunar;
// Hanja Ganji Mapping (L=1+)
const STEMS_H = ["갑", "을", "병", "정", "무", "기", "경", "신", "임", "계"];
const BRANCHES_H = ["자", "축", "인", "묘", "진", "사", "오", "미", "신", "유", "술", "해"];
const STEMS = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
const BRANCHES = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];
function toHanjaGanji(labelHangul) {
    if (!labelHangul || labelHangul.length < 2) {
        return { stem: "?", branch: "?", label: "UNKNOWN" };
    }
    const s = labelHangul[0];
    const b = labelHangul[1];
    const si = STEMS_H.indexOf(s);
    const bi = BRANCHES_H.indexOf(b);
    if (si < 0 || bi < 0) {
        return { stem: "?", branch: "?", label: "UNKNOWN" };
    }
    return {
        stem: STEMS[si],
        branch: BRANCHES[bi],
        label: `${STEMS[si]}${BRANCHES[bi]}`
    };
}
// UTC Utilities (T=1+)
function parseYMDToUTCDate(ymd) {
    const [y, m, d] = ymd.split('-').map(Number);
    return new Date(Date.UTC(y, m - 1, d));
}
function addDaysUTC(date, days) {
    const next = new Date(date.getTime());
    next.setUTCDate(next.getUTCDate() + days);
    return next;
}
function dayOfYearUTC(date) {
    const start = Date.UTC(date.getUTCFullYear(), 0, 0);
    const diff = date.getTime() - start;
    return Math.floor(diff / (1000 * 60 * 60 * 24));
}
function getEquationOfTimeUTC(date) {
    const dayOfYear = dayOfYearUTC(date);
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
        const converted = toSolar(year, month, day, input.isLeapMonth || false);
        solarYMD = { year: converted.year, month: converted.month, day: converted.day };
    }
    else {
        solarYMD = { year, month, day };
    }
    const solarDateStr = `${solarYMD.year}-${String(solarYMD.month).padStart(2, '0')}-${String(solarYMD.day).padStart(2, '0')}`;
    const solarDateObj = parseYMDToUTCDate(solarDateStr);
    // 2. [T=1] True Solar Time Correction
    let forensic;
    let effectiveDate = solarDateObj;
    if (!input.timeUnknown && input.birthTime) {
        const [hh, mm] = input.birthTime.split(':').map(Number);
        const localMinutes = hh * 60 + mm;
        const longitude = 127.0;
        const stdMeridian = 135.0;
        const longitudeOffset = (longitude - stdMeridian) * 4;
        const eot = getEquationOfTimeUTC(solarDateObj);
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
            classification = (trueSolarMinutes >= 1410) ? "야자시" : "조자시";
        }
        effectiveDate = addDaysUTC(solarDateObj, dayShift);
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
    // 3. Pillars Mapping & Normalization
    const finalLunarData = toLunar(effectiveDate.getUTCFullYear(), effectiveDate.getUTCMonth() + 1, effectiveDate.getUTCDate());
    // [L=1+] Year/Day Pillars
    const yearPillar = toHanjaGanji(finalLunarData.secha);
    const dayPillar = toHanjaGanji(finalLunarData.iljin);
    // [L=1+] Month Pillar with Wolgeon Safety
    let monthPillar;
    if (finalLunarData.wolgeon) {
        monthPillar = toHanjaGanji(finalLunarData.wolgeon);
    }
    else {
        monthPillar = { stem: "?", branch: "?", label: "UNKNOWN" };
        warnings.push("윤달 월건 미제공(라이브러리 사계) → 절기 기반 월주 산출(Phase 3-C-02)로 보완 예정");
    }
    // [L=1+] Hour Pillar Calculation
    let hourPillar = null;
    if (forensic) {
        const [trueHH, trueMM] = forensic.trueSolarHHmm.split(':').map(Number);
        const tMinutes = trueHH * 60 + trueMM;
        let branchIdx = Math.floor((tMinutes + 30) / 120) % 12;
        const dayStemIdx = STEMS.indexOf(dayPillar.stem);
        if (dayStemIdx !== -1) {
            const startHourStemIdx = ((dayStemIdx % 5) * 2) % 10;
            const hourStemIdx = (startHourStemIdx + branchIdx) % 10;
            hourPillar = {
                stem: STEMS[hourStemIdx],
                branch: BRANCHES[branchIdx],
                label: `${STEMS[hourStemIdx]}${BRANCHES[branchIdx]}`
            };
        }
    }
    else if (!input.timeUnknown) {
        warnings.push("시간 정보가 없어 시주(時柱)를 산출하지 못했습니다.");
    }
    return {
        algorithmVersion: "Genesis-V1.2-Hardened",
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