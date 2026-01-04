import * as kl from 'kor-lunar';

/**
 * Calendar Conversion Single Entry Point (Phase2 Determinism)
 * - All lunar/solar normalization must go through these helpers
 * - kor-lunar is isolated here to keep upstream API surface stable
 */

// Type definitions for kor-lunar return values
export interface LunarResult {
    year: number;
    month: number;
    day: number;
    isLeapMonth: boolean;
    secha: string;   // Year Ganzhi
    wolgeon: string; // Month Ganzhi
    iljin: string;   // Day Ganzhi
    // kor-lunar might return other fields like 'dayOfWeek', etc.
}

export interface SolarResult {
    year: number;
    month: number;
    day: number;
    isLeapMonth?: boolean;
}

// Wrapper for toSolar
export function convertToSolar(year: number, month: number, day: number, isLeapMonth: boolean): SolarResult {
    try {
        // kl.toSolar returns object or standard lunar object? 
        // Based on v1.ts: const converted = toSolar(year, month, day, isLeapMonth);
        // We assume it returns { year, month, day, ... }
        const result = (kl as any).toSolar(year, month, day, isLeapMonth);
        return {
            year: result.year,
            month: result.month,
            day: result.day,
            isLeapMonth: result.isLeapMonth
        };
    } catch (e: any) {
        throw new Error(`CALENDAR_CONVERT_FAIL: Solar Conversion failed for ${year}-${month}-${day} (Leap: ${isLeapMonth}) - ${e.message}`);
    }
}

// Wrapper for toLunar
export function convertToLunar(year: number, month: number, day: number): LunarResult {
    try {
        const result = (kl as any).toLunar(year, month, day);
        return {
            year: result.year,
            month: result.month,
            day: result.day,
            isLeapMonth: result.isLeapMonth,
            secha: result.secha,
            wolgeon: result.wolgeon,
            iljin: result.iljin
        };
    } catch (e: any) {
        throw new Error(`CALENDAR_CONVERT_FAIL: Lunar Conversion failed for ${year}-${month}-${day} - ${e.message}`);
    }
}
