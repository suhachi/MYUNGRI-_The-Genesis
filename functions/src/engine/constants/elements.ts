export type Element = 'Wood' | 'Fire' | 'Earth' | 'Metal' | 'Water';
export type Polarity = 'Yang' | 'Yin';

export const ELEMENTS: Record<string, Element> = {
    // 10 Stems
    "甲": "Wood", "乙": "Wood",
    "丙": "Fire", "丁": "Fire",
    "戊": "Earth", "己": "Earth",
    "庚": "Metal", "辛": "Metal",
    "壬": "Water", "癸": "Water",
    // 12 Branches
    "寅": "Wood", "卯": "Wood", "辰": "Earth",
    "巳": "Fire", "午": "Fire", "未": "Earth",
    "申": "Metal", "酉": "Metal", "戌": "Earth",
    "亥": "Water", "子": "Water", "丑": "Earth"
};

export const POLARITY: Record<string, Polarity> = {
    "甲": "Yang", "丙": "Yang", "戊": "Yang", "庚": "Yang", "壬": "Yang",
    "乙": "Yin", "丁": "Yin", "己": "Yin", "辛": "Yin", "癸": "Yin",
    "寅": "Yang", "辰": "Yang", "午": "Yang", "申": "Yang", "戌": "Yang", "子": "Yang",
    "卯": "Yin", "巳": "Yin", "未": "Yin", "酉": "Yin", "亥": "Yin", "丑": "Yin"
};
