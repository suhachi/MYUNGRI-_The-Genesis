# 프로젝트 전체 코드 문서 - 인덱스

**프로젝트**: MYUNGRI - The Genesis
**생성 시각**: 2026-01-04T15:48:38.448Z

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
