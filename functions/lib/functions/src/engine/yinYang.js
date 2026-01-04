"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateYinYang = calculateYinYang;
const tenGod_1 = require("./tenGod");
function calculateYinYang(chars) {
    let yin = 0;
    let yang = 0;
    let total = 0;
    for (const char of chars) {
        const p = tenGod_1.POLARITY[char];
        if (p === 'Yang')
            yang++;
        else if (p === 'Yin')
            yin++;
        if (p)
            total++;
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
//# sourceMappingURL=yinYang.js.map