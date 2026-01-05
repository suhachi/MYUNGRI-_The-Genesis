import { describe, it, expect, vi } from 'vitest';
import { renderNarrativePatch } from '../src/engine/narrative/renderer';
import { validateAndRepairReport } from '../src/engine/quality/gate';
import { assembleReport } from '../src/engine/assembler/main';
import { DeterministicPacket } from '../src/engine/index';
import { buildNarrativeInput } from '../src/engine/narrative/packetBuilders/main';

// Mock OpenAI
let mockOpenAIResponse = {};

vi.mock('openai', () => {
    class OpenAI {
        chat = {
            completions: {
                create: vi.fn().mockImplementation(async () => ({
                    choices: [{
                        message: {
                            content: JSON.stringify(mockOpenAIResponse)
                        }
                    }]
                }))
            }
        };
        static __setResponse(response: any) {
            mockOpenAIResponse = JSON.parse(response);
        }
    }
    return { OpenAI };
});

describe('Narrative Renderer & Quality Gate Integration', () => {
    const mockPacket: DeterministicPacket = {
        algorithmVersion: "Genesis-V6.0",
        computedAt: new Date().toISOString(),
        determinismHash: "HASH123",
        input: {
            birthDate: "1988-05-20",
            birthTime: "14:30",
            timeUnknown: false,
            calendar: 'solar',
            isLeapMonth: false,
            sex: 'male',
            timezone: 'Asia/Seoul'
        },
        pillars: {
            year: { stem: "戊", branch: "辰", label: "戊辰" },
            month: { stem: "丁", branch: "巳", label: "丁巳" },
            day: { stem: "癸", branch: "亥", label: "癸亥" },
            hour: { stem: "己", branch: "未", label: "己未" },
            normalization: { solarDate: "1988-05-20", isLeapMonth: false }
        },
        daewoon: {
            direction: 'forward',
            startAge: 4.5,
            deltaMin: 0,
            segments: Array.from({ length: 10 }, (_, i) => ({
                startAge: 4 + (i * 10),
                endAge: 13 + (i * 10),
                ganzhi: { stem: "X", branch: "Y", label: "XY" }
            }))
        },
        sewoon: {
            year: 2024,
            ganzhi: { stem: "甲", branch: "辰", label: "甲辰" },
            tenGod: { stem: "상관", branch: "정관" },
            relations: { list: [], hasHab: false, hasChung: false, hasGongmang: false },
            elementDelta: { stem: "Wood" as any, branch: "Earth" as any }
        },
        calendar365: {
            range: { startDate: "2024-01-01", endDate: "2024-12-31", totalDays: 366, dates: [] },
            dailyLuck: []
        }
    };

    const generateMockPatches = () => {
        const patches: any[] = [];
        const sections = ['executiveSummary', 'originAudit', 'rolling12', 'luckCalendar', 'dateDetail'];
        for (const s of sections) {
            patches.push({ op: "replace", path: `/sections/${s}/result`, value: "시주 판단 유보. " + "A".repeat(3000) });
            patches.push({ op: "replace", path: `/sections/${s}/interpretation`, value: "B".repeat(2000) });
            patches.push({ op: "replace", path: `/sections/${s}/explain`, value: "C".repeat(1500) });
        }
        // Life Flow Buckets (9)
        for (let i = 0; i < 9; i++) {
            patches.push({ op: "replace", path: `/sections/lifeFlow/buckets/${i}/result`, value: "D".repeat(2000) });
            patches.push({ op: "replace", path: `/sections/lifeFlow/buckets/${i}/interpretation`, value: "E".repeat(1000) });
            patches.push({ op: "replace", path: `/sections/lifeFlow/buckets/${i}/explain`, value: "F".repeat(1000) });
        }
        // Turning Points (5)
        for (let i = 0; i < 5; i++) {
            patches.push({ op: "replace", path: `/sections/turningPoints/items/${i}/result`, value: "G".repeat(1000) });
            patches.push({ op: "replace", path: `/sections/turningPoints/items/${i}/interpretation`, value: "H".repeat(500) });
            patches.push({ op: "replace", path: `/sections/turningPoints/items/${i}/explain`, value: "I".repeat(500) });
        }
        return patches;
    };

    it('should generate a dense bucketed patch and pass the quality gate', async () => {
        const { OpenAI } = await import('openai');
        (OpenAI as any).__setResponse(JSON.stringify(generateMockPatches()));

        let report = assembleReport(mockPacket);
        const narrativeInput = buildNarrativeInput(mockPacket);
        const patch = await renderNarrativePatch(narrativeInput);

        const { applyNarrativePatch } = await import('../src/engine/narrative/applyPatch');
        report = applyNarrativePatch(report, patch);

        // Should not throw
        expect(() => validateAndRepairReport(report)).not.to.throw();
    });

    it('should fail if timeUnknown policy disclaimer is missing from any section', async () => {
        const patches = generateMockPatches().map(p => {
            if (typeof p.value === 'string') return { ...p, value: p.value.replace("시주 판단 유보. ", "") };
            return p;
        });
        const { OpenAI } = await import('openai');
        (OpenAI as any).__setResponse(JSON.stringify(patches));

        let report = assembleReport(mockPacket);
        const narrativeInput = buildNarrativeInput(mockPacket);
        const patch = await renderNarrativePatch(narrativeInput);
        const { applyNarrativePatch } = await import('../src/engine/narrative/applyPatch');
        report = applyNarrativePatch(report, patch);

        // When timeUnknown is true but disclaimer is missing
        expect(() => validateAndRepairReport(report, true)).to.throw(/Policy Violation/);
    });
});
