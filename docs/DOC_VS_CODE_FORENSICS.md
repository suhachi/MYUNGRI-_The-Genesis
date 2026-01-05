# DOC_VS_CODE_FORENSICS [ATOMIC-06]
**일자**: 2026-01-05
**감사관**: 수석 감사관 (포렌식 일치성 담당)

## 1. 개요
본 보고서는 프로젝트 내 각종 문서(AUDIT_EXEC_SUMMARY.md 등)가 주장하는 "PASS" 항목들이 실제 소스 코드에서 어떻게 강제(Enforcement)되고 있는지 전수 조사한 결과입니다.

## 2. 일치성 매트릭스 (Consistency Matrix)

| 주장 (Claimed Sentence) | 강제 코드 위치 (Enforcing Code) | 판정 (Verdict) | 근거 및 증거 |
| :--- | :--- | :--- | :--- |
| "한글 IME 입력 깨짐 문제... 확실하게 해결" | `Start.tsx`:140-142, 161-169 | **PASS** | `onChange`에서 정제를 유보하고 `onCompositionEnd`에서 최종 정제 수행 확인. |
| "성명은... 길이 제한으로 차단하지 않는다" | `input.schema.ts`:5-7, `Start.tsx`:227 | **PASS** | Zod 스키마 및 HTML Input에 min/max/maxLength 제한 부재 확인. |
| "Sanitizer 단일 진실 공급원" | `nameSanitize.ts` (FE/BE 공유) | **PASS** | `src/lib/`와 `functions/src/shared/`에 동일 유틸리티 배치 및 참조 확인. |
| "Index.html은 절대 캐시되면 안 된다" | `firebase.json`:34-51 | **PASS** | `no-cache, no-store, must-revalidate` 헤더가 명시적으로 설정됨. |
| "빌드 Git 해시(버전)가 사용자에게 보여야 한다" | `Report.tsx`:491, `package.json`:9 | **PASS** | `prebuild`를 통한 자동 생성 및 Footer 영역 하드코딩 없는 바인딩 확인. |
| "업데이트 준비 시 UPDATE READY 노출" | `SWStatus.tsx`:25, 32, 46 | **PASS** | `reg.waiting` 상태 감시 및 클릭 시 `window.location.reload()` 트리거 확인. |

## 3. 세부 포렌식 로그

### 3.1 IME 안전성 (IME Safety)
- **문서 주장**: `IME_FORENSICS_REPORT.md`에서 "조합 종료 시점에만 필터링 수행" 주장.
- **코드 확인**: `src/pages/Start.tsx`의 `handleComposition` 함수 내 `e.type === 'compositionend'` 블록에서만 `setFormData`를 통해 `sanitizeUserName`이 적용됨을 확인.

### 3.2 길이 차단 부재 (No Length Gating)
- **문서 주장**: `CONTRACT_CLAUSE_VERIFICATION.md`에서 "길이 제한 없음" 주장.
- **코드 확인**: 
  - 프론트엔드: `userName` 입력창에 `maxLength` 속성 없음.
  - 백엔드: `functions/src/contracts/input.schema.ts`의 `userName` 필드에 `.min()` 또는 `.max()` 메서드 호출 없음.

### 3.3 캐시 정책 (Cache Integrity)
- **문서 주장**: `ATOMIC_COMPLIANCE_MATRIX.md`에서 "P10-ATOMIC-002 PASS" 주장.
- **코드 확인**: `firebase.json`의 `hosting.headers` 배열에서 `/index.html` 소스에 대해 `Pragma: no-cache`와 `Expires: 0`을 포함한 강력한 안티-캐시 설정 확인.

## 4. 종합 결론
조사 결과, 프로젝트 문서에서 주장하는 모든 "PASS" 항목은 실제 소스 코드 상의 구현과 **100% 일치**합니다. 
문서상의 주장은 단순한 선언이 아닌, 실제 작동하는 코드(Enforcing Code)에 기반하고 있음을 확인했습니다.

**최종 판정**: **PASS (완전 일치)**
