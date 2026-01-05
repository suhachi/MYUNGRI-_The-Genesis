"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NAME_VALIDATOR_REGEX = exports.NAME_PATTERN_SOURCE = void 0;
exports.NAME_PATTERN_SOURCE = String.raw `\p{Script=Hangul}\p{Script=Han}a-zA-Z\s`;
// 유효성 검사 (전체 문자열이 허용된 문자로만 구성되어야 함)
// Node.js 환경은 최신 V8을 사용하므로 Unicode Property Escapes를 항상 지원한다고 가정합니다.
exports.NAME_VALIDATOR_REGEX = new RegExp(`^[${exports.NAME_PATTERN_SOURCE}]*$`, 'u');
//# sourceMappingURL=patterns.js.map