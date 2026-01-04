"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DaewoonInputSchema = exports.PillarsResultSchema = exports.PillarSchema = exports.AstroInputSchema = void 0;
const zod_1 = require("zod");
// Shared schemas for determinism/contracts
exports.AstroInputSchema = zod_1.z.object({
    birthDate: zod_1.z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    birthTime: zod_1.z.string().nullable(),
    timeUnknown: zod_1.z.boolean(),
    sex: zod_1.z.enum(['male', 'female']),
    calendar: zod_1.z.enum(['solar', 'lunar']),
    isLeapMonth: zod_1.z.boolean().optional(),
    timezone: zod_1.z.string().default('Asia/Seoul')
});
exports.PillarSchema = zod_1.z.object({
    stem: zod_1.z.string(),
    branch: zod_1.z.string(),
    label: zod_1.z.string()
});
exports.PillarsResultSchema = zod_1.z.object({
    year: exports.PillarSchema,
    month: exports.PillarSchema,
    day: exports.PillarSchema,
    hour: exports.PillarSchema.nullable(),
    normalization: zod_1.z.object({
        solarDate: zod_1.z.string(),
        isLeapMonth: zod_1.z.boolean()
    })
});
exports.DaewoonInputSchema = zod_1.z.object({
    birthDate: zod_1.z.string(),
    birthTime: zod_1.z.string(),
    sex: zod_1.z.enum(['male', 'female']),
    yearStem: zod_1.z.string(),
    monthStem: zod_1.z.string(),
    monthBranch: zod_1.z.string(),
    timezone: zod_1.z.string().optional()
});
//# sourceMappingURL=astro.js.map