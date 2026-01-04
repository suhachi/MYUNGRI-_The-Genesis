"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JIJI_BANGHAB = exports.JIJI_SAMHAB = exports.JIJI_CHUNG = exports.JIJI_YUKHAB = exports.CHEONGAN_CHUNG = exports.CHEONGAN_HAB = void 0;
exports.CHEONGAN_HAB = {
    "甲己": "Earth", "己甲": "Earth",
    "乙庚": "Metal", "庚乙": "Metal",
    "丙辛": "Water", "辛丙": "Water",
    "丁壬": "Wood", "壬丁": "Wood",
    "戊癸": "Fire", "癸戊": "Fire"
};
// Chung (7th kill)
exports.CHEONGAN_CHUNG = {
    "甲庚": true, "庚甲": true,
    "乙辛": true, "辛乙": true,
    "丙壬": true, "壬丙": true,
    "丁癸": true, "癸丁": true
    // Some schools include Mu-Gap, etc. Standard 4 Chungs usually.
};
exports.JIJI_YUKHAB = {
    "子丑": "Earth", "丑子": "Earth",
    "寅亥": "Wood", "亥寅": "Wood",
    "卯戌": "Fire", "戌卯": "Fire",
    "辰酉": "Metal", "酉辰": "Metal",
    "巳申": "Water", "申巳": "Water",
    "午未": "Fire", "未午": "Fire" // Or Earth in some texts. Fire/Earth is common debate. Fire is standard in modern Myungri? Or Earth? 
    // Usually "Fire" or "Earth". Let's say "Fire" effectively or "Earth" produced.
    // Standard text often says "Om-Mi Hab Hwa (Fire)" or "Om-Mi Hab To (Earth)".
    // Let's stick to a safe label or specific project convention. Defaulting to "Fire" (Hwa).
    // Actually, "Earth" is increasingly common usage in some circles. 
    // Let's use "Fire" (Hwa) as traditional "Om-Mi Hab Hwa".
};
exports.JIJI_CHUNG = {
    "子午": true, "午子": true,
    "丑未": true, "未丑": true,
    "寅申": true, "申寅": true,
    "卯酉": true, "酉卯": true,
    "辰戌": true, "戌辰": true,
    "巳亥": true, "亥巳": true
};
// SamHab (Three Combines)
// In-O-Sul -> Fire, Sa-Yu-Chuk -> Metal, Sin-Ja-Jin -> Water, Hae-Myo-Mi -> Wood
exports.JIJI_SAMHAB = [
    { key: "寅午戌", value: "Fire" },
    { key: "巳酉丑", value: "Metal" },
    { key: "申子辰", value: "Water" },
    { key: "亥卯未", value: "Wood" }
];
exports.JIJI_BANGHAB = [
    { key: "寅卯辰", value: "Wood" },
    { key: "巳午未", value: "Fire" },
    { key: "申酉戌", value: "Metal" },
    { key: "亥子丑", value: "Water" }
];
// Gongmang Table (Day Stem based)
// GapJa/EulChuk/.... -> Sul/Hae
// We can compute by index diff.
// Gap(0)..Gye(9), Ja(0)..Hae(11).
// (BranchIdx - StemIdx + 12) % 12 -> gives the start of the cycle? No.
// Xun (Soon) logic.
// Efficient way:
// Determine Xun: (BranchIdx - StemIdx).
// If < 0, +12.
// Example: Gap(0) Ja(0) -> 0. Xun starts at 0? No, GapJa is start.
// Void branches are the ones left over.
// Cycle has 10 stems, 12 branches. 2 branches defined as Gongmang per Xun.
// Values: (10 + (BranchIdx - StemIdx)) % 12 and next one.
// Let's verify: GapJa (0,0) -> 0. (10 + 0) % 12 = 10 (Sul), 11 (Hae). Correct.
// GapSul (0,10) -> (10 + 10) % 12 = 8 (Sin), 9 (Yu). Correct.
// Simple formula:
// Void1 = (10 + BranchIdx - StemIdx) % 12.
// Void2 = (Void1 + 1) % 12.
//# sourceMappingURL=rules.js.map