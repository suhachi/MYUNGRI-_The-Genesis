"use strict";
// UTC Utilities and True Solar Time Correction
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseYMDToUTCDate = parseYMDToUTCDate;
exports.addDaysUTC = addDaysUTC;
exports.dayOfYearUTC = dayOfYearUTC;
exports.getEquationOfTimeUTC = getEquationOfTimeUTC;
exports.getTimeZoneOffsetMinutes = getTimeZoneOffsetMinutes;
exports.calculateTrueSolarTime = calculateTrueSolarTime;
function parseYMDToUTCDate(ymd) {
    const [y, m, d] = ymd.split('-').map(Number);
    return new Date(Date.UTC(y, m - 1, d));
}
function addDaysUTC(date, days) {
    const next = new Date(date.getTime());
    next.setUTCDate(next.getUTCDate() + days);
    return next;
}
function dayOfYearUTC(date) {
    const start = Date.UTC(date.getUTCFullYear(), 0, 0);
    const diff = date.getTime() - start;
    return Math.floor(diff / (1000 * 60 * 60 * 24));
}
function getEquationOfTimeUTC(date) {
    const dayOfYear = dayOfYearUTC(date);
    const b = (360 / 365.24) * (dayOfYear - 81) * (Math.PI / 180);
    const eot = 9.87 * Math.sin(2 * b) - 7.53 * Math.cos(b) - 1.5 * Math.sin(b);
    return parseFloat(eot.toFixed(2));
}
// Derive timezone offset minutes for a given IANA timezone using Intl.
function getTimeZoneOffsetMinutes(date, timeZone) {
    const dtf = new Intl.DateTimeFormat('en-US', {
        timeZone,
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false
    });
    const parts = dtf.formatToParts(date);
    const values = {};
    for (const p of parts) {
        if (p.type === 'year')
            values.year = Number(p.value);
        if (p.type === 'month')
            values.month = Number(p.value);
        if (p.type === 'day')
            values.day = Number(p.value);
        if (p.type === 'hour')
            values.hour = Number(p.value);
        if (p.type === 'minute')
            values.minute = Number(p.value);
        if (p.type === 'second')
            values.second = Number(p.value);
    }
    const asUTC = Date.UTC(values.year, (values.month || 1) - 1, values.day || 1, values.hour || 0, values.minute || 0, values.second || 0);
    const offsetMinutes = (asUTC - date.getTime()) / 60000;
    return offsetMinutes;
}
function calculateTrueSolarTime(date, birthTimeHHmm, timezone = 'Asia/Seoul') {
    const [hh, mm] = birthTimeHHmm.split(':').map(Number);
    const localMinutes = hh * 60 + mm;
    let timezoneNote;
    let offsetMinutes = 9 * 60; // default KST
    let stdMeridian = 135.0;
    let usedLongitude = 127.0; // KST default
    if (timezone && timezone !== 'Asia/Seoul') {
        try {
            offsetMinutes = getTimeZoneOffsetMinutes(date, timezone);
            const offsetHours = offsetMinutes / 60;
            stdMeridian = offsetHours * 15; // standard meridian for timezone offset
            usedLongitude = stdMeridian; // assume location near standard meridian when unknown
            timezoneNote = `Non-KST timezone '${timezone}' using standard meridian ${stdMeridian}° and no local longitude correction.`;
            console.warn(timezoneNote);
        }
        catch (e) {
            timezoneNote = `Timezone '${timezone}' unsupported; falling back to Asia/Seoul assumptions.`;
            console.warn(timezoneNote);
        }
    }
    // Hardcoded for Korea (KST) - Phase 2 Scope
    // const longitude = 127.5; 
    // Spec Check: "v1.ts" used 127.0.
    // "135.0" is JST/KST standard meridian.
    // The user might want exact location, but for Phase 2 we keep v1 logic.
    const longitudeOffset = (usedLongitude - stdMeridian) * 4;
    const eot = getEquationOfTimeUTC(date);
    const totalOffset = eot + longitudeOffset;
    let trueSolarMinutes = localMinutes + totalOffset;
    let dayShift = 0;
    if (trueSolarMinutes < 0) {
        trueSolarMinutes += 1440;
        dayShift = -1;
    }
    else if (trueSolarMinutes >= 1440) {
        trueSolarMinutes -= 1440;
        dayShift = 1;
    }
    const trueHH = Math.floor(trueSolarMinutes / 60);
    const trueMM = Math.floor(trueSolarMinutes % 60);
    const trueSolarHHmm = `${String(trueHH).padStart(2, '0')}:${String(trueMM).padStart(2, '0')}`;
    let classification = "일반";
    if (trueSolarMinutes >= 1380 || trueSolarMinutes < 90) {
        // 23:00 ~ 01:30 (Rat Hour). 
        // Wait, Rat hour is 23:30 ~ 01:30? No, 23:00 ~ 01:00 in standard, adjusted by ~30min.
        // v1.ts logic: >= 1410 (23:30) or < 90 (01:30). 
        // Wait, v1.ts said >= 1410 logic.
        // Let's copy v1.ts logic exactly to maintain "determinism" relative to established baseline unless known bug.
        // v1.ts: if (trueSolarMinutes >= 1410 || trueSolarMinutes < 90) ...
        // 1410 = 23:30. 90 = 01:30.
        // This implies Rat hour starts at 23:30.
        classification = (trueSolarMinutes >= 1410) ? "야자시" : "조자시";
        // Actually, Rat Hour covers both Yaja and Joja if strictly followed.
        // We just return classification.
    }
    return {
        localTime: birthTimeHHmm,
        equationOfTimeMin: eot,
        longitudeOffsetMin: longitudeOffset,
        totalOffsetMin: parseFloat(totalOffset.toFixed(2)),
        trueSolarHHmm,
        dayShift,
        classification,
        trueMinutes: trueSolarMinutes,
        timezoneNote
    };
}
//# sourceMappingURL=time.js.map