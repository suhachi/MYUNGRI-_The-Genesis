"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateFiveElements = calculateFiveElements;
const tenGod_1 = require("./tenGod");
function calculateFiveElements(chars) {
    const distribution = {
        "Wood": 0, "Fire": 0, "Earth": 0, "Metal": 0, "Water": 0
    };
    let total = 0;
    const unknownSymbols = [];
    for (const char of chars) {
        const elem = tenGod_1.ELEMENTS[char];
        if (elem) {
            distribution[elem]++;
            total++;
        }
        else {
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
        const count = distribution[key];
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
//# sourceMappingURL=fiveElements.js.map