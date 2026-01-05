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
    decadeKey: z.string(), // e.g. "10s", "20s"
    ageRangeLabel: z.string(), // e.g. "15~24세"
    startAge: z.number(),
    endAge: z.number(),
    ganzhi: z.string().optional(), // 대운 간지
    result: z.string().min(1, "결과 필드는 필수입니다."),
    explain: z.string().min(1, "풀이 필드는 필수입니다."),
    interpretation: z.string().min(1, "해석 필드는 필수입니다."),
    resultFacts: z.any().optional(),
});

/**
 * Turning Point Item structure.
 */
export const TurningPointItemSchema = z.object({
    age: z.number(),
    year: z.number().optional(),
    type: z.string(), // e.g. "CAREER", "HEALTH", "RELATION"
    title: z.string().min(1, "제목 필드는 필수입니다."),
    evidenceRefs: z.array(z.string()).optional(),
    result: z.string().min(1, "결과 필드는 필수입니다."),
    explain: z.string().min(1, "풀이 필드는 필수입니다."),
    interpretation: z.string().min(1, "해석 필드는 필수입니다."),
});

/**
 * Report Section Schema.
 */
export const ReportSectionSchema = z.object({
    sectionId: z.string(),
    title: z.string(),
    category: z.string().optional(),
    result: z.string().min(1),
    explain: z.string().min(1),
    interpretation: z.string().min(1),
    resultFacts: z.any().optional(),
    qualityGuarded: z.boolean().optional(),
});

/**
 * Shared Output Schema for Myungri Report (Genesis Only Contract v6).
 */
export const OutputSchema = z.object({
    meta: z.object({
        version: z.literal("report/v6"),
        generatedAt: z.string(),
    }),
    sections: z.object({
        executiveSummary: ReportSectionSchema,
        originAudit: ReportSectionSchema,
        lifeFlow: z.object({
            sectionId: z.literal("LIFE_FLOW"),
            title: z.string(),
            buckets: z.array(LifeBucketSchema).length(9, "대운 흐름은 반드시 9개 구간(10대~80대)이어야 합니다.")
        }),
        turningPoints: z.object({
            sectionId: z.literal("TURNING_POINTS"),
            title: z.string(),
            items: z.array(TurningPointItemSchema).min(5, "전환점은 최소 5개 이상 제안되어야 합니다.")
        }),
        rolling12: ReportSectionSchema,
        luckCalendar: ReportSectionSchema,
        dateDetail: ReportSectionSchema,
        naming: ReportSectionSchema.optional(),
    }),
    determinismHash: z.string().optional(),
});

export type OutputType = z.infer<typeof OutputSchema>;
export type FullReportData = OutputType;
export type ReportSection = z.infer<typeof ReportSectionSchema>;
