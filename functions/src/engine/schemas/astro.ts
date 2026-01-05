import { z } from 'zod';

export const AstroInputSchema = z.object({
    birthDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    birthTime: z.string().regex(/^\d{2}:\d{2}$/).nullable(),
    timeUnknown: z.boolean(),
    sex: z.enum(['male', 'female']),
    calendar: z.enum(['solar', 'lunar']),
    isLeapMonth: z.boolean().optional(),
    timezone: z.string().optional()
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

export const SewoonInputSchema = z.object({
    // targetYear and other sewoon specific inputs can be defined here
});
