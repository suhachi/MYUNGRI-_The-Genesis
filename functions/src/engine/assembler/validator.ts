import { FullReportData, ReportSection } from '../../contracts/output.schema';

// P8-ATOMIC-002: Strict Structure Validator
// Enforces result/interpretation/explain structure.

export function validateReportStructure(report: FullReportData): void {
    const sections = Object.values(report.sections).filter((s): s is ReportSection => s !== undefined);

    for (const section of sections) {
        validateSection(section);
    }
}

function validateSection(section: ReportSection): void {
    const { sectionId, resultFacts, interpretationFacts, explainHints } = section;
    const errors: string[] = [];

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
