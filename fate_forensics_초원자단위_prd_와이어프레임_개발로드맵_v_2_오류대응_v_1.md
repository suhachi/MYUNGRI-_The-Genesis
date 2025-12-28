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

