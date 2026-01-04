export type ScriptType = 'hanja' | 'hangul' | 'unknown';

/**
 * Detects the script type of a given name string
 * @param input - The name string to analyze
 * @returns 'hanja' if contains Han characters, 'hangul' if contains Hangul, 'unknown' otherwise
 */
export function detectScriptType(input: string): ScriptType {
    const s = (input ?? '').trim();
    if (!s) return 'unknown';

    // If Han appears anywhere → hanja (mixed strings with Han are treated as hanja)
    if (/\p{Script=Han}/u.test(s)) return 'hanja';

    // If Hangul appears → hangul
    if (/\p{Script=Hangul}/u.test(s)) return 'hangul';

    return 'unknown';
}
