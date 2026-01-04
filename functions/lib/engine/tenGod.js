"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.POLARITY = exports.ELEMENTS = void 0;
exports.getElement = getElement;
exports.getPolarity = getPolarity;
exports.getTenGod = getTenGod;
const elements_1 = require("./constants/elements");
Object.defineProperty(exports, "ELEMENTS", { enumerable: true, get: function () { return elements_1.ELEMENTS; } });
Object.defineProperty(exports, "POLARITY", { enumerable: true, get: function () { return elements_1.POLARITY; } });
function getElement(char) {
    return elements_1.ELEMENTS[char] || null;
}
function getPolarity(char) {
    return elements_1.POLARITY[char] || null;
}
function getTenGod(dayStem, target) {
    const dE = elements_1.ELEMENTS[dayStem];
    const dP = elements_1.POLARITY[dayStem];
    const tE = elements_1.ELEMENTS[target];
    const tP = elements_1.POLARITY[target];
    if (!dE || !tE)
        return "UNKNOWN";
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
//# sourceMappingURL=tenGod.js.map