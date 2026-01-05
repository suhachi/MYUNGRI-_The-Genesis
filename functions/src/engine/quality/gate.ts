import { FullReportData, ReportSection } from '../../contracts/output.schema';
import { validateReportStructure } from './reportValidator';
import { BANNED_PHRASES } from './densityThresholds';

/**
 * [Phase 3] Quality Gate Entry Point.
 * - Enforces v6 contract.
 * - Attempts 1-time repair for banned phrases.
 */
export function validateAndRepairReport(report: FullReportData, isTimeUnknown: boolean = false, hasHanja: boolean = true) {
    // 1. Initial Repair attempt (Banned phrases)
    for (const section of Object.values(report.sections)) {
        if (!section) continue;
        const s = section as ReportSection;

        const fields: (keyof ReportSection)[] = ['result', 'interpretation', 'explain'];
        fields.forEach(field => {
            let text = (s as any)[field] || "";
            for (const banned of BANNED_PHRASES) {
                if (text.includes(banned)) {
                    text = text.replace(new RegExp(escapeRegExp(banned), 'g'), "");
                }
            }
            (s as any)[field] = text.trim();
        });
    }

    // 2. Structural & Density Validation
    validateReportStructure(report, isTimeUnknown, hasHanja);

    return report;
}

function escapeRegExp(string: string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
