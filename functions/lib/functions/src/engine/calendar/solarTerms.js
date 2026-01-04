"use strict";
// Solar Terms (24 Jolgi) Approximation
// Note: Precise Term entry times require VSOP87 or Ephemeris.
// This module provides a "Standard" approximation sufficient for
// general display or checking "Season".
// Critical Month Pillar logic is handled by 'kor-lunar' internally.
Object.defineProperty(exports, "__esModule", { value: true });
exports.SOLAR_TERMS = void 0;
exports.getApproxSolarTerm = getApproxSolarTerm;
exports.SOLAR_TERMS = [
    "입춘", "우수", "경칩", "춘분", "청명", "곡우",
    "입하", "소만", "망종", "하지", "소서", "대서",
    "입추", "처서", "백로", "추분", "한로", "상강",
    "입동", "소설", "대설", "동지", "소한", "대한"
];
function getDayOfYear(date) {
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date.getTime() - start.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
}
function getApproxSolarTerm(date) {
    // 1. Calculate Solar Longitude (Lambda) approximation
    // Spring Equinox (Chunbun) ~ March 20/21 (Day ~80)
    // Lambda 0 at Spring Equinox.
    const doy = getDayOfYear(date);
    // Day 80 is approx Vernal Equinox (Lambda=0)
    // 365.2422 days = 360 degrees
    // Offset: I want Lambda=315 (Ipchun) at ~Feb 4 (Day 35).
    // (35 - 80) = -45. -45 * (360/365) ~= -44 deg. 360-44 = 316. Close.
    // Very rough approximation:
    const daysSinceSpringEquinox = doy - 80;
    let lambda = (daysSinceSpringEquinox * 360 / 365.2422);
    if (lambda < 0)
        lambda += 360;
    // Terms are every 15 degrees.
    // 0=Chunbun, 15=Cheongmyeong...
    // We want to map to indices of SOLAR_TERMS starting at "Ipchun" (315 deg).
    // Standard Order (from Ipchun):
    // Ipchun (315), Usu (330), Gyeongchip (345), Chunbun (0)...
    // Let's normalize Lambda to start at Ipchun (315).
    // offsetLambda = (lambda - 315 + 360) % 360
    // Index = floor(offsetLambda / 15)
    const offsetLambda = (lambda - 315 + 360) % 360;
    const index = Math.floor(offsetLambda / 15);
    return exports.SOLAR_TERMS[index % 24];
}
//# sourceMappingURL=solarTerms.js.map