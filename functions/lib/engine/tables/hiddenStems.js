"use strict";
// Traditional Hidden Stems Table (Ji-Jang-Gan)
// Source: Traditional Rate (Days)
// Note: This table represents the standard "Humanly Meta" or "General" usage.
// Weights are approximate days in a month.
Object.defineProperty(exports, "__esModule", { value: true });
exports.HIDDEN_STEMS = void 0;
exports.getHiddenStems = getHiddenStems;
// 12 Branches: 子 丑 寅 卯 辰 巳 午 未 申 酉 戌 亥
exports.HIDDEN_STEMS = {
    // Standard: Ja contains Im(10), Gui(20)
    "子": [
        { stem: "壬", label: "임", days: 10 },
        { stem: "癸", label: "계", days: 20 }
    ],
    "丑": [
        { stem: "癸", label: "계", days: 9 },
        { stem: "辛", label: "신", days: 3 },
        { stem: "己", label: "기", days: 18 }
    ],
    "寅": [
        { stem: "戊", label: "무", days: 7 },
        { stem: "丙", label: "병", days: 7 },
        { stem: "甲", label: "갑", days: 16 }
    ],
    "卯": [
        { stem: "甲", label: "갑", days: 10 },
        { stem: "乙", label: "을", days: 20 }
    ],
    "辰": [
        { stem: "乙", label: "을", days: 9 },
        { stem: "癸", label: "계", days: 3 },
        { stem: "戊", label: "무", days: 18 }
    ],
    "巳": [
        { stem: "戊", label: "무", days: 7 },
        { stem: "庚", label: "경", days: 7 },
        { stem: "丙", label: "병", days: 16 }
    ],
    "午": [
        { stem: "丙", label: "병", days: 10 },
        { stem: "己", label: "기", days: 9 },
        { stem: "丁", label: "정", days: 11 }
    ],
    "未": [
        { stem: "丁", label: "정", days: 9 },
        { stem: "乙", label: "을", days: 3 },
        { stem: "己", label: "기", days: 18 }
    ],
    "申": [
        { stem: "戊", label: "무", days: 7 },
        { stem: "壬", label: "임", days: 7 },
        { stem: "庚", label: "경", days: 16 }
    ],
    "酉": [
        { stem: "庚", label: "경", days: 10 },
        { stem: "辛", label: "신", days: 20 }
    ],
    "戌": [
        { stem: "辛", label: "신", days: 9 },
        { stem: "丁", label: "정", days: 3 },
        { stem: "戊", label: "무", days: 18 }
    ],
    "亥": [
        { stem: "戊", label: "무", days: 7 },
        { stem: "甲", label: "갑", days: 7 },
        { stem: "壬", label: "임", days: 16 }
    ]
};
function getHiddenStems(branch) {
    return exports.HIDDEN_STEMS[branch] || [];
}
//# sourceMappingURL=hiddenStems.js.map