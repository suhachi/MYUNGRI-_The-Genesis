import { ELEMENTS, Element } from './tenGod';

export interface FiveElementResult {
    distribution: Record<Element, number>;
    total: number;
    biasMetric: number; // Standard deviation (lower = 균형, higher = 편중)
    unknownSymbols: string[]; // Unmapped stems/branches to aid QA
}

export function calculateFiveElements(chars: string[]): FiveElementResult {
    const distribution: Record<Element, number> = {
        "Wood": 0, "Fire": 0, "Earth": 0, "Metal": 0, "Water": 0
    };

    let total = 0;
    const unknownSymbols: string[] = [];

    for (const char of chars) {
        const elem = ELEMENTS[char];
        if (elem) {
            distribution[elem as Element]++;
            total++;
        } else {
            unknownSymbols.push(char);
        }
    }

    if (chars.length > 0 && total === 0) {
        throw new Error('FIVE_ELEMENTS_NO_MAPPED_SYMBOLS');
    }

    // 편중도: 표준편차를 사용해 오행 치우침 정도를 수치화한다.
    const mean = total / 5;
    let sumSqDiff = 0;

    for (const key of Object.keys(distribution)) {
        const count = distribution[key as Element];
        sumSqDiff += Math.pow(count - mean, 2);
    }

    const variance = sumSqDiff / 5;
    const stdDev = Math.sqrt(variance);

    return {
        distribution,
        total,
        biasMetric: parseFloat(stdDev.toFixed(4)),
        unknownSymbols
    };
}
