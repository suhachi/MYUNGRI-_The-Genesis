import { z } from 'zod';

export const PatchOperationSchema = z.object({
    op: z.literal('replace'),
    path: z.string().regex(/^\/sections\/(executiveSummary|originAudit|rolling12|luckCalendar|dateDetail|naming)\/(result|interpretation|explain)$|^\/sections\/lifeFlow\/buckets\/\d+\/(result|interpretation|explain)$|^\/sections\/turningPoints\/items\/\d+\/(result|interpretation|explain|title)$/),
    value: z.string().min(1, "내용은 비어있을 수 없습니다.")
});

export const ReportPatchSchema = z.array(PatchOperationSchema);

export type ReportPatch = z.infer<typeof ReportPatchSchema>;
