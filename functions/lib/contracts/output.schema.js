"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutputSchema = exports.ReportSectionSchema = exports.LifeBucketSchema = exports.AnalysisSectionSchema = void 0;
const zod_1 = require("zod");
/**
 * Basic 3-field structure for every analysis section.
 */
exports.AnalysisSectionSchema = zod_1.z.object({
    result: zod_1.z.string().min(1, "결과(result) 필드는 필수입니다."),
    explain: zod_1.z.string().min(1, "풀이/근거(explain) 필드는 필수입니다."),
    interpretation: zod_1.z.string().min(1, "해석/조언(interpretation) 필드는 필수입니다."),
    resultFacts: zod_1.z.any().optional(), // For engine data passing
});
/**
 * Life Bucket (Daeun/Luck) structure for specific decades.
 */
exports.LifeBucketSchema = zod_1.z.object({
    age: zod_1.z.number(),
    result: zod_1.z.string().optional(),
    explain: zod_1.z.string().optional(),
    interpretation: zod_1.z.string().optional(),
});
/**
 * Report Section Schema.
 */
exports.ReportSectionSchema = exports.AnalysisSectionSchema.extend({
    sectionId: zod_1.z.string(),
    title: zod_1.z.string(),
    category: zod_1.z.string().optional(),
    qualityGuarded: zod_1.z.boolean().optional(),
    explainHints: zod_1.z.any().optional(), // Legacy compatibility
    interpretationFacts: zod_1.z.any().optional(), // Legacy compatibility
});
/**
 * Shared Output Schema for Myungri Report.
 * Enforces required structural components and matches existing engine expectations.
 */
exports.OutputSchema = zod_1.z.object({
    meta: zod_1.z.object({
        version: zod_1.z.string(),
        generatedAt: zod_1.z.string(),
    }),
    sections: zod_1.z.object({
        executiveSummary: exports.ReportSectionSchema,
        originAudit: exports.ReportSectionSchema,
        lifeFlow: exports.ReportSectionSchema,
        rolling12: exports.ReportSectionSchema,
        naming: exports.ReportSectionSchema.optional(),
    }),
    determinismHash: zod_1.z.string().optional(),
});
//# sourceMappingURL=output.schema.js.map