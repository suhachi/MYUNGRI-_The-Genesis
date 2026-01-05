# SW_STATUS_AUDIT [ATOMIC-05]
**일자**: 2026-01-05
**감사관**: ATOMIC-AUDIT-05 (서비스워커 관측성)

## 1. 컴포넌트 감사: `src/components/ui/SWStatus.tsx`

| 규칙 (Rule) | 파일:라인 | 스니펫 (Snippet) | 판정 |
|:--- |:--- |:--- |:---:|
| **A. SW 상태 안전 읽기** | `SWStatus.tsx`:8 | `if (!('serviceWorker' in navigator))` | **PASS** |
| **B. Scope & Controller 표시** | `SWStatus.tsx`:16~18 | `Active (${scope}, ${ctrl})` | **PASS** |
| **C. 업데이트 감지 (Waiting)** | `SWStatus.tsx`:25 | `if (reg.waiting) setUpdateAvailable(true);` | **PASS** |
| **D. 업데이트 실행 (Reload)** | `SWStatus.tsx`:46 | `onClick={() => window.location.reload()}` | **PASS** |

## 2. 렌더링 위치 검사

| 위치 (Location) | 파일 | 증거 (Evidence) | 판정 |
|:--- |:--- |:--- |:---:|
| **리포트 푸터** | `src/pages/Report.tsx`:492 | `<SWStatus />` | **PASS** |
| **인쇄 페이지 푸터** | `src/pages/ReportPrint.tsx` | (컴포넌트 미배치) | **INFO** |

> [!NOTE]
> `ReportPrint.tsx`는 인쇄 최적화 페이지이므로 동적인 SW 상태 표시가 필수적이지는 않으나, 텍스트 일관성을 위해 추후 추가를 검토할 수 있습니다.

## 3. 종합 결론
- **관측성**: 사용자가 현재 서비스 워커가 정상적으로 도메인을 제어(`Controller`)하고 있는지, 어떤 범위(`Scope`)에서 작동하는지 명확히 확인할 수 있습니다.
- **업데이트 UX**: 새로운 버전이 배포되었을 때(`waiting`) "UPDATE READY" 메시지를 통해 인지시키고, 클릭 한 번으로 최신 상태로 갱신할 수 있는 흐름이 완비되어 있습니다.

**최종 판정**: **PASS (적합)**
