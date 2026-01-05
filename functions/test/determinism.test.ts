import { describe, it, expect } from 'vitest';
import { GOLDEN_VECTORS } from './golden_vectors';
import { generateDeterministicPacket } from '../src/engine';

describe('Engine Determinism (Golden Vectors)', () => {
    /**
     * P10-ATOMIC-002 / ATOMIC-R2-05: Determinism Gate
     * All golden vectors must produce consistent hashes.
     * These hashes are FROZEN for the R2 release.
     */

    const EXPECTED_HASHES: Record<string, string> = {
        "GV_001": "05ce8275df87e22308c8e474e020f09728775efb84f824d7e120cd7a017e2ba7",
        "GV_002": "4f85c90f1c4ecec72d9f4f60d9b29c8f79859a5ed7e86191923ef14d60647991",
        "GV_003": "966fdaa1f7a1c2101211d578c302b64145756f3040e822f00aa87ff47fbfd506",
        "GV_004": "45f875c831712857c9820e09d624a00bef458d30626db8f7f4a53bfc287004d2",
        "GV_005": "2e853cf1fe300e2a15120a917d9398374992cb558f763a1187860b5006ed5872",
        "GV_006": "9ac5a55b026f0264ce954e32608e0dec6af4b41894784e1829e369e3412c79f1",
        "GV_007": "fdd01e15db0c3690074720c015f98d6aa20031f677c5c26e1236d2f335a4a310",
        "GV_008": "9581dbc3eae73c48569a5496f41e5c916313aea3c4b2c2d96f141442927420ed",
        "GV_009": "7c372a956a190437550328fec34cb39d0e4db881373158370d657a39a452ad59",
        "GV_010": "4b1205c1359f18400805dc9826b7e713dbd00adcf8b77aa3d8e6a63072454ae5"
    };

    GOLDEN_VECTORS.forEach(vector => {
        it(`should produce frozen hash for ${vector.id} (${vector.description})`, () => {
            const result = generateDeterministicPacket(vector.input, vector.userName);
            expect(result.determinismHash).toBe(EXPECTED_HASHES[vector.id]);
        });
    });
});
