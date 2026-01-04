import { STEMS_HANJA, BRANCHES_HANJA } from '../calendar/ganzhi';

// Element mapping for Heavenly Stems and Earthly Branches
export const ELEMENTS: Record<string, string> = {
    甲: 'Wood', 乙: 'Wood',
    丙: 'Fire', 丁: 'Fire',
    戊: 'Earth', 己: 'Earth',
    庚: 'Metal', 辛: 'Metal',
    壬: 'Water', 癸: 'Water',
    寅: 'Wood', 卯: 'Wood',
    巳: 'Fire', 午: 'Fire',
    辰: 'Earth', 戌: 'Earth', 丑: 'Earth', 未: 'Earth',
    申: 'Metal', 酉: 'Metal',
    亥: 'Water', 子: 'Water'
};

// Polarity mapping (Yang/Yin)
export const POLARITY: Record<string, string> = {
    甲: 'Yang', 丙: 'Yang', 戊: 'Yang', 庚: 'Yang', 壬: 'Yang',
    乙: 'Yin', 丁: 'Yin', 己: 'Yin', 辛: 'Yin', 癸: 'Yin',
    子: 'Yang', 寅: 'Yang', 辰: 'Yang', 午: 'Yang', 申: 'Yang', 戌: 'Yang',
    丑: 'Yin', 卯: 'Yin', 巳: 'Yin', 未: 'Yin', 酉: 'Yin', 亥: 'Yin'
};

// Integrity guard for Phase2 consistency
export function assertElementPolarityCompleteness(): void {
    const missingElements = [...STEMS_HANJA, ...BRANCHES_HANJA].filter(k => ELEMENTS[k] === undefined);
    const missingPolarity = [...STEMS_HANJA, ...BRANCHES_HANJA].filter(k => POLARITY[k] === undefined);
    if (missingElements.length || missingPolarity.length) {
        throw new Error(`ELEMENTS/POLARITY mapping incomplete: elements missing ${missingElements.join(',')} polarity missing ${missingPolarity.join(',')}`);
    }
}
