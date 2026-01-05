import { DeterministicPacket } from '../../index';

/**
 * [ATOMIC-3-03-1] Narrative Input Packet Builder
 * Transforms the complex DeterministicPacket into a simplified JSON for LLM consumption.
 * This ensures the LLM only gets "Facts" and doesn't hallucinate missing data.
 */

export interface NarrativeInputPacket {
    userInfo: {
        sex: string;
        birthDate: string;
        timeUnknown: boolean;
        hasHanjaName: boolean;
    };
    deterministicFacts: {
        pillars: any;
        daewoon: any;
        sewoon: any;
        naming?: any;
    };
}

export function buildNarrativeInput(packet: DeterministicPacket): NarrativeInputPacket {
    return {
        userInfo: {
            sex: packet.input.sex,
            birthDate: packet.pillars.normalization.solarDate,
            timeUnknown: packet.input.timeUnknown,
            hasHanjaName: !!(packet.naming as any)?.hanjaAnalysis
        },
        deterministicFacts: {
            pillars: packet.pillars,
            daewoon: {
                direction: packet.daewoon.direction,
                startAge: packet.daewoon.startAge,
                segments: packet.daewoon.segments.map(s => ({
                    age: s.startAge,
                    ganzhi: s.ganzhi.label,
                }))
            },
            sewoon: packet.sewoon,
            naming: packet.naming
        }
    };
}
