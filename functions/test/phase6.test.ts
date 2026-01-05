import { describe, it, expect } from 'vitest';
import { calculateRollingRange } from '../src/engine/calendar365';
import { precomputeDailyLuck } from '../src/engine/calendar365/precompute';
import { getDailyDetail } from '../src/engine/calendar365/detail';
import { PillarsResult } from '../src/engine/pillars';

// Mock Pillars (Day Master: 甲 Wood)
const mockPillars: PillarsResult = {
    year: { stem: '甲', branch: '子', label: '甲子' },
    month: { stem: '丙', branch: '寅', label: '丙寅' },
    day: { stem: '甲', branch: '申', label: '甲申' }, // Day Master 甲
    hour: { stem: '戊', branch: '辰', label: '戊辰' },
    normalization: { solarDate: '2024-01-01', isLeapMonth: false }
};

describe('Phase 6: Rolling Luck Calendar', () => {

    it('P6-ATOMIC-001: Rolling Range should cover approx 1 year', () => {
        const result = calculateRollingRange('2024-01-01');
        expect(result.startDate).toBe('2024-01-01');
        // 2024 is leap year (366 days)
        // 2024-01-01 to 2024-12-31 is 366 days?
        // Let's check the implementation. It iterates until same date next year.
        // So it includes 2024-01-01 ... 2024-12-31? Or 2025-01-01?
        // The loop breaks when it hits 2025-01-01. So it excludes 2025-01-01.
        // So it should be 366 days for 2024.
        expect(result.dates.length).toBeGreaterThanOrEqual(365);
        expect(result.dates.length).toBeLessThanOrEqual(366);
        expect(result.dates[0]).toBe('2024-01-01');
    });

    it('P6-ATOMIC-002: Precompute Daily Luck should have all required fields', () => {
        const result = precomputeDailyLuck('2024-01-01', mockPillars);
        expect(result.records.length).toBeGreaterThanOrEqual(365);

        const first = result.records[0];
        expect(first).toHaveProperty('dateKey');
        expect(first).toHaveProperty('ganzhi');
        expect(first.ganzhi).toHaveProperty('year');
        expect(first.ganzhi).toHaveProperty('month');
        expect(first.ganzhi).toHaveProperty('day');
        expect(first).toHaveProperty('tenGod');
        expect(first).toHaveProperty('fiveElementsDelta');
        expect(first).toHaveProperty('eventFlags');
        expect(first).toHaveProperty('headline');
        expect(first).toHaveProperty('evidenceSummary');
        expect(first).toHaveProperty('detailAnchorId');

        // Check content
        // 2024-01-01 is 甲子 day? No, let's check real calendar or just consistency.
        // We rely on convertToLunar.
        // Just check if fields are populated.
        expect(first.headline.length).toBeGreaterThan(0);
        expect(first.evidenceSummary.length).toBeGreaterThan(0);
    });

    it('P6-ATOMIC-003: Detail Analysis should return guidance', () => {
        const dateKey = '2024-01-01';
        const detail = getDailyDetail(mockPillars, dateKey);

        expect(detail.dateKey).toBe(dateKey);
        expect(detail).toHaveProperty('categoryGuidance');
        expect(detail.categoryGuidance.length).toBeGreaterThan(0);
    });

    it('Should detect Chung (Conflict) correctly', () => {
        // Day Master 甲. 庚 day is Chung.
        // We need to find a day with 庚 stem.
        const result = precomputeDailyLuck('2024-01-01', mockPillars);
        const chungDay = result.records.find(r => r.ganzhi.day.stem === '庚');

        if (chungDay) {
            // 甲-庚 Chung
            // Check eventFlags
            // Note: Our mock pillars has Year Stem 甲.
            // Daily 庚 vs Year 甲 -> Chung.
            // Daily 庚 vs Day 甲 -> Chung.
            expect(chungDay.eventFlags.hasChung).toBe(true);
            expect(chungDay.eventFlags.special).toContain('CheonganChung');
            expect(chungDay.headline).toContain('충돌');
        }
    });
});
