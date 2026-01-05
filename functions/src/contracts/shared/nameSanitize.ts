/**
 * SSOT for User Name Sanitization (Phase 28+)
 * Policy: No length-based rejection. Only allowed scripts (Hangul, Hanja, Alpha, Space).
 */

// Unicode range for scripts. Using descriptive regex for readability.
// No inline regex should exist outside this file for userName.
export const NAME_VALIDATION_REGEX = /^[\p{Script=Hangul}\p{Script=Han}a-zA-Z\s]*$/u;

// Fallback for environments where /u or \p is not supported (though rare in modern Node/Browsers)
export const NAME_SANITIZE_REGEX = /[^\p{Script=Hangul}\p{Script=Han}a-zA-Z\s]/gu;

/**
 * Sanitizes the user name by removing any character not in the allowed scripts.
 * Policy: No length checks here.
 */
export const sanitizeUserName = (name: string): string => {
    if (!name) return "";
    return name.replace(NAME_SANITIZE_REGEX, "");
};

/**
 * Identifies the primary script type of the name.
 */
export const detectScriptType = (name: string): 'hangul' | 'hanja' | 'alpha' | 'unknown' => {
    if (/\p{Script=Hangul}/u.test(name)) return 'hangul';
    if (/\p{Script=Han}/u.test(name)) return 'hanja';
    if (/[a-zA-Z]/.test(name)) return 'alpha';
    return 'unknown';
};
