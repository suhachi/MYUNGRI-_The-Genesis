# Frontend - Core

> 프론트엔드 핵심 로직 (Firebase, 유틸리티, 타입 정의)

**생성 시각**: 2026-01-05T10:21:53.963Z

---

## 📋 목차 (6개 파일)

1. [src/config/brand.ts](#file-1)
2. [src/config/reportTemplate.ts](#file-2)
3. [src/config/shareMeta.ts](#file-3)
4. [src/config/tokens.ts](#file-4)
5. [src/config/trivia.ts](#file-5)
6. [src/types/report.ts](#file-6)

---

## File 1: `src/config/brand.ts` {#file-1}

**크기**: 0.35 KB | **확장자**: ts

```ts
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

## File 2: `src/config/reportTemplate.ts` {#file-2}

**크기**: 5.01 KB | **확장자**: ts

```ts
export interface ReportPage {
    id: number;
    title: string;
    category: string;
    content: string;
    type: 'cover' | 'index' | 'summary' | 'analysis' | 'action' | 'appendix';
}

export const REPORT_SECTIONS: ReportPage[] = [
    { id: 1, title: "분석 엔진 리포트", category: "Cover", content: "당신의 우주적 설계도와 현대적 데이터의 만남", type: 'cover' },
    { id: 2, title: "리포트 목차", category: "Index", content: "32페이지에 걸친 상세 분석 지도", type: 'index' },
    { id: 3, title: "탄생 데이터 요약", category: "Summary", content: "입력된 탄생 정보 및 환경 변수 확인", type: 'summary' },
    { id: 4, title: "원전 근거 (Reason Card 01)", category: "Evidence", content: "고전 문헌에 근거한 본질적 자아 분석", type: 'analysis' },
    { id: 5, title: "오행의 균형 분석", category: "Overview", content: "목(木), 화(火), 토(土), 금(金), 수(水) 분포도", type: 'analysis' },
    { id: 6, title: "십신(十神)의 상호작용", category: "Overview", content: "사회적 관계와 내면적 욕구의 구조", type: 'analysis' },
    { id: 7, title: "신강/신약 측정 결과", category: "Analysis", content: "일간의 힘과 주변 기운의 조화", type: 'analysis' },
    { id: 8, title: "격국(格局) 판정", category: "Analysis", content: "삶의 큰 틀과 사회적 그릇의 정의", type: 'analysis' },
    { id: 9, title: "용신(用神)과 희신(喜神)", category: "Analysis", content: "균형을 맞추는 핵심 기운과 반가운 기운", type: 'analysis' },
    { id: 10, title: "천간(天干) 에너지 분석", category: "Details", content: "드러난 성정과 외부적 기질", type: 'analysis' },
    { id: 11, title: "지지(地支) 잠재력 분석", category: "Details", content: "내면의 에너지와 현실적 기반", type: 'analysis' },
    { id: 12, title: "지장간(地藏干)의 암시", category: "Details", content: "숨겨진 재능과 예상치 못한 기회", type: 'analysis' },
    { id: 13, title: "십이운성(十二運星) 주기", category: "Cycles", content: "에너지의 성쇠와 생애 변곡점", type: 'analysis' },
    { id: 14, title: "대운(大運)의 흐름: 1단계", category: "Cycles", content: "생애 첫 번째 대운의 도전과 성과", type: 'analysis' },
    { id: 15, title: "대운(大運)의 흐름: 2단계", category: "Cycles", content: "청년기 에너지 방향성과 확장성", type: 'analysis' },
    { id: 16, title: "현재 대운 집중 분석", category: "Cycles", content: "현재 당신이 서 있는 인생의 계절", type: 'analysis' },
    { id: 17, title: "세운(歲運) 흐름: 올해의 운", category: "Cycles", content: "현재 연도의 기운적 특징과 활용법", type: 'analysis' },
    { id: 18, title: "월별 흐름 예측: 상반기", category: "Cycles", content: "기운의 변화 리듬과 월별 전략", type: 'analysis' },
    { id: 19, title: "월별 흐름 예측: 하반기", category: "Cycles", content: "안정적 마무리를 위한 기운 조율", type: 'analysis' },
    { id: 20, title: "액션 플랜: 커리어 전략", category: "Action", content: "직업적 성취를 위한 최적의 타이밍", type: 'action' },
    { id: 21, title: "액션 플랜: 재무적 흐름", category: "Action", content: "리스크 관리와 자산 형성의 시기", type: 'action' },
    { id: 22, title: "액션 플랜: 인간관계", category: "Action", content: "귀인의 원조와 조심해야 할 인연", type: 'action' },
    { id: 23, title: "액션 플랜: 조언(Advice Card)", category: "Action", content: "현재 직면한 과제에 대한 명확한 지침", type: 'action' },
    { id: 24, title: "건강 및 심리적 조언", category: "Health", content: "신체적 에너지 보강과 멘탈 관리", type: 'action' },
    { id: 25, title: "공간적 활용: 행운의 방향", category: "Action", content: "주거 및 활동 공간의 에너지 최적화", type: 'action' },
    { id: 26, title: "컬러 및 상징 활용법", category: "Action", content: "일상의 소품으로 기운을 보강하는 방법", type: 'action' },
    { id: 27, title: "원전 근거 (Reason Card 02)", category: "Evidence", content: "심화 분석 데이터 대조 결과", type: 'analysis' },
    { id: 28, title: "심층 분석: 성격의 이면", category: "Deep Dive", content: "타인이 모르는 당신만의 본질", type: 'analysis' },
    { id: 29, title: "미래 전략: 3년 내 핵심 과제", category: "Action", content: "가장 우선순위를 두어야 할 삶의 영역", type: 'action' },
    { id: 30, title: "분석 학술적 Appendix", category: "Appendix", content: "사용된 전문 용어와 분석 기법 해설", type: 'appendix' },
    { id: 31, title: "리포트 요약 및 맺음말", category: "Appendix", content: "변화를 위한 마지막 한마디", type: 'appendix' },
    { id: 32, title: "정밀 분석 보증서", category: "Appendix", content: "데이터 정확성 및 분석 권위 보증", type: 'appendix' },
];

```

---

## File 3: `src/config/shareMeta.ts` {#file-3}

**크기**: 0.61 KB | **확장자**: ts

```ts
/**
 * Share Metadata Configuration
 * Strict Rules: EN brand only ("MYUNGRI: The Genesis")
 */

const origin = import.meta.env.VITE_PUBLIC_ORIGIN || window.location.origin;

export const SHARE_META = {
    TITLE: "MYUNGRI: The Genesis",
    DESCRIPTION: "Modern Heritage & Astro-Data Analysis Report",
    IMAGE_URL: `${origin}/og-placeholder.png`, // 실제 운영 시 절대 경로 OG 이미지 필요
    URL_BASE: origin
};

export const getShareUrl = () => {
    // 리포트는 stateful하므로 직접 공유 대신 시작 페이지(/start) 공유 권장
    return `${SHARE_META.URL_BASE}/start`;
};

```

---

## File 4: `src/config/tokens.ts` {#file-4}

**크기**: 0.47 KB | **확장자**: ts

```ts
/**
 * Genesis Design Tokens
 * 
 * Strict Rule: NO pure #000 or #FFF allowed.
 */

export const colors = {
    bg: "#EBE7E0",
    card: "#FDFCF8",
    ink: "#1C1C1C",
    muted: "#5A5A5A",
    accent: "#D9381E",
    line: "color-mix(in srgb, var(--ink) 12%, transparent)",
} as const;

export const fonts = {
    serif: '"Noto Serif KR", serif',
    sans: '"Noto Sans KR", "Inter", system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif',
} as const;

```

---

## File 5: `src/config/trivia.ts` {#file-5}

**크기**: 1.26 KB | **확장자**: ts

```ts
export const TRIVIA_LINES = [
    "만세력 알고리즘으로 당신의 탄생 좌표를 정밀 측정 중입니다.",
    "오행의 균형과 기운의 흐름을 초원자 단위로 분석하고 있습니다.",
    "십신(十神)의 상호작용을 통해 성격과 기질을 파악하는 중입니다.",
    "대운과 세운의 교차점을 분석하여 미래의 기회를 탐색합니다.",
    "근거 카드(Reason Card) 엔진이 원전 데이터를 대조하고 있습니다.",
    "역학적 균형을 맞추기 위해 정교한 수치 연산을 수행 중입니다.",
    "하드코딩된 분석 엔진이 좌표를 도출하고 있습니다.",
    "음양의 조화가 당신의 삶에 미치는 영향을 검토하고 있습니다.",
    "정확한 해석을 위해 60갑자의 순환 정보를 재정렬하고 있습니다.",
    "데이터 기반의 명확한 Action Plan을 구성하는 중입니다.",
    "당신의 고유한 기운이 현대적 해석과 만나는 과정입니다.",
    "불필요한 미신을 배제하고 학술적 근거에 집중하여 분석합니다.",
    "사주 원국의 강약을 측정하여 인생의 계절을 파악 중입니다.",
    "Genesis Book Style의 고전적 미학을 리포트에 담고 있습니다."
];

```

---

## File 6: `src/types/report.ts` {#file-6}

**크기**: 1.12 KB | **확장자**: ts

```ts
// Report Types for Phase 26
export interface ReasonCard {
    title: string;
    evidence: string[];
    patchCode: string[];
    riskIfIgnored: string;
}

export interface Section {
    id: string;
    title: string;
    content?: string; // Legacy support
    category: string;
    type?: string;
    reasonCards?: ReasonCard[];
    // Phase 27: 3단 구조
    result?: string;
    explain?: string;
    interpretation?: string;
    qualityGuarded?: boolean;
}

export interface ReportMeta {
    title: string;
    summary: string;
    fateRuntimeModel?: string; // 命/運 모델 요약
    strategistMeta?: {
        disclaimer?: string;
    };
}

export interface DayEntry {
    date: string; // YYYY-MM-DD
    score: number;
    grade: "GOOD" | "WARN" | "CAUTION";
    dayGanji?: string;
    reasons: string[];
    actionPlan: string[];
    eventFit: {
        contract: string;
        signboard: string;
        launch: string;
    };
}

export interface LuckCalendar {
    year: number;
    generatedAt: string | any; // Supports ISO String or Timestamp object
    calendar: DayEntry[];
}

```

---

