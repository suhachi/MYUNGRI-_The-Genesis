"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InputSchema = void 0;
const zod_1 = require("zod");
exports.InputSchema = zod_1.z.object({
    userName: zod_1.z.string()
        .regex(/^[\p{Script=Hangul}\p{Script=Han}a-zA-Z\s]*$/u, "이름은 한글, 한자, 영문, 공백만 입력 가능합니다.")
        .optional(),
    birthDate: zod_1.z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "생년월일 형식이 올바르지 않습니다 (YYYY-MM-DD)."),
    birthTime: zod_1.z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "시간 형식이 올바르지 않습니다 (HH:mm).").optional().nullable(),
    timeUnknown: zod_1.z.boolean(),
    sex: zod_1.z.enum(['male', 'female']).describe("성별 (male/female)"),
    calendar: zod_1.z.enum(['solar', 'lunar']).describe("달력 (solar/lunar)"),
    isLeapMonth: zod_1.z.boolean().optional(),
    timezone: zod_1.z.literal('Asia/Seoul'),
}).superRefine((data, ctx) => {
    if (data.calendar === 'lunar' && typeof data.isLeapMonth !== 'boolean') {
        ctx.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            message: "음력 선택 시 윤달 여부는 필수입니다.",
            path: ["isLeapMonth"],
        });
    }
    if (!data.timeUnknown && !data.birthTime) {
        ctx.addIssue({
            code: zod_1.z.ZodIssueCode.custom,
            message: "태어난 시간을 모르는 경우가 아니라면 시간 입력은 필수입니다.",
            path: ["birthTime"],
        });
    }
});
//# sourceMappingURL=input.schema.js.map