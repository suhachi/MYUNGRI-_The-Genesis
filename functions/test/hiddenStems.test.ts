/// <reference types="vitest" />
import { describe, expect, it } from 'vitest';
import { getHiddenStems, HIDDEN_STEMS } from '../src/engine/hiddenStems';

describe('hidden stems mapping', () => {
    it('returns ordered hidden stems for each branch', () => {
        expect(getHiddenStems('丑')).toEqual(['己', '癸', '辛']);
        expect(getHiddenStems('申')).toEqual(['庚', '壬', '戊']);
        expect(getHiddenStems('酉')).toEqual(['辛']);
    });

    it('is empty for unknown branch', () => {
        expect(getHiddenStems('?')).toEqual([]);
    });

    it('covers all 12 branches', () => {
        const keys = Object.keys(HIDDEN_STEMS);
        expect(keys.sort()).toEqual(['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'].sort());
    });
});
