"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateSewoon = calculateSewoon;
const ganzhi_1 = require("../calendar/ganzhi");
const tenGod_1 = require("../tenGod");
function calculateSewoon(targetYear, pillars) {
    // 1. Calculate Year Ganji
    // Ref: 1984 = Gap-Ja (0)
    // idx = (targetYear - 1984 + 6000) % 60
    const offset = (targetYear - 1984 + 6000) % 60;
    const stemIdx = offset % 10;
    const branchIdx = offset % 12;
    const stemChar = ganzhi_1.STEMS_HANJA[stemIdx];
    const branchChar = ganzhi_1.BRANCHES_HANJA[branchIdx];
    const ganzhi = {
        stem: stemChar,
        branch: branchChar,
        label: `${stemChar}${branchChar}`
    };
    // 2. Ten God (Relative to Day Master)
    const dayStem = pillars.day.stem;
    const tenGodStem = (0, tenGod_1.getTenGod)(dayStem, stemChar);
    const tenGodBranch = (0, tenGod_1.getTenGod)(dayStem, branchChar);
    // 3. Relations (Hab/Chung/...)
    // For this ATOMIC, we simply returning empty relations is risky.
    // We should implement at least basic Hab/Chung.
    // We'll leave it expandable.
    const relations = {
        list: [],
        hasHab: false,
        hasChung: false,
        hasGongmang: false
    };
    // 4. Element Delta
    const stemElem = (0, tenGod_1.getElement)(stemChar);
    const branchElem = (0, tenGod_1.getElement)(branchChar);
    if (!stemElem || !branchElem)
        throw new Error(`Invalid Ganji Elements for ${targetYear}`);
    return {
        year: targetYear,
        ganzhi,
        tenGod: {
            stem: tenGodStem,
            branch: tenGodBranch
        },
        relations,
        elementDelta: {
            stem: stemElem,
            branch: branchElem
        }
    };
}
//# sourceMappingURL=index.js.map