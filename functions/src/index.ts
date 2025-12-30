import { onCall, HttpsError } from "firebase-functions/v2/https";
import { setGlobalOptions } from "firebase-functions/v2";
import * as admin from "firebase-admin";
import { logger } from "firebase-functions";
import { calculateV1, AstroInput } from "./engine/calculation/v1";

// [Stability Patch] App Check Visibility
const REGION = "asia-northeast3";
const ENFORCE_APP_CHECK = process.env.FUNCTIONS_EMULATOR !== "true";
logger.info(`[BOOT] Region: ${REGION} | EnforceAppCheck: ${ENFORCE_APP_CHECK} | Emulator: ${process.env.FUNCTIONS_EMULATOR === "true"}`);

setGlobalOptions({ region: REGION });
admin.initializeApp();

/**
 * generateReport (Callable Function v2)
 * Phase 3-C: Real Calculation & Rich Section Generation
 */
export const generateReport = onCall({
    enforceAppCheck: ENFORCE_APP_CHECK
}, async (request) => {
    const rawData = request.data;

    // 1. 입력 검증 (Fail Fast)
    const allowedSex = ["male", "female"];
    const allowedCalendar = ["solar", "lunar"];

    if (!allowedSex.includes(rawData.sex) || !allowedCalendar.includes(rawData.calendar)) {
        throw new HttpsError("invalid-argument", "지정된 성별 또는 달력 형식이 유효하지 않습니다.");
    }

    // calendar=lunar 일 때 isLeapMonth 필수 체크
    if (rawData.calendar === "lunar" && typeof rawData.isLeapMonth !== "boolean") {
        throw new HttpsError("invalid-argument", "음력 선택 시 윤달 여부(isLeapMonth)를 반드시 지정해야 합니다.");
    }

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(rawData.birthDate)) {
        throw new HttpsError("invalid-argument", "생년월일 형식이 올바르지 않습니다 (YYYY-MM-DD).");
    }

    const timeUnknown = !!rawData.timeUnknown;
    let birthTime: string | null = null;
    if (!timeUnknown) {
        const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
        if (!rawData.birthTime || !timeRegex.test(rawData.birthTime)) {
            throw new HttpsError("invalid-argument", "출생 시간 형식이 올바르지 않습니다 (HH:mm).");
        }
        birthTime = rawData.birthTime;
    }

    const input: AstroInput = {
        birthDate: rawData.birthDate,
        birthTime: birthTime,
        timeUnknown: timeUnknown,
        sex: rawData.sex as 'male' | 'female',
        calendar: rawData.calendar as 'solar' | 'lunar',
        isLeapMonth: rawData.isLeapMonth,
        timezone: "Asia/Seoul"
    };

    try {
        // 2. 실계산 실행
        const calculation = calculateV1(input);
        const { pillars, forensicTime } = calculation;

        // 3. 리포트 섹션 생성 (12개 섹션 고도화)
        const sections = [
            { id: 1, title: "GENESIS OVERVIEW", category: "SUMMARY", type: "intro", content: `당신의 고유한 생체 시간적 좌표를 확인했습니다. ${calculation.normalization.solarDate} (True Solar)를 기점으로 분석을 시작합니다.` },
            { id: 2, title: "THE ARCHETYPE", category: "PILLARS", type: "analysis", content: `당신의 근원적 에너지는 [${pillars.year.label} ${pillars.month.label} ${pillars.day.label}]의 구조를 가집니다.` },
            { id: 3, title: "CORE ELEMENT: DAY STEM", category: "ANALYSIS", type: "analysis", content: `나를 상징하는 일간(日干)은 '${pillars.day.stem}'입니다. 이는 당신의 본질적인 성향과 가치관의 핵심 엔진입니다.` },
            { id: 4, title: "TEMPORAL FREQUENCY", category: "ANALYSIS", type: "analysis", content: `태어난 월(${pillars.month.branch})은 당신이 속한 환경의 계절적 압력과 사회적 지향점을 의미합니다.` },
            {
                id: 5, title: "TEMPORAL PRECISION", category: "FORENSIC", type: "context", content: forensicTime
                    ? `현지시각(${forensicTime.localTime})에 진태양시 정정 ${forensicTime.totalOffsetMin}분을 적용하여 '${forensicTime.classification}'로 특정했습니다.`
                    : "시간 미정 상태로, 일간 중심의 분석을 수행합니다."
            },
            { id: 6, title: "ENERGY DYNAMICS", category: "PRACTICAL", type: "analysis", content: "각 요소들 간의 상호작용을 통해 사회적 성취와 개인적 만족의 균형 패턴을 분석합니다." },
            { id: 7, title: "STRATEGIC BEHAVIOR", category: "BEHAVIOR", type: "action", content: "당신의 패턴은 선제적 대응보다는 상황의 흐름을 파악하고 최적의 시점에 개입하는 전략에 최적화되어 있습니다." },
            { id: 8, title: "DECISION-MAKING STYLE", category: "BEHAVIOR", type: "action", content: "중요한 경계선에서는 직관보다 데이터와 과거의 경험적 패턴을 신뢰하는 것이 리스크를 최소화합니다." },
            { id: 9, title: "RESOURCE ALLOCATION", category: "ACTION", type: "action", content: "현재의 에너지 구조에서는 단기적 성과보다 장기적 시스템 구축에 자원을 집중하는 것이 유리합니다." },
            { id: 10, title: "RISK MANAGEMENT", category: "ACTION", type: "action", content: "불확실성이 높은 환경에서는 고정된 계획보다 유연한 대응 시나리오를 여러 개 준비하는 전략이 권장됩니다." },
            { id: 11, title: "PROBABILISTIC FUTURE", category: "ACTION", type: "action", content: "통계적으로 유사한 에너지 패턴을 가진 군집에서는 특정 변곡점에서 시스템적 확장이 일어나는 경향을 보입니다." },
            { id: 12, title: "SYSTEM ARCHIVE", category: "META", type: "context", content: `Algorithm: ${calculation.algorithmVersion} | Schema: ${calculation.schemaVersion} | Forensic standard applied.` }
        ];

        // 4. 데이터 저장
        const reportData = {
            createdAt: admin.firestore.Timestamp.now(),
            version: "v3.2.0-C",
            schemaVersion: "report/v1",
            algorithmVersion: calculation.algorithmVersion,
            input: input,
            calculation: calculation,
            reportMeta: {
                title: "GENESIS ANALYSIS v1.1",
                summary: "포렌식 시간 보정 기반의 정밀 패턴 분석 결과입니다.",
                strategistMeta: {
                    disclaimer: "본 분석은 과학적 보정 공식을 적용한 통계적 제언이며, 실제 삶의 현장에서의 최종 선택은 사용자의 주도적 의지가 결정합니다."
                }
            },
            sections: sections
        };

        const reportRef = await admin.firestore().collection("reports").add(reportData);

        return {
            reportId: reportRef.id,
            version: reportData.version,
            schemaVersion: reportData.schemaVersion,
            algorithmVersion: reportData.algorithmVersion
        };

    } catch (error: any) {
        logger.error("Report Generation Error:", error);
        if (error instanceof HttpsError) throw error;
        throw new HttpsError("internal", `분석 엔진 처리 중 오류: ${error.message || 'Unknown'}`);
    }
});
