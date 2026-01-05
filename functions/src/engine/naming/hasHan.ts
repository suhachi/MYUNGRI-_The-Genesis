/**
 * P7-ATOMIC-001: Detect Han characters in userName
 */

// Regex to match any Han character (CJK Unified Ideographs, etc.)
// Using Unicode Property Escapes if supported, or range fallback.
// Node 20 supports property escapes.
const HAN_REGEX = /\p{Script=Han}/u;

export function hasHan(userName: string): boolean {
    if (!userName) return false;
    return HAN_REGEX.test(userName);
}
