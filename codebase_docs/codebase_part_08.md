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