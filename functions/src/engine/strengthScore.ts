import { PillarsResult } from './pillars';
import { STRENGTH_WEIGHTS } from './tables/strengthWeights';
import { getElement, Element } from './tenGod';

// P4-ATOMIC-002: Score Calculation & First Pass Judgement
// Thresholds locked
export const STRENGTH_THRESHOLDS = {
    WEAK_MAX: 45, // <= 45 : Weak
    STRONG_MIN: 55, // >= 55 : Strong
    // 45 < x < 55 : Balanced (Neutral)
};

export interface StrengthScoreBreakdown {
    monthBranch: number;
    dayBranch: number;
    yearStem: number;
    monthStem: number;
    hourStem: number;
    yearBranch: number;
    hourBranch: number;
    total: number;
}

export interface StrengthResult {
    score: number;
    verdict: 'Weak' | 'Strong' | 'Neutral';
    breakdown: StrengthScoreBreakdown;
    dayMasterElement: string;
    myFaction: Element[]; // Elements that Support Day Master
}

export function calculateStrength(pillars: PillarsResult): StrengthResult {
    const dayStem = pillars.day.stem;
    const dayElem = getElement(dayStem);
    if (!dayElem) throw new Error("Day Stem Element not found");

    // My Faction: Same Element (Parallel) + Generating Element (Resource)
    // Wood -> Wood, Water
    // Fire -> Fire, Wood ...
    const generatingMap: Record<Element, Element> = {
        "Wood": "Water",
        "Fire": "Wood",
        "Earth": "Fire",
        "Metal": "Earth",
        "Water": "Metal"
    };

    // const resourceElem = generatingMap[dayElem];
    // My Faction Elements
    // Fixed logic: Parallel + Resource.
    const myFaction: Element[] = [dayElem, generatingMap[dayElem]];

    // Helper to check support
    const isSupport = (char: string) => {
        const e = getElement(char);
        return e && myFaction.includes(e);
    };

    // Compute Score
    let score = 0;
    const breakdown: StrengthScoreBreakdown = {
        monthBranch: 0, dayBranch: 0,
        yearStem: 0, monthStem: 0, hourStem: 0,
        yearBranch: 0, hourBranch: 0,
        total: 0
    };

    // 1. Month Branch (40%)
    if (isSupport(pillars.month.branch)) {
        breakdown.monthBranch = STRENGTH_WEIGHTS.monthBranch;
        score += STRENGTH_WEIGHTS.monthBranch;
    }

    // 2. Day Branch (15%)
    if (isSupport(pillars.day.branch)) {
        breakdown.dayBranch = STRENGTH_WEIGHTS.dayBranch;
        score += STRENGTH_WEIGHTS.dayBranch;
    }

    // 3. Stems (10% each)
    if (isSupport(pillars.year.stem)) {
        breakdown.yearStem = STRENGTH_WEIGHTS.yearStem;
        score += STRENGTH_WEIGHTS.yearStem;
    }
    if (isSupport(pillars.month.stem)) {
        breakdown.monthStem = STRENGTH_WEIGHTS.monthStem;
        score += STRENGTH_WEIGHTS.monthStem;
    }
    if (pillars.hour && isSupport(pillars.hour.stem)) {
        breakdown.hourStem = STRENGTH_WEIGHTS.hourStem;
        score += STRENGTH_WEIGHTS.hourStem;
    }

    // 4. Branches (Year 5%, Hour 10%)
    if (isSupport(pillars.year.branch)) {
        breakdown.yearBranch = STRENGTH_WEIGHTS.yearBranch;
        score += STRENGTH_WEIGHTS.yearBranch;
    }
    if (pillars.hour && isSupport(pillars.hour.branch)) {
        breakdown.hourBranch = STRENGTH_WEIGHTS.hourBranch;
        score += STRENGTH_WEIGHTS.hourBranch;
    }

    breakdown.total = score;

    // Verdict
    let verdict: 'Weak' | 'Strong' | 'Neutral' = 'Neutral';
    if (score <= STRENGTH_THRESHOLDS.WEAK_MAX) verdict = 'Weak';
    else if (score >= STRENGTH_THRESHOLDS.STRONG_MIN) verdict = 'Strong';

    return {
        score,
        verdict,
        breakdown,
        dayMasterElement: dayElem,
        myFaction
    };
}
