# ATOMIC-R2-03_ASSEMBLY_NOTES
**일자**: 2026-01-05
**상태**: **완료 (VERIFIED)**

## 1. 개요
결정론적 엔진에서 생성된 데이터 패킷을 서술형 리포트로 변환하는 "조립기(Assembler)" 파이프라인을 구축했습니다. 이를 통해 LLM이 계산 필드를 임의로 생성하거나 변조하는 것을 원천 차단했습니다.

## 2. 조립 파이프라인 (A-B Pipeline)

- **A-Stage (Generation)**: `engine/index.ts`를 통해 순수 사주 데이터 패킷(`DeterministicPacket`) 생성. (LLM 개입 불가)
- **B-Stage (Assembly)**: `engine/assembler/main.ts`를 통해 패킷 데이터를 리포트 섹션 구조로 매핑.

## 3. 핵심 보안 및 품질 정책
1. **화이트리스트 매핑 (Whitelist Mapping)**: 조립기는 엔진이 제공한 패킷 내의 키만 접근할 수 있으며, 누락된 데이터에 대해 추론 또는 허위 값 생성이 금지됩니다. (Hallucination 방지)
2. **3필드 규칙 강제**: 모든 리포트 섹션은 `result`, `explain`, `interpretation` 구조를 따르도록 형식이 고정됩니다.
3. **스키마 준수**: 최종 데이터 구조는 `contracts/output.schema.ts`를 완벽히 통과하도록 강제됩니다.

## 4. 구현 세부 사항
- `functions/src/index.ts`의 `generateReport` 함수가 더 이상 직접 데이터를 가공하지 않고 조립기를 호출합니다.
- Firestore 저장 시 `deterministicPacket`과 최종 `report`가 분리 저장되어 데이터 추적성(Traceability)을 확보했습니다.

---
**보고자**: 백엔드/리포트 엔지니어
**판정**: **PASS - 결정론 기반 리포트 조립 체계 확립됨.**
