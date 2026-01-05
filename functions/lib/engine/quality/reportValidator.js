"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QualityValidationError = void 0;
exports.validateReportStructure = validateReportStructure;
class QualityValidationError extends Error {
    constructor(details) {
        super(`Quality Validation Failed: ${details.join(', ')}`);
        this.details = details;
        this.name = 'QualityValidationError';
    }
}
exports.QualityValidationError = QualityValidationError;
// const REQUIRED_SECTIONS = ['EXIT_001', 'ORIG_001', 'LIFE_001', 'ROLL_001']; // Unused for now, explicit checks used below
function validateReportStructure(report) {
    const errors = [];
    const sections = report.sections;
    // 1. Required Sections Presence (Structure Check)
    if (!sections.executiveSummary)
        errors.push("Missing ExecutiveSummary");
    if (!sections.originAudit)
        errors.push("Missing OriginAudit");
    if (!sections.lifeFlow)
        errors.push("Missing LifeFlow");
    if (!sections.rolling12)
        errors.push("Missing Rolling12");
    if (errors.length > 0)
        throw new QualityValidationError(errors);
    // 2. 3-Field Completeness & Section Logic
    validateSection(sections.executiveSummary, 'ExecutiveSummary', errors);
    validateSection(sections.originAudit, 'OriginAudit', errors);
    validateSection(sections.rolling12, 'Rolling12', errors);
    // LifeFlow Bucket Check (Business Logic Consistency)
    if (sections.lifeFlow) {
        validateSection(sections.lifeFlow, 'LifeFlow', errors);
        const facts = sections.lifeFlow.resultFacts;
        // The deterministic engine for R2-03 provides 'segments' or 'buckets'
        const buckets = facts?.segments || facts?.buckets;
        if (!Array.isArray(buckets) || buckets.length !== 9) {
            errors.push(`LifeFlow must have 9 buckets (10s..90s), found ${buckets?.length ?? 0}`);
        }
    }
    if (sections.naming) {
        validateSection(sections.naming, 'Naming', errors);
    }
    if (errors.length > 0) {
        throw new QualityValidationError(errors);
    }
}
function validateSection(section, name, errors) {
    if (!section)
        return;
    const requiredFields = ['result', 'explain', 'interpretation'];
    for (const field of requiredFields) {
        const value = section[field];
        if (typeof value !== 'string' || value.trim().length < 5) {
            errors.push(`${name}: '${field}' is too short or missing (minimum 5 chars required)`);
        }
    }
}
//# sourceMappingURL=reportValidator.js.map