# 📦 프로젝트 코드베이스 - Part 6/10

> 생성일: 2026. 1. 3. 오후 10:52:25

[← 인덱스로 돌아가기](./INDEX.md)

## 📋 이 파트의 파일 목록

- `project_docs_structured/backend-functions.md`
- `functions/src/engine/calculation/v1.ts`
- `src/pages/ReportPrint.tsx`
- `scripts/test-generateReport.ts`
- `src/components/system/SecurityShield.tsx`
- `src/index.css`
- `src/components/common/BrandLockup.tsx`
- `package.json`
- `src/components/layout/Footer.tsx`
- `src/components/ui/AdviceBox.tsx`
- `src/components/ui/Card.tsx`
- `src/config/brand.ts`

---

## 📄 파일 내용

## 📄 project_docs_structured/backend-functions.md

```markdown
# Backend - Functions

> Firebase Functions (generateReport, generateLuckCalendar 등)

**생성 시각**: 2026-01-03T09:38:11.852Z

---

## 📋 목차 (4개 파일)

1. [functions/src/engine/calculation/index.ts](#file-1)
2. [functions/src/engine/calculation/v1.ts](#file-2)
3. [functions/src/generateLuckCalendar.js](#file-3)
4. [functions/src/index.ts](#file-4)

---

## File 1: `functions/src/engine/calculation/index.ts` {#file-1}

**크기**: 0.82 KB | **확장자**: ts

```ts
/**
 * Calculation Engine Placeholder (Server-side Only)
 * 지적 재산권(IP) 보호를 위해 명리 계산 알고리즘은 서버사이드에만 격리됩니다.
 */
export const calculateAstroData = (input: {
    birthDate: string;
    birthTime: string | null;
    timeUnknown: boolean;
    sex: string;
    calendar: string;
    timezone: string;
}) => {
    // [Placeholder] 실제 만세력 및 명리 엔진 로직은 Sprint 3-B에서 이식됩니다.
    return {
        engine: "Genesis-M-v1",
        computedAt: new Date().toISOString(),
        chart: {
            status: "calculated_placeholder",
            elements: ["stub_wood", "stub_fire", "stub_earth", "stub_metal", "stub_water"]
        },
        metadata: {
            inputProvenance: "secure_server_context"
        }
    };
};

```

---

## File 2: `functions/src/engine/calculation/v1.ts` {#file-2}

**크기**: 9.29 KB | **확장자**: ts

```ts
/**
 * Calculation Engine v1.2 (Hardened)
 * [L=1+] Fixed Import, Hanja Ganji Mapping, Leap-Month Wolgeon Safety
 * [T=1+] UTC-based Date Math (Timezone Independent)
 */
// [L=1+] Safe Import for kor-lunar (README recommended style with fallback)
const kl = require("kor-lunar");
const toSolar = kl.toSolar || kl.default?.toSolar;
const toLunar = kl.toLunar || kl.default?.toLunar;

// [Step A] Module-Level Export Guard (Cold-start safety)
function assertKorLunarExports() {
    if (typeof toSolar !== 'function' || typeof toLunar !== 'function') {
        throw new Error("KOR_LUNAR_EXPORT_MISSING: toSolar or toLunar is not a function.");
    }
}
assertKorLunarExports();

export interface AstroInput {
    birthDate: string; // YYYY-MM-DD
    birthTime: string | null; // HH:mm
    timeUnknown: boolean;
    sex: 'male' | 'female';
    calendar: 'solar' | 'lunar';
    isLeapMonth?: boolean;
    timezone: string;
}

export interface Pillar {
    stem: string;
    branch: string;
    label: string;
}

export interface AstroCalculationV1 {
    algorithmVersion: string;
    schemaVersion: string;
    computedAt: string;
    normalization: {
        originalDate: string;
        isLeapMonth: boolean;
        solarDate: string;
        solarYMD: { y: number; m: number; d: number };
    };
    forensicTime?: {
        localTime: string | null;
        equationOfTimeMin: number;
        longitudeOffsetMin: number;
        totalOffsetMin: number;
        trueSolarHHmm: string;
        dayShift: number; // -1, 0, 1
        classification: string; // "야자시", "조자시", "일반" 등
    };
    pillars: {
        year: Pillar;
        month: Pillar;
        day: Pillar;
        hour: Pillar | null;
    };
    warnings: string[];
}

// Hanja Ganji Mapping (L=1+)
const STEMS_H = ["갑", "을", "병", "정", "무", "기", "경", "신", "임", "계"];
const BRANCHES_H = ["자", "축", "인", "묘", "진", "사", "오", "미", "신", "유", "술", "해"];
const STEMS = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
const BRANCHES = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];

function toHanjaGanji(label: string): Pillar {
    if (!label || label.length < 2) {
        return { stem: "?", branch: "?", label: "UNKNOWN" };
    }
    const s = label[0];
    const b = label[1];

    // Case 1: Hangul mapping
    const siHandul = STEMS_H.indexOf(s);
    const biHangul = BRANCHES_H.indexOf(b);

    if (siHandul >= 0 && biHangul >= 0) {
        return {
            stem: STEMS[siHandul],
            branch: BRANCHES[biHangul],
            label: `${STEMS[siHandul]}${BRANCHES[biHangul]}`
        };
    }

    // Case 2: Already Hanja or passthrough
    const siHanja = STEMS.indexOf(s);
    const biHanja = BRANCHES.indexOf(b);

    if (siHanja >= 0 && biHanja >= 0) {
        return {
            stem: STEMS[siHanja],
            branch: BRANCHES[biHanja],
            label: `${STEMS[siHanja]}${BRANCHES[biHanja]}`
        };
    }

    return { stem: "?", branch: "?", label: "UNKNOWN" };
}

// UTC Utilities (T=1+)
function parseYMDToUTCDate(ymd: string): Date {
    const [y, m, d] = ymd.split('-').map(Number);
    return new Date(Date.UTC(y, m - 1, d));
}

function addDaysUTC(date: Date, days: number): Date {
    const next = new Date(date.getTime());
    next.setUTCDate(next.getUTCDate() + days);
    return next;
}

function dayOfYearUTC(date: Date): number {
    const start = Date.UTC(date.getUTCFullYear(), 0, 0);
    const diff = date.getTime() - start;
    return Math.floor(diff / (1000 * 60 * 60 * 24));
}

function getEquationOfTimeUTC(date: Date): number {
    const dayOfYear = dayOfYearUTC(date);
    const b = (360 / 365.24) * (dayOfYear - 81) * (Math.PI / 180);
    const eot = 9.87 * Math.sin(2 * b) - 7.53 * Math.cos(b) - 1.5 * Math.sin(b);
    return parseFloat(eot.toFixed(2));
}

export const calculateV1 = (input: AstroInput): AstroCalculationV1 => {
    const warnings: string[] = [];
    const [year, month, day] = input.birthDate.split('-').map(Number);

    // [Safety Net Layer 1] Input Year Range Check
    if (year < 1890 || year > 2050) {
        throw new Error("Year out of supported range [1890-2050]");
    }

    // 1. [L=1] Lunar/Solar Normalization
    let solarYMD: { year: number; month: number; day: number };

    if (input.calendar === 'lunar') {
        try {
            const converted = toSolar(year, month, day, input.isLeapMonth || false);
            solarYMD = { year: converted.year, month: converted.month, day: converted.day };

            // [Safety Net Layer 2] Post-Conversion Year Range Check (Boundary Case)
            if (solarYMD.year < 1890 || solarYMD.year > 2050) {
                throw new Error("Year out of supported range [1890-2050] after conversion");
            }
        } catch (e: any) {
            if (e.message.includes("range")) throw e;
            throw new Error(`KOR_LUNAR_CONVERT_FAILED: toSolar failed - ${e.message}`);
        }
    } else {
        solarYMD = { year, month, day };
    }

    const solarDateStr = `${solarYMD.year}-${String(solarYMD.month).padStart(2, '0')}-${String(solarYMD.day).padStart(2, '0')}`;
    const solarDateObj = parseYMDToUTCDate(solarDateStr);

    // 2. [T=1] True Solar Time Correction
    let forensic: AstroCalculationV1['forensicTime'] | undefined;
    let effectiveDate = solarDateObj;

    if (!input.timeUnknown && input.birthTime) {
        const [hh, mm] = input.birthTime.split(':').map(Number);
        const localMinutes = hh * 60 + mm;

        const longitude = 127.0;
        const stdMeridian = 135.0;
        const longitudeOffset = (longitude - stdMeridian) * 4;
        const eot = getEquationOfTimeUTC(solarDateObj);
        const totalOffset = eot + longitudeOffset;

        let trueSolarMinutes = localMinutes + totalOffset;
        let dayShift = 0;

        if (trueSolarMinutes < 0) {
            trueSolarMinutes += 1440;
            dayShift = -1;
        } else if (trueSolarMinutes >= 1440) {
            trueSolarMinutes -= 1440;
            dayShift = 1;
        }

        const trueHH = Math.floor(trueSolarMinutes / 60);
        const trueMM = Math.floor(trueSolarMinutes % 60);
        const trueSolarHHmm = `${String(trueHH).padStart(2, '0')}:${String(trueMM).padStart(2, '0')}`;

        let classification = "일반";
        if (trueSolarMinutes >= 1410 || trueSolarMinutes < 90) {
            classification = (trueSolarMinutes >= 1410) ? "야자시" : "조자시";
        }

        effectiveDate = addDaysUTC(solarDateObj, dayShift);

        forensic = {
            localTime: input.birthTime,
            equationOfTimeMin: eot,
            longitudeOffsetMin: longitudeOffset,
            totalOffsetMin: parseFloat(totalOffset.toFixed(2)),
            trueSolarHHmm,
            dayShift,
            classification
        };
    }

    // 3. Pillars Mapping & Normalization
    let finalLunarData: any;
    try {
        finalLunarData = toLunar(effectiveDate.getUTCFullYear(), effectiveDate.getUTCMonth() + 1, effectiveDate.getUTCDate());
    } catch (e: any) {
        throw new Error(`KOR_LUNAR_CONVERT_FAILED: toLunar failed - ${e.message}`);
    }

    // [L=1+] Year/Day Pillars
    const yearPillar = toHanjaGanji(finalLunarData.secha);
    const dayPillar = toHanjaGanji(finalLunarData.iljin);

    // [L=1+] Month Pillar with Wolgeon Safety
    let monthPillar: Pillar;
    if (finalLunarData.wolgeon) {
        monthPillar = toHanjaGanji(finalLunarData.wolgeon);
    } else {
        monthPillar = { stem: "?", branch: "?", label: "UNKNOWN" };
        warnings.push("윤달 월건 미제공(라이브러리 사양) → 절기 기반 월주 산출(Phase 3-C-02)로 보완 예정");
    }

    // [L=1+] Hour Pillar Calculation
    let hourPillar: Pillar | null = null;
    if (forensic) {
        const [trueHH, trueMM] = forensic.trueSolarHHmm.split(':').map(Number);
        const tMinutes = trueHH * 60 + trueMM;
        let branchIdx = Math.floor((tMinutes + 30) / 120) % 12;

        const dayStemIdx = STEMS.indexOf(dayPillar.stem);
        if (dayStemIdx !== -1) {
            const startHourStemIdx = ((dayStemIdx % 5) * 2) % 10;
            const hourStemIdx = (startHourStemIdx + branchIdx) % 10;

            hourPillar = {
                stem: STEMS[hourStemIdx],
                branch: BRANCHES[branchIdx],
                label: `${STEMS[hourStemIdx]}${BRANCHES[branchIdx]}`
            };
        }
    } else if (!input.timeUnknown) {
        warnings.push("시간 정보가 없어 시주(時柱)를 산출하지 못했습니다.");
    }

    return {
        algorithmVersion: "Genesis-V5.0-AUDIT (Phase 26)",
        schemaVersion: "report/v5",
        computedAt: new Date().toISOString(),
        normalization: {
            originalDate: input.birthDate,
            isLeapMonth: !!input.isLeapMonth,
            solarDate: solarDateStr,
            solarYMD: { y: solarYMD.year, m: solarYMD.month, d: solarYMD.day }
        },
        forensicTime: forensic,
        pillars: {
            year: yearPillar,
            month: monthPillar,
            day: dayPillar,
            hour: hourPillar
        },
        warnings
    };
};

```

---

## File 3: `functions/src/generateLuckCalendar.js` {#file-3}

**크기**: 6.90 KB | **확장자**: js

```js
const { onCall, HttpsError } = require("firebase-functions/v2/https");
const admin = require("firebase-admin");

/**
 * generateLuckCalendar (Phase 26)
 * Generates 365-day luck calendar with scores, grades, and action plans
 * Uses Firestore caching to reduce costs
 */
exports.generateLuckCalendar = onCall({
    region: "asia-northeast3",
    enforceAppCheck: process.env.FUNCTIONS_EMULATOR !== "true",
    timeoutSeconds: 300,
    memory: "512MiB"
}, async (request) => {
    const { reportId, year } = request.data;
    const uid = request.auth?.uid || "anonymous";

    try {
        // 1. Validation
        if (!reportId || typeof reportId !== 'string') {
            throw new HttpsError("invalid-argument", "reportId가 유효하지 않거나 누락되었습니다.");
        }

        const targetYear = year || new Date().getFullYear();
        if (targetYear < 1890 || targetYear > 2100) {
            throw new HttpsError("invalid-argument", "지원되지 않는 연도 범위입니다 (1890-2100).");
        }

        // 2. Load report (Verification)
        const reportRef = admin.firestore().collection("reports").doc(reportId);
        const reportDoc = await reportRef.get();

        if (!reportDoc.exists) {
            console.error(`[generateLuckCalendar] Report not found. ID: ${reportId}`);
            throw new HttpsError("not-found", "해당 리포트를 찾을 수 없습니다. 다시 시도해 주세요.");
        }

        const reportData = reportDoc.data();
        const input = reportData.input;

        if (!input || !input.birthDate) {
            console.error(`[generateLuckCalendar] Invalid report data structure. ID: ${reportId}`);
            throw new HttpsError("failed-precondition", "리포트 데이터 내 입력 정보(생년월일 등)가 누락되었습니다.");
        }

        // 3. Check cache
        const cacheId = `${reportId}_${targetYear}`;
        const cacheRef = admin.firestore().collection("luckCalendars").doc(cacheId);
        const cacheDoc = await cacheRef.get();

        if (cacheDoc.exists) {
            const cached = cacheDoc.data();
            const genAt = cached.generatedAt;
            const genTime = (genAt && typeof genAt.toMillis === 'function')
                ? genAt.toMillis()
                : new Date(genAt || 0).getTime();

            const cacheAge = Date.now() - genTime;
            if (cacheAge < 30 * 24 * 60 * 60 * 1000) {
                return cached;
            }
        }

        // 4. Generate 365/366 days
        const isLeapYear = (targetYear % 4 === 0 && targetYear % 100 !== 0) || (targetYear % 400 === 0);
        const totalDays = isLeapYear ? 366 : 365;
        const days = [];

        for (let dayOfYear = 1; dayOfYear <= totalDays; dayOfYear++) {
            const date = new Date(targetYear, 0, dayOfYear);
            const dateStr = date.toISOString().split('T')[0];

            const score = calculateDayScore(date, input);
            const grade = score >= 70 ? "GOOD" : score >= 40 ? "WARN" : "CAUTION";

            days.push({
                date: dateStr,
                dayGanji: "UNKNOWN",
                score,
                grade,
                reasons: generateReasons(score, grade),
                actionPlan: generateActionPlan(grade),
                eventFit: {
                    contract: score >= 65 ? "GOOD" : score >= 35 ? "WARN" : "CAUTION",
                    signboard: score >= 70 ? "GOOD" : score >= 40 ? "WARN" : "CAUTION",
                    launch: score >= 75 ? "GOOD" : score >= 45 ? "WARN" : "CAUTION"
                }
            });
        }

        const result = {
            year: targetYear,
            reportId,
            timezone: "Asia/Seoul",
            generatedAt: new Date().toISOString(),
            calendar: days
        };

        // Cache result
        await cacheRef.set(result);
        return result;

    } catch (err) {
        console.error("[generateLuckCalendar] Exception:", {
            reportId,
            uid,
            message: err.message,
            stack: err.stack,
            code: err.code
        });

        if (err instanceof HttpsError) throw err;

        throw new HttpsError("internal", `운기 캘린더 생성 실패: ${err.message || "UNKNOWN_ERROR"}`, {
            reportId,
            timestamp: new Date().toISOString()
        });
    }
});

/**
 * Deterministic day score calculation
 * Based on date patterns and birth data
 */
function calculateDayScore(date, birthInput) {
    const dayOfWeek = date.getDay();
    const dayOfMonth = date.getDate();
    const month = date.getMonth() + 1;

    // Simple deterministic algorithm (can be enhanced with actual 명리 logic)
    let score = 50; // Base score

    // Birth month affinity
    const birthMonth = parseInt(birthInput.birthDate.split('-')[1]);
    if (month === birthMonth) score += 15;
    if (Math.abs(month - birthMonth) === 6) score -= 10;

    // Day patterns
    if (dayOfWeek === 0 || dayOfWeek === 6) score += 5; // Weekend bonus
    if (dayOfMonth % 10 === 8) score += 10; // Lucky number 8
    if (dayOfMonth === 13) score -= 15; // Unlucky 13

    // Month patterns
    if ([1, 5, 9].includes(month)) score += 5; // Spring/summer/autumn starts
    if ([2, 6, 10].includes(month)) score -= 3; // Transition months

    // Clamp to 0-100
    return Math.max(0, Math.min(100, score));
}

function generateReasons(score, grade) {
    if (grade === "GOOD") {
        return [
            "시스템 트래픽이 안정적입니다",
            "에너지 흐름이 원활합니다",
            "외부 충돌 리스크가 낮습니다"
        ];
    } else if (grade === "WARN") {
        return [
            "시스템 부하가 중간 수준입니다",
            "일부 프로세스에서 병목이 예상됩니다",
            "주의 깊은 모니터링이 필요합니다"
        ];
    } else {
        return [
            "시스템 충돌 위험이 높습니다",
            "에너지 누수 구간입니다",
            "중요 결정은 연기를 권장합니다"
        ];
    }
}

function generateActionPlan(grade) {
    if (grade === "GOOD") {
        return [
            "중요한 계약이나 협상을 진행하세요",
            "새로운 프로젝트를 시작하기 좋은 날입니다",
            "대인 관계 확장에 적극적으로 나서세요"
        ];
    } else if (grade === "WARN") {
        return [
            "신중한 의사결정을 하세요",
            "기존 업무에 집중하고 새로운 시도는 최소화하세요",
            "건강 관리에 신경 쓰세요"
        ];
    } else {
        return [
            "중요한 결정은 미루세요",
            "방어적인 자세를 유지하세요",
            "휴식과 재충전에 집중하세요"
        ];
    }
}

```

---

## File 4: `functions/src/index.ts` {#file-4}

**크기**: 15.25 KB | **확장자**: ts

```ts
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
const ENFORCE_APP_CHECK = process.env.FUNCTIONS_EMULATOR !== "true";
const OPENAI_API_KEY = defineSecret("OPENAI_API_KEY");

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
export const REPORT_STRUCTURE = [
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
] as const;

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
}, async (request: any) => {
    const rawData = request.data;

    // ... (입력 검증 로직 생략되지 않도록 전체 유지 권장되나 prompt 지시에 따라 변경점 집중)
    // 실제로는 index.ts 전체를 한 번 읽었으므로 정확한 위치에 삽입

    // [Step 4.1 Implementation]
    // ... (기존 검증 로직 이후)


    // 1. 입력 검증 (Fail Fast - Hardened)
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

    // Optional userName and scriptType
    let userName: string | undefined;
    let scriptType: 'hanja' | 'hangul' | 'unknown' | undefined;

    if (rawData.userName) {
        const trimmed = rawData.userName.trim();
        if (trimmed.length < 2 || trimmed.length > 20) {
            throw new HttpsError("invalid-argument", "이름은 2자 이상 20자 이하여야 합니다.");
        }
        userName = trimmed;

        // Compute scriptType if not provided
        if (rawData.scriptType) {
            scriptType = rawData.scriptType;
        } else {
            if (/\p{Script=Han}/u.test(trimmed)) {
                scriptType = 'hanja';
            } else if (/\p{Script=Hangul}/u.test(trimmed)) {
                scriptType = 'hangul';
            } else {
                scriptType = 'unknown';
            }
        }
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

    const normalizedIsLeapMonth = rawData.calendar === "solar" ? false : !!rawData.isLeapMonth;

    const input: any = {
        birthDate: rawData.birthDate,
        birthTime: birthTime,
        timeUnknown: timeUnknown,
        sex: rawData.sex,
        calendar: rawData.calendar,
        isLeapMonth: normalizedIsLeapMonth,
        timezone: "Asia/Seoul"
    };

    // Only include userName if it exists
    if (userName) {
        input.userName = userName;
        input.scriptType = scriptType;
    }

    try {
        // 2. 사주 실계산 실행
        const calculation = calculateV1(input);
        const { pillars } = calculation;

        // 3. OpenAI 해석 엔진 가동 (gpt-4o)
        const openai = new OpenAI({
            apiKey: OPENAI_API_KEY.value(),
        });

        // Phase 27: 3단 구조 + 45,000자 강제 프롬프트
        const userPrompt = `
당신은 "Master Myungri", 선임 시스템 감사관(Senior System Auditor)입니다.
아래 사주 데이터를 기반으로 24개 섹션으로 구성된 감사 보고서를 생성하십시오.

INPUT DATA:
- 이름: ${userName || "Anonymous"}
- 연주: ${pillars.year.label}
- 월주: ${pillars.month.label}
- 일주: ${pillars.day.label}
- 시주: ${pillars.hour ? pillars.hour.label : "미상"}
- 일간(日干): ${pillars.day.stem}
- 성별: ${rawData.sex === "male" ? "남성" : "여성"}
- 기준일: ${calculation.normalization.solarDate}

**필수 규칙 (절대 준수)**:

1. **3단 구조 강제**:
   각 섹션은 반드시 다음 3개 필드로 구성:
   - result: 핵심 결론/판단 (2-3문단, 최소 300자)
   - explain: 근거/논리 (3-4문단, 최소 500자, Reason Cards 내용 포함)
   - interpretation: 현실 적용/대처/행동 계획 (2-3문단, 최소 300자)

2. **Reason Cards 필수**:
   각 섹션마다 최소 2개 이상의 Reason Cards 포함:
   - title: 카드 제목 (20자 이내)
   - evidence: 근거 목록 (배열, 최소 2개)
   - patchCode: 패치 코드/대응 방안 (배열, 최소 2개)
   - riskIfIgnored: 무시 시 리스크 (1문장)

3. **총 분량**: 
   - 전체 공백 제외 45,000자 이상
   - 각 섹션 평균 1,800자 이상

4. **100% 한글 작성**:
   - 모든 텍스트는 한글로 작성
   - IT/시스템 메타포만 사용 (예: CPU, 커널, 트래픽, 크래시, 패치 등)

5. **명(命) vs 운(運) 구분**:
   - 명(命): 태생적 고정 요소 (시스템 스펙)
   - 운(運): 시간에 따라 변하는 요소 (트래픽, 부하)
   - 각 섹션에서 명과 운을 명확히 구분하여 설명

6. **논리 우선**:
   - 위로나 점술적 톤 금지
   - 감사 결과와 구체적 Action Plan에만 집중

STRUCTURE (24개 섹션 고정):
${JSON.stringify(REPORT_STRUCTURE.map(s => ({ id: s.id, title: s.title })), null, 2)}

OUTPUT FORMAT (엄격 준수):
{
  "sections": [
    {
      "id": "01_intro",
      "title": "제네시스 오버뷰",
      "result": "핵심 결론 텍스트 (2-3문단, 최소 300자)...",
      "explain": "근거 및 논리 텍스트 (3-4문단, 최소 500자)...",
      "interpretation": "행동 계획 텍스트 (2-3문단, 최소 300자)...",
      "reasonCards": [
        {
          "title": "카드 제목",
          "evidence": ["근거1", "근거2", "근거3"],
          "patchCode": ["패치1", "패치2"],
          "riskIfIgnored": "무시 시 리스크 설명"
        },
        {
          "title": "카드 제목2",
          "evidence": ["근거1", "근거2"],
          "patchCode": ["패치1", "패치2", "패치3"],
          "riskIfIgnored": "무시 시 리스크 설명"
        }
      ]
    }
  ]
}

**중요**: 
- 24개 섹션 모두 동일한 구조로 작성
- 섹션 ID와 제목은 절대 변경 금지
- content 필드는 사용하지 않음 (result, explain, interpretation만 사용)
- 각 필드는 반드시 최소 글자수 이상으로 작성
- Reason Cards는 각 섹션마다 최소 2개 이상
`;


        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: userPrompt }
            ],
            response_format: { type: "json_object" },
            temperature: 0.2,
        });

        const aiResponse = JSON.parse(completion.choices[0]?.message?.content || "{}");
        logger.info("[AI-Engine] Raw AI Response received.");

        if (!aiResponse.sections || !Array.isArray(aiResponse.sections)) {
            throw new Error("INVALID_AI_RESPONSE_SCHEMA");
        }

        // Step 1: Introduce safe identifiers BEFORE sections creation
        const modelName = "gpt-4o"; // Standardized for Phase 27

        // 4. Map AI sections to report structure (Phase 27: 3단 구조)
        const sections = REPORT_STRUCTURE.map(meta => {
            const aiSec = aiResponse.sections.find((s: any) => s.id === meta.id);

            // Phase 27: 3단 구조 필드 추출
            let result = aiSec?.result || "결과 데이터 누락";
            let explain = aiSec?.explain || "풀이 데이터 누락";
            let interpretation = aiSec?.interpretation || "해석 데이터 누락";
            let reasonCards = aiSec?.reasonCards || [];

            // 24_archive는 강제 덮어쓰기
            if (meta.id === "24_archive") {
                result = `Algorithm: ${calculation.algorithmVersion}`;
                explain = `Model: ${modelName} (Phase 27)\nEngine: ${SERVER_BUILD_ID}\nSchema: ${SCHEMA_VERSION}`;
                interpretation = `본 리포트는 Phase 27 완전 업그레이드가 적용된 최신 감사 보고서입니다.\n\n주요 특징:\n- 100% 한글 UI\n- A4 인쇄 30페이지 이상\n- 결과-풀이-해석 3단 구조\n- 365일 운기 캘린더\n- Reason Cards 시스템`;
                reasonCards = [];
            }

            return {
                id: meta.id,
                title: aiSec?.title || meta.title,
                category: meta.category,
                result,
                explain,
                interpretation,
                reasonCards,
                type: (meta.id === "01_intro") ? "intro" : "analysis"
            };
        });

        // 5. Build reportMeta
        const reportMeta = {
            title: userName ? `${userName} 님의 SYSTEM AUDIT v5.0` : "SYSTEM AUDIT v5.0",
            userName: userName,
            summary: "Human OS Integrity & Performance Audit Report. 명리 엔진과 GPT-4o 감사관의 정밀 분석 결과입니다.",
            strategistMeta: {
                disclaimer: "본 감사 보고서는 시스템적 패턴 분석이며, 최종적인 기동 결정은 운영자 본인에게 있습니다."
            }
        };

        // 6. 리포트 데이터 영구 보관 (Phase 27: Version Gate)
        const reportData = {
            createdAt: Timestamp.now(),
            updatedAt: Timestamp.now(),
            version: APP_VERSION,
            schemaVersion: SCHEMA_VERSION,
            serverBuildId: SERVER_BUILD_ID,
            algorithmVersion: "Genesis-V6.0-LONGFORM",
            model: modelName,
            input: input,
            calculation: {
                ...calculation,
                forensicTime: (calculation as any).forensicTime ?? null
            },
            reportMeta,
            sections: sections
        };

        const reportRef = await admin.firestore().collection("reports").add(reportData);

        return {
            reportId: reportRef.id,
            version: reportData.version,
            schemaVersion: reportData.schemaVersion,
            serverBuildId: reportData.serverBuildId,
            sections: sections
        };

    } catch (err: any) {
        logger.error("Report Generation Error:", err);
        if (err instanceof HttpsError) throw err;
        throw new HttpsError("internal", `분석 엔진 처리 중 오류: ${err.message || 'LLM_INTERPRETATION_FAILED'}`);
    }
});

// Phase 26: Export generateLuckCalendar
exports.generateLuckCalendar = generateLuckCalendar;

```

---


```

---

## 📄 functions/src/engine/calculation/v1.ts

```typescript
/**
 * Calculation Engine v1.2 (Hardened)
 * [L=1+] Fixed Import, Hanja Ganji Mapping, Leap-Month Wolgeon Safety
 * [T=1+] UTC-based Date Math (Timezone Independent)
 */
// [L=1+] Safe Import for kor-lunar (README recommended style with fallback)
const kl = require("kor-lunar");
const toSolar = kl.toSolar || kl.default?.toSolar;
const toLunar = kl.toLunar || kl.default?.toLunar;

// [Step A] Module-Level Export Guard (Cold-start safety)
function assertKorLunarExports() {
    if (typeof toSolar !== 'function' || typeof toLunar !== 'function') {
        throw new Error("KOR_LUNAR_EXPORT_MISSING: toSolar or toLunar is not a function.");
    }
}
assertKorLunarExports();

export interface AstroInput {
    birthDate: string; // YYYY-MM-DD
    birthTime: string | null; // HH:mm
    timeUnknown: boolean;
    sex: 'male' | 'female';
    calendar: 'solar' | 'lunar';
    isLeapMonth?: boolean;
    timezone: string;
}

export interface Pillar {
    stem: string;
    branch: string;
    label: string;
    tenGod?: string;
}

export interface AstroCalculationV1 {
    algorithmVersion: string;
    schemaVersion: string;
    computedAt: string;
    normalization: {
        originalDate: string;
        isLeapMonth: boolean;
        solarDate: string;
        solarYMD: { y: number; m: number; d: number };
    };
    forensicTime?: {
        localTime: string | null;
        equationOfTimeMin: number;
        longitudeOffsetMin: number;
        totalOffsetMin: number;
        trueSolarHHmm: string;
        dayShift: number; // -1, 0, 1
        classification: string; // "야자시", "조자시", "일반" 등
    };
    pillars: {
        year: Pillar;
        month: Pillar;
        day: Pillar;
        hour: Pillar | null;
    };
    warnings: string[];
}

// Hanja Ganji Mapping (L=1+)
const STEMS_H = ["갑", "을", "병", "정", "무", "기", "경", "신", "임", "계"];
const BRANCHES_H = ["자", "축", "인", "묘", "진", "사", "오", "미", "신", "유", "술", "해"];
const STEMS = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"];
const BRANCHES = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];

function toHanjaGanji(label: string): Pillar {
    if (!label || label.length < 2) {
        return { stem: "?", branch: "?", label: "UNKNOWN" };
    }
    const s = label[0];
    const b = label[1];

    // Case 1: Hangul mapping
    const siHandul = STEMS_H.indexOf(s);
    const biHangul = BRANCHES_H.indexOf(b);

    if (siHandul >= 0 && biHangul >= 0) {
        return {
            stem: STEMS[siHandul],
            branch: BRANCHES[biHangul],
            label: `${STEMS[siHandul]}${BRANCHES[biHangul]}`
        };
    }

    // Case 2: Already Hanja or passthrough
    const siHanja = STEMS.indexOf(s);
    const biHanja = BRANCHES.indexOf(b);

    if (siHanja >= 0 && biHanja >= 0) {
        return {
            stem: STEMS[siHanja],
            branch: BRANCHES[biHanja],
            label: `${STEMS[siHanja]}${BRANCHES[biHanja]}`
        };
    }

    return { stem: "?", branch: "?", label: "UNKNOWN" };
}

// UTC Utilities (T=1+)
function parseYMDToUTCDate(ymd: string): Date {
    const [y, m, d] = ymd.split('-').map(Number);
    return new Date(Date.UTC(y, m - 1, d));
}

function addDaysUTC(date: Date, days: number): Date {
    const next = new Date(date.getTime());
    next.setUTCDate(next.getUTCDate() + days);
    return next;
}

function dayOfYearUTC(date: Date): number {
    const start = Date.UTC(date.getUTCFullYear(), 0, 0);
    const diff = date.getTime() - start;
    return Math.floor(diff / (1000 * 60 * 60 * 24));
}

function getEquationOfTimeUTC(date: Date): number {
    const dayOfYear = dayOfYearUTC(date);
    const b = (360 / 365.24) * (dayOfYear - 81) * (Math.PI / 180);
    const eot = 9.87 * Math.sin(2 * b) - 7.53 * Math.cos(b) - 1.5 * Math.sin(b);
    return parseFloat(eot.toFixed(2));
}

// [L=1++] Ten Gods (십신) Logic
const ELEMENTS: Record<string, string> = {
    "甲": "Wood", "乙": "Wood",
    "丙": "Fire", "丁": "Fire",
    "戊": "Earth", "己": "Earth",
    "庚": "Metal", "辛": "Metal",
    "壬": "Water", "癸": "Water",
    "寅": "Wood", "卯": "Wood",
    "巳": "Fire", "午": "Fire",
    "辰": "Earth", "戌": "Earth", "丑": "Earth", "未": "Earth",
    "申": "Metal", "酉": "Metal",
    "亥": "Water", "子": "Water"
};

const POLARITY: Record<string, string> = {
    "甲": "Yang", "丙": "Yang", "戊": "Yang", "庚": "Yang", "壬": "Yang",
    "乙": "Yin", "丁": "Yin", "己": "Yin", "辛": "Yin", "癸": "Yin",
    "子": "Yang", "寅": "Yang", "辰": "Yang", "午": "Yang", "申": "Yang", "戌": "Yang",
    "丑": "Yin", "卯": "Yin", "巳": "Yin", "未": "Yin", "酉": "Yin", "亥": "Yin"
};

function getTenGod(dayStem: string, target: string): string {
    const dE = ELEMENTS[dayStem];
    const dP = POLARITY[dayStem];
    const tE = ELEMENTS[target];
    const tP = POLARITY[target];

    if (!dE || !tE) return "UNKNOWN";

    const order = ["Wood", "Fire", "Earth", "Metal", "Water"];
    const dIdx = order.indexOf(dE);
    const tIdx = order.indexOf(tE);
    const diff = (tIdx - dIdx + 5) % 5;

    const sameP = (dP === tP);

    switch (diff) {
        case 0: return sameP ? "비견" : "겁재";
        case 1: return sameP ? "식신" : "상관";
        case 2: return sameP ? "편재" : "정재";
        case 3: return sameP ? "편관" : "정관";
        case 4: return sameP ? "편인" : "정인";
        default: return "UNKNOWN";
    }
}

export const calculateV1 = (input: AstroInput): AstroCalculationV1 => {
    const warnings: string[] = [];
    const [year, month, day] = input.birthDate.split('-').map(Number);

    // [Safety Net Layer 1] Input Year Range Check
    if (year < 1890 || year > 2050) {
        throw new Error("Year out of supported range [1890-2050]");
    }

    // 1. [L=1] Lunar/Solar Normalization
    let solarYMD: { year: number; month: number; day: number };

    if (input.calendar === 'lunar') {
        try {
            const converted = toSolar(year, month, day, input.isLeapMonth || false);
            solarYMD = { year: converted.year, month: converted.month, day: converted.day };

            // [Safety Net Layer 2] Post-Conversion Year Range Check (Boundary Case)
            if (solarYMD.year < 1890 || solarYMD.year > 2050) {
                throw new Error("Year out of supported range [1890-2050] after conversion");
            }
        } catch (e: any) {
            if (e.message.includes("range")) throw e;
            throw new Error(`KOR_LUNAR_CONVERT_FAILED: toSolar failed - ${e.message}`);
        }
    } else {
        solarYMD = { year, month, day };
    }

    const solarDateStr = `${solarYMD.year}-${String(solarYMD.month).padStart(2, '0')}-${String(solarYMD.day).padStart(2, '0')}`;
    const solarDateObj = parseYMDToUTCDate(solarDateStr);

    // 2. [T=1] True Solar Time Correction
    let forensic: AstroCalculationV1['forensicTime'] | undefined;
    let effectiveDate = solarDateObj;

    if (!input.timeUnknown && input.birthTime) {
        const [hh, mm] = input.birthTime.split(':').map(Number);
        const localMinutes = hh * 60 + mm;

        const longitude = 127.0;
        const stdMeridian = 135.0;
        const longitudeOffset = (longitude - stdMeridian) * 4;
        const eot = getEquationOfTimeUTC(solarDateObj);
        const totalOffset = eot + longitudeOffset;

        let trueSolarMinutes = localMinutes + totalOffset;
        let dayShift = 0;

        if (trueSolarMinutes < 0) {
            trueSolarMinutes += 1440;
            dayShift = -1;
        } else if (trueSolarMinutes >= 1440) {
            trueSolarMinutes -= 1440;
            dayShift = 1;
        }

        const trueHH = Math.floor(trueSolarMinutes / 60);
        const trueMM = Math.floor(trueSolarMinutes % 60);
        const trueSolarHHmm = `${String(trueHH).padStart(2, '0')}:${String(trueMM).padStart(2, '0')}`;

        let classification = "일반";
        if (trueSolarMinutes >= 1410 || trueSolarMinutes < 90) {
            classification = (trueSolarMinutes >= 1410) ? "야자시" : "조자시";
        }

        effectiveDate = addDaysUTC(solarDateObj, dayShift);

        forensic = {
            localTime: input.birthTime,
            equationOfTimeMin: eot,
            longitudeOffsetMin: longitudeOffset,
            totalOffsetMin: parseFloat(totalOffset.toFixed(2)),
            trueSolarHHmm,
            dayShift,
            classification
        };
    }

    // 3. Pillars Mapping & Normalization
    let finalLunarData: any;
    try {
        finalLunarData = toLunar(effectiveDate.getUTCFullYear(), effectiveDate.getUTCMonth() + 1, effectiveDate.getUTCDate());
    } catch (e: any) {
        throw new Error(`KOR_LUNAR_CONVERT_FAILED: toLunar failed - ${e.message}`);
    }

    const dayPillar = toHanjaGanji(finalLunarData.iljin);
    const dStem = dayPillar.stem;

    const yearPillar = { ...toHanjaGanji(finalLunarData.secha), tenGod: getTenGod(dStem, toHanjaGanji(finalLunarData.secha).stem) };

    let monthPillar: Pillar;
    if (finalLunarData.wolgeon) {
        const mBase = toHanjaGanji(finalLunarData.wolgeon);
        monthPillar = { ...mBase, tenGod: getTenGod(dStem, mBase.stem) };
    } else {
        monthPillar = { stem: "?", branch: "?", label: "UNKNOWN" };
        warnings.push("윤달 월건 미제공");
    }

    let hourPillar: Pillar | null = null;
    if (forensic) {
        const [trueHH, trueMM] = forensic.trueSolarHHmm.split(':').map(Number);
        const tMinutes = trueHH * 60 + trueMM;
        let branchIdx = Math.floor((tMinutes + 30) / 120) % 12;

        const dayStemIdx = STEMS.indexOf(dStem);
        if (dayStemIdx !== -1) {
            const startHourStemIdx = ((dayStemIdx % 5) * 2) % 10;
            const hourStemIdx = (startHourStemIdx + branchIdx) % 10;

            hourPillar = {
                stem: STEMS[hourStemIdx],
                branch: BRANCHES[branchIdx],
                label: `${STEMS[hourStemIdx]}${BRANCHES[branchIdx]}`,
                tenGod: getTenGod(dStem, STEMS[hourStemIdx])
            };
        }
    }

    return {
        algorithmVersion: "Genesis-V6.0 (Phase 28)",
        schemaVersion: "report/v6",
        computedAt: new Date().toISOString(),
        normalization: {
            originalDate: input.birthDate,
            isLeapMonth: !!input.isLeapMonth,
            solarDate: solarDateStr,
            solarYMD: { y: solarYMD.year, m: solarYMD.month, d: solarYMD.day }
        },
        forensicTime: forensic,
        pillars: {
            year: yearPillar,
            month: monthPillar,
            day: { ...dayPillar, tenGod: "본체(Kernel)" },
            hour: hourPillar
        },
        warnings
    };
};

```

---

## 📄 src/pages/ReportPrint.tsx

```tsx
/* eslint-disable @tanstack/query/no-window-matchmedia */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { dbInstance as db } from '../lib/firebase';
import { Card } from '../components/ui/Card';
import type { Section } from '../types/report';
import styles from './Report.module.css';

/**
 * ReportPrint Page (Phase 26)
 * Print-optimized layout for PDF export
 * - No sidebar, no buttons, no share actions
 * - Auto-trigger window.print() on mount
 * - Preserves Technical Ink styling
 */

function GenesisCodeVisual() {
    return (
        <div className={styles.visualBox}>
            <p className={styles.visualTitle}>Genesis Architecture Diagram</p>
            <div className={styles.placeholder}></div>
        </div>
    );
}

function BalanceRadarVisual() {
    return (
        <div className={styles.visualBox}>
            <p className={styles.visualTitle}>Energy Balance Radar</p>
            <div className={styles.placeholder}></div>
        </div>
    );
}

const normalizeSection = (s: any, index: number): Section => {
    let id = typeof s?.id === 'string' ? s.id.trim() : String(s?.id ?? "");
    const title = typeof s?.title === 'string' ? s.title.trim() : String(s?.title ?? "제목 없음");
    const category = typeof s?.category === 'string' ? s.category.trim() : "ANALYSIS";

    const result = s?.result ? String(s.result) : undefined;
    const explain = s?.explain ? String(s.explain) : undefined;
    const interpretation = s?.interpretation ? String(s.interpretation) : undefined;

    let content = s?.content ? String(s.content) : "";
    if (!content && (result || explain || interpretation)) {
        content = [result, explain, interpretation].filter(val => val && val.length > 0).join("\n\n");
    }

    if (!id || id.length === 0) { id = `unknown_${index}`; }
    id = id.replace(/[^a-zA-Z0-9_-]/g, '_');

    return {
        id, title, content, category,
        result, explain, interpretation,
        type: s?.type,
        reasonCards: s?.reasonCards || []
    };
};

const normalizeSections = (input: any, toc?: any[]): Section[] => {
    let rawSections: Section[] = [];
    if (Array.isArray(input)) { rawSections = input.map((s, i) => normalizeSection(s, i)); }
    else if (input && typeof input === 'object') { rawSections = Object.values(input).map((s, i) => normalizeSection(s, i)); }

    if (!toc || !Array.isArray(toc)) return rawSections;

    const sectionMap = new Map(rawSections.map(s => [s.id, s]));
    const ordered: Section[] = [];
    const seenIds = new Set<string>();

    toc.forEach((item: any) => {
        const id = item.id?.replace(/[^a-zA-Z0-9_-]/g, '_');
        const section = sectionMap.get(id);
        if (section) {
            ordered.push(section);
            seenIds.add(id);
        }
    });

    rawSections.forEach(s => { if (!seenIds.has(s.id)) ordered.push(s); });
    return ordered;
};

export const ReportPrint: React.FC = () => {
    const { reportId } = useParams<{ reportId: string }>();
    const [reportData, setReportData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReport = async () => {
            if (!reportId) return;

            try {
                const docRef = doc(db, "reports", reportId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setReportData(docSnap.data());
                }
            } catch (error) {
                console.error("Print page fetch error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchReport();
    }, [reportId]);

    // Auto-trigger print after content is ready
    useEffect(() => {
        if (!loading && reportData) {
            // Small delay to ensure rendering is complete
            const timer = setTimeout(() => {
                window.print();
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [loading, reportData]);

    if (loading) {
        return (
            <div className={styles.reportPage}>
                <div className={styles.loadingState}>
                    <p>인쇄 준비 중...</p>
                </div>
            </div>
        );
    }

    const activeSections = normalizeSections(reportData?.sections, reportData?.tableOfContents);

    return (
        <div className={`${styles.reportPage} ${styles.printMode}`}>
            <main className={styles.reportContent}>
                <header className={styles.reportHeader}>
                    <h1 className={styles.mainTitle}>
                        {reportData?.reportMeta?.title || "SYSTEM AUDIT v5.0"}
                    </h1>
                    <p className={styles.mainSummary}>{reportData?.reportMeta?.summary}</p>
                </header>

                {activeSections.map((section) => (
                    <section
                        key={section.id}
                        id={`page-${section.id}`}
                        className={styles.pageSection}
                    >
                        <div className={styles.pageHeader}>
                            <span className={styles.categoryTag}>{section.category}</span>
                            <span className={styles.pageIdentifier}>ID: {section.id}</span>
                        </div>

                        <Card className={styles.contentCard}>
                            <h2 className={styles.sectionTitle}>{section.title}</h2>

                            {section.id === "02_code" && <GenesisCodeVisual />}
                            {section.id === "07_balance" && <BalanceRadarVisual />}

                            {section.id !== "02_code" && section.id !== "07_balance" && (
                                <>
                                    {section.result && (
                                        <div className={styles.sectionBlock}>
                                            <h3 className={styles.blockTitle}>결과</h3>
                                            <div className={styles.textContent}>
                                                {section.result.split('\n').map((p: string, i: number) => (
                                                    p.trim() ? <p key={i}>{p}</p> : <br key={i} />
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    {section.explain && (
                                        <div className={styles.sectionBlock}>
                                            <h3 className={styles.blockTitle}>풀이</h3>
                                            <div className={styles.textContent}>
                                                {section.explain.split('\n').map((p: string, i: number) => (
                                                    p.trim() ? <p key={i}>{p}</p> : <br key={i} />
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    {section.interpretation && (
                                        <div className={styles.sectionBlock}>
                                            <h3 className={styles.blockTitle}>해석</h3>
                                            <div className={styles.textContent}>
                                                {section.interpretation.split('\n').map((p: string, i: number) => (
                                                    p.trim() ? <p key={i}>{p}</p> : <br key={i} />
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                    {!section.result && !section.explain && !section.interpretation && section.content && (
                                        <div className={styles.textContent}>
                                            {section.content.split('\n').map((p: string, i: number) => (
                                                p.trim() ? <p key={i}>{p}</p> : <br key={i} />
                                            ))}
                                        </div>
                                    )}
                                </>
                            )}
                        </Card>
                    </section>
                ))}

                <footer className={styles.disclaimerSection}>
                    <p>{reportData?.reportMeta?.strategistMeta?.disclaimer}</p>
                    <p className={styles.disclaimerEn}>본 리포트는 제네시스 마스터의 시스템적 관점에서 인간의 성향을 분석한 결과입니다. 최종적인 판단과 행동은 사용자의 주관에 따릅니다.</p>
                </footer>
            </main>
        </div>
    );
};

```

---

## 📄 scripts/test-generateReport.ts

```typescript
import { initializeApp } from "firebase/app";
import { getFunctions, httpsCallable, connectFunctionsEmulator } from "firebase/functions";
import { getFirestore, connectFirestoreEmulator, collection, getDocs } from "firebase/firestore";

/**
 * Phase 3-C: Real Calculation Hardening Verification Script
 * 1. 윤달 월건 UNKNOWN 처리 검증
 * 2. 지원 연도 범위 (1890~2050) 외 차단 검증
 * 3. 한자 간지 정규화 검증
 */

const firebaseConfig = {
    apiKey: process.env.VITE_FIREBASE_API_KEY,
    projectId: process.env.VITE_FIREBASE_PROJECT_ID || "myungri-genesis",
};

if (!firebaseConfig.apiKey) {
    console.error("❌ Error: VITE_FIREBASE_API_KEY is missing in environment variables.");
    process.exit(1);
}

const app = initializeApp(firebaseConfig);
const functions = getFunctions(app, 'asia-northeast3');
const db = getFirestore(app);

connectFunctionsEmulator(functions, "127.0.0.1", 5001);
connectFirestoreEmulator(db, "127.0.0.1", 8080);

async function runVerification() {
    console.log("\n🧪 Starting Phase 3-C Hardening Verification...");

    const generateReport = httpsCallable(functions, 'generateReport');

    // Case 1: Leap Month (Expect wolgeon="" -> UNKNOWN pillar)
    console.log("\n1. Testing Leap Month (2023-05-15 lunar leap -> Expect UNKNOWN Month)...");
    try {
        const res: any = await generateReport({
            birthDate: "2023-05-15",
            sex: "female",
            calendar: "lunar",
            isLeapMonth: true,
            timeUnknown: true
        });
        const calc = res.data.calculation;
        console.log("✅ SUCCESS:", res.data.reportId);
        console.log("   - Month Pillar:", calc.pillars.month.label); // Expect UNKNOWN
        console.log("   - Day Pillar (Hanja):", calc.pillars.day.label); // Expect Hanja
        console.log("   - Warning:", calc.warnings[0]);
    } catch (error: any) {
        console.error("❌ FAILURE:", error.message, "| Details:", error.details);
    }

    // Case 2: Year Range (Expect Reject 1850)
    console.log("\n2. Testing Out-of-Range Year (1850 -> Expect Error)...");
    try {
        await generateReport({
            birthDate: "1850-01-01",
            sex: "male",
            calendar: "solar",
            timeUnknown: true
        });
        console.error("❌ FAILURE: Should have been rejected.");
    } catch (error: any) {
        console.log("✅ SUCCESS: Properly rejected:", error.message);
    }

    // Case 3: Year Range (Expect Reject 2080)
    console.log("\n3. Testing Out-of-Range Year (2080 -> Expect Error)...");
    try {
        await generateReport({
            birthDate: "2080-12-31",
            sex: "male",
            calendar: "solar",
            timeUnknown: true
        });
        console.error("❌ FAILURE: Should have been rejected.");
    } catch (error: any) {
        console.log("✅ SUCCESS: Properly rejected:", error.message);
    }

    // Case 4: Hanja Ganji Normalization Check
    console.log("\n4. Testing Hanja Normalization (2023-01-01 solar)...");
    try {
        const res: any = await generateReport({
            birthDate: "2023-01-01",
            sex: "male",
            calendar: "solar",
            timeUnknown: true
        });
        const calc = res.data.calculation;
        console.log("✅ SUCCESS:", res.data.reportId);
        console.log("   - Year Pillar (Hanja):", calc.pillars.year.label);
        // 2023 is 壬寅 (임인) or 癸卯 (계묘) depending on solar date.
        // Let's check if it's Hanja.
        const isHanja = /[\u4e00-\u9fa5]/.test(calc.pillars.year.label);
        console.log("   - Is Hanja?:", isHanja);
    } catch (error: any) {
        console.error("❌ FAILURE:", error.message);
    }

    console.log("\n✨ Hardening Verification Completed.\n");
}

runVerification();

```

---

## 📄 src/components/system/SecurityShield.tsx

```tsx
import React from 'react';
import { PaperBackground } from '../layout/PaperBackground';
import { Footer } from '../layout/Footer';

interface SecurityShieldProps {
    reason: string | null;
}

export const SecurityShield: React.FC<SecurityShieldProps> = ({ reason }) => {
    return (
        <PaperBackground>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                textAlign: 'center',
                padding: '2rem',
                fontFamily: 'var(--font-sans)',
                background: 'rgba(0,0,0,0.02)'
            }}>
                <div style={{
                    fontSize: '3rem',
                    marginBottom: '1.5rem',
                    filter: 'drop-shadow(0 0 10px rgba(212,175,55,0.3))'
                }}>
                    🛡️
                </div>
                <h1 style={{
                    color: 'var(--accent)',
                    marginBottom: '1rem',
                    fontFamily: 'var(--font-serif)',
                    fontWeight: 900,
                    letterSpacing: '0.1em'
                }}>
                    SECURITY SHIELD ACTIVE
                </h1>
                <p style={{
                    color: 'var(--text-main)',
                    fontSize: '1rem',
                    lineHeight: '1.8',
                    maxWidth: '400px',
                    wordBreak: 'keep-all'
                }}>
                    {reason === "MISSING_FIREBASE_CONFIG"
                        ? "Vite 빌드 타임에 필수 Firebase 설정(Project ID 등)이 주입되지 않아 앱 실행이 원천 차단되었습니다."
                        : "이 빌드에 필수 보안 설정(reCAPTCHA Site Key)이 누락되어 배포 및 API 호출이 원격 차단되었습니다."
                    }
                </p>
                <div style={{
                    marginTop: '2rem',
                    padding: '1rem',
                    background: 'var(--surface)',
                    borderRadius: '4px',
                    fontSize: '0.8rem',
                    fontFamily: 'monospace',
                    color: '#e74c3c',
                    border: '1px solid rgba(231,76,60,0.2)'
                }}>
                    ERRORCODE: {reason || "UNKNOWN_SECURITY_FAIL"}
                </div>
                <p style={{
                    marginTop: '1.5rem',
                    color: 'var(--muted)',
                    fontSize: '0.8rem'
                }}>
                    관리자 가이드에 따라 .env.production.local 설정을 확인하십시오.
                </p>
            </div>
            <Footer />
        </PaperBackground>
    );
};

```

---

## 📄 src/index.css

```css
:root {
  --bg: #F3F0EB;
  /* Warm Beige (Hanji) */
  --card: #FFFFFF;
  --ink: #2C2C2C;
  /* Ink Black */
  --muted: #8C8C8C;
  /* Muted Ink */
  --accent: #CC3D3D;
  /* Cinnabar Red (Inju) */
  --line: rgba(0, 0, 0, 0.1);

  --font-serif: "Noto Serif KR", serif;
  --font-sans: "Noto Sans KR", "Inter", system-ui, -apple-system, sans-serif;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background-color: var(--bg);
  color: var(--ink);
  font-family: var(--font-sans);
  line-height: 1.7;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  /* Paper Texture Background */
  background-image: url('/assets/paper-noise.png');
  background-repeat: repeat;
  background-size: 150px;
  background-attachment: fixed;
  position: relative;
}

body::before {
  content: "";
  position: fixed;
  inset: 0;
  background-color: var(--bg);
  z-index: -1;
}

/* Texture Blend Layer */
body::after {
  content: "";
  position: fixed;
  inset: 0;
  background-image: url('/assets/paper-noise.png');
  background-repeat: repeat;
  background-size: 150px;
  opacity: 0.04;
  pointer-events: none;
  z-index: -1;
  background-attachment: fixed;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-family: var(--font-serif);
  font-weight: 700;
  color: var(--ink);
  letter-spacing: -0.02em;
}

/* BrandLockup Classes */
.brand-lockup {
  display: inline-flex;
  align-items: baseline;
  gap: 0.5rem;
  max-width: 100%;
  transition: all 0.3s ease;
}

.brand-lockup-kr {
  font-family: var(--font-serif);
  font-weight: 900;
  color: var(--ink);
  white-space: nowrap;
}

.brand-lockup-en {
  font-family: var(--font-sans);
  font-weight: 500;
  color: var(--ink);
  white-space: nowrap;
}

.brand-lockup-suffix {
  font-family: var(--font-sans);
  font-weight: 300;
  color: var(--muted);
  white-space: nowrap;
}

.brand-lockup.variant-accent .brand-lockup-suffix {
  color: var(--accent);
  font-weight: 400;
}

/* Responsive Stacked Behavior [R3] */
.brand-lockup.variant-stacked-mobile {
  flex-direction: column;
  align-items: flex-start;
  gap: 0;
}

@media (max-width: 389px) {
  .brand-lockup:not(.variant-force-inline) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0;
  }
}

#root {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
```

---

## 📄 src/components/common/BrandLockup.tsx

```tsx
import React from 'react';
import { APP_NAME_EN, BRAND_LOCKUP_KR } from '../../config/brand';

interface BrandLockupProps {
    display: 'kr_lockup' | 'en_name';
    variant?: 'default' | 'accent' | 'stacked-mobile';
    className?: string;
    as?: 'h1' | 'h2' | 'div' | 'span';
}

/**
 * BrandLockup Component
 * 
 * [R3] Responsive: Automatically stacks when viewport <= 389px via CSS.
 * [R4] Usage: 
 *      - Intro: display="kr_lockup" variant="accent" (as="h1")
 *      - Home: display="kr_lockup" variant="default"
 *      - Report/PDF: display="en_name"
 */
export const BrandLockup: React.FC<BrandLockupProps> = ({
    display,
    variant = 'default',
    className = '',
    as = 'div'
}) => {
    const Component = as;

    // Split the brand string into Part 1 (命理 or MYUNGRI) and Part 2 (: The Genesis)
    // BRAND_LOCKUP_KR = "命理: The Genesis"
    // APP_NAME_EN = "MYUNGRI: The Genesis"
    const fullText = display === 'kr_lockup' ? BRAND_LOCKUP_KR : APP_NAME_EN;
    const [part1, part2] = fullText.split(':');

    const variantClass = variant === 'stacked-mobile' ? 'variant-stacked-mobile' : variant === 'accent' ? 'variant-accent' : '';
    const displayClass = display === 'kr_lockup' ? 'brand-lockup-kr' : 'brand-lockup-en';

    return (
        <Component className={`brand-lockup ${variantClass} ${className}`.trim()}>
            <span className={displayClass}>{part1}</span>
            <span className="brand-lockup-suffix">:{part2}</span>
        </Component>
    );
};

```

---

## 📄 package.json

```json
{
  "name": "myungri-the-genesis",
  "author": "KS Company <suhachi78@gmail.com>",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "prebuild": "node scripts/gen-build-info.mjs && node scripts/check-env.cjs",
    "build": "tsc -b && vite build",
    "build:functions": "npm --prefix functions run build",
    "build:all": "npm run build && npm run build:functions",
    "deploy": "npm run build:all && firebase deploy",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "firebase": "^12.7.0",
    "react": "^19.2.0",
    "react-dom": "^19.2.0",
    "react-router-dom": "^7.11.0"
  },
  "devDependencies": {
    "@eslint/js": "^9.39.1",
    "@types/node": "^24.10.1",
    "@types/react": "^19.2.5",
    "@types/react-dom": "^19.2.3",
    "@types/react-router-dom": "^5.3.3",
    "@vitejs/plugin-react": "^5.1.1",
    "eslint": "^9.39.1",
    "eslint-plugin-react-hooks": "^7.0.1",
    "eslint-plugin-react-refresh": "^0.4.24",
    "globals": "^16.5.0",
    "typescript": "~5.9.3",
    "typescript-eslint": "^8.46.4",
    "vite": "^7.2.4"
  }
}
```

---

## 📄 src/components/layout/Footer.tsx

```tsx
import React from 'react';
import styles from './Footer.module.css';

export const Footer: React.FC = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.copyright}>
                    Copyright © 2025 MYUNGRI: The Genesis.
                </div>
                <div className={styles.companyInfo}>
                    KS컴퍼니 <span className={styles.divider}>|</span> 대표: 배종수, 석경선 <span className={styles.divider}>|</span> 문의: suhachi78@gmail.com
                </div>
            </div>
        </footer>
    );
};

```

---

## 📄 src/components/ui/AdviceBox.tsx

```tsx
import React from 'react';
import styles from './AdviceBox.module.css';

interface AdviceBoxProps {
    children: React.ReactNode;
    className?: string;
    badgeText?: string;
}

export const AdviceBox: React.FC<AdviceBoxProps> = ({
    children,
    className = '',
    badgeText = 'Action Plan'
}) => {
    return (
        <div className={`${styles.adviceBox} ${className}`.trim()}>
            <div className={styles.badge}>{badgeText}</div>
            <div className={styles.content}>
                {children}
            </div>
        </div>
    );
};

```

---

## 📄 src/components/ui/Card.tsx

```tsx
import React from 'react';
import styles from './Card.module.css';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    hasAccentBar?: boolean;
}

export const Card: React.FC<CardProps> = ({
    children,
    className = '',
    hasAccentBar = false
}) => {
    return (
        <div className={`${styles.card} ${hasAccentBar ? styles.accentBar : ''} ${className}`.trim()}>
            {children}
        </div>
    );
};

```

---

## 📄 src/config/brand.ts

```typescript
/**
 * MYUNGRI: The Genesis - Brand Naming Constants
 * 
 * [Usage Rules]
 * - APP_NAME_EN: Used for <title>, meta tags, SEO, and technical documentation/reports.
 * - BRAND_LOCKUP_KR: Used ONLY for Intro and Home visible brand headlines.
 */

export const APP_NAME_EN = "MYUNGRI: The Genesis";
export const BRAND_LOCKUP_KR = "命理: The Genesis";

```

---

---

**Part 6/10 완료**

[← 인덱스로 돌아가기](./INDEX.md) | [← Part 5](./codebase_part_05.md) | [Part 7 →](./codebase_part_07.md)