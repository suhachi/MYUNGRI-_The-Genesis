# ATOMIC-R2-02_ENGINE_BOUNDARY
**일자**: 2026-01-05
**상태**: **완료 (VERIFIED)**

## 1. 개요
사주 계산의 정확성과 결정론적 성격을 보장하기 위해, 모든 수학적/천문학적 계산 로직을 LLM 및 네트워크와 분리된 순수 모듈 하에 배치했습니다.

## 2. 엔진 아키텍처 (Pure Modules)

| 모듈명 | 역할 | 주요 파일 |
| :--- | :--- | :--- |
| **Gateway** | 전체 엔진의 단일 진입점 | `engine/index.ts` |
| **Calendar** | 양력/음력 변환 및 시간 보정 | `engine/calendar/*` |
| **Pillars** | 입춘 기준 사주 팔자 계산 | `engine/pillars/index.ts` |
| **Daewoon** | 대운수 및 대운 간지 계산 | `engine/daewoon/index.ts` |
| **Sewoon** | 해당 연도의 운세(연운) 계산 | `engine/sewoon/index.ts` |
| **Naming** | 강희자전 기반 성명학 분석 | `engine/naming/index.ts` |
| **Calendar365** | 12개월 롤링 날짜 및 일진 계산 | `engine/calendar365/index.ts` |

## 3. 핵심 규칙 (Constraints)
1. **순수성 (Purity)**: `/engine` 내부에서는 LLM 호출, 데이터베이스 쓰기, 외부 API 요청이 절대 금지됩니다.
2. **데이터 중심 (Data Only)**: 엔진은 자연어 서술 없이 오직 정형화된 데이터 패킷(`DeterministicPacket`)만 반환합니다.
3. **정밀도 (Precision)**: 대운 계산 등에서 분 단위 정밀도를 확보하여 결정론적 결과를 보장합니다.

## 4. 통합 결과
- `functions/src/index.ts`에서 산재해 있던 계산 코드를 제거하고 `generateDeterministicPacket` 호출로 일원화했습니다.
- 전체 TypeScript 빌드 및 타입 검사가 성공적으로 완료되었습니다.

---
**보고자**: 엔진 리팩토링 엔지니어
**판정**: **PASS - 결정론적 계산 경계가 물리적으로 고정됨.**
