import { Element } from '../tenGod';

/**
 * P7-ATOMIC-002: Kangxi Dictionary Data Loader
 * 
 * Data Format Specification:
 * - Key: Han character (string)
 * - Value: {
 *     strokes: number (Kangxi stroke count, NOT modern stroke count),
 *     meaning?: string,
 *     element?: Element (Five Element based on sound or shape, usually sound in Hangul name analysis, but Kangxi often implies shape/meaning),
 *     sourceMeta?: string
 *   }
 */

export interface KangxiInfo {
    char: string;
    strokes: number;
    meaning?: string;
    element?: Element;
    radical?: string; // Added for R2-02
    sourceMeta?: string;
    missing: boolean;
}

// Sample Data (In-memory for Atomic, usually loaded from large JSON)
// We will put a few examples for testing.
const KANGXI_DATA: Record<string, Omit<KangxiInfo, 'char' | 'missing'>> = {
    "洪": { strokes: 10, meaning: "넓을 홍", element: "Water" }, // Water radical
    "吉": { strokes: 6, meaning: "길할 길", element: "Wood" },
    "童": { strokes: 12, meaning: "아이 동", element: "Fire" },
    "甲": { strokes: 5, meaning: "갑옷 갑", element: "Wood" },
    "子": { strokes: 3, meaning: "아들 자", element: "Water" }
};

export function getKangxiInfo(char: string): KangxiInfo {
    const data = KANGXI_DATA[char];

    if (!data) {
        return {
            char,
            strokes: 0,
            missing: true
        };
    }

    return {
        char,
        ...data,
        missing: false
    };
}
