/// <reference types="vitest" />
import { describe, expect, it } from 'vitest';
import { STEMS_HANJA, BRANCHES_HANJA } from '../src/engine/calendar/ganzhi';
import { ELEMENTS, POLARITY, assertElementPolarityCompleteness } from '../src/engine/constants/elements';

describe('elements/polarity completeness', () => {
    it('covers all stems/branches in element map', () => {
        const missing = [...STEMS_HANJA, ...BRANCHES_HANJA].filter(k => ELEMENTS[k] === undefined);
        expect(missing).toHaveLength(0);
    });

    it('covers all stems/branches in polarity map', () => {
        const missing = [...STEMS_HANJA, ...BRANCHES_HANJA].filter(k => POLARITY[k] === undefined);
        expect(missing).toHaveLength(0);
    });

    it('assertElementPolarityCompleteness throws when incomplete', () => {
        expect(() => assertElementPolarityCompleteness()).not.toThrow();
    });
});
