"use strict";
/**
 * SSOT for User Name Sanitization (Phase 28+)
 * Policy: No length-based rejection. Only allowed scripts (Hangul, Hanja, Alpha, Space).
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.detectScriptType = exports.sanitizeUserName = exports.NAME_SANITIZE_REGEX = exports.NAME_VALIDATION_REGEX = void 0;
// Unicode range for scripts. Using descriptive regex for readability.
// No inline regex should exist outside this file for userName.
exports.NAME_VALIDATION_REGEX = /^[\p{Script=Hangul}\p{Script=Han}a-zA-Z\s]*$/u;
// Fallback for environments where /u or \p is not supported (though rare in modern Node/Browsers)
exports.NAME_SANITIZE_REGEX = /[^\p{Script=Hangul}\p{Script=Han}a-zA-Z\s]/gu;
/**
 * Sanitizes the user name by removing any character not in the allowed scripts.
 * Policy: No length checks here.
 */
const sanitizeUserName = (name) => {
    if (!name)
        return "";
    return name.replace(exports.NAME_SANITIZE_REGEX, "");
};
exports.sanitizeUserName = sanitizeUserName;
/**
 * Identifies the primary script type of the name.
 */
const detectScriptType = (name) => {
    if (/\p{Script=Hangul}/u.test(name))
        return 'hangul';
    if (/\p{Script=Han}/u.test(name))
        return 'hanja';
    if (/[a-zA-Z]/.test(name))
        return 'alpha';
    return 'unknown';
};
exports.detectScriptType = detectScriptType;
//# sourceMappingURL=nameSanitize.js.map