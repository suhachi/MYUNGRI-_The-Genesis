import { z } from 'zod';

/**
 * RFC6902 JSON Patch operation schema.
 * Only 'replace' operations are allowed for target text fields.
 */
export const PatchOperationSchema = z.object({
    op: z.literal('replace'),
    path: z.string().regex(/^\/sections\/(executiveSummary|originAudit|rolling12|luckCalendar|dateDetail|naming)\/(result|interpretation|explain)$|^\/sections\/lifeFlow\/buckets\/\d+\/(result|interpretation|explain|resultFacts)$|^\/sections\/turningPoints\/items\/\d+\/(result|interpretation|explain|resultFacts)$/),
    value: z.any() // Can be string or facts object
});

export const ReportPatchSchema = z.array(PatchOperationSchema);

export type ReportPatch = z.infer<typeof ReportPatchSchema>;
