/// <reference types="vitest" />
import { describe, expect, it } from 'vitest';
import { calculatePillars } from '../src/engine/pillars';
import { computeDeterminismHash } from '../src/engine/hash';

const baseInput = {
    birthDate: '2024-02-05',
    birthTime: '12:00',
    timeUnknown: false,
    calendar: 'solar' as const,
    isLeapMonth: false,
    sex: 'male' as const,
    timezone: 'Asia/Seoul'
};

describe('golden vectors determinism', () => {
    it('produces stable hash for base vector', () => {
        const pillars = calculatePillars(baseInput);
        const hash = computeDeterminismHash(pillars);
        expect(hash).toBe('d4eb169a6105837c0adf1f24f5b1ca6393381855c07216e56e9481e4c62e790b');
    });
});
