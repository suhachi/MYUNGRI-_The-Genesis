"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSectionFields = validateSectionFields;
exports.validateReportStructure = validateReportStructure;
/**
 * P8-ATOMIC-002: 3-Field Enforcement
 */
function validateSectionFields(section) {
    const requiredFields = ['result', 'explain', 'interpretation'];
    for (const field of requiredFields) {
        if (!section[field] || section[field].trim().length === 0) {
            throw new Error(`Section ${section.id} missing required field: ${field}`);
        }
    }
}
function validateReportStructure(sections) {
    sections.forEach(validateSectionFields);
}
//# sourceMappingURL=validator.js.map