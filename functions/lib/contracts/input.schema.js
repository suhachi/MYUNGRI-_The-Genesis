"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputSchema = void 0;
const zod_1 = require("zod");
/**
 * Shared Input Schema for Myungri Report Generation
 * 1. Synchronized across Frontend and Backend.
 * 2. Enforces specific business logic (lunar leap, birth time requirements).
 * 3. NO length-based gating for userName.
 */
exports.InputSchema = zod_1.z.object({
    userName: zod_1.z.string().optional(),
    birthDate: zod_1.z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "생년월일 형식이 올바르지 않습니다 (YYYY-MM-DD)."),
    birthTime: zod_1.z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "시간 형식이 올바르지 않습니다 (HH:mm).").optional().nullable(),
    timeUnknown: zod_1.z.boolean(),
    sex: zod_1.z.enum(['male', 'female']).describe("성별 (male/female)"),
    calendar: zod_1.z.enum(['solar', 'lunar']).describe("달력 (solar/lunar)"),
    isLeapMonth: zod_1.z.boolean().optional().nullable(),
    timezone: zod_1.z.literal('Asia/Seoul'),
}).superRefine((data, ctx) => {
    // Business Logic: Lunar leap month check
    if (data.calendar === 'lunar' && data.isLeapMonth === null) {
        ctx.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            message: "음력 선택 시 윤달 여부는 필수입니다.",
            path: ["isLeapMonth"],
        });
    }
    // Business Logic: Birth time requirement
    if (!data.timeUnknown && !data.birthTime) {
        ctx.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            message: "태어난 시간을 모르는 경우가 아니라면 시간 입력은 필수입니다.",
            path: ["birthTime"],
        });
    }
});
//# sourceMappingURL=input.schema.js.map