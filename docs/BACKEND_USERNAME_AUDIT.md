# BACKEND_USERNAME_AUDIT [ATOMIC-03]
**일자**: 2026-01-05
**감사관**: ATOMIC-AUDIT-03 (백엔드 입력 처리)

## 1. 백엔드 진입점 검사: `functions/src/index.ts`

| 규칙 (Rule) | 파일:라인 | 스니펫 (Snippet) | 판정 |
|:--- |:--- |:--- |:---:|
| **A. 길이 차단 금지** | `index.ts`:117~131 | (min/max 등 길이 검사 로직 부재) | **PASS** |
| **B. Sanitize 강제 적용** | `index.ts`:122 | `userName = sanitizeUserName(userName).trim();` | **PASS** |
| **C. 정상 입력 보존** | `index.ts`:124~128 | (스크립트 판별만 수행하고 throw 없음) | **PASS** |

## 2. 상세 분석
- **길이 정책**: `if (len < 2)`와 같은 인위적인 길이 차단 코드가 존재하지 않습니다.
- **정제 정책**: `validInput.userName`이 존재할 경우, 즉시 `sanitizeUserName`을 통과시킵니다. 이는 원본 입력에 포함될 수 있는 XSS 시도나 유효하지 않은 문자를 안전하게 제거합니다.
- **로직 흐름**:
  1. 입력 수신 (`validInput.userName`)
  2. 존재 시 Sanitize 수행 (`sanitizeUserName`)
  3. 스크립트 타입 판별 (`Han`, `Hangul`, `Unknown`)
  4. 후속 로직(사주 계산)으로 전달
  -> 이 과정에서 **정상적인 이름이 차단되는 경로(Main Path Block Logic)** 가 없습니다.

## 3. 종합 결론
백엔드는 프론트엔드와 동일한 "무차단, 정제 우선(Sanitize-First)" 정책을 정확히 이행하고 있습니다.
어떠한 길이의 이름(1글자 또는 장문)이라도 허용된 문자만 포함되어 있다면 정상 처리됩니다.

**최종 판정**: **PASS (적합)**
