import { hasHan } from './hasHan';
import { getKangxiInfo } from './kangxi';
import { getFallbackAnalysis } from './fallbackPhonetic';

export interface NamingResult {
    userName: string;
    hasHanja: boolean;
    hanjaDetails: {
        char: string;
        radical?: string;
        strokes?: number;
        meaning?: string;
        isFallback?: boolean;
    }[];
}

/**
 * [Phase 28] ATOMIC-R2-02: Deterministic Naming Engine
 * - Pure logic for Hanja analysis and phonetic fallback.
 */
export function analyzeNaming(userName: string): NamingResult {
    const hasHanja = hasHan(userName);
    const hanjaDetails: NamingResult['hanjaDetails'] = [];

    if (hasHanja) {
        for (const char of userName) {
            const data = getKangxiInfo(char);
            if (!data.missing) {
                hanjaDetails.push({
                    char,
                    radical: data.radical,
                    strokes: data.strokes,
                    meaning: data.meaning,
                    isFallback: false
                });
            } else {
                // [P7 Policy] Reference fallback for missing Kangxi data
                const fallback = getFallbackAnalysis(char);
                hanjaDetails.push({
                    char,
                    meaning: fallback.note,
                    isFallback: true
                });
            }
        }
    }

    return {
        userName,
        hasHanja,
        hanjaDetails
    };
}
