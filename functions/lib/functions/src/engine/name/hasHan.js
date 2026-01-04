"use strict";
/**
 * P7-ATOMIC-001: Detect Han characters in userName
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasHan = hasHan;
// Regex to match any Han character (CJK Unified Ideographs, etc.)
// Using Unicode Property Escapes if supported, or range fallback.
// Node 20 supports property escapes.
const HAN_REGEX = /\p{Script=Han}/u;
function hasHan(userName) {
    if (!userName)
        return false;
    return HAN_REGEX.test(userName);
}
//# sourceMappingURL=hasHan.js.map