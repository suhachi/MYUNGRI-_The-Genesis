# ATOMIC-R1-03_BACKEND_NOTES
**일자**: 2026-01-05
**감사관**: 백엔드 리팩토링 엔지니어 / 수석 감사관

## 1. 수행 결과 요약

본 단계에서는 백엔드(`Cloud Functions`)의 `userName` 처리 로직을 프론트엔드 정책과 완벽하게 동기화했습니다. 이제 백엔드는 입력을 길이로 차단하지 않으며, 허용된 문자열만 남기는 "강제 정제(Forced Sanitize)" 방식을 따릅니다.

### 주요 변경 사항
1.  **Schema 수정**: `functions/src/contracts/input.schema.ts`의 `userName` 필드에서 기존의 `.regex()` 검증을 제거했습니다. 이는 부적절한 문자가 포함된 입력을 에러로 반려하는 대신, 핸들러에서 정제하여 수용하기 위함입니다.
2.  **Handler 보완**: `functions/src/index.ts`에서 `userName`의 타입 추론 오류(lint)를 해결하고, 안정적인 `sanitizeUserName(userName).trim()` 적용을 보장했습니다.
3.  **유닛 테스트 추가**: `functions/test/sanitize.test.ts`를 신규 생성하여 백엔드에서도 `sanitizeUserName`이 한글, 한자, 영문, 공백을 정확히 보존하고 특수문자만 제거하는지 검증했습니다.

## 2. 변경 파일 상세 (Diff Summary)

| 파일 경로 | 변경 내용 |
| :--- | :--- |
| `functions/src/contracts/input.schema.ts` | `userName` regex 검증 제거 (유연한 수용 표준화) |
| `functions/src/index.ts` | 타입 가드 추가 및 정제 로직 안정화 |
| `functions/test/sanitize.test.ts` | **NEW** (백엔드 SSOT 검증 테스트) |

## 3. 검증 결과
- **커맨드**: `npm --prefix functions test`
- **결과**: `Test Files 16 passed (16), Tests 56 passed (56)`
- **의미**: 강화된 스키마와 핸들러 로직이 기존 계산 로직에 영향을 주지 않으면서, `userName` 정제 정책을 성공적으로 완수했습니다.

## 4. 백엔드 정책 확정 (Final Policy)
- **길이 제한**: 없음 (Zod `min`/`max` 미사용)
- **정제 시점**: `InputSchema.parse` 이후 핸들러 진입 즉시 수행
- **허용 문자**: `SSOT(shared/nameSanitize.ts)` 정의와 100% 일치 (한글, 한자, 영문, 공백)

---
**상태**: **BACKEND_POLICY_SEALED**
