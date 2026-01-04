import { describe, it, expect } from 'vitest';
import { assembleReport, ReportInput } from '../src/engine/report/assembler';
import { validateSectionFields } from '../src/engine/report/validator';
import { checkAndRepairText } from '../src/engine/quality/gate';
import { PillarsResult } from '../src/engine/pillars';

// Mock Pillars
const mockPillars: PillarsResult = {
    year: { stem: '甲', branch: '子', label: '甲子' },
    month: { stem: '丙', branch: '寅', label: '丙寅' },
    day: { stem: '甲', branch: '申', label: '甲申' },
    hour: { stem: '戊', branch: '辰', label: '戊辰' },
    normalization: { solarDate: '2024-01-01', isLeapMonth: false }
};

describe('Phase 8: Report Assembly & Quality', () => {

    it('P8-ATOMIC-001: Should assemble all required sections', () => {
        const input: ReportInput = { pillars: mockPillars };
        const result = assembleReport(input);
        
        const ids = result.sections.map(s => s.id);
        expect(ids).toContain('ExecutiveSummary');
        expect(ids).toContain('OriginAudit');
        expect(ids).toContain('LifeFlow');
        expect(ids).toContain('TurningPoints');
        expect(ids).toContain('Rolling12');
        expect(ids).toContain('DateDetail');
        expect(ids).not.toContain('Naming'); // No userName
    });

    it('P8-ATOMIC-001: Should include Naming section if Han name provided', () => {
        const input: ReportInput = { pillars: mockPillars, userName: '洪길동' };
        const result = assembleReport(input);
        const ids = result.sections.map(s => s.id);
        expect(ids).toContain('Naming');
    });

    it('P8-ATOMIC-002: Should fail if 3 fields are missing', () => {
        const invalidSection = {
            id: 'Test',
            title: 'Test',
            category: 'TEST',
            result: 'Result',
            explain: '', // Empty
            interpretation: 'Interp'
        };
        
        expect(() => validateSectionFields(invalidSection)).toThrow(/missing required field/);
    });

    it('P8-ATOMIC-003: Should detect and repair banned phrases', () => {
        const badText = "전반적으로 무난합니다. 데이터가 없습니다.";
        const check = checkAndRepairText(badText);
        
        // "전반적으로 무난합니다" is banned. "데이터가 없습니다" is banned.
        // Repair should try to remove them.
        // If result is empty, it fails.
        
        // Let's try a repairable one.
        const repairable = "운세는 좋습니다. 재미로 보세요.";
        const check2 = checkAndRepairText(repairable);
        
        expect(check2.passed).toBe(true);
        expect(check2.repairedText).not.toContain("재미로 보세요");
    });

    it('P8-ATOMIC-003: Should flag regeneration if repair fails', () => {
        const unrepairable = "데이터가 없습니다"; // Only banned phrase
        const check = checkAndRepairText(unrepairable);
        
        // Repair removes it -> empty string -> reverts to original -> fails check again
        expect(check.passed).toBe(false);
        expect(check.violation).toBeDefined();
    });
});
