"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateV1 = exports.__test = void 0;
/**
 * Calculation Engine v1.2 (Hardened)
 * [L=1+] Fixed Import, Hanja Ganji Mapping, Leap-Month Wolgeon Safety
 * [T=1+] UTC-based Date Math (Timezone Independent)
 * [CALENDAR ENTRY] All solar/lunar conversions must go through calendar/converter.ts (single entry to kor-lunar)
 */
const converter_1 = require("../calendar/converter");
const ganzhi_1 = require("../calendar/ganzhi");
const time_1 = require("../calendar/time");
const elements_1 = require("../constants/elements");
const astro_1 = require("../schemas/astro");
const STEMS = ganzhi_1.STEMS_HANJA;
const BRANCHES = ganzhi_1.BRANCHES_HANJA;
function getTenGod(dayStem, target) {
    const dE = elements_1.ELEMENTS[dayStem];
    const dP = elements_1.POLARITY[dayStem];
    const tE = elements_1.ELEMENTS[target];
    const tP = elements_1.POLARITY[target];
    if (!dE || !tE)
        return "UNKNOWN";
    const order = ["Wood", "Fire", "Earth", "Metal", "Water"];
    const dIdx = order.indexOf(dE);
    const tIdx = order.indexOf(tE);
    const diff = (tIdx - dIdx + 5) % 5;
    const sameP = (dP === tP);
    switch (diff) {
        case 0: return sameP ? "비견" : "겁재";
        case 1: return sameP ? "식신" : "상관";
        case 2: return sameP ? "편재" : "정재";
        case 3: return sameP ? "편관" : "정관";
        case 4: return sameP ? "편인" : "정인";
        default: return "UNKNOWN";
    }
}
// Test hook (Phase2 determinism)
exports.__test = { getTenGod };
const calculateV1 = (input) => {
    astro_1.AstroInputSchema.parse(input);
    const warnings = [];
    const [year, month, day] = input.birthDate.split('-').map(Number);
    // [Safety Net Layer 1] Input Year Range Check
    if (year < 1890 || year > 2050) {
        throw new Error("Year out of supported range [1890-2050]");
    }
    // 1. [L=1] Lunar/Solar Normalization
    let solarYMD;
    if (input.calendar === 'lunar') {
        try {
            const converted = (0, converter_1.convertToSolar)(year, month, day, input.isLeapMonth || false);
            solarYMD = { year: converted.year, month: converted.month, day: converted.day };
            // [Safety Net Layer 2] Post-Conversion Year Range Check (Boundary Case)
            if (solarYMD.year < 1890 || solarYMD.year > 2050) {
                throw new Error("Year out of supported range [1890-2050] after conversion");
            }
        }
        catch (e) {
            if (e.message.includes("range"))
                throw e;
            throw new Error(`KOR_LUNAR_CONVERT_FAILED: toSolar failed - ${e.message}`);
        }
    }
    else {
        solarYMD = { year, month, day };
    }
    const solarDateStr = `${solarYMD.year}-${String(solarYMD.month).padStart(2, '0')}-${String(solarYMD.day).padStart(2, '0')}`;
    const solarDateObj = (0, time_1.parseYMDToUTCDate)(solarDateStr);
    // 2. [T=1] True Solar Time Correction
    let forensic;
    let effectiveDate = solarDateObj;
    if (!input.timeUnknown && input.birthTime) {
        const t = (0, time_1.calculateTrueSolarTime)(solarDateObj, input.birthTime, input.timezone);
        forensic = t;
        effectiveDate = (0, time_1.addDaysUTC)(solarDateObj, t.dayShift);
    }
    // 3. Pillars Mapping & Normalization
    let finalLunarData;
    try {
        finalLunarData = (0, converter_1.convertToLunar)(effectiveDate.getUTCFullYear(), effectiveDate.getUTCMonth() + 1, effectiveDate.getUTCDate());
    }
    catch (e) {
        throw new Error(`KOR_LUNAR_CONVERT_FAILED: toLunar failed - ${e.message}`);
    }
    const dayPillar = (0, ganzhi_1.toHanjaGanji)(finalLunarData.iljin);
    const dStem = dayPillar.stem;
    const yearPillar = { ...(0, ganzhi_1.toHanjaGanji)(finalLunarData.secha), tenGod: getTenGod(dStem, (0, ganzhi_1.toHanjaGanji)(finalLunarData.secha).stem) };
    let monthPillar;
    if (finalLunarData.wolgeon) {
        const mBase = (0, ganzhi_1.toHanjaGanji)(finalLunarData.wolgeon);
        monthPillar = { ...mBase, tenGod: getTenGod(dStem, mBase.stem) };
    }
    else {
        monthPillar = { stem: "?", branch: "?", label: "UNKNOWN" };
        warnings.push("윤달 월건 미제공");
    }
    let hourPillar = null;
    if (forensic) {
        const [trueHH, trueMM] = forensic.trueSolarHHmm.split(':').map(Number);
        const tMinutes = trueHH * 60 + trueMM;
        let branchIdx = Math.floor((tMinutes + 30) / 120) % 12;
        const dayStemIdx = STEMS.indexOf(dStem);
        if (dayStemIdx !== -1) {
            const startHourStemIdx = ((dayStemIdx % 5) * 2) % 10;
            const hourStemIdx = (startHourStemIdx + branchIdx) % 10;
            hourPillar = {
                stem: STEMS[hourStemIdx],
                branch: BRANCHES[branchIdx],
                label: `${STEMS[hourStemIdx]}${BRANCHES[branchIdx]}`,
                tenGod: getTenGod(dStem, STEMS[hourStemIdx])
            };
        }
    }
    return {
        algorithmVersion: "Genesis-V6.0 (Phase 28)",
        schemaVersion: "report/v6",
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
            day: { ...dayPillar, tenGod: "본체(Kernel)" },
            hour: hourPillar
        },
        warnings
    };
};
exports.calculateV1 = calculateV1;
//# sourceMappingURL=v1.js.map