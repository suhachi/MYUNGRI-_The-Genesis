import { FullReportData, ReportSection } from '../../contracts/output.schema';

export class QualityValidationError extends Error {
    constructor(public details: string[]) {
        super(`Quality Validation Failed: ${details.join(', ')}`);
        this.name = 'QualityValidationError';
    }
}

// const REQUIRED_SECTIONS = ['EXIT_001', 'ORIG_001', 'LIFE_001', 'ROLL_001']; // Unused for now, explicit checks used below

export function validateReportStructure(report: FullReportData): void {
    const errors: string[] = [];
    const sections = report.sections;

    // 1. Required Sections Presence
    if (!sections.executiveSummary) errors.push("Missing ExecutiveSummary");
    if (!sections.originAudit) errors.push("Missing OriginAudit");
    if (!sections.lifeFlow) errors.push("Missing LifeFlow");
    if (!sections.rolling12) errors.push("Missing Rolling12");

    if (errors.length > 0) throw new QualityValidationError(errors);

    // 2. 3-Field Completeness & Section Logic
    validateSection(sections.executiveSummary, 'ExecutiveSummary', errors);
    validateSection(sections.originAudit, 'OriginAudit', errors);

    // LifeFlow Bucket Check
    if (sections.lifeFlow) {
        validateSection(sections.lifeFlow, 'LifeFlow', errors);
        // Assuming details are in resultFacts or we parse result
        // For P5 structure, we use resultFacts usually.
        // P5 lifeBuckets sets resultFacts: { buckets: [...] }
        const facts = sections.lifeFlow.resultFacts as any;
        if (!facts || !Array.isArray(facts.buckets) || facts.buckets.length !== 9) {
            errors.push(`LifeFlow must have 9 buckets (10s..90s), found ${facts?.buckets?.length ?? 0}`);
        }
    }

    if (sections.rolling12) {
        validateSection(sections.rolling12, 'Rolling12', errors);
    }

    if (sections.naming) {
        validateSection(sections.naming, 'Naming', errors);
        // P7 Policy: missingKangxi -> referenceOnly
        const facts = sections.naming.resultFacts as any;
        if (facts?.missingKangxi && !facts?.referenceOnly) {
            errors.push("Naming policy violation: missingKangxi must imply referenceOnly");
        }
    }

    // 3. Meta Policy
    if (report.meta) { // Usually meta is inside input or wrapper, but schema has meta
        // Assuming input is also available or passed, but Validator usually checks Output.
        // Let's check if disclaimer exists in output text if we detect logic?
        // It's hard to check 'timeUnknown' from output unless it's in resultFacts.
        // Skip input-dependent checks here unless embedded in output facts.
    }

    if (errors.length > 0) {
        throw new QualityValidationError(errors);
    }
}

function validateSection(section: ReportSection | undefined, name: string, errors: string[]) {
    if (!section) return; // Already caught by required check
    if (!section.result || section.result.trim().length === 0) errors.push(`${name}: missing result`);
    if (!section.interpretation || section.interpretation.trim().length === 0) errors.push(`${name}: missing interpretation`);
    if (!section.explain || section.explain.trim().length === 0) errors.push(`${name}: missing explain`);
}
