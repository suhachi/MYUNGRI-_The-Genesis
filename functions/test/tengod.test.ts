/// <reference types="vitest" />
import { describe, expect, it } from 'vitest';
import { __test } from '../src/engine/calculation/v1';

const { getTenGod } = __test;

describe('getTenGod mapping', () => {
    it('maps same element/opposite polarity to 겁재', () => {
        expect(getTenGod('甲', '乙')).toBe('겁재');
    });

    it('maps generating cycle same polarity to 식신', () => {
        expect(getTenGod('甲', '丙')).toBe('식신');
    });

    it('maps wealth (Wood -> Earth) same polarity to 편재', () => {
        expect(getTenGod('甲', '戊')).toBe('편재');
    });

    it('returns UNKNOWN for invalid inputs', () => {
        expect(getTenGod('?', '?')).toBe('UNKNOWN');
    });
});
