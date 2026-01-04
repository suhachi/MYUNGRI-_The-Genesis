/// <reference types="vitest" />
import { describe, expect, it, vi, afterEach } from 'vitest';
import * as time from '../src/engine/calendar/time';

const winterDate = time.parseYMDToUTCDate('2024-02-05');
const autumnDate = time.parseYMDToUTCDate('2024-11-03'); // eot 양수 구간

afterEach(() => {
    vi.restoreAllMocks();
});

describe('calculateTrueSolarTime classification', () => {
    it('flags 조자시 when true solar minutes are early night', () => {
        const res = time.calculateTrueSolarTime(winterDate, '01:00', 'Asia/Seoul');
        expect(res.classification).toBe('조자시');
        expect(res.dayShift).toBe(0);
    });

    it('flags 야자시 with day shift when local midnight wraps negative offset but eot 양수로 상쇄', () => {
        const res = time.calculateTrueSolarTime(autumnDate, '00:00', 'Asia/Seoul');
        expect(res.dayShift).toBe(-1);
        expect(res.classification).toBe('야자시');
        expect(res.trueSolarHHmm).toMatch(/^\d{2}:\d{2}$/);
    });

    it('keeps 일반 during daytime', () => {
        const res = time.calculateTrueSolarTime(winterDate, '12:00', 'Asia/Seoul');
        expect(res.classification).toBe('일반');
        expect(res.dayShift).toBe(0);
    });

    it('warns on non-KST timezone inputs', () => {
        const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
        time.calculateTrueSolarTime(winterDate, '12:00', 'UTC');
        expect(warnSpy).toHaveBeenCalled();
    });

    it('computes offset for non-KST timezone using Intl', () => {
        const res = time.calculateTrueSolarTime(winterDate, '12:00', 'UTC');
        expect(res.timezoneNote).toContain('Non-KST');
        expect(res.totalOffsetMin).toBeTypeOf('number');
    });
});
