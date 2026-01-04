"use strict";
/**
 * P8-ATOMIC-003: Banned Phrases and Patterns
 * Prevents generic fortune-telling tone and placeholders.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.BANNED_PATTERNS = exports.BANNED_PHRASES = void 0;
exports.BANNED_PHRASES = [
    // Placeholders
    "데이터가 없습니다",
    "확인 필요",
    "추후 업데이트",
    "Lorem ipsum",
    "TBD",
    // Generic Fortune Telling (Barnum Statements)
    "전반적으로 무난합니다",
    "마음먹기에 달렸습니다",
    "노력하면 좋은 결과가 있을 것입니다",
    "좋은 일이 생길 수도 있고 나쁜 일이 생길 수도 있습니다",
    "대체로 좋습니다",
    "평범한 운세입니다",
    "조심하는 것이 좋습니다", // Too generic without context
    "모든 것은 당신에게 달려있습니다",
    // Ambiguous/Lazy
    "알 수 없음",
    "분석 불가", // Unless specific error handled elsewhere
    "..."
];
exports.BANNED_PATTERNS = [
    /운세.*참고.*바랍니다/i, // Generic disclaimer inside content
    /믿거나.*말거나/i,
    /재미로.*보세요/i
];
//# sourceMappingURL=bannedPhrases.js.map