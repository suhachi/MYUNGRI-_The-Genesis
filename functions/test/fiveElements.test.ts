/// <reference types="vitest" />
import { describe, expect, it } from 'vitest';
import { calculateFiveElements } from '../src/engine/fiveElements';

describe('calculateFiveElements', () => {
    it('counts distribution and bias', () => {
        const res = calculateFiveElements(['甲', '乙', '丙', '丁', '戊', '申', '酉', '亥']);
        expect(res.distribution.Wood).toBe(2);
        expect(res.distribution.Fire).toBe(2);
        expect(res.distribution.Metal).toBe(2);
        expect(res.distribution.Water).toBe(1);
        expect(res.distribution.Earth).toBe(1);
        expect(res.total).toBe(8);
        expect(res.biasMetric).toBeGreaterThan(0);
        expect(res.unknownSymbols).toHaveLength(0);
    });
});
