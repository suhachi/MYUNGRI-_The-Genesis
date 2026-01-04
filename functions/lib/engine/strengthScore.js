"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.STRENGTH_THRESHOLDS = void 0;
exports.calculateStrength = calculateStrength;
const strengthWeights_1 = require("./tables/strengthWeights");
const tenGod_1 = require("./tenGod");
// P4-ATOMIC-002: Score Calculation & First Pass Judgement
// Thresholds locked
exports.STRENGTH_THRESHOLDS = {
    WEAK_MAX: 45, // <= 45 : Weak
    STRONG_MIN: 55, // >= 55 : Strong
    // 45 < x < 55 : Balanced (Neutral)
};
function calculateStrength(pillars) {
    const dayStem = pillars.day.stem;
    const dayElem = (0, tenGod_1.getElement)(dayStem);
    if (!dayElem)
        throw new Error("Day Stem Element not found");
    // My Faction: Same Element (Parallel) + Generating Element (Resource)
    // Wood -> Wood, Water
    // Fire -> Fire, Wood ...
    const generatingMap = {
        "Wood": "Water",
        "Fire": "Wood",
        "Earth": "Fire",
        "Metal": "Earth",
        "Water": "Metal"
    };
    // const resourceElem = generatingMap[dayElem];
    // My Faction Elements
    // Fixed logic: Parallel + Resource.
    const myFaction = [dayElem, generatingMap[dayElem]];
    // Helper to check support
    const isSupport = (char) => {
        const e = (0, tenGod_1.getElement)(char);
        return e && myFaction.includes(e);
    };
    // Compute Score
    let score = 0;
    const breakdown = {
        monthBranch: 0, dayBranch: 0,
        yearStem: 0, monthStem: 0, hourStem: 0,
        yearBranch: 0, hourBranch: 0,
        total: 0
    };
    // 1. Month Branch (40%)
    if (isSupport(pillars.month.branch)) {
        breakdown.monthBranch = strengthWeights_1.STRENGTH_WEIGHTS.monthBranch;
        score += strengthWeights_1.STRENGTH_WEIGHTS.monthBranch;
    }
    // 2. Day Branch (15%)
    if (isSupport(pillars.day.branch)) {
        breakdown.dayBranch = strengthWeights_1.STRENGTH_WEIGHTS.dayBranch;
        score += strengthWeights_1.STRENGTH_WEIGHTS.dayBranch;
    }
    // 3. Stems (10% each)
    if (isSupport(pillars.year.stem)) {
        breakdown.yearStem = strengthWeights_1.STRENGTH_WEIGHTS.yearStem;
        score += strengthWeights_1.STRENGTH_WEIGHTS.yearStem;
    }
    if (isSupport(pillars.month.stem)) {
        breakdown.monthStem = strengthWeights_1.STRENGTH_WEIGHTS.monthStem;
        score += strengthWeights_1.STRENGTH_WEIGHTS.monthStem;
    }
    if (pillars.hour && isSupport(pillars.hour.stem)) {
        breakdown.hourStem = strengthWeights_1.STRENGTH_WEIGHTS.hourStem;
        score += strengthWeights_1.STRENGTH_WEIGHTS.hourStem;
    }
    // 4. Branches (Year 5%, Hour 10%)
    if (isSupport(pillars.year.branch)) {
        breakdown.yearBranch = strengthWeights_1.STRENGTH_WEIGHTS.yearBranch;
        score += strengthWeights_1.STRENGTH_WEIGHTS.yearBranch;
    }
    if (pillars.hour && isSupport(pillars.hour.branch)) {
        breakdown.hourBranch = strengthWeights_1.STRENGTH_WEIGHTS.hourBranch;
        score += strengthWeights_1.STRENGTH_WEIGHTS.hourBranch;
    }
    breakdown.total = score;
    // Verdict
    let verdict = 'Neutral';
    if (score <= exports.STRENGTH_THRESHOLDS.WEAK_MAX)
        verdict = 'Weak';
    else if (score >= exports.STRENGTH_THRESHOLDS.STRONG_MIN)
        verdict = 'Strong';
    return {
        score,
        verdict,
        breakdown,
        dayMasterElement: dayElem,
        myFaction
    };
}
//# sourceMappingURL=strengthScore.js.map