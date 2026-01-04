import { ELEMENTS, POLARITY } from './constants/elements';
export { ELEMENTS, POLARITY };
export type Element = 'Wood' | 'Fire' | 'Earth' | 'Metal' | 'Water';
export type Polarity = 'Yang' | 'Yin';

export function getElement(char: string): Element | null {
    return (ELEMENTS[char] as Element) || null;
}

export function getPolarity(char: string): Polarity | null {
    return (POLARITY[char] as Polarity) || null;
}

export function getTenGod(dayStem: string, target: string): string {
    const dE = ELEMENTS[dayStem];
    const dP = POLARITY[dayStem];
    const tE = ELEMENTS[target];
    const tP = POLARITY[target];

    if (!dE || !tE) return "UNKNOWN";

    const order = ["Wood", "Fire", "Earth", "Metal", "Water"];
    const dIdx = order.indexOf(dE);
    const tIdx = order.indexOf(tE);
    const diff = (tIdx - dIdx + 5) % 5;

    const sameP = (dP === tP);

    switch (diff) {
        case 0: return sameP ? "비견" : "겁재";
        case 1: return sameP ? "식신" : "상관";
        case 2: return sameP ? "편재" : "정재";
        case 3: return sameP ? "편관" : "정관";
        case 4: return sameP ? "편인" : "정인";
        default: return "UNKNOWN";
    }
}
