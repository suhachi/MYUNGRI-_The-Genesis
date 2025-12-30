# Project Code Documentation - Part 1


## File: eslint.config.js

```js
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
])

```

---

## File: fate_forensics_초원자단위_prd_와이어프레임_개발로드맵_v_2_오류대응_v_1.md

```md
# Fate Forensics — 초원자단위 PRD·와이어프레임·개발로드맵(v2)

> **목표**: “Digital Ancient Book(디지털 고서)” 경험으로 **원국 분석 리포트(32p+)**를 생성하는 웹서비스.
>
> **핵심 원칙(제품 고정)**
> 1) **계산(만세력/절기/진태양시/표준시 예외)** = 100% 하드코딩(알고리즘) / AI 개입 금지
> 2) **해석(리포트 본문)** = Rule Engine이 산출한 **Reason Card만 사용**
> 3) LLM = **문장 리라이팅 전용**(Reason Card 외 내용 창작 금지) + Negative Constraints 강제
>
> **룩앤필 고정 기준**: 첨부 `333.html`의 Look & Feel을 100% 준수 (배경/폰트 대비/여백/권위감).

---

## 0. 산출물(이번 v2에서 확정)

1) **전체 프로젝트 개발 기획서/계획서**
2) **초원자단위 기능상세 PRD(v2)** (페이지/기능/검증 포함)
3) **와이어프레임(v2)** (페이지별 구조 + 버튼 위치/라벨 + 반응형 규칙)
4) **원국 분석 리포트 구현 지시서(Genesis Book Style)** (디자인 토큰/컴포넌트/레이아웃)
5) **초원자단위 개발 로드맵(v2)** (작업 순서/완료 조건/검증)
6) **오류/수정 대응 시나리오(v1)** (실패 유형별 진단/대응/롤백)
7) **Anti-Gravity(개발 시작) 초원자단위 프롬프트 묶음** (Role/Context/Task/Constraints/Output)

---

# PART A. 제품 정의(기획서/계획서)

## A1. 제품 포지션
- **학술적 분석 리포트의 권위감** + **상담형 문장(이해 쉬움)**
- “놀이”가 아닌 **근거 기반(Reason Card)**, **출처(원전명+룰 제목) 공개(B 정책)**

## A2. 사용자 플로우(핵심)
1) **Intro** → 2) **Home**(Hero + 입력 진입) → 3) **Input**(생년월일시/성별/출생지/옵션) → 4) **Processing**(Trivia/Quiz 롤링) → 5) **Report**(32p+) → 6) **Share**(카카오 링크 카드) → 7) **Archive(선택)**

## A3. 데이터/엔진 철학(하이브리드)
- **Calculation Engine**: 만세력/절기/진태양시/표준시 예외/윤달/서머타임 등 오차 0 목표
- **Rule Engine**: 조건 충족 룰(Reason Card) 추출 + Conflict 해결(Topic 단위) + Weight 우선
- **LLM Rewriter**: Reason Card를 **상담형 에세이**로 연결(의미 변경 금지)

---

# PART B. 디자인 시스템(고정) — Fate Forensics: The Genesis Style

## B1. 컨셉
- Modern Heritage / Authentic / Raw / Intellectual / Scientific
- “오래된 고서의 질감 위에 현대 데이터 분석이 얹힌 느낌”

## B2. 디자인 토큰(반드시 변수로)
> **주의**: #000/#FFF “직접 사용 금지”. 아래 토큰만 사용.

### B2-1. CSS Variables (필수)
```css
:root{
  --bg:#EBE7E0;        /* bg-paper_raw */
  --card:#FDFCF8;      /* bg-card */
  --ink:#1C1C1C;       /* text-ink_wet */
  --muted:#5A5A5A;     /* text-gray-600 */
  --accent:#D9381E;    /* text-cinnabar */
  --line:rgba(28,28,28,.12);
  --kakao:#FAE100;
}
```

### B2-2. Typography
- Headings/Art: **Noto Serif KR** (700/900)
- Body/UI: **Noto Sans KR** (300~500)
- 본문 line-height: **1.75**
- **Google Fonts 로딩 필수**: Serif 900 포함

### B2-3. Background Texture
- `--bg` 위에 종이 텍스처(노이즈) 오버레이 필수
- (예) transparenttextures `natural-paper` 또는 자체 noise.png
- blend: multiply, opacity 0.25~0.45

### B2-4. Kanji Watermark (매우 중요)
- 폰트: Noto Serif KR 900
- opacity 0.03~0.10 + `mix-blend-mode: multiply`
- desktop: 우측 대형 / mobile: 배경으로 축소/재배치

### B2-5. Highlight (붉은 밑줄)
- accent(#D9381E) 0.15~0.25 opacity
- 텍스트 하단 20% 지점에 깔리게

## B3. UI 컴포넌트 스펙(모듈화)

### B3-1. Buttons
- Primary: bg `--ink`, text white, radius 0~4px, hover 시 미세 밝아짐 + 화살표 이동
- Secondary: 투명 + underline(하단 border), hover 시 라인 진해짐

### B3-2. Report Card
- 배경 `--card`
- 상단 4px accent bar
- shadow: `0 20px 50px -12px rgba(0,0,0,.05)`

### B3-3. Context Box(해석/설명)
- 목적: **“요즘 사람용 쉬운 설명”**을 “해석/설명”으로 표기
- 배경 #F7F5F0(또는 유사), left border 4px `--muted`

### B3-4. Advice Box(Action Plan)
- 배경: `rgba(217,56,30,.02)`
- border: 1px `--accent`
- 뱃지: “Action Plan” (accent 배경, white 텍스트)

---

# PART C. 정보구조(IA) + 페이지별 와이어프레임(v2)

> 모든 페이지: **모바일 자동 반응형 필수** (≤768px)
> - 좌우 padding 24px 이상
> - 데스크탑 2열 → 모바일 1열 스택

## P0. Intro (/intro)
**목적**: 첫 진입에서 “권위/신뢰”를 2초 안에 전달.

### 레이아웃
- 중앙 정렬 1컬럼
- 상단 35%: 큰 한자 심볼(예: 命) (Serif 900)
- 중단: 브랜드명 “Fate Forensics” (letter-spacing 0.28em, accent dot 가능)
- 하단: CTA 버튼 1개

### 구성요소
- [Logo/Seal] 좌상단 미니(선택)
- [Main Symbol] `命`
- [Brand Line] “FATE FORENSICS”
- [CTA Primary] “시작하기 →”

### 인터랙션
- 1) CTA 클릭 → Home
- 2) 2.5초 후 자동 전환 옵션(설정 가능) — MVP에서는 **자동 전환 OFF** 권장

---

## P1. Home (/)
**참조 구조**: `saju_design_preview_genesis_v2`의 레이아웃을 유지하되, **배경/타입/여백은 333 스타일**로 통일.

### 데스크탑(2열)
- 좌측: 헤드라인 + 서브카피 + CTA
- 우측: 대형 Kanji watermark + “서비스 원칙” 카드(불투명/가독 확보)

### 모바일(1열)
- 헤드라인 → CTA → 원칙 카드 → (하단) 입력 섹션 프리뷰

### 버튼 위치
- Primary CTA: “내 사주 분석하기 →” (좌측 본문 하단)
- Secondary: “샘플 리포트” (Primary 오른쪽)

### ‘서비스 원칙’ 카드(가독 규칙)
- **카드 배경은 불투명(최소 0.92)**
- 내부에 워터마크 금지(배경과 중복되어 산만)

---

## P2. Input (/input)
**목적**: “정확한 질문”으로 신뢰를 만든다.

### 입력 항목(기본)
- 생년월일(양력/음력 토글)
- 출생 시간(HH:MM) + “모름” 체크(모름이면 시간 추정/분석 제한 안내)
- 성별
- 출생지(시/군/구)

### 버튼
- Primary: “분석 실행”
- Secondary: “정밀 옵션 보기”

### 검증(프론트)
- 날짜 범위(예: 1900~현재)
- 시간 포맷
- 출생지 자동완성(데이터 없으면 시/도까지만 허용)

---

## P3. Options (/options) — (P2에서 모달/슬라이드로도 가능)
- 야자시 처리: 표준(제품 고정) 표시
- 진태양시: 옵션 ON/OFF (ON 기본)
- 표준시/서머타임 예외: 자동 적용(ON 고정)
- 개인정보 안내: 입력 최소화 원칙

---

## P4. Processing (/processing)
**필수 UX**: Trivia/Quiz 롤링(3~5초 간격) + 단계 메시지

### 구성
- 중앙 스피너 + 진행 텍스트
- 서브라인: “KASI 기준 검증 로직 적용 중…”
- Trivia 영역: 카드형(불투명) 1개

### Trivia/Quiz 요구사항
- 3~5초 간격 자동 교체
- 최소 15개 문구 내장(MVP)
- 문구 길이: 40~80자
- “정답/오답” UI는 MVP에서 선택(텍스트 롤링만 필수)

---

## P5. Report (/report/:id)
**목표**: 최소 **32페이지 분량(인쇄 기준)**의 “고서형 보고서”.

### 레이아웃(웹)
- 좌측: Sticky TOC(목차)
- 우측: 본문(챕터 카드)

### 목차(Sticky)
- width 240px
- `position: sticky; top: 40px;`
- 모바일: 숨김 또는 상단 드롭다운

### 본문(챕터 카드) 규칙
- 카드 padding 50px
- 챕터 간격 60px
- 각 챕터는 **(1) 상담형 본문** + **(2) 근거 카드(원전명+룰제목)** + **(3) 해석/설명 박스** 포함

### “요즘 사람용 쉬운 설명” 표기 규칙
- 라벨: **“해석/설명”**으로 표기
- 위치: 각 어려운 명리 항목 바로 아래
- 분량: 80~200자(최소) + 예시 1개(선택)

### 공유(필수)
- **카카오톡 공유(Kakao Link API)**
- 공유 카드 구성: “요약 멘트 + 썸네일 + 링크”

---

## P6. Archive (/archive)
- 최근 리포트 목록
- 필터: 날짜/주제
- 클릭 시 Report 이동

---

## P7. Admin (/admin)
**필수**: Rule Simulator(룰 엔진 시뮬레이터)

### 기능
- 룰 CRUD(Excel 업로드/다운로드)
- 룰 배포(버전)
- Simulator:
  - 입력(생년월일시/성별/출생지/옵션)
  - Hit Rules 리스트
  - Conflict 결과(Topic 단위)
  - 최종 리포트 Preview(요약/챕터 일부)

---

# PART D. 데이터/스키마/룰 엔진 설계(v2)

## D1. VAR_DICT(변수명 표준화) — 필수
- Condition_Script는 **100% 영문 소문자** 변수만 사용
- 가능한 경우 인덱스 기반(`*_idx`) 권장

### D1-1. 표준 변수(예시)
- `year_stem_idx, year_branch_idx` (0~9, 0~11)
- `month_stem_idx, month_branch_idx`
- `day_stem_idx, day_branch_idx`
- `hour_stem_idx, hour_branch_idx`
- `ten_god_counts` (dict)
- `element_balance` (wood/fire/earth/metal/water)
- `is_dst, tz_offset_minutes, true_solar_minutes`

### D1-2. 매핑(예시)
- `jia=0, yi=1 ... gui=9`
- `zi=0, chou=1 ... hai=11`

## D2. Conflict_Key(Topic 단위) — 필수
- 결과(좋다/나쁘다) 금지
- 반드시 주제 범주로 묶기

예)
- `WEALTH_TOTAL`, `LOVE_TOTAL`, `CAREER_TOTAL`, `HEALTH_TOTAL`

규칙)
- 동일 Conflict_Key 발견 시 **Weight 최상위 1개만 채택**

## D3. Base_Text 구조(LLM 대비) — 필수
- 단문 금지. 반드시 **[결론]+[이유]+[조언]** 구조.
- 추가로 “해석/설명(쉬운말)” 필드 분리 권장

### D3-1. Reason Card 권장 필드
- `conclusion`
- `reason`
- `advice`
- `interpretation_easy` (요즘 사람용)
- `evidence_title` (룰 제목)
- `source_work` (원전명)

---

# PART E. LLM 프롬프트/세이프티(v2)

## E1. Negative Constraints(강제)
- 단정 금지: “무조건/확실히/반드시” 등 사용 금지
- 의학/법률 조언 금지
- Reason Card 외 내용 **창작/추가 절대 금지**

## E2. LLM 역할
- 입력: Reason Card N개
- 출력: 상담형 에세이(톤 고정) + 섹션 연결 + 문장 자연화
- **의미 변경 금지**, 수치/근거 추가 금지

---

# PART F. QA/검증(골든 샘플 전략) — v2 강화

## F1. 검증 데이터셋(총 10,000건)
- **KASI 기준** 비교
- 20%(2,000건) = 오류 발생률 높은 구간에 집중
  - 예: **1954~1961 표준시/서머타임 변동 구간**
- 나머지 8,000건 = 일반 구간 랜덤/균형

## F2. 자동화 테스트
- Calculation Engine 단위 테스트
- Rule Engine 히트/충돌/Weight 선택 테스트
- PDF 렌더 테스트(페이지 수/깨짐/폰트 포함)

---

# PART G. PDF/Print CSS(운영 리스크 해결)

## G1. 한글 깨짐 방지(필수)
- Puppeteer/Playwright 런타임(Linux)에 **Noto Sans KR / Noto Serif KR 설치**
- PDF 전용 CSS(`@media print`) 필수

## G2. Print 템플릿 요구사항(32p)
- page break
- header/footer
- toc
- section break

---

# PART H. 개발 로드맵(v2) — 초원자 단위

> **원칙**: “UI 먼저”가 아니라, **Calculation → Rule Engine → Report Print → UI** 순으로 실패 확률을 줄인다.

## H0. 리포지토리/기술 스택(초기 고정)
- FE: Next.js(React)
- BE: FastAPI(Python)
- DB: PostgreSQL(+ JSONB)
- PDF: Playwright 또는 Puppeteer

## H1. Sprint 0 — 환경/골격
- [완료조건] 로컬에서 FE/BE 동시 구동 + 환경변수 템플릿
- [검증] smoke test

## H2. Sprint 1 — Calculation Engine(MVP)
- 만세력/절기/시간대/진태양시 기본
- DST/표준시 예외 구간 테이블 적용
- [완료조건] 골든 샘플 1,000건 1차 일치

## H3. Sprint 2 — Rule Engine + Excel 스키마 연동
- RULE_SCHEMA.xlsx 로딩
- Condition Script 실행(샌드박스)
- Conflict(Topic) 해결 + Weight 우선
- [완료조건] 샘플 원국 입력 시 Reason Card 30~80개 생성

## H4. Sprint 3 — Report 32p Print Template(333 style)
- 333 룩앤필 완전 적용
- print css/페이지 나눔/헤더/푸터/목차
- [완료조건] 더미 데이터로 32p 안정 생성

## H5. Sprint 4 — LLM Rewriter
- Negative Constraints 시스템 프롬프트
- Reason Card → 섹션별 상담형 본문 생성
- [완료조건] “근거 외 창작 없음” 테스트 통과

## H6. Sprint 5 — App UI(Intro/Home/Input/Processing/Report)
- 333 스타일 + Genesis 토큰
- Processing Trivia 롤링
- Kakao Share

## H7. Sprint 6 — Admin + Rule Simulator
- 룰 배포 전 Preview
- 배포 버전 관리

## H8. Sprint 7 — E2E + 배포
- PDF 폰트 포함 배포 스크립트
- 모니터링/로그

---

# PART I. 오류/수정 대응 시나리오(v1)

## I1. Calculation 오차 발생
- 증상: 특정 구간(1954~1961) 오차
- 진단: tz 테이블/윤달/절기 계산 단계 분리 로그
- 대응: 해당 구간 샘플 증분 추가(샘플 50건) + 회귀 테스트

## I2. Condition Script 실행 에러
- 증상: 룰 평가 중 예외
- 진단: VAR_DICT 미등록/타입 불일치
- 대응: 룰 로더에서 정적 검사(변수명/허용 연산) → 배포 차단

## I3. Conflict 처리 오류
- 증상: 같은 Topic에서 모순 문장 다수 노출
- 진단: Conflict_Key가 결과 기반으로 설계됨
- 대응: Topic 강제 정규화 + Weight 우선 1개 선택 테스트 추가

## I4. PDF 한글 깨짐
- 증상: 인쇄/PDF에서 글자 사각형
- 진단: 런타임 폰트 미설치
- 대응: 배포 스크립트에 폰트 설치 + pdf smoke test 파이프라인

## I5. LLM 할루시네이션
- 증상: 근거에 없는 주장
- 진단: 프롬프트에 “창작 금지” 약함 / 컨텍스트 혼합
- 대응: Negative Constraints 강화 + 출력 검증(근거 키워드 포함 여부)

---

# PART J. Anti-Gravity 개발 시작 프롬프트(초원자 단위)

> 아래 프롬프트는 **Anti-Gravity에 그대로 붙여넣는 용도**입니다.

## J0. 공통 Constraints(모든 작업에 적용)
- 디자인: **333.html 룩앤필 100%**
- 토큰: `--bg,--card,--ink,--muted,--accent,--line`만 사용
- 폰트: Noto Serif KR 900 / Noto Sans KR 300~500
- 모바일 반응형 필수
- #000/#fff 직접 사용 금지

---

## J1. ATOMIC-001: 프로젝트 골격 생성
**Role**: Senior Full-stack Engineer

**Context**: Fate Forensics. Next.js + FastAPI. 333.html 스타일.

**Task**:
1) FE(Next.js) / BE(FastAPI) 기본 골격 생성
2) `/intro`, `/`, `/input`, `/processing`, `/report/[id]`, `/admin` 라우트 생성(더미)
3) 공통 CSS variables + Google Fonts 로딩(Serif 900 포함)

**Constraints**:
- 스타일은 333.html 그대로 재현(배경/여백/타입 대비)
- 모바일 768px 기준 반응형

**Output**:
- 파일 트리
- 각 파일의 완성 코드
- 실행 명령
- smoke test 체크리스트

---

## J2. ATOMIC-002: Genesis Style 디자인 토큰/컴포넌트 구현
(… 동일 형식으로 ATOMIC-00N까지 이어서 작성 예정)

> 다음 단계부터는 오너 지시(‘진행’) 후 세부 ATOMIC 프롬프트를 순차 적용한다.


```

---

## File: firebase.json

```json
{
    "firestore": {
        "rules": "firestore.rules",
        "indexes": "firestore.indexes.json"
    },
    "functions": [
        {
            "source": "functions",
            "codebase": "default",
            "ignore": [
                "node_modules",
                ".git",
                "firebase-debug.log",
                "firebase-adminsdk-*.json"
            ]
        }
    ],
    "hosting": {
        "public": "dist",
        "ignore": [
            "firebase.json",
            "**/.*",
            "**/node_modules/**"
        ],
        "rewrites": [
            {
                "source": "**",
                "destination": "/index.html"
            }
        ]
    },
    "emulators": {
        "auth": {
            "port": 9099
        },
        "functions": {
            "port": 5001
        },
        "firestore": {
            "port": 8080
        },
        "hosting": {
            "port": 5000
        },
        "ui": {
            "enabled": true
        },
        "singleProjectMode": true
    }
}
```

---

## File: firestore.indexes.json

```json
{
    "indexes": [],
    "fieldOverrides": []
}
```

---

## File: firestore.rules

```rules
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    // Option B: Strict Security Policy [S1]
    // Reports can only be 'get' by individual ID, but never 'list' or 'write' by client SDK.
    match /reports/{reportId} {
      allow get: if true;         // Allow direct individual lookup
      allow list: if false;       // Deny collection queries (list/query) to prevent mass data scraping
      allow write: if false;      // Deny all client-side writes
    }

    // Default deny for all other collections
    match /{document=**} {
      allow read, write: if false;
    }
  }
}

```

---

## File: functions/package.json

```json
{
    "name": "functions",
    "description": "Cloud Functions for Firebase",
    "scripts": {
        "lint": "eslint .",
        "build": "tsc",
        "build:watch": "tsc --watch",
        "serve": "npm run build && firebase emulators:start --only functions",
        "shell": "npm run build && firebase functions:shell",
        "start": "npm run shell",
        "deploy": "firebase deploy --only functions",
        "logs": "firebase functions:log"
    },
    "engines": {
        "node": "20"
    },
    "main": "lib/index.js",
    "dependencies": {
        "firebase-admin": "^12.7.0",
        "firebase-functions": "^6.6.0",
        "kor-lunar": "^1.4.0"
    },
    "devDependencies": {
        "typescript": "^5.1.6"
    },
    "private": true
}

```

---

## File: functions/src/engine/calculation/index.ts

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

## File: functions/src/engine/calculation/v1.ts

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

function toHanjaGanji(labelHangul: string): Pillar {
    if (!labelHangul || labelHangul.length < 2) {
        return { stem: "?", branch: "?", label: "UNKNOWN" };
    }
    const s = labelHangul[0];
    const b = labelHangul[1];
    const si = STEMS_H.indexOf(s);
    const bi = BRANCHES_H.indexOf(b);

    if (si < 0 || bi < 0) {
        return { stem: "?", branch: "?", label: "UNKNOWN" };
    }

    return {
        stem: STEMS[si],
        branch: BRANCHES[bi],
        label: `${STEMS[si]}${BRANCHES[bi]}`
    };
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

    // [Safety Net] Strict Year Range Check
    if (year < 1890 || year > 2050) {
        throw new Error("Year out of supported range [1890-2050]");
    }

    // 1. [L=1] Lunar/Solar Normalization
    let solarYMD: { year: number; month: number; day: number };

    if (input.calendar === 'lunar') {
        const converted = toSolar(year, month, day, input.isLeapMonth || false);
        solarYMD = { year: converted.year, month: converted.month, day: converted.day };
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
    const finalLunarData = toLunar(effectiveDate.getUTCFullYear(), effectiveDate.getUTCMonth() + 1, effectiveDate.getUTCDate());

    // [L=1+] Year/Day Pillars
    const yearPillar = toHanjaGanji(finalLunarData.secha);
    const dayPillar = toHanjaGanji(finalLunarData.iljin);

    // [L=1+] Month Pillar with Wolgeon Safety
    let monthPillar: Pillar;
    if (finalLunarData.wolgeon) {
        monthPillar = toHanjaGanji(finalLunarData.wolgeon);
    } else {
        monthPillar = { stem: "?", branch: "?", label: "UNKNOWN" };
        warnings.push("윤달 월건 미제공(라이브러리 사계) → 절기 기반 월주 산출(Phase 3-C-02)로 보완 예정");
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
        algorithmVersion: "Genesis-V1.2-Hardened",
        schemaVersion: "report/v1",
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

## File: functions/src/index.ts

```ts
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

logger.info(`[System] App Check Enforced: ${ENFORCE_APP_CHECK} (Emulator: ${process.env.FUNCTIONS_EMULATOR})`);

/**
 * generateReport (Callable Function v2)
 * Phase 3-C: Real Calculation & Rich Section Generation (Hardened)
 * v3.2.1-H: Zero Tolerance Production Patch
 */
exports.generateReport = onCall({
    enforceAppCheck: ENFORCE_APP_CHECK
}, async (request: any) => {
    const rawData = request.data;

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
        isLeapMonth: !!rawData.isLeapMonth, // Always normalized to boolean
        timezone: "Asia/Seoul"
    };

    try {
        // 2. 실계산 실행 (Hardened Engine v1.2)
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

        // 4. 리포트 데이터 영구 보관 (D3)
        const reportData = {
            createdAt: admin.firestore.Timestamp.now(),
            version: "v3.2.1-H",
            schemaVersion: "report/v1",
            algorithmVersion: calculation.algorithmVersion,
            input: input,
            calculation: calculation,
            reportMeta: {
                title: "GENESIS ANALYSIS v1.2",
                summary: "포렌식 시간 보정 및 정규화 간지 기반의 정밀 패턴 분석 결과입니다.",
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

```

---

## File: functions/tsconfig.json

```json
{
    "compilerOptions": {
        "module": "commonjs",
        "noImplicitReturns": true,
        "noUnusedLocals": true,
        "outDir": "lib",
        "sourceMap": true,
        "strict": true,
        "target": "es2020",
        "skipLibCheck": true,
        "esModuleInterop": true,
        "allowSyntheticDefaultImports": true,
        "lib": [
            "es2020"
        ]
    },
    "compileOnSave": true,
    "include": [
        "src"
    ]
}
```

---

## File: index.html

```html
<!doctype html>
<html lang="ko">

<head>
  <meta charset="UTF-8" />
  <link rel="icon" type="image/svg+xml" href="/vite.svg" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <!-- SEO & Metadata [Strategist Protocol] -->
  <title>MYUNGRI: The Genesis</title>
  <meta name="description" content="데이터 기반의 현대적 명리 전략 분석 솔루션" />

  <!-- OpenGraph / Facebook -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://myungri-genesis.web.app/" />
  <meta property="og:title" content="MYUNGRI: The Genesis" />
  <meta property="og:description" content="통계적 패턴 분석을 통한 현대적 명리 전략 제안" />
  <meta property="og:image" content="https://myungri-genesis.web.app/og-placeholder.png" />

  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content="https://myungri-genesis.web.app/" />
  <meta property="twitter:title" content="MYUNGRI: The Genesis" />
  <meta property="twitter:description" content="통계적 패턴 분석을 통한 현대적 명리 전략 제안" />
  <meta property="twitter:image" content="https://myungri-genesis.web.app/og-placeholder.png" />

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link
    href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&family=Noto+Serif+KR:wght@300;400;500;700;900&family=Inter:wght@300;400;500;700&display=swap"
    rel="stylesheet">

  <!-- Kakao SDK [Fixed Load Option A] -->
  <script src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js"
    integrity="sha384-S4VR7PzRyM4yD5bWjUrMvBgr0zkY73Xv9C/p7nP+Q5R1e/P1zCym9F7/u6fMzk/+" crossorigin="anonymous"
    defer></script>
</head>

<body>
  <div id="root"></div>
  <script type="module" src="/src/main.tsx"></script>
</body>

</html>
```

---

## File: package.json

```json
{
  "name": "myungri-the-genesis",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
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

## File: README.md

```md
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

```

---

## File: scripts/generate-code-docs.cjs

```cjs
const fs = require('fs');
const path = require('path');

// --- Configuration ---
const PROJECT_ROOT = path.resolve(__dirname, '..'); // 스크립트가 scripts 폴더에 있다고 가정
const OUTPUT_DIR = path.join(PROJECT_ROOT, 'project_docs');
const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1MB per markdown file (approx characters)

// Directories to exclude
const IGNORE_DIRS = [
    'node_modules',
    '.git',
    '.firebase',
    '.github',
    '.gemini',
    'dist',
    'build',
    'coverage',
    'lib', // functions/lib 등 컴파일된 결과물
    'project_docs' // 자기 자신 출력 폴더 제외
];

// Files to include (Allowlist extensions)
const ALLOW_EXTENSIONS = [
    '.ts', '.tsx',
    '.js', '.cjs', '.mjs',
    '.css', '.scss',
    '.html',
    '.json',
    '.md',
    '.rules', // firestore.rules
    '.yaml', '.yml'
];

// Files to explicitly ignore
const IGNORE_FILES = [
    'package-lock.json',
    'yarn.lock',
    '.DS_Store'
];

// --- Helper Functions ---

function ensureDir(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

function getFileList(dir, fileList = []) {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            if (!IGNORE_DIRS.includes(file)) {
                getFileList(filePath, fileList);
            }
        } else {
            const ext = path.extname(file).toLowerCase();
            if (ALLOW_EXTENSIONS.includes(ext) && !IGNORE_FILES.includes(file)) {
                fileList.push(filePath);
            }
        }
    });

    return fileList;
}

function generateMarkdown() {
    console.log(`🔍 Scanning directory: ${PROJECT_ROOT}`);
    const allFiles = getFileList(PROJECT_ROOT);
    console.log(`✨ Found ${allFiles.length} files to process.`);

    ensureDir(OUTPUT_DIR);

    let partCount = 1;
    let currentContent = `# Project Code Documentation - Part ${partCount}\n\n`;
    let currentSize = 0;

    for (const filePath of allFiles) {
        const relativePath = path.relative(PROJECT_ROOT, filePath).replace(/\\/g, '/');

        // Skip files in hidden directories checking relative path segments
        const parts = relativePath.split('/');
        if (parts.some(p => p.startsWith('.') && p !== '.' && p !== '..') && !relativePath.includes('.env')) {
            // .env 등은 포함하고 싶을 수 있으나 보통 .git, .firebase 등은 위에서 걸러짐.
            // 위 IGNORE_DIRS에서 이미 1차 필터링 됨. 추가 필터링 필요 시 여기서.
        }

        try {
            const fileContent = fs.readFileSync(filePath, 'utf8');
            const ext = path.extname(filePath).substring(1);

            // Markdown code block formatting
            const codeBlock = `\n## File: ${relativePath}\n\n\`\`\`${ext}\n${fileContent}\n\`\`\`\n\n---\n`;

            if (currentSize + codeBlock.length > MAX_FILE_SIZE) {
                // Save current file
                const outPath = path.join(OUTPUT_DIR, `code_part_${String(partCount).padStart(3, '0')}.md`);
                fs.writeFileSync(outPath, currentContent, 'utf8');
                console.log(`📦 Created: ${path.relative(PROJECT_ROOT, outPath)} (${(currentSize / 1024).toFixed(1)} KB)`);

                // Reset for next file
                partCount++;
                currentContent = `# Project Code Documentation - Part ${partCount}\n\n` + codeBlock;
                currentSize = codeBlock.length;
            } else {
                currentContent += codeBlock;
                currentSize += codeBlock.length;
            }
        } catch (err) {
            console.error(`❌ Error reading file ${relativePath}:`, err.message);
        }
    }

    // Save remaining content
    if (currentSize > 0) {
        const outPath = path.join(OUTPUT_DIR, `code_part_${String(partCount).padStart(3, '0')}.md`);
        fs.writeFileSync(outPath, currentContent, 'utf8');
        console.log(`📦 Created: ${path.relative(PROJECT_ROOT, outPath)} (${(currentSize / 1024).toFixed(1)} KB)`);
    }

    console.log(`\n✅ Documentation generation complete! Check '${OUTPUT_DIR}' directory.`);
}

// --- Execute ---
generateMarkdown();

```

---

## File: scripts/test-generateReport.ts

```ts
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
    apiKey: "AIzaSyALJ16scYoDyo1bi8_62yQVZ1LzrVxY72c",
    projectId: "myungri-genesis",
};

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

## File: src/App.css

```css
/* App.css cleared for Genesis brand system */
```

---

## File: src/App.module.css

```css
.introContainer {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 3rem;
    padding: 2rem;
    text-align: center;
}

.heroBrand {
    font-size: clamp(3rem, 10vw, 6rem);
    transition: transform 0.8s ease-out;
}

.enterBtn {
    padding: 1.2rem 3rem;
    background-color: var(--ink);
    color: var(--card);
    border: none;
    border-radius: 4px;
    font-family: var(--font-sans);
    font-weight: 700;
    font-size: 1.1rem;
    cursor: pointer;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    letter-spacing: 0.05em;
}

.enterBtn:hover {
    transform: translateY(-2px);
    /* Token-only hover shadow using color-mix */
    box-shadow: 0 10px 20px -10px color-mix(in srgb, var(--ink) 30%, transparent);
}
```

---

## File: src/App.tsx

```tsx
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { PaperBackground } from './components/layout/PaperBackground';
import { Header } from './components/layout/Header';
import { BrandLockup } from './components/common/BrandLockup';
import { Home } from './pages/Home';
import { Start } from './pages/Start';
import { Processing } from './pages/Processing';
import { Report } from './pages/Report';
import styles from './App.module.css';

function App() {
  const [showHome, setShowHome] = useState(false);

  return (
    <PaperBackground>
      <Routes>
        <Route path="/" element={
          !showHome ? (
            <main className={styles.introContainer}>
              <BrandLockup
                display="kr_lockup"
                variant="accent"
                as="h1"
                className={styles.heroBrand}
              />
              <button
                className={styles.enterBtn}
                onClick={() => setShowHome(true)}
              >
                시작하기 →
              </button>
            </main>
          ) : (
            <>
              <Header lockupDisplay="kr_lockup" />
              <Home />
            </>
          )
        } />
        <Route path="/start" element={<Start />} />
        <Route path="/processing" element={<Processing />} />
        <Route path="/report" element={<Report />} />
        <Route path="/report/:reportId" element={<Report />} />
      </Routes>
    </PaperBackground>
  );
}

export default App;

```

---

## File: src/components/common/BrandLockup.tsx

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

## File: src/components/layout/Container.module.css

```css
.container {
    width: 100%;
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
    padding-left: 24px;
    padding-right: 24px;
}

@media (max-width: 768px) {
    .container {
        padding-left: 20px;
        padding-right: 20px;
    }
}
```

---

## File: src/components/layout/Container.tsx

```tsx
import React from 'react';
import styles from './Container.module.css';

interface ContainerProps {
    children: React.ReactNode;
    className?: string;
    as?: React.ElementType;
}

export const Container: React.FC<ContainerProps> = ({
    children,
    className = '',
    as: Component = 'div'
}) => {
    return (
        <Component className={`${styles.container} ${className}`.trim()}>
            {children}
        </Component>
    );
};

```

---

## File: src/components/layout/Header.module.css

```css
.header {
    position: sticky;
    top: 0;
    z-index: 100;
    background-color: var(--card);
    border-bottom: 1px solid var(--line);
    padding: 1rem 0;
}

.headerContainer {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.brandLink {
    text-decoration: none;
    color: inherit;
    display: block;
}

.brand {
    font-size: 1.15rem;
}

.desktopNav {
    display: flex;
    align-items: center;
    gap: 2rem;
}

.navLink {
    font-family: var(--font-sans);
    font-weight: 500;
    color: var(--muted);
    text-decoration: none;
    font-size: 0.9rem;
    transition: color 0.2s;
}

.navLink:hover {
    color: var(--ink);
}

.ctaButton {
    background-color: var(--ink);
    color: var(--card);
    border: none;
    padding: 0.6rem 1.5rem;
    font-family: var(--font-sans);
    font-weight: 500;
    font-size: 0.85rem;
    cursor: pointer;
    transition: opacity 0.2s;
}

.ctaButton:hover {
    opacity: 0.9;
}

.mobileMenuBtn {
    display: none;
    background: none;
    border: none;
    padding: 10px;
    cursor: pointer;
}

.hamburger {
    width: 24px;
    height: 2px;
    background-color: var(--ink);
    position: relative;
    transition: background-color 0.2s;
}

.hamburger::before,
.hamburger::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 2px;
    background-color: var(--ink);
    left: 0;
    transition: transform 0.3s, top 0.3s;
}

.hamburger::before {
    top: -6px;
}

.hamburger::after {
    top: 6px;
}

.isOpen {
    background-color: transparent;
}

.isOpen::before {
    top: 0;
    transform: rotate(45deg);
}

.isOpen::after {
    top: 0;
    transform: rotate(-45deg);
}

.mobileMenu {
    position: fixed;
    top: 65px;
    left: 0;
    width: 100%;
    height: 0;
    background-color: var(--card);
    overflow: hidden;
    transition: height 0.3s ease;
    border-bottom: 1px solid var(--line);
}

.mobileMenuVisible {
    height: calc(100vh - 65px);
}

.mobileNav {
    display: flex;
    flex-direction: column;
    padding: 2rem;
    gap: 1.5rem;
}

.mobileNavLink {
    font-family: var(--font-sans);
    font-size: 1.25rem;
    font-weight: 500;
    color: var(--ink);
    text-decoration: none;
}

.mobileCtaButton {
    margin-top: 1rem;
    background-color: var(--ink);
    color: var(--card);
    border: none;
    padding: 1rem;
    font-family: var(--font-sans);
    font-weight: 700;
    font-size: 1rem;
    cursor: pointer;
}

@media (max-width: 768px) {
    .desktopNav {
        display: none;
    }

    .mobileMenuBtn {
        display: block;
    }
}
```

---

## File: src/components/layout/Header.tsx

```tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BrandLockup } from '../common/BrandLockup';
import { Container } from './Container';
import styles from './Header.module.css';

interface HeaderProps {
    lockupDisplay?: 'kr_lockup' | 'en_name';
}

export const Header: React.FC<HeaderProps> = ({ lockupDisplay = 'kr_lockup' }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <header className={styles.header}>
            <Container className={styles.headerContainer}>
                <Link to="/" className={styles.brandLink}>
                    <BrandLockup display={lockupDisplay} variant="default" as="div" className={styles.brand} />
                </Link>

                <nav className={styles.desktopNav}>
                    <Link to="/" className={styles.navLink}>Home</Link>
                    <Link to="/about" className={styles.navLink}>Principles</Link>
                    <Link to="/start" className={styles.ctaButton}>분석하기</Link>
                </nav>

                <button className={styles.mobileMenuBtn} onClick={toggleMenu} aria-label="Toggle Menu">
                    <div className={`${styles.hamburger} ${isMenuOpen ? styles.isOpen : ''}`} />
                </button>
            </Container>

            <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.mobileMenuVisible : ''}`}>
                <nav className={styles.mobileNav}>
                    <Link to="/" className={styles.mobileNavLink} onClick={toggleMenu}>Home</Link>
                    <Link to="/about" className={styles.mobileNavLink} onClick={toggleMenu}>Principles</Link>
                    <Link to="/start" className={styles.mobileCtaButton} onClick={toggleMenu}>분석하기</Link>
                </nav>
            </div>
        </header>
    );
};

```

---

## File: src/components/layout/PaperBackground.module.css

```css
.paperWrapper {
    position: relative;
    min-height: 100vh;
    background-color: var(--bg);
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
}

.noiseOverlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
    opacity: 0.3;
    mix-blend-mode: multiply;
    /* CSS-based noise texture fallback */
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
}

.content {
    position: relative;
    z-index: 2;
    flex: 1;
    display: flex;
    flex-direction: column;
}
```

---

## File: src/components/layout/PaperBackground.tsx

```tsx
import React from 'react';
import styles from './PaperBackground.module.css';

interface PaperBackgroundProps {
    children: React.ReactNode;
    className?: string;
}

export const PaperBackground: React.FC<PaperBackgroundProps> = ({
    children,
    className = ''
}) => {
    return (
        <div className={`${styles.paperWrapper} ${className}`.trim()}>
            <div className={styles.noiseOverlay} />
            <div className={styles.content}>
                {children}
            </div>
        </div>
    );
};

```

---

## File: src/components/share/ShareActions.module.css

```css
.shareContainer {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
    position: relative;
    margin-bottom: 1.5rem;
}

.buttonGroup {
    display: flex;
    gap: 0.5rem;
}

.shareBtn {
    padding: 0.5rem 1rem;
    font-family: var(--font-sans);
    font-size: 0.85rem;
    font-weight: 500;
    color: var(--ink);
    background-color: var(--card);
    border: 1px solid var(--line);
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s ease;
}

.shareBtn:hover:not(:disabled) {
    background-color: color-mix(in srgb, var(--bg) 30%, transparent);
}

.shareBtn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
}

.kakaoBtn {
    background-color: #FEE500;
    /* Kakao Official Yellow - Branding is allowed here */
    border-color: #FEE500;
    color: #191919;
}

.kakaoBtn:hover:not(:disabled) {
    background-color: #FADA0A;
    border-color: #FADA0A;
}

.toast {
    position: absolute;
    top: 100%;
    left: 0;
    margin-top: 0.5rem;
    padding: 0.4rem 0.8rem;
    background-color: var(--ink);
    color: var(--card);
    font-size: 0.75rem;
    border-radius: 4px;
    z-index: 20;
    animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(-5px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@media (prefers-reduced-motion: reduce) {

    .shareBtn,
    .toast {
        transition: none;
        animation: none;
    }
}

/* Hide in print */
@media print {
    .shareContainer {
        display: none !important;
    }
}
```

---

## File: src/components/share/ShareActions.tsx

```tsx
import React, { useState } from 'react';
import { SHARE_META, getShareUrl } from '../../config/shareMeta';
import { shareToKakao, isKakaoAvailable } from '../../lib/kakao';
import styles from './ShareActions.module.css';

interface ShareActionsProps {
    title?: string;
    text?: string;
    url?: string;
}

export const ShareActions: React.FC<ShareActionsProps> = ({
    title = SHARE_META.TITLE,
    text = SHARE_META.DESCRIPTION,
    url = getShareUrl()
}) => {
    const [copyStatus, setCopyStatus] = useState<string | null>(null);

    const handleWebShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({ title, text, url });
            } catch (err) {
                if ((err as Error).name !== 'AbortError') {
                    handleCopyLink();
                }
            }
        } else {
            handleCopyLink();
        }
    };

    const handleKakaoShare = () => {
        shareToKakao({
            title,
            description: text,
            imageUrl: SHARE_META.IMAGE_URL,
            url
        });
    };

    const handleCopyLink = async () => {
        try {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(url);
                showToast('Link Copied');
            } else {
                // Fallback for non-supported clipboard
                const textArea = document.createElement("textarea");
                textArea.value = url;
                document.body.appendChild(textArea);
                textArea.select();
                try {
                    document.execCommand('copy');
                    showToast('Link Copied');
                } catch (err) {
                    console.error('Fallback copy failed', err);
                }
                document.body.removeChild(textArea);
            }
        } catch (err) {
            console.error('Copy failed', err);
        }
    };

    const showToast = (msg: string) => {
        setCopyStatus(msg);
        setTimeout(() => setCopyStatus(null), 2000);
    };

    return (
        <div className={styles.shareContainer}>
            <div className={styles.buttonGroup}>
                {!!navigator.share ? (
                    <button
                        className={styles.shareBtn}
                        onClick={handleWebShare}
                        aria-label="Share via native device"
                    >
                        Share
                    </button>
                ) : (
                    <button
                        className={styles.shareBtn}
                        onClick={handleCopyLink}
                        aria-label="Copy link to clipboard"
                    >
                        Copy Link
                    </button>
                )}

                <button
                    className={`${styles.shareBtn} ${styles.kakaoBtn}`}
                    onClick={handleKakaoShare}
                    disabled={!isKakaoAvailable()}
                    aria-label="Share via KakaoTalk"
                >
                    Kakao
                </button>
            </div>

            {copyStatus && (
                <div className={styles.toast} role="status">
                    {copyStatus}
                </div>
            )}
        </div>
    );
};

```

---

## File: src/components/ui/AdviceBox.module.css

```css
.adviceBox {
    /* Token-only accent background using color-mix instead of hardcoded rgba */
    background-color: color-mix(in srgb, var(--accent) 2%, transparent);
    border: 1px solid var(--accent);
    padding: 24px;
    position: relative;
    margin: 2rem 0;
    border-radius: 2px;
}

.badge {
    position: absolute;
    top: -12px;
    left: 20px;
    background-color: var(--accent);
    color: var(--card);
    padding: 4px 12px;
    font-size: 0.75rem;
    font-weight: 700;
    font-family: var(--font-sans);
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.content {
    font-family: var(--font-sans);
    font-size: 1rem;
    color: var(--ink);
    line-height: 1.7;
}
```

---

## File: src/components/ui/AdviceBox.tsx

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

## File: src/components/ui/Card.module.css

```css
.card {
    background-color: var(--card);
    padding: 32px;
    border-radius: 2px;
    /* Token-only shadow using color-mix instead of hardcoded rgba */
    box-shadow: 0 20px 50px -12px color-mix(in srgb, var(--ink) 5%, transparent);
    position: relative;
    border: 1px solid var(--line);
}

.accentBar::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background-color: var(--accent);
}

@media (max-width: 768px) {
    .card {
        padding: 24px;
    }
}
```

---

## File: src/components/ui/Card.tsx

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

## File: src/components/ui/ContextBox.module.css

```css
.contextBox {
    /* Token-only background using color-mix instead of hardcoded rgba */
    background-color: color-mix(in srgb, var(--bg) 30%, transparent);
    border-left: 4px solid var(--muted);
    padding: 16px 20px;
    margin: 1.5rem 0;
}

.label {
    font-family: var(--font-sans);
    font-weight: 700;
    font-size: 0.85rem;
    color: var(--muted);
    margin-bottom: 8px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.content {
    font-family: var(--font-sans);
    font-size: 0.95rem;
    line-height: 1.6;
    color: var(--ink);
}
```

---

## File: src/components/ui/ContextBox.tsx

```tsx
import React from 'react';
import styles from './ContextBox.module.css';

interface ContextBoxProps {
    children: React.ReactNode;
    className?: string;
    title?: string;
}

export const ContextBox: React.FC<ContextBoxProps> = ({
    children,
    className = '',
    title = '해석/설명'
}) => {
    return (
        <div className={`${styles.contextBox} ${className}`.trim()}>
            <div className={styles.label}>{title}</div>
            <div className={styles.content}>
                {children}
            </div>
        </div>
    );
};

```

---

## File: src/config/brand.ts

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

## File: src/config/reportTemplate.ts

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

## File: src/config/shareMeta.ts

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

## File: src/config/tokens.ts

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

## File: src/config/trivia.ts

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

## File: src/index.css

```css
:root {
  --bg: #EBE7E0;
  --card: #FDFCF8;
  --ink: #1C1C1C;
  --muted: #5A5A5A;
  --accent: #D9381E;
  --line: color-mix(in srgb, var(--ink) 12%, transparent);

  --font-serif: "Noto Serif KR", serif;
  --font-sans: "Noto Sans KR", "Inter", system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
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
  line-height: 1.75;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
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

## File: src/main.tsx

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import './lib/firebase'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)

```

---

## File: src/pages/Home.module.css

```css
.home {
    padding-bottom: 5rem;
}

.hero {
    padding: 6rem 0;
    min-height: 80vh;
    display: flex;
    align-items: center;
}

.heroGrid {
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    gap: 4rem;
    align-items: center;
}

.heroTitle {
    font-size: clamp(2.5rem, 6vw, 4.5rem);
    margin-bottom: 2rem;
    letter-spacing: -0.02em;
}

.heroSubtitle {
    font-family: var(--font-sans);
    font-size: 1.25rem;
    color: var(--muted);
    line-height: 1.6;
    margin-bottom: 3rem;
    max-width: 600px;
}

.ctaGroup {
    display: flex;
    gap: 1rem;
}

.primaryBtn {
    background-color: var(--ink);
    color: var(--card);
    border: none;
    padding: 1.2rem 2.5rem;
    font-family: var(--font-sans);
    font-weight: 700;
    font-size: 1.1rem;
    cursor: pointer;
    border-radius: 4px;
    text-decoration: none;
    display: inline-block;
}

.secondaryBtn {
    background-color: transparent;
    color: var(--ink);
    border: 1px solid var(--ink);
    padding: 1.2rem 2.5rem;
    font-family: var(--font-sans);
    font-weight: 700;
    font-size: 1.1rem;
    cursor: pointer;
    border-radius: 4px;
}

.heroVisual {
    position: relative;
}

.kanjiWatermark {
    position: absolute;
    top: -50px;
    right: -20px;
    font-family: var(--font-serif);
    font-size: 25rem;
    font-weight: 900;
    color: var(--ink);
    opacity: 0.05;
    pointer-events: none;
    z-index: -1;
    line-height: 1;
}

.principleCard {
    z-index: 10;
}

.cardTitle {
    font-size: 1.25rem;
    margin-bottom: 1.5rem;
}

.principleList {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.principleList li {
    font-family: var(--font-sans);
    color: var(--muted);
    font-size: 0.95rem;
    padding-left: 1.5rem;
    position: relative;
}

.principleList li::before {
    content: '·';
    position: absolute;
    left: 0;
    color: var(--accent);
    font-weight: 900;
    font-size: 1.5rem;
    line-height: 0.8;
}

/* Features */
.features {
    padding: 4rem 0;
}

.sectionHeader {
    margin-bottom: 3rem;
    border-bottom: 1px solid var(--line);
    padding-bottom: 1rem;
}

.sectionTitle {
    font-size: 2rem;
}

.featureGrid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
}

.featureCard h4 {
    margin-bottom: 1.5rem;
    font-size: 1.2rem;
}

@media (max-width: 1024px) {
    .heroGrid {
        grid-template-columns: 1fr;
        gap: 3rem;
    }

    .kanjiWatermark {
        font-size: 15rem;
        top: -30px;
    }
}

@media (max-width: 768px) {
    .hero {
        padding: 4rem 0;
    }

    .heroTitle {
        font-size: 2.25rem;
    }

    .ctaGroup {
        flex-direction: column;
    }

    .featureGrid {
        grid-template-columns: 1fr;
    }
}
```

---

## File: src/pages/Home.tsx

```tsx
import React from 'react';
import { Container } from '../components/layout/Container';
import { Card } from '../components/ui/Card';
import { ContextBox } from '../components/ui/ContextBox';
import { AdviceBox } from '../components/ui/AdviceBox';
import { BrandLockup } from '../components/common/BrandLockup';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';

export const Home: React.FC = () => {
    return (
        <div className={styles.home}>
            {/* Hero Section */}
            <section className={styles.hero}>
                <Container className={styles.heroGrid}>
                    <div className={styles.heroContent}>
                        <BrandLockup display="kr_lockup" variant="accent" as="h1" className={styles.heroTitle} />
                        <p className={styles.heroSubtitle}>
                            현대적 유산과 초원자 단위 데이터 분석의 만남.<br />
                            명리: 제네시스를 통해 당신의 내일과 소통하십시오.
                        </p>
                        <div className={styles.ctaGroup}>
                            <Link to="/start" className={styles.primaryBtn}>내 사주 분석하기 →</Link>
                            <button className={styles.secondaryBtn}>샘플 리포트</button>
                        </div>
                    </div>

                    <div className={styles.heroVisual}>
                        <div className={styles.kanjiWatermark}>命</div>
                        <Card className={styles.principleCard} hasAccentBar>
                            <h3 className={styles.cardTitle}>서비스 원칙</h3>
                            <ul className={styles.principleList}>
                                <li>독자 개발된 만세력 정밀 알고리즘</li>
                                <li>Reason Card 기반 근거 중심 해석</li>
                                <li>AI는 문장 리라이팅에만 제한적으로 사용</li>
                            </ul>
                        </Card>
                    </div>
                </Container>
            </section>

            {/* Content Section Example */}
            <section className={styles.features}>
                <Container>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>초원자 단위 분석 리포트</h2>
                    </div>

                    <div className={styles.featureGrid}>
                        <Card className={styles.featureCard}>
                            <h4>32페이지 이상의 방대한 분석</h4>
                            <p>원전 근거와 현대적 해석을 담은 독보적인 권위의 리포트를 제공합니다.</p>
                            <ContextBox>
                                명리 분석 결과는 단순한 운세가 아닌, 과거의 지혜를 데이터로 재구성한 학술적 결과물입니다.
                            </ContextBox>
                        </Card>

                        <Card className={styles.featureCard}>
                            <h4>명확한 Action Plan</h4>
                            <p>분석 결과를 넘어 당신의 삶에 적용할 수 있는 구체적인 가이드를 제안합니다.</p>
                            <AdviceBox>
                                올해의 기운은 새로운 시작보다 내실을 다지는 것에 적합합니다. 학문적 성취나 전문성 강화에 시간을 투자하십시오.
                            </AdviceBox>
                        </Card>
                    </div>
                </Container>
            </section>
        </div>
    );
};

```

---

## File: src/pages/Processing.module.css

```css
.processingPage {
    min-height: 100vh;
    background-color: var(--bg);
}

.container {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 80vh;
}

.content {
    text-align: center;
    max-width: 600px;
    padding: 0 20px;
}

.spinner {
    width: 48px;
    height: 48px;
    margin: 0 auto 2.5rem;
    border: 3px solid var(--line);
    border-top-color: var(--accent);
    border-radius: 50%;
    animation: spin 1s infinite linear;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

.title {
    font-size: 1.85rem;
    margin-bottom: 2rem;
    color: var(--ink);
    letter-spacing: -0.01em;
}

.triviaWrapper {
    height: 4.5rem;
    /* Reserve space for 2 lines of text */
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 2.5rem;
}

.triviaText {
    font-family: var(--font-sans);
    font-size: 1.15rem;
    color: var(--muted);
    line-height: 1.6;
    animation: fadeIn 0.4s ease-out;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(5px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.progressIndicator {
    margin-bottom: 3rem;
}

.dots {
    display: inline-flex;
    gap: 8px;
}

.dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: var(--line);
    transition: background-color 0.3s ease;
}

.dotActive {
    background-color: var(--accent);
}

.subtext {
    font-family: var(--font-sans);
    font-size: 0.85rem;
    color: var(--muted);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    opacity: 0.6;
}

/* Accessibility: Strict prefers-reduced-motion enforcement */
@media (prefers-reduced-motion: reduce) {
    .spinner {
        animation: none;
        border-top-color: var(--line);
    }

    .triviaText {
        animation: none;
        transition: none;
    }

    .dot {
        transition: none;
        animation: none;
    }

    * {
        animation: none !important;
        transition: none !important;
    }
}

@media (max-width: 768px) {
    .title {
        font-size: 1.5rem;
    }

    .triviaText {
        font-size: 1rem;
    }
}
```

---

## File: src/pages/Processing.tsx

```tsx
import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { httpsCallable } from 'firebase/functions';
import { functions } from '../lib/firebase';
import { Container } from '../components/layout/Container';
import { Header } from '../components/layout/Header';
import { TRIVIA_LINES } from '../config/trivia';
import styles from './Processing.module.css';

/**
 * Processing Page
 * 1. 호출: generateReport Callable API 호출
 * 2. 대기: 최소 시각적 대기 시간을 확보하며 트리비아 롤링
 * 3. 이동: 생성된 reportId 경로로 이동
 */
export const Processing: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const formData = location.state;

    const [triviaIndex, setTriviaIndex] = useState(0);
    const [progressStep, setProgressStep] = useState(0);

    // [Hardening] 데이터 없이 직접 접근 시 즉시 차단
    useEffect(() => {
        if (!formData) {
            navigate('/start', { replace: true });
        }
    }, [formData, navigate]);

    // 최소 시각적 대기 시간 (3.5s ~ 5s 랜덤)
    const [visualDuration] = useState(() => Math.floor(Math.random() * 1500) + 3500);

    const nextTrivia = useCallback(() => {
        setTriviaIndex((prev) => (prev + 1) % TRIVIA_LINES.length);
    }, []);

    useEffect(() => {
        const interval = setInterval(nextTrivia, 1200);
        return () => clearInterval(interval);
    }, [nextTrivia]);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgressStep((prev) => (prev + 1) % 4);
        }, 500);
        return () => clearInterval(interval);
    }, []);

    // 서버 사이드 리포트 생성 및 이동
    useEffect(() => {
        let isMounted = true;

        const executeGeneration = async () => {
            const startTime = Date.now();

            try {
                // A. 서버 엔진 호출
                const generateReportFunc = httpsCallable(functions, 'generateReport');
                const result = await generateReportFunc(formData);
                const { reportId } = result.data as { reportId: string };

                // B. 최소 시각적 시간 보장
                const elapsedTime = Date.now() - startTime;
                const remainingTime = Math.max(0, visualDuration - elapsedTime);

                if (remainingTime > 0) {
                    await new Promise(resolve => setTimeout(resolve, remainingTime));
                }

                if (isMounted) {
                    navigate(`/report/${reportId}`, { replace: true });
                }
            } catch (error) {
                console.error("Analysis Failed:", error);
                if (isMounted) {
                    navigate('/start', { replace: true });
                }
            }
        };

        if (formData) {
            executeGeneration();
        }

        return () => { isMounted = false; };
    }, [formData, navigate, visualDuration]);

    return (
        <div className={styles.processingPage}>
            <Header lockupDisplay="en_name" />
            <Container className={styles.loadingContainer}>
                <div className={styles.visualizer}>
                    <div className={styles.orbit}>
                        <div className={`${styles.node} ${styles.n1}`}></div>
                        <div className={`${styles.node} ${styles.n2}`}></div>
                        <div className={`${styles.node} ${styles.n3}`}></div>
                    </div>
                </div>

                <div className={styles.messageBox}>
                    <p className={styles.triviaLine}>{TRIVIA_LINES[triviaIndex]}</p>
                    <div className={styles.progressBar}>
                        <span className={styles.progressState}>
                            분석 중{'.'.repeat(progressStep + 1)}
                        </span>
                    </div>
                </div>
            </Container>

            <footer className={styles.footer}>
                <Container>
                    <p className={styles.copyright}>&copy; 2025 MYUNGRI: The Genesis. All rights reserved.</p>
                </Container>
            </footer>
        </div>
    );
};

```

---

## File: src/pages/Report.module.css

```css
.reportPage {
    min-height: 100vh;
    background-color: var(--bg);
    overflow-x: hidden;
}

.mainLayout {
    display: grid;
    grid-template-columns: 280px 1fr;
    gap: 3rem;
    padding-top: 2rem;
    padding-bottom: 5rem;
    position: relative;
}

/* 사이드바 스타일 */
.sidebar {
    position: sticky;
    top: 6rem;
    height: calc(100vh - 8rem);
    background-color: var(--card);
    border: 1px solid var(--line);
    border-radius: 8px;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    z-index: 10;
}

.sidebarHeader {
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--line);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.sidebarHeader h3 {
    font-size: 1.1rem;
    color: var(--ink);
}

.closeBtn {
    display: none;
    background: none;
    border: none;
    font-size: 1.5rem;
    color: var(--muted);
    cursor: pointer;
}

.nav {
    overflow-y: auto;
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}

.navItem {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.6rem 0.8rem;
    background: transparent;
    border: none;
    border-radius: 4px;
    text-align: left;
    cursor: pointer;
    transition: background-color 0.2s;
    width: 100%;
}

.navItem:hover {
    background-color: color-mix(in srgb, var(--bg) 50%, transparent);
}

.pageNum {
    font-family: var(--font-sans);
    font-size: 0.75rem;
    color: var(--muted);
    font-weight: 700;
}

.pageTitle {
    font-family: var(--font-sans);
    font-size: 0.85rem;
    color: var(--ink);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

/* 리포트 콘텐츠 스타일 */
.reportContent {
    display: flex;
    flex-direction: column;
    gap: 4rem;
}

.noticeCard {
    padding: 1.5rem;
    background-color: color-mix(in srgb, var(--accent) 5%, transparent);
    border-left: 4px solid var(--accent);
    color: var(--ink);
    font-family: var(--font-sans);
    font-size: 0.95rem;
}

.pageSection {
    scroll-margin-top: var(--header-height, 6rem);
    display: flex;
    flex-direction: column;
    gap: 1rem;
    break-inside: avoid;
}

.pageHeader {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 0.5rem;
}

.categoryTag {
    font-family: var(--font-sans);
    font-size: 0.75rem;
    font-weight: 700;
    color: var(--muted);
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.pageIdentifier {
    font-family: var(--font-sans);
    font-size: 0.8rem;
    color: var(--muted);
}

.contentCard {
    padding: 4rem;
    min-height: 600px;
}

.sectionTitle {
    font-size: 2.25rem;
    margin-bottom: 2rem;
    line-height: 1.2;
}

.sectionContent {
    font-family: var(--font-serif);
    font-size: 1.25rem;
    color: var(--ink);
    line-height: 1.8;
}

.primitiveBox {
    margin-top: 3rem;
}

.formDataSummary {
    margin-top: 2rem;
    padding: 1.5rem;
    background-color: color-mix(in srgb, var(--bg) 20%, transparent);
    border-radius: 4px;
    font-family: var(--font-sans);
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

/* Phase 3-C: Real Calculation Visuals */
.pillarsGrid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1.5rem;
    margin-top: 3rem;
    max-width: 600px;
}

.pillarItem {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
}

.pillarLabel {
    font-size: 0.7rem;
    font-weight: 700;
    color: var(--muted);
    letter-spacing: 0.1em;
}

.pillarGanji {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1.5rem 1rem;
    background-color: var(--card);
    border: 1px solid var(--line);
    border-radius: 4px;
    width: 100%;
}

.pillarGanji .stem {
    font-family: var(--font-serif);
    font-size: 2rem;
    font-weight: 900;
    line-height: 1;
}

.pillarGanji .branch {
    font-family: var(--font-serif);
    font-size: 2rem;
    font-weight: 900;
    color: var(--muted);
    line-height: 1;
    margin-top: 0.25rem;
}

.forensicDetails {
    margin-top: 2rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    max-width: 400px;
    font-family: var(--font-sans);
}

.forensicRow {
    display: flex;
    justify-content: space-between;
    padding-bottom: 0.5rem;
    border-bottom: 1px solid var(--line);
    font-size: 0.9rem;
}

.forensicRow .highlight {
    font-weight: 700;
    color: var(--accent);
}

/* 모바일 전용 요소 */
.mobileNavTrigger {
    display: none;
    position: sticky;
    top: 5rem;
    z-index: 5;
    width: 100%;
    padding: 1rem;
    background-color: var(--card);
    border: 1px solid var(--line);
    border-radius: 4px;
    font-family: var(--font-sans);
    font-weight: 700;
    cursor: pointer;
    box-shadow: 0 4px 12px color-mix(in srgb, var(--ink) 5%, transparent);
}

/* 인쇄 스타일 */
@media print {
    .reportPage {
        background-color: var(--bg) !important;
    }

    .mainLayout {
        display: block !important;
        padding: 0 !important;
    }

    .sidebar,
    .mobileNavTrigger,
    .closeBtn,
    .noticeCard {
        display: none !important;
    }

    .reportContent {
        gap: 0 !important;
    }

    .pageSection {
        page-break-after: always !important;
        break-after: page !important;
        padding: 2cm !important;
    }

    .contentCard {
        border: none !important;
        box-shadow: none !important;
        padding: 0 !important;
        background: none !important;
    }

    .disclaimerSection {
        page-break-before: auto;
        border-top: 1px solid var(--line) !important;
        padding-top: 1cm !important;
    }
}

/* Disclaimer & Loading Styles */
.loadingState {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 50vh;
    color: var(--ink-dim);
    font-size: var(--font-sm);
}

.disclaimerSection {
    margin-top: calc(var(--space-xl) * 2);
    padding: var(--space-lg);
    border-top: 1px solid var(--line);
    color: var(--ink-dim);
    font-size: var(--font-xs);
    line-height: 1.6;
    text-align: center;
}

.disclaimerEn {
    margin-top: var(--space-xs);
    opacity: 0.7;
    font-style: italic;
}

/* 반응형 스타일 */
@media (max-width: 1024px) {
    .mainLayout {
        grid-template-columns: 1fr;
        gap: 2rem;
    }

    .sidebar {
        position: fixed;
        top: 0;
        left: -100%;
        width: 80%;
        height: 100vh;
        transition: left 0.3s ease;
        border-radius: 0;
        box-shadow: 20px 0 50px color-mix(in srgb, var(--ink) 30%, transparent);
    }

    .sidebarOpen {
        left: 0;
    }

    .closeBtn,
    .mobileNavTrigger {
        display: block;
    }

    .contentCard {
        padding: 2.5rem 1.5rem;
        min-height: auto;
    }

    .sectionTitle {
        font-size: 1.75rem;
    }

    .pillarsGrid {
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
    }
}

@media (prefers-reduced-motion: reduce) {
    .sidebar {
        transition: none;
    }

    .navItem {
        transition: none;
    }
}
```

---

## File: src/pages/Report.tsx

```tsx
/* eslint-disable @tanstack/query/no-window-matchmedia */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Container } from '../components/layout/Container';
import { Header } from '../components/layout/Header';
import { Card } from '../components/ui/Card';
import { ContextBox } from '../components/ui/ContextBox';
import { AdviceBox } from '../components/ui/AdviceBox';
import { REPORT_SECTIONS as FALLBACK_SECTIONS } from '../config/reportTemplate';
import { ShareActions } from '../components/share/ShareActions';
import styles from './Report.module.css';

/**
 * Report Page v3.2.1 (Hardened)
 * 1. 데이터 소스: Firestore reports/{reportId} (sections[] 우선)
 * 2. 렌더링: 서버 제공 섹션 기반 동적 리스트 구성
 * 3. INDEX: 렌더링된 섹션에 맞춰 자동 갱신
 */
export const Report: React.FC = () => {
    const { reportId } = useParams<{ reportId: string }>();
    const navigate = useNavigate();

    const [reportData, setReportData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    // [D3] Firestore 데이터 Fetch
    useEffect(() => {
        const fetchReport = async () => {
            if (!reportId) {
                navigate('/start', { replace: true });
                return;
            }

            try {
                const docRef = doc(db, "reports", reportId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    setReportData(docSnap.data());
                } else {
                    console.warn("[S1] Report not found.");
                    navigate('/start', { replace: true });
                }
            } catch (error) {
                console.error("Archive fetch error:", error);
                navigate('/start', { replace: true });
            } finally {
                setLoading(false);
            }
        };

        fetchReport();
    }, [reportId, navigate]);

    // 접근성 감지 (Reduced Motion)
    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        setPrefersReducedMotion(mediaQuery.matches);
        const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
        mediaQuery.addEventListener('change', handler);
        return () => mediaQuery.removeEventListener('change', handler);
    }, []);

    // [D3] 동적 섹션 구성 (서버 데이터 우선, 없으면 템플릿 Fallback)
    const activeSections = useMemo(() => {
        if (reportData?.sections && Array.isArray(reportData.sections)) {
            return reportData.sections;
        }
        return FALLBACK_SECTIONS;
    }, [reportData]);

    const scrollToSection = useCallback((id: number) => {
        const element = document.getElementById(`page-${id}`);
        if (element) {
            element.scrollIntoView({
                behavior: prefersReducedMotion ? 'auto' : 'smooth'
            });
            setIsMenuOpen(false);
        }
    }, [prefersReducedMotion]);

    if (loading) {
        return (
            <div className={styles.reportPage}>
                <Header lockupDisplay="en_name" />
                <Container className={styles.loadingState}>
                    <div className={styles.loadingPulse}>
                        <p>보안 데이터 아카이브를 호출 중입니다...</p>
                    </div>
                </Container>
            </div>
        );
    }

    const inputData = reportData?.input;
    const calc = reportData?.calculation;

    return (
        <div className={styles.reportPage}>
            <Header lockupDisplay="en_name" />

            <Container className={styles.mainLayout}>
                {/* 동적 INDEX 사이드바 */}
                <aside className={`${styles.sidebar} ${isMenuOpen ? styles.sidebarOpen : ''}`}>
                    <div className={styles.sidebarHeader}>
                        <h3>INDEX</h3>
                        <button className={styles.closeBtn} onClick={() => setIsMenuOpen(false)}>✕</button>
                    </div>
                    <nav className={styles.nav}>
                        {activeSections.map((section: any) => (
                            <button
                                key={section.id}
                                className={styles.navItem}
                                onClick={() => scrollToSection(section.id)}
                            >
                                <span className={styles.pageNum}>{String(section.id).padStart(2, '0')}</span>
                                <span className={styles.pageTitle}>{section.title}</span>
                            </button>
                        ))}
                    </nav>
                </aside>

                <button className={styles.mobileNavTrigger} onClick={() => setIsMenuOpen(true)}>
                    INDEX
                </button>

                <main className={styles.reportContent}>
                    <ShareActions />

                    {activeSections.map((section: any) => {
                        // [Stability Patch #1] UI Rendering Defense: Section.type 정규화
                        const allowedTypes = ["analysis", "action", "context"];
                        const normalizedType = allowedTypes.includes(section.type) ? section.type : "context";

                        return (
                            <section
                                key={section.id}
                                id={`page-${section.id}`}
                                className={`${styles.pageSection} ${styles[`type-${normalizedType}`]}`}
                            >
                                <div className={styles.pageHeader}>
                                    <span className={styles.categoryTag}>{section.category}</span>
                                    <span className={styles.pageIdentifier}>P. {section.id}</span>
                                </div>

                                <Card className={styles.contentCard}>
                                    <h2 className={styles.sectionTitle}>{section.title}</h2>
                                    <p className={styles.sectionContent}>{section.content}</p>

                                    {normalizedType === 'analysis' && (
                                        <ContextBox className={styles.primitiveBox}>
                                            지정된 알고리즘({reportData?.algorithmVersion || 'v1.0'})에 기반한 패턴 결과입니다.
                                        </ContextBox>
                                    )}

                                    {normalizedType === 'action' && (
                                        <AdviceBox className={styles.primitiveBox}>
                                            사용자의 주도적 의사결정을 지원하기 위한 전략 제안입니다.
                                        </AdviceBox>
                                    )}

                                    {/* [Phase 3-C] Pillars Display in Section 2 or 3 */}
                                    {section.id === 2 && calc?.pillars && (
                                        <div className={styles.pillarsGrid}>
                                            <div className={styles.pillarItem}>
                                                <span className={styles.pillarLabel}>HOUR</span>
                                                <div className={styles.pillarGanji}>
                                                    <span className={styles.stem}>{calc.pillars.hour?.stem || '?'}</span>
                                                    <span className={styles.branch}>{calc.pillars.hour?.branch || '?'}</span>
                                                </div>
                                            </div>
                                            <div className={styles.pillarItem}>
                                                <span className={styles.pillarLabel}>DAY</span>
                                                <div className={styles.pillarGanji}>
                                                    <span className={styles.stem}>{calc.pillars.day?.stem || '?'}</span>
                                                    <span className={styles.branch}>{calc.pillars.day?.branch || '?'}</span>
                                                </div>
                                            </div>
                                            <div className={styles.pillarItem}>
                                                <span className={styles.pillarLabel}>MONTH</span>
                                                {calc.pillars.month?.label === 'UNKNOWN' ? (
                                                    <div className={styles.pillarUnknown}>
                                                        <span className={styles.unknownLabel}>UNKNOWN</span>
                                                        <span className={styles.unknownHint}>윤달 월주 미제공</span>
                                                    </div>
                                                ) : (
                                                    <div className={styles.pillarGanji}>
                                                        <span className={styles.stem}>{calc.pillars.month?.stem || '?'}</span>
                                                        <span className={styles.branch}>{calc.pillars.month?.branch || '?'}</span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className={styles.pillarItem}>
                                                <span className={styles.pillarLabel}>YEAR</span>
                                                <div className={styles.pillarGanji}>
                                                    <span className={styles.stem}>{calc.pillars.year?.stem || '?'}</span>
                                                    <span className={styles.branch}>{calc.pillars.year?.branch || '?'}</span>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {section.id === 3 && inputData && (
                                        <div className={styles.formDataSummary}>
                                            <p><strong>BIRTH:</strong> {inputData.birthDate} {inputData.calendar === 'lunar' ? `(음력${inputData.isLeapMonth ? ' 윤달' : ''})` : '(양력)'}</p>
                                            <p><strong>SEX:</strong> {inputData.sex === 'male' ? '남성' : '여성'}</p>
                                            <p><strong>NORMALIZED:</strong> {calc?.normalization?.solarDate || 'N/A'} (Solar)</p>
                                        </div>
                                    )}

                                    {/* [Phase 3-C] Forensic Time Display in Section 5 */}
                                    {section.id === 5 && calc?.forensicTime && (
                                        <div className={styles.forensicDetails}>
                                            <div className={styles.forensicRow}>
                                                <span>Local Clock</span>
                                                <span>{calc.forensicTime.localTime || 'N/A'}</span>
                                            </div>
                                            <div className={styles.forensicRow}>
                                                <span>EoT + Longitude Offset</span>
                                                <span>{calc.forensicTime.totalOffsetMin ?? '0'}m</span>
                                            </div>
                                            <div className={styles.forensicRow}>
                                                <span>True Solar Time</span>
                                                <span className={styles.highlight}>{calc.forensicTime.trueSolarHHmm || 'N/A'}</span>
                                            </div>
                                            <div className={styles.forensicRow}>
                                                <span>Classification</span>
                                                <span>{calc.forensicTime.classification || '일반'}</span>
                                            </div>
                                        </div>
                                    )}

                                    {/* Warnings Display */}
                                    {section.id === 12 && calc?.warnings?.length > 0 && (
                                        <div className={styles.primitiveBox}>
                                            <AdviceBox>
                                                <ul style={{ paddingLeft: '1.2rem', margin: 0 }}>
                                                    {calc.warnings.map((msg: string, i: number) => (
                                                        <li key={i} style={{ fontSize: '0.9rem' }}>{msg}</li>
                                                    ))}
                                                </ul>
                                            </AdviceBox>
                                        </div>
                                    )}
                                </Card>
                            </section>
                        );
                    })}

                    <footer className={styles.disclaimerSection}>
                        <p>{reportData?.reportMeta?.strategistMeta?.disclaimer || "본 리포트는 통계적 패턴 기반의 제안이며 모든 선택의 책임은 사용자에게 있습니다."}</p>
                        <p className={styles.disclaimerEn}>This report provides data-informed patterns. Final interpretation and decisions remain the user’s responsibility.</p>
                    </footer>
                </main>
            </Container>
        </div>
    );
};

```

---

## File: src/pages/Start.module.css

```css
.startPage {
    min-height: 100vh;
    padding-bottom: 4rem;
}

.container {
    padding-top: 3rem;
    max-width: 600px;
}

.pageHeader {
    margin-bottom: 2.5rem;
    text-align: center;
}

.title {
    font-size: 2rem;
    margin-bottom: 1rem;
    color: var(--ink);
}

.helperText {
    font-family: var(--font-sans);
    color: var(--muted);
    font-size: 0.95rem;
    line-height: 1.6;
}

.formCard {
    padding: 2.5rem;
}

.form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

.field {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.labelRow {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.label {
    font-family: var(--font-sans);
    font-weight: 700;
    font-size: 0.9rem;
    color: var(--ink);
}

.input {
    width: 100%;
    padding: 0.85rem 1rem;
    background-color: var(--card);
    border: 1px solid var(--line);
    font-family: var(--font-sans);
    font-size: 1rem;
    color: var(--ink);
    border-radius: 4px;
    transition: border-color 0.2s;
}

.input:focus {
    outline: none;
    border-color: var(--muted);
}

.inputError {
    border-color: var(--accent);
}

.readOnly {
    background-color: color-mix(in srgb, var(--bg) 20%, transparent);
    cursor: default;
}

.errorMsg {
    font-size: 0.8rem;
    color: var(--accent);
    font-family: var(--font-sans);
}

.toggleWrapper {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.checkbox {
    accent-color: var(--accent);
    width: 1.1rem;
    height: 1.1rem;
}

.toggleLabel {
    font-family: var(--font-sans);
    font-size: 0.85rem;
    color: var(--muted);
    cursor: pointer;
}

.segmentControl {
    display: grid;
    grid-template-columns: 1fr 1fr;
    background-color: color-mix(in srgb, var(--bg) 30%, transparent);
    padding: 4px;
    border-radius: 6px;
    border: 1px solid var(--line);
}

.segmentBtn {
    padding: 0.75rem;
    border: none;
    background: transparent;
    font-family: var(--font-sans);
    font-weight: 500;
    font-size: 0.95rem;
    color: var(--muted);
    cursor: pointer;
    border-radius: 4px;
    transition: all 0.2s;
}

.segmentBtn:hover {
    color: var(--ink);
}

.active {
    background-color: var(--card);
    color: var(--ink);
    font-weight: 700;
    box-shadow: 0 2px 4px color-mix(in srgb, var(--ink) 5%, transparent);
}

.submitBtn {
    margin-top: 1rem;
    padding: 1.25rem;
    background-color: var(--ink);
    color: var(--card);
    border: none;
    border-top: none;
    border-radius: 4px;
    font-family: var(--font-sans);
    font-weight: 700;
    font-size: 1.1rem;
    cursor: pointer;
    transition: all 0.2s;
}

.submitBtn:hover:not(:disabled) {
    opacity: 0.9;
    transform: translateY(-2px);
}

.submitBtn:disabled {
    background-color: var(--muted);
    opacity: 0.3;
    cursor: not-allowed;
}

@media (max-width: 768px) {
    .container {
        padding-top: 2rem;
    }

    .formCard {
        padding: 1.5rem;
    }

    .title {
        font-size: 1.75rem;
    }
}
```

---

## File: src/pages/Start.tsx

```tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '../components/layout/Container';
import { Card } from '../components/ui/Card';
import { Header } from '../components/layout/Header';
import styles from './Start.module.css';

interface FormData {
    birthDate: string;
    birthTime: string;
    timeUnknown: boolean;
    sex: 'male' | 'female' | '';
    calendar: 'solar' | 'lunar' | '';
    isLeapMonth: boolean;
    timezone: 'Asia/Seoul';
}

interface Errors {
    birthDate?: string;
    sex?: string;
    calendar?: string;
}

export const Start: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<FormData>({
        birthDate: '',
        birthTime: '',
        timeUnknown: false,
        sex: '',
        calendar: '',
        isLeapMonth: false,
        timezone: 'Asia/Seoul'
    });

    const [errors, setErrors] = useState<Errors>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});
    const [isValid, setIsValid] = useState(false);

    useEffect(() => {
        const isFormValid =
            formData.birthDate !== '' &&
            formData.sex !== '' &&
            formData.calendar !== '';
        setIsValid(isFormValid);
    }, [formData]);

    const validate = (name?: string) => {
        const newErrors: Errors = { ...errors };

        if (!name || name === 'birthDate') {
            if (!formData.birthDate) newErrors.birthDate = '생년월일을 선택해주세요.';
            else delete newErrors.birthDate;
        }

        if (!name || name === 'sex') {
            if (!formData.sex) newErrors.sex = '성별을 선택해주세요.';
            else delete newErrors.sex;
        }

        if (!name || name === 'calendar') {
            if (!formData.calendar) newErrors.calendar = '달력 종류를 선택해주세요.';
            else delete newErrors.calendar;
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
        validate(name);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSegmentChange = (name: string, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }));
        setTouched(prev => ({ ...prev, [name]: true }));
        validate(name);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            navigate('/processing', { state: formData });
        }
    };

    return (
        <div className={styles.startPage}>
            <Header lockupDisplay="en_name" />

            <Container className={styles.container}>
                <div className={styles.pageHeader}>
                    <h2 className={styles.title}>데이터 입력</h2>
                    <p className={styles.helperText}>정확한 분석을 위해 당신의 탄생 정보를 입력해주세요. 입력은 최소화되어 있습니다.</p>
                </div>

                <Card className={styles.formCard}>
                    <form onSubmit={handleSubmit} className={styles.form}>
                        {/* Birth Date */}
                        <div className={styles.field}>
                            <label htmlFor="birthDate" className={styles.label}>생년월일 (필수)</label>
                            <input
                                type="date"
                                id="birthDate"
                                name="birthDate"
                                value={formData.birthDate}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={`${styles.input} ${touched.birthDate && errors.birthDate ? styles.inputError : ''}`}
                                required
                            />
                            {touched.birthDate && errors.birthDate && (
                                <span className={styles.errorMsg}>{errors.birthDate}</span>
                            )}
                        </div>

                        {/* Birth Time */}
                        <div className={styles.field}>
                            <div className={styles.labelRow}>
                                <label htmlFor="birthTime" className={styles.label}>출생 시간 (선택)</label>
                                <div className={styles.toggleWrapper}>
                                    <input
                                        type="checkbox"
                                        id="timeUnknown"
                                        name="timeUnknown"
                                        checked={formData.timeUnknown}
                                        onChange={handleChange}
                                        className={styles.checkbox}
                                    />
                                    <label htmlFor="timeUnknown" className={styles.toggleLabel}>시간 모름</label>
                                </div>
                            </div>
                            <input
                                type="time"
                                id="birthTime"
                                name="birthTime"
                                value={formData.birthTime}
                                onChange={handleChange}
                                disabled={formData.timeUnknown}
                                className={styles.input}
                            />
                        </div>

                        {/* Sex */}
                        <div className={styles.field}>
                            <span className={styles.label}>성별 (필수)</span>
                            <div className={styles.segmentControl}>
                                <button
                                    type="button"
                                    className={`${styles.segmentBtn} ${formData.sex === 'male' ? styles.active : ''}`}
                                    onClick={() => handleSegmentChange('sex', 'male')}
                                >
                                    남
                                </button>
                                <button
                                    type="button"
                                    className={`${styles.segmentBtn} ${formData.sex === 'female' ? styles.active : ''}`}
                                    onClick={() => handleSegmentChange('sex', 'female')}
                                >
                                    여
                                </button>
                            </div>
                            {touched.sex && errors.sex && (
                                <span className={styles.errorMsg}>{errors.sex}</span>
                            )}
                        </div>

                        {/* Calendar Type */}
                        <div className={styles.field}>
                            <span className={styles.label}>양력 / 음력 (필수)</span>
                            <div className={styles.segmentControl}>
                                <button
                                    type="button"
                                    className={`${styles.segmentBtn} ${formData.calendar === 'solar' ? styles.active : ''}`}
                                    onClick={() => handleSegmentChange('calendar', 'solar')}
                                >
                                    양력
                                </button>
                                <button
                                    type="button"
                                    className={`${styles.segmentBtn} ${formData.calendar === 'lunar' ? styles.active : ''}`}
                                    onClick={() => handleSegmentChange('calendar', 'lunar')}
                                >
                                    음력
                                </button>
                            </div>
                            {touched.calendar && errors.calendar && (
                                <span className={styles.errorMsg}>{errors.calendar}</span>
                            )}
                        </div>

                        {/* Leap Month (Conditional) */}
                        {formData.calendar === 'lunar' && (
                            <div className={styles.field}>
                                <div className={styles.toggleWrapper}>
                                    <input
                                        type="checkbox"
                                        id="isLeapMonth"
                                        name="isLeapMonth"
                                        checked={formData.isLeapMonth}
                                        onChange={handleChange}
                                        className={styles.checkbox}
                                    />
                                    <label htmlFor="isLeapMonth" className={styles.toggleLabel}>음력 윤달입니다</label>
                                </div>
                            </div>
                        )}

                        {/* Timezone (Read-only) */}
                        <div className={styles.field}>
                            <label className={styles.label}>타임존</label>
                            <input
                                type="text"
                                value={formData.timezone}
                                readOnly
                                className={`${styles.input} ${styles.readOnly}`}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={!isValid}
                            className={styles.submitBtn}
                        >
                            분석 시작하기 →
                        </button>
                    </form>
                </Card>
            </Container>
        </div>
    );
};

```

---

## File: tsconfig.app.json

```json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.app.tsbuildinfo",
    "target": "ES2022",
    "useDefineForClassFields": true,
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "types": ["vite/client"],
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true
  },
  "include": ["src"]
}

```

---

## File: tsconfig.json

```json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}

```

---

## File: tsconfig.node.json

```json
{
  "compilerOptions": {
    "tsBuildInfoFile": "./node_modules/.tmp/tsconfig.node.tsbuildinfo",
    "target": "ES2023",
    "lib": ["ES2023"],
    "module": "ESNext",
    "types": ["node"],
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "moduleDetection": "force",
    "noEmit": true,

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "erasableSyntaxOnly": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedSideEffectImports": true
  },
  "include": ["vite.config.ts"]
}

```

---

## File: vite.config.ts

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})

```

---

## File: WORK_LOG_PHASE_1_2.md

```md
# MYUNGRI: The Genesis - 작업 완료 보고서 (Phase 1 & Phase 2-A/B)

본 보고서는 "MYUNGRI: The Genesis" 프로젝트의 초기 구축부터 입력 시스템 구현까지의 모든 과정을 초원자 단위(Atomic Level)로 쪼개어 기록한 최종 완료 보고서입니다.

---

## 1. Phase 1: 브랜드 시스템 기반 구축 (Atomic Level)

### 1-A. 브랜드 네이밍 및 정책 수립
- [x] **Naming Constants**: `brand.ts`에 SEO용 영문명(`MYUNGRI: The Genesis`)과 전시용 국문 락업(`命理: The Genesis`)을 분리 정의하여 일관성 확보.
- [x] **Lockup Policy**: Intro/Home은 국문 락업만, 그 외 시스템 페이지는 영문 명칭만 사용하는 엄격한 노출 규칙 수립.

### 1-B. 제네시스 디자인 시스템 토큰(Tokens)
- [x] **Color Tokens**: `#000`/`#FFF` 리터럴 사용을 전면 금지하고, 고서 느낌의 `--bg`, `--card`, `--ink`, `--muted`, `--accent`, `--line` 변수 확립.
- [x] **Typography**: Noto Serif KR(전통), Noto Sans KR(현대), Inter(글로벌 타당성) 폰트 스택 정의 및 Google Fonts 로딩 최적화.

### 1-C. 브랜드 락업(BrandLockup) 컴포넌트 개발
- [x] **Responsive Stacking**: 389px 이하에서 자동으로 2줄 스택되는 CSS 미디어 쿼리 기반 반응형 로직 구현 (JS 배제).
- [x] **Variant System**: `default`, `accent` 버전을 통해 상황에 맞는 타이포그래피 무게감 조절.

---

## 2. Phase 2-A: 레이아웃 프리미티브 및 홈 스켈레톤 구축

### 2-A-1. 레이아웃 기반 컴포넌트(Primitives)
- [x] **PaperBackground**: CSS 노이즈 오버레이(`data-uri svg`)를 활용하여 고서의 종이 질감을 시각화.
- [x] **Container**: 표준 너비(1200px) 및 반응형 패딩 제어.
- [x] **Card**: 토큰 전용 그림자(`color-mix`) 및 강조 바(`accentBar`) 지원.
- [x] **Context/Advice Box**: 해석 및 행동 지침용 특수 UI 박스 구현.

### 2-A-2. 홈 페이지 및 헤더 구현
- [x] **Header**: 스티키 배치, 데스크탑 네비게이션 및 모바일 햄버거 메뉴 애니메이션 구현.
- [x] **Home Hero**: 대형 '命' 워터마크(opacity 0.05)와 2열 그리드 레이아웃 구축.
- [x] **Blocker Fix**: 모든 하드코딩 `rgba()`를 제거하고 CSS `color-mix()`로 전환하여 디자인 정책 100% 준수.

---

## 3. Phase 2-B: 입력 플로우(Input Flow) 및 라우팅 환경

### 2-B-1. 라우팅 인프라 구축
- [x] **React Router**: `react-router-dom` 설치 및 `BrowserRouter` 환경 설정.
- [x] **Page Routes**: `/`, `/start`, `/processing` 경로 확보 및 `Header` 연동.

### 2-B-2. /start 입력 시스템 구현
- [x] **Mobile-first Form**: 터치 친화적 세그먼트 컨트롤(성별/달력) 및 날짜/시간 입력 필드 배치.
- [x] **Validation Logic**: 필수값 누락 시 CTA 버튼 비활성화 및 실시간 blur 기반 에러 메시지 처리.
- [x] **Navigation State**: 입력 완료 시 데이터를 `router state`로 안전하게 전달하여 데이터 유실 방지.

### 2-B-3. /processing 플레이스홀더
- [x] **Waiting UI**: CSS 스피너와 입력된 정보를 요약 노출하며 다음 단계(Step 2-C)를 위한 기반 마련.

---

## 4. 정밀 감사 및 품질 지표 (Quality Audit)

| 검증 항목 | 상세 내용 | 결과 |
| :--- | :--- | :---: |
| **금지 리터럴** | `#000`, `#FFF`, `rgb(0,0,0)` 등 하드코딩 검색 | **0건** |
| **토큰 사용률** | UI 스타일 내 `var()` 및 `color-mix()` 사용 비율 | **100%** |
| **SEO 정합성** | `<title>`, `og:title` -> "MYUNGRI: The Genesis" 일치 여부 | **일치** |
| **락업 정책** | `/start` 이후 화면에서 국문 명칭 노출 여부 | **미노출** |
| **반응형 가동** | 360px ~ 1024px 전 구간 가로 스크롤 및 레이아웃 붕괴 확인 | **정상** |

---

## 5. 최종 제출 및 형상 관리
- [x] **Git Repository**: `suhachi/MYUNGRI-_The-Genesis.git` 에 최신 코드 푸시 완료.
- [x] **Current Commit**: `feat: implement layout primitives and home skeleton (Phase 2-A) with strict token-only styling` (이후 2-B 내역 포함 로컬 상태 최신화).

**보고 완료.** 휴식 후 Step 2-C(트리비아 로딩 엔진) 및 엔진 연동 작업을 진행하겠습니다.

```

---
