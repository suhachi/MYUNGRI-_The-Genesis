"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getKangxiInfo = getKangxiInfo;
// Sample Data (In-memory for Atomic, usually loaded from large JSON)
// We will put a few examples for testing.
const KANGXI_DATA = {
    "洪": { strokes: 10, meaning: "넓을 홍", element: "Water" }, // Water radical
    "吉": { strokes: 6, meaning: "길할 길", element: "Wood" },
    "童": { strokes: 12, meaning: "아이 동", element: "Fire" },
    "甲": { strokes: 5, meaning: "갑옷 갑", element: "Wood" },
    "子": { strokes: 3, meaning: "아들 자", element: "Water" }
};
function getKangxiInfo(char) {
    const data = KANGXI_DATA[char];
    if (!data) {
        return {
            char,
            strokes: 0,
            missing: true
        };
    }
    return {
        char,
        ...data,
        missing: false
    };
}
//# sourceMappingURL=kangxi.js.map