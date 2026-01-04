"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertToSolar = convertToSolar;
exports.convertToLunar = convertToLunar;
const kl = __importStar(require("kor-lunar"));
// Wrapper for toSolar
function convertToSolar(year, month, day, isLeapMonth) {
    try {
        // kl.toSolar returns object or standard lunar object? 
        // Based on v1.ts: const converted = toSolar(year, month, day, isLeapMonth);
        // We assume it returns { year, month, day, ... }
        const result = kl.toSolar(year, month, day, isLeapMonth);
        return {
            year: result.year,
            month: result.month,
            day: result.day,
            isLeapMonth: result.isLeapMonth
        };
    }
    catch (e) {
        throw new Error(`CALENDAR_CONVERT_FAIL: Solar Conversion failed for ${year}-${month}-${day} (Leap: ${isLeapMonth}) - ${e.message}`);
    }
}
// Wrapper for toLunar
function convertToLunar(year, month, day) {
    try {
        const result = kl.toLunar(year, month, day);
        return {
            year: result.year,
            month: result.month,
            day: result.day,
            isLeapMonth: result.isLeapMonth,
            secha: result.secha,
            wolgeon: result.wolgeon,
            iljin: result.iljin
        };
    }
    catch (e) {
        throw new Error(`CALENDAR_CONVERT_FAIL: Lunar Conversion failed for ${year}-${month}-${day} - ${e.message}`);
    }
}
//# sourceMappingURL=converter.js.map