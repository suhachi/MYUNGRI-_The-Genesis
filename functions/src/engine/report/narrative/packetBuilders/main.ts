import { DeterministicPacket } from '../../../index';

export interface NarrativeInputPacket {
    userInfo: {
        sex: string; birthDate: string; timeUnknown: boolean; hasHanjaName: boolean;
    };
    deterministicFacts: {
        pillars: any; daewoon: any; sewoon: any; naming?: any;
    };
}

export function buildNarrativeInput(packet: DeterministicPacket): NarrativeInputPacket {
    return {
        userInfo: {
            sex: packet.input.sex,
            birthDate: packet.pillars.normalization.solarDate,
            timeUnknown: packet.input.timeUnknown,
            hasHanjaName: !!(packet.naming as any)
        },
        deterministicFacts: {
            pillars: packet.pillars,
            daewoon: {
                direction: packet.daewoon.direction,
                startAge: packet.daewoon.startAge,
                segments: packet.daewoon.segments.map((s: any) => ({
                    age: s.startAge,
                    ganzhi: s.ganzhi.label,
                }))
            },
            sewoon: packet.sewoon,
            naming: packet.naming
        }
    };
}
