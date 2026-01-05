import { FullReportData, ReportSection } from '../../contracts/output.schema';
import { DENSITY_THRESHOLDS, POLICY_PHRASES } from './densityThresholds';

export class QualityValidationError extends Error {
    constructor(public details: string[]) {
        super(`Quality Validation Failed: ${details.join('; ')}`);
        this.name = 'QualityValidationError';
    }
}

/**
 * Validates report structure and density against v6 contract.
 */
export function validateReportStructure(report: FullReportData, isTimeUnknown: boolean = false, hasHanja: boolean = true) {
    const errors: string[] = [];
    const sections = report.sections;

    // 1. Required Sections Presence (v6 Contract)
    const requiredSections = [
        'executiveSummary', 'originAudit', 'lifeFlow',
        'turningPoints', 'rolling12', 'luckCalendar', 'dateDetail'
    ];

    for (const secKey of requiredSections) {
        if (!(sections as any)[secKey]) {
            errors.push(`Missing mandatory section: ${secKey}`);
        }
    }

    // 2. Structural Integrity & Field Completeness
    // Basic Sections
    const basicSections = ['executiveSummary', 'originAudit', 'rolling12', 'luckCalendar', 'dateDetail'];
    for (const key of basicSections) {
        const s = (sections as any)[key] as ReportSection;
        if (!s) continue;
        validateFields(s, `sections.${key}`, errors);
    }

    // Life Flow (9 Buckets)
    if (sections.lifeFlow) {
        if (!Array.isArray(sections.lifeFlow.buckets) || sections.lifeFlow.buckets.length !== 9) {
            errors.push(`LifeFlow must have exactly 9 buckets (found: ${sections.lifeFlow.buckets?.length || 0})`);
        } else {
            sections.lifeFlow.buckets.forEach((b, i) => {
                validateFields(b, `sections.lifeFlow.buckets[${i}]`, errors);
            });
        }
    }

    // Turning Points (Min 5 items)
    if (sections.turningPoints) {
        if (!Array.isArray(sections.turningPoints.items) || sections.turningPoints.items.length < 5) {
            errors.push(`TurningPoints must have at least 5 items (found: ${sections.turningPoints.items?.length || 0})`);
        } else {
            sections.turningPoints.items.forEach((item, i) => {
                validateFields(item, `sections.turningPoints.items[${i}]`, errors);
            });
        }
    }

    // 3. Total Report Density (45,000+ chars for 30p+ quality)
    const totalChars = calculateTotalChars(sections);
    if (totalChars < DENSITY_THRESHOLDS.TOTAL) {
        errors.push(`Total Report Density: ${totalChars} chars < ${DENSITY_THRESHOLDS.TOTAL} (contract violation)`);
    }

    // 4. Policy Phrasing Checks
    if (isTimeUnknown) {
        const text = JSON.stringify(sections);
        if (!text.includes(POLICY_PHRASES.TIME_UNKNOWN)) {
            errors.push(`Policy Violation: 'timeUnknown' report must include "${POLICY_PHRASES.TIME_UNKNOWN}"`);
        }
    }

    if (!hasHanja && sections.naming) {
        const text = JSON.stringify(sections.naming);
        if (!text.includes(POLICY_PHRASES.HANJA_MISSING)) {
            errors.push(`Policy Violation: Naming analysis must include "${POLICY_PHRASES.HANJA_MISSING}"`);
        }
    }

    if (errors.length > 0) {
        throw new QualityValidationError(errors);
    }
}

function validateFields(obj: any, path: string, errors: string[]) {
    const fields = ['result', 'interpretation', 'explain'];
    for (const f of fields) {
        const val = obj[f] || "";
        if (typeof val !== 'string' || val.length < 5 || val.includes("[PENDING]")) {
            errors.push(`Field incomplete or too short: ${path}.${f} (length: ${val.length})`);
        }
    }
}

function calculateTotalChars(sections: any): number {
    let count = 0;
    const basic = ['executiveSummary', 'originAudit', 'rolling12', 'luckCalendar', 'dateDetail', 'naming'];
    for (const k of basic) {
        const s = sections[k];
        if (s) count += (s.result?.length || 0) + (s.explain?.length || 0) + (s.interpretation?.length || 0);
    }
    if (sections.lifeFlow?.buckets) {
        for (const b of sections.lifeFlow.buckets) {
            count += (b.result?.length || 0) + (b.explain?.length || 0) + (b.interpretation?.length || 0);
        }
    }
    if (sections.turningPoints?.items) {
        for (const item of sections.turningPoints.items) {
            count += (item.result?.length || 0) + (item.explain?.length || 0) + (item.interpretation?.length || 0);
        }
    }
    return count;
}
