import { FullReportData } from '../../contracts/output.schema';
import { ReportPatch } from './patch.schema';

/**
 * [ATOMIC-3-03-3] Apply Narrative Patch (Recursive Path support)
 * Merges the LLM-generated strings into the existing report skeleton using JSON Patch logic.
 * Supports deep paths like /sections/lifeFlow/buckets/0/result
 * Correctly handles array indices and nested objects.
 */
export function applyNarrativePatch(report: FullReportData, patch: ReportPatch): FullReportData {
    // Deep clone to ensure immutability
    const updated = JSON.parse(JSON.stringify(report));

    for (const op of patch) {
        if (op.op === 'replace') {
            const parts = op.path.split('/').filter(Boolean);
            let current = updated;

            for (let i = 0; i < parts.length - 1; i++) {
                const part = parts[i];

                // Determine if we are dealing with an array or object
                if (current && typeof current === 'object') {
                    // Check if part is a numeric index for an array
                    const index = parseInt(part, 10);
                    if (Array.isArray(current) && !isNaN(index)) {
                        current = current[index];
                    } else if (part in current) {
                        current = (current as any)[part];
                    } else {
                        // Path not found, break early
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
