export interface ReportPage {
    id: number;
    title: string;
    category: string;
    content: string;
    type: 'cover' | 'index' | 'summary' | 'analysis' | 'action' | 'appendix';
}

export const REPORT_SECTIONS: ReportPage[] = [
    { id: 1, title: "명리: 제네시스 분석 리포트", category: "Cover", content: "당신의 우주적 설계도와 현대적 데이터의 만남", type: 'cover' },
    { id: 2, title: "리포트 목차", category: "Index", content: "32페이지에 걸친 상세 분석 지도", type: 'index' },
    { id: 3, title: "탄생 데이터 요약", category: "Summary", content: "입력된 탄생 정보 및 환경 변수 확인", type: 'summary' },
    { id: 4, title: "원전 근거 (Reason Card 01)", category: "Evidence", content: "고전 문헌에 근거한 본질적 자아 분석", type: 'analysis' },
    { id: 5, title: "오행의 균형 분석", category: "Overview", content: "목(木), 화(火), 토(土), 금(金), 수(水) 분포도", type: 'analysis' },
    { id: 6, title: "십신(十神)의 상호작용", category: "Overview", content: "사회적 관계와 내면적 욕구의 구조", type: 'analysis' },
    { id: 7, title: "신강/신약 측정 결과", category: "Analysis", content: "일간의 힘과 주변 기운의 조화", type: 'analysis' },
    { id: 8, title: "격국(格局) 판정", category: "Analysis", content: "삶의 큰 틀과 사회적 그릇의 정의", type: 'analysis' },
    { id: 9, title: "용신(用神)과 희신(喜神)", category: "Analysis", content: "균형을 맞추는 핵심 기운과 반가운 기운", type: 'analysis' },
    { id: 10, title: "천간(天干) 에너지 분석", category: "Details", content: "드러난 성정과 외부적 기질", type: 'analysis' },
    { id: 11, title: "지지(地支) 잠재력 분석", category: "Details", content: "내면의 에너지와 현실적 기반", type: 'analysis' },
    { id: 12, title: "지장간(地藏干)의 암시", category: "Details", content: "숨겨진 재능과 예상치 못한 기회", type: 'analysis' },
    { id: 13, title: "십이운성(十二運星) 주기", category: "Cycles", content: "에너지의 성쇠와 생애 변곡점", type: 'analysis' },
    { id: 14, title: "대운(大運)의 흐름: 1단계", category: "Cycles", content: "생애 첫 번째 대운의 도전과 성과", type: 'analysis' },
    { id: 15, title: "대운(大運)의 흐름: 2단계", category: "Cycles", content: "청년기 에너지 방향성과 확장성", type: 'analysis' },
    { id: 16, title: "현재 대운 집중 분석", category: "Cycles", content: "현재 당신이 서 있는 인생의 계절", type: 'analysis' },
    { id: 17, title: "세운(歲運) 흐름: 올해의 운", category: "Cycles", content: "현재 연도의 기운적 특징과 활용법", type: 'analysis' },
    { id: 18, title: "월별 흐름 예측: 상반기", category: "Cycles", content: "기운의 변화 리듬과 월별 전략", type: 'analysis' },
    { id: 19, title: "월별 흐름 예측: 하반기", category: "Cycles", content: "안정적 마무리를 위한 기운 조율", type: 'analysis' },
    { id: 20, title: "액션 플랜: 커리어 전략", category: "Action", content: "직업적 성취를 위한 최적의 타이밍", type: 'action' },
    { id: 21, title: "액션 플랜: 재무적 흐름", category: "Action", content: "리스크 관리와 자산 형성의 시기", type: 'action' },
    { id: 22, title: "액션 플랜: 인간관계", category: "Action", content: "귀인의 원조와 조심해야 할 인연", type: 'action' },
    { id: 23, title: "액션 플랜: 조언(Advice Card)", category: "Action", content: "현재 직면한 과제에 대한 명확한 지침", type: 'action' },
    { id: 24, title: "건강 및 심리적 조언", category: "Health", content: "신체적 에너지 보강과 멘탈 관리", type: 'action' },
    { id: 25, title: "공간적 활용: 행운의 방향", category: "Action", content: "주거 및 활동 공간의 에너지 최적화", type: 'action' },
    { id: 26, title: "컬러 및 상징 활용법", category: "Action", content: "일상의 소품으로 기운을 보강하는 방법", type: 'action' },
    { id: 27, title: "원전 근거 (Reason Card 02)", category: "Evidence", content: "심화 분석 데이터 대조 결과", type: 'analysis' },
    { id: 28, title: "심층 분석: 성격의 이면", category: "Deep Dive", content: "타인이 모르는 당신만의 본질", type: 'analysis' },
    { id: 29, title: "미래 전략: 3년 내 핵심 과제", category: "Action", content: "가장 우선순위를 두어야 할 삶의 영역", type: 'action' },
    { id: 30, title: "명리학적 Appendix", category: "Appendix", content: "사용된 전문 용어와 분석 기법 해설", type: 'appendix' },
    { id: 31, title: "리포트 요약 및 맺음말", category: "Appendix", content: "변화를 위한 마지막 한마디", type: 'appendix' },
    { id: 32, title: "제네시스 북 보증서", category: "Appendix", content: "데이터 정확성 및 분석 권위 보증", type: 'appendix' },
];
