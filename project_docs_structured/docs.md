# Documentation

> 프로젝트 문서 (README, 작업 로그, 설정 문서 등)

**생성 시각**: 2026-01-04T15:48:38.433Z

---

## 📋 목차 (15개 파일)

1. [README.md](#file-1)
2. [WORK_LOG_PHASE_1_2.md](#file-2)
3. [codebase_docs/INDEX.md](#file-3)
4. [codebase_docs/codebase_part_01.md](#file-4)
5. [codebase_docs/codebase_part_02.md](#file-5)
6. [codebase_docs/codebase_part_03.md](#file-6)
7. [codebase_docs/codebase_part_04.md](#file-7)
8. [codebase_docs/codebase_part_05.md](#file-8)
9. [codebase_docs/codebase_part_06.md](#file-9)
10. [codebase_docs/codebase_part_07.md](#file-10)
11. [codebase_docs/codebase_part_08.md](#file-11)
12. [codebase_docs/codebase_part_09.md](#file-12)
13. [codebase_docs/codebase_part_10.md](#file-13)
14. [docs/RELEASE_VERIFICATION_P0_P2.md](#file-14)
15. [fate_forensics_초원자단위_prd_와이어프레임_개발로드맵_v_2_오류대응_v_1.md](#file-15)

---

## File 1: `README.md` {#file-1}

**크기**: 2.50 KB | **확장자**: md

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

## File 2: `WORK_LOG_PHASE_1_2.md` {#file-2}

**크기**: 4.23 KB | **확장자**: md

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

## File 3: `codebase_docs/INDEX.md` {#file-3}

**크기**: 4.51 KB | **확장자**: md

```md
# 📦 프로젝트 전체 코드베이스 문서

> 생성일: 2026. 1. 3. 오후 10:52:25

## 📊 프로젝트 개요

- **총 파일 수**: 94개
- **문서 분할**: 10개 파트
- **프로젝트 루트**: `D:\projectsing\MYUNGRI _The Genesis`

## 📑 문서 목록

- [Part 1](./codebase_part_01.md)
- [Part 2](./codebase_part_02.md)
- [Part 3](./codebase_part_03.md)
- [Part 4](./codebase_part_04.md)
- [Part 5](./codebase_part_05.md)
- [Part 6](./codebase_part_06.md)
- [Part 7](./codebase_part_07.md)
- [Part 8](./codebase_part_08.md)
- [Part 9](./codebase_part_09.md)
- [Part 10](./codebase_part_10.md)

## 🌳 전체 디렉토리 구조

```
MYUNGRI _The Genesis/
├── .firebase/
│   ├── hosting.ZGlzdA.cache
├── .env.example
├── .env.production.example
├── .env.production.local
├── .firebaserc
├── README.md
├── WORK_LOG_PHASE_1_2.md
├── eslint.config.js
├── fate_forensics_초원자단위_prd_와이어프레임_개발로드맵_v_2_오류대응_v_1.md
├── firebase.json
├── firestore-debug.log
├── firestore.indexes.json
├── firestore.rules
├── index.html
├── package.json
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── functions/
│   ├── package.json
│   ├── tsconfig.json
│   ├── src/
│   │   ├── generateLuckCalendar.js
│   │   ├── index.ts
│   │   ├── engine/
│   │   │   ├── calculation/
│   │   │   │   ├── index.ts
│   │   │   │   ├── v1.ts
├── project_docs/
│   ├── code_part_001.md
│   ├── core_config_complete.md
│   ├── design_code_complete.md
├── project_docs_structured/
│   ├── INDEX.md
│   ├── backend-engine.md
│   ├── backend-functions.md
│   ├── config-env.md
│   ├── config-root.md
│   ├── docs.md
│   ├── frontend-components.md
│   ├── frontend-core.md
│   ├── frontend-pages.md
│   ├── frontend-styles.md
│   ├── scripts.md
├── public/
│   ├── vite.svg
├── scripts/
│   ├── check-env.cjs
│   ├── ci-gate.cjs
│   ├── debug-v1.cts
│   ├── gen-build-info.mjs
│   ├── generate-code-docs.cjs
│   ├── generate-design-docs.cjs
│   ├── generate-full-codebase-docs.cjs
│   ├── generate-structured-docs.cjs
│   ├── rollback.ps1
│   ├── test-generateReport.ts
├── src/
│   ├── App.css
│   ├── App.module.css
│   ├── App.tsx
│   ├── buildInfo.ts
│   ├── index.css
│   ├── main.tsx
│   ├── assets/
│   │   ├── react.svg
│   ├── components/
│   │   ├── common/
│   │   │   ├── BrandLockup.tsx
│   │   ├── layout/
│   │   │   ├── Container.module.css
│   │   │   ├── Container.tsx
│   │   │   ├── Footer.module.css
│   │   │   ├── Footer.tsx
│   │   │   ├── Header.module.css
│   │   │   ├── Header.tsx
│   │   │   ├── PaperBackground.module.css
│   │   │   ├── PaperBackground.tsx
│   │   ├── report/
│   │   │   ├── LuckCalendar.module.css
│   │   │   ├── LuckCalendar.tsx
│   │   │   ├── ReasonCards.module.css
│   │   │   ├── ReasonCards.tsx
│   │   ├── share/
│   │   │   ├── ShareActions.module.css
│   │   │   ├── ShareActions.tsx
│   │   ├── system/
│   │   │   ├── SecurityShield.tsx
│   │   ├── ui/
│   │   │   ├── AdviceBox.module.css
│   │   │   ├── AdviceBox.tsx
│   │   │   ├── Card.module.css
│   │   │   ├── Card.tsx
│   │   │   ├── ContextBox.module.css
│   │   │   ├── ContextBox.tsx
│   ├── config/
│   │   ├── brand.ts
│   │   ├── reportTemplate.ts
│   │   ├── shareMeta.ts
│   │   ├── tokens.ts
│   │   ├── trivia.ts
│   ├── pages/
│   │   ├── Home.module.css
│   │   ├── Home.tsx
│   │   ├── Processing.module.css
│   │   ├── Processing.tsx
│   │   ├── Report.module.css
│   │   ├── Report.tsx
│   │   ├── ReportPrint.tsx
│   │   ├── Start.module.css
│   │   ├── Start.tsx
│   ├── types/
│   │   ├── report.ts
```


```

---

## File 4: `codebase_docs/codebase_part_01.md` {#file-4}

**크기**: 147.18 KB | **확장자**: md

```md
# 📦 프로젝트 코드베이스 - Part 1/10

> 생성일: 2026. 1. 3. 오후 10:52:25

[← 인덱스로 돌아가기](./INDEX.md)

## 📋 이 파트의 파일 목록

- `project_docs/code_part_001.md`

---

## 📄 파일 내용

## 📄 project_docs/code_part_001.md

```markdown
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
        "kor-lunar": "^1.4.0",
        "openai": "^6.15.0"
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
const { defineSecret } = require("firebase-functions/params");
const admin = require("firebase-admin");
const { Timestamp } = require("firebase-admin/firestore");
const { logger } = require("firebase-functions");
const { OpenAI } = require("openai");
const { calculateV1 } = require("./engine/calculation/v1");

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

exports.generateReport = onCall({
    enforceAppCheck: ENFORCE_APP_CHECK,
    secrets: [OPENAI_API_KEY],
    timeoutSeconds: 300, // Increase timeout for longer reports
    memory: "512MiB"
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

        const userPrompt = `
INPUT DATA:
- 이름: ${userName || "Anonymous"}
- 연주: ${pillars.year.label}
- 월주: ${pillars.month.label}
- 일주: ${pillars.day.label}
- 시주: ${pillars.hour ? pillars.hour.label : "미상"}
- 일간(日干): ${pillars.day.stem}
- 성별: ${rawData.sex === "male" ? "남성" : "여성"}
- 기준일: ${calculation.normalization.solarDate}

Generate a full audit report strictly following the 24-section structure below.
The response must be in JSON format. Do NOT skip any sections.

STRUCTURE:
${JSON.stringify(REPORT_STRUCTURE.map(s => ({ id: s.id, title: s.title })), null, 2)}

OUTPUT FORMAT:
{
  "sections": [
    { "id": "...", "title": "...", "content": "Korean text..." }
  ]
}
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

        // 4. Map AI sections to report structure
        const sections = REPORT_STRUCTURE.map(meta => {
            const aiSec = aiResponse.sections.find((s: any) => s.id === meta.id);
            return {
                id: meta.id,
                title: meta.id === "24_archive" ? meta.title : (aiSec?.title || meta.title),
                category: meta.category,
                content: aiSec?.content || "데이터 분석 중 오류가 발생했습니다.",
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

        // 6. 리포트 데이터 영구 보관
        const reportData = {
            createdAt: Timestamp.now(),
            version: "v5.0.0-AUDIT",
            schemaVersion: "report/v2",
            algorithmVersion: calculation.algorithmVersion,
            input: input,
            calculation: {
                ...calculation,
                forensicTime: calculation.forensicTime ?? null
            },
            reportMeta,
            sections: sections
        };

        const reportRef = await admin.firestore().collection("reports").add(reportData);

        return {
            reportId: reportRef.id,
            version: reportData.version,
            sections: sections
        };

    } catch (err: any) {
        logger.error("Report Generation Error:", err);
        if (err instanceof HttpsError) throw err;
        throw new HttpsError("internal", `분석 엔진 처리 중 오류: ${err.message || 'LLM_INTERPRETATION_FAILED'}`);
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
  <meta name="author" content="KS Company" />
  <meta name="copyright" content="KS Company" />
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

  <!-- Kakao SDK [Fixed Load Option A] 
       Pined SRI hash to match production integrity check (sha384 computed by browser) -->
  <script src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js"
    integrity="sha384-DKYJZ8NLiK8MN4/C5P2dtSmLQ4KwPaoqAfyA/DfmEc1VDxu4yyC7wy6K1Hs90nka" crossorigin="anonymous"
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
  "author": "KS Company <suhachi78@gmail.com>",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "prebuild": "node scripts/check-env.cjs",
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

## File: scripts/check-env.cjs

```cjs
const fs = require('fs');
const path = require('path');

/**
 * [Zero Tolerance] Environment Validation Script (Authoritative)
 * 빌드 시점에 필수 변수가 없거나 비어 있으면 즉시 중단합니다.
 * 우선순위: .env.production.local > process.env (CI 오염 방지)
 */

const REQUIRED_VARS = [
    'VITE_FIREBASE_API_KEY',
    'VITE_FIREBASE_AUTH_DOMAIN',
    'VITE_FIREBASE_PROJECT_ID',
    'VITE_FIREBASE_APP_ID',
    'VITE_FIREBASE_MESSAGING_SENDER_ID',
    'VITE_FIREBASE_STORAGE_BUCKET',
    'VITE_RECAPTCHA_SITE_KEY'
];

function parseEnvFile(filePath) {
    if (!fs.existsSync(filePath)) return {};
    const content = fs.readFileSync(filePath, 'utf8');
    const env = {};
    content.split(/\r?\n/).forEach(line => {
        const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
        if (match) {
            let value = match[2] || '';
            // 따옴표 제거
            if (value.length > 0 && value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
            if (value.length > 0 && value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
            env[match[1]] = value.trim();
        }
    });
    return env;
}

function checkEnv() {
    console.log('🔍 [Release Engineer] Hard-validating environment for production build...');

    // 1. .env.production.local 로드 (권위적 우선순위)
    const envPath = path.resolve(__dirname, '../.env.production.local');
    const fileEnv = parseEnvFile(envPath);

    const missingOrEmpty = [];

    REQUIRED_VARS.forEach(key => {
        // [Zero Tolerance] Local File 우선 (CI/쉘 잔류값 overriding 방지)
        const value = fileEnv[key] || process.env[key];

        const isEmpty = !value || value.trim() === '';
        const isPlaceholder = value && (
            value.includes('YOUR_') ||
            value.includes('REPLACE') ||
            value.includes('AIzaSyAL...') // 런북 예시값 방지
        );

        if (isEmpty || isPlaceholder) {
            missingOrEmpty.push(key);
        }
    });

    if (missingOrEmpty.length > 0) {
        console.error('\n❌ [CRITICAL FAIL] Production build aborted due to missing/empty environment variables:');
        missingOrEmpty.forEach(k => console.error(`   - ${k}`));
        console.error('\n👉 FIX: Update your .env.production.local with valid credentials.');
        console.error('👉 REF: Check .env.production.example for the list of required keys.\n');
        process.exit(1);
    }

    console.log('✅ Environment validation passed. Proceeding to build...\n');
}

checkEnv();

```

---

## File: scripts/ci-gate.cjs

```cjs
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * [Zero Tolerance] CI Release Gate Script
 * 1. Pre-build: 환경 변수 엄격 검증 (check-env.cjs 재사용)
 * 2. Post-build: 빌드 결과물(Bundle) 내 필수 식별자(projectId 등) 존재 확인
 */

function runPreBuildCheck() {
    console.log('🚀 [CI Gate] Step 1: Pre-build Environment Validation...');
    try {
        execSync('node scripts/check-env.cjs', { stdio: 'inherit' });
    } catch (err) {
        console.error('❌ [CI Gate] Pre-build validation failed.');
        process.exit(1);
    }
}

function runPostBuildCheck() {
    console.log('🚀 [CI Gate] Step 2: Post-build Bundle Integrity Check...');
    const distPath = path.resolve(__dirname, '../dist');

    if (!fs.existsSync(distPath)) {
        console.error('❌ [CI Gate] Build directory (dist) not found. Run "npm run build" first.');
        process.exit(1);
    }

    // 번들 파일들 내에서 projectId가 실제로 포함되어 있는지 검색 (Vite define 검증)
    // 실제 projectId 값 대신 플레이스홀더나 빈 자리가 남지 않았는지 확인
    const assetsPath = path.join(distPath, 'assets');
    const files = fs.readdirSync(assetsPath).filter(f => f.endsWith('.js'));

    let projectIdFound = false;
    for (const file of files) {
        const content = fs.readFileSync(path.join(assetsPath, file), 'utf8');
        // projectId가 실제 빌드될 때 "myungri-genesis"와 같은 문자열로 박혔는지 확인
        // (참고: 빌드 시 환경변수는 문자열 리터럴로 치환됨)
        if (content.includes('myungri-genesis')) {
            projectIdFound = true;
            break;
        }
    }

    if (!projectIdFound) {
        console.error('❌ [CI Gate] INTEGRITY FAIL: "projectId" (myungri-genesis) was not detected in JS bundles.');
        console.error('👉 This indicates a failed Vite environment injection at build time.');
        process.exit(1);
    }

    console.log('✅ [CI Gate] Bundle integrity verified. "projectId" detected.');
}

function main() {
    const isPostBuild = process.argv.includes('--post-build');

    if (isPostBuild) {
        runPostBuildCheck();
    } else {
        runPreBuildCheck();
    }
}

main();

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

## File: scripts/generate-design-docs.cjs

```cjs
const fs = require('fs');
const path = require('path');

// --- Configuration ---
const PROJECT_ROOT = path.resolve(__dirname, '..');
const OUTPUT_DIR = path.join(PROJECT_ROOT, 'project_docs');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'design_code_complete.md');

// Directories to focus on for "Design"
const DESIGN_PATHS = [
    'src/components',
    'src/pages',
    'src/styles',
    'src/config'
];

// Extensions to include
const ALLOW_EXTENSIONS = ['.tsx', '.css', '.module.css', '.ts'];

// Files to explicitly include even if not in DESIGN_PATHS
const SPECIFIC_FILES = [
    'index.html',
    'src/App.tsx',
    'src/main.tsx'
];

function ensureDir(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

function isDesignRelated(filePath) {
    const relativePath = path.relative(PROJECT_ROOT, filePath).replace(/\\/g, '/');

    // Check if it's in a design-related directory
    const isInDesignDir = DESIGN_PATHS.some(p => relativePath.startsWith(p));

    // Check if it's a specific file
    const isSpecific = SPECIFIC_FILES.includes(relativePath);

    // Check extension
    const ext = path.extname(filePath).toLowerCase();
    const isAllowedExt = ALLOW_EXTENSIONS.includes(ext);

    // Business logic exclusion: exclude calculation engine logic even if in src/config if it's not design
    if (relativePath.includes('engine') || relativePath.includes('functions/src')) {
        return false;
    }

    return (isInDesignDir || isSpecific) && isAllowedExt;
}

function getFileList(dir, fileList = []) {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            if (file !== 'node_modules' && !file.startsWith('.')) {
                getFileList(filePath, fileList);
            }
        } else {
            if (isDesignRelated(filePath)) {
                fileList.push(filePath);
            }
        }
    });

    return fileList;
}

function generateDesignMarkdown() {
    console.log(`🎨 Gathering design-related code from: ${PROJECT_ROOT}`);
    const files = getFileList(PROJECT_ROOT);
    console.log(`✨ Found ${files.length} design-related files.`);

    ensureDir(OUTPUT_DIR);

    let content = `# MYUNGRI: The Genesis - Full Design Code Documentation\n`;
    content += `Generated on: ${new Date().toLocaleString()}\n\n`;
    content += `> [!NOTE]\n`;
    content += `> This document contains all CSS, UI Components, Layouts, and Design Tokens.\n\n---\n`;

    for (const filePath of files) {
        const relativePath = path.relative(PROJECT_ROOT, filePath).replace(/\\/g, '/');
        try {
            const fileContent = fs.readFileSync(filePath, 'utf8');
            const ext = path.extname(filePath).substring(1) || 'text';

            content += `\n## File: ${relativePath}\n\n`;
            content += `\`\`\`${ext}\n${fileContent}\n\`\`\`\n\n---\n`;
        } catch (err) {
            console.error(`❌ Error reading ${relativePath}:`, err.message);
        }
    }

    fs.writeFileSync(OUTPUT_FILE, content, 'utf8');
    console.log(`✅ Success! Design documentation created at: ${OUTPUT_FILE}`);
}

generateDesignMarkdown();

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
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { PaperBackground } from './components/layout/PaperBackground';
import { Header } from './components/layout/Header';
import { BrandLockup } from './components/common/BrandLockup';
import { Home } from './pages/Home';
import { Start } from './pages/Start';
import { Processing } from './pages/Processing';
import { Report } from './pages/Report';
import styles from './App.module.css';
import { Footer } from './components/layout/Footer';
import { isAppCheckReady, appCheckError as libAppCheckError, firebaseConfigError } from './lib/firebase';
import { SecurityShield } from './components/system/SecurityShield';

function App() {
  const [showHome, setShowHome] = useState(false);
  const [appCheckTimeout, setAppCheckTimeout] = useState(false);

  // [Zero Tolerance] Initializing UI Timeout (Prevent hanging)
  useEffect(() => {
    if (import.meta.env.PROD && !isAppCheckReady && !libAppCheckError && !firebaseConfigError) {
      const timer = setTimeout(() => {
        setAppCheckTimeout(true);
      }, 5000); // 5s Limit
      return () => clearTimeout(timer);
    }
  }, []);

  const effectiveAppCheckError = libAppCheckError || (appCheckTimeout ? "APPCHECK_TIMEOUT" : null);

  // [Zero Tolerance] Security Gate: Block on config error or initialization failure
  if (import.meta.env.PROD) {
    if (firebaseConfigError || effectiveAppCheckError) {
      return <SecurityShield reason={firebaseConfigError || effectiveAppCheckError} />;
    }

    if (!isAppCheckReady) {
      return (
        <div style={{
          height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'var(--bg-main)', color: 'var(--muted)', fontSize: '0.9rem'
        }}>
          Security Initializing...
        </div>
      );
    }
  }

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
      <Footer />
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

## File: src/components/layout/Footer.module.css

```css
.footer {
    padding: 2rem 0;
    border-top: 1px solid var(--line);
    margin-top: auto;
    text-align: center;
    font-family: var(--font-sans);
    background: var(--bg);
    color: var(--muted);
    font-size: 0.75rem;
    line-height: 1.6;
}

.container {
    max-width: var(--container-width);
    margin: 0 auto;
    padding: 0 var(--space-md);
}

.copyright {
    font-weight: 500;
    letter-spacing: 0.02em;
    margin-bottom: 0.25rem;
}

.companyInfo {
    opacity: 0.8;
}

.divider {
    margin: 0 0.5rem;
    opacity: 0.3;
}

@media (max-width: 480px) {
    .footer {
        padding: 1.5rem 0;
    }
}
```

---

## File: src/components/layout/Footer.tsx

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

## File: src/components/system/SecurityShield.tsx

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
import { functionsInstance as functions } from '../lib/firebase';
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
    background: rgba(198, 40, 40, 0.05);
}

.navItem .pageNum {
    font-size: 0.75rem;
    font-weight: 700;
    color: #c62828;
    width: 20px;
}

.navItem .pageTitle {
    font-size: 0.85rem;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.7);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.reportContent {
    flex: 1;
    max-width: 860px;
}

.reportHeader {
    margin-bottom: 80px;
    text-align: left;
}

.mainTitle {
    font-family: "Noto Serif KR", serif;
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 16px;
    letter-spacing: -0.02em;
}

.mainSummary {
    font-size: 1.1rem;
    color: rgba(0, 0, 0, 0.6);
    line-height: 1.6;
    max-width: 600px;
}

.pageSection {
    margin-bottom: 120px;
    scroll-margin-top: 40px;
}

.pageHeader {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    border-bottom: 2px solid #1c1c1c;
    padding-bottom: 8px;
}

.categoryTag {
    font-size: 0.75rem;
    font-weight: 800;
    letter-spacing: 0.05em;
    color: #1c1c1c;
}

.pageIdentifier {
    font-size: 0.75rem;
    font-weight: 700;
    color: #c62828;
}

.contentCard {
    background: #fdfcf8 !important;
    border: 1px solid rgba(0, 0, 0, 0.08) !important;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.06) !important;
    padding: 56px !important;
}

.sectionTitle {
    font-family: "Noto Serif KR", serif;
    font-size: 2.25rem;
    font-weight: 700;
    margin-bottom: 40px;
    color: #1c1c1c;
}

.textContent p {
    margin-bottom: 24px;
    line-height: 1.8;
    font-size: 1.05rem;
    color: #333;
    text-align: justify;
}

.visualBox {
    border: 2px solid #1c1c1c;
    padding: 32px;
    margin: 40px 0;
}

.visualTitle {
    font-family: "Noto Serif KR", serif;
    font-weight: 700;
    font-size: 1.1rem;
    margin-bottom: 24px;
    color: #1c1c1c;
}

.placeholder {
    height: 320px;
    background: repeating-linear-gradient(45deg,
            rgba(0, 0, 0, 0.03),
            rgba(0, 0, 0, 0.03) 10px,
            transparent 10px,
            transparent 20px);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.9rem;
    color: rgba(0, 0, 0, 0.4);
    border: 1px dashed rgba(0, 0, 0, 0.1);
}

.disclaimerSection {
    margin-top: 120px;
    padding-top: 40px;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    color: rgba(0, 0, 0, 0.5);
}

.disclaimerSection p {
    font-size: 0.85rem;
    margin-bottom: 8px;
    line-height: 1.6;
}

.disclaimerEn {
    font-size: 0.75rem !important;
    font-style: italic;
}

.mobileNavTrigger {
    display: none;
}

@media (max-width: 1024px) {
    .sidebar {
        display: none;
    }

    .sidebarOpen {
        display: flex;
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 1000;
        background: #f7f5f0;
    }

    .mobileNavTrigger {
        display: block;
        position: fixed;
        bottom: 24px;
        right: 24px;
        z-index: 900;
        background: #1c1c1c;
        color: #fff;
        padding: 12px 24px;
        border-radius: 40px;
        font-weight: 700;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    }

    .mainTitle {
        font-size: 2.25rem;
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
import { dbInstance as db } from '../lib/firebase';
import { Container } from '../components/layout/Container';
import { Header } from '../components/layout/Header';
import { Card } from '../components/ui/Card';
import { ShareActions } from '../components/share/ShareActions';
import styles from './Report.module.css';

/**
 * Report Page v3.2.1 (Hardened)
 * 1. 데이터 소스: Firestore reports/{reportId} (sections[] 우선)
 * 2. 렌더링: 서버 제공 섹션 기반 동적 리스트 구성
 * 3. INDEX: 렌더링된 섹션에 맞춰 자동 갱신
 */
/**
 * System Audit Report Components
 */
function GenesisCodeVisual() {
    return (
        <div className={styles.visualBox}>
            <p className={styles.visualTitle}>Genesis Architecture Diagram</p>
            <div className={styles.placeholder}>[사주 원국 회로도 시각화 영역]</div>
        </div>
    );
}


function BalanceRadarVisual() {
    return (
        <div className={styles.visualBox}>
            <p className={styles.visualTitle}>Energy Balance Radar</p>
            <div className={styles.placeholder}>[오행 레이더 차트 영역]</div>
        </div>
    );
}


/**
 * Data Hardening Helpers
 */
const normalizeSection = (s: any) => {
    const id = typeof s?.id === 'string' ? s.id : String(s?.id ?? "");
    const title = typeof s?.title === 'string' ? s.title : String(s?.title ?? "");
    const content = typeof s?.content === 'string' ? s.content : String(s?.content ?? "");
    const category = typeof s?.category === 'string' ? s.category : "ANALYSIS";
    return { ...s, id, title, content, category };
};

const normalizeSections = (input: any) => {
    const arr = Array.isArray(input) ? input : [];
    return arr.map(normalizeSection);
};

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

    // [D3] 동적 섹션 구성 (정규화 적용)
    const activeSections = useMemo(() => {
        return normalizeSections(reportData?.sections);
    }, [reportData]);

    const scrollToSection = useCallback((id: string) => {
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

    return (
        <div className={styles.reportPage}>
            <Header lockupDisplay="en_name" />

            <Container className={styles.mainLayout}>
                {/* 동적 INDEX 사이드바 */}
                <aside className={`${styles.sidebar} ${isMenuOpen ? styles.sidebarOpen : ''}`}>
                    <div className={styles.sidebarHeader}>
                        <h3>AUDIT INDEX</h3>
                        <button className={styles.closeBtn} onClick={() => setIsMenuOpen(false)}>✕</button>
                    </div>
                    <nav className={styles.nav}>
                        {activeSections.map((section: any) => (
                            <button
                                key={section.id}
                                className={styles.navItem}
                                onClick={() => scrollToSection(section.id)}
                            >
                                <span className={styles.pageNum}>
                                    {section.id.includes('_') ? section.id.split('_')[0] : '??'}
                                </span>
                                <span className={styles.pageTitle}>{section.title}</span>
                            </button>
                        ))}
                    </nav>
                </aside>

                <button className={styles.mobileNavTrigger} onClick={() => setIsMenuOpen(true)}>
                    INDEX
                </button>

                <main className={styles.reportContent}>
                    <header className={styles.reportHeader}>
                        <h1 className={styles.mainTitle}>
                            {reportData?.reportMeta?.title || "SYSTEM AUDIT v5.0"}
                        </h1>
                        <p className={styles.mainSummary}>{reportData?.reportMeta?.summary}</p>
                    </header>

                    <ShareActions />

                    {activeSections.map((section: any) => (
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
                                    <div className={styles.textContent}>
                                        {section.content.split('\n').map((p: string, i: number) => (
                                            p.trim() ? <p key={i}>{p}</p> : <br key={i} />
                                        ))}
                                    </div>
                                )}
                            </Card>
                        </section>
                    ))}

                    <footer className={styles.disclaimerSection}>
                        <p>{reportData?.reportMeta?.strategistMeta?.disclaimer}</p>
                        <p className={styles.disclaimerEn}>This audit provided by Genesis Master interprets human behavior through systemic metaphors. Final operational decisions rest with the user.</p>
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
import { detectScriptType } from '../lib/text';
import styles from './Start.module.css';

interface FormData {
    userName: string;
    birthDate: string;
    birthTime: string;
    timeUnknown: boolean;
    sex: 'male' | 'female' | '';
    calendar: 'solar' | 'lunar' | '';
    isLeapMonth: boolean;
    timezone: 'Asia/Seoul';
}

interface Errors {
    userName?: string;
    birthDate?: string;
    sex?: string;
    calendar?: string;
}

export const Start: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<FormData>({
        userName: '',
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

        if (!name || name === 'userName') {
            const trimmed = formData.userName.trim();
            if (trimmed.length === 1) {
                newErrors.userName = '이름은 최소 2자 이상이어야 합니다.';
            } else if (trimmed.length > 20) {
                newErrors.userName = '이름은 최대 20자까지 입력 가능합니다.';
            } else {
                delete newErrors.userName;
            }
        }

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
            const trimmedName = formData.userName.trim();
            const payload: any = {
                birthDate: formData.birthDate,
                birthTime: formData.birthTime,
                timeUnknown: formData.timeUnknown,
                sex: formData.sex,
                calendar: formData.calendar,
                isLeapMonth: formData.isLeapMonth,
                timezone: formData.timezone
            };

            // Only include userName and scriptType if name is provided
            if (trimmedName.length > 0) {
                payload.userName = trimmedName;
                payload.scriptType = detectScriptType(trimmedName);
            }

            navigate('/processing', { state: payload });
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
                        {/* Name */}
                        <div className={styles.field}>
                            <label htmlFor="userName" className={styles.label}>성명 (한자 권장, 한글 가능)</label>
                            <input
                                type="text"
                                id="userName"
                                name="userName"
                                value={formData.userName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="예: 洪吉童 또는 홍길동"
                                className={`${styles.input} ${touched.userName && errors.userName ? styles.inputError : ''}`}
                            />
                            {touched.userName && errors.userName && (
                                <span className={styles.errorMsg}>{errors.userName}</span>
                            )}
                        </div>

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

```

---

---

**Part 1/10 완료**

[← 인덱스로 돌아가기](./INDEX.md) | [Part 2 →](./codebase_part_02.md)
```

---

## File 5: `codebase_docs/codebase_part_02.md` {#file-5}

**크기**: 81.90 KB | **확장자**: md

```md
# 📦 프로젝트 코드베이스 - Part 2/10

> 생성일: 2026. 1. 3. 오후 10:52:25

[← 인덱스로 돌아가기](./INDEX.md)

## 📋 이 파트의 파일 목록

- `project_docs/design_code_complete.md`

---

## 📄 파일 내용

## 📄 project_docs/design_code_complete.md

```markdown
# MYUNGRI: The Genesis - Full Design Code Documentation
Generated on: 2025. 12. 30. 오후 9:12:40

> [!NOTE]
> This document contains all CSS, UI Components, Layouts, and Design Tokens.

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
import { Footer } from './components/layout/Footer';
import { isAppCheckReady, appCheckError } from './lib/firebase';
import { SecurityShield } from './components/system/SecurityShield';

function App() {
  const [showHome, setShowHome] = useState(false);

  // [Zero Tolerance] Security Fail-Fast: Block app in production if App Check is not ready
  if (import.meta.env.PROD && !isAppCheckReady) {
    return <SecurityShield reason={appCheckError} />;
  }

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
      <Footer />
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

## File: src/components/layout/Footer.module.css

```css
.footer {
    padding: 2rem 0;
    border-top: 1px solid var(--line);
    margin-top: auto;
    text-align: center;
    font-family: var(--font-sans);
    background: var(--bg);
    color: var(--muted);
    font-size: 0.75rem;
    line-height: 1.6;
}

.container {
    max-width: var(--container-width);
    margin: 0 auto;
    padding: 0 var(--space-md);
}

.copyright {
    font-weight: 500;
    letter-spacing: 0.02em;
    margin-bottom: 0.25rem;
}

.companyInfo {
    opacity: 0.8;
}

.divider {
    margin: 0 0.5rem;
    opacity: 0.3;
}

@media (max-width: 480px) {
    .footer {
        padding: 1.5rem 0;
    }
}
```

---

## File: src/components/layout/Footer.tsx

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

## File: src/components/system/SecurityShield.tsx

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
                    이 빌드에 필수 보안 설정(reCAPTCHA Site Key)이 누락되어 배포 및 API 호출이 원격 차단되었습니다.
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
                                                {(calc?.pillars?.month?.label === 'UNKNOWN' || !calc?.pillars?.month?.label || calc?.pillars?.month?.stem === '?') ? (
                                                    <div className={styles.pillarUnknown}>
                                                        <span className={styles.unknownLabel}>UNKNOWN</span>
                                                        <span className={styles.unknownHint}>윤달 월주 미제공</span>
                                                    </div>
                                                ) : (
                                                    <div className={styles.pillarGanji}>
                                                        <span className={styles.stem}>{calc.pillars.month.stem}</span>
                                                        <span className={styles.branch}>{calc.pillars.month.branch}</span>
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

```

---

---

**Part 2/10 완료**

[← 인덱스로 돌아가기](./INDEX.md) | [← Part 1](./codebase_part_01.md) | [Part 3 →](./codebase_part_03.md)
```

---

## File 6: `codebase_docs/codebase_part_03.md` {#file-6}

**크기**: 71.84 KB | **확장자**: md

```md
# 📦 프로젝트 코드베이스 - Part 3/10

> 생성일: 2026. 1. 3. 오후 10:52:25

[← 인덱스로 돌아가기](./INDEX.md)

## 📋 이 파트의 파일 목록

- `project_docs_structured/frontend-pages.md`

---

## 📄 파일 내용

## 📄 project_docs_structured/frontend-pages.md

```markdown
# Frontend - Pages

> 프론트엔드 페이지 컴포넌트 (Report, Start, Processing 등)

**생성 시각**: 2026-01-03T09:38:11.808Z

---

## 📋 목차 (9개 파일)

1. [src/pages/Home.module.css](#file-1)
2. [src/pages/Home.tsx](#file-2)
3. [src/pages/Processing.module.css](#file-3)
4. [src/pages/Processing.tsx](#file-4)
5. [src/pages/Report.module.css](#file-5)
6. [src/pages/Report.tsx](#file-6)
7. [src/pages/ReportPrint.tsx](#file-7)
8. [src/pages/Start.module.css](#file-8)
9. [src/pages/Start.tsx](#file-9)

---

## File 1: `src/pages/Home.module.css` {#file-1}

**크기**: 2.88 KB | **확장자**: css

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

## File 2: `src/pages/Home.tsx` {#file-2}

**크기**: 3.72 KB | **확장자**: tsx

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

## File 3: `src/pages/Processing.module.css` {#file-3}

**크기**: 4.29 KB | **확장자**: css

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

.footer {
    padding: 24px 0;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.copyright {
    font-size: 0.8rem;
    color: var(--muted);
    text-align: center;
}

/* Phase 27: Error UI */
.errorCard {
    max-width: 500px;
    width: 90%;
    padding: 40px;
    background: rgba(20, 20, 20, 0.8);
    border: 1px solid rgba(198, 40, 40, 0.3);
    text-align: center;
    backdrop-filter: blur(10px);
}

.errorHeader {
    margin-bottom: 24px;
}

.errorTitle {
    font-size: 1.5rem;
    font-weight: 700;
    color: #ff5252;
    margin-bottom: 8px;
}

.errorCode {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: rgba(255, 82, 82, 0.6);
    background: rgba(255, 82, 82, 0.1);
    padding: 2px 8px;
    border-radius: 4px;
}

.errorText {
    font-size: 1rem;
    line-height: 1.6;
    color: var(--text-main);
    margin-bottom: 32px;
}

.detailsBox {
    background: rgba(0, 0, 0, 0.3);
    padding: 16px;
    border-radius: 8px;
    margin-bottom: 32px;
    text-align: left;
    max-height: 200px;
    overflow-y: auto;
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.detailsBox pre {
    font-family: var(--font-mono);
    font-size: 0.8rem;
    color: #888;
    white-space: pre-wrap;
    word-break: break-all;
}

.actionRow {
    display: flex;
    gap: 12px;
    justify-content: center;
}

.retryBtn {
    padding: 12px 24px;
    background: #c62828;
    color: white;
    border: none;
    border-radius: 4px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
}

.retryBtn:hover {
    background: #e53935;
    transform: translateY(-2px);
}

.cancelBtn {
    padding: 12px 24px;
    background: transparent;
    color: var(--text-main);
    border: 1px solid var(--border-main);
    border-radius: 4px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
}

.cancelBtn:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: var(--text-main);
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

## File 4: `src/pages/Processing.tsx` {#file-4}

**크기**: 7.82 KB | **확장자**: tsx

```tsx
import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { httpsCallable } from 'firebase/functions';
import { functionsKR as functions } from '../lib/firebase';
import { Container } from '../components/layout/Container';
import { Header } from '../components/layout/Header';
import { Card } from '../components/ui/Card';
import { TRIVIA_LINES } from '../config/trivia';
import styles from './Processing.module.css';

/**
 * Processing Page [Phase 27: Zero Silent Redirect]
 * 1. 호출: generateReport Callable API 호출 (functionsKR 강제)
 * 2. 대기: 최소 시각적 대기 시간을 확보하며 트리비아 롤링
 * 3. 이동: 성공 시에만 reportId 경로로 이동
 * 4. 에러: 실패 시 상세 에러 패널 노출 (자동 이동 절대 금지)
 */
export const Processing: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const formData = location.state;

    const [triviaIndex, setTriviaIndex] = useState(0);
    const [progressStep, setProgressStep] = useState(0);
    const [error, setError] = useState<{
        code?: string;
        message: string;
        details?: string;
    } | null>(null);

    // 최소 시각적 대기 시간 (3.5s ~ 5s 랜덤)
    const [visualDuration] = useState(() => Math.floor(Math.random() * 1500) + 3500);

    const nextTrivia = useCallback(() => {
        setTriviaIndex((prev) => (prev + 1) % TRIVIA_LINES.length);
    }, []);

    useEffect(() => {
        const interval = setInterval(nextTrivia, 1500);
        return () => clearInterval(interval);
    }, [nextTrivia]);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgressStep((prev) => (prev + 1) % 4);
        }, 500);
        return () => clearInterval(interval);
    }, []);

    const executeGeneration = useCallback(async () => {
        if (!formData) {
            console.error("[generateReport] Missing formData in location state");
            return;
        }

        setError(null);
        const startTime = Date.now();

        try {
            console.log("[generateReport] Calling function with payload:", formData);
            const generateReportFunc = httpsCallable(functions, 'generateReport');
            const result = await generateReportFunc(formData);

            const { reportId, schemaVersion, serverBuildId, version } = result.data as any;
            console.log(`[generateReport] Success!
                Report ID: ${reportId}
                Schema: ${schemaVersion}
                Build: ${serverBuildId}
                Version: ${version}`);

            // 최소 시각적 시간 보장
            const elapsedTime = Date.now() - startTime;
            const remainingTime = Math.max(0, visualDuration - elapsedTime);
            if (remainingTime > 0) {
                await new Promise(resolve => setTimeout(resolve, remainingTime));
            }

            navigate(`/report/${reportId}`, { replace: true });
        } catch (err: any) {
            console.error("[generateReport] Analysis Failed:", err);

            let errorMessage = err.message || "알 수 없는 시스템 오류가 발생했습니다.";
            let errorDetails = "";

            if (err.details) {
                errorDetails = typeof err.details === 'object'
                    ? JSON.stringify(err.details, null, 2)
                    : String(err.details);
            }

            // App Check / Security 힌트 추가
            const securityCodes = ['permission-denied', 'unauthenticated', 'failed-precondition', 'unavailable'];
            if (securityCodes.includes(err.code)) {
                errorMessage = "보안 게이트(App Check) 또는 인증 문제로 요청이 차단되었습니다. 관리자 설정을 점검하거나 잠시 후 다시 시도해주세요.";
            }

            setError({
                code: err.code,
                message: errorMessage,
                details: errorDetails
            });
        }
    }, [formData, navigate, visualDuration]);

    useEffect(() => {
        if (formData) {
            executeGeneration();
        }
    }, [formData, executeGeneration]);

    // 입 정보가 없는 경우 전용 UI
    if (!formData) {
        return (
            <div className={styles.processingPage}>
                <Header lockupDisplay="en_name" />
                <Container className={styles.loadingContainer}>
                    <Card className={styles.errorCard}>
                        <h2 className={styles.errorTitle}>데이터 누락</h2>
                        <p className={styles.errorText}>입력 정보가 전달되지 않았습니다. 분석 시작 페이지로 돌아가 정보를 다시 입력해주세요.</p>
                        <button
                            className={styles.retryBtn}
                            onClick={() => navigate('/start', { replace: true })}
                        >
                            입력 화면으로 이동
                        </button>
                    </Card>
                </Container>
            </div>
        );
    }

    return (
        <div className={styles.processingPage}>
            <Header lockupDisplay="en_name" />
            <Container className={styles.loadingContainer}>
                {!error ? (
                    <>
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
                    </>
                ) : (
                    <Card className={styles.errorCard}>
                        <div className={styles.errorHeader}>
                            <h2 className={styles.errorTitle}>분석 실패</h2>
                            {error.code && <span className={styles.errorCode}>CODE: {error.code}</span>}
                        </div>

                        <p className={styles.errorText}>{error.message}</p>

                        {error.details && (
                            <div className={styles.detailsBox}>
                                <pre>{error.details}</pre>
                            </div>
                        )}

                        <div className={styles.actionRow}>
                            <button className={styles.retryBtn} onClick={executeGeneration}>
                                다시 시도
                            </button>
                            <button className={styles.cancelBtn} onClick={() => navigate('/start')}>
                                입력 화면으로
                            </button>
                        </div>
                    </Card>
                )}
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

## File 5: `src/pages/Report.module.css` {#file-5}

**크기**: 9.09 KB | **확장자**: css

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
    background: rgba(198, 40, 40, 0.05);
}

.navItem .pageNum {
    font-size: 0.75rem;
    font-weight: 700;
    color: #c62828;
    width: 20px;
}

.navItem .pageTitle {
    font-size: 0.85rem;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.7);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.reportContent {
    flex: 1;
    max-width: 860px;
}

.reportHeader {
    margin-bottom: 80px;
    text-align: left;
}

.mainTitle {
    font-family: "Noto Serif KR", serif;
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 16px;
    letter-spacing: -0.02em;
}

.mainSummary {
    font-size: 1.1rem;
    color: rgba(0, 0, 0, 0.6);
    line-height: 1.6;
    max-width: 600px;
}

.pageSection {
    margin-bottom: 120px;
    scroll-margin-top: 40px;
}

.pageHeader {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    border-bottom: 2px solid #1c1c1c;
    padding-bottom: 8px;
}

.categoryTag {
    font-size: 0.75rem;
    font-weight: 800;
    letter-spacing: 0.05em;
    color: #1c1c1c;
}

.pageIdentifier {
    font-size: 0.75rem;
    font-weight: 700;
    color: #c62828;
}

.contentCard {
    background: #fdfcf8 !important;
    border: 1px solid rgba(0, 0, 0, 0.08) !important;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.06) !important;
    padding: 56px !important;
}

.sectionTitle {
    font-family: "Noto Serif KR", serif;
    font-size: 2.25rem;
    font-weight: 700;
    margin-bottom: 40px;
    color: #1c1c1c;
}

.textContent p {
    margin-bottom: 24px;
    line-height: 1.8;
    font-size: 1.05rem;
    color: #333;
    text-align: justify;
}

.visualBox {
    border: 2px solid #1c1c1c;
    padding: 32px;
    margin: 40px 0;
}

.visualTitle {
    font-family: "Noto Serif KR", serif;
    font-weight: 700;
    font-size: 1.1rem;
    margin-bottom: 24px;
    color: #1c1c1c;
}

.placeholder {
    height: 180px;
    background: rgba(0, 0, 0, 0.02);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 0.85rem;
    color: rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(0, 0, 0, 0.05);
    border-radius: 4px;
    gap: 0.5rem;
}

.placeholder::before {
    content: "SERVICE PREPARING";
    font-weight: 800;
    font-size: 0.7rem;
    letter-spacing: 0.1em;
    opacity: 0.5;
}

.disclaimerSection {
    margin-top: 120px;
    padding-top: 40px;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    color: rgba(0, 0, 0, 0.5);
}

.disclaimerSection p {
    font-size: 0.85rem;
    margin-bottom: 8px;
    line-height: 1.6;
}

.disclaimerEn {
    font-size: 0.75rem !important;
    font-style: italic;
}

.mobileNavTrigger {
    display: none;
}

@media (max-width: 1024px) {
    .sidebar {
        display: none;
    }

    .sidebarOpen {
        display: flex;
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 1000;
        background: #f7f5f0;
    }

    .mobileNavTrigger {
        display: block;
        position: fixed;
        bottom: 24px;
        right: 24px;
        z-index: 900;
        background: #1c1c1c;
        color: #fff;
        padding: 12px 24px;
        border-radius: 40px;
        font-weight: 700;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    }

    .mainTitle {
        font-size: 2.25rem;
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

/* Phase 26: Action Buttons */
.actionButtons {
    display: flex;
    gap: 1rem;
    margin-top: 1.5rem;
}

.pdfButton,
.calendarButton {
    padding: 0.75rem 1.5rem;
    font-size: 0.9rem;
    font-weight: 600;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s;
}

.pdfButton {
    background-color: #1c1c1c;
    color: #fff;
}

.pdfButton:hover {
    background-color: #333;
}

.calendarButton {
    background-color: #fff;
    color: #1c1c1c;
    border: 1px solid #1c1c1c;
}

.calendarButton:hover {
    background-color: #f7f5f0;
}

/* Phase 26: Reason Cards */
.reasonCardsContainer {
    margin-top: 2rem;
    padding-top: 2rem;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.reasonCardsTitle {
    font-size: 0.9rem;
    font-weight: 700;
    color: #c62828;
    margin-bottom: 1rem;
}

.reasonCard {
    background-color: rgba(198, 40, 40, 0.02);
    border-left: 3px solid #c62828;
    padding: 1rem;
    margin-bottom: 1rem;
}

.reasonCard h4 {
    font-size: 0.9rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: #1c1c1c;
}

.reasonCard p {
    font-size: 0.85rem;
    color: rgba(0, 0, 0, 0.7);
    line-height: 1.6;
}

/* Phase 26: Print Optimization */
@media print {
    .reportPage {
        background: #fff;
        padding: 0;
    }

    .sidebar,
    .mobileNavTrigger,
    .closeBtn,
    .actionButtons,
    .shareActions {
        display: none !important;
    }

    .mainLayout {
        grid-template-columns: 1fr;
        padding: 0;
        margin: 0;
    }

    .reportContent {
        max-width: 100%;
        padding: 0;
    }

    .pageSection {
        page-break-inside: avoid;
        page-break-after: auto;
        margin-bottom: 2rem;
    }

    .contentCard {
        box-shadow: none;
        border: 1px solid #ddd;
    }

    .visualBox {
        page-break-inside: avoid;
        max-width: 100%;
        overflow: hidden;
    }

    .disclaimerSection {
        page-break-before: always;
        margin-top: 2rem;
    }

    @page {
        size: A4;
        margin: 20mm;
    }
}

/* Print Mode Class */
.printMode .sidebar,
.printMode .mobileNavTrigger,
.printMode .actionButtons {
    display: none;
}

.printMode .mainLayout {
    grid-template-columns: 1fr;
}

/* Phase 27: Legacy Warning Styles */
.legacyWarning {
    padding: 80px 20px;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.legacyCard {
    max-width: 600px;
    text-align: center;
}

.legacyTitle {
    font-size: 2rem;
    font-weight: 700;
    color: #c62828;
    margin-bottom: 1.5rem;
}

.legacyText {
    font-size: 1.1rem;
    line-height: 1.6;
    color: #333;
    margin-bottom: 1rem;
}

.legacyFeatures {
    list-style: none;
    padding: 0;
    margin: 2rem 0;
    text-align: left;
}

.legacyFeatures li {
    font-size: 1rem;
    padding: 0.5rem 0;
    color: #1c1c1c;
}

.regenerateButton {
    padding: 1rem 2rem;
    font-size: 1.1rem;
    font-weight: 700;
    background-color: #c62828;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s;
    margin-top: 1rem;
}

.regenerateButton:hover {
    background-color: #a52020;
    transform: translateY(-2px);
}

/* Phase 27: 3단 블록 스타일 */
.sectionBlock {
    margin: 32px 0;
    padding: 24px 0;
    border-top: 1px solid rgba(28, 28, 28, 0.1);
}

.sectionBlock:first-child {
    border-top: none;
    padding-top: 0;
}

.blockTitle {
    font-size: 1.1rem;
    font-weight: 700;
    color: #c62828;
    margin-bottom: 16px;
    padding-bottom: 8px;
    border-bottom: 2px solid rgba(198, 40, 40, 0.2);
    letter-spacing: -0.01em;
}

@media print {
    .sectionBlock {
        page-break-inside: avoid;
        margin: 24px 0;
    }

    .blockTitle {
        page-break-after: avoid;
    }
}
```

---

## File 6: `src/pages/Report.tsx` {#file-6}

**크기**: 17.04 KB | **확장자**: tsx

```tsx
/* eslint-disable @tantml:query/no-window-matchmedia */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { dbInstance as db } from '../lib/firebase';
import { Container } from '../components/layout/Container';
import { Header } from '../components/layout/Header';
import { Card } from '../components/ui/Card';
import { ShareActions } from '../components/share/ShareActions';
import { openPrintWindow } from '../lib/pdf';
import { ReasonCards } from '../components/report/ReasonCards';
import { LuckCalendar } from '../components/report/LuckCalendar';
import type { Section } from '../types/report';
import styles from './Report.module.css';

/**
 * Report Page v4.0.0 (Phase 26)
 * 1. 크래시 수정: 완전한 섹션 정규화 + safeSplitId
 * 2. PDF 저장: 인쇄 페이지 오픈 버튼
 * 3. 운기 캘린더: 진입 UI (모달 연동)
 * 4. Reason Cards: 섹션별 근거 카드 렌더링
 */

/**
 * System Audit Report Visual Components
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

/**
 * Data Hardening Helpers (Phase 26)
 */
const normalizeSection = (s: any, index: number): Section => {
    let id = typeof s?.id === 'string' ? s.id.trim() : String(s?.id ?? "");
    const title = typeof s?.title === 'string' ? s.title.trim() : String(s?.title ?? "제목 없음");
    const category = typeof s?.category === 'string' ? s.category.trim() : "ANALYSIS";

    // Phase 27: Preserving 3-tier structure
    const result = typeof s?.result === 'string' ? s.result : undefined;
    const explain = typeof s?.explain === 'string' ? s.explain : undefined;
    const interpretation = typeof s?.interpretation === 'string' ? s.interpretation : undefined;

    // Synthesize content for legacy display if needed
    let content = typeof s?.content === 'string' ? s.content : "";
    if (!content && (result || explain || interpretation)) {
        content = [result, explain, interpretation].filter(Boolean).join("\n\n");
    }

    if (!id || id.length === 0) {
        id = `unknown_${index}`;
    }

    id = id.replace(/[^a-zA-Z0-9_-]/g, '_');

    return {
        id,
        title,
        content,
        category,
        result,
        explain,
        interpretation,
        type: s?.type,
        reasonCards: s?.reasonCards || []
    };
};

const normalizeSections = (input: any, toc?: any[]): Section[] => {
    let rawSections: Section[] = [];

    if (Array.isArray(input)) { rawSections = input.map((s, i) => normalizeSection(s, i)); }
    else if (input && typeof input === 'object') { rawSections = Object.values(input).map((s, i) => normalizeSection(s, i)); }

    if (!toc || !Array.isArray(toc)) return rawSections;

    // Phase 27: Strict ordering by Table of Contents
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

    // Append any sections not in TOC
    rawSections.forEach(s => {
        if (!seenIds.has(s.id)) ordered.push(s);
    });

    return ordered;
};

const safeSplitId = (id: string): string[] => {
    if (typeof id !== 'string') {
        return ['??'];
    }
    if (!id.includes('_')) {
        return [id];
    }
    return id.split('_');
};


// Phase 27: Category 한글 매핑
const CATEGORY_LABELS: Record<string, string> = {
    SUMMARY: '요약',
    ARCH: '아키텍처',
    SPEC: '명세',
    SYSTEM: '시스템',
    CORE: '코어',
    RESOURCE: '리소스',
    DEBUG: '디버그',
    SECURITY: '보안',
    APP: '애플리케이션',
    STRATEGY: '전략',
    NETWORK: '네트워크',
    STATUS: '상태',
    ROADMAP: '로드맵',
    PATCH: '패치',
    META: '메타'
};

export const Report: React.FC = () => {
    const { reportId } = useParams<{ reportId: string }>();
    const navigate = useNavigate();

    const [reportData, setReportData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
    const [showCalendar, setShowCalendar] = useState(false);

    // [D3] Firestore 데이터 Fetch (Phase 27: Version Gate)
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
                    const data = docSnap.data();

                    // Phase 27: 버전 게이트 - v6 미만은 구버전으로 표시
                    if (data.schemaVersion !== "report/v6") {
                        setReportData({ ...data, isLegacy: true });
                    } else {
                        setReportData(data);
                    }
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

    // [D3] 동적 섹션 구성 (정규화 적용)
    const activeSections = useMemo(() => {
        return normalizeSections(reportData?.sections, reportData?.tableOfContents);
    }, [reportData]);

    const scrollToSection = useCallback((id: string) => {
        const element = document.getElementById(`page-${id}`);
        if (element) {
            element.scrollIntoView({
                behavior: prefersReducedMotion ? 'auto' : 'smooth'
            });
            setIsMenuOpen(false);
        }
    }, [prefersReducedMotion]);

    const handlePdfExport = useCallback(() => {
        if (reportId) {
            openPrintWindow(reportId);
        }
    }, [reportId]);

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

    // Phase 27: 구버전 리포트 차단
    if (reportData?.isLegacy) {
        return (
            <div className={styles.reportPage}>
                <Header lockupDisplay="en_name" />
                <Container className={styles.legacyWarning}>
                    <Card className={styles.legacyCard}>
                        <h2 className={styles.legacyTitle}>⚠️ 구버전 리포트입니다</h2>
                        <p className={styles.legacyText}>
                            이 리포트는 이전 버전(Genesis-V1.2~V5.0)으로 생성되었습니다.
                        </p>
                        <p className={styles.legacyText}>
                            Phase 27 업그레이드가 적용된 최신 리포트를 생성하려면 아래 버튼을 클릭하세요.
                        </p>
                        <ul className={styles.legacyFeatures}>
                            <li>✅ 100% 한글 UI</li>
                            <li>✅ A4 인쇄 30페이지 이상</li>
                            <li>✅ 결과-풀이-해석 3단 구조</li>
                            <li>✅ 365일 운기 캘린더</li>
                            <li>✅ Reason Cards 시스템</li>
                        </ul>
                        <button onClick={() => navigate('/start')} className={styles.regenerateButton}>
                            새로 분석하기
                        </button>
                    </Card>
                </Container>
            </div>
        );
    }

    return (
        <div className={styles.reportPage}>
            <Header lockupDisplay="en_name" />

            <Container className={styles.mainLayout}>
                {/* 동적 INDEX 사이드바 */}
                <aside className={`${styles.sidebar} ${isMenuOpen ? styles.sidebarOpen : ''}`}>
                    <div className={styles.sidebarHeader}>
                        <h3>감사 목차</h3>
                        <button className={styles.closeBtn} onClick={() => setIsMenuOpen(false)}>✕</button>
                    </div>
                    <nav className={styles.nav}>
                        {activeSections.map((section) => {
                            const tokens = safeSplitId(section.id);
                            const pageNum = tokens[0] || '??';

                            return (
                                <button
                                    key={section.id}
                                    className={styles.navItem}
                                    onClick={() => scrollToSection(section.id)}
                                >
                                    <span className={styles.pageNum}>{pageNum}</span>
                                    <span className={styles.pageTitle}>{section.title}</span>
                                </button>
                            );
                        })}
                    </nav>
                </aside>

                <button className={styles.mobileNavTrigger} onClick={() => setIsMenuOpen(true)}>
                    INDEX
                </button>

                <main className={styles.reportContent}>
                    <header className={styles.reportHeader}>
                        <h1 className={styles.mainTitle}>
                            {reportData?.reportMeta?.title || "SYSTEM AUDIT v5.0"}
                        </h1>
                        <p className={styles.mainSummary}>{reportData?.reportMeta?.summary}</p>

                        {/* Phase 26: Action Buttons */}
                        <div className={styles.actionButtons}>
                            <button className={styles.pdfButton} onClick={handlePdfExport}>
                                PDF 저장
                            </button>
                            <button className={styles.calendarButton} onClick={() => setShowCalendar(true)}>
                                운기 캘린더
                            </button>
                        </div>
                    </header>

                    <ShareActions />

                    {activeSections.map((section) => (
                        <section
                            key={section.id}
                            id={`page-${section.id}`}
                            className={styles.pageSection}
                        >
                            <div className={styles.pageHeader}>
                                <span className={styles.categoryTag}>
                                    {CATEGORY_LABELS[section.category] || section.category}
                                </span>
                                <span className={styles.pageIdentifier}>섹션: {section.id}</span>
                            </div>

                            <Card className={styles.contentCard}>
                                <h2 className={styles.sectionTitle}>{section.title}</h2>

                                {section.id === "02_code" && <GenesisCodeVisual />}
                                {section.id === "07_balance" && <BalanceRadarVisual />}

                                {section.id !== "02_code" && section.id !== "07_balance" && (
                                    <>
                                        {/* Phase 27: 3단 구조 렌더링 */}
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
                                                {section.reasonCards && section.reasonCards.length > 0 && (
                                                    <ReasonCards cards={section.reasonCards} />
                                                )}
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

                                        {/* Legacy support */}
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
            </Container>

            {/* Phase 26: Luck Calendar Modal */}
            {showCalendar && reportId && (
                <LuckCalendar reportId={reportId} onClose={() => setShowCalendar(false)} />
            )}
        </div>
    );
};

```

---

## File 7: `src/pages/ReportPrint.tsx` {#file-7}

**크기**: 9.20 KB | **확장자**: tsx

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

    const result = typeof s?.result === 'string' ? s.result : undefined;
    const explain = typeof s?.explain === 'string' ? s.explain : undefined;
    const interpretation = typeof s?.interpretation === 'string' ? s.interpretation : undefined;

    let content = typeof s?.content === 'string' ? s.content : "";
    if (!content && (result || explain || interpretation)) {
        content = [result, explain, interpretation].filter(Boolean).join("\n\n");
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

## File 8: `src/pages/Start.module.css` {#file-8}

**크기**: 3.15 KB | **확장자**: css

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

## File 9: `src/pages/Start.tsx` {#file-9}

**크기**: 12.72 KB | **확장자**: tsx

```tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '../components/layout/Container';
import { Card } from '../components/ui/Card';
import { Header } from '../components/layout/Header';
import { detectScriptType } from '../lib/text';
import styles from './Start.module.css';

interface FormData {
    userName: string;
    birthDate: string;
    birthTime: string;
    timeUnknown: boolean;
    sex: 'male' | 'female' | '';
    calendar: 'solar' | 'lunar' | '';
    isLeapMonth: boolean;
    timezone: 'Asia/Seoul';
}

interface Errors {
    userName?: string;
    birthDate?: string;
    sex?: string;
    calendar?: string;
}

export const Start: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<FormData>({
        userName: '',
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

        if (!name || name === 'userName') {
            const trimmed = formData.userName.trim();
            if (trimmed.length === 1) {
                newErrors.userName = '이름은 최소 2자 이상이어야 합니다.';
            } else if (trimmed.length > 20) {
                newErrors.userName = '이름은 최대 20자까지 입력 가능합니다.';
            } else {
                delete newErrors.userName;
            }
        }

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
            const trimmedName = formData.userName.trim();
            const payload: any = {
                birthDate: formData.birthDate,
                birthTime: formData.birthTime,
                timeUnknown: formData.timeUnknown,
                sex: formData.sex,
                calendar: formData.calendar,
                isLeapMonth: formData.isLeapMonth,
                timezone: formData.timezone
            };

            // Only include userName and scriptType if name is provided
            if (trimmedName.length > 0) {
                payload.userName = trimmedName;
                payload.scriptType = detectScriptType(trimmedName);
            }

            navigate('/processing', { state: payload });
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
                        {/* Name */}
                        <div className={styles.field}>
                            <label htmlFor="userName" className={styles.label}>성명 (한자 권장, 한글 가능)</label>
                            <input
                                type="text"
                                id="userName"
                                name="userName"
                                value={formData.userName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="예: 洪吉童 또는 홍길동"
                                className={`${styles.input} ${touched.userName && errors.userName ? styles.inputError : ''}`}
                            />
                            {touched.userName && errors.userName && (
                                <span className={styles.errorMsg}>{errors.userName}</span>
                            )}
                        </div>

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


```

---

---

**Part 3/10 완료**

[← 인덱스로 돌아가기](./INDEX.md) | [← Part 2](./codebase_part_02.md) | [Part 4 →](./codebase_part_04.md)
```

---

## File 7: `codebase_docs/codebase_part_04.md` {#file-7}

**크기**: 68.03 KB | **확장자**: md

```md
# 📦 프로젝트 코드베이스 - Part 4/10

> 생성일: 2026. 1. 3. 오후 10:52:25

[← 인덱스로 돌아가기](./INDEX.md)

## 📋 이 파트의 파일 목록

- `project_docs_structured/frontend-components.md`
- `project_docs_structured/config-root.md`
- `src/pages/Home.tsx`
- `scripts/generate-design-docs.cjs`
- `scripts/ci-gate.cjs`
- `src/components/layout/Header.tsx`
- `src/types/report.ts`
- `src/components/layout/Footer.module.css`
- `src/components/ui/ContextBox.tsx`
- `src/components/layout/Container.tsx`
- `src/main.tsx`

---

## 📄 파일 내용

## 📄 project_docs_structured/frontend-components.md

```markdown
# Frontend - Components

> 재사용 가능한 UI 컴포넌트 (layout, ui, report, share 등)

**생성 시각**: 2026-01-03T09:38:11.819Z

---

## 📋 목차 (22개 파일)

1. [src/components/common/BrandLockup.tsx](#file-1)
2. [src/components/layout/Container.module.css](#file-2)
3. [src/components/layout/Container.tsx](#file-3)
4. [src/components/layout/Footer.module.css](#file-4)
5. [src/components/layout/Footer.tsx](#file-5)
6. [src/components/layout/Header.module.css](#file-6)
7. [src/components/layout/Header.tsx](#file-7)
8. [src/components/layout/PaperBackground.module.css](#file-8)
9. [src/components/layout/PaperBackground.tsx](#file-9)
10. [src/components/report/LuckCalendar.module.css](#file-10)
11. [src/components/report/LuckCalendar.tsx](#file-11)
12. [src/components/report/ReasonCards.module.css](#file-12)
13. [src/components/report/ReasonCards.tsx](#file-13)
14. [src/components/share/ShareActions.module.css](#file-14)
15. [src/components/share/ShareActions.tsx](#file-15)
16. [src/components/system/SecurityShield.tsx](#file-16)
17. [src/components/ui/AdviceBox.module.css](#file-17)
18. [src/components/ui/AdviceBox.tsx](#file-18)
19. [src/components/ui/Card.module.css](#file-19)
20. [src/components/ui/Card.tsx](#file-20)
21. [src/components/ui/ContextBox.module.css](#file-21)
22. [src/components/ui/ContextBox.tsx](#file-22)

---

## File 1: `src/components/common/BrandLockup.tsx` {#file-1}

**크기**: 1.52 KB | **확장자**: tsx

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

## File 2: `src/components/layout/Container.module.css` {#file-2}

**크기**: 0.27 KB | **확장자**: css

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

## File 3: `src/components/layout/Container.tsx` {#file-3}

**크기**: 0.46 KB | **확장자**: tsx

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

## File 4: `src/components/layout/Footer.module.css` {#file-4}

**크기**: 0.64 KB | **확장자**: css

```css
.footer {
    padding: 2rem 0;
    border-top: 1px solid var(--line);
    margin-top: auto;
    text-align: center;
    font-family: var(--font-sans);
    background: var(--bg);
    color: var(--muted);
    font-size: 0.75rem;
    line-height: 1.6;
}

.container {
    max-width: var(--container-width);
    margin: 0 auto;
    padding: 0 var(--space-md);
}

.copyright {
    font-weight: 500;
    letter-spacing: 0.02em;
    margin-bottom: 0.25rem;
}

.companyInfo {
    opacity: 0.8;
}

.divider {
    margin: 0 0.5rem;
    opacity: 0.3;
}

@media (max-width: 480px) {
    .footer {
        padding: 1.5rem 0;
    }
}
```

---

## File 5: `src/components/layout/Footer.tsx` {#file-5}

**크기**: 0.64 KB | **확장자**: tsx

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

## File 6: `src/components/layout/Header.module.css` {#file-6}

**크기**: 2.69 KB | **확장자**: css

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

## File 7: `src/components/layout/Header.tsx` {#file-7}

**크기**: 1.91 KB | **확장자**: tsx

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

## File 8: `src/components/layout/PaperBackground.module.css` {#file-8}

**크기**: 0.86 KB | **확장자**: css

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

## File 9: `src/components/layout/PaperBackground.tsx` {#file-9}

**크기**: 0.54 KB | **확장자**: tsx

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

## File 10: `src/components/report/LuckCalendar.module.css` {#file-10}

**크기**: 5.54 KB | **확장자**: css

```css
.calendarModal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    padding: 2rem;
}

.modalContent {
    background-color: #f7f5f0;
    border: 2px solid #1c1c1c;
    border-radius: 8px;
    max-width: 1200px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    padding: 2rem;
}

.modalHeader {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid rgba(0, 0, 0, 0.1);
}

.modalHeader h2 {
    font-family: "Noto Serif KR", serif;
    font-size: 1.5rem;
    font-weight: 700;
    color: #1c1c1c;
}

.closeButton {
    background: none;
    border: none;
    font-size: 1.5rem;
    color: #1c1c1c;
    cursor: pointer;
    padding: 0.5rem;
    line-height: 1;
}

.closeButton:hover {
    color: #c62828;
}

.loadingState,
.errorState {
    text-align: center;
    padding: 3rem;
}

.loadingState p {
    font-size: 1rem;
    color: #1c1c1c;
    margin-bottom: 0.5rem;
}

.loadingHint {
    font-size: 0.85rem;
    color: rgba(0, 0, 0, 0.6);
}

.errorState p {
    font-size: 1rem;
    color: #c62828;
    margin-bottom: 1rem;
}

.calendarGrid {
    padding: 1rem;
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
    max-height: 60vh;
    overflow-y: auto;
}

.monthBox {
    border: 1px solid #eee;
    padding: 0.75rem;
    border-radius: 4px;
}

.monthTitle {
    font-size: 0.95rem;
    font-weight: 700;
    margin-bottom: 0.75rem;
    text-align: center;
    color: #1c1c1c;
}

.daysGrid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 2px;
}

.dayHead {
    font-size: 0.7rem;
    color: rgba(0, 0, 0, 0.5);
    text-align: center;
    padding-bottom: 0.25rem;
}

.dayCell {
    aspect-ratio: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 0.75rem;
    border-radius: 2px;
    cursor: pointer;
    transition: transform 0.1s;
    position: relative;
}

.dayCell:hover {
    transform: scale(1.1);
    z-index: 10;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.selectedCell {
    outline: 2px solid #1c1c1c;
    outline-offset: -2px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    transform: scale(1.1);
    z-index: 11;
}

.dayNum {
    font-weight: 600;
}

.dayScore {
    font-size: 0.6rem;
    opacity: 0.8;
}

/* 점수별 테마 */
.gradeGood {
    background-color: #e8f5e9;
    color: #2e7d32;
}

.gradeWarn {
    background-color: #fffde7;
    color: #fbc02d;
}

.gradeCaution {
    background-color: #ffebee;
    color: #c62828;
}

.emptyCell {
    visibility: hidden;
}

.detailPanel {
    margin-top: 1.5rem;
    background-color: #fdfcf8;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    min-height: 180px;
}

.noSelection {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 180px;
    color: rgba(0, 0, 0, 0.4);
    font-size: 0.9rem;
    font-style: italic;
}

.detailCard {
    padding: 1.5rem;
}

.detailHeader {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding-bottom: 1rem;
    margin-bottom: 1rem;
    border-bottom: 1px dashed rgba(0, 0, 0, 0.1);
}

.detailTitle {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.detailDate {
    font-size: 1.1rem;
    font-weight: 700;
}

.detailGrade {
    font-size: 0.75rem;
    font-weight: 800;
    padding: 2px 8px;
    border-radius: 4px;
    width: fit-content;
}

.detailScore {
    font-size: 0.85rem;
    color: rgba(0, 0, 0, 0.6);
}

.detailScore strong {
    font-size: 1.5rem;
    color: #1c1c1c;
    margin-left: 4px;
}

.detailBody {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
}

.detailSection h5 {
    font-size: 0.85rem;
    font-weight: 700;
    color: #c62828;
    margin-bottom: 0.75rem;
}

.detailSection ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.detailSection li {
    font-size: 0.9rem;
    line-height: 1.5;
    color: #333;
    padding-left: 12px;
    position: relative;
    margin-bottom: 4px;
}

.detailSection li::before {
    content: "•";
    position: absolute;
    left: 0;
    color: #c62828;
}

.emptyMsg {
    font-size: 0.85rem;
    color: rgba(0, 0, 0, 0.4);
}

.modalFooter {
    margin-top: 1.5rem;
    padding-top: 1rem;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.legend {
    display: flex;
    gap: 1rem;
    font-size: 0.75rem;
}

.legendItem {
    display: flex;
    align-items: center;
    gap: 4px;
}

.dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
}

.generatedAt {
    font-size: 0.8rem;
    color: rgba(0, 0, 0, 0.6);
}

@media (max-width: 768px) {
    .calendarModal {
        padding: 0.5rem;
    }

    .modalContent {
        padding: 1rem;
        max-height: 95vh;
    }

    .calendarGrid {
        grid-template-columns: 1fr;
    }

    .detailBody {
        grid-template-columns: 1fr;
        gap: 1rem;
    }
}
```

---

## File 11: `src/components/report/LuckCalendar.tsx` {#file-11}

**크기**: 10.68 KB | **확장자**: tsx

```tsx
import React, { useState } from 'react';
import { httpsCallable } from 'firebase/functions';
import { functionsKR as functions } from '../../lib/firebase';
import type { LuckCalendar as LuckCalendarData } from '../../types/report';
import styles from './LuckCalendar.module.css';

interface LuckCalendarProps {
    reportId: string;
    onClose: () => void;
}

/**
 * LuckCalendar Component (Phase 27)
 * Displays 365-day luck calendar with scores, tags, and reason cards
 * CORS fix: Forces asia-northeast3 region via functionsKR
 */
export const LuckCalendar: React.FC<LuckCalendarProps> = ({ reportId, onClose }) => {
    const [loading, setLoading] = useState(false);
    const [calendarData, setCalendarData] = useState<LuckCalendarData | null>(null);
    const [selectedYear] = useState(new Date().getFullYear());
    const [selectedDay, setSelectedDay] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    // Phase 27: Cross-platform Date Parser (ISO String or Firestore Timestamp)
    const parseGeneratedAt = (val: any): string => {
        if (!val) return '-';
        try {
            // ISO String case
            if (typeof val === 'string') return new Date(val).toLocaleString('ko-KR');

            // Firestore Timestamp object case (seconds, _seconds)
            const seconds = val.seconds || val._seconds;
            if (seconds) return new Date(seconds * 1000).toLocaleString('ko-KR');

            const d = new Date(val);
            if (isNaN(d.getTime())) return '-';
            return d.toLocaleString('ko-KR');
        } catch (e) {
            return '-';
        }
    };

    const loadCalendar = async () => {
        setLoading(true);
        setError(null);

        try {
            console.log(`[LuckCalendar] Requesting calendar for ReportID: ${reportId}, Year: ${selectedYear}`);
            // Phase 27: Authoritative KR Region Instance (functionsKR)
            const generateLuckCalendar = httpsCallable<
                { reportId: string; year: number },
                LuckCalendarData
            >(functions, 'generateLuckCalendar');

            const result = await generateLuckCalendar({ reportId, year: selectedYear });
            setCalendarData(result.data);

            // Auto-select today if exists
            const todayStr = new Date().toISOString().split('T')[0];
            const todayData = result.data.calendar.find(d => d.date === todayStr);
            if (todayData) setSelectedDay(todayData);

        } catch (err: any) {
            console.error('[LuckCalendar] Failed:', {
                code: err.code,
                message: err.message,
                details: err.details,
                stack: err.stack
            });
            const detailedError = err.details
                ? `${err.message} (${JSON.stringify(err.details)})`
                : err.message || '캘린더 생성 중 알 수 없는 오류가 발생했습니다.';
            setError(`[${err.code || 'INTERNAL'}] ${detailedError}`);
        } finally {
            setLoading(false);
        }
    };

    // Phase 27: Fix dependency array
    React.useEffect(() => {
        loadCalendar();
    }, [reportId, selectedYear]);

    // Render helper for a single month
    const renderMonth = (monthIndex: number) => {
        if (!calendarData) return null;

        // Current month days from 365 days array
        const monthDays = calendarData.calendar.filter(d => {
            const date = new Date(d.date);
            return date.getMonth() === monthIndex;
        });

        if (monthDays.length === 0) return null;

        const firstDay = new Date(monthDays[0].date);
        const startOffset = firstDay.getDay(); // 0 (Sun) to 6 (Sat)

        const monthName = `${monthIndex + 1}월`;

        return (
            <div key={monthIndex} className={styles.monthBox}>
                <h4 className={styles.monthTitle}>{monthName}</h4>
                <div className={styles.daysGrid}>
                    {['일', '월', '화', '수', '목', '금', '토'].map(d => (
                        <div key={d} className={styles.dayHead}>{d}</div>
                    ))}

                    {/* Empty cells for offset */}
                    {Array.from({ length: startOffset }).map((_, i) => (
                        <div key={`empty-${i}`} className={styles.emptyCell} />
                    ))}

                    {/* Day cells */}
                    {monthDays.map(day => {
                        const date = new Date(day.date);
                        const dayNum = date.getDate();
                        const isSelected = selectedDay && selectedDay.date === day.date;
                        const gradeClass =
                            day.grade === "GOOD" ? styles.gradeGood :
                                day.grade === "WARN" ? styles.gradeWarn :
                                    styles.gradeCaution;

                        return (
                            <div
                                key={day.date}
                                className={`${styles.dayCell} ${gradeClass} ${isSelected ? styles.selectedCell : ''}`}
                                onClick={() => setSelectedDay(day)}
                            >
                                <span className={styles.dayNum}>{dayNum}</span>
                                <span className={styles.dayScore}>{day.score}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    if (loading) {
        return (
            <div className={styles.calendarModal}>
                <div className={styles.modalContent}>
                    <div className={styles.loadingState}>
                        <p>운기 캘린더 생성 중...</p>
                        <p className={styles.loadingHint}>최초 생성 시 최대 2분 소요될 수 있습니다.</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.calendarModal}>
                <div className={styles.modalContent}>
                    <div className={styles.errorState}>
                        <p>오류: {error}</p>
                        <button onClick={onClose} className={styles.closeButton}>닫기</button>
                    </div>
                </div>
            </div>
        );
    }

    if (!calendarData) {
        return null;
    }

    return (
        <div className={styles.calendarModal} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <h2>{selectedYear}년 운기 캘린더</h2>
                    <button onClick={onClose} className={styles.closeButton}>✕</button>
                </div>

                <div className={styles.calendarGrid}>
                    {Array.from({ length: 12 }).map((_, i) => renderMonth(i))}
                </div>

                {/* 상세 설명 패널 */}
                <div className={styles.detailPanel}>
                    {selectedDay ? (
                        <div className={styles.detailCard}>
                            <div className={styles.detailHeader}>
                                <div className={styles.detailTitle}>
                                    <span className={styles.detailDate}>{selectedDay.date}</span>
                                    <span className={`${styles.detailGrade} ${selectedDay.grade === "GOOD" ? styles.gradeGood :
                                        selectedDay.grade === "WARN" ? styles.gradeWarn : styles.gradeCaution
                                        }`}>
                                        {selectedDay.grade === "GOOD" ? "최적화" : selectedDay.grade === "WARN" ? "부하 발생" : "충돌 주의"}
                                    </span>
                                </div>
                                <div className={styles.detailScore}>
                                    점수: <strong>{selectedDay.score}</strong>
                                </div>
                            </div>

                            <div className={styles.detailBody}>
                                <div className={styles.detailSection}>
                                    <h5>분석 근거</h5>
                                    {selectedDay.reasons && selectedDay.reasons.length > 0 ? (
                                        <ul>{selectedDay.reasons.map((r: string, i: number) => <li key={i}>{r}</li>)}</ul>
                                    ) : <p className={styles.emptyMsg}>설명 데이터가 없습니다(서버 출력 확인 필요)</p>}
                                </div>
                                <div className={styles.detailSection}>
                                    <h5>권장 수칙</h5>
                                    {selectedDay.actionPlan && selectedDay.actionPlan.length > 0 ? (
                                        <ul>{selectedDay.actionPlan.map((a: string, i: number) => <li key={i}>{a}</li>)}</ul>
                                    ) : <p className={styles.emptyMsg}>권장 수칙 데이터가 없습니다</p>}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className={styles.noSelection}>날짜를 클릭하면 상세 분석 리포트가 표시됩니다.</div>
                    )}
                </div>

                <div className={styles.modalFooter}>
                    <div className={styles.legend}>
                        <div className={styles.legendItem}>
                            <div className={`${styles.dot} ${styles.gradeGood}`} />
                            <span>최적화 (70+)</span>
                        </div>
                        <div className={styles.legendItem}>
                            <div className={`${styles.dot} ${styles.gradeWarn}`} />
                            <span>부하 발생 (40-69)</span>
                        </div>
                        <div className={styles.legendItem}>
                            <div className={`${styles.dot} ${styles.gradeCaution}`} />
                            <span>충돌 주의 (0-39)</span>
                        </div>
                    </div>
                    <p className={styles.generatedAt}>
                        생성 시각: {parseGeneratedAt(calendarData.generatedAt)}
                    </p>
                </div>
            </div>
        </div>
    );
};


```

---

## File 12: `src/components/report/ReasonCards.module.css` {#file-12}

**크기**: 1.45 KB | **확장자**: css

```css
.reasonCardsContainer {
    margin-top: 3rem;
    padding-top: 2rem;
    border-top: 2px solid rgba(198, 40, 40, 0.15);
}

.sectionTitle {
    font-family: "Noto Serif KR", serif;
    font-size: 1.1rem;
    font-weight: 700;
    color: #c62828;
    margin-bottom: 1.5rem;
    letter-spacing: -0.01em;
}

.reasonCard {
    background-color: rgba(198, 40, 40, 0.02);
    border-left: 4px solid #c62828;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    border-radius: 0 4px 4px 0;
}

.cardTitle {
    font-family: "Noto Serif KR", serif;
    font-size: 1rem;
    font-weight: 600;
    color: #1c1c1c;
    margin-bottom: 1rem;
}

.evidenceSection,
.patchSection,
.riskSection {
    margin-top: 1rem;
}

.label {
    font-size: 0.85rem;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.6);
    margin-bottom: 0.5rem;
}

.evidenceList,
.patchList {
    margin: 0;
    padding-left: 1.5rem;
}

.evidenceList li,
.patchList li {
    font-size: 0.9rem;
    line-height: 1.7;
    color: rgba(0, 0, 0, 0.8);
    margin-bottom: 0.5rem;
}

.patchList li {
    font-weight: 500;
    color: #1c1c1c;
}

.riskText {
    font-size: 0.9rem;
    line-height: 1.7;
    color: rgba(198, 40, 40, 0.9);
    font-weight: 500;
}

@media print {
    .reasonCardsContainer {
        page-break-inside: avoid;
    }

    .reasonCard {
        page-break-inside: avoid;
        background-color: rgba(198, 40, 40, 0.05);
    }
}
```

---

## File 13: `src/components/report/ReasonCards.tsx` {#file-13}

**크기**: 2.26 KB | **확장자**: tsx

```tsx
import React from 'react';
import type { ReasonCard } from '../../types/report';
import styles from './ReasonCards.module.css';

interface ReasonCardsProps {
    cards: ReasonCard[];
}

/**
 * ReasonCards Component (Phase 26)
 * Renders reason cards with Technical Ink style
 * - title, evidence, patchCode, riskIfIgnored
 */
export const ReasonCards: React.FC<ReasonCardsProps> = ({ cards }) => {
    if (!cards || cards.length === 0) {
        return null;
    }

    return (
        <div className={styles.reasonCardsContainer}>
            <h3 className={styles.sectionTitle}>근거 카드 (Reason Cards)</h3>
            {cards.map((card, index) => (
                <div key={index} className={styles.reasonCard}>
                    <h4 className={styles.cardTitle}>{card.title}</h4>

                    {card.evidence && card.evidence.length > 0 && (
                        <div className={styles.evidenceSection}>
                            <p className={styles.label}>근거 (Evidence):</p>
                            <ul className={styles.evidenceList}>
                                {card.evidence.map((item, idx) => (
                                    <li key={idx}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {card.patchCode && card.patchCode.length > 0 && (
                        <div className={styles.patchSection}>
                            <p className={styles.label}>수정 코드 (Action Plan):</p>
                            <ul className={styles.patchList}>
                                {card.patchCode.map((patch, idx) => (
                                    <li key={idx}>{patch}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {card.riskIfIgnored && (
                        <div className={styles.riskSection}>
                            <p className={styles.label}>무시 시 리스크:</p>
                            <p className={styles.riskText}>{card.riskIfIgnored}</p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

```

---

## File 14: `src/components/share/ShareActions.module.css` {#file-14}

**크기**: 1.65 KB | **확장자**: css

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

## File 15: `src/components/share/ShareActions.tsx` {#file-15}

**크기**: 3.41 KB | **확장자**: tsx

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

## File 16: `src/components/system/SecurityShield.tsx` {#file-16}

**크기**: 2.83 KB | **확장자**: tsx

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

## File 17: `src/components/ui/AdviceBox.module.css` {#file-17}

**크기**: 0.71 KB | **확장자**: css

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

## File 18: `src/components/ui/AdviceBox.tsx` {#file-18}

**크기**: 0.57 KB | **확장자**: tsx

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

## File 19: `src/components/ui/Card.module.css` {#file-19}

**크기**: 0.54 KB | **확장자**: css

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

## File 20: `src/components/ui/Card.tsx` {#file-20}

**크기**: 0.46 KB | **확장자**: tsx

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

## File 21: `src/components/ui/ContextBox.module.css` {#file-21}

**크기**: 0.57 KB | **확장자**: css

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

## File 22: `src/components/ui/ContextBox.tsx` {#file-22}

**크기**: 0.57 KB | **확장자**: tsx

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


```

---

## 📄 project_docs_structured/config-root.md

```markdown
# Configuration - Root

> 프로젝트 루트 설정 파일 (package.json, vite.config, firebase 등)

**생성 시각**: 2026-01-03T09:38:11.861Z

---

## 📋 목차 (11개 파일)

1. [.firebaserc](#file-1)
2. [.gitignore](#file-2)
3. [eslint.config.js](#file-3)
4. [firebase.json](#file-4)
5. [firestore.indexes.json](#file-5)
6. [firestore.rules](#file-6)
7. [package.json](#file-7)
8. [tsconfig.app.json](#file-8)
9. [tsconfig.json](#file-9)
10. [tsconfig.node.json](#file-10)
11. [vite.config.ts](#file-11)

---

## File 1: `.firebaserc` {#file-1}

**크기**: 0.06 KB | **확장자**: txt

```txt
{
  "projects": {
    "default": "myungri-genesis"
  }
}

```

---

## File 2: `.gitignore` {#file-2}

**크기**: 0.29 KB | **확장자**: txt

```txt
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
. e n v . p r o d u c t i o n . l o c a l  
 
```

---

## File 3: `eslint.config.js` {#file-3}

**크기**: 0.60 KB | **확장자**: js

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

## File 4: `firebase.json` {#file-4}

**크기**: 1.17 KB | **확장자**: json

```json
{
    "firestore": {
        "rules": "firestore.rules",
        "indexes": "firestore.indexes.json"
    },
    "functions": [
        {
            "source": "functions",
            "predeploy": [
                "npm --prefix \"$RESOURCE_DIR\" run build"
            ],
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

## File 5: `firestore.indexes.json` {#file-5}

**크기**: 0.05 KB | **확장자**: json

```json
{
    "indexes": [],
    "fieldOverrides": []
}
```

---

## File 6: `firestore.rules` {#file-6}

**크기**: 0.63 KB | **확장자**: rules

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

## File 7: `package.json` {#file-7}

**크기**: 1.06 KB | **확장자**: json

```json
{
  "name": "myungri-the-genesis",
  "author": "KS Company <suhachi78@gmail.com>",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "prebuild": "node scripts/check-env.cjs",
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

## File 8: `tsconfig.app.json` {#file-8}

**크기**: 0.71 KB | **확장자**: json

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

## File 9: `tsconfig.json` {#file-9}

**크기**: 0.12 KB | **확장자**: json

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

## File 10: `tsconfig.node.json` {#file-10}

**크기**: 0.64 KB | **확장자**: json

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

## File 11: `vite.config.ts` {#file-11}

**크기**: 0.16 KB | **확장자**: ts

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})

```

---


```

---

## 📄 src/pages/Home.tsx

```tsx
import React from 'react';
import { Container } from '../components/layout/Container';
import { Card } from '../components/ui/Card';
import { ContextBox } from '../components/ui/ContextBox';
import { AdviceBox } from '../components/ui/AdviceBox';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';

export const Home: React.FC = () => {
    return (
        <div className={styles.home}>
            {/* Hero Section */}
            <section className={styles.hero}>
                <Container className={styles.heroGrid}>
                    <div className={styles.heroContent}>
                        <h1 className={styles.heroTitle}>命理: The Genesis</h1>
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
                        <div className={styles.astrolabeContainer}>
                            <svg className={styles.astrolabeSvg} viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="48" />
                                <circle cx="50" cy="50" r="30" />
                                <path d="M50 2 L50 98 M2 50 L98 50" />
                                <path d="M15 15 L85 85 M85 15 L15 85" />
                                <circle cx="50" cy="50" r="10" />
                            </svg>
                        </div>
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

## 📄 scripts/generate-design-docs.cjs

```javascript
const fs = require('fs');
const path = require('path');

// --- Configuration ---
const PROJECT_ROOT = path.resolve(__dirname, '..');
const OUTPUT_DIR = path.join(PROJECT_ROOT, 'project_docs');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'design_code_complete.md');

// Directories to focus on for "Design"
const DESIGN_PATHS = [
    'src/components',
    'src/pages',
    'src/styles',
    'src/config'
];

// Extensions to include
const ALLOW_EXTENSIONS = ['.tsx', '.css', '.module.css', '.ts'];

// Files to explicitly include even if not in DESIGN_PATHS
const SPECIFIC_FILES = [
    'index.html',
    'src/App.tsx',
    'src/main.tsx'
];

function ensureDir(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

function isDesignRelated(filePath) {
    const relativePath = path.relative(PROJECT_ROOT, filePath).replace(/\\/g, '/');

    // Check if it's in a design-related directory
    const isInDesignDir = DESIGN_PATHS.some(p => relativePath.startsWith(p));

    // Check if it's a specific file
    const isSpecific = SPECIFIC_FILES.includes(relativePath);

    // Check extension
    const ext = path.extname(filePath).toLowerCase();
    const isAllowedExt = ALLOW_EXTENSIONS.includes(ext);

    // Business logic exclusion: exclude calculation engine logic even if in src/config if it's not design
    if (relativePath.includes('engine') || relativePath.includes('functions/src')) {
        return false;
    }

    return (isInDesignDir || isSpecific) && isAllowedExt;
}

function getFileList(dir, fileList = []) {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            if (file !== 'node_modules' && !file.startsWith('.')) {
                getFileList(filePath, fileList);
            }
        } else {
            if (isDesignRelated(filePath)) {
                fileList.push(filePath);
            }
        }
    });

    return fileList;
}

function generateDesignMarkdown() {
    console.log(`🎨 Gathering design-related code from: ${PROJECT_ROOT}`);
    const files = getFileList(PROJECT_ROOT);
    console.log(`✨ Found ${files.length} design-related files.`);

    ensureDir(OUTPUT_DIR);

    let content = `# MYUNGRI: The Genesis - Full Design Code Documentation\n`;
    content += `Generated on: ${new Date().toLocaleString()}\n\n`;
    content += `> [!NOTE]\n`;
    content += `> This document contains all CSS, UI Components, Layouts, and Design Tokens.\n\n---\n`;

    for (const filePath of files) {
        const relativePath = path.relative(PROJECT_ROOT, filePath).replace(/\\/g, '/');
        try {
            const fileContent = fs.readFileSync(filePath, 'utf8');
            const ext = path.extname(filePath).substring(1) || 'text';

            content += `\n## File: ${relativePath}\n\n`;
            content += `\`\`\`${ext}\n${fileContent}\n\`\`\`\n\n---\n`;
        } catch (err) {
            console.error(`❌ Error reading ${relativePath}:`, err.message);
        }
    }

    fs.writeFileSync(OUTPUT_FILE, content, 'utf8');
    console.log(`✅ Success! Design documentation created at: ${OUTPUT_FILE}`);
}

generateDesignMarkdown();

```

---

## 📄 scripts/ci-gate.cjs

```javascript
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * [Zero Tolerance] CI Release Gate Script
 * 1. Pre-build: 환경 변수 엄격 검증 (check-env.cjs 재사용)
 * 2. Post-build: 빌드 결과물(Bundle) 내 필수 식별자(projectId 등) 존재 확인
 */

function runPreBuildCheck() {
    console.log('🚀 [CI Gate] Step 1: Pre-build Environment Validation...');
    try {
        execSync('node scripts/check-env.cjs', { stdio: 'inherit' });
    } catch (err) {
        console.error('❌ [CI Gate] Pre-build validation failed.');
        process.exit(1);
    }
}

function runPostBuildCheck() {
    console.log('🚀 [CI Gate] Step 2: Post-build Bundle Integrity Check...');
    const distPath = path.resolve(__dirname, '../dist');

    if (!fs.existsSync(distPath)) {
        console.error('❌ [CI Gate] Build directory (dist) not found. Run "npm run build" first.');
        process.exit(1);
    }

    // 번들 파일들 내에서 projectId가 실제로 포함되어 있는지 검색 (Vite define 검증)
    // 실제 projectId 값 대신 플레이스홀더나 빈 자리가 남지 않았는지 확인
    const assetsPath = path.join(distPath, 'assets');
    const files = fs.readdirSync(assetsPath).filter(f => f.endsWith('.js'));

    let projectIdFound = false;
    for (const file of files) {
        const content = fs.readFileSync(path.join(assetsPath, file), 'utf8');
        // projectId가 실제 빌드될 때 "myungri-genesis"와 같은 문자열로 박혔는지 확인
        // (참고: 빌드 시 환경변수는 문자열 리터럴로 치환됨)
        if (content.includes('myungri-genesis')) {
            projectIdFound = true;
            break;
        }
    }

    if (!projectIdFound) {
        console.error('❌ [CI Gate] INTEGRITY FAIL: "projectId" (myungri-genesis) was not detected in JS bundles.');
        console.error('👉 This indicates a failed Vite environment injection at build time.');
        process.exit(1);
    }

    console.log('✅ [CI Gate] Bundle integrity verified. "projectId" detected.');
}

function main() {
    const isPostBuild = process.argv.includes('--post-build');

    if (isPostBuild) {
        runPostBuildCheck();
    } else {
        runPreBuildCheck();
    }
}

main();

```

---

## 📄 src/components/layout/Header.tsx

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

## 📄 src/types/report.ts

```typescript
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

## 📄 src/components/layout/Footer.module.css

```css
.footer {
    padding: 2rem 0;
    border-top: 1px solid var(--line);
    margin-top: auto;
    text-align: center;
    font-family: var(--font-sans);
    background: var(--bg);
    color: var(--muted);
    font-size: 0.75rem;
    line-height: 1.6;
}

.container {
    max-width: var(--container-width);
    margin: 0 auto;
    padding: 0 var(--space-md);
}

.copyright {
    font-weight: 500;
    letter-spacing: 0.02em;
    margin-bottom: 0.25rem;
}

.companyInfo {
    opacity: 0.8;
}

.divider {
    margin: 0 0.5rem;
    opacity: 0.3;
}

@media (max-width: 480px) {
    .footer {
        padding: 1.5rem 0;
    }
}
```

---

## 📄 src/components/ui/ContextBox.tsx

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

## 📄 src/components/layout/Container.tsx

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

## 📄 src/main.tsx

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

---

**Part 4/10 완료**

[← 인덱스로 돌아가기](./INDEX.md) | [← Part 3](./codebase_part_03.md) | [Part 5 →](./codebase_part_05.md)
```

---

## File 8: `codebase_docs/codebase_part_05.md` {#file-8}

**크기**: 66.67 KB | **확장자**: md

```md
# 📦 프로젝트 코드베이스 - Part 5/10

> 생성일: 2026. 1. 3. 오후 10:52:25

[← 인덱스로 돌아가기](./INDEX.md)

## 📋 이 파트의 파일 목록

- `project_docs_structured/frontend-styles.md`
- `scripts/generate-full-codebase-docs.cjs`
- `scripts/generate-code-docs.cjs`
- `src/pages/Start.module.css`
- `src/components/layout/Header.module.css`
- `firestore-debug.log`
- `public/vite.svg`
- `src/components/layout/PaperBackground.module.css`
- `functions/package.json`
- `eslint.config.js`
- `src/config/tokens.ts`
- `.firebase/hosting.ZGlzdA.cache`

---

## 📄 파일 내용

## 📄 project_docs_structured/frontend-styles.md

```markdown
# Frontend - Styles

> 전역 스타일 및 CSS 모듈

**생성 시각**: 2026-01-03T09:38:11.843Z

---

## 📋 목차 (17개 파일)

1. [src/App.css](#file-1)
2. [src/App.module.css](#file-2)
3. [src/components/layout/Container.module.css](#file-3)
4. [src/components/layout/Footer.module.css](#file-4)
5. [src/components/layout/Header.module.css](#file-5)
6. [src/components/layout/PaperBackground.module.css](#file-6)
7. [src/components/report/LuckCalendar.module.css](#file-7)
8. [src/components/report/ReasonCards.module.css](#file-8)
9. [src/components/share/ShareActions.module.css](#file-9)
10. [src/components/ui/AdviceBox.module.css](#file-10)
11. [src/components/ui/Card.module.css](#file-11)
12. [src/components/ui/ContextBox.module.css](#file-12)
13. [src/index.css](#file-13)
14. [src/pages/Home.module.css](#file-14)
15. [src/pages/Processing.module.css](#file-15)
16. [src/pages/Report.module.css](#file-16)
17. [src/pages/Start.module.css](#file-17)

---

## File 1: `src/App.css` {#file-1}

**크기**: 0.04 KB | **확장자**: css

```css
/* App.css cleared for Genesis brand system */
```

---

## File 2: `src/App.module.css` {#file-2}

**크기**: 0.81 KB | **확장자**: css

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

## File 3: `src/components/layout/Container.module.css` {#file-3}

**크기**: 0.27 KB | **확장자**: css

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

## File 4: `src/components/layout/Footer.module.css` {#file-4}

**크기**: 0.64 KB | **확장자**: css

```css
.footer {
    padding: 2rem 0;
    border-top: 1px solid var(--line);
    margin-top: auto;
    text-align: center;
    font-family: var(--font-sans);
    background: var(--bg);
    color: var(--muted);
    font-size: 0.75rem;
    line-height: 1.6;
}

.container {
    max-width: var(--container-width);
    margin: 0 auto;
    padding: 0 var(--space-md);
}

.copyright {
    font-weight: 500;
    letter-spacing: 0.02em;
    margin-bottom: 0.25rem;
}

.companyInfo {
    opacity: 0.8;
}

.divider {
    margin: 0 0.5rem;
    opacity: 0.3;
}

@media (max-width: 480px) {
    .footer {
        padding: 1.5rem 0;
    }
}
```

---

## File 5: `src/components/layout/Header.module.css` {#file-5}

**크기**: 2.69 KB | **확장자**: css

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

## File 6: `src/components/layout/PaperBackground.module.css` {#file-6}

**크기**: 0.86 KB | **확장자**: css

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

## File 7: `src/components/report/LuckCalendar.module.css` {#file-7}

**크기**: 5.54 KB | **확장자**: css

```css
.calendarModal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    padding: 2rem;
}

.modalContent {
    background-color: #f7f5f0;
    border: 2px solid #1c1c1c;
    border-radius: 8px;
    max-width: 1200px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
    padding: 2rem;
}

.modalHeader {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid rgba(0, 0, 0, 0.1);
}

.modalHeader h2 {
    font-family: "Noto Serif KR", serif;
    font-size: 1.5rem;
    font-weight: 700;
    color: #1c1c1c;
}

.closeButton {
    background: none;
    border: none;
    font-size: 1.5rem;
    color: #1c1c1c;
    cursor: pointer;
    padding: 0.5rem;
    line-height: 1;
}

.closeButton:hover {
    color: #c62828;
}

.loadingState,
.errorState {
    text-align: center;
    padding: 3rem;
}

.loadingState p {
    font-size: 1rem;
    color: #1c1c1c;
    margin-bottom: 0.5rem;
}

.loadingHint {
    font-size: 0.85rem;
    color: rgba(0, 0, 0, 0.6);
}

.errorState p {
    font-size: 1rem;
    color: #c62828;
    margin-bottom: 1rem;
}

.calendarGrid {
    padding: 1rem;
    background-color: #fff;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
    max-height: 60vh;
    overflow-y: auto;
}

.monthBox {
    border: 1px solid #eee;
    padding: 0.75rem;
    border-radius: 4px;
}

.monthTitle {
    font-size: 0.95rem;
    font-weight: 700;
    margin-bottom: 0.75rem;
    text-align: center;
    color: #1c1c1c;
}

.daysGrid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 2px;
}

.dayHead {
    font-size: 0.7rem;
    color: rgba(0, 0, 0, 0.5);
    text-align: center;
    padding-bottom: 0.25rem;
}

.dayCell {
    aspect-ratio: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 0.75rem;
    border-radius: 2px;
    cursor: pointer;
    transition: transform 0.1s;
    position: relative;
}

.dayCell:hover {
    transform: scale(1.1);
    z-index: 10;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.selectedCell {
    outline: 2px solid #1c1c1c;
    outline-offset: -2px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    transform: scale(1.1);
    z-index: 11;
}

.dayNum {
    font-weight: 600;
}

.dayScore {
    font-size: 0.6rem;
    opacity: 0.8;
}

/* 점수별 테마 */
.gradeGood {
    background-color: #e8f5e9;
    color: #2e7d32;
}

.gradeWarn {
    background-color: #fffde7;
    color: #fbc02d;
}

.gradeCaution {
    background-color: #ffebee;
    color: #c62828;
}

.emptyCell {
    visibility: hidden;
}

.detailPanel {
    margin-top: 1.5rem;
    background-color: #fdfcf8;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    min-height: 180px;
}

.noSelection {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 180px;
    color: rgba(0, 0, 0, 0.4);
    font-size: 0.9rem;
    font-style: italic;
}

.detailCard {
    padding: 1.5rem;
}

.detailHeader {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding-bottom: 1rem;
    margin-bottom: 1rem;
    border-bottom: 1px dashed rgba(0, 0, 0, 0.1);
}

.detailTitle {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.detailDate {
    font-size: 1.1rem;
    font-weight: 700;
}

.detailGrade {
    font-size: 0.75rem;
    font-weight: 800;
    padding: 2px 8px;
    border-radius: 4px;
    width: fit-content;
}

.detailScore {
    font-size: 0.85rem;
    color: rgba(0, 0, 0, 0.6);
}

.detailScore strong {
    font-size: 1.5rem;
    color: #1c1c1c;
    margin-left: 4px;
}

.detailBody {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
}

.detailSection h5 {
    font-size: 0.85rem;
    font-weight: 700;
    color: #c62828;
    margin-bottom: 0.75rem;
}

.detailSection ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.detailSection li {
    font-size: 0.9rem;
    line-height: 1.5;
    color: #333;
    padding-left: 12px;
    position: relative;
    margin-bottom: 4px;
}

.detailSection li::before {
    content: "•";
    position: absolute;
    left: 0;
    color: #c62828;
}

.emptyMsg {
    font-size: 0.85rem;
    color: rgba(0, 0, 0, 0.4);
}

.modalFooter {
    margin-top: 1.5rem;
    padding-top: 1rem;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.legend {
    display: flex;
    gap: 1rem;
    font-size: 0.75rem;
}

.legendItem {
    display: flex;
    align-items: center;
    gap: 4px;
}

.dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
}

.generatedAt {
    font-size: 0.8rem;
    color: rgba(0, 0, 0, 0.6);
}

@media (max-width: 768px) {
    .calendarModal {
        padding: 0.5rem;
    }

    .modalContent {
        padding: 1rem;
        max-height: 95vh;
    }

    .calendarGrid {
        grid-template-columns: 1fr;
    }

    .detailBody {
        grid-template-columns: 1fr;
        gap: 1rem;
    }
}
```

---

## File 8: `src/components/report/ReasonCards.module.css` {#file-8}

**크기**: 1.45 KB | **확장자**: css

```css
.reasonCardsContainer {
    margin-top: 3rem;
    padding-top: 2rem;
    border-top: 2px solid rgba(198, 40, 40, 0.15);
}

.sectionTitle {
    font-family: "Noto Serif KR", serif;
    font-size: 1.1rem;
    font-weight: 700;
    color: #c62828;
    margin-bottom: 1.5rem;
    letter-spacing: -0.01em;
}

.reasonCard {
    background-color: rgba(198, 40, 40, 0.02);
    border-left: 4px solid #c62828;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    border-radius: 0 4px 4px 0;
}

.cardTitle {
    font-family: "Noto Serif KR", serif;
    font-size: 1rem;
    font-weight: 600;
    color: #1c1c1c;
    margin-bottom: 1rem;
}

.evidenceSection,
.patchSection,
.riskSection {
    margin-top: 1rem;
}

.label {
    font-size: 0.85rem;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.6);
    margin-bottom: 0.5rem;
}

.evidenceList,
.patchList {
    margin: 0;
    padding-left: 1.5rem;
}

.evidenceList li,
.patchList li {
    font-size: 0.9rem;
    line-height: 1.7;
    color: rgba(0, 0, 0, 0.8);
    margin-bottom: 0.5rem;
}

.patchList li {
    font-weight: 500;
    color: #1c1c1c;
}

.riskText {
    font-size: 0.9rem;
    line-height: 1.7;
    color: rgba(198, 40, 40, 0.9);
    font-weight: 500;
}

@media print {
    .reasonCardsContainer {
        page-break-inside: avoid;
    }

    .reasonCard {
        page-break-inside: avoid;
        background-color: rgba(198, 40, 40, 0.05);
    }
}
```

---

## File 9: `src/components/share/ShareActions.module.css` {#file-9}

**크기**: 1.65 KB | **확장자**: css

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

## File 10: `src/components/ui/AdviceBox.module.css` {#file-10}

**크기**: 0.71 KB | **확장자**: css

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

## File 11: `src/components/ui/Card.module.css` {#file-11}

**크기**: 0.54 KB | **확장자**: css

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

## File 12: `src/components/ui/ContextBox.module.css` {#file-12}

**크기**: 0.57 KB | **확장자**: css

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

## File 13: `src/index.css` {#file-13}

**크기**: 1.61 KB | **확장자**: css

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

## File 14: `src/pages/Home.module.css` {#file-14}

**크기**: 2.88 KB | **확장자**: css

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

## File 15: `src/pages/Processing.module.css` {#file-15}

**크기**: 4.29 KB | **확장자**: css

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

.footer {
    padding: 24px 0;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.copyright {
    font-size: 0.8rem;
    color: var(--muted);
    text-align: center;
}

/* Phase 27: Error UI */
.errorCard {
    max-width: 500px;
    width: 90%;
    padding: 40px;
    background: rgba(20, 20, 20, 0.8);
    border: 1px solid rgba(198, 40, 40, 0.3);
    text-align: center;
    backdrop-filter: blur(10px);
}

.errorHeader {
    margin-bottom: 24px;
}

.errorTitle {
    font-size: 1.5rem;
    font-weight: 700;
    color: #ff5252;
    margin-bottom: 8px;
}

.errorCode {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: rgba(255, 82, 82, 0.6);
    background: rgba(255, 82, 82, 0.1);
    padding: 2px 8px;
    border-radius: 4px;
}

.errorText {
    font-size: 1rem;
    line-height: 1.6;
    color: var(--text-main);
    margin-bottom: 32px;
}

.detailsBox {
    background: rgba(0, 0, 0, 0.3);
    padding: 16px;
    border-radius: 8px;
    margin-bottom: 32px;
    text-align: left;
    max-height: 200px;
    overflow-y: auto;
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.detailsBox pre {
    font-family: var(--font-mono);
    font-size: 0.8rem;
    color: #888;
    white-space: pre-wrap;
    word-break: break-all;
}

.actionRow {
    display: flex;
    gap: 12px;
    justify-content: center;
}

.retryBtn {
    padding: 12px 24px;
    background: #c62828;
    color: white;
    border: none;
    border-radius: 4px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
}

.retryBtn:hover {
    background: #e53935;
    transform: translateY(-2px);
}

.cancelBtn {
    padding: 12px 24px;
    background: transparent;
    color: var(--text-main);
    border: 1px solid var(--border-main);
    border-radius: 4px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
}

.cancelBtn:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: var(--text-main);
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

## File 16: `src/pages/Report.module.css` {#file-16}

**크기**: 9.09 KB | **확장자**: css

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
    background: rgba(198, 40, 40, 0.05);
}

.navItem .pageNum {
    font-size: 0.75rem;
    font-weight: 700;
    color: #c62828;
    width: 20px;
}

.navItem .pageTitle {
    font-size: 0.85rem;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.7);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.reportContent {
    flex: 1;
    max-width: 860px;
}

.reportHeader {
    margin-bottom: 80px;
    text-align: left;
}

.mainTitle {
    font-family: "Noto Serif KR", serif;
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 16px;
    letter-spacing: -0.02em;
}

.mainSummary {
    font-size: 1.1rem;
    color: rgba(0, 0, 0, 0.6);
    line-height: 1.6;
    max-width: 600px;
}

.pageSection {
    margin-bottom: 120px;
    scroll-margin-top: 40px;
}

.pageHeader {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    border-bottom: 2px solid #1c1c1c;
    padding-bottom: 8px;
}

.categoryTag {
    font-size: 0.75rem;
    font-weight: 800;
    letter-spacing: 0.05em;
    color: #1c1c1c;
}

.pageIdentifier {
    font-size: 0.75rem;
    font-weight: 700;
    color: #c62828;
}

.contentCard {
    background: #fdfcf8 !important;
    border: 1px solid rgba(0, 0, 0, 0.08) !important;
    box-shadow: 0 20px 50px rgba(0, 0, 0, 0.06) !important;
    padding: 56px !important;
}

.sectionTitle {
    font-family: "Noto Serif KR", serif;
    font-size: 2.25rem;
    font-weight: 700;
    margin-bottom: 40px;
    color: #1c1c1c;
}

.textContent p {
    margin-bottom: 24px;
    line-height: 1.8;
    font-size: 1.05rem;
    color: #333;
    text-align: justify;
}

.visualBox {
    border: 2px solid #1c1c1c;
    padding: 32px;
    margin: 40px 0;
}

.visualTitle {
    font-family: "Noto Serif KR", serif;
    font-weight: 700;
    font-size: 1.1rem;
    margin-bottom: 24px;
    color: #1c1c1c;
}

.placeholder {
    height: 180px;
    background: rgba(0, 0, 0, 0.02);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 0.85rem;
    color: rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(0, 0, 0, 0.05);
    border-radius: 4px;
    gap: 0.5rem;
}

.placeholder::before {
    content: "SERVICE PREPARING";
    font-weight: 800;
    font-size: 0.7rem;
    letter-spacing: 0.1em;
    opacity: 0.5;
}

.disclaimerSection {
    margin-top: 120px;
    padding-top: 40px;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    color: rgba(0, 0, 0, 0.5);
}

.disclaimerSection p {
    font-size: 0.85rem;
    margin-bottom: 8px;
    line-height: 1.6;
}

.disclaimerEn {
    font-size: 0.75rem !important;
    font-style: italic;
}

.mobileNavTrigger {
    display: none;
}

@media (max-width: 1024px) {
    .sidebar {
        display: none;
    }

    .sidebarOpen {
        display: flex;
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 1000;
        background: #f7f5f0;
    }

    .mobileNavTrigger {
        display: block;
        position: fixed;
        bottom: 24px;
        right: 24px;
        z-index: 900;
        background: #1c1c1c;
        color: #fff;
        padding: 12px 24px;
        border-radius: 40px;
        font-weight: 700;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    }

    .mainTitle {
        font-size: 2.25rem;
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

/* Phase 26: Action Buttons */
.actionButtons {
    display: flex;
    gap: 1rem;
    margin-top: 1.5rem;
}

.pdfButton,
.calendarButton {
    padding: 0.75rem 1.5rem;
    font-size: 0.9rem;
    font-weight: 600;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s;
}

.pdfButton {
    background-color: #1c1c1c;
    color: #fff;
}

.pdfButton:hover {
    background-color: #333;
}

.calendarButton {
    background-color: #fff;
    color: #1c1c1c;
    border: 1px solid #1c1c1c;
}

.calendarButton:hover {
    background-color: #f7f5f0;
}

/* Phase 26: Reason Cards */
.reasonCardsContainer {
    margin-top: 2rem;
    padding-top: 2rem;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.reasonCardsTitle {
    font-size: 0.9rem;
    font-weight: 700;
    color: #c62828;
    margin-bottom: 1rem;
}

.reasonCard {
    background-color: rgba(198, 40, 40, 0.02);
    border-left: 3px solid #c62828;
    padding: 1rem;
    margin-bottom: 1rem;
}

.reasonCard h4 {
    font-size: 0.9rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: #1c1c1c;
}

.reasonCard p {
    font-size: 0.85rem;
    color: rgba(0, 0, 0, 0.7);
    line-height: 1.6;
}

/* Phase 26: Print Optimization */
@media print {
    .reportPage {
        background: #fff;
        padding: 0;
    }

    .sidebar,
    .mobileNavTrigger,
    .closeBtn,
    .actionButtons,
    .shareActions {
        display: none !important;
    }

    .mainLayout {
        grid-template-columns: 1fr;
        padding: 0;
        margin: 0;
    }

    .reportContent {
        max-width: 100%;
        padding: 0;
    }

    .pageSection {
        page-break-inside: avoid;
        page-break-after: auto;
        margin-bottom: 2rem;
    }

    .contentCard {
        box-shadow: none;
        border: 1px solid #ddd;
    }

    .visualBox {
        page-break-inside: avoid;
        max-width: 100%;
        overflow: hidden;
    }

    .disclaimerSection {
        page-break-before: always;
        margin-top: 2rem;
    }

    @page {
        size: A4;
        margin: 20mm;
    }
}

/* Print Mode Class */
.printMode .sidebar,
.printMode .mobileNavTrigger,
.printMode .actionButtons {
    display: none;
}

.printMode .mainLayout {
    grid-template-columns: 1fr;
}

/* Phase 27: Legacy Warning Styles */
.legacyWarning {
    padding: 80px 20px;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.legacyCard {
    max-width: 600px;
    text-align: center;
}

.legacyTitle {
    font-size: 2rem;
    font-weight: 700;
    color: #c62828;
    margin-bottom: 1.5rem;
}

.legacyText {
    font-size: 1.1rem;
    line-height: 1.6;
    color: #333;
    margin-bottom: 1rem;
}

.legacyFeatures {
    list-style: none;
    padding: 0;
    margin: 2rem 0;
    text-align: left;
}

.legacyFeatures li {
    font-size: 1rem;
    padding: 0.5rem 0;
    color: #1c1c1c;
}

.regenerateButton {
    padding: 1rem 2rem;
    font-size: 1.1rem;
    font-weight: 700;
    background-color: #c62828;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s;
    margin-top: 1rem;
}

.regenerateButton:hover {
    background-color: #a52020;
    transform: translateY(-2px);
}

/* Phase 27: 3단 블록 스타일 */
.sectionBlock {
    margin: 32px 0;
    padding: 24px 0;
    border-top: 1px solid rgba(28, 28, 28, 0.1);
}

.sectionBlock:first-child {
    border-top: none;
    padding-top: 0;
}

.blockTitle {
    font-size: 1.1rem;
    font-weight: 700;
    color: #c62828;
    margin-bottom: 16px;
    padding-bottom: 8px;
    border-bottom: 2px solid rgba(198, 40, 40, 0.2);
    letter-spacing: -0.01em;
}

@media print {
    .sectionBlock {
        page-break-inside: avoid;
        margin: 24px 0;
    }

    .blockTitle {
        page-break-after: avoid;
    }
}
```

---

## File 17: `src/pages/Start.module.css` {#file-17}

**크기**: 3.15 KB | **확장자**: css

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


```

---

## 📄 scripts/generate-full-codebase-docs.cjs

```javascript
/**
 * 프로젝트 전체 코드를 와이어프레임 구조의 MD 파일로 생성
 * 모든 파일과 코드를 10개의 MD 파일로 분할하여 저장
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const OUTPUT_DIR = path.join(ROOT_DIR, 'codebase_docs');

// 제외할 디렉토리 및 파일
const EXCLUDE_DIRS = [
  'node_modules',
  '.git',
  'dist',
  'build',
  '.vscode',
  '.idea',
  'codebase_docs',
  'lib' // functions/lib는 빌드 결과물이므로 제외
];

const EXCLUDE_FILES = [
  '.DS_Store',
  'package-lock.json',
  'yarn.lock',
  'pnpm-lock.yaml',
  '.gitignore',
  '.env',
  '.env.local'
];

// 바이너리 파일 확장자
const BINARY_EXTENSIONS = [
  '.png', '.jpg', '.jpeg', '.gif', '.ico', '.svg', '.webp',
  '.woff', '.woff2', '.ttf', '.eot',
  '.pdf', '.zip', '.tar', '.gz',
  '.mp3', '.mp4', '.avi', '.mov'
];

/**
 * 파일이 바이너리인지 확인
 */
function isBinaryFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return BINARY_EXTENSIONS.includes(ext);
}

/**
 * 디렉토리를 재귀적으로 순회하여 모든 파일 목록 가져오기
 */
function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    const relativePath = path.relative(ROOT_DIR, fullPath);

    // 제외 대상 확인
    if (EXCLUDE_DIRS.some(dir => relativePath.split(path.sep).includes(dir))) {
      return;
    }

    if (EXCLUDE_FILES.includes(file)) {
      return;
    }

    if (fs.statSync(fullPath).isDirectory()) {
      arrayOfFiles = getAllFiles(fullPath, arrayOfFiles);
    } else {
      arrayOfFiles.push(fullPath);
    }
  });

  return arrayOfFiles;
}

/**
 * 파일 내용을 읽고 마크다운 형식으로 변환
 */
function fileToMarkdown(filePath) {
  const relativePath = path.relative(ROOT_DIR, filePath).replace(/\\/g, '/');
  const ext = path.extname(filePath);
  
  let content = `\n## 📄 ${relativePath}\n\n`;
  
  if (isBinaryFile(filePath)) {
    content += `*[Binary file - ${ext} format]*\n\n`;
    content += `---\n`;
    return content;
  }

  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const language = getLanguageFromExtension(ext);
    
    content += `\`\`\`${language}\n`;
    content += fileContent;
    content += `\n\`\`\`\n\n`;
    content += `---\n`;
  } catch (error) {
    content += `*[Error reading file: ${error.message}]*\n\n`;
    content += `---\n`;
  }

  return content;
}

/**
 * 파일 확장자로부터 언어 추론
 */
function getLanguageFromExtension(ext) {
  const languageMap = {
    '.js': 'javascript',
    '.cjs': 'javascript',
    '.mjs': 'javascript',
    '.ts': 'typescript',
    '.tsx': 'tsx',
    '.cts': 'typescript',
    '.jsx': 'jsx',
    '.json': 'json',
    '.css': 'css',
    '.html': 'html',
    '.md': 'markdown',
    '.yaml': 'yaml',
    '.yml': 'yaml',
    '.sh': 'bash',
    '.ps1': 'powershell',
    '.py': 'python',
    '.java': 'java',
    '.cpp': 'cpp',
    '.c': 'c',
    '.go': 'go',
    '.rs': 'rust',
    '.rb': 'ruby',
    '.php': 'php',
    '.sql': 'sql',
    '.xml': 'xml',
    '.toml': 'toml',
    '.ini': 'ini'
  };

  return languageMap[ext.toLowerCase()] || 'text';
}

/**
 * 디렉토리 구조를 트리 형태로 생성
 */
function generateDirectoryTree(files) {
  const tree = {};

  files.forEach((file) => {
    const relativePath = path.relative(ROOT_DIR, file);
    const parts = relativePath.split(path.sep);
    
    let current = tree;
    parts.forEach((part, index) => {
      if (index === parts.length - 1) {
        // 파일
        if (!current._files) current._files = [];
        current._files.push(part);
      } else {
        // 디렉토리
        if (!current[part]) current[part] = {};
        current = current[part];
      }
    });
  });

  return tree;
}

/**
 * 트리를 마크다운 형식으로 변환
 */
function treeToMarkdown(tree, indent = '') {
  let output = '';

  Object.keys(tree).sort().forEach((key) => {
    if (key === '_files') {
      tree[key].sort().forEach((file) => {
        output += `${indent}├── ${file}\n`;
      });
    } else {
      output += `${indent}├── ${key}/\n`;
      output += treeToMarkdown(tree[key], indent + '│   ');
    }
  });

  return output;
}

/**
 * 파일들을 크기 기준으로 10개 그룹으로 분할
 */
function splitFilesIntoGroups(files, numGroups = 10) {
  // 각 파일의 크기 계산
  const filesWithSize = files.map((file) => {
    try {
      const stats = fs.statSync(file);
      return { path: file, size: stats.size };
    } catch (error) {
      return { path: file, size: 0 };
    }
  });

  // 크기순으로 정렬 (큰 것부터)
  filesWithSize.sort((a, b) => b.size - a.size);

  // 각 그룹의 현재 크기를 추적
  const groups = Array.from({ length: numGroups }, () => ({
    files: [],
    totalSize: 0
  }));

  // 그리디 알고리즘: 각 파일을 현재 가장 작은 그룹에 추가
  filesWithSize.forEach((file) => {
    // 가장 작은 그룹 찾기
    let minGroup = groups[0];
    let minIndex = 0;
    
    groups.forEach((group, index) => {
      if (group.totalSize < minGroup.totalSize) {
        minGroup = group;
        minIndex = index;
      }
    });

    // 해당 그룹에 파일 추가
    minGroup.files.push(file.path);
    minGroup.totalSize += file.size;
  });

  return groups.map(group => group.files);
}

/**
 * 메인 실행 함수
 */
function main() {
  console.log('🚀 프로젝트 전체 코드 문서화 시작...\n');

  // 출력 디렉토리 생성
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  // 모든 파일 가져오기
  console.log('📁 파일 스캔 중...');
  const allFiles = getAllFiles(ROOT_DIR);
  console.log(`✅ 총 ${allFiles.length}개의 파일 발견\n`);

  // 디렉토리 구조 생성
  console.log('🌳 디렉토리 구조 생성 중...');
  const tree = generateDirectoryTree(allFiles);
  const treeMarkdown = treeToMarkdown(tree);

  // 인덱스 파일 생성
  let indexContent = `# 📦 프로젝트 전체 코드베이스 문서\n\n`;
  indexContent += `> 생성일: ${new Date().toLocaleString('ko-KR')}\n\n`;
  indexContent += `## 📊 프로젝트 개요\n\n`;
  indexContent += `- **총 파일 수**: ${allFiles.length}개\n`;
  indexContent += `- **문서 분할**: 10개 파트\n`;
  indexContent += `- **프로젝트 루트**: \`${ROOT_DIR}\`\n\n`;
  
  indexContent += `## 📑 문서 목록\n\n`;
  for (let i = 1; i <= 10; i++) {
    indexContent += `- [Part ${i}](./codebase_part_${String(i).padStart(2, '0')}.md)\n`;
  }
  
  indexContent += `\n## 🌳 전체 디렉토리 구조\n\n`;
  indexContent += `\`\`\`\n`;
  indexContent += `${path.basename(ROOT_DIR)}/\n`;
  indexContent += treeMarkdown;
  indexContent += `\`\`\`\n\n`;

  fs.writeFileSync(path.join(OUTPUT_DIR, 'INDEX.md'), indexContent, 'utf-8');
  console.log('✅ 인덱스 파일 생성 완료\n');

  // 파일들을 10개 그룹으로 분할
  console.log('📦 파일 그룹화 중...');
  const fileGroups = splitFilesIntoGroups(allFiles, 10);

  // 각 그룹별로 MD 파일 생성
  fileGroups.forEach((group, index) => {
    const partNumber = index + 1;
    const fileName = `codebase_part_${String(partNumber).padStart(2, '0')}.md`;
    const filePath = path.join(OUTPUT_DIR, fileName);

    console.log(`\n📝 Part ${partNumber} 생성 중... (${group.length}개 파일)`);

    let content = `# 📦 프로젝트 코드베이스 - Part ${partNumber}/10\n\n`;
    content += `> 생성일: ${new Date().toLocaleString('ko-KR')}\n\n`;
    content += `[← 인덱스로 돌아가기](./INDEX.md)\n\n`;
    content += `## 📋 이 파트의 파일 목록\n\n`;
    
    group.forEach((file) => {
      const relativePath = path.relative(ROOT_DIR, file).replace(/\\/g, '/');
      content += `- \`${relativePath}\`\n`;
    });

    content += `\n---\n`;
    content += `\n## 📄 파일 내용\n`;

    // 각 파일의 내용 추가
    group.forEach((file, fileIndex) => {
      const progress = Math.round(((fileIndex + 1) / group.length) * 100);
      process.stdout.write(`\r   진행률: ${progress}% (${fileIndex + 1}/${group.length})`);
      
      content += fileToMarkdown(file);
    });

    content += `\n---\n\n`;
    content += `**Part ${partNumber}/10 완료**\n\n`;
    content += `[← 인덱스로 돌아가기](./INDEX.md) | `;
    
    if (partNumber > 1) {
      content += `[← Part ${partNumber - 1}](./codebase_part_${String(partNumber - 1).padStart(2, '0')}.md) | `;
    }
    if (partNumber < 10) {
      content += `[Part ${partNumber + 1} →](./codebase_part_${String(partNumber + 1).padStart(2, '0')}.md)`;
    }

    fs.writeFileSync(filePath, content, 'utf-8');
    
    const fileSizeMB = (fs.statSync(filePath).size / 1024 / 1024).toFixed(2);
    console.log(`\n   ✅ ${fileName} 생성 완료 (${fileSizeMB} MB)`);
  });

  console.log('\n\n🎉 모든 문서 생성 완료!');
  console.log(`📂 출력 위치: ${OUTPUT_DIR}\n`);
  console.log('📖 생성된 파일:');
  console.log('   - INDEX.md (메인 인덱스)');
  for (let i = 1; i <= 10; i++) {
    console.log(`   - codebase_part_${String(i).padStart(2, '0')}.md`);
  }
  console.log('');
}

// 스크립트 실행
try {
  main();
} catch (error) {
  console.error('❌ 오류 발생:', error.message);
  console.error(error.stack);
  process.exit(1);
}

```

---

## 📄 scripts/generate-code-docs.cjs

```javascript
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

## 📄 src/pages/Start.module.css

```css
.startPage {
    min-height: 100vh;
    padding-bottom: 4rem;
}

.container {
    padding-top: 3rem;
    max-width: 480px;
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
    padding: 40px;
    background: #FFFFFF;
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.05);
    border-radius: 4px;
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
    height: 52px;
    padding: 0 1rem;
    background-color: #F9F9F9;
    border: 1px solid rgba(0, 0, 0, 0.1);
    font-family: var(--font-sans);
    font-size: 1rem;
    color: var(--ink);
    border-radius: 2px;
    transition: all 0.2s;
}

.input:focus {
    outline: none;
    background-color: #FFF;
    border: 1px solid var(--ink);
}

.inputError {
    border: 1px solid var(--accent);
    animation: shake 0.4s;
}

@keyframes shake {

    0%,
    100% {
        transform: translateX(0);
    }

    25% {
        transform: translateX(-5px);
    }

    75% {
        transform: translateX(5px);
    }
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

## 📄 src/components/layout/Header.module.css

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

## 📄 firestore-debug.log

```text
Dec 30, 2025 7:10:38 PM com.google.cloud.datastore.emulator.firestore.websocket.WebSocketServer start
INFO: Started WebSocket server on ws://127.0.0.1:9150
API endpoint: http://127.0.0.1:8080
If you are using a library that supports the FIRESTORE_EMULATOR_HOST environment variable, run:

   export FIRESTORE_EMULATOR_HOST=127.0.0.1:8080

If you are running a Firestore in Datastore Mode project, run:

   export DATASTORE_EMULATOR_HOST=127.0.0.1:8080

Note: Support for Datastore Mode is in preview. If you encounter any bugs please file at https://github.com/firebase/firebase-tools/issues.
Dev App Server is now running.

Dec 30, 2025 7:11:02 PM io.gapi.emulators.netty.HttpVersionRoutingHandler channelRead
INFO: Detected HTTP/2 connection.
Dec 30, 2025 7:11:03 PM io.netty.channel.DefaultChannelPipeline onUnhandledInboundException
WARNING: An exceptionCaught() event was fired, and it reached at the tail of the pipeline. It usually means the last handler in the pipeline did not handle the exception.
java.net.SocketException: Connection reset
	at java.base/sun.nio.ch.SocketChannelImpl.throwConnectionReset(SocketChannelImpl.java:401)
	at java.base/sun.nio.ch.SocketChannelImpl.read(SocketChannelImpl.java:434)
	at io.netty.buffer.PooledByteBuf.setBytes(PooledByteBuf.java:255)
	at io.netty.buffer.AbstractByteBuf.writeBytes(AbstractByteBuf.java:1132)
	at io.netty.channel.socket.nio.NioSocketChannel.doReadBytes(NioSocketChannel.java:356)
	at io.netty.channel.nio.AbstractNioByteChannel$NioByteUnsafe.read(AbstractNioByteChannel.java:151)
	at io.netty.channel.nio.NioEventLoop.processSelectedKey(NioEventLoop.java:796)
	at io.netty.channel.nio.NioEventLoop.processSelectedKeysOptimized(NioEventLoop.java:732)
	at io.netty.channel.nio.NioEventLoop.processSelectedKeys(NioEventLoop.java:658)
	at io.netty.channel.nio.NioEventLoop.run(NioEventLoop.java:562)
	at io.netty.util.concurrent.SingleThreadEventExecutor$4.run(SingleThreadEventExecutor.java:998)
	at io.netty.util.internal.ThreadExecutorMap$2.run(ThreadExecutorMap.java:74)
	at io.netty.util.concurrent.FastThreadLocalRunnable.run(FastThreadLocalRunnable.java:30)
	at java.base/java.lang.Thread.run(Thread.java:1583)


```

---

## 📄 public/vite.svg

*[Binary file - .svg format]*

---

## 📄 src/components/layout/PaperBackground.module.css

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

## 📄 functions/package.json

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
        "kor-lunar": "^1.4.0",
        "openai": "^6.15.0"
    },
    "devDependencies": {
        "typescript": "^5.1.6"
    },
    "private": true
}

```

---

## 📄 eslint.config.js

```javascript
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

## 📄 src/config/tokens.ts

```typescript
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

## 📄 .firebase/hosting.ZGlzdA.cache

```text
vite.svg,1766916245924,699a02e0e68a579f687d364bbbe7633161244f35af068220aee37b1b33dfb3c7
index.html,1767435424640,e5ed97d2f42d7ec10fc2b4491b33b85e3cca11f100dbadd3f2d2d6444fbb35d4
assets/index-BqyZ-vpS.css,1767435424640,9219c0f320380c0ff9129ccfb10f8e329f16d21c6fb7cc62e6ec946edc06155e
assets/index-DlBenzbN.js,1767435424640,df65ef12c94fd8c2a69f482b4f4d058aa97e4d6531fc4a208a19604c19cecbb5

```

---

---

**Part 5/10 완료**

[← 인덱스로 돌아가기](./INDEX.md) | [← Part 4](./codebase_part_04.md) | [Part 6 →](./codebase_part_06.md)
```

---

## File 9: `codebase_docs/codebase_part_06.md` {#file-9}

**크기**: 68.09 KB | **확장자**: md

```md
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
```

---

## File 10: `codebase_docs/codebase_part_07.md` {#file-10}

**크기**: 68.21 KB | **확장자**: md

```md
# 📦 프로젝트 코드베이스 - Part 7/10

> 생성일: 2026. 1. 3. 오후 10:52:25

[← 인덱스로 돌아가기](./INDEX.md)

## 📋 이 파트의 파일 목록

- `project_docs_structured/scripts.md`
- `src/pages/Report.module.css`
- `project_docs_structured/frontend-core.md`
- `src/config/reportTemplate.ts`
- `src/pages/Home.module.css`
- `scripts/check-env.cjs`
- `project_docs_structured/INDEX.md`
- `src/components/report/ReasonCards.module.css`
- `functions/src/engine/calculation/index.ts`
- `src/App.module.css`
- `.env.production.example`
- `src/components/ui/AdviceBox.module.css`
- `src/components/layout/Container.module.css`

---

## 📄 파일 내용

## 📄 project_docs_structured/scripts.md

```markdown
# Scripts

> 빌드 및 유틸리티 스크립트

**생성 시각**: 2026-01-03T09:38:11.874Z

---

## 📋 목차 (6개 파일)

1. [scripts/check-env.cjs](#file-1)
2. [scripts/ci-gate.cjs](#file-2)
3. [scripts/generate-code-docs.cjs](#file-3)
4. [scripts/generate-design-docs.cjs](#file-4)
5. [scripts/generate-structured-docs.cjs](#file-5)
6. [scripts/test-generateReport.ts](#file-6)

---

## File 1: `scripts/check-env.cjs` {#file-1}

**크기**: 2.62 KB | **확장자**: cjs

```cjs
const fs = require('fs');
const path = require('path');

/**
 * [Zero Tolerance] Environment Validation Script (Authoritative)
 * 빌드 시점에 필수 변수가 없거나 비어 있으면 즉시 중단합니다.
 * 우선순위: .env.production.local > process.env (CI 오염 방지)
 */

const REQUIRED_VARS = [
    'VITE_FIREBASE_API_KEY',
    'VITE_FIREBASE_AUTH_DOMAIN',
    'VITE_FIREBASE_PROJECT_ID',
    'VITE_FIREBASE_APP_ID',
    'VITE_FIREBASE_MESSAGING_SENDER_ID',
    'VITE_FIREBASE_STORAGE_BUCKET',
    'VITE_RECAPTCHA_SITE_KEY'
];

function parseEnvFile(filePath) {
    if (!fs.existsSync(filePath)) return {};
    const content = fs.readFileSync(filePath, 'utf8');
    const env = {};
    content.split(/\r?\n/).forEach(line => {
        const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
        if (match) {
            let value = match[2] || '';
            // 따옴표 제거
            if (value.length > 0 && value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
            if (value.length > 0 && value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
            env[match[1]] = value.trim();
        }
    });
    return env;
}

function checkEnv() {
    console.log('🔍 [Release Engineer] Hard-validating environment for production build...');

    // 1. .env.production.local 로드 (권위적 우선순위)
    const envPath = path.resolve(__dirname, '../.env.production.local');
    const fileEnv = parseEnvFile(envPath);

    const missingOrEmpty = [];

    REQUIRED_VARS.forEach(key => {
        // [Zero Tolerance] Local File 우선 (CI/쉘 잔류값 overriding 방지)
        const value = fileEnv[key] || process.env[key];

        const isEmpty = !value || value.trim() === '';
        const isPlaceholder = value && (
            value.includes('YOUR_') ||
            value.includes('REPLACE') ||
            value.includes('AIzaSyAL...') // 런북 예시값 방지
        );

        if (isEmpty || isPlaceholder) {
            missingOrEmpty.push(key);
        }
    });

    if (missingOrEmpty.length > 0) {
        console.error('\n❌ [CRITICAL FAIL] Production build aborted due to missing/empty environment variables:');
        missingOrEmpty.forEach(k => console.error(`   - ${k}`));
        console.error('\n👉 FIX: Update your .env.production.local with valid credentials.');
        console.error('👉 REF: Check .env.production.example for the list of required keys.\n');
        process.exit(1);
    }

    console.log('✅ Environment validation passed. Proceeding to build...\n');
}

checkEnv();

```

---

## File 2: `scripts/ci-gate.cjs` {#file-2}

**크기**: 2.32 KB | **확장자**: cjs

```cjs
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

/**
 * [Zero Tolerance] CI Release Gate Script
 * 1. Pre-build: 환경 변수 엄격 검증 (check-env.cjs 재사용)
 * 2. Post-build: 빌드 결과물(Bundle) 내 필수 식별자(projectId 등) 존재 확인
 */

function runPreBuildCheck() {
    console.log('🚀 [CI Gate] Step 1: Pre-build Environment Validation...');
    try {
        execSync('node scripts/check-env.cjs', { stdio: 'inherit' });
    } catch (err) {
        console.error('❌ [CI Gate] Pre-build validation failed.');
        process.exit(1);
    }
}

function runPostBuildCheck() {
    console.log('🚀 [CI Gate] Step 2: Post-build Bundle Integrity Check...');
    const distPath = path.resolve(__dirname, '../dist');

    if (!fs.existsSync(distPath)) {
        console.error('❌ [CI Gate] Build directory (dist) not found. Run "npm run build" first.');
        process.exit(1);
    }

    // 번들 파일들 내에서 projectId가 실제로 포함되어 있는지 검색 (Vite define 검증)
    // 실제 projectId 값 대신 플레이스홀더나 빈 자리가 남지 않았는지 확인
    const assetsPath = path.join(distPath, 'assets');
    const files = fs.readdirSync(assetsPath).filter(f => f.endsWith('.js'));

    let projectIdFound = false;
    for (const file of files) {
        const content = fs.readFileSync(path.join(assetsPath, file), 'utf8');
        // projectId가 실제 빌드될 때 "myungri-genesis"와 같은 문자열로 박혔는지 확인
        // (참고: 빌드 시 환경변수는 문자열 리터럴로 치환됨)
        if (content.includes('myungri-genesis')) {
            projectIdFound = true;
            break;
        }
    }

    if (!projectIdFound) {
        console.error('❌ [CI Gate] INTEGRITY FAIL: "projectId" (myungri-genesis) was not detected in JS bundles.');
        console.error('👉 This indicates a failed Vite environment injection at build time.');
        process.exit(1);
    }

    console.log('✅ [CI Gate] Bundle integrity verified. "projectId" detected.');
}

function main() {
    const isPostBuild = process.argv.includes('--post-build');

    if (isPostBuild) {
        runPostBuildCheck();
    } else {
        runPreBuildCheck();
    }
}

main();

```

---

## File 3: `scripts/generate-code-docs.cjs` {#file-3}

**크기**: 4.34 KB | **확장자**: cjs

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

## File 4: `scripts/generate-design-docs.cjs` {#file-4}

**크기**: 3.30 KB | **확장자**: cjs

```cjs
const fs = require('fs');
const path = require('path');

// --- Configuration ---
const PROJECT_ROOT = path.resolve(__dirname, '..');
const OUTPUT_DIR = path.join(PROJECT_ROOT, 'project_docs');
const OUTPUT_FILE = path.join(OUTPUT_DIR, 'design_code_complete.md');

// Directories to focus on for "Design"
const DESIGN_PATHS = [
    'src/components',
    'src/pages',
    'src/styles',
    'src/config'
];

// Extensions to include
const ALLOW_EXTENSIONS = ['.tsx', '.css', '.module.css', '.ts'];

// Files to explicitly include even if not in DESIGN_PATHS
const SPECIFIC_FILES = [
    'index.html',
    'src/App.tsx',
    'src/main.tsx'
];

function ensureDir(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

function isDesignRelated(filePath) {
    const relativePath = path.relative(PROJECT_ROOT, filePath).replace(/\\/g, '/');

    // Check if it's in a design-related directory
    const isInDesignDir = DESIGN_PATHS.some(p => relativePath.startsWith(p));

    // Check if it's a specific file
    const isSpecific = SPECIFIC_FILES.includes(relativePath);

    // Check extension
    const ext = path.extname(filePath).toLowerCase();
    const isAllowedExt = ALLOW_EXTENSIONS.includes(ext);

    // Business logic exclusion: exclude calculation engine logic even if in src/config if it's not design
    if (relativePath.includes('engine') || relativePath.includes('functions/src')) {
        return false;
    }

    return (isInDesignDir || isSpecific) && isAllowedExt;
}

function getFileList(dir, fileList = []) {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            if (file !== 'node_modules' && !file.startsWith('.')) {
                getFileList(filePath, fileList);
            }
        } else {
            if (isDesignRelated(filePath)) {
                fileList.push(filePath);
            }
        }
    });

    return fileList;
}

function generateDesignMarkdown() {
    console.log(`🎨 Gathering design-related code from: ${PROJECT_ROOT}`);
    const files = getFileList(PROJECT_ROOT);
    console.log(`✨ Found ${files.length} design-related files.`);

    ensureDir(OUTPUT_DIR);

    let content = `# MYUNGRI: The Genesis - Full Design Code Documentation\n`;
    content += `Generated on: ${new Date().toLocaleString()}\n\n`;
    content += `> [!NOTE]\n`;
    content += `> This document contains all CSS, UI Components, Layouts, and Design Tokens.\n\n---\n`;

    for (const filePath of files) {
        const relativePath = path.relative(PROJECT_ROOT, filePath).replace(/\\/g, '/');
        try {
            const fileContent = fs.readFileSync(filePath, 'utf8');
            const ext = path.extname(filePath).substring(1) || 'text';

            content += `\n## File: ${relativePath}\n\n`;
            content += `\`\`\`${ext}\n${fileContent}\n\`\`\`\n\n---\n`;
        } catch (err) {
            console.error(`❌ Error reading ${relativePath}:`, err.message);
        }
    }

    fs.writeFileSync(OUTPUT_FILE, content, 'utf8');
    console.log(`✅ Success! Design documentation created at: ${OUTPUT_FILE}`);
}

generateDesignMarkdown();

```

---

## File 5: `scripts/generate-structured-docs.cjs` {#file-5}

**크기**: 10.18 KB | **확장자**: cjs

```cjs
const fs = require('fs');
const path = require('path');

// --- Configuration ---
const PROJECT_ROOT = path.resolve(__dirname, '..');
const OUTPUT_DIR = path.join(PROJECT_ROOT, 'project_docs_structured');

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
    'lib',
    'project_docs',
    'project_docs_structured'
];

// Files to include (Allowlist extensions)
const ALLOW_EXTENSIONS = [
    '.ts', '.tsx',
    '.js', '.cjs', '.mjs',
    '.css', '.scss', '.module.css',
    '.html',
    '.json',
    '.md',
    '.rules',
    '.yaml', '.yml',
    '.env.example', '.env.production.example',
    '.gitignore',
    '.firebaserc'
];

// Files to explicitly ignore
const IGNORE_FILES = [
    'package-lock.json',
    'yarn.lock',
    '.DS_Store'
];

// Structure categories
const CATEGORIES = {
    'frontend-pages': {
        name: 'Frontend - Pages',
        paths: ['src/pages'],
        description: '프론트엔드 페이지 컴포넌트 (Report, Start, Processing 등)'
    },
    'frontend-components': {
        name: 'Frontend - Components',
        paths: ['src/components'],
        description: '재사용 가능한 UI 컴포넌트 (layout, ui, report, share 등)'
    },
    'frontend-core': {
        name: 'Frontend - Core',
        paths: ['src/lib', 'src/config', 'src/types', 'src/hooks'],
        description: '프론트엔드 핵심 로직 (Firebase, 유틸리티, 타입 정의)'
    },
    'frontend-styles': {
        name: 'Frontend - Styles',
        paths: ['src'],
        extensions: ['.css', '.module.css'],
        description: '전역 스타일 및 CSS 모듈'
    },
    'backend-functions': {
        name: 'Backend - Functions',
        paths: ['functions/src'],
        description: 'Firebase Functions (generateReport, generateLuckCalendar 등)'
    },
    'backend-engine': {
        name: 'Backend - Calculation Engine',
        paths: ['functions/src/engine'],
        description: '명리 계산 엔진 (사주 계산, 일진 계산 등)'
    },
    'config-root': {
        name: 'Configuration - Root',
        paths: ['.'],
        maxDepth: 1,
        extensions: ['.json', '.js', '.cjs', '.ts', '.yaml', '.yml', '.rules', '.gitignore', '.firebaserc'],
        description: '프로젝트 루트 설정 파일 (package.json, vite.config, firebase 등)'
    },
    'config-env': {
        name: 'Configuration - Environment',
        paths: ['.'],
        maxDepth: 1,
        patterns: ['.env'],
        description: '환경 변수 설정 파일'
    },
    'scripts': {
        name: 'Scripts',
        paths: ['scripts'],
        description: '빌드 및 유틸리티 스크립트'
    },
    'docs': {
        name: 'Documentation',
        paths: ['.'],
        extensions: ['.md'],
        description: '프로젝트 문서 (README, 작업 로그, 설정 문서 등)'
    },
    'public': {
        name: 'Public Assets',
        paths: ['public'],
        description: '정적 파일 (이미지, 아이콘, manifest 등)'
    }
};

// --- Helper Functions ---

function ensureDir(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

function shouldIncludeFile(filePath, relativePath, category) {
    const ext = path.extname(filePath).toLowerCase();
    const fileName = path.basename(filePath);

    // Check ignore list
    if (IGNORE_FILES.includes(fileName)) return false;

    // Check if file is in ignored directory
    const parts = relativePath.split(path.sep);
    if (parts.some(p => IGNORE_DIRS.includes(p))) return false;

    // Category-specific filters
    if (category.extensions) {
        return category.extensions.some(e => filePath.endsWith(e) || ext === e);
    }

    if (category.patterns) {
        return category.patterns.some(p => fileName.includes(p));
    }

    // Default: check against allow list
    return ALLOW_EXTENSIONS.some(e => filePath.endsWith(e) || ext === e);
}

function getFilesInCategory(category) {
    const files = [];

    for (const basePath of category.paths) {
        const fullPath = path.join(PROJECT_ROOT, basePath);

        if (!fs.existsSync(fullPath)) continue;

        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            scanDirectory(fullPath, files, category, 0);
        } else if (stat.isFile()) {
            const relativePath = path.relative(PROJECT_ROOT, fullPath);
            if (shouldIncludeFile(fullPath, relativePath, category)) {
                files.push(fullPath);
            }
        }
    }

    return files.sort();
}

function scanDirectory(dir, fileList, category, depth) {
    if (category.maxDepth && depth >= category.maxDepth) return;

    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const filePath = path.join(dir, file);
        const relativePath = path.relative(PROJECT_ROOT, filePath);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            if (!IGNORE_DIRS.includes(file)) {
                scanDirectory(filePath, fileList, category, depth + 1);
            }
        } else {
            if (shouldIncludeFile(filePath, relativePath, category)) {
                fileList.push(filePath);
            }
        }
    });
}

function generateCategoryMarkdown(categoryKey, category) {
    console.log(`\n📂 Processing category: ${category.name}`);

    const files = getFilesInCategory(category);

    if (files.length === 0) {
        console.log(`   ⚠️  No files found in this category`);
        return;
    }

    console.log(`   ✨ Found ${files.length} files`);

    // Generate markdown content
    let content = `# ${category.name}\n\n`;
    content += `> ${category.description}\n\n`;
    content += `**생성 시각**: ${new Date().toISOString()}\n\n`;
    content += `---\n\n`;

    // Table of Contents
    content += `## 📋 목차 (${files.length}개 파일)\n\n`;
    files.forEach((filePath, index) => {
        const relativePath = path.relative(PROJECT_ROOT, filePath).replace(/\\/g, '/');
        content += `${index + 1}. [${relativePath}](#file-${index + 1})\n`;
    });
    content += `\n---\n\n`;

    // File contents
    files.forEach((filePath, index) => {
        const relativePath = path.relative(PROJECT_ROOT, filePath).replace(/\\/g, '/');

        try {
            const fileContent = fs.readFileSync(filePath, 'utf8');
            const ext = path.extname(filePath).substring(1) || 'txt';
            const stat = fs.statSync(filePath);
            const sizeKB = (stat.size / 1024).toFixed(2);

            content += `## File ${index + 1}: \`${relativePath}\` {#file-${index + 1}}\n\n`;
            content += `**크기**: ${sizeKB} KB | **확장자**: ${ext}\n\n`;
            content += `\`\`\`${ext}\n${fileContent}\n\`\`\`\n\n`;
            content += `---\n\n`;

            console.log(`   ✓ ${relativePath} (${sizeKB} KB)`);
        } catch (err) {
            console.error(`   ❌ Error reading ${relativePath}:`, err.message);
            content += `## File ${index + 1}: \`${relativePath}\` {#file-${index + 1}}\n\n`;
            content += `**오류**: 파일을 읽을 수 없습니다 - ${err.message}\n\n`;
            content += `---\n\n`;
        }
    });

    // Save to file
    const outputFileName = `${categoryKey}.md`;
    const outputPath = path.join(OUTPUT_DIR, outputFileName);
    fs.writeFileSync(outputPath, content, 'utf8');

    const sizeKB = (content.length / 1024).toFixed(1);
    console.log(`   📦 Created: ${outputFileName} (${sizeKB} KB)`);
}

function generateIndexMarkdown() {
    let content = `# 프로젝트 전체 코드 문서 - 인덱스\n\n`;
    content += `**프로젝트**: MYUNGRI - The Genesis\n`;
    content += `**생성 시각**: ${new Date().toISOString()}\n\n`;
    content += `---\n\n`;
    content += `## 📚 문서 구조\n\n`;
    content += `이 문서는 프로젝트의 전체 코드를 구조별로 분류하여 생성되었습니다.\n`;
    content += `각 카테고리별로 별도의 MD 파일이 생성되어 있습니다.\n\n`;

    content += `## 📂 카테고리 목록\n\n`;

    Object.entries(CATEGORIES).forEach(([key, category], index) => {
        const fileName = `${key}.md`;
        content += `### ${index + 1}. [${category.name}](${fileName})\n\n`;
        content += `${category.description}\n\n`;
        content += `**파일**: \`${fileName}\`\n\n`;
    });

    content += `---\n\n`;
    content += `## 🚀 사용 방법\n\n`;
    content += `1. 각 카테고리별 MD 파일을 열어 해당 영역의 전체 코드를 확인하세요.\n`;
    content += `2. 각 파일 내부에는 목차(TOC)가 포함되어 있어 빠른 탐색이 가능합니다.\n`;
    content += `3. 모든 파일은 마크다운 코드 블록으로 포맷되어 있어 가독성이 높습니다.\n\n`;

    content += `## 🔄 재생성\n\n`;
    content += `문서를 다시 생성하려면 다음 명령어를 실행하세요:\n\n`;
    content += `\`\`\`bash\n`;
    content += `node scripts/generate-structured-docs.cjs\n`;
    content += `\`\`\`\n`;

    const outputPath = path.join(OUTPUT_DIR, 'INDEX.md');
    fs.writeFileSync(outputPath, content, 'utf8');
    console.log(`\n📋 Created index: INDEX.md`);
}

function main() {
    console.log('🚀 Starting structured documentation generation...');
    console.log(`📁 Project root: ${PROJECT_ROOT}`);
    console.log(`📁 Output directory: ${OUTPUT_DIR}\n`);

    // Clean and create output directory
    if (fs.existsSync(OUTPUT_DIR)) {
        fs.rmSync(OUTPUT_DIR, { recursive: true, force: true });
    }
    ensureDir(OUTPUT_DIR);

    // Generate documentation for each category
    Object.entries(CATEGORIES).forEach(([key, category]) => {
        generateCategoryMarkdown(key, category);
    });

    // Generate index
    generateIndexMarkdown();

    console.log('\n✅ Documentation generation complete!');
    console.log(`📂 Check '${OUTPUT_DIR}' directory for all generated files.\n`);
}

// --- Execute ---
main();

```

---

## File 6: `scripts/test-generateReport.ts` {#file-6}

**크기**: 3.84 KB | **확장자**: ts

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


```

---

## 📄 src/pages/Report.module.css

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
    background: rgba(198, 40, 40, 0.05);
}

.navItem .pageNum {
    font-size: 0.75rem;
    font-weight: 700;
    color: #c62828;
    width: 20px;
}

.navItem .pageTitle {
    font-size: 0.85rem;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.7);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.reportContent {
    flex: 1;
    max-width: 800px;
    margin: 0 auto;
}

.reportHeader {
    margin-bottom: 80px;
    text-align: left;
}

.mainTitle {
    font-family: "Noto Serif KR", serif;
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 16px;
    letter-spacing: -0.02em;
}

.mainSummary {
    font-size: 1.1rem;
    color: rgba(0, 0, 0, 0.6);
    line-height: 1.6;
    max-width: 600px;
}

.pageSection {
    margin-bottom: 120px;
    scroll-margin-top: 40px;
}

.pageHeader {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
    border-bottom: 2px solid #1c1c1c;
    padding-bottom: 8px;
}

.categoryTag {
    font-size: 0.75rem;
    font-weight: 800;
    letter-spacing: 0.05em;
    color: #1c1c1c;
}

.pageIdentifier {
    font-size: 0.875rem;
    font-weight: 500;
    letter-spacing: 0.05em;
    color: var(--muted);
}

.contentCard {
    background: #FFFFFF !important;
    border-left: 4px solid #CC3D3D !important;
    border-top: 1px solid rgba(0, 0, 0, 0.05) !important;
    border-right: 1px solid rgba(0, 0, 0, 0.05) !important;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05) !important;
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.05) !important;
    padding: 40px !important;
    margin-bottom: 3rem;
}

.sectionTitle {
    font-family: var(--font-serif);
    font-size: 1.75rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    color: var(--ink);
}

.textContent p {
    margin-bottom: 24px;
    line-height: 1.8;
    font-size: 1.05rem;
    color: #333;
    text-align: justify;
}

.visualBox {
    border: 2px solid #1c1c1c;
    padding: 32px;
    margin: 40px 0;
}

.visualTitle {
    font-family: "Noto Serif KR", serif;
    font-weight: 700;
    font-size: 1.1rem;
    margin-bottom: 24px;
    color: #1c1c1c;
}

.placeholder {
    height: 180px;
    background: rgba(0, 0, 0, 0.02);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 0.85rem;
    color: rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(0, 0, 0, 0.05);
    border-radius: 4px;
    gap: 0.5rem;
}

.placeholder::before {
    content: "SERVICE PREPARING";
    font-weight: 800;
    font-size: 0.7rem;
    letter-spacing: 0.1em;
    opacity: 0.5;
}

.disclaimerSection {
    margin-top: 120px;
    padding-top: 40px;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    color: rgba(0, 0, 0, 0.5);
}

.disclaimerSection p {
    font-size: 0.85rem;
    margin-bottom: 8px;
    line-height: 1.6;
}

.disclaimerEn {
    font-size: 0.75rem !important;
    font-style: italic;
}

.mobileNavTrigger {
    display: none;
}

@media (max-width: 1024px) {
    .sidebar {
        display: none;
    }

    .sidebarOpen {
        display: flex;
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 1000;
        background: #f7f5f0;
    }

    .mobileNavTrigger {
        display: block;
        position: fixed;
        bottom: 24px;
        right: 24px;
        z-index: 900;
        background: #1c1c1c;
        color: #fff;
        padding: 12px 24px;
        border-radius: 40px;
        font-weight: 700;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    }

    .mainTitle {
        font-size: 2.25rem;
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

/* Phase 26: Action Buttons */
.actionButtons {
    display: flex;
    gap: 1rem;
    margin-top: 1.5rem;
}

.pdfButton,
.calendarButton {
    padding: 0.75rem 1.5rem;
    font-size: 0.9rem;
    font-weight: 600;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s;
}

.pdfButton {
    background-color: #1c1c1c;
    color: #fff;
}

.pdfButton:hover {
    background-color: #333;
}

.calendarButton {
    background-color: #fff;
    color: #1c1c1c;
    border: 1px solid #1c1c1c;
}

.calendarButton:hover {
    background-color: #f7f5f0;
}

/* Phase 26: Reason Cards */
.reasonCardsContainer {
    margin-top: 2rem;
    padding-top: 2rem;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.reasonCardsTitle {
    font-size: 0.9rem;
    font-weight: 700;
    color: #c62828;
    margin-bottom: 1rem;
}

.reasonCard {
    background-color: rgba(198, 40, 40, 0.02);
    border-left: 3px solid #c62828;
    padding: 1rem;
    margin-bottom: 1rem;
}

.reasonCard h4 {
    font-size: 0.9rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: #1c1c1c;
}

.reasonCard p {
    font-size: 0.85rem;
    color: rgba(0, 0, 0, 0.7);
    line-height: 1.6;
}

/* Phase 26: Print Optimization */
@media print {
    .reportPage {
        background: #FFFFFF !important;
        padding: 0 !important;
    }

    body::before,
    body::after {
        display: none !important;
    }

    .sidebar,
    .mobileNavTrigger,
    .closeBtn,
    .actionButtons,
    .shareActions,
    .header {
        display: none !important;
    }

    .mainLayout {
        display: block !important;
        padding: 0 !important;
        margin: 0 !important;
    }

    .reportContent {
        max-width: 100% !important;
        padding: 0 !important;
    }

    .pageSection {
        page-break-before: always;
        margin-bottom: 40px;
    }

    .contentCard {
        box-shadow: none !important;
        border: 1px solid #EEEEEE !important;
        padding: 30px !important;
    }

    .visualBox {
        page-break-inside: avoid;
    }

    @page {
        size: A4;
        margin: 20mm;
    }
}

/* Print Mode Class */
.printMode .sidebar,
.printMode .mobileNavTrigger,
.printMode .actionButtons {
    display: none;
}

.printMode .mainLayout {
    grid-template-columns: 1fr;
}

/* Phase 27: Legacy Warning Styles */
.legacyWarning {
    padding: 80px 20px;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

.legacyCard {
    max-width: 600px;
    text-align: center;
}

.legacyTitle {
    font-size: 2rem;
    font-weight: 700;
    color: #c62828;
    margin-bottom: 1.5rem;
}

.legacyText {
    font-size: 1.1rem;
    line-height: 1.6;
    color: #333;
    margin-bottom: 1rem;
}

.legacyFeatures {
    list-style: none;
    padding: 0;
    margin: 2rem 0;
    text-align: left;
}

.legacyFeatures li {
    font-size: 1rem;
    padding: 0.5rem 0;
    color: #1c1c1c;
}

.regenerateButton {
    padding: 1rem 2rem;
    font-size: 1.1rem;
    font-weight: 700;
    background-color: #c62828;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s;
    margin-top: 1rem;
}

.regenerateButton:hover {
    background-color: #a52020;
    transform: translateY(-2px);
}

/* Phase 27: 3단 블록 스타일 */
.sectionBlock {
    margin: 32px 0;
    padding: 24px 0;
    border-top: 1px solid rgba(28, 28, 28, 0.1);
}

.sectionBlock:first-child {
    border-top: none;
    padding-top: 0;
}

.blockTitle {
    font-size: 1rem;
    font-weight: 700;
    color: var(--accent);
    margin-bottom: 1rem;
    display: none;
    /* Hide internal block titles as they are implied by components */
}

/* 3단 구조 컴포넌트 스타일 보정 */
.resultBlock {
    margin-bottom: 2rem;
}

.explainBlock {
    background-color: #F7F7F7;
    border-left: 4px solid var(--muted);
    padding: 20px;
    margin-bottom: 2rem;
}

.interpretationBlock {
    font-family: var(--font-serif);
    font-style: italic;
    color: var(--ink);
    line-height: 1.7;
}

.interpretationBlock::before {
    content: "💡 ";
    font-style: normal;
    margin-right: 8px;
}

@media print {
    .sectionBlock {
        page-break-inside: avoid;
        margin: 24px 0;
    }

    .blockTitle {
        page-break-after: avoid;
    }

    .qualityAlert {
        display: none !important;
    }
}

/* Phase 28: Quality Alert Banner */
.qualityAlert {
    background: #FFF9C4;
    border: 2px solid #FBC02D;
    border-radius: 8px;
    padding: 24px;
    margin-bottom: 40px;
    display: flex;
    gap: 20px;
    align-items: flex-start;
    animation: slideDown 0.5s ease-out;
}

@keyframes slideDown {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.alertIcon {
    font-size: 2rem;
}

.alertContent h3 {
    font-size: 1.1rem;
    font-weight: 700;
    color: #F57F17;
    margin-bottom: 8px;
}

.alertContent p {
    font-size: 0.95rem;
    color: #5D4037;
    margin-bottom: 16px;
    line-height: 1.5;
}

.regenerateBtn {
    background: #F57F17;
    color: #fff;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s;
}

.regenerateBtn:hover:not(:disabled) {
    background: #E65100;
    transform: translateY(-2px);
}

.regenerateBtn:disabled {
    opacity: 0.6;
    cursor: wait;
}
```

---

## 📄 project_docs_structured/frontend-core.md

```markdown
# Frontend - Core

> 프론트엔드 핵심 로직 (Firebase, 유틸리티, 타입 정의)

**생성 시각**: 2026-01-03T09:38:11.832Z

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

**크기**: 1.09 KB | **확장자**: ts

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


```

---

## 📄 src/config/reportTemplate.ts

```typescript
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

## 📄 src/pages/Home.module.css

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
    font-family: var(--font-serif);
    font-size: 3.5rem;
    font-weight: 700;
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
    color: #FFF;
    border: none;
    height: 64px;
    padding: 0 32px;
    font-family: var(--font-sans);
    font-weight: 700;
    font-size: 1.1rem;
    cursor: pointer;
    border-radius: 2px;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
}

.primaryBtn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
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
    display: flex;
    justify-content: center;
    align-items: center;
}

.astrolabeContainer {
    position: absolute;
    width: 140%;
    height: 140%;
    z-index: -1;
    opacity: 0.08;
    animation: rotateAstrolabe 120s infinite linear;
    pointer-events: none;
    display: flex;
    justify-content: center;
    align-items: center;
}

.astrolabeSvg {
    width: 100%;
    height: 100%;
    stroke: #000;
    stroke-width: 1px;
    fill: none;
}

@keyframes rotateAstrolabe {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

.kanjiWatermark {
    position: absolute;
    top: -50px;
    right: -20px;
    font-family: var(--font-serif);
    font-size: 25rem;
    font-weight: 900;
    color: var(--ink);
    opacity: 0.03;
    pointer-events: none;
    z-index: -2;
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
        font-size: 2.5rem;
    }

    .ctaGroup {
        flex-direction: column;
        gap: 1rem;
    }

    .primaryBtn {
        height: 56px;
        width: 100%;
    }

    .featureGrid {
        grid-template-columns: 1fr;
    }
}
```

---

## 📄 scripts/check-env.cjs

```javascript
const fs = require('fs');
const path = require('path');

/**
 * [Zero Tolerance] Environment Validation Script (Authoritative)
 * 빌드 시점에 필수 변수가 없거나 비어 있으면 즉시 중단합니다.
 * 우선순위: .env.production.local > process.env (CI 오염 방지)
 */

const REQUIRED_VARS = [
    'VITE_FIREBASE_API_KEY',
    'VITE_FIREBASE_AUTH_DOMAIN',
    'VITE_FIREBASE_PROJECT_ID',
    'VITE_FIREBASE_APP_ID',
    'VITE_FIREBASE_MESSAGING_SENDER_ID',
    'VITE_FIREBASE_STORAGE_BUCKET',
    'VITE_RECAPTCHA_SITE_KEY'
];

function parseEnvFile(filePath) {
    if (!fs.existsSync(filePath)) return {};
    const content = fs.readFileSync(filePath, 'utf8');
    const env = {};
    content.split(/\r?\n/).forEach(line => {
        const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
        if (match) {
            let value = match[2] || '';
            // 따옴표 제거
            if (value.length > 0 && value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
            if (value.length > 0 && value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
            env[match[1]] = value.trim();
        }
    });
    return env;
}

function checkEnv() {
    console.log('🔍 [Release Engineer] Hard-validating environment for production build...');

    // 1. .env.production.local 로드 (권위적 우선순위)
    const envPath = path.resolve(__dirname, '../.env.production.local');
    const fileEnv = parseEnvFile(envPath);

    const missingOrEmpty = [];

    REQUIRED_VARS.forEach(key => {
        // [Zero Tolerance] Local File 우선 (CI/쉘 잔류값 overriding 방지)
        const value = fileEnv[key] || process.env[key];

        const isEmpty = !value || value.trim() === '';
        const isPlaceholder = value && (
            value.includes('YOUR_') ||
            value.includes('REPLACE') ||
            value.includes('AIzaSyAL...') // 런북 예시값 방지
        );

        if (isEmpty || isPlaceholder) {
            missingOrEmpty.push(key);
        }
    });

    if (missingOrEmpty.length > 0) {
        console.error('\n❌ [CRITICAL FAIL] Production build aborted due to missing/empty environment variables:');
        missingOrEmpty.forEach(k => console.error(`   - ${k}`));
        console.error('\n👉 FIX: Update your .env.production.local with valid credentials.');
        console.error('👉 REF: Check .env.production.example for the list of required keys.\n');
        process.exit(1);
    }

    console.log('✅ Environment validation passed. Proceeding to build...\n');
}

checkEnv();

```

---

## 📄 project_docs_structured/INDEX.md

```markdown
# 프로젝트 전체 코드 문서 - 인덱스

**프로젝트**: MYUNGRI - The Genesis
**생성 시각**: 2026-01-03T09:38:11.895Z

---

## 📚 문서 구조

이 문서는 프로젝트의 전체 코드를 구조별로 분류하여 생성되었습니다.
각 카테고리별로 별도의 MD 파일이 생성되어 있습니다.

## 📂 카테고리 목록

### 1. [Frontend - Pages](frontend-pages.md)

프론트엔드 페이지 컴포넌트 (Report, Start, Processing 등)

**파일**: `frontend-pages.md`

### 2. [Frontend - Components](frontend-components.md)

재사용 가능한 UI 컴포넌트 (layout, ui, report, share 등)

**파일**: `frontend-components.md`

### 3. [Frontend - Core](frontend-core.md)

프론트엔드 핵심 로직 (Firebase, 유틸리티, 타입 정의)

**파일**: `frontend-core.md`

### 4. [Frontend - Styles](frontend-styles.md)

전역 스타일 및 CSS 모듈

**파일**: `frontend-styles.md`

### 5. [Backend - Functions](backend-functions.md)

Firebase Functions (generateReport, generateLuckCalendar 등)

**파일**: `backend-functions.md`

### 6. [Backend - Calculation Engine](backend-engine.md)

명리 계산 엔진 (사주 계산, 일진 계산 등)

**파일**: `backend-engine.md`

### 7. [Configuration - Root](config-root.md)

프로젝트 루트 설정 파일 (package.json, vite.config, firebase 등)

**파일**: `config-root.md`

### 8. [Configuration - Environment](config-env.md)

환경 변수 설정 파일

**파일**: `config-env.md`

### 9. [Scripts](scripts.md)

빌드 및 유틸리티 스크립트

**파일**: `scripts.md`

### 10. [Documentation](docs.md)

프로젝트 문서 (README, 작업 로그, 설정 문서 등)

**파일**: `docs.md`

### 11. [Public Assets](public.md)

정적 파일 (이미지, 아이콘, manifest 등)

**파일**: `public.md`

---

## 🚀 사용 방법

1. 각 카테고리별 MD 파일을 열어 해당 영역의 전체 코드를 확인하세요.
2. 각 파일 내부에는 목차(TOC)가 포함되어 있어 빠른 탐색이 가능합니다.
3. 모든 파일은 마크다운 코드 블록으로 포맷되어 있어 가독성이 높습니다.

## 🔄 재생성

문서를 다시 생성하려면 다음 명령어를 실행하세요:

```bash
node scripts/generate-structured-docs.cjs
```

```

---

## 📄 src/components/report/ReasonCards.module.css

```css
.reasonCardsContainer {
    margin-top: 3rem;
    padding-top: 2rem;
    border-top: 2px solid rgba(198, 40, 40, 0.15);
}

.sectionTitle {
    font-family: "Noto Serif KR", serif;
    font-size: 1.1rem;
    font-weight: 700;
    color: #c62828;
    margin-bottom: 1.5rem;
    letter-spacing: -0.01em;
}

.reasonCard {
    background-color: rgba(198, 40, 40, 0.02);
    border-left: 4px solid #c62828;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    border-radius: 0 4px 4px 0;
}

.cardTitle {
    font-family: "Noto Serif KR", serif;
    font-size: 1rem;
    font-weight: 600;
    color: #1c1c1c;
    margin-bottom: 1rem;
}

.evidenceSection,
.patchSection,
.riskSection {
    margin-top: 1rem;
}

.label {
    font-size: 0.85rem;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.6);
    margin-bottom: 0.5rem;
}

.evidenceList,
.patchList {
    margin: 0;
    padding-left: 1.5rem;
}

.evidenceList li,
.patchList li {
    font-size: 0.9rem;
    line-height: 1.7;
    color: rgba(0, 0, 0, 0.8);
    margin-bottom: 0.5rem;
}

.patchList li {
    font-weight: 500;
    color: #1c1c1c;
}

.riskText {
    font-size: 0.9rem;
    line-height: 1.7;
    color: rgba(198, 40, 40, 0.9);
    font-weight: 500;
}

@media print {
    .reasonCardsContainer {
        page-break-inside: avoid;
    }

    .reasonCard {
        page-break-inside: avoid;
        background-color: rgba(198, 40, 40, 0.05);
    }
}
```

---

## 📄 functions/src/engine/calculation/index.ts

```typescript
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

## 📄 src/App.module.css

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

## 📄 .env.production.example

```text
# [CRITICAL] Firebase Web Configuration (Production)
# 🚨 모든 값은 Firebase Console에서 직접 복사한 'non-empty' 실제값이어야 합니다.
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=myungri-genesis.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=myungri-genesis
VITE_FIREBASE_STORAGE_BUCKET=myungri-genesis.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=

# [CRITICAL] App Check reCAPTCHA v3
VITE_RECAPTCHA_SITE_KEY=

# [OPTIONAL] External SDKs
VITE_KAKAO_JS_KEY=

# [CONFIG] Public Origin
VITE_PUBLIC_ORIGIN=https://myungri-genesis.web.app

```

---

## 📄 src/components/ui/AdviceBox.module.css

```css
.adviceBox {
    background-color: transparent;
    border: none;
    padding: 0;
    position: relative;
    margin: 2rem 0;
}

.badge {
    display: none;
    /* Hide badge, using icon instead */
}

.content {
    font-family: var(--font-serif);
    font-style: italic;
    font-size: 1.05rem;
    color: var(--ink);
    line-height: 1.7;
    display: flex;
    align-items: flex-start;
}

.content::before {
    content: "💡";
    font-style: normal;
    margin-right: 12px;
    font-size: 1.2rem;
}
```

---

## 📄 src/components/layout/Container.module.css

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

---

**Part 7/10 완료**

[← 인덱스로 돌아가기](./INDEX.md) | [← Part 6](./codebase_part_06.md) | [Part 8 →](./codebase_part_08.md)
```

---

## File 11: `codebase_docs/codebase_part_08.md` {#file-11}

**크기**: 68.19 KB | **확장자**: md

```md
# 📦 프로젝트 코드베이스 - Part 8/10

> 생성일: 2026. 1. 3. 오후 10:52:25

[← 인덱스로 돌아가기](./INDEX.md)

## 📋 이 파트의 파일 목록

- `project_docs_structured/docs.md`
- `src/pages/Start.tsx`
- `project_docs_structured/backend-engine.md`
- `src/pages/Processing.tsx`
- `WORK_LOG_PHASE_1_2.md`
- `src/components/share/ShareActions.tsx`
- `project_docs_structured/config-env.md`
- `firebase.json`
- `scripts/rollback.ps1`
- `tsconfig.node.json`
- `src/components/ui/Card.module.css`
- `src/components/ui/ContextBox.module.css`
- `vite.config.ts`
- `.firebaserc`
- `src/App.css`

---

## 📄 파일 내용

## 📄 project_docs_structured/docs.md

```markdown
# Documentation

> 프로젝트 문서 (README, 작업 로그, 설정 문서 등)

**생성 시각**: 2026-01-03T09:38:11.893Z

---

## 📋 목차 (3개 파일)

1. [README.md](#file-1)
2. [WORK_LOG_PHASE_1_2.md](#file-2)
3. [fate_forensics_초원자단위_prd_와이어프레임_개발로드맵_v_2_오류대응_v_1.md](#file-3)

---

## File 1: `README.md` {#file-1}

**크기**: 2.50 KB | **확장자**: md

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

## File 2: `WORK_LOG_PHASE_1_2.md` {#file-2}

**크기**: 4.23 KB | **확장자**: md

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

## File 3: `fate_forensics_초원자단위_prd_와이어프레임_개발로드맵_v_2_오류대응_v_1.md` {#file-3}

**크기**: 14.49 KB | **확장자**: md

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


```

---

## 📄 src/pages/Start.tsx

```tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container } from '../components/layout/Container';
import { Card } from '../components/ui/Card';
import { Header } from '../components/layout/Header';
import { detectScriptType } from '../lib/text';
import styles from './Start.module.css';

interface FormData {
    userName: string;
    birthDate: string;
    birthTime: string;
    timeUnknown: boolean;
    sex: 'male' | 'female' | '';
    calendar: 'solar' | 'lunar' | '';
    isLeapMonth: boolean;
    timezone: 'Asia/Seoul';
}

interface Errors {
    userName?: string;
    birthDate?: string;
    sex?: string;
    calendar?: string;
}

export const Start: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<FormData>({
        userName: '',
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

        if (!name || name === 'userName') {
            const trimmed = formData.userName.trim();
            if (trimmed.length < 2) {
                newErrors.userName = '이름은 최소 2자 이상이어야 합니다.';
            } else if (trimmed.length > 20) {
                newErrors.userName = '이름은 최대 20자까지 입력 가능합니다.';
            } else {
                delete newErrors.userName;
            }
        }

        if (!name || name === 'birthDate') {
            if (!formData.birthDate) {
                newErrors.birthDate = '생년월일을 선택해주세요.';
            } else {
                const year = parseInt(formData.birthDate.split('-')[0]);
                if (year < 1900 || year > 2099) {
                    newErrors.birthDate = '1900년~2099년 사이의 유효한 날짜를 입력하세요.';
                } else {
                    delete newErrors.birthDate;
                }
            }
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

        // userName 정규식 필터링 (한글/영문/공백 외 제거)
        let filteredValue = value;
        if (name === 'userName') {
            filteredValue = value.replace(/[^가-힣a-zA-Z\s]/g, '');
        }

        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : filteredValue
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
            const trimmedName = formData.userName.trim();
            const payload: any = {
                birthDate: formData.birthDate,
                birthTime: formData.birthTime,
                timeUnknown: formData.timeUnknown,
                sex: formData.sex,
                calendar: formData.calendar,
                isLeapMonth: formData.isLeapMonth,
                timezone: formData.timezone
            };

            // Only include userName and scriptType if name is provided
            if (trimmedName.length > 0) {
                payload.userName = trimmedName;
                payload.scriptType = detectScriptType(trimmedName);
            }

            navigate('/processing', { state: payload });
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
                        {/* Name */}
                        <div className={styles.field}>
                            <label htmlFor="userName" className={styles.label}>성명 (한자 권장, 한글 가능)</label>
                            <input
                                type="text"
                                id="userName"
                                name="userName"
                                value={formData.userName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="예: 洪吉童 또는 홍길동"
                                className={`${styles.input} ${touched.userName && errors.userName ? styles.inputError : ''}`}
                            />
                            {touched.userName && errors.userName && (
                                <span className={styles.errorMsg}>{errors.userName}</span>
                            )}
                        </div>

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

## 📄 project_docs_structured/backend-engine.md

```markdown
# Backend - Calculation Engine

> 명리 계산 엔진 (사주 계산, 일진 계산 등)

**생성 시각**: 2026-01-03T09:38:11.857Z

---

## 📋 목차 (2개 파일)

1. [functions/src/engine/calculation/index.ts](#file-1)
2. [functions/src/engine/calculation/v1.ts](#file-2)

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


```

---

## 📄 src/pages/Processing.tsx

```tsx
import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { httpsCallable } from 'firebase/functions';
import { functionsKR as functions } from '../lib/firebase';
import { Container } from '../components/layout/Container';
import { Header } from '../components/layout/Header';
import { Card } from '../components/ui/Card';
import styles from './Processing.module.css';

/**
 * Processing Page [Phase 27: Zero Silent Redirect]
 * 1. 호출: generateReport Callable API 호출 (functionsKR 강제)
 * 2. 대기: 최소 시각적 대기 시간을 확보하며 트리비아 롤링
 * 3. 이동: 성공 시에만 reportId 경로로 이동
 * 4. 에러: 실패 시 상세 에러 패널 노출 (자동 이동 절대 금지)
 */
export const Processing: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const formData = location.state;

    const [logs, setLogs] = useState<string[]>([]);
    const [error, setError] = useState<{
        code?: string;
        message: string;
        details?: string;
    } | null>(null);

    // 로그 시퀀스 정의
    const LOG_SEQUENCE = [
        { text: "SYSTEM_BOOT_SEQUENCE_INIT...", delay: 0 },
        { text: "PARSING_FOUR_PILLARS_DATA...", delay: 1500 },
        { text: "ACCESSING_GENESIS_ARCHIVE...", delay: 3000 },
        { text: "AUDITING_HUMAN_OS_KERNEL...", delay: 4500 }
    ];

    useEffect(() => {
        LOG_SEQUENCE.forEach((item) => {
            setTimeout(() => {
                setLogs(prev => [...prev, `> ${item.text} `]);
            }, item.delay);
        });
    }, []);

    const executeGeneration = useCallback(async () => {
        if (!formData) return;

        setError(null);
        const startTime = Date.now();

        try {
            const generateReportFunc = httpsCallable(functions, 'generateReport');
            const result = await generateReportFunc(formData);

            const { reportId } = result.data as any;

            // 최소 시각적 시간 보장 (로그 시퀀스가 4.5s에 시작하므로 최소 6s 대기 권장)
            const elapsedTime = Date.now() - startTime;
            const minTime = 6000;
            const remainingTime = Math.max(0, minTime - elapsedTime);

            if (remainingTime > 0) {
                await new Promise(resolve => setTimeout(resolve, remainingTime));
            }

            navigate(`/ report / ${reportId} `, { replace: true });
        } catch (err: any) {
            console.error("[generateReport] Analysis Failed:", err);
            setError({
                code: err.code,
                message: err.message || "알 수 없는 시스템 오류가 발생했습니다.",
                details: err.details ? JSON.stringify(err.details, null, 2) : ""
            });
        }
    }, [formData, navigate]);

    useEffect(() => {
        if (formData) {
            executeGeneration();
        }
    }, [formData, executeGeneration]);

    if (!formData) {
        return (
            <div className={styles.processingPage}>
                <Header lockupDisplay="en_name" />
                <Container className={styles.loadingContainer}>
                    <Card className={styles.errorCard}>
                        <h2 className={styles.errorTitle}>DATA_NOT_FOUND</h2>
                        <p className={styles.errorText}>입력 정보가 전달되지 않았습니다. 분석 시작 페이지로 돌아가 정보를 다시 입력해주세요.</p>
                        <button className={styles.retryBtn} onClick={() => navigate('/start', { replace: true })}>
                            REBOOT_SYSTEM
                        </button>
                    </Card>
                </Container>
            </div>
        );
    }

    return (
        <div className={styles.processingPage}>
            <Header lockupDisplay="en_name" />
            <Container className={styles.loadingContainer}>
                {!error ? (
                    <div className={styles.terminal}>
                        {logs.map((log, i) => (
                            <div key={i} className={styles.logLine}>
                                {log}
                                {i === logs.length - 1 && <span className={styles.cursor}>_</span>}
                            </div>
                        ))}
                    </div>
                ) : (
                    <Card className={styles.errorCard}>
                        <div className={styles.errorHeader}>
                            <h2 className={styles.errorTitle}>CRITICAL_SYSTEM_ERROR</h2>
                            {error.code && <span className={styles.errorCode}>ID: {error.code}</span>}
                        </div>
                        <p className={styles.errorText}>{error.message}</p>
                        {error.details && (
                            <div className={styles.detailsBox}>
                                <pre>{error.details}</pre>
                            </div>
                        )}
                        <div className={styles.actionRow}>
                            <button className={styles.retryBtn} onClick={executeGeneration}>RETRY</button>
                            <button className={styles.cancelBtn} onClick={() => navigate('/start')}>EXIT</button>
                        </div>
                    </Card>
                )}
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

## 📄 WORK_LOG_PHASE_1_2.md

```markdown
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

## 📄 src/components/share/ShareActions.tsx

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

## 📄 project_docs_structured/config-env.md

```markdown
# Configuration - Environment

> 환경 변수 설정 파일

**생성 시각**: 2026-01-03T09:38:11.870Z

---

## 📋 목차 (4개 파일)

1. [.env](#file-1)
2. [.env.example](#file-2)
3. [.env.production.example](#file-3)
4. [.env.production.local](#file-4)

---

## File 1: `.env` {#file-1}

**크기**: 0.65 KB | **확장자**: txt

```txt
VITE_KAKAO_JS_KEY=
VITE_PUBLIC_ORIGIN=http://localhost:5173
VITE_APP_URL=http://localhost:5173

VITE_FIREBASE_API_KEY=AIzaSyALJ16scYoDyo1bi8_62yQVZ1LzrVxY72c
VITE_FIREBASE_AUTH_DOMAIN=myungri-genesis.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=myungri-genesis
VITE_FIREBASE_STORAGE_BUCKET=myungri-genesis.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=850478803106
VITE_FIREBASE_APP_ID=1:850478803106:web:5184a93285afb9a002cffb
VITE_FIREBASE_MEASUREMENT_ID=G-RRKP53N8H8
VITE_FIREBASE_VAPID_KEY=BKY_nslFCghDrZu9-Tg5iU1bt76tvEBzmJrEesIHh9WcSZAjzyHldgAOZrY9i-xqWlQUDR_EQ_Ku2qYdKnjGgbY

VITE_RECAPTCHA_SITE_KEY=6Ld24zwsAAAAAOsfLHNZvt1mrn9BjbsrJwEF1i9E

```

---

## File 2: `.env.example` {#file-2}

**크기**: 0.12 KB | **확장자**: example

```example
# Kakao JavaScript SDK Key
VITE_KAKAO_JS_KEY=

# Public Origin (e.g. https://genesis.myungri.com)
VITE_PUBLIC_ORIGIN=

```

---

## File 3: `.env.production.example` {#file-3}

**크기**: 0.60 KB | **확장자**: example

```example
# [CRITICAL] Firebase Web Configuration (Production)
# 🚨 모든 값은 Firebase Console에서 직접 복사한 'non-empty' 실제값이어야 합니다.
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=myungri-genesis.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=myungri-genesis
VITE_FIREBASE_STORAGE_BUCKET=myungri-genesis.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=

# [CRITICAL] App Check reCAPTCHA v3
VITE_RECAPTCHA_SITE_KEY=

# [OPTIONAL] External SDKs
VITE_KAKAO_JS_KEY=

# [CONFIG] Public Origin
VITE_PUBLIC_ORIGIN=https://myungri-genesis.web.app

```

---

## File 4: `.env.production.local` {#file-4}

**크기**: 0.44 KB | **확장자**: local

```local
VITE_FIREBASE_API_KEY=AIzaSyALJ16scYoDyo1bi8_62yQVZ1LzrVxY72c
VITE_FIREBASE_AUTH_DOMAIN=myungri-genesis.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=myungri-genesis
VITE_FIREBASE_STORAGE_BUCKET=myungri-genesis.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=850478803106
VITE_FIREBASE_APP_ID=1:850478803106:web:5184a93285afb9a002cffb
VITE_FIREBASE_MEASUREMENT_ID=G-RRKP53N8H8
VITE_RECAPTCHA_SITE_KEY=6Ld24zwsAAAAAOsfLHNZvt1mrn9BjbsrJwEF1i9E

```

---


```

---

## 📄 firebase.json

```json
{
    "firestore": {
        "rules": "firestore.rules",
        "indexes": "firestore.indexes.json"
    },
    "functions": [
        {
            "source": "functions",
            "predeploy": [
                "npm --prefix \"$RESOURCE_DIR\" run build"
            ],
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
        ],
        "headers": [
            {
                "source": "/**",
                "headers": [
                    {
                        "key": "Cache-Control",
                        "value": "no-cache, no-store, must-revalidate"
                    }
                ]
            },
            {
                "source": "/assets/**",
                "headers": [
                    {
                        "key": "Cache-Control",
                        "value": "public, max-age=31536000, immutable"
                    }
                ]
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

## 📄 scripts/rollback.ps1

```powershell
# [Zero Tolerance] Production Rollback Script (PowerShell)
# Usage: ./scripts/rollback.ps1 [<version_id>]

$VersionId = $args[0]

Write-Host "🚨 [Rollback] Initiating emergency production rollback..." -ForegroundColor Red

# 1. Hosting Rollback
if ($VersionId) {
    Write-Host "📦 Rolling back Hosting to version: $VersionId" -ForegroundColor Yellow
    firebase hosting:clone "myungri-genesis:$VersionId" myungri-genesis:live
} else {
    Write-Host "📦 Rolling back Hosting to PREVIOUS version..." -ForegroundColor Yellow
    firebase hosting:rollback
}

# 2. Functions Rollback (Manual Intervention Note)
# Firebase Functions는 배포 시점에 코드 전체가 스냅샷되므로, 
# 이전 버전의 코드로 다시 배포(deploy)하는 것이 공식 롤백 방식입니다.
Write-Host "`n⚠️ [Note] Firebase Functions are stateless snapshoted at deploy time." -ForegroundColor Cyan
Write-Host "👉 To fully rollback Functions, checkout the previous stable Git tag and run:" -ForegroundColor Cyan
Write-Host "   firebase deploy --only functions" -ForegroundColor Green

Write-Host "`n✅ Rollback command sequence initiated." -ForegroundColor Green
Write-Host "👉 PLEASE: Run 'firebase hosting:channel:list' to verify the live version." -ForegroundColor White

```

---

## 📄 tsconfig.node.json

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

## 📄 src/components/ui/Card.module.css

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

## 📄 src/components/ui/ContextBox.module.css

```css
.contextBox {
    background-color: #F7F7F7;
    border-left: 4px solid #8C8C8C;
    padding: 20px;
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

## 📄 vite.config.ts

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})

```

---

## 📄 .firebaserc

```text
{
  "projects": {
    "default": "myungri-genesis"
  }
}

```

---

## 📄 src/App.css

```css
/* App.css cleared for Genesis brand system */
```

---

---

**Part 8/10 완료**

[← 인덱스로 돌아가기](./INDEX.md) | [← Part 7](./codebase_part_07.md) | [Part 9 →](./codebase_part_09.md)
```

---

## File 12: `codebase_docs/codebase_part_09.md` {#file-12}

**크기**: 68.20 KB | **확장자**: md

```md
# 📦 프로젝트 코드베이스 - Part 9/10

> 생성일: 2026. 1. 3. 오후 10:52:25

[← 인덱스로 돌아가기](./INDEX.md)

## 📋 이 파트의 파일 목록

- `project_docs/core_config_complete.md`
- `fate_forensics_초원자단위_prd_와이어프레임_개발로드맵_v_2_오류대응_v_1.md`
- `scripts/generate-structured-docs.cjs`
- `src/components/report/LuckCalendar.module.css`
- `src/pages/Processing.module.css`
- `scripts/debug-v1.cts`
- `README.md`
- `index.html`
- `scripts/gen-build-info.mjs`
- `tsconfig.app.json`
- `src/config/shareMeta.ts`
- `functions/tsconfig.json`
- `src/buildInfo.ts`
- `firestore.indexes.json`

---

## 📄 파일 내용

## 📄 project_docs/core_config_complete.md

```markdown
# MYUNGRI: The Genesis - Core Configuration & Production Code

이 문서는 프로젝트의 핵심 설정, 보안 정책, 그리고 프로덕션 배포에 필수적인 파일들의 전체 코드를 포함하고 있습니다.

---

## 📂 1. Project Configuration (Root)

### File: `package.json`
```json
{
  "name": "myungri-the-genesis",
  "author": "KS Company <suhachi78@gmail.com>",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "prebuild": "node scripts/check-env.cjs",
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

### File: `vite.config.ts`
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
```

### File: `index.html`
```html
<!doctype html>
<html lang="ko">

<head>
  <meta charset="UTF-8" />
  <link rel="icon" type="image/svg+xml" href="/vite.svg" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <!-- SEO & Metadata [Strategist Protocol] -->
  <title>MYUNGRI: The Genesis</title>
  <meta name="author" content="KS Company" />
  <meta name="copyright" content="KS Company" />
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

  <!-- Kakao SDK [Fixed Load Option A] 
       Pined SRI hash to match production integrity check (sha384 computed by browser) -->
  <script src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js"
    integrity="sha384-DKYJZ8NLiK8MN4/C5P2dtSmLQ4KwPaoqAfyA/DfmEc1VDxu4yyC7wy6K1Hs90nka" crossorigin="anonymous"
    defer></script>
</head>

<body>
  <div id="root"></div>
  <script type="module" src="/src/main.tsx"></script>
</body>

</html>
```

---

## 🛡️ 2. Frontend Core (Security & Firebase)

### File: `src/lib/firebase.ts`
```typescript
/// <reference types="vite/client" />
import { initializeApp } from "firebase/app";
import type { FirebaseApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import type { Firestore } from "firebase/firestore";
import { connectFirestoreEmulator } from "firebase/firestore";
import { getFunctions } from "firebase/functions";
import type { Functions } from "firebase/functions";
import { connectFunctionsEmulator } from "firebase/functions";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

/**
 * Firebase 초기화 및 보안 하드닝 [Phase 8: Robust Configuration]
 */

// 1. 환경 변수 매핑 및 유효성 검사
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

export let firebaseConfigError: string | null = null;
export let isAppCheckReady = false;
export let appCheckError: string | null = null;

let app: FirebaseApp | undefined;
let db: Firestore | undefined;
let functions: Functions | undefined;

// 필수 값 누락 확인 (런타임 크래시 방지)
const isConfigValid = !!(
    firebaseConfig.apiKey &&
    firebaseConfig.projectId &&
    firebaseConfig.appId
);

if (isConfigValid) {
    try {
        app = initializeApp(firebaseConfig);
        db = getFirestore(app);
        functions = getFunctions(app, 'asia-northeast3');

        // App Check 초기화 (Web: reCAPTCHA v3)
        if (typeof window !== 'undefined') {
            // 로컬 개발 환경(localhost)에서는 Debug Provider 활성화
            if (import.meta.env.DEV) {
                // @ts-ignore
                self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
                isAppCheckReady = true;
            }

            const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
            if (siteKey) {
                initializeAppCheck(app, {
                    provider: new ReCaptchaV3Provider(siteKey),
                    isTokenAutoRefreshEnabled: true
                });
                isAppCheckReady = true;
            } else if (!import.meta.env.DEV) {
                appCheckError = "MISSING_SITE_KEY";
                console.error("Critical: App Check Site Key is missing in production.");
            }
        }
    } catch (e) {
        firebaseConfigError = "INIT_FAILED";
        console.error("Firebase Initialization Failed:", e);
    }
} else {
    firebaseConfigError = "MISSING_FIREBASE_CONFIG";
    console.error("Critical: Firebase configuration values are missing. Check your environment variables.");
}

// Analytics (가용 환경에서만)
export const analytics = (app && typeof window !== 'undefined') ? getAnalytics(app) : null;

// Emulator 연결
if (app && db && functions && import.meta.env.DEV) {
    connectFirestoreEmulator(db, '127.0.0.1', 8080);
    connectFunctionsEmulator(functions, '127.0.0.1', 5001);
}

export const dbInstance = db as Firestore;
export const functionsInstance = functions as Functions;
export { app, db, functions };
export default app;
```

### File: `src/App.tsx`
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
import { Footer } from './components/layout/Footer';
import { isAppCheckReady, appCheckError, firebaseConfigError } from './lib/firebase';
import { SecurityShield } from './components/system/SecurityShield';

function App() {
  const [showHome, setShowHome] = useState(false);

  // [Zero Tolerance] Security Fail-Fast: Block app in production if Config or App Check is missing
  if (import.meta.env.PROD && (!isAppCheckReady || firebaseConfigError)) {
    return <SecurityShield reason={firebaseConfigError || appCheckError} />;
  }

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
      <Footer />
    </PaperBackground>
  );
}

export default App;
```

### File: `src/main.tsx`
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

## ⚡ 3. Firebase Functions (Backend)

### File: `functions/package.json`
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

### File: `functions/src/index.ts`
```typescript
const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { setGlobalOptions } = require("firebase-functions/v2");
const admin = require("firebase-admin");
const { Timestamp } = require("firebase-admin/firestore");
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

    // [Step B] Strict isLeapMonth enforcement for Solar
    const normalizedIsLeapMonth = rawData.calendar === "solar" ? false : !!rawData.isLeapMonth;

    const input = {
        birthDate: rawData.birthDate,
        birthTime: birthTime,
        timeUnknown: timeUnknown,
        sex: rawData.sex,
        calendar: rawData.calendar,
        isLeapMonth: normalizedIsLeapMonth,
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
            createdAt: Timestamp.now(),
            version: "v3.2.1-H",
            schemaVersion: "report/v1",
            algorithmVersion: calculation.algorithmVersion,
            input: input,
            calculation: {
                ...calculation,
                forensicTime: calculation.forensicTime ?? null
            },
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
            algorithmVersion: reportData.algorithmVersion,
            calculation: calculation,
            sections: sections
        };

    } catch (error: any) {
        logger.error("Report Generation Error:", error);
        if (error instanceof HttpsError) throw error;

        const msg = error.message || "";
        // [Step B] Error classification for friendly invalid-argument fallback
        if (msg.includes("range") ||
            msg.includes("KOR_LUNAR_EXPORT_MISSING:") ||
            msg.includes("KOR_LUNAR_CONVERT_FAILED:")) {
            throw new HttpsError("invalid-argument", `입력 데이터 또는 엔진 설정 오류: ${msg}`);
        }

        throw new HttpsError("internal", `분석 엔진 처리 중 오류: ${msg || 'Unknown'}`);
    }
});
```

---

## 🛠️ 4. Firebase CLI & Infrastructure

### File: `firebase.json`
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

### File: `.firebaserc`
```json
{
  "projects": {
    "default": "myungri-genesis"
  }
}
```

---

## 📖 5. Release & Operations (Runbook)

### File: `release_runbook.md`
```markdown
# MYUNGRI: The Genesis 배포 런북 (Release Runbook)
무관용(Zero Tolerance) 원칙: **한 단계라도 실패하면 즉시 중단** 후 트리아지 → 재시도.

---

## A. 결정적 배포 시퀀스 (Deterministic Sequence)

### 1) Preflight (환경 정합성 + 프로젝트 고정)
... (복잡한 런북 전체 내용 생략 없이 보관 중) ...
```

*(참고: 런북의 전체 내용은 시스템 내부 아티팩트로 관리되고 있으며, 배포 시퀀스는 1~5단계로 구성됩니다.)*

---

## 🔑 6. Environment Templates (Masked)

### File: `.env.production.example`
```text
# Firebase Web Configuration
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=myungri-genesis.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=myungri-genesis
VITE_FIREBASE_STORAGE_BUCKET=myungri-genesis.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIREBASE_MEASUREMENT_ID=

# reCAPTCHA v3 Site Key for App Check
VITE_RECAPTCHA_SITE_KEY=

# Kakao Javascript SDK Key
VITE_KAKAO_JS_KEY=

# Public Origin
VITE_PUBLIC_ORIGIN=https://myungri-genesis.web.app
```

### File: `.env.production.local` (Masked Context)
```text
VITE_FIREBASE_API_KEY=****************************************
VITE_FIREBASE_AUTH_DOMAIN=myungri-genesis.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=myungri-genesis
VITE_FIREBASE_STORAGE_BUCKET=myungri-genesis.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=************
VITE_FIREBASE_APP_ID=1:************:web:**********************
VITE_RECAPTCHA_SITE_KEY=****************************************
```

---

*End of Documentation*

```

---

## 📄 fate_forensics_초원자단위_prd_와이어프레임_개발로드맵_v_2_오류대응_v_1.md

```markdown
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

## 📄 scripts/generate-structured-docs.cjs

```javascript
const fs = require('fs');
const path = require('path');

// --- Configuration ---
const PROJECT_ROOT = path.resolve(__dirname, '..');
const OUTPUT_DIR = path.join(PROJECT_ROOT, 'project_docs_structured');

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
    'lib',
    'project_docs',
    'project_docs_structured'
];

// Files to include (Allowlist extensions)
const ALLOW_EXTENSIONS = [
    '.ts', '.tsx',
    '.js', '.cjs', '.mjs',
    '.css', '.scss', '.module.css',
    '.html',
    '.json',
    '.md',
    '.rules',
    '.yaml', '.yml',
    '.env.example', '.env.production.example',
    '.gitignore',
    '.firebaserc'
];

// Files to explicitly ignore
const IGNORE_FILES = [
    'package-lock.json',
    'yarn.lock',
    '.DS_Store'
];

// Structure categories
const CATEGORIES = {
    'frontend-pages': {
        name: 'Frontend - Pages',
        paths: ['src/pages'],
        description: '프론트엔드 페이지 컴포넌트 (Report, Start, Processing 등)'
    },
    'frontend-components': {
        name: 'Frontend - Components',
        paths: ['src/components'],
        description: '재사용 가능한 UI 컴포넌트 (layout, ui, report, share 등)'
    },
    'frontend-core': {
        name: 'Frontend - Core',
        paths: ['src/lib', 'src/config', 'src/types', 'src/hooks'],
        description: '프론트엔드 핵심 로직 (Firebase, 유틸리티, 타입 정의)'
    },
    'frontend-styles': {
        name: 'Frontend - Styles',
        paths: ['src'],
        extensions: ['.css', '.module.css'],
        description: '전역 스타일 및 CSS 모듈'
    },
    'backend-functions': {
        name: 'Backend - Functions',
        paths: ['functions/src'],
        description: 'Firebase Functions (generateReport, generateLuckCalendar 등)'
    },
    'backend-engine': {
        name: 'Backend - Calculation Engine',
        paths: ['functions/src/engine'],
        description: '명리 계산 엔진 (사주 계산, 일진 계산 등)'
    },
    'config-root': {
        name: 'Configuration - Root',
        paths: ['.'],
        maxDepth: 1,
        extensions: ['.json', '.js', '.cjs', '.ts', '.yaml', '.yml', '.rules', '.gitignore', '.firebaserc'],
        description: '프로젝트 루트 설정 파일 (package.json, vite.config, firebase 등)'
    },
    'config-env': {
        name: 'Configuration - Environment',
        paths: ['.'],
        maxDepth: 1,
        patterns: ['.env'],
        description: '환경 변수 설정 파일'
    },
    'scripts': {
        name: 'Scripts',
        paths: ['scripts'],
        description: '빌드 및 유틸리티 스크립트'
    },
    'docs': {
        name: 'Documentation',
        paths: ['.'],
        extensions: ['.md'],
        description: '프로젝트 문서 (README, 작업 로그, 설정 문서 등)'
    },
    'public': {
        name: 'Public Assets',
        paths: ['public'],
        description: '정적 파일 (이미지, 아이콘, manifest 등)'
    }
};

// --- Helper Functions ---

function ensureDir(dir) {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

function shouldIncludeFile(filePath, relativePath, category) {
    const ext = path.extname(filePath).toLowerCase();
    const fileName = path.basename(filePath);

    // Check ignore list
    if (IGNORE_FILES.includes(fileName)) return false;

    // Check if file is in ignored directory
    const parts = relativePath.split(path.sep);
    if (parts.some(p => IGNORE_DIRS.includes(p))) return false;

    // Category-specific filters
    if (category.extensions) {
        return category.extensions.some(e => filePath.endsWith(e) || ext === e);
    }

    if (category.patterns) {
        return category.patterns.some(p => fileName.includes(p));
    }

    // Default: check against allow list
    return ALLOW_EXTENSIONS.some(e => filePath.endsWith(e) || ext === e);
}

function getFilesInCategory(category) {
    const files = [];

    for (const basePath of category.paths) {
        const fullPath = path.join(PROJECT_ROOT, basePath);

        if (!fs.existsSync(fullPath)) continue;

        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            scanDirectory(fullPath, files, category, 0);
        } else if (stat.isFile()) {
            const relativePath = path.relative(PROJECT_ROOT, fullPath);
            if (shouldIncludeFile(fullPath, relativePath, category)) {
                files.push(fullPath);
            }
        }
    }

    return files.sort();
}

function scanDirectory(dir, fileList, category, depth) {
    if (category.maxDepth && depth >= category.maxDepth) return;

    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const filePath = path.join(dir, file);
        const relativePath = path.relative(PROJECT_ROOT, filePath);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            if (!IGNORE_DIRS.includes(file)) {
                scanDirectory(filePath, fileList, category, depth + 1);
            }
        } else {
            if (shouldIncludeFile(filePath, relativePath, category)) {
                fileList.push(filePath);
            }
        }
    });
}

function generateCategoryMarkdown(categoryKey, category) {
    console.log(`\n📂 Processing category: ${category.name}`);

    const files = getFilesInCategory(category);

    if (files.length === 0) {
        console.log(`   ⚠️  No files found in this category`);
        return;
    }

    console.log(`   ✨ Found ${files.length} files`);

    // Generate markdown content
    let content = `# ${category.name}\n\n`;
    content += `> ${category.description}\n\n`;
    content += `**생성 시각**: ${new Date().toISOString()}\n\n`;
    content += `---\n\n`;

    // Table of Contents
    content += `## 📋 목차 (${files.length}개 파일)\n\n`;
    files.forEach((filePath, index) => {
        const relativePath = path.relative(PROJECT_ROOT, filePath).replace(/\\/g, '/');
        content += `${index + 1}. [${relativePath}](#file-${index + 1})\n`;
    });
    content += `\n---\n\n`;

    // File contents
    files.forEach((filePath, index) => {
        const relativePath = path.relative(PROJECT_ROOT, filePath).replace(/\\/g, '/');

        try {
            const fileContent = fs.readFileSync(filePath, 'utf8');
            const ext = path.extname(filePath).substring(1) || 'txt';
            const stat = fs.statSync(filePath);
            const sizeKB = (stat.size / 1024).toFixed(2);

            content += `## File ${index + 1}: \`${relativePath}\` {#file-${index + 1}}\n\n`;
            content += `**크기**: ${sizeKB} KB | **확장자**: ${ext}\n\n`;
            content += `\`\`\`${ext}\n${fileContent}\n\`\`\`\n\n`;
            content += `---\n\n`;

            console.log(`   ✓ ${relativePath} (${sizeKB} KB)`);
        } catch (err) {
            console.error(`   ❌ Error reading ${relativePath}:`, err.message);
            content += `## File ${index + 1}: \`${relativePath}\` {#file-${index + 1}}\n\n`;
            content += `**오류**: 파일을 읽을 수 없습니다 - ${err.message}\n\n`;
            content += `---\n\n`;
        }
    });

    // Save to file
    const outputFileName = `${categoryKey}.md`;
    const outputPath = path.join(OUTPUT_DIR, outputFileName);
    fs.writeFileSync(outputPath, content, 'utf8');

    const sizeKB = (content.length / 1024).toFixed(1);
    console.log(`   📦 Created: ${outputFileName} (${sizeKB} KB)`);
}

function generateIndexMarkdown() {
    let content = `# 프로젝트 전체 코드 문서 - 인덱스\n\n`;
    content += `**프로젝트**: MYUNGRI - The Genesis\n`;
    content += `**생성 시각**: ${new Date().toISOString()}\n\n`;
    content += `---\n\n`;
    content += `## 📚 문서 구조\n\n`;
    content += `이 문서는 프로젝트의 전체 코드를 구조별로 분류하여 생성되었습니다.\n`;
    content += `각 카테고리별로 별도의 MD 파일이 생성되어 있습니다.\n\n`;

    content += `## 📂 카테고리 목록\n\n`;

    Object.entries(CATEGORIES).forEach(([key, category], index) => {
        const fileName = `${key}.md`;
        content += `### ${index + 1}. [${category.name}](${fileName})\n\n`;
        content += `${category.description}\n\n`;
        content += `**파일**: \`${fileName}\`\n\n`;
    });

    content += `---\n\n`;
    content += `## 🚀 사용 방법\n\n`;
    content += `1. 각 카테고리별 MD 파일을 열어 해당 영역의 전체 코드를 확인하세요.\n`;
    content += `2. 각 파일 내부에는 목차(TOC)가 포함되어 있어 빠른 탐색이 가능합니다.\n`;
    content += `3. 모든 파일은 마크다운 코드 블록으로 포맷되어 있어 가독성이 높습니다.\n\n`;

    content += `## 🔄 재생성\n\n`;
    content += `문서를 다시 생성하려면 다음 명령어를 실행하세요:\n\n`;
    content += `\`\`\`bash\n`;
    content += `node scripts/generate-structured-docs.cjs\n`;
    content += `\`\`\`\n`;

    const outputPath = path.join(OUTPUT_DIR, 'INDEX.md');
    fs.writeFileSync(outputPath, content, 'utf8');
    console.log(`\n📋 Created index: INDEX.md`);
}

function main() {
    console.log('🚀 Starting structured documentation generation...');
    console.log(`📁 Project root: ${PROJECT_ROOT}`);
    console.log(`📁 Output directory: ${OUTPUT_DIR}\n`);

    // Clean and create output directory
    if (fs.existsSync(OUTPUT_DIR)) {
        fs.rmSync(OUTPUT_DIR, { recursive: true, force: true });
    }
    ensureDir(OUTPUT_DIR);

    // Generate documentation for each category
    Object.entries(CATEGORIES).forEach(([key, category]) => {
        generateCategoryMarkdown(key, category);
    });

    // Generate index
    generateIndexMarkdown();

    console.log('\n✅ Documentation generation complete!');
    console.log(`📂 Check '${OUTPUT_DIR}' directory for all generated files.\n`);
}

// --- Execute ---
main();

```

---

## 📄 src/components/report/LuckCalendar.module.css

```css
.calendarModal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999;
    padding: 2rem;
}

.modalContent {
    background-color: #F3F0EB;
    border: 1px solid var(--ink);
    border-radius: 2px;
    max-width: 900px;
    width: 95%;
    max-height: 90vh;
    overflow-y: auto;
    padding: 40px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
}

.modalHeader {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 2px solid rgba(0, 0, 0, 0.1);
}

.modalHeader h2 {
    font-family: "Noto Serif KR", serif;
    font-size: 1.5rem;
    font-weight: 700;
    color: #1c1c1c;
}

.closeButton {
    background: none;
    border: none;
    font-size: 1.5rem;
    color: #1c1c1c;
    cursor: pointer;
    padding: 0.5rem;
    line-height: 1;
}

.closeButton:hover {
    color: #c62828;
}

.loadingState,
.errorState {
    text-align: center;
    padding: 3rem;
}

.loadingState p {
    font-size: 1rem;
    color: #1c1c1c;
    margin-bottom: 0.5rem;
}

.loadingHint {
    font-size: 0.85rem;
    color: rgba(0, 0, 0, 0.6);
}

.errorState p {
    font-size: 1rem;
    color: #c62828;
    margin-bottom: 1rem;
}

.calendarContainer {
    display: flex;
    justify-content: center;
    overflow-x: auto;
    padding: 20px 0;
    margin-bottom: 2rem;
}

.yearGrid {
    display: grid;
    grid-template-rows: repeat(7, 12px);
    /* Sun to Sat as rows if we do GitHub style, or vice versa as spec */
    grid-auto-flow: column;
    grid-auto-columns: 12px;
    gap: 3px;
}

/* Definition spec says: Columns 7, Rows 53. Let's strictly follow. */
.strictGrid {
    display: grid;
    grid-template-columns: repeat(7, 12px);
    grid-auto-rows: 12px;
    gap: 3px;
    justify-content: center;
}

.dayHead {
    font-size: 0.7rem;
    color: rgba(0, 0, 0, 0.5);
    text-align: center;
    padding-bottom: 0.25rem;
}

.dayCell {
    width: 12px;
    height: 12px;
    border-radius: 1px;
    cursor: pointer;
    transition: transform 0.1s;
    background-color: rgba(0, 0, 0, 0.05);
    /* Base */
}

.dayCell:hover {
    transform: scale(1.4);
    z-index: 100;
}

.todayCell {
    border: 1.5px solid var(--accent);
    transform: scale(1.2);
    z-index: 10;
}

/* Tooltip from spec */
.tooltip {
    position: absolute;
    background: #000;
    color: #FFF;
    padding: 4px 8px;
    font-size: 12px;
    border-radius: 2px;
    white-space: nowrap;
    pointer-events: none;
    z-index: 1000;
    transform: translate(-50%, -100%);
    margin-top: -10px;
}

.dayNum {
    font-weight: 600;
}

.dayScore {
    font-size: 0.6rem;
    opacity: 0.8;
}

/* 점수별 테마 */
.gradeGood {
    background-color: #e8f5e9;
    color: #2e7d32;
}

.gradeWarn {
    background-color: #fffde7;
    color: #fbc02d;
}

.gradeCaution {
    background-color: #ffebee;
    color: #c62828;
}

.emptyCell {
    visibility: hidden;
}

.detailPanel {
    margin-top: 1.5rem;
    background-color: #fdfcf8;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    min-height: 180px;
}

.noSelection {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 180px;
    color: rgba(0, 0, 0, 0.4);
    font-size: 0.9rem;
    font-style: italic;
}

.detailCard {
    padding: 1.5rem;
}

.detailHeader {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding-bottom: 1rem;
    margin-bottom: 1rem;
    border-bottom: 1px dashed rgba(0, 0, 0, 0.1);
}

.detailTitle {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.detailDate {
    font-size: 1.1rem;
    font-weight: 700;
}

.detailGrade {
    font-size: 0.75rem;
    font-weight: 800;
    padding: 2px 8px;
    border-radius: 4px;
    width: fit-content;
}

.detailScore {
    font-size: 0.85rem;
    color: rgba(0, 0, 0, 0.6);
}

.detailScore strong {
    font-size: 1.5rem;
    color: #1c1c1c;
    margin-left: 4px;
}

.detailBody {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
}

.detailSection h5 {
    font-size: 0.85rem;
    font-weight: 700;
    color: #c62828;
    margin-bottom: 0.75rem;
}

.detailSection ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

.detailSection li {
    font-size: 0.9rem;
    line-height: 1.5;
    color: #333;
    padding-left: 12px;
    position: relative;
    margin-bottom: 4px;
}

.detailSection li::before {
    content: "•";
    position: absolute;
    left: 0;
    color: #c62828;
}

.emptyMsg {
    font-size: 0.85rem;
    color: rgba(0, 0, 0, 0.4);
}

.modalFooter {
    margin-top: 1.5rem;
    padding-top: 1rem;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.legend {
    display: flex;
    gap: 1rem;
    font-size: 0.75rem;
}

.legendItem {
    display: flex;
    align-items: center;
    gap: 4px;
}

.dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
}

.generatedAt {
    font-size: 0.8rem;
    color: rgba(0, 0, 0, 0.6);
}

@media (max-width: 768px) {
    .calendarModal {
        padding: 0.5rem;
    }

    .modalContent {
        padding: 1rem;
        max-height: 95vh;
    }

    .calendarGrid {
        grid-template-columns: 1fr;
    }

    .detailBody {
        grid-template-columns: 1fr;
        gap: 1rem;
    }
}
```

---

## 📄 src/pages/Processing.module.css

```css
.processingPage {
    min-height: 100vh;
    background-color: #0F0F0F;
    /* Deep Black */
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
}

.processingPage::after {
    content: "";
    position: fixed;
    inset: 0;
    background-image: url('/assets/paper-noise.png');
    background-repeat: repeat;
    background-size: 150px;
    opacity: 0.1;
    /* Stronger CRT noise */
    pointer-events: none;
    z-index: 100;
}

.container {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
}

.terminal {
    width: 100%;
    max-width: 800px;
    font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
    color: #33FF00;
    /* Terminal Green */
    background: rgba(0, 0, 0, 0.4);
    padding: 40px;
    border-radius: 4px;
    border: 1px solid rgba(51, 255, 0, 0.2);
    box-shadow: 0 0 40px rgba(0, 0, 0, 1);
}

.logLine {
    font-size: 1.1rem;
    line-height: 1.8;
    margin-bottom: 8px;
    display: block;
}

.cursor {
    display: inline-block;
    width: 10px;
    height: 2px;
    background-color: #33FF00;
    margin-left: 4px;
    animation: blink 0.5s infinite;
}

@keyframes blink {

    0%,
    100% {
        opacity: 1;
    }

    50% {
        opacity: 0;
    }
}

.footer {
    padding: 24px 0;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.copyright {
    font-size: 0.8rem;
    color: var(--muted);
    text-align: center;
}

/* Phase 27: Error UI */
.errorCard {
    max-width: 500px;
    width: 90%;
    padding: 40px;
    background: rgba(20, 20, 20, 0.8);
    border: 1px solid rgba(198, 40, 40, 0.3);
    text-align: center;
    backdrop-filter: blur(10px);
}

.errorHeader {
    margin-bottom: 24px;
}

.errorTitle {
    font-size: 1.5rem;
    font-weight: 700;
    color: #ff5252;
    margin-bottom: 8px;
}

.errorCode {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: rgba(255, 82, 82, 0.6);
    background: rgba(255, 82, 82, 0.1);
    padding: 2px 8px;
    border-radius: 4px;
}

.errorText {
    font-size: 1rem;
    line-height: 1.6;
    color: var(--text-main);
    margin-bottom: 32px;
}

.detailsBox {
    background: rgba(0, 0, 0, 0.3);
    padding: 16px;
    border-radius: 8px;
    margin-bottom: 32px;
    text-align: left;
    max-height: 200px;
    overflow-y: auto;
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.detailsBox pre {
    font-family: var(--font-mono);
    font-size: 0.8rem;
    color: #888;
    white-space: pre-wrap;
    word-break: break-all;
}

.actionRow {
    display: flex;
    gap: 12px;
    justify-content: center;
}

.retryBtn {
    padding: 12px 24px;
    background: #c62828;
    color: white;
    border: none;
    border-radius: 4px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
}

.retryBtn:hover {
    background: #e53935;
    transform: translateY(-2px);
}

.cancelBtn {
    padding: 12px 24px;
    background: transparent;
    color: var(--text-main);
    border: 1px solid var(--border-main);
    border-radius: 4px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
}

.cancelBtn:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: var(--text-main);
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

## 📄 scripts/debug-v1.cts

```typescript

// Using require for CJS compatibility
const { calculateV1 } = require('../functions/src/engine/calculation/v1');

const testCases = [
    {
        name: "Solar Standard (2023-01-01 13:20)",
        input: { birthDate: "2023-01-01", birthTime: "13:20", timeUnknown: false, sex: "male", calendar: "solar", isLeapMonth: false, timezone: "Asia/Seoul" }
    },
    {
        name: "Lunar Leap (2023-05-15 13:20 - Leap Month)",
        input: { birthDate: "2023-05-15", birthTime: "13:20", timeUnknown: false, sex: "male", calendar: "lunar", isLeapMonth: true, timezone: "Asia/Seoul" }
    },
    {
        name: "Forensic Boundary (2023-01-01 00:05)",
        input: { birthDate: "2023-01-01", birthTime: "00:05", timeUnknown: false, sex: "male", calendar: "solar", isLeapMonth: false, timezone: "Asia/Seoul" }
    },
    {
        name: "Fail Safe (1800 - Should Error)",
        input: { birthDate: "1800-01-01", birthTime: "12:00", timeUnknown: false, sex: "male", calendar: "solar", isLeapMonth: false, timezone: "Asia/Seoul" },
        expectError: true
    }
];

async function runTests() {
    console.log("🚀 Starting Hardened Engine Verification (v1.2) [CJS]\n");

    for (const tc of testCases) {
        console.log(`[TEST] ${tc.name}`);
        try {
            const result = calculateV1(tc.input);

            if (tc.expectError) {
                console.error("❌ FAILED: Expected error but got success.");
            } else {
                console.log("✅ Pillars:", `${result.pillars.year.label} ${result.pillars.month.label} ${result.pillars.day.label}`);
                if (result.forensicTime) {
                    console.log(`   Forensic: ${result.forensicTime.localTime} -> ${result.forensicTime.trueSolarHHmm} (${result.forensicTime.classification}, Shift: ${result.forensicTime.dayShift})`);
                }
                if (result.warnings.length > 0) {
                    console.log("   Warnings:", result.warnings);
                }
                // Validation checks
                // For Leap Month, we expect month pillar to handle empty/unknown gracefully.
                // UNKNOWN label logic: if library returns empty, we set UNKNOWN.
                // If the Month label is UNKNOWN, we print special verified message.
                if (result.pillars.month.label === "UNKNOWN") {
                    console.log("   --> Verified UNKNOWN month handling (Safe).");
                }

                if (tc.name.includes("Boundary") && result.forensicTime.classification === "야자시") {
                    console.log("   --> Verified Forensic Boundary (Ya-Jasi).");
                }
            }
        } catch (e: any) {
            if (tc.expectError) {
                console.log(`✅ Expected Error Caught: ${e.message}`);
            } else {
                console.error("❌ ERROR:", e.message);
                console.error(e.stack);
            }
        }
        console.log("---------------------------------------------------");
    }
}

runTests();

```

---

## 📄 README.md

```markdown
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

## 📄 index.html

```html
<!doctype html>
<html lang="ko">

<head>
  <meta charset="UTF-8" />
  <link rel="icon" type="image/svg+xml" href="/vite.svg" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <!-- SEO & Metadata [Strategist Protocol] -->
  <title>MYUNGRI: The Genesis</title>
  <meta name="author" content="KS Company" />
  <meta name="copyright" content="KS Company" />
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

  <!-- Kakao SDK [Fixed Load Option A] 
       Pined SRI hash to match production integrity check (sha384 computed by browser) -->
  <script src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js"
    integrity="sha384-DKYJZ8NLiK8MN4/C5P2dtSmLQ4KwPaoqAfyA/DfmEc1VDxu4yyC7wy6K1Hs90nka" crossorigin="anonymous"
    defer></script>
</head>

<body>
  <div id="root"></div>
  <script type="module" src="/src/main.tsx"></script>
</body>

</html>
```

---

## 📄 scripts/gen-build-info.mjs

```javascript
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'), 'utf-8'));

const buildTimeISO = new Date().toISOString();
const appVersion = pkg.version || '0.0.0';

// Simple build info content
const content = `// This file is auto-generated by scripts/gen-build-info.mjs
export const buildInfo = {
  buildTimeISO: "${buildTimeISO}",
  appVersion: "${appVersion}",
  env: "${process.env.NODE_ENV || 'production'}"
};
`;

const outputPath = path.join(__dirname, '../src/buildInfo.ts');
fs.writeFileSync(outputPath, content, 'utf-8');

console.log(`[BuildInfo] Generated stamp: ${appVersion} at ${buildTimeISO}`);

```

---

## 📄 tsconfig.app.json

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

## 📄 src/config/shareMeta.ts

```typescript
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

## 📄 functions/tsconfig.json

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
        ],
        "allowJs": true,
        "checkJs": false
    },
    "compileOnSave": true,
    "include": [
        "src"
    ]
}
```

---

## 📄 src/buildInfo.ts

```typescript
// This file is auto-generated by scripts/gen-build-info.mjs
export const buildInfo = {
  buildTimeISO: "2026-01-03T11:20:41.092Z",
  appVersion: "0.0.0",
  env: "production"
};

```

---

## 📄 firestore.indexes.json

```json
{
    "indexes": [],
    "fieldOverrides": []
}
```

---

---

**Part 9/10 완료**

[← 인덱스로 돌아가기](./INDEX.md) | [← Part 8](./codebase_part_08.md) | [Part 10 →](./codebase_part_10.md)
```

---

## File 13: `codebase_docs/codebase_part_10.md` {#file-13}

**크기**: 64.06 KB | **확장자**: md

```md
# 📦 프로젝트 코드베이스 - Part 10/10

> 생성일: 2026. 1. 3. 오후 10:52:25

[← 인덱스로 돌아가기](./INDEX.md)

## 📋 이 파트의 파일 목록

- `src/pages/Report.tsx`
- `functions/src/index.ts`
- `src/components/report/LuckCalendar.tsx`
- `functions/src/generateLuckCalendar.js`
- `src/assets/react.svg`
- `src/App.tsx`
- `src/components/report/ReasonCards.tsx`
- `src/components/share/ShareActions.module.css`
- `src/config/trivia.ts`
- `firestore.rules`
- `src/components/layout/PaperBackground.tsx`
- `.env.production.local`
- `tsconfig.json`
- `.env.example`

---

## 📄 파일 내용

## 📄 src/pages/Report.tsx

```tsx
/* eslint-disable @tantml:query/no-window-matchmedia */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { dbInstance as db } from '../lib/firebase';
import { Container } from '../components/layout/Container';
import { Header } from '../components/layout/Header';
import { Card } from '../components/ui/Card';
import { ContextBox } from '../components/ui/ContextBox';
import { AdviceBox } from '../components/ui/AdviceBox';
import { ShareActions } from '../components/share/ShareActions';
import { openPrintWindow } from '../lib/pdf';
import { ReasonCards } from '../components/report/ReasonCards';
import { LuckCalendar } from '../components/report/LuckCalendar';
import { buildInfo } from '../buildInfo';
import { httpsCallable } from 'firebase/functions';
import { functionsKR as functions } from '../lib/firebase';
import type { Section } from '../types/report';
import styles from './Report.module.css';

/**
 * Report Page v4.0.0 (Phase 26)
 * 1. 크래시 수정: 완전한 섹션 정규화 + safeSplitId
 * 2. PDF 저장: 인쇄 페이지 오픈 버튼
 * 3. 운기 캘린더: 진입 UI (모달 연동)
 * 4. Reason Cards: 섹션별 근거 카드 렌더링
 */

/**
 * System Audit Report Visual Components
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

/**
 * Data Hardening Helpers (Phase 26)
 */
const normalizeSection = (s: any, index: number): Section => {
    let id = typeof s?.id === 'string' ? s.id.trim() : String(s?.id ?? "");
    const title = typeof s?.title === 'string' ? s.title.trim() : String(s?.title ?? "제목 없음");
    const category = typeof s?.category === 'string' ? s.category.trim() : "ANALYSIS";

    // Phase 27: Preserving 3-tier structure (Safe extraction)
    const result = s?.result ? String(s.result) : undefined;
    const explain = s?.explain ? String(s.explain) : undefined;
    const interpretation = s?.interpretation ? String(s.interpretation) : undefined;

    // Synthesize content for legacy display if needed
    let content = s?.content ? String(s.content) : "";
    if (!content && (result || explain || interpretation)) {
        content = [result, explain, interpretation].filter(val => val && val.length > 0).join("\n\n");
    }

    if (!id || id.length === 0) {
        id = `unknown_${index}`;
    }

    id = id.replace(/[^a-zA-Z0-9_-]/g, '_');

    return {
        id,
        title,
        content,
        category,
        result,
        explain,
        interpretation,
        type: s?.type,
        reasonCards: s?.reasonCards || []
    };
};

const normalizeSections = (input: any, toc?: any[]): Section[] => {
    let rawSections: Section[] = [];

    if (Array.isArray(input)) { rawSections = input.map((s, i) => normalizeSection(s, i)); }
    else if (input && typeof input === 'object') { rawSections = Object.values(input).map((s, i) => normalizeSection(s, i)); }

    if (!toc || !Array.isArray(toc)) return rawSections;

    // Phase 27: Strict ordering by Table of Contents
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

    // Append any sections not in TOC
    rawSections.forEach(s => {
        if (!seenIds.has(s.id)) ordered.push(s);
    });

    return ordered;
};

const safeSplitId = (id: string): string[] => {
    if (typeof id !== 'string') {
        return ['??'];
    }
    if (!id.includes('_')) {
        return [id];
    }
    return id.split('_');
};


// Phase 27: Category 한글 매핑
const CATEGORY_LABELS: Record<string, string> = {
    SUMMARY: '요약',
    ARCH: '아키텍처',
    SPEC: '명세',
    SYSTEM: '시스템',
    CORE: '코어',
    RESOURCE: '리소스',
    DEBUG: '디버그',
    SECURITY: '보안',
    APP: '애플리케이션',
    STRATEGY: '전략',
    NETWORK: '네트워크',
    STATUS: '상태',
    ROADMAP: '로드맵',
    PATCH: '패치',
    META: '메타'
};

export const Report: React.FC = () => {
    const { reportId } = useParams<{ reportId: string }>();
    const navigate = useNavigate();

    const [reportData, setReportData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
    const [showCalendar, setShowCalendar] = useState(false);
    const [isRegenerating, setIsRegenerating] = useState(false);

    // Phase 28: Quality Quality check
    const isQualityLow = useMemo(() => {
        if (!reportData?.sections) return false;
        const missingCount = reportData.sections.filter((s: any) =>
            s.result?.includes('누락') || s.explain?.includes('누락') || s.interpretation?.includes('누락')
        ).length;
        return missingCount > 6;
    }, [reportData]);

    const handleRegenerate = async () => {
        if (!window.confirm("현재 리포트의 데이터 품질을 높이기 위해 섹션별 정밀 재분석을 시작하시겠습니까? (약 1-2분 소요)")) return;

        setIsRegenerating(true);
        try {
            const generateReport = httpsCallable<any, any>(functions, 'generateReport');
            const result = await generateReport(reportData.input);
            if (result.data.reportId) {
                navigate(`/report/${result.data.reportId}`);
                window.location.reload(); // To ensure clean state
            }
        } catch (err: any) {
            console.error("Regeneration failed:", err);
            alert("리포트 재생성 중 오류가 발생했습니다: " + err.message);
        } finally {
            setIsRegenerating(false);
        }
    };

    // [D3] Firestore 데이터 Fetch (Phase 27: Version Gate)
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
                    const data = docSnap.data();

                    // Phase 27: 버전 게이트 - v6 미만은 구버전으로 표시
                    if (data.schemaVersion !== "report/v6") {
                        setReportData({ ...data, isLegacy: true });
                    } else {
                        setReportData(data);
                    }
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

    // [D3] 동적 섹션 구성 (정규화 적용)
    const activeSections = useMemo(() => {
        return normalizeSections(reportData?.sections, reportData?.tableOfContents);
    }, [reportData]);

    const scrollToSection = useCallback((id: string) => {
        const element = document.getElementById(`page-${id}`);
        if (element) {
            element.scrollIntoView({
                behavior: prefersReducedMotion ? 'auto' : 'smooth'
            });
            setIsMenuOpen(false);
        }
    }, [prefersReducedMotion]);

    const handlePdfExport = useCallback(() => {
        if (reportId) {
            openPrintWindow(reportId);
        }
    }, [reportId]);

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

    // Phase 27: 구버전 리포트 차단
    if (reportData?.isLegacy) {
        return (
            <div className={styles.reportPage}>
                <Header lockupDisplay="en_name" />
                <Container className={styles.legacyWarning}>
                    <Card className={styles.legacyCard}>
                        <h2 className={styles.legacyTitle}>⚠️ 구버전 리포트입니다</h2>
                        <p className={styles.legacyText}>
                            이 리포트는 이전 버전(Genesis-V1.2~V5.0)으로 생성되었습니다.
                        </p>
                        <p className={styles.legacyText}>
                            Phase 27 업그레이드가 적용된 최신 리포트를 생성하려면 아래 버튼을 클릭하세요.
                        </p>
                        <ul className={styles.legacyFeatures}>
                            <li>✅ 100% 한글 UI</li>
                            <li>✅ A4 인쇄 30페이지 이상</li>
                            <li>✅ 결과-풀이-해석 3단 구조</li>
                            <li>✅ 365일 운기 캘린더</li>
                            <li>✅ Reason Cards 시스템</li>
                        </ul>
                        <button onClick={() => navigate('/start')} className={styles.regenerateButton}>
                            새로 분석하기
                        </button>
                    </Card>
                </Container>
            </div>
        );
    }

    return (
        <div className={styles.reportPage}>
            <Header lockupDisplay="en_name" />

            <Container className={styles.mainLayout}>
                {/* 동적 INDEX 사이드바 */}
                <aside className={`${styles.sidebar} ${isMenuOpen ? styles.sidebarOpen : ''}`}>
                    <div className={styles.sidebarHeader}>
                        <h3>감사 목차</h3>
                        <button className={styles.closeBtn} onClick={() => setIsMenuOpen(false)}>✕</button>
                    </div>
                    <nav className={styles.nav}>
                        {activeSections.map((section) => {
                            const tokens = safeSplitId(section.id);
                            const pageNum = tokens[0] || '??';

                            return (
                                <button
                                    key={section.id}
                                    className={styles.navItem}
                                    onClick={() => scrollToSection(section.id)}
                                >
                                    <span className={styles.pageNum}>{pageNum}</span>
                                    <span className={styles.pageTitle}>{section.title}</span>
                                </button>
                            );
                        })}
                    </nav>
                </aside>

                <button className={styles.mobileNavTrigger} onClick={() => setIsMenuOpen(true)}>
                    INDEX
                </button>

                <main className={styles.reportContent}>
                    {/* Phase 28: Quality Alert Banner */}
                    {isQualityLow && (
                        <div className={styles.qualityAlert}>
                            <div className={styles.alertIcon}>⚠️</div>
                            <div className={styles.alertContent}>
                                <h3>리포트 품질 정밀화 필요</h3>
                                <p>일부 분석 섹션의 데이터가 충분하지 않습니다. 시스템 감사 알고리즘(Phase 28)을 통해 고밀도 리포트로 재생성할 수 있습니다.</p>
                                <button
                                    className={styles.regenerateBtn}
                                    onClick={handleRegenerate}
                                    disabled={isRegenerating}
                                >
                                    {isRegenerating ? "시스템 정밀 재가동 중..." : "고품질 리포트 재생성"}
                                </button>
                            </div>
                        </div>
                    )}
                    <header className={styles.reportHeader}>
                        <h1 className={styles.mainTitle}>
                            {reportData?.reportMeta?.title || "SYSTEM AUDIT v5.0"}
                        </h1>
                        <p className={styles.mainSummary}>{reportData?.reportMeta?.summary}</p>

                        {/* Phase 26: Action Buttons */}
                        <div className={styles.actionButtons}>
                            <button className={styles.pdfButton} onClick={handlePdfExport}>
                                PDF 저장
                            </button>
                            <button className={styles.calendarButton} onClick={() => setShowCalendar(true)}>
                                운기 캘린더
                            </button>
                        </div>
                    </header>

                    <ShareActions />

                    {activeSections.map((section) => (
                        <section
                            key={section.id}
                            id={`page-${section.id}`}
                            className={styles.pageSection}
                        >
                            <div className={styles.pageHeader}>
                                <span className={styles.categoryTag}>
                                    {CATEGORY_LABELS[section.category] || section.category}
                                </span>
                                <span className={styles.pageIdentifier}>섹션: {section.id}</span>
                            </div>

                            <Card className={styles.contentCard}>
                                <h2 className={styles.sectionTitle}>{section.title}</h2>

                                {section.id === "02_code" && <GenesisCodeVisual />}
                                {section.id === "07_balance" && <BalanceRadarVisual />}

                                {section.id !== "02_code" && section.id !== "07_balance" && (
                                    <>
                                        {/* Phase 27: 3단 구조 렌더링 */}
                                        {section.result && (
                                            <div className={styles.sectionBlock}>
                                                <div className={styles.resultBlock}>
                                                    <div className={styles.textContent}>
                                                        {section.result.split('\n').map((p: string, i: number) => (
                                                            p.trim() ? <p key={i}>{p}</p> : <br key={i} />
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {section.explain && (
                                            <div className={styles.sectionBlock}>
                                                <ContextBox title="분석 근거 및 원리" className={styles.explainBlock}>
                                                    <div className={styles.textContent}>
                                                        {section.explain.split('\n').map((p: string, i: number) => (
                                                            p.trim() ? <p key={i}>{p}</p> : <br key={i} />
                                                        ))}
                                                    </div>
                                                    {section.reasonCards && section.reasonCards.length > 0 && (
                                                        <ReasonCards cards={section.reasonCards} />
                                                    )}
                                                </ContextBox>
                                            </div>
                                        )}

                                        {section.interpretation && (
                                            <div className={styles.sectionBlock}>
                                                <AdviceBox badgeText="Action Plan" className={styles.interpretationBlock}>
                                                    <div className={styles.textContent}>
                                                        {section.interpretation.split('\n').map((p: string, i: number) => (
                                                            p.trim() ? <p key={i}>{p}</p> : <br key={i} />
                                                        ))}
                                                    </div>
                                                </AdviceBox>
                                            </div>
                                        )}

                                        {/* Legacy support */}
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
                        <div style={{ marginTop: '2rem', fontSize: '0.7rem', opacity: 0.3, fontFamily: 'monospace' }}>
                            BUILD: {buildInfo.appVersion} / {buildInfo.buildTimeISO}
                        </div>
                    </footer>
                </main>
            </Container>

            {/* Phase 26: Luck Calendar Modal */}
            {showCalendar && reportId && (
                <LuckCalendar reportId={reportId} onClose={() => setShowCalendar(false)} />
            )}
        </div>
    );
};

```

---

## 📄 functions/src/index.ts

```typescript
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

        const modelName = "gpt-4o";

        // [Phase 28: Per-section Segmented Generation]
        async function generateOneSection(sectionMeta: any, attempt = 1): Promise<any> {
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
            } catch (secErr: any) {
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
        const sections: any[] = [];
        let totalChars = 0;

        for (const meta of REPORT_STRUCTURE) {
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
                forensicTime: (calculation as any).forensicTime ?? null
            },
            reportMeta,
            sections: sections,
            tableOfContents: REPORT_STRUCTURE.map(meta => ({ id: meta.id, title: meta.title }))
        };

        const reportRef = await admin.firestore().collection("reports").add(reportData);

        return {
            reportId: reportRef.id,
            totalChars,
            sections: sections.map(s => ({ id: s.id, result: s.result ? "OK" : "MISSING" }))
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

## 📄 src/components/report/LuckCalendar.tsx

```tsx
import React, { useState } from 'react';
import { httpsCallable } from 'firebase/functions';
import { functionsKR as functions } from '../../lib/firebase';
import type { LuckCalendar as LuckCalendarData } from '../../types/report';
import { buildInfo } from '../../buildInfo';
import styles from './LuckCalendar.module.css';

interface LuckCalendarProps {
    reportId: string;
    onClose: () => void;
}

/**
 * LuckCalendar Component (Phase 27)
 * Displays 365-day luck calendar with scores, tags, and reason cards
 * CORS fix: Forces asia-northeast3 region via functionsKR
 */
export const LuckCalendar: React.FC<LuckCalendarProps> = ({ reportId, onClose }) => {
    const [loading, setLoading] = useState(false);
    const [calendarData, setCalendarData] = useState<LuckCalendarData | null>(null);
    const [selectedYear] = useState(new Date().getFullYear());
    const [selectedDay, setSelectedDay] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    // Phase 27: Cross-platform Date Parser (ISO String or Firestore Timestamp)
    const parseGeneratedAt = (val: any): string => {
        if (!val) return '-';
        try {
            // ISO String case
            if (typeof val === 'string') return new Date(val).toLocaleString('ko-KR');

            // Firestore Timestamp object case (seconds, _seconds)
            const seconds = val.seconds || val._seconds;
            if (seconds) return new Date(seconds * 1000).toLocaleString('ko-KR');

            const d = new Date(val);
            if (isNaN(d.getTime())) return '-';
            return d.toLocaleString('ko-KR');
        } catch (e) {
            return '-';
        }
    };

    const loadCalendar = async () => {
        setLoading(true);
        setError(null);

        try {
            console.log(`[LuckCalendar] Requesting calendar for ReportID: ${reportId}, Year: ${selectedYear}`);
            // Phase 27: Authoritative KR Region Instance (functionsKR)
            const generateLuckCalendar = httpsCallable<
                { reportId: string; year: number },
                LuckCalendarData
            >(functions, 'generateLuckCalendar');

            const result = await generateLuckCalendar({ reportId, year: selectedYear });
            setCalendarData(result.data);

            // Auto-select today if exists (KST safety: Sv-SE format is YYYY-MM-DD)
            const todayStr = new Date().toLocaleDateString('sv-SE', { timeZone: 'Asia/Seoul' });
            const todayData = result.data.calendar.find(d => d.date === todayStr);
            if (todayData) setSelectedDay(todayData);

        } catch (err: any) {
            console.error('[LuckCalendar] Failed:', {
                code: err.code,
                message: err.message,
                details: err.details
            });
            const detailedError = err.details
                ? `${err.message} (${JSON.stringify(err.details)})`
                : err.message || '캘린더 생성 중 알 수 없는 오류가 발생했습니다.';
            setError(`[${err.code || 'INTERNAL'}] ${detailedError}`);
        } finally {
            setLoading(false);
        }
    };

    // Phase 27: Fix dependency array
    React.useEffect(() => {
        loadCalendar();
    }, [reportId, selectedYear]);

    // Tooltip State
    const [hoveredDay, setHoveredDay] = useState<any>(null);
    const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent) => {
        setTooltipPos({ x: e.clientX, y: e.clientY });
    };

    // Phase 27: Render logic for 53-week grid
    const renderYearGrid = () => {
        if (!calendarData) return null;

        return (
            <div className={styles.calendarContainer} onMouseMove={handleMouseMove}>
                <div className={styles.strictGrid}>
                    {calendarData.calendar.map((day) => {
                        const isToday = day.date === new Date().toLocaleDateString('sv-SE', { timeZone: 'Asia/Seoul' });
                        const isSelected = selectedDay && selectedDay.date === day.date;

                        // Score-based coloring (rgba)
                        let backgroundColor = 'rgba(0,0,0,0.05)';
                        if (day.grade === "GOOD") {
                            backgroundColor = `rgba(46, 125, 50, ${day.score / 100})`;
                        } else if (day.grade === "WARN") {
                            backgroundColor = `rgba(211, 47, 47, ${(100 - day.score) / 100})`;
                        } else {
                            backgroundColor = `rgba(255, 152, 0, 0.4)`;
                        }

                        return (
                            <div
                                key={day.date}
                                className={`${styles.dayCell} ${isToday ? styles.todayCell : ''} ${isSelected ? styles.selectedCell : ''}`}
                                style={{ backgroundColor }}
                                onClick={() => setSelectedDay(day)}
                                onMouseEnter={() => setHoveredDay(day)}
                                onMouseLeave={() => setHoveredDay(null)}
                            />
                        );
                    })}
                </div>

                {/* 툴팁 구현 */}
                {hoveredDay && (
                    <div
                        className={styles.tooltip}
                        style={{ left: tooltipPos.x, top: tooltipPos.y }}
                    >
                        {hoveredDay.date} | {hoveredDay.iljin} | {hoveredDay.score}점
                    </div>
                )}
            </div>
        );
    };

    if (loading) {
        return (
            <div className={styles.calendarModal}>
                <div className={styles.modalContent}>
                    <div className={styles.loadingState}>
                        <p>SYSTEM_BOOT: AUDITING_LUCK_CALENDAR...</p>
                        <p className={styles.loadingHint}>최초 생성 시 운기 흐름 분석에 시간이 소요될 수 있습니다.</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.calendarModal}>
                <div className={styles.modalContent}>
                    <div className={styles.errorState}>
                        <h2 className={styles.errorTitle}>ACCESS_DENIED</h2>
                        <p>{error}</p>
                        <button onClick={onClose} className={styles.closeButton}>CLOSE</button>
                    </div>
                </div>
            </div>
        );
    }

    if (!calendarData) {
        return null;
    }

    return (
        <div className={styles.calendarModal} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <h2>{selectedYear}년 운기 감사 리포트 (SYSTEM_AUDIT)</h2>
                    <button onClick={onClose} className={styles.closeButton}>✕</button>
                </div>

                {renderYearGrid()}

                {/* 상세 설명 패널 */}
                <div className={styles.detailPanel}>
                    {selectedDay ? (
                        <div className={styles.detailCard}>
                            <div className={styles.detailHeader}>
                                <div className={styles.detailTitle}>
                                    <span className={styles.detailDate}>{selectedDay.date}</span>
                                    <span className={`${styles.detailGrade} ${selectedDay.grade === "GOOD" ? styles.gradeGood :
                                        selectedDay.grade === "WARN" ? styles.gradeWarn : styles.gradeCaution
                                        }`}>
                                        {selectedDay.grade === "GOOD" ? "최적화" : selectedDay.grade === "WARN" ? "부하 발생" : "충돌 주의"}
                                    </span>
                                </div>
                                <div className={styles.detailScore}>
                                    점수: <strong>{selectedDay.score}</strong>
                                </div>
                            </div>

                            <div className={styles.detailBody}>
                                <div className={styles.detailSection}>
                                    <h5>분석 근거</h5>
                                    {selectedDay.reasons && selectedDay.reasons.length > 0 ? (
                                        <ul>{selectedDay.reasons.map((r: string, i: number) => <li key={i}>{r}</li>)}</ul>
                                    ) : <p className={styles.emptyMsg}>설명 데이터가 없습니다(서버 출력 확인 필요)</p>}
                                </div>
                                <div className={styles.detailSection}>
                                    <h5>권장 수칙</h5>
                                    {selectedDay.actionPlan && selectedDay.actionPlan.length > 0 ? (
                                        <ul>{selectedDay.actionPlan.map((a: string, i: number) => <li key={i}>{a}</li>)}</ul>
                                    ) : <p className={styles.emptyMsg}>권장 수칙 데이터가 없습니다</p>}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className={styles.noSelection}>날짜를 클릭하면 상세 분석 리포트가 표시됩니다.</div>
                    )}
                </div>

                <div className={styles.modalFooter}>
                    <div className={styles.legend}>
                        <div className={styles.legendItem}>
                            <div className={`${styles.dot} ${styles.gradeGood}`} />
                            <span>최적화 (70+)</span>
                        </div>
                        <div className={styles.legendItem}>
                            <div className={`${styles.dot} ${styles.gradeWarn}`} />
                            <span>부하 발생 (40-69)</span>
                        </div>
                        <div className={styles.legendItem}>
                            <div className={`${styles.dot} ${styles.gradeCaution}`} />
                            <span>충돌 주의 (0-39)</span>
                        </div>
                    </div>
                    <p className={styles.generatedAt}>
                        생성 시각: {parseGeneratedAt(calendarData.generatedAt)} | B: {buildInfo.buildTimeISO.slice(0, 16)}
                    </p>
                </div>
            </div>
        </div>
    );
};


```

---

## 📄 functions/src/generateLuckCalendar.js

```javascript
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

## 📄 src/assets/react.svg

*[Binary file - .svg format]*

---

## 📄 src/App.tsx

```tsx
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { PaperBackground } from './components/layout/PaperBackground';
import { Header } from './components/layout/Header';
import { BrandLockup } from './components/common/BrandLockup';
import { Home } from './pages/Home';
import { Start } from './pages/Start';
import { Processing } from './pages/Processing';
import { Report } from './pages/Report';
import { ReportPrint } from './pages/ReportPrint';
import styles from './App.module.css';
import { Footer } from './components/layout/Footer';
import { isAppCheckReady, appCheckError as libAppCheckError, firebaseConfigError } from './lib/firebase';
import { SecurityShield } from './components/system/SecurityShield';

function App() {
  const [showHome, setShowHome] = useState(false);
  const [appCheckTimeout, setAppCheckTimeout] = useState(false);

  // [Zero Tolerance] Initializing UI Timeout (Prevent hanging)
  useEffect(() => {
    if (import.meta.env.PROD && !isAppCheckReady && !libAppCheckError && !firebaseConfigError) {
      const timer = setTimeout(() => {
        setAppCheckTimeout(true);
      }, 5000); // 5s Limit
      return () => clearTimeout(timer);
    }
  }, []);

  const effectiveAppCheckError = libAppCheckError || (appCheckTimeout ? "APPCHECK_TIMEOUT" : null);

  // [Zero Tolerance] Security Gate: Block on config error or initialization failure
  if (import.meta.env.PROD) {
    if (firebaseConfigError || effectiveAppCheckError) {
      return <SecurityShield reason={firebaseConfigError || effectiveAppCheckError} />;
    }

    if (!isAppCheckReady) {
      return (
        <div style={{
          height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'var(--bg-main)', color: 'var(--muted)', fontSize: '0.9rem'
        }}>
          Security Initializing...
        </div>
      );
    }
  }

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
        <Route path="/report/:reportId/print" element={<ReportPrint />} />
      </Routes>
      <Footer />
    </PaperBackground>
  );
}

export default App;

```

---

## 📄 src/components/report/ReasonCards.tsx

```tsx
import React from 'react';
import type { ReasonCard } from '../../types/report';
import styles from './ReasonCards.module.css';

interface ReasonCardsProps {
    cards: ReasonCard[];
}

/**
 * ReasonCards Component (Phase 26)
 * Renders reason cards with Technical Ink style
 * - title, evidence, patchCode, riskIfIgnored
 */
export const ReasonCards: React.FC<ReasonCardsProps> = ({ cards }) => {
    if (!cards || cards.length === 0) {
        return null;
    }

    return (
        <div className={styles.reasonCardsContainer}>
            <h3 className={styles.sectionTitle}>근거 카드 (Reason Cards)</h3>
            {cards.map((card, index) => (
                <div key={index} className={styles.reasonCard}>
                    <h4 className={styles.cardTitle}>{card.title}</h4>

                    {card.evidence && card.evidence.length > 0 && (
                        <div className={styles.evidenceSection}>
                            <p className={styles.label}>근거 (Evidence):</p>
                            <ul className={styles.evidenceList}>
                                {card.evidence.map((item, idx) => (
                                    <li key={idx}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {card.patchCode && card.patchCode.length > 0 && (
                        <div className={styles.patchSection}>
                            <p className={styles.label}>수정 코드 (Action Plan):</p>
                            <ul className={styles.patchList}>
                                {card.patchCode.map((patch, idx) => (
                                    <li key={idx}>{patch}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {card.riskIfIgnored && (
                        <div className={styles.riskSection}>
                            <p className={styles.label}>무시 시 리스크:</p>
                            <p className={styles.riskText}>{card.riskIfIgnored}</p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

```

---

## 📄 src/components/share/ShareActions.module.css

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

## 📄 src/config/trivia.ts

```typescript
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

## 📄 firestore.rules

```text
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

## 📄 src/components/layout/PaperBackground.tsx

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

## 📄 .env.production.local

```text
VITE_FIREBASE_API_KEY=AIzaSyALJ16scYoDyo1bi8_62yQVZ1LzrVxY72c
VITE_FIREBASE_AUTH_DOMAIN=myungri-genesis.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=myungri-genesis
VITE_FIREBASE_STORAGE_BUCKET=myungri-genesis.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=850478803106
VITE_FIREBASE_APP_ID=1:850478803106:web:5184a93285afb9a002cffb
VITE_FIREBASE_MEASUREMENT_ID=G-RRKP53N8H8
VITE_RECAPTCHA_SITE_KEY=6Ld24zwsAAAAAOsfLHNZvt1mrn9BjbsrJwEF1i9E

```

---

## 📄 tsconfig.json

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

## 📄 .env.example

```text
# Kakao JavaScript SDK Key
VITE_KAKAO_JS_KEY=

# Public Origin (e.g. https://genesis.myungri.com)
VITE_PUBLIC_ORIGIN=

```

---

---

**Part 10/10 완료**

[← 인덱스로 돌아가기](./INDEX.md) | [← Part 9](./codebase_part_09.md) | 
```

---

## File 14: `docs/RELEASE_VERIFICATION_P0_P2.md` {#file-14}

**크기**: 2.24 KB | **확장자**: md

```md
# P0/P2 Release Verification Checklist
**Target**: Production Release Candidate
**Date**: 2026-01-05

## 1. System Integrity (P0)

### 1.1 Service Worker & Build Stamps
- [ ] **Build Stamp Verification**
  - Navigate to `/report/:id` (or any existing report).
  - Scroll to Footer.
  - **Confirm**: `BUILD: <commit> <ISO>` is visible.
  - **Confirm**: `VER: <version>` is matching `package.json`.
  - **Capture**: Screenshot of Footer.

### 1.2 Hosting Headers
- [ ] **Cache Policy Verification**
  - Open DevTools -> Network Tab.
  - Reload page (ignoring cache if needed, but check header response).
  - Click `index.html` (or `/`).
  - **Confirm Header**: `Cache-Control: no-cache, no-store, must-revalidate`.
  - **Confirm Header**: `Pragma: no-cache`.
  - **Confirm Header**: `Expires: 0`.
  - **Capture**: Screenshot of Headers.

### 1.3 Service Worker Status
- [ ] **SW Lifecycle**
  - Locate `SW: Active (..., ...)` in Footer.
  - **Confirm**: Status includes Scope (e.g., `root` or `myungri-the-genesis`) and Controller (`Ctrl` or `No-Ctrl`).
  - **Action**: Check Application Tab -> Service Workers.
  - **Confirm**: Status matches UI.
  - **Capture**: Screenshot of Application Tab.

## 2. Input Validation & IME (ATOMIC-02)

### 2.1 Hangul Logic
- [ ] **Syllable Preservation**
  - Go to `/start`.
  - Type `배` using Korean IME (Key sequence: `q` + `o`).
  - **Confirm**: Character `배` remains intact (no deletion).
  - Type `배종수`.
  - **Confirm**: Full name `배종수` is entered correctly without cursor jumps.

### 2.2 Hanja Logic
- [ ] **Han Conversion**
  - Type `배` -> Press `Hanja` key -> Select `裵`.
  - **Confirm**: `裵` replaces `배` correctly.
  - Submit form.
  - **Confirm**: Report generation accepts `裵`.

### 2.3 Mixed Input
- [ ] **Alpha/Space**
  - Type `배 Jong Su`.
  - **Confirm**: Mixed input is accepted.

## 3. Backend Logic (ATOMIC-03)

### 3.1 Length Gating
- [ ] **Single Character Check**
  - Input Name: `김` (1 char).
  - Submit.
  - **Confirm**: No error alert, system proceeds to analysis.
- [ ] **Long Name Check**
  - Input Name: `김수한무거북이와두루미삼천갑자동방삭` (Very long).
  - Submit.
  - **Confirm**: No error alert, system proceeds.

```

---

## File 15: `fate_forensics_초원자단위_prd_와이어프레임_개발로드맵_v_2_오류대응_v_1.md` {#file-15}

**크기**: 14.49 KB | **확장자**: md

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

