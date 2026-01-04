import { BANNED_PHRASES, BANNED_PATTERNS } from './bannedPhrases';

export interface QualityCheckResult {
    passed: boolean;
    repairedText?: string;
    violation?: string;
}

/**
 * P8-ATOMIC-003: Quality Gate with 1-time Repair
 */
export function checkAndRepairText(text: string, context: string = ""): QualityCheckResult {
    if (!text || text.trim().length === 0) {
        return { passed: false, violation: "Empty text" };
    }

    const violation = findViolation(text);
    if (!violation) {
        return { passed: true };
    }

    // Attempt 1 Repair
    const repaired = repairText(text, violation);
    
    // Re-check
    const reViolation = findViolation(repaired);
    if (reViolation) {
        return { 
            passed: false, 
            violation: `Failed to repair: ${reViolation}`,
            repairedText: repaired 
        };
    }

    return { passed: true, repairedText: repaired };
}

function findViolation(text: string): string | null {
    for (const phrase of BANNED_PHRASES) {
        if (text.includes(phrase)) return `Contains banned phrase: "${phrase}"`;
    }
    for (const pattern of BANNED_PATTERNS) {
        if (pattern.test(text)) return `Matches banned pattern: ${pattern}`;
    }
    return null;
}

function repairText(text: string, violation: string): string {
    let repaired = text;

    for (const phrase of BANNED_PHRASES) {
        if (repaired.includes(phrase)) {
            repaired = repaired.replace(phrase, ""); 
        }
    }

    for (const pattern of BANNED_PATTERNS) {
        repaired = repaired.replace(pattern, "");
    }

    repaired = repaired.replace(/\s+/g, " ").trim();

    if (repaired.length === 0) {
        return text; // Revert to original to show violation
    }

    return repaired;
}
