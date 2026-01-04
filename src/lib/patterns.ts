// [ATOMIC-01] Frontend Name Patterns
// Backend의 patterns.ts와 논리적 동기화 유지 필수

/**
 * 성명 입력 필터링을 위한 정규식 생성기
 * 환경에 따라 Unicode Property Escapes 지원 여부를 감지하여 적절한 정규식을 반환합니다.
 */
export const getNameSanitizeRegex = (): RegExp => {
    try {
        // Modern Browsers: Unicode Property Escapes support
        // 허용되지 않는 문자(Negated Class)를 매칭하여 제거(Replace)하는 용도
        // \p{Script=Hangul}: 모든 한글 (초성, 중성, 종성, 완성형 포함)
        // \p{Script=Han}: 모든 한자
        return new RegExp(`[^\\p{Script=Hangul}\\p{Script=Han}a-zA-Z\\s]`, 'gu');
    } catch (e) {
        // Legacy Fallback
        // 주의: 이 폴백은 낱자 자모(ㄱ, ㅏ 등)를 필터링할 수 있음
        return /[^가-힣一-龥a-zA-Z\s]/g;
    }
};

// 싱글톤으로 인스턴스화하여 사용
export const NAME_SANITIZE_REGEX = getNameSanitizeRegex();
