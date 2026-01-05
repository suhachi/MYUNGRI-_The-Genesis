import { describe, it, expect } from 'vitest';
import { assembleReport } from '../src/engine/assembler/main';
import { DeterministicPacket } from '../src/engine/index';

describe('Phase 8: Report Assembly (v6 RE-ALIGN)', () => {
    const mockPacket: DeterministicPacket = {
        algorithmVersion: "Genesis-V6.0",
        computedAt: new Date().toISOString(),
        determinismHash: "HASH",
        input: { birthDate: "1988-05-20", birthTime: "10:30", timeUnknown: false, calendar: "solar", isLeapMonth: false, sex: "male", timezone: "Asia/Seoul" },
        pillars: { year: {} as any, month: {} as any, day: {} as any, hour: {} as any, normalization: {} as any },
        daewoon: {
            direction: "forward",
            startAge: 4,
            deltaMin: 0,
            segments: Array.from({ length: 10 }, (_, i) => ({
                startAge: 4 + i * 10,
                endAge: 13 + i * 10,
                ganzhi: { label: "XY" }
            })) as any
        },
        sewoon: {} as any,
        calendar365: { range: { startDate: "S", endDate: "E", totalDays: 1, dates: [] }, dailyLuck: [] }
    };

    it('P8-ATOMIC-001: Should assemble all required v6 sections with correct structure', () => {
        const report = assembleReport(mockPacket);

        expect(report.meta.version).toBe("report/v6");
        expect(report.sections.executiveSummary).toBeDefined();
        expect(report.sections.lifeFlow.buckets).toHaveLength(9);
        expect(report.sections.turningPoints.items.length).toBeGreaterThanOrEqual(5);
        expect(report.sections.luckCalendar).toBeDefined();
        expect(report.sections.dateDetail).toBeDefined();
    });

    it('P8-ATOMIC-001: Should handle conditional Naming section', () => {
        const packetWithName = { ...mockPacket, naming: { userName: "홍길동", hasHanja: false, hanjaDetails: [] } };
        const report = assembleReport(packetWithName);
        expect(report.sections.naming).toBeDefined();
    });
});
