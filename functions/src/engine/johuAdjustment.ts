import { PillarsResult } from './pillars';
import { StrengthResult, STRENGTH_THRESHOLDS } from './strengthScore';
import { Element, getElement } from './tenGod';

// P4-ATOMIC-003: Johu Adjustment (Post-processing)
// Principle: Eokbu (Strength) First -> Johu (Climate) Adjustment

// Johu Rule Table (Simplified for Determinism)
// Season (Month Branch) -> Missing Element / Critical Element
export const JOHU_RULES: Record<string, { critical: Element[], penalty: number, reason: string }> = {
    // Winter (Water) -> Fire needed
    "亥": { critical: ["Fire"], penalty: -5, reason: "Winter(Hae) needs Fire" },
    "子": { critical: ["Fire"], penalty: -10, reason: "Deep Winter(Ja) needs intense Fire" },
    "丑": { critical: ["Fire"], penalty: -8, reason: "Late Winter(Chuk) needs Fire" },

    // Summer (Fire) -> Water needed
    "巳": { critical: ["Water"], penalty: -5, reason: "Summer(Sa) needs Water" },
    "午": { critical: ["Water"], penalty: -10, reason: "Mid Summer(O) needs Water" },
    "未": { critical: ["Water"], penalty: -8, reason: "Late Summer(Mi) needs Water" },

    // Spring/Autumn usually less critical for Johu unless extreme.
    // For now, focus on Extreme Cold/Hot.
};

export interface JohuAdjustmentResult {
    originalScore: number;
    originalVerdict: string;
    finalScore: number;
    finalVerdict: string;
    adjustmentDelta: number;
    isAdjusted: boolean;
    johuNeeds: Element[];
    yongshin: string; // Element or "Withheld"
    heeshin: string;
    gishin: string;
    evidence: string[];
}

export function applyJohuAdjustment(pillars: PillarsResult, strength: StrengthResult): JohuAdjustmentResult {
    const monthBranch = pillars.month.branch;
    const rule = JOHU_RULES[monthBranch];

    let delta = 0;
    const evidence: string[] = [];
    const needs: Element[] = [];

    // Check if critical element exists in pillars (Stem or Branch)
    // Scan all active pillars
    const allChars = [
        pillars.year.stem, pillars.year.branch,
        pillars.month.stem, pillars.month.branch,
        pillars.day.stem, pillars.day.branch,
        ...(pillars.hour ? [pillars.hour.stem, pillars.hour.branch] : [])
    ];

    if (rule) {
        needs.push(...rule.critical);
        // Check presence
        const hasCritical = rule.critical.some(needed =>
            allChars.some(char => getElement(char) === needed)
        );

        if (!hasCritical) {
            // Penalty applied if needed element is missing
            delta = rule.penalty;
            evidence.push(`Johu: Missing ${rule.critical.join('/')} in ${rule.reason} (Penalty ${delta})`);
        } else {
            evidence.push(`Johu: ${rule.critical.join('/')} present for ${rule.reason} (No Penalty)`);
        }
    }

    const finalScore = strength.score + delta;

    let finalVerdict = strength.verdict;
    // Re-evaluate verdict if score crossed checking boundary
    if (finalScore <= STRENGTH_THRESHOLDS.WEAK_MAX) finalVerdict = 'Weak';
    else if (finalScore >= STRENGTH_THRESHOLDS.STRONG_MIN) finalVerdict = 'Strong';
    else finalVerdict = 'Neutral';

    // Yongshin Determination (Simplified Logic)
    // 1. If Weak -> Support (Ind./Bi-rup)
    // 2. If Strong -> Suppress (Sik-sang, Jae-seong, Gwan-seong)
    // 3. Johu Critical Element takes priority? 
    //    Policy: Eokbu Base, Johu Complement.
    //    If Johu Critical is missing, it's the "Needed" one (Yongshin candidate).
    //    However, usually Yongshin is chosed from what IS present or feasible.
    //    Let's stick to Eokbu Yongshin for basic logic.

    let yongshin = "Unknown";
    let heeshin = "Unknown";
    let gishin = "Unknown";

    const dayElem = strength.dayMasterElement;
    // Elements: Wood, Fire, Earth, Metal, Water
    const cycle = ["Wood", "Fire", "Earth", "Metal", "Water"];
    const dIdx = cycle.indexOf(dayElem);

    // Support Elements (Ind/Bi)
    const support = [cycle[(dIdx + 4) % 5], dayElem]; // Resource, Parallel
    // Suppress Elements (Sik/Jae/Gwan)
    const suppress = [cycle[(dIdx + 1) % 5], cycle[(dIdx + 2) % 5], cycle[(dIdx + 3) % 5]];

    if (finalVerdict === 'Weak') {
        // Weak -> Needs Support (Resource/Parallel)
        // Adjust for Johu: If Johu needs Fire, and Fire is Support? Best.
        // If Fire is Suppress? Conflict. Johu often wins in urgent cases.
        // For Deterministic Engine V1:
        // Weak -> Yongshin = Resource (Ind). Heeshin = Parallel (Bi).
        yongshin = support[0]; // Resource
        heeshin = support[1]; // Parallel
        gishin = suppress[1]; // Wealth (drains) or Officer (attacks)
    } else {
        // Strong -> Needs Suppression (Output/Wealth/Officer)
        // Priority? Usually Output (Sik) or Officer (Gwan).
        // Let's pick Output (Sik) as safe default for Strong.
        yongshin = suppress[0]; // Output
        heeshin = suppress[1]; // Wealth
        gishin = support[0]; // Resource (feeds strength)
    }

    // Handle TimeUnknown Disclaimers in Reporting Layer, not here.
    // Here we just calculate based on available data.

    return {
        originalScore: strength.score,
        originalVerdict: strength.verdict,
        finalScore,
        finalVerdict,
        adjustmentDelta: delta,
        isAdjusted: delta !== 0,
        johuNeeds: needs,
        yongshin,
        heeshin,
        gishin,
        evidence
    };
}
