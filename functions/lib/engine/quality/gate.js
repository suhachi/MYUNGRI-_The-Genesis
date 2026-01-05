"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAndRepairReport = validateAndRepairReport;
exports.checkAndRepairText = checkAndRepairText;
const bannedPhrases_1 = require("./bannedPhrases");
const reportValidator_1 = require("./reportValidator");
/**
 * P8-ATOMIC-004: Full Report Quality Gate
 * Orchestrates structural validation and text-level filtering/repair.
 */
function validateAndRepairReport(report) {
    // 1. Structural Logic Check (Sections, Fields, Buckets)
    (0, reportValidator_1.validateReportStructure)(report);
    // 2. Narrative Content Check (Banned Phrases & Repair)
    const sections = report.sections;
    const errors = [];
    const checkSection = (section, name) => {
        if (!section)
            return;
        const fields = ['result', 'explain', 'interpretation'];
        for (const field of fields) {
            const check = checkAndRepairText(section[field]);
            if (!check.passed) {
                errors.push(`${name}.${field}: ${check.violation}`);
            }
            else if (check.repairedText) {
                // Apply the repair to the report object (mutating is fine for this pipeline)
                section[field] = check.repairedText;
            }
        }
    };
    checkSection(sections.executiveSummary, 'ExecutiveSummary');
    checkSection(sections.originAudit, 'OriginAudit');
    checkSection(sections.lifeFlow, 'LifeFlow');
    checkSection(sections.rolling12, 'Rolling12');
    if (sections.naming)
        checkSection(sections.naming, 'Naming');
    if (errors.length > 0) {
        throw new reportValidator_1.QualityValidationError(errors);
    }
}
/**
 * P8-ATOMIC-003: Text-level Gate with 1-time Repair
 */
function checkAndRepairText(text) {
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
            violation: `Unrepairable: ${reViolation}`,
            repairedText: repaired
        };
    }
    return { passed: true, repairedText: repaired };
}
function findViolation(text) {
    for (const phrase of bannedPhrases_1.BANNED_PHRASES) {
        if (text.includes(phrase))
            return `Banned phrase found: "${phrase}"`;
    }
    for (const pattern of bannedPhrases_1.BANNED_PATTERNS) {
        if (pattern.test(text))
            return `Banned pattern matched: ${pattern}`;
    }
    return null;
}
function repairText(text, violation) {
    let repaired = text;
    for (const phrase of bannedPhrases_1.BANNED_PHRASES) {
        if (repaired.includes(phrase)) {
            repaired = repaired.replace(new RegExp(phrase, 'g'), "");
        }
    }
    for (const pattern of bannedPhrases_1.BANNED_PATTERNS) {
        repaired = repaired.replace(pattern, "");
    }
    repaired = repaired.replace(/\s+/g, " ").trim();
    if (repaired.length < 5) {
        return text; // Revert to original to show violation if repair makes it too short
    }
    return repaired;
}
//# sourceMappingURL=gate.js.map