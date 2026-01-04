"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POLARITY = exports.ELEMENTS = void 0;
exports.assertElementPolarityCompleteness = assertElementPolarityCompleteness;
const ganzhi_1 = require("../calendar/ganzhi");
// Element mapping for Heavenly Stems and Earthly Branches
exports.ELEMENTS = {
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
exports.POLARITY = {
    甲: 'Yang', 丙: 'Yang', 戊: 'Yang', 庚: 'Yang', 壬: 'Yang',
    乙: 'Yin', 丁: 'Yin', 己: 'Yin', 辛: 'Yin', 癸: 'Yin',
    子: 'Yang', 寅: 'Yang', 辰: 'Yang', 午: 'Yang', 申: 'Yang', 戌: 'Yang',
    丑: 'Yin', 卯: 'Yin', 巳: 'Yin', 未: 'Yin', 酉: 'Yin', 亥: 'Yin'
};
// Integrity guard for Phase2 consistency
function assertElementPolarityCompleteness() {
    const missingElements = [...ganzhi_1.STEMS_HANJA, ...ganzhi_1.BRANCHES_HANJA].filter(k => exports.ELEMENTS[k] === undefined);
    const missingPolarity = [...ganzhi_1.STEMS_HANJA, ...ganzhi_1.BRANCHES_HANJA].filter(k => exports.POLARITY[k] === undefined);
    if (missingElements.length || missingPolarity.length) {
        throw new Error(`ELEMENTS/POLARITY mapping incomplete: elements missing ${missingElements.join(',')} polarity missing ${missingPolarity.join(',')}`);
    }
}
//# sourceMappingURL=elements.js.map