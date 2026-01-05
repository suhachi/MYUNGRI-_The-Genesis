"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SewoonInputSchema = exports.DaewoonInputSchema = exports.AstroInputSchema = void 0;
const zod_1 = require("zod");
exports.AstroInputSchema = zod_1.z.object({
    birthDate: zod_1.z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    birthTime: zod_1.z.string().regex(/^\d{2}:\d{2}$/).nullable(),
    timeUnknown: zod_1.z.boolean(),
    sex: zod_1.z.enum(['male', 'female']),
    calendar: zod_1.z.enum(['solar', 'lunar']),
    isLeapMonth: zod_1.z.boolean().optional(),
    timezone: zod_1.z.string().optional()
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
exports.SewoonInputSchema = zod_1.z.object({
// targetYear and other sewoon specific inputs can be defined here
});
//# sourceMappingURL=astro.js.map