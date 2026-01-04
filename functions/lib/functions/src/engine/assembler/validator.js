"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateReportStructure = validateReportStructure;
// P8-ATOMIC-002: Strict Structure Validator
// Enforces result/interpretation/explain structure.
function validateReportStructure(report) {
    const sections = Object.values(report.sections).filter((s) => s !== undefined);
    for (const section of sections) {
        validateSection(section);
    }
}
function validateSection(section) {
    const { sectionId, resultFacts, interpretationFacts, explainHints } = section;
    const errors = [];
    if (!resultFacts || Object.keys(resultFacts).length === 0) {
        errors.push(`[${sectionId}] Missing 'resultFacts'`);
    }
    if (!interpretationFacts || Object.keys(interpretationFacts).length === 0) {
        errors.push(`[${sectionId}] Missing 'interpretationFacts'`);
    }
    if (!explainHints || Object.keys(explainHints).length === 0) {
        errors.push(`[${sectionId}] Missing 'explainHints'`);
    }
    if (errors.length > 0) {
        throw new Error(`Report Validation Failed:\n${errors.join('\n')}`);
    }
}
//# sourceMappingURL=validator.js.map