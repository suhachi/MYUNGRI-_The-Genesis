/// <reference types="vitest" />
import { describe, expect, it } from 'vitest';
import { calculateRelations } from '../src/engine/relations';
import { PillarsResult } from '../src/engine/pillars';

describe('relations detection', () => {
    it('detects YukHab and Gongmang', () => {
        const pillars: PillarsResult = {
            year: { stem: '甲', branch: '子', label: '甲子' },
            month: { stem: '乙', branch: '丑', label: '乙丑' },
            day: { stem: '甲', branch: '子', label: '甲子' },
            hour: { stem: '丙', branch: '戌', label: '丙戌' },
            normalization: { solarDate: '2024-02-05', isLeapMonth: false }
        };

        const res = calculateRelations(pillars);
        expect(res.list.some(i => i.subtype === 'YukHab' && i.value === 'Earth')).toBe(true);
        expect(res.list.some(i => i.type === 'Gongmang' && i.pillars.includes('hour'))).toBe(true);
    });

    it('detects SamHab (Fire) when all three branches present', () => {
        const pillars: PillarsResult = {
            year: { stem: '甲', branch: '寅', label: '甲寅' },
            month: { stem: '乙', branch: '午', label: '乙午' },
            day: { stem: '丙', branch: '戌', label: '丙戌' },
            hour: null,
            normalization: { solarDate: '2024-02-05', isLeapMonth: false }
        };

        const res = calculateRelations(pillars);
        expect(res.list.some(i => i.subtype === 'SamHab' && i.value === 'Fire')).toBe(true);
    });

    it('detects branch clash (Chung) when direct opposition present', () => {
        const pillars: PillarsResult = {
            year: { stem: '甲', branch: '子', label: '甲子' },
            month: { stem: '乙', branch: '午', label: '乙午' },
            day: { stem: '丙', branch: '寅', label: '丙寅' },
            hour: null,
            normalization: { solarDate: '2024-06-15', isLeapMonth: false }
        };

        const res = calculateRelations(pillars);
        expect(res.list.some(i => i.type === 'Chung' && i.subtype === 'JijiChung')).toBe(true);
    });
});
