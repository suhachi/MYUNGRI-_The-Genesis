"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAndRepairText = checkAndRepairText;
const bannedPhrases_1 = require("./bannedPhrases");
/**
 * P8-ATOMIC-003: Quality Gate with 1-time Repair
 */
function checkAndRepairText(text, context = "") {
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
function findViolation(text) {
    for (const phrase of bannedPhrases_1.BANNED_PHRASES) {
        if (text.includes(phrase))
            return `Contains banned phrase: "${phrase}"`;
    }
    for (const pattern of bannedPhrases_1.BANNED_PATTERNS) {
        if (pattern.test(text))
            return `Matches banned pattern: ${pattern}`;
    }
    return null;
}
function repairText(text, violation) {
    let repaired = text;
    for (const phrase of bannedPhrases_1.BANNED_PHRASES) {
        if (repaired.includes(phrase)) {
            repaired = repaired.replace(phrase, "");
        }
    }
    for (const pattern of bannedPhrases_1.BANNED_PATTERNS) {
        repaired = repaired.replace(pattern, "");
    }
    repaired = repaired.replace(/\s+/g, " ").trim();
    if (repaired.length === 0) {
        return text; // Revert to original to show violation
    }
    return repaired;
}
//# sourceMappingURL=gate.js.map