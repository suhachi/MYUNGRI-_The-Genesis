import { Element } from '../tenGod';

/**
 * P7-ATOMIC-003: Fallback Phonetic Analysis (Reference Only)
 */

export interface FallbackNameAnalysis {
    char: string;
    hangul: string;
    phoneticElement: Element;
    isReferenceOnly: true; // STRICT: Must be true
    uiLabel: string; // "참고(Reference Only)"
    note: string; // "확정 불가"
}

// Simple Hangul Initial Consonant to Element Map (Hunminjeongeum Haerye)
// ㄱㅋ -> Wood
// ㄴㄷㄹㅌ -> Fire
// ㅁㅂㅍ -> Earth
// ㅅㅈㅊ -> Metal
// ㅇㅎ -> Water

function getHangulInitialElement(char: string): Element | null {
    // Decompose Hangul to get initial consonant
    const code = char.charCodeAt(0);
    if (code < 0xAC00 || code > 0xD7A3) return null; // Not Hangul Syllable

    const initialOffset = Math.floor((code - 0xAC00) / 588);
    const initials = [
        'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
    ];
    const initial = initials[initialOffset];

    if (['ㄱ', 'ㄲ', 'ㅋ'].includes(initial)) return 'Wood';
    if (['ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅌ'].includes(initial)) return 'Fire';
    if (['ㅁ', 'ㅂ', 'ㅃ', 'ㅍ'].includes(initial)) return 'Earth';
    if (['ㅅ', 'ㅆ', 'ㅈ', 'ㅉ', 'ㅊ'].includes(initial)) return 'Metal';
    if (['ㅇ', 'ㅎ'].includes(initial)) return 'Water';

    return null;
}

export function getFallbackAnalysis(char: string): FallbackNameAnalysis {
    // Case 1: Input is Hangul
    const element = getHangulInitialElement(char);

    // Case 2: Input is Hanja but missing in Kangxi
    // We default to 'Earth' as placeholder but mark referenceOnly.

    return {
        char,
        hangul: element ? char : "?",
        phoneticElement: element || "Earth",
        isReferenceOnly: true,
        uiLabel: "참고(Reference Only)",
        note: "확정 불가: 강희자전 데이터 없음"
    };
}

// Quality Gate Assertion
export function assertReferenceOnly(analysis: FallbackNameAnalysis) {
    if (analysis.isReferenceOnly !== true) {
        throw new Error("CRITICAL: Fallback analysis must be marked as Reference Only.");
    }
    if (analysis.uiLabel !== "참고(Reference Only)") {
        throw new Error("CRITICAL: UI Label mismatch for fallback analysis.");
    }
}
