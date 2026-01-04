import { describe, it, expect } from 'vitest';
import { hasHan } from '../src/engine/name/hasHan';
import { getKangxiInfo } from '../src/engine/name/kangxi';
import { getFallbackAnalysis, assertReferenceOnly } from '../src/engine/name/fallbackPhonetic';

describe('Phase 7: Name Analysis', () => {
    
    it('P7-ATOMIC-001: Should detect Han characters correctly', () => {
        expect(hasHan('홍길동')).toBe(false);
        expect(hasHan('洪길동')).toBe(true);
        expect(hasHan('洪吉童')).toBe(true);
        expect(hasHan('Hong Gil Dong')).toBe(false);
        expect(hasHan('洪 Gil Dong')).toBe(true);
    });

    it('P7-ATOMIC-002: Should retrieve Kangxi data or report missing', () => {
        // Existing data
        const hong = getKangxiInfo('洪');
        expect(hong.missing).toBe(false);
        expect(hong.strokes).toBe(10);
        expect(hong.element).toBe('Water');

        // Missing data
        const unknown = getKangxiInfo('꽥'); // Not in DB
        expect(unknown.missing).toBe(true);
        expect(unknown.strokes).toBe(0);
    });

    it('P7-ATOMIC-003: Should provide fallback analysis with Reference Only flag', () => {
        // Hangul input fallback
        const fallback = getFallbackAnalysis('김');
        expect(fallback.isReferenceOnly).toBe(true);
        expect(fallback.uiLabel).toBe('참고(Reference Only)');
        expect(fallback.phoneticElement).toBe('Wood'); // ㄱ -> Wood

        // Assertion check
        expect(() => assertReferenceOnly(fallback)).not.toThrow();

        // Missing Hanja fallback
        const unknownHanja = getFallbackAnalysis('無');
        expect(unknownHanja.isReferenceOnly).toBe(true);
        expect(unknownHanja.phoneticElement).toBe('Earth'); // Default
    });
});
