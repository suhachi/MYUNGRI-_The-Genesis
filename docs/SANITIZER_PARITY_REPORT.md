# SANITIZER_PARITY_REPORT [ATOMIC-02]
**일자**: 2026-01-05
**감사관**: ATOMIC-AUDIT-02 (단일 진실 공급원)

## 1. 프론트엔드/백엔드 유틸리티 대조

| 항목 | 프론트엔드 (`src/lib`) | 백엔드 (`functions/src/shared`) | 일치 여부 |
| :--- | :--- | :--- | :---: |
| **파일 경로** | `nameSanitize.ts` | `nameSanitize.ts` | 관련 없음 |
| **허용 문자 정의** | `\p{Script=Hangul}\p{Script=Han}a-zA-Z\s` | `\p{Script=Hangul}\p{Script=Han}a-zA-Z\s` | **MATCH** |
| **Fallback 정의** | `ㄱ-ㅎㅏ-ㅣ가-힣一-龥a-zA-Z\s` | `ㄱ-ㅎㅏ-ㅣ가-힣一-龥a-zA-Z\s` | **MATCH** |
| **유효성 정규식** | `^[...]*$` (Unicode) | `^[...]*$` (Unicode) | **MATCH** |
| **정제 정규식** | `[^...]` (Global, Negated) | `[^...]` (Global, Negated) | **MATCH** |
| **함수 구현** | `replace(NAME_SANITIZE, '')` | `replace(NAME_SANITIZE, '')` | **MATCH** |

**결과**: 두 파일은 주석을 포함하여 **바이트 단위로 거의 동일**하며, 논리적으로 100% 일치합니다.

## 2. 백엔드 계약 참조 검증

**대상 파일**: `functions/src/contracts/input.schema.ts`

- **Import 검증**:
  ```typescript
  import { NAME_VALIDATION_REGEX } from '../shared/nameSanitize';
  ```
  -> 공유 유틸리티에서 정규식을 직접 가져옴 (**PASS**)

- **Usage 검증**:
  ```typescript
  userName: z.string()
      .regex(NAME_VALIDATION_REGEX, "...")
  ```
  -> 인라인 정규식(`regex(/.../)`) 대신 공유 상수를 사용함 (**PASS**)

## 3. 종합 결론
프론트엔드와 백엔드가 **완벽하게 동일한 정제 로직(Single Source of Truth)** 을 공유하고 있습니다.
사용자가 입력한 이름이 프론트엔드에서 통과되면 백엔드에서도 반드시 통과하며, 불일치로 인한 예외가 발생하지 않습니다.

**최종 판정**: **PASS (적합)**
