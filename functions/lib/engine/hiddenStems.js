"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HIDDEN_STEMS = void 0;
exports.getHiddenStems = getHiddenStems;
// Hidden stems mapping for each earthly branch (장간)
// Order preserved per traditional sequence
exports.HIDDEN_STEMS = {
    "子": ["癸"],
    "丑": ["己", "癸", "辛"],
    "寅": ["甲", "丙", "戊"],
    "卯": ["乙"],
    "辰": ["戊", "乙", "癸"],
    "巳": ["丙", "戊", "庚"],
    "午": ["丁", "己"],
    "未": ["己", "丁", "乙"],
    "申": ["庚", "壬", "戊"],
    "酉": ["辛"],
    "戌": ["戊", "辛", "丁"],
    "亥": ["壬", "甲"]
};
function getHiddenStems(branch) {
    return exports.HIDDEN_STEMS[branch] || [];
}
//# sourceMappingURL=hiddenStems.js.map