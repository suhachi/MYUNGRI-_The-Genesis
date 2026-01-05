/**
 * [ATOMIC-3-02-2] Section Prompts
 * Specific instructions for each report section to ensure maximum density and contract compliance.
 */

export const SECTION_PROMPTS = {
    executiveSummary: `
SECTION: Executive Summary (종합 분석 요약)
GOAL: Provide a 10,000-foot view of the user's destiny.
RULES:
- Summarize the core patterns and decades strategy.
- Min characters per field: 400.
`,
    originAudit: `
SECTION: Origin Audit (타고난 성향 - 원국)
GOAL: Audit the natal chart (Four Pillars).
RULES:
- Deep dive into Ten Gods, elements balance, and relations (Clashes/Harmonies).
- Use provided pillars facts Only.
- Min characters per field: 800.
`,
    lifeFlow: `
SECTION: Life Flow (대운 및 인생의 흐름)
GOAL: Analyze the 9 life buckets (10s to 80s).
RULES:
- For each bucket, translate the daewoon/sewoon combination into dense narrative text.
- Do NOT skip any of the 9 buckets.
- Min characters per field: 1,500 total for the entire section.
`,
    rolling12: `
SECTION: Rolling 12 Months (최근 1년 운세 흐름)
GOAL: Guide the user through the next 12 months.
RULES:
- Relate the monthly stem/branch energy to the user's natal chart.
- Focus on actionable seasonal strategies.
- Min characters per field: 600.
`,
    naming: `
SECTION: Naming Analysis (성명 분석)
GOAL: Evaluate the aura of the user's name.
RULES:
- If Hanja is missing, strictly state "한자 확정 불가".
- Explain the phonetic or stroke influence if applicable.
- Min characters per field: 400.
`
};

export const SECTION_PROMPTS_KO = `
(각 섹션별 핵심 지침 한글 요약)
- 종합 요약: 전체적인 운명의 흐름과 전략을 400자 이상의 고밀도 문장으로 서술.
- 원국 감사: 십신, 오행 균형, 합충형해파를 800자 이상의 전문 용어로 분석.
- 인생 흐름: 10대~80대 9개 버킷 전체를 1,500자 이상의 방대한 분량으로 서술.
- 12개월 운기: 계절적 에너지와 원국의 상호작용을 600자 이상의 구체적 전략으로 제시.
- 성명 분석: 한자 부재 시 예외 문구 필수, 성명의 기운을 400자 이상으로 분석.
`;
