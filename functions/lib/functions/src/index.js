"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REPORT_STRUCTURE = void 0;
const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { setGlobalOptions } = require("firebase-functions/v2");
const { defineSecret } = require("firebase-functions/params");
const admin = require("firebase-admin");
const { Timestamp } = require("firebase-admin/firestore");
const { logger } = require("firebase-functions");
const { OpenAI } = require("openai");
const { calculateV1 } = require("./engine/calculation/v1");
// Phase 26: Import generateLuckCalendar
const { generateLuckCalendar } = require("./generateLuckCalendar");
// [Stability Patch] App Check Visibility & Secrets
const REGION = "asia-northeast3";
const { computeDeterminismHash } = require("./engine/hash");
const ENFORCE_APP_CHECK = process.env.FUNCTIONS_EMULATOR !== "true";
const OPENAI_API_KEY = defineSecret("OPENAI_API_KEY");
const { InputSchema } = require("./contracts/input.schema");
setGlobalOptions({ region: REGION });
admin.initializeApp();
logger.info(`[System] App Check Enforced: ${ENFORCE_APP_CHECK} (Emulator: ${process.env.FUNCTIONS_EMULATOR})`);
/**
 * generateReport (Callable Function v2)
 * Phase 23: OpenAI JSON Mode & Action Plan Integration
 * v4.1.0-AI-JSON: Zero Tolerance AI Activation
 */
/**
 * Phase 25: System Audit Report Structure
 */
exports.REPORT_STRUCTURE = [
    { id: "01_intro", title: "제네시스 오버뷰", category: "SUMMARY" },
    { id: "02_code", title: "제네시스 코드", category: "ARCH" },
    { id: "03_logic", title: "분석 알고리즘 명세", category: "SPEC" },
    { id: "04_os", title: "운영체제 타입", category: "SYSTEM" },
    { id: "05_core", title: "코어 엘리먼트", category: "CORE" },
    { id: "06_dual", title: "듀얼 프로세서", category: "CORE" },
    { id: "07_balance", title: "에너지 구조 및 밸런스", category: "RESOURCE" },
    { id: "08_bug", title: "고질적 버그 리포트", category: "DEBUG" },
    { id: "09_crash", title: "반복되는 시스템 충돌", category: "DEBUG" },
    { id: "10_leak", title: "에너지 누수 구간", category: "DEBUG" },
    { id: "11_defense", title: "방어 기제 및 방화벽", category: "SECURITY" },
    { id: "12_killer", title: "킬러 애플리케이션", category: "APP" },
    { id: "13_process", title: "업무 처리 프로세스", category: "APP" },
    { id: "14_wealth", title: "리소스 할당 전략", category: "STRATEGY" },
    { id: "15_decision", title: "의사결정 병목 해결", category: "STRATEGY" },
    { id: "16_social", title: "인터랙션 프로토콜", category: "NETWORK" },
    { id: "17_love", title: "호환성 검사", category: "NETWORK" },
    { id: "18_traffic", title: "네트워크 트래픽 관리", category: "NETWORK" },
    { id: "19_current", title: "현재 시스템 부하", category: "STATUS" },
    { id: "20_major", title: "업데이트 일정", category: "ROADMAP" },
    { id: "21_roadmap", title: "단기 패치 노트", category: "ROADMAP" },
    { id: "22_wave", title: "바이오리듬 및 파동", category: "STATUS" },
    { id: "23_boost", title: "시스템 부스팅", category: "PATCH" },
    { id: "24_archive", title: "시스템 아카이브", category: "META" },
];
/**
 * Master Myungri – 시스템 감사관 페르소나
 */
const SYSTEM_PROMPT = `
당신은 "Master Myungri", 선임 시스템 감사관(Senior System Auditor)입니다.
당신은 인간을 하나의 "Human OS"로 분석합니다.

Mandatory rules:
- 오직 IT/시스템 메타포만 사용하십시오.
- 일간(Day Master) = CPU/Kernel
- 운(Fate) = System Traffic
- 충(Clash) = System Crash
- 흉신(Demon God) = Malware
- 용신(Useful God) = Optimization Patch
- 논리가 먼저이고 결론이 뒤따라야 합니다.
- 위로나 점술적인 톤은 배제하십시오. 오직 감사 결과에만 집중합니다.
- 시스템의 버그를 지적하고 구체적인 Action Plan을 제시하십시오.
- 각 섹션은 반드시 최소 3-4문단으로 구성하십시오. (매우 중요)
- 섹션 ID와 제목을 변경하지 마십시오.
- 리포트 전체 분량을 축소하지 마십시오. 총 공백 제외 30,000자 이상의 밀도 높은 분석을 지향합니다.
- 반드시 유효한 JSON 형식으로만 응답하며, 마크다운 태그 기입은 금지합니다.
`;
const SCHEMA_VERSION = "report/v6";
const APP_VERSION = "v6.0.0";
const SERVER_BUILD_ID = "v6.0.0-LONGFORM";
exports.generateReport = onCall({
    enforceAppCheck: ENFORCE_APP_CHECK,
    secrets: [OPENAI_API_KEY],
    timeoutSeconds: 300, // Increase timeout for longer reports
    memory: "512MiB"
}, async (request) => {
    const rawData = request.data;
    // ... (입력 검증 로직 생략되지 않도록 전체 유지 권장되나 prompt 지시에 따라 변경점 집중)
    // 실제로는 index.ts 전체를 한 번 읽었으므로 정확한 위치에 삽입
    // [Step 4.1 Implementation]
    // ... (기존 검증 로직 이후)
    // 1. 입력 검증 (Fail Fast - Hardened via Contract)
    const parseResult = InputSchema.safeParse(rawData);
    if (!parseResult.success) {
        const errorDetails = parseResult.error.errors.map((e) => e.message).join(", ");
        throw new HttpsError("invalid-argument", `입력 데이터 검증 실패: ${errorDetails}`, parseResult.error.format());
    }
    const validInput = parseResult.data;
    // Optional userName and scriptType logic (Legacy compat or handling derived fields)
    let userName = validInput.userName;
    let scriptType;
    if (userName) {
        if (/\p{Script=Han}/u.test(userName)) {
            scriptType = 'hanja';
        }
        else if (/\p{Script=Hangul}/u.test(userName)) {
            scriptType = 'hangul';
        }
        else {
            scriptType = 'unknown';
        }
    }
    // Birth time calculation if exists
    let birthTime = null;
    if (!validInput.timeUnknown && validInput.birthTime) {
        birthTime = validInput.birthTime;
    }
    // Prepare Calculation Input
    const input = {
        birthDate: validInput.birthDate,
        birthTime: birthTime,
        timeUnknown: validInput.timeUnknown,
        sex: validInput.sex,
        calendar: validInput.calendar,
        isLeapMonth: validInput.isLeapMonth || false,
        timezone: validInput.timezone
    };
    if (userName) {
        input.userName = userName;
        input.scriptType = scriptType;
    }
    try {
        // 2. 사주 실계산 실행
        const calculation = calculateV1(input);
        const { pillars } = calculation;
        // [Phase 0] Determinism Hash
        const determinismPayload = {
            algorithmVersion: calculation.algorithmVersion,
            normalization: calculation.normalization,
            pillars: calculation.pillars,
            forensicTime: calculation.forensicTime
        };
        const determinismHash = computeDeterminismHash(determinismPayload);
        // 3. OpenAI 해석 엔진 가동 (gpt-4o)
        const openai = new OpenAI({
            apiKey: OPENAI_API_KEY.value(),
        });
        const modelName = "gpt-4o";
        // [Phase 28: Per-section Segmented Generation]
        async function generateOneSection(sectionMeta, attempt = 1) {
            const sectionPrompt = `
섹션 ID: ${sectionMeta.id}
섹션 제목: ${sectionMeta.title}
섹션 카테고리: ${sectionMeta.category}

위 섹션에 대해 시스템 감사 보고서를 작성하십시오.
반드시 아래 JSON 구조를 지키고, 각 필드의 최소 길이를 준수하십시오.

필수 규칙:
1. result: 핵심 결론 (최소 400자)
2. explain: 논리적 근거 (최소 600자)
3. interpretation: 현실적 행동 지침 (최소 400자)
4. reasonCards: 최소 2개 이상의 객체 배열

IT/시스템 메타포만 사용하고, 한국어로만 작성하십시오.
`;
            try {
                const secCompletion = await openai.chat.completions.create({
                    model: modelName,
                    messages: [
                        { role: "system", content: SYSTEM_PROMPT },
                        {
                            role: "user",
                            content: `INPUT DATA:\n${JSON.stringify({
                                userName: userName || "Anonymous",
                                pillars,
                                dayStem: pillars.day.stem,
                                sex: rawData.sex,
                                solarDate: calculation.normalization.solarDate
                            })}\n\nTASK:\n${sectionPrompt}`
                        }
                    ],
                    response_format: { type: "json_object" },
                    temperature: 0.3,
                });
                const content = JSON.parse(secCompletion.choices[0]?.message?.content || "{}");
                // Quality Gate: Length check
                const rLen = (content.result || "").length;
                const eLen = (content.explain || "").length;
                const iLen = (content.interpretation || "").length;
                if (attempt < 2 && (rLen < 300 || eLen < 450 || iLen < 300)) {
                    logger.warn(`[QualityGate] Section ${sectionMeta.id} too short (R:${rLen}, E:${eLen}, I:${iLen}). Retrying...`);
                    return generateOneSection(sectionMeta, attempt + 1);
                }
                return {
                    ...content,
                    id: sectionMeta.id,
                    title: sectionMeta.title,
                    category: sectionMeta.category,
                    quality: { rLen, eLen, iLen, attempt }
                };
            }
            catch (secErr) {
                logger.error(`[AI-Section] Error in ${sectionMeta.id}:`, secErr);
                return {
                    id: sectionMeta.id,
                    title: sectionMeta.title,
                    category: sectionMeta.category,
                    result: "데이터를 생성하는 중 시간 초과 또는 오류가 발생했습니다.",
                    explain: "시스템 가동 중 일시적인 부하가 감지되었습니다. 재생성을 권장합니다.",
                    interpretation: "재시도 버튼을 통해 다시 감사해 주십시오.",
                    reasonCards: [],
                    error: secErr.message
                };
            }
        }
        // 24개 섹션 순차 생성 (토큰 및 품질 확보)
        const sections = [];
        let totalChars = 0;
        for (const meta of exports.REPORT_STRUCTURE) {
            // 24_archive는 별도 처리
            if (meta.id === "24_archive") {
                sections.push({
                    id: meta.id,
                    title: meta.title,
                    category: meta.category,
                    result: `Algorithm: ${calculation.algorithmVersion}`,
                    explain: `Model: ${modelName}\nEngine: ${SERVER_BUILD_ID}\nSchema: ${SCHEMA_VERSION}`,
                    interpretation: `본 리포트는 섹션별 정밀 감수가 적용된 고밀도 분석 보고서(Phase 28)입니다.`,
                    reasonCards: [],
                    type: "analysis"
                });
                continue;
            }
            const secData = await generateOneSection(meta);
            sections.push({
                ...secData,
                type: (meta.id === "01_intro") ? "intro" : "analysis"
            });
            totalChars += (secData.result?.length || 0) + (secData.explain?.length || 0) + (secData.interpretation?.length || 0);
            logger.info(`[Progress] Generated Section: ${meta.id} (Total so far: ${totalChars} chars)`);
        }
        // 5. Build reportMeta
        const reportMeta = {
            title: userName ? `${userName} 님의 SYSTEM AUDIT v5.0` : "SYSTEM AUDIT v5.0",
            userName: userName,
            summary: "섹션별 순차 감수가 완료된 고품질 Human OS 인티그리티 리포트입니다.",
            determinismHash: determinismHash, // [P0-ATOMIC-003]
            strategistMeta: {
                disclaimer: "본 감사 보고서는 시스템적 패턴 분석이며, 최종적인 기동 결정은 운영자 본인에게 있습니다."
            }
        };
        // 6. 리포트 데이터 영구 보관
        const reportData = {
            createdAt: Timestamp.now(),
            updatedAt: Timestamp.now(),
            userId: request.auth?.uid || "anonymous",
            version: APP_VERSION,
            schemaVersion: SCHEMA_VERSION,
            serverBuildId: SERVER_BUILD_ID,
            algorithmVersion: "Genesis-V6.0-SEGMENTED",
            model: modelName,
            qualityMetrics: {
                totalChars,
                sectionCount: sections.length,
                timestamp: new Date().toISOString()
            },
            input: input,
            calculation: {
                ...calculation,
                forensicTime: calculation.forensicTime ?? null
            },
            reportMeta,
            sections: sections,
            tableOfContents: exports.REPORT_STRUCTURE.map(meta => ({ id: meta.id, title: meta.title }))
        };
        const reportRef = await admin.firestore().collection("reports").add(reportData);
        return {
            reportId: reportRef.id,
            totalChars,
            sections: sections.map(s => ({ id: s.id, result: s.result ? "OK" : "MISSING" }))
        };
    }
    catch (err) {
        logger.error("Report Generation Error:", err);
        if (err instanceof HttpsError)
            throw err;
        throw new HttpsError("internal", `분석 엔진 처리 중 오류: ${err.message || 'LLM_INTERPRETATION_FAILED'}`);
    }
});
// Phase 26: Export generateLuckCalendar
exports.generateLuckCalendar = generateLuckCalendar;
//# sourceMappingURL=index.js.map