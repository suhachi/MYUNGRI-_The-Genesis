/// <reference types="vitest" />
import { describe, expect, it } from 'vitest';
import { AstroInputSchema, DaewoonInputSchema } from '../src/engine/schemas/astro';

describe('schema contracts', () => {
    it('validates astro input shape', () => {
        const parsed = AstroInputSchema.parse({
            birthDate: '2024-02-05',
            birthTime: '12:00',
            timeUnknown: false,
            sex: 'male',
            calendar: 'solar',
            timezone: 'Asia/Seoul'
        });
        expect(parsed.birthDate).toBe('2024-02-05');
    });

    it('rejects invalid calendar', () => {
        expect(() => AstroInputSchema.parse({
            birthDate: '2024-02-05',
            birthTime: '12:00',
            timeUnknown: false,
            sex: 'male',
            calendar: 'gregorian',
            timezone: 'Asia/Seoul'
        })).toThrow();
    });

    it('validates daewoon input shape', () => {
        const parsed = DaewoonInputSchema.parse({
            birthDate: '2024-02-05',
            birthTime: '12:00',
            sex: 'male',
            yearStem: '甲',
            monthStem: '丙',
            monthBranch: '寅'
        });
        expect(parsed.monthBranch).toBe('寅');
    });
});
