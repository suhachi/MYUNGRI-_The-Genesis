"use strict";
/**
 * ATOMIC-01: Shared Name Sanitize Utility
 * Single Source of Truth for User Name Validation & Sanitization
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.NAME_SANITIZE = exports.NAME_VALIDATION_REGEX = exports.ALLOWED_CHARS_FALLBACK = exports.ALLOWED_CHARS_PATTERN = void 0;
exports.sanitizeUserName = sanitizeUserName;
// 1. Definition of Allowed Characters (Source String)
// Hangul (Syllables + Jamo), Han (Hanja), English, Whitespace
exports.ALLOWED_CHARS_PATTERN = String.raw `\p{Script=Hangul}\p{Script=Han}a-zA-Z\s`;
exports.ALLOWED_CHARS_FALLBACK = String.raw `ㄱ-ㅎㅏ-ㅣ가-힣一-龥a-zA-Z\s`;
// 2. Validation Regex (Anchored)
// Used by Zod or other validators to check if a string is fully valid
exports.NAME_VALIDATION_REGEX = (() => {
    try {
        return new RegExp(`^[${exports.ALLOWED_CHARS_PATTERN}]*$`, 'u');
    }
    catch (e) {
        return new RegExp(`^[${exports.ALLOWED_CHARS_FALLBACK}]*$`);
    }
})();
// 3. Sanitize Regex (Global, Negated)
// Used to strip invalid characters
exports.NAME_SANITIZE = (() => {
    try {
        return new RegExp(`[^${exports.ALLOWED_CHARS_PATTERN}]`, 'gu');
    }
    catch (e) {
        return new RegExp(`[^${exports.ALLOWED_CHARS_FALLBACK}]`, 'g');
    }
})();
/**
 * Sanitize User Name
 * Removes any character that is not Hangul, Hanja, English, or Whitespace.
 * @param raw Input string
 * @returns Sanitized string
 */
function sanitizeUserName(raw) {
    if (!raw)
        return '';
    return raw.replace(exports.NAME_SANITIZE, '');
}
//# sourceMappingURL=nameSanitize.js.map