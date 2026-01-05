# ATOMIC-R1-01_IMPLEMENTATION
**일자**: 2026-01-05
**감사관**: 리팩토링 리드 / 수석 감사관

## 1. 수행 결과 요약

본 단계에서는 `userName` 정제 정책의 단일 진실 공급원(SSOT)을 강제하고, 코드베이스 전반에서 인라인 정규식을 제거하여 정책 위반을 사전에 차단하는 구조를 구축했습니다.

### 주요 변경 사항
1.  **중복 제거**: `src/lib/patterns.ts`에 존재하던 중복 정규식 로직을 삭제했습니다.
2.  **정책 감사 스크립트 도입**: `scripts/audit-ime-policy.mjs`를 생성하여 `Start.tsx` 및 백엔드 코드에서 인라인 정규식 정제가 재발할 경우 CI가 실패하도록 설정했습니다.
3.  **CI/CD 연결**: `package.json`에 `test:policy` 명령어를 추가하여 빌드 또는 테스트 과정에서 정책 준수 여부를 자동으로 검증할 수 있게 했습니다.

## 2. 변경 파일 상세 (Diff Summary)

| 파일 경로 | 변경 내용 |
| :--- | :--- |
| `src/lib/patterns.ts` | **DELETED** (중복 로직 제거) |
| `scripts/audit-ime-policy.mjs` | **NEW** (IME 정책 감사 스크립트) |
| `package.json` | `test:policy` 스크립트 추가 |

## 3. 검증 결과
- **커맨드**: `npm run test:policy`
- **결과**: `✅ IME Policy Audit PASSED.`
- **의미**: 현재 `Start.tsx`, `input.schema.ts`, `index.ts` 등 주요 파일에서 `userName`에 대한 인라인 정제 로직이 없으며, 모두 SSOT(`nameSanitize.ts`)를 참조하고 있음을 증명했습니다.

## 4. 정책 가드레일 (Policy Guard)
이제부터 누구든 `Start.tsx` 등에서 아래와 같은 코드를 작성하면 빌드가 차단됩니다.
- `userName.replace(/[^...]/g, '')` (인라인 정제 금지)
- `const NAME_SANITIZE = /.../` (로컬 상수 정의 금지)

**최종 판정**: **SSOT 강제 완료 (Enforced)**
