"use strict";
const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { setGlobalOptions } = require("firebase-functions/v2");
const admin = require("firebase-admin");
const { logger } = require("firebase-functions");
const { calculateV1 } = require("./engine/calculation/v1");
// [Stability Patch] App Check Visibility
const REGION = "asia-northeast3";
const ENFORCE_APP_CHECK = process.env.FUNCTIONS_EMULATOR !== "true";
setGlobalOptions({ region: REGION });
admin.initializeApp();
/**
 * generateReport (Callable Function v2)
 * Phase 3-C: Real Calculation & Rich Section Generation (Hardened)
 */
exports.generateReport = onCall({
    enforceAppCheck: ENFORCE_APP_CHECK
}, async (request) => {
    const rawData = request.data;
    // 1. 입력 검증 (Fail Fast)
    const allowedSex = ["male", "female"];
    const allowedCalendar = ["solar", "lunar"];
    if (!allowedSex.includes(rawData.sex) || !allowedCalendar.includes(rawData.calendar)) {
        throw new HttpsError("invalid-argument", "지정된 성별 또는 달력 형식이 유효하지 않습니다.");
    }
    if (rawData.calendar === "lunar" && typeof rawData.isLeapMonth !== "boolean") {
        throw new HttpsError("invalid-argument", "음력 선택 시 윤달 여부(isLeapMonth)를 반드시 boolean 값으로 지정해야 합니다.");
    }
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(rawData.birthDate)) {
        throw new HttpsError("invalid-argument", "생년월일 형식이 올바르지 않습니다 (YYYY-MM-DD).");
    }
    const birthYear = parseInt(rawData.birthDate.split('-')[0]);
    if (birthYear < 1890 || birthYear > 2050) {
        throw new HttpsError("invalid-argument", "분석 가능한 연도 범위를 벗어났습니다 (1890년 ~ 2050년 지원).");
    }
    const timeUnknown = !!rawData.timeUnknown;
    let birthTime = null;
    if (!timeUnknown) {
        const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
        if (!rawData.birthTime || !timeRegex.test(rawData.birthTime)) {
            throw new HttpsError("invalid-argument", "출생 시간 형식이 올바르지 않습니다 (HH:mm).");
        }
        birthTime = rawData.birthTime;
    }
    const input = {
        birthDate: rawData.birthDate,
        birthTime: birthTime,
        timeUnknown: timeUnknown,
        sex: rawData.sex,
        calendar: rawData.calendar,
        isLeapMonth: rawData.isLeapMonth,
        timezone: "Asia/Seoul"
    };
    // 2. 실계산 실행
    const calculation = calculateV1(input);
    const { pillars, forensicTime } = calculation;
    // 3. 리포트 데이터 및 섹션 구성
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
        { id: 12, title: "SYSTEM ARCHIVE", category: "META", type: "context", content: `Algorithm: ${calculation.algorithmVersion} | Schema: ${calculation.schemaVersion} | Forensic standard applied.` }
    ];
    const reportData = {
        createdAt: admin.firestore.Timestamp.now(),
        version: "v3.2.1-H",
        schemaVersion: "report/v1",
        algorithmVersion: calculation.algorithmVersion,
        input: input,
        calculation: calculation,
        reportMeta: {
            title: "GENESIS ANALYSIS v1.2",
            summary: "포렌식 시간 보정 및 정규화 간지 기반의 정밀 패턴 분석 결과입니다."
        },
        sections: sections
    };
    // [D3] Firestore 저장을 debug 모드에서는 생략하거나 가상 ID 반환
    // 실제 운영 환경 로직을 위해 mockId 반환
    return {
        reportId: "debug-" + Math.random().toString(36).substring(7),
        calculation,
        reportData
    };
});
//# sourceMappingURL=index.js.map