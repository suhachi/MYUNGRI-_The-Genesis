"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.analyzeNaming = analyzeNaming;
const hasHan_1 = require("./hasHan");
const kangxi_1 = require("./kangxi");
const fallbackPhonetic_1 = require("./fallbackPhonetic");
/**
 * [Phase 28] ATOMIC-R2-02: Deterministic Naming Engine
 * - Pure logic for Hanja analysis and phonetic fallback.
 */
function analyzeNaming(userName) {
    const hasHanja = (0, hasHan_1.hasHan)(userName);
    const hanjaDetails = [];
    if (hasHanja) {
        for (const char of userName) {
            const data = (0, kangxi_1.getKangxiInfo)(char);
            if (!data.missing) {
                hanjaDetails.push({
                    char,
                    radical: data.radical,
                    strokes: data.strokes,
                    meaning: data.meaning,
                    isFallback: false
                });
            }
            else {
                // [P7 Policy] Reference fallback for missing Kangxi data
                const fallback = (0, fallbackPhonetic_1.getFallbackAnalysis)(char);
                hanjaDetails.push({
                    char,
                    meaning: fallback.note,
                    isFallback: true
                });
            }
        }
    }
    return {
        userName,
        hasHanja,
        hanjaDetails
    };
}
//# sourceMappingURL=index.js.map