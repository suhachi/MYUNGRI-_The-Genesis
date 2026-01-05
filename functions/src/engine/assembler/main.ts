import { FullReportData, ReportSection } from '../../contracts/output.schema';
import { DeterministicPacket } from '../index';

/**
 * [Phase 28] ATOMIC-R2-03: Report Assembly Pipeline
 * - Maps DeterministicPacket -> Narrative Report Structure
 * - Whitelist-only access to deterministic data
 */

export function assembleReport(packet: DeterministicPacket): FullReportData {
    const sections: any = {
        executiveSummary: assembleBasicSection("EXIT_001", "종합 분석 요약"),
        originAudit: assembleBasicSection("ORIG_001", "타고난 성향 (원국 감사)"),
        lifeFlow: {
            sectionId: "LIFE_FLOW",
            title: "평생 흐름 (10대~80대 대운)",
            buckets: packet.daewoon.segments.slice(0, 9).map((s, i) => ({
                decadeKey: `${(Math.floor(s.startAge / 10) + 1) * 10}s`,
                ageRangeLabel: `${s.startAge}~${s.endAge}세`,
                startAge: s.startAge,
                endAge: s.endAge,
                ganzhi: s.ganzhi.label,
                result: "[PENDING]",
                explain: "[PENDING]",
                interpretation: "[PENDING]"
            }))
        },
        turningPoints: {
            sectionId: "TURNING_POINTS",
            title: "운명의 전환점 지도",
            items: [
                { age: 20, type: "CAREER", title: "청년기 사회 진출", result: "[PENDING]", explain: "[PENDING]", interpretation: "[PENDING]" },
                { age: 35, type: "LIFE", title: "가정 및 안정기", result: "[PENDING]", explain: "[PENDING]", interpretation: "[PENDING]" },
                { age: 50, type: "HARVEST", title: "중년의 성과", result: "[PENDING]", explain: "[PENDING]", interpretation: "[PENDING]" },
                { age: 65, type: "WISDOM", title: "장년의 지례", result: "[PENDING]", explain: "[PENDING]", interpretation: "[PENDING]" },
                { age: 80, type: "LEGACY", title: "평온한 회고", result: "[PENDING]", explain: "[PENDING]", interpretation: "[PENDING]" },
            ]
        },
        rolling12: assembleBasicSection("ROLL_001", "향후 12개월 흐름"),
        luckCalendar: assembleBasicSection("CAL_001", "운기 캘린더 (365일)"),
        dateDetail: assembleBasicSection("DATE_001", "날짜별 상세 분석"),
    };

    if (packet.naming) {
        sections.naming = assembleBasicSection("NAME_001", "성명 분석 (이름의 기운)");
    }

    return {
        meta: {
            version: "report/v6",
            generatedAt: packet.computedAt,
        },
        sections,
        determinismHash: packet.determinismHash
    };
}

function assembleBasicSection(sectionId: string, title: string) {
    return {
        sectionId,
        title,
        result: "[PENDING]",
        explain: "[PENDING]",
        interpretation: "[PENDING]",
        resultFacts: {}
    };
}
