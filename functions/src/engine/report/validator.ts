// import { Section } from '../../../../src/types/report'; // Removed unused
// Since we are in functions, we might not have access to src/types easily if not shared.
// Let's define the interface here to match the requirement.

export interface ReportSectionOutput {
    id: string;
    title: string;
    category: string;
    result: string;
    explain: string;
    interpretation: string;
    // Optional extras
    reasonCards?: any[];
}

/**
 * P8-ATOMIC-002: 3-Field Enforcement
 */
export function validateSectionFields(section: ReportSectionOutput): void {
    const requiredFields = ['result', 'explain', 'interpretation'] as const;

    for (const field of requiredFields) {
        if (!section[field] || section[field].trim().length === 0) {
            throw new Error(`Section ${section.id} missing required field: ${field}`);
        }
    }
}

export function validateReportStructure(sections: ReportSectionOutput[]): void {
    sections.forEach(validateSectionFields);
}
