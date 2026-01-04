/// <reference types="vitest" />
import { describe, expect, it } from 'vitest';
import { calculatePillars } from '../src/engine/pillars';

const baseInput = {
    calendar: 'solar' as const,
    isLeapMonth: false,
    sex: 'male' as const,
    timezone: 'Asia/Seoul'
};

describe('calculatePillars Ipchun handling', () => {
    it('uses previous year pillar before Ipchun', () => {
        const result = calculatePillars({
            ...baseInput,
            birthDate: '2024-02-03', // 하루 전 (Ipchun 2/4)
            birthTime: '12:00',
            timeUnknown: false
        });

        expect(result.year.label).toBe('癸卯'); // 2023년 계묘년
        expect(result.normalization.solarDate).toBe('2024-02-03');
    });

    it('uses current year pillar after Ipchun', () => {
        const result = calculatePillars({
            ...baseInput,
            birthDate: '2024-02-05', // Ipchun 이후
            birthTime: '12:00',
            timeUnknown: false
        });

        expect(result.year.label).toBe('甲辰'); // 2024년 갑진년
        expect(result.normalization.solarDate).toBe('2024-02-05');
    });
});

describe('calculatePillars hour pillar gating', () => {
    it('omits hour pillar when time is unknown', () => {
        const result = calculatePillars({
            ...baseInput,
            birthDate: '2024-02-05',
            birthTime: '',
            timeUnknown: true
        });

        expect(result.hour).toBeNull();
        expect(result.forensicTime).toBeUndefined();
    });
});

describe('calculatePillars lunar leap month handling', () => {
    it('converts 윤달을 정확히 일광 날짜로 정규화한다', () => {
        const result = calculatePillars({
            ...baseInput,
            calendar: 'lunar',
            isLeapMonth: true,
            birthDate: '2023-02-01', // 윤2월 1일
            birthTime: '12:00',
            timeUnknown: false
        });

        expect(result.normalization.solarDate).toBe('2023-03-22');
        expect(result.normalization.isLeapMonth).toBe(true);
    });
});
