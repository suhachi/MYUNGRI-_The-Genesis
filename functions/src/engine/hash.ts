import * as crypto from 'crypto';

/**
 * P0-ATOMIC-003: Determinism Hash Implementation
 * Generates a SHA-256 hash from a set of key-value pairs or an object.
 * Used to verify the integrity and consistency of engine outputs.
 */
export function generateDeterminismHash(data: any): string {
    // Sort keys to ensure consistent serialization
    const sortedData = sortObjectKeys(data);
    const serialized = JSON.stringify(sortedData);

    return crypto
        .createHash('sha256')
        .update(serialized)
        .digest('hex');
}

function sortObjectKeys(obj: any): any {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    if (Array.isArray(obj)) {
        return obj.map(sortObjectKeys);
    }

    return Object.keys(obj)
        .sort()
        .reduce((acc: any, key) => {
            acc[key] = sortObjectKeys(obj[key]);
            return acc;
        }, {});
}
