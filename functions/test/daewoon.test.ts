/// <reference types="vitest" />
import { describe, expect, it } from 'vitest';
import { calculateDaewoon, generateDaewoonSegments } from '../src/engine/daewoon';
import { calculatePillars } from '../src/engine/pillars';

describe('calculateDaewoon core logic', () => {
    it('computes forward direction and start age from next solar term (male, Yang year stem)', () => {
        const res = calculateDaewoon({
            birthDate: '2024-02-05',
            birthTime: '12:00',
            sex: 'male',
            yearStem: '甲',
            monthStem: '丙',
            monthBranch: '寅',
            timezone: 'Asia/Seoul'
        });

        expect(res.direction).toBe('forward');
        expect(res.startAge).toBeGreaterThan(0);
        expect(res.startAge).toBeLessThan(6); // Feb 5 -> next term ~ Feb 19
        expect(res.segments[0].ganzhi.label).toBe('丁卯'); // month pillar +1 forward
        expect(res.segments).toHaveLength(10);
        // 3일=1년 규칙: deltaMin/ (60*24*3) ~= startAge
        const ageFromDelta = res.deltaMin / (60 * 24 * 3);
        expect(Math.abs(ageFromDelta - res.startAge)).toBeLessThan(0.05);
    });

    it('computes backward direction for female Yang year stem', () => {
        const res = calculateDaewoon({
            birthDate: '2024-02-05',
            birthTime: '12:00',
            sex: 'female',
            yearStem: '甲',
            monthStem: '丙',
            monthBranch: '寅',
            timezone: 'Asia/Seoul'
        });

        expect(res.direction).toBe('backward');
        expect(res.segments[0].ganzhi.label).toBe('乙丑'); // month pillar -1 backward
    });
});

describe('generateDaewoonSegments mechanics', () => {
    it('wraps stem/branch cycles correctly with direction', () => {
        const segs = generateDaewoonSegments('癸', '亥', 'forward', 3.5);
        expect(segs[0].ganzhi.label).toBe('甲子');
        expect(segs[1].ganzhi.label).toBe('乙丑');
        expect(segs[0].startAge).toBe(3);
        expect(segs[0].endAge).toBe(12);
    });
});

describe('daewoon boundaries and tz handling', () => {
    it('handles ipchun boundary (day before) with backward delta', () => {
        const pillars = calculatePillars({
            birthDate: '2024-02-03', // 입춘 전날
            birthTime: '12:00',
            timeUnknown: false,
            calendar: 'solar',
            isLeapMonth: false,
            sex: 'male',
            timezone: 'Asia/Seoul'
        });

        const res = calculateDaewoon({
            birthDate: '2024-02-03',
            birthTime: '12:00',
            sex: 'male',
            yearStem: pillars.year.stem,
            monthStem: pillars.month.stem,
            monthBranch: pillars.month.branch,
            timezone: 'Asia/Seoul'
        });

        expect(res.startAge).toBeGreaterThan(0);
    });

    it('respects timeUnknown by still generating schedule but using noon default', () => {
        const pillars = calculatePillars({
            birthDate: '2024-02-05',
            birthTime: '',
            timeUnknown: true,
            calendar: 'solar',
            isLeapMonth: false,
            sex: 'female',
            timezone: 'Asia/Seoul'
        });

        const res = calculateDaewoon({
            birthDate: '2024-02-05',
            birthTime: '12:00', // default fallback
            sex: 'female',
            yearStem: pillars.year.stem,
            monthStem: pillars.month.stem,
            monthBranch: pillars.month.branch,
            timezone: 'Asia/Seoul'
        });

        expect(res.segments).toHaveLength(10);
    });

    it('warns and computes when timezone is non-KST', () => {
        const res = calculateDaewoon({
            birthDate: '2024-02-05',
            birthTime: '12:00',
            sex: 'male',
            yearStem: '甲',
            monthStem: '丙',
            monthBranch: '寅',
            timezone: 'UTC'
        });

        expect(res.timezoneNote).toContain('Non-KST');
    });
});
