import { describe, it, expect } from 'vitest';
import { assembleReport } from '../src/engine/assembler/main';
import { validateAndRepairReport } from '../src/engine/quality/gate';
import { DeterministicPacket } from '../src/engine';

describe('ATOMIC-3-00: Baseline Failure Reproduction', () => {
    /**
     * This test confirms that the current pipeline fails 100% of the time
     * because assembleReport() only produces placeholders/empty strings,
     * which violate the Quality Gate rules (min length, etc).
     */
    it('should fail Quality Gate when narrative fields are empty', async () => {
        // 1. Mock a minimal valid deterministic packet
        const mockPacket: DeterministicPacket = {
            algorithmVersion: "GENESIS-V6.0-TEST",
            computedAt: new Date().toISOString(),
            determinismHash: "mock-hash",
            input: {
                birthDate: "1990-01-01",
                birthTime: "12:00",
                timeUnknown: false,
                calendar: "solar",
                isLeapMonth: false,
                sex: "male",
                timezone: "Asia/Seoul"
            },
            pillars: {
                year: { stem: "庚", branch: "午", label: "庚午" },
                month: { stem: "戊", branch: "子", label: "戊子" },
                day: { stem: "壬", branch: "申", label: "壬申" },
                hour: { stem: "丙", branch: "午", label: "丙午" },
                normalization: { solarDate: "1990-01-01", isLeapMonth: false }
            } as any,
            daewoon: {
                direction: "forward",
                startAge: 5,
                deltaMin: 0,
                segments: []
            },
            sewoon: {
                year: 2024,
                ganzhi: { stem: "甲", branch: "辰", label: "甲辰" },
                tenGod: { stem: "食神", branch: "偏官" },
                relations: { list: [], hasHab: false, hasChung: false, hasGongmang: false },
                elementDelta: { stem: "Wood", branch: "Earth" }
            } as any,
            calendar365: {
                range: { startIso: "2024-01-01", endIso: "2024-12-31", totalDays: 366 } as any,
                dailyLuck: []
            }
        };

        // 2. Assemble (Narrative fields will be "")
        const report = assembleReport(mockPacket);

        // 3. Validate (Must throw QualityValidationError)
        // Note: we expect this to fail because fields like result/explain/interpretation are ""
        try {
            validateAndRepairReport(report);
            // If it doesn't throw, it's a failure of this test
            throw new Error("Quality Gate should have failed but passed.");
        } catch (error: any) {
            expect(error.name).toBe("QualityValidationError");
            // console.log("Baseline failure confirmed:", error.message);
        }
    });
});
