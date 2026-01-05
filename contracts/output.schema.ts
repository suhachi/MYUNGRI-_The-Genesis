import { z } from 'zod';

/**
 * Basic 3-field structure for every analysis section.
 */
export const AnalysisSectionSchema = z.object({
    result: z.string().min(1, "결과(result) 필드는 필수입니다."),
    explain: z.string().min(1, "풀이/근거(explain) 필드는 필수입니다."),
    interpretation: z.string().min(1, "해석/조언(interpretation) 필드는 필수입니다."),
    resultFacts: z.any().optional(), // For engine data passing
});

/**
 * Life Bucket (Daeun/Luck) structure for specific decades.
 */
export const LifeBucketSchema = z.object({
    age: z.number(),
    result: z.string().optional(),
    explain: z.string().optional(),
    interpretation: z.string().optional(),
});

/**
 * Report Section Schema.
 */
export const ReportSectionSchema = AnalysisSectionSchema.extend({
    sectionId: z.string(),
    title: z.string(),
    category: z.string().optional(),
    qualityGuarded: z.boolean().optional(),
    explainHints: z.any().optional(),      // Legacy compatibility
    interpretationFacts: z.any().optional(), // Legacy compatibility
});

/**
 * Shared Output Schema for Myungri Report.
 * Enforces required structural components and matches existing engine expectations.
 */
export const OutputSchema = z.object({
    meta: z.object({
        version: z.string(),
        generatedAt: z.string(),
    }),
    sections: z.object({
        executiveSummary: ReportSectionSchema,
        originAudit: ReportSectionSchema,
        lifeFlow: ReportSectionSchema,
        rolling12: ReportSectionSchema,
        naming: ReportSectionSchema.optional(),
    }),
    determinismHash: z.string().optional(),
});

export type OutputType = z.infer<typeof OutputSchema>;
export type FullReportData = OutputType;
export type ReportSection = z.infer<typeof ReportSectionSchema>;
