import { describe, it, expect } from 'vitest';
import { validateAndRepairReport } from '../src/engine/quality/gate';
import { QualityValidationError } from '../src/engine/quality/reportValidator';
import { FullReportData } from '../src/contracts/output.schema';

describe('Quality Gate Enforcement (v6)', () => {
    // Helper to generate dense text
    const dense = (n: number) => "가나다라마바사".repeat(n);

    const generateValidV6Report = (): FullReportData => ({
        meta: { version: 'report/v6', generatedAt: new Date().toISOString() },
        sections: {
            executiveSummary: {
                sectionId: 'EXIT_001', title: '요약',
                result: dense(300), explain: dense(300), interpretation: dense(300)
            },
            originAudit: {
                sectionId: 'ORIG_001', title: '원국',
                result: dense(500), explain: dense(500), interpretation: dense(500)
            },
            lifeFlow: {
                sectionId: "LIFE_FLOW",
                title: "대운 흐름",
                buckets: Array.from({ length: 9 }, (_, i) => ({
                    decadeKey: `${(i + 1) * 10}s`,
                    ageRangeLabel: `${i * 10 + 5}~${i * 10 + 14}세`,
                    startAge: i * 10 + 5,
                    endAge: i * 10 + 14,
                    result: dense(200),
                    explain: dense(200),
                    interpretation: dense(200)
                }))
            },
            turningPoints: {
                sectionId: "TURNING_POINTS",
                title: "전환점",
                items: Array.from({ length: 5 }, (_, i) => ({
                    age: 20 + i * 10,
                    type: "EVENT",
                    title: `사건 ${i}`,
                    result: dense(100),
                    explain: dense(100),
                    interpretation: dense(100)
                }))
            },
            rolling12: {
                sectionId: 'ROLL_001', title: '일진',
                result: dense(300), explain: dense(300), interpretation: dense(300)
            },
            luckCalendar: {
                sectionId: 'CAL_001', title: '캘린더',
                result: dense(300), explain: dense(300), interpretation: dense(300)
            },
            dateDetail: {
                sectionId: 'DATE_001', title: '상세',
                result: dense(300), explain: dense(300), interpretation: dense(300)
            }
        }
    });

    it('should pass a perfectly valid v6 bucketed report', () => {
        const valid = generateValidV6Report();
        expect(() => validateAndRepairReport(valid)).not.toThrow();
    });

    it('should reject a report missing a mandatory v6 section (e.g. dateDetail)', () => {
        const invalid = generateValidV6Report();
        delete (invalid.sections as any).dateDetail;
        expect(() => validateAndRepairReport(invalid)).toThrow(QualityValidationError);
        expect(() => validateAndRepairReport(invalid)).toThrow(/Missing mandatory section: dateDetail/);
    });

    it('should reject a report if lifeFlow buckets are not exactly 9', () => {
        const invalid = generateValidV6Report();
        invalid.sections.lifeFlow.buckets.pop();
        expect(() => validateAndRepairReport(invalid)).toThrow(QualityValidationError);
        expect(() => validateAndRepairReport(invalid)).toThrow(/must have exactly 9 buckets/);
    });

    it('should reject a report if turningPoints items are less than 5', () => {
        const invalid = generateValidV6Report();
        invalid.sections.turningPoints.items = invalid.sections.turningPoints.items.slice(0, 3);
        expect(() => validateAndRepairReport(invalid)).toThrow(QualityValidationError);
        expect(() => validateAndRepairReport(invalid)).toThrow(/at least 5 items/);
    });

    it('should fail if any bucket field is too short or contains [PENDING]', () => {
        const invalid = generateValidV6Report();
        invalid.sections.lifeFlow.buckets[0].result = "[PENDING]";
        expect(() => validateAndRepairReport(invalid)).toThrow(QualityValidationError);
        expect(() => validateAndRepairReport(invalid)).toThrow(/Field incomplete or too short/);
    });
});
