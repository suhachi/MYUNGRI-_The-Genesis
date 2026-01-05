# ATOMIC-R2-01_CONTRACT_NOTES
**일자**: 2026-01-05
**상태**: **완료 (VERIFIED)**

## 1. 개요
프론트엔드와 백엔드 간의 데이터 규격을 일원화하기 위해 루트 `/contracts` 디렉토리를 도입하고, 동일한 Zod 스키마를 사용하여 런타임 검증을 강제했습니다.

## 2. 주요 변경 사항

### 2.1 공유 계약(Contract) 도입
- **경로**: `/contracts/`
- **입력 스키마 (`input.schema.ts`)**: `birthDate`, `sex`, `calendar`, `timezone` 등의 필수 사주 정보를 정의하며, 윤달 및 시간 정보 유무에 따른 상호 의존성을 검증합니다.
- **출력 스키마 (`output.schema.ts`)**: 리포트의 모든 섹션이 `{result, explain, interpretation}` 3필드 구조를 갖도록 강제하며, 대운(lifeBuckets)의 9개 구간 존재 여부를 체크합니다.

### 2.2 Sanitizer SSOT 통합
- 기존에 분산되어 있던 `nameSanitize.ts`를 `contracts/shared/nameSanitize.ts`로 통합하여 정제 로직의 단일 진실 공급원(SSOT)을 확보했습니다.

### 2.3 배포 동기화 체계 구축
- Firebase Functions의 격리된 빌드 환경을 지원하기 위해 `scripts/sync-contracts.mjs`를 생성했습니다. 빌드 시 루트의 최신 계약서가 백엔드로 자동 복제됩니다.

## 3. 검증 결과

### 3.1 회귀 테스트 (Frontend)
- `npm test` 결과: **5/5 PASS**
- IME 입력 보호 및 계약서 기반 유효성 검사 로직 정상 작동 확인.

### 3.2 빌드 검증 (Backend)
- `npm --prefix functions run build` 결과: **SUCCESS**
- 기존 엔진 모듈들과의 타입 호환성 확보 완료 (`FullReportData`, `ReportSection` 별칭 추가).

## 4. 제거된 레거시 (Cleanup)
- `src/lib/nameSanitize.ts` (제거 완료)
- `functions/src/shared/nameSanitize.ts` (제거 완료)

---
**보고자**: 타입/계약 엔지니어
**판정**: **PASS - 시스템의 중추 계약 체계가 성공적으로 확립됨.**
