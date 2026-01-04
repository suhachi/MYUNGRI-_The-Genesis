"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.STRENGTH_WEIGHTS = void 0;
exports.STRENGTH_WEIGHTS = {
    monthBranch: 40, // 득령 (Got Command of Season)
    dayBranch: 15, // 득지 (Got Ground)
    yearStem: 10,
    monthStem: 10,
    hourStem: 10,
    yearBranch: 5,
    hourBranch: 10
};
// Runtime Validation
const total = Object.values(exports.STRENGTH_WEIGHTS).reduce((a, b) => a + b, 0);
if (total !== 100) {
    throw new Error(`Strength Weights total must be 100, got ${total}`);
}
//# sourceMappingURL=strengthWeights.js.map