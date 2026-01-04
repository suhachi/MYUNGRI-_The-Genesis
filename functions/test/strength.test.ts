/// <reference types="vitest" />
import { describe, expect, it } from 'vitest';
import { calculateStrength, STRENGTH_THRESHOLDS } from '../src/engine/strengthScore';
import { PillarsResult } from '../src/engine/pillars';

const basePillars: PillarsResult = {
    year: { stem: '甲', branch: '子', label: '甲子' },
    month: { stem: '丙', branch: '寅', label: '丙寅' },
    day: { stem: '甲', branch: '午', label: '甲午' },
    hour: { stem: '甲', branch: '寅', label: '甲寅' },
    normalization: { solarDate: '2024-02-05', isLeapMonth: false }
};

describe('strengthScore uses shared element map', () => {
    it('returns strong verdict when many supporters', () => {
        const res = calculateStrength(basePillars);
        expect(res.score).toBeGreaterThanOrEqual(STRENGTH_THRESHOLDS.STRONG_MIN);
        expect(res.verdict).toBe('Strong');
        expect(res.dayMasterElement).toBe('Wood');
        expect(res.myFaction).toContain('Water');
    });

    it('returns weak verdict when supporters absent', () => {
        const weak: PillarsResult = {
            ...basePillars,
            month: { stem: '辛', branch: '酉', label: '辛酉' },
            day: { stem: '丁', branch: '酉', label: '丁酉' },
            hour: null
        } as any;
        const res = calculateStrength(weak);
        expect(res.score).toBeLessThanOrEqual(STRENGTH_THRESHOLDS.WEAK_MAX);
        expect(res.verdict).toBe('Weak');
    });
});
