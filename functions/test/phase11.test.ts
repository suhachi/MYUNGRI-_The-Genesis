import { describe, it, expect } from 'vitest';
import { validateReportStructure, QualityValidationError } from '../src/engine/quality/reportValidator';
import { FullReportData } from '../src/contracts/output.schema';

describe('P11-ATOMIC-001: Report Validator', () => {
    const mockReport: FullReportData = {
        meta: { version: '1.0', generatedAt: 'now' },
        sections: {
            executiveSummary: { sectionId: '1', title: 't', result: 'r', explain: 'e', interpretation: 'i' },
            originAudit: { sectionId: '2', title: 't', result: 'r', explain: 'e', interpretation: 'i' },
            lifeFlow: { sectionId: '3', title: 't', result: 'r', explain: 'e', interpretation: 'i', resultFacts: { buckets: Array(9).fill({}) } },
            rolling12: { sectionId: '4', title: 't', result: 'r', explain: 'e', interpretation: 'i' }
        }
    };

    it('should pass valid report', () => {
        expect(() => validateReportStructure(mockReport)).not.toThrow();
    });

    it('should fail when required section is missing', () => {
        const badReport = { ...mockReport, sections: { ...mockReport.sections, executiveSummary: undefined } };
        expect(() => validateReportStructure(badReport as any)).toThrow(QualityValidationError);
    });

    it('should fail when 3-field is missing', () => {
        const badReport = {
            ...mockReport,
            sections: {
                ...mockReport.sections,
                originAudit: { sectionId: '2', title: 't', result: '', explain: 'e', interpretation: 'i' }
            }
        };
        expect(() => validateReportStructure(badReport)).toThrow(/missing result/);
    });

    it('should fail when LifeFlow buckets < 9', () => {
        const badReport = {
            ...mockReport,
            sections: {
                ...mockReport.sections,
                lifeFlow: { ...mockReport.sections.lifeFlow, resultFacts: { buckets: [] } }
            }
        };
        expect(() => validateReportStructure(badReport as any)).toThrow(/9 buckets/);
    });
});
