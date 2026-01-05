# ATOMIC-R1-00_SCAN_REPORT
**일자**: 2026-01-05
**감사관**: 리팩토링 리드 / 수석 감사관
**기준선**: 
- 브랜치: `feat/phase23-name-persona-placeholder-kill`
- 커밋: `ea9b8a34bf0bbb93634c3bc38462f072df62c467`

## 1. 스캔 결과 분석 (IME 및 정책 위반 탐지)

본 스캔은 한글/한자 IME 입력 깨짐을 방지하기 위해 `userName` 정제 로직의 위치와 타이밍을 전수 조사한 결과입니다.

| 파일 경로 | 라인 범위 | 스니펫 | 정책 준수 여부 |
| :--- | :--- | :--- | :---: |
| `src/pages/Start.tsx` | 140~142 | `if (name === 'userName') { filteredValue = value; }` | **PASS** (onChange 정제 안함) |
| `src/pages/Start.tsx` | 163~169 | `onCompositionEnd... sanitizeUserName(...)` | **PASS** (조합 완료 시 정제) |
| `src/lib/patterns.ts` | 8~23 | `getNameSanitizeRegex()... NAME_SANITIZE_REGEX` | **DUPLICATE** (상수 중복 정의) |
| `src/lib/nameSanitize.ts` | 37~40 | `sanitizeUserName(raw) { ... }` | **SSOT (FE)** |
| `functions/src/shared/nameSanitize.ts` | 37~40 | `sanitizeUserName(raw) { ... }` | **SSOT (BE)** |
| `functions/src/index.ts` | 122 | `userName = sanitizeUserName(userName).trim();` | **PASS** (서버 측 강제 정제) |

## 2. 정책 위반 및 중복 로직 식별 (Refactor Targets)

### [A] 중복 정규식 정의 (`src/lib/patterns.ts`)
- **이슈**: `src/lib/nameSanitize.ts`에 이미 정의된 정제 로직이 `patterns.ts`에서도 별도의 함수(`getNameSanitizeRegex`)로 구현되어 있음.
- **리스크**: 정제 규칙 변경 시 두 곳을 모두 수정해야 하며, 누락 시 프론트엔드 내에서도 정제 결과가 달라질 수 있음.
- **조치**: `patterns.ts`를 제거하거나 `nameSanitize.ts`를 참조하도록 통합.

### [B] 인라인 정규식 파편화
- **이슈**: `input.schema.ts` 및 `Start.tsx` 일부에서 개별적인 Regex 사용 가능성. (현재는 대부분 SSOT 참조 중)

## 3. SSOT(단일 진실 공급원) 확정

| 구분 | 확정된 SSOT 경로 | 비고 |
| :--- | :--- | :--- |
| **프론트엔드** | `src/lib/nameSanitize.ts` | UI 전용 정제 및 유효성 검사 표준 |
| **백엔드** | `functions/src/shared/nameSanitize.ts` | 스키마 검증 및 저장 전 최종 정제 표준 |

## 4. 검증 커맨드 (ripgrep/grep)
```powershell
# userName 근처 .replace 사용 탐지
grep -r "userName" . | grep "replace"

# 정제 함수 및 IME 핸들러 탐지
grep -rE "NAME_SANITIZE|sanitizeUserName|onCompositionStart|onCompositionEnd|isComposing" . --exclude-dir=docs
```

## 5. 결론
현재 `Start.tsx`는 IME 안전 정책을 잘 준수하고 있으나, 코드베이스 전반에 걸쳐 **중복된 정규식 정의(`patterns.ts`)**가 발견되었습니다. 다음 단계(ATOMIC-R1-01)에서 이를 제거하고 SSOT로 완전히 통합하여 정책 위반 가능성을 원천 봉쇄하겠습니다.

**최종 판정**: **리팩토링 개시 가능 (Refactor Ready)**
