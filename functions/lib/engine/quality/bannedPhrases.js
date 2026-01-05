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
    "빈 값",
    "내용 없음",
    "[object Object]",
    "undefined",
    "null",
    // Generic Fortune Telling (Barnum Statements)
    "전반적으로 무난합니다",
    "마음먹기에 달렸습니다",
    "노력하면 좋은 결과가 있을 것입니다",
    "좋은 일이 생길 수도 있고 나쁜 일이 생길 수도 있습니다",
    "대체로 좋습니다",
    "평범한 운세입니다",
    "조심하는 것이 좋습니다",
    "모든 것은 당신에게 달려있습니다",
    "그냥 그렇습니다",
    "특별한 것이 없습니다",
    // Ambiguous/Lazy
    "알 수 없음",
    "분석 불가",
    "계산 중...",
    "..."
];
exports.BANNED_PATTERNS = [
    /운세.*참고.*바랍니다/i,
    /믿거나.*말거나/i,
    /재미로.*보세요/i,
    /데이터가.*공개되지.*않았습니다/i,
    /정확한.*분석.*어렵습니다/i
];
//# sourceMappingURL=bannedPhrases.js.map