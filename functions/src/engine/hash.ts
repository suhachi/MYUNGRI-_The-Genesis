import * as crypto from 'crypto';

/**
 * Stable Stringify for JSON
 * Sorts keys recursively to ensure deterministic output.
 */
function stableStringify(obj: any): string {
    if (obj === null || typeof obj !== 'object') {
        return JSON.stringify(obj);
    }
    if (Array.isArray(obj)) {
        return '[' + obj.map(stableStringify).join(',') + ']';
    }
    const sortedKeys = Object.keys(obj).sort();
    const parts = sortedKeys.map(key => {
        return JSON.stringify(key) + ':' + stableStringify(obj[key]);
    });
    return '{' + parts.join(',') + '}';
}

export function computeDeterminismHash(payload: any): string {
    const str = stableStringify(payload);
    return crypto.createHash('sha256').update(str).digest('hex');
}
