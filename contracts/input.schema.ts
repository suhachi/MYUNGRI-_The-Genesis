import { z } from 'zod';

export const InputSchema = z.object({
    userName: z.string()
        .regex(/^[\p{Script=Hangul}\p{Script=Han}a-zA-Z\s]*$/u, "이름은 한글, 한자, 영문, 공백만 입력 가능합니다.")
        .optional(),
    birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "생년월일 형식이 올바르지 않습니다 (YYYY-MM-DD)."),
    birthTime: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "시간 형식이 올바르지 않습니다 (HH:mm).").optional().nullable(),
    timeUnknown: z.boolean(),
    sex: z.enum(['male', 'female'] as const).describe("성별 (male/female)"),
    calendar: z.enum(['solar', 'lunar'] as const).describe("달력 (solar/lunar)"),
    isLeapMonth: z.boolean().optional(),
    timezone: z.literal('Asia/Seoul'),
}).superRefine((data, ctx) => {
    if (data.calendar === 'lunar' && typeof data.isLeapMonth !== 'boolean') {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "음력 선택 시 윤달 여부는 필수입니다.",
            path: ["isLeapMonth"],
        });
    }
    if (!data.timeUnknown && !data.birthTime) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "태어난 시간을 모르는 경우가 아니라면 시간 입력은 필수입니다.",
            path: ["birthTime"],
        });
    }
});

export type InputType = z.infer<typeof InputSchema>;
