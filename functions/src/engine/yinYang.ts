import { POLARITY } from './tenGod';

export interface YinYangResult {
    yinCount: number;
    yangCount: number;
    ratio: number; // Percentage of Yang (0.0 to 1.0)
    details: {
        yin: number;
        yang: number;
        total: number;
    }
}

export function calculateYinYang(chars: string[]): YinYangResult {
    let yin = 0;
    let yang = 0;
    let total = 0;

    for (const char of chars) {
        const p = POLARITY[char];
        if (p === 'Yang') yang++;
        else if (p === 'Yin') yin++;

        if (p) total++;
    }

    // Ratio: Portion of Yang
    const ratio = total > 0 ? parseFloat((yang / total).toFixed(2)) : 0;

    return {
        yinCount: yin,
        yangCount: yang,
        ratio,
        details: { yin, yang, total }
    };
}
