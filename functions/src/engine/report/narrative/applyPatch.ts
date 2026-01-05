import { FullReportData } from '../../../contracts/output.schema';
import { ReportPatch } from './patch.schema';

/**
 * Apply Narrative Patch with recursive path navigation.
 * Supports array indices and deep objects.
 */
export function applyNarrativePatch(report: FullReportData, patch: ReportPatch): FullReportData {
    const updated = JSON.parse(JSON.stringify(report));

    for (const op of patch) {
        if (op.op === 'replace') {
            const parts = op.path.split('/').filter(Boolean);
            let current = updated;

            for (let i = 0; i < parts.length - 1; i++) {
                const part = parts[i];
                if (current && typeof current === 'object') {
                    const index = parseInt(part, 10);
                    if (Array.isArray(current) && !isNaN(index)) {
                        current = current[index];
                    } else if (part in current) {
                        current = (current as any)[part];
                    } else {
                        current = null;
                        break;
                    }
                } else {
                    current = null;
                    break;
                }
            }

            if (current && typeof current === 'object') {
                const lastPart = parts[parts.length - 1];
                const index = parseInt(lastPart, 10);
                if (Array.isArray(current) && !isNaN(index)) {
                    current[index] = op.value;
                } else {
                    (current as any)[lastPart] = op.value;
                }
            }
        }
    }

    return updated;
}
