import { describe, it, expect } from 'vitest';
import { sanitizeUserName } from '../src/contracts/shared/nameSanitize';

describe('sanitizeUserName (Backend SSOT)', () => {
    it('should keep Hangul characters intact', () => {
        expect(sanitizeUserName('배종수')).toBe('배종수');
    });

    it('should keep Hanja characters intact', () => {
        expect(sanitizeUserName('裵')).toBe('裵');
    });

    it('should strip illegal special characters', () => {
        expect(sanitizeUserName('홍길동!!!')).toBe('홍길동');
    });

    it('should allow English and spaces', () => {
        expect(sanitizeUserName('Hong Gil Dong')).toBe('Hong Gil Dong');
    });

    it('should return empty string for empty input', () => {
        expect(sanitizeUserName('')).toBe('');
    });
});
