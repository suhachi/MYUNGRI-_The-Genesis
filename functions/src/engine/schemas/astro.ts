import { z } from 'zod';

// Shared schemas for determinism/contracts
export const AstroInputSchema = z.object({
    birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    birthTime: z.string().nullable(),
    timeUnknown: z.boolean(),
    sex: z.enum(['male', 'female']),
    calendar: z.enum(['solar', 'lunar']),
    isLeapMonth: z.boolean().optional(),
    timezone: z.string().default('Asia/Seoul')
});

export const PillarSchema = z.object({
    stem: z.string(),
    branch: z.string(),
    label: z.string()
});

export const PillarsResultSchema = z.object({
    year: PillarSchema,
    month: PillarSchema,
    day: PillarSchema,
    hour: PillarSchema.nullable(),
    normalization: z.object({
        solarDate: z.string(),
        isLeapMonth: z.boolean()
    })
});

export const DaewoonInputSchema = z.object({
    birthDate: z.string(),
    birthTime: z.string(),
    sex: z.enum(['male', 'female']),
    yearStem: z.string(),
    monthStem: z.string(),
    monthBranch: z.string(),
    timezone: z.string().optional()
});

export type AstroInput = z.infer<typeof AstroInputSchema>;
export type DaewoonInput = z.infer<typeof DaewoonInputSchema>;
