# IME_INPUT_AUDIT [ATOMIC-01]
**일자**: 2026-01-05
**감사관**: ATOMIC-AUDIT-01 (프론트엔드 입력 계약)

## 1. 컴포넌트 감사: `Start.tsx`

| 규칙 (Rule) | 파일:라인 | 스니펫 (Snippet) | 판정 |
|:--- |:--- |:--- |:---:|
| **A. 길이 차단 금지** | `Start.tsx` 전반 | (userName 관련 min/max 로직 없음) | **PASS** |
| **B. IME 상태 추적** | `Start.tsx`:47 | `const [isComposing, setIsComposing] = useState(false);` | **PASS** |
| **B. 조합 중 정제 금지** | `Start.tsx`:140~142 | `if (name === 'userName') { filteredValue = value; }` | **PASS** |
| **B. 조합 완료 시 정제** | `Start.tsx`:163~168 | `onCompositionEnd... const finalValue = sanitizeUserName(...)` | **PASS** |
| **B. 제출 시 최종 정제** | `Start.tsx`:189 | `const safeName = sanitizeUserName(formData.userName).trim();` | **PASS** |

## 2. 유틸리티 감사: `src/lib/nameSanitize.ts`

| 규칙 (Rule) | 파일:라인 | 스니펫 (Snippet) | 판정 |
|:--- |:--- |:--- |:---:|
| **C. 허용 문자 정의** | `nameSanitize.ts`:8 | `\p{Script=Hangul}\p{Script=Han}a-zA-Z\s` | **PASS** |
| **C. 정규식 안전성** | `nameSanitize.ts`:23~29 | (Unicode Flag `u` 사용 및 폴백 처리) | **PASS** |
| **C. 단일 진실 공급원** | `Start.tsx`:29 | `import { sanitizeUserName ... } from '../lib/nameSanitize';` | **PASS** |

## 3. 종합 결론
- **IME 안전성**: 한글 조합 중(`isComposing`) 입력을 방해하지 않으며, 완료 시점에만 정제하므로 "글자 깨짐" 현상이 구조적으로 방지됨.
- **길이 정책**: 1글자 또는 장문 입력에 대한 인위적인 차단 로직이 존재하지 않음 (계약 준수).
- **유효성**: 오직 허용된 문자(한글, 한자, 영문, 공백)만 남기고 나머지는 제거하는 화이트리스트 방식이 정확히 구현됨.

**최종 판정**: **PASS (적합)**
