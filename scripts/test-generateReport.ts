import { initializeApp } from "firebase/app";
import { getFunctions, httpsCallable, connectFunctionsEmulator } from "firebase/functions";
import { getFirestore, doc, connectFirestoreEmulator, getDocs, getDoc, collection } from "firebase/firestore";

/**
 * Phase 3-C: Real Calculation Verification Script
 */

const firebaseConfig = {
    apiKey: "AIzaSyALJ16scYoDyo1bi8_62yQVZ1LzrVxY72c",
    projectId: "myungri-genesis",
};

const app = initializeApp(firebaseConfig);
const functions = getFunctions(app, 'asia-northeast3');
const db = getFirestore(app);

connectFunctionsEmulator(functions, "127.0.0.1", 5001);
connectFirestoreEmulator(db, "127.0.0.1", 8080);

async function runVerification() {
    console.log("\n🧪 Starting Phase 3-C Real Calc Verification...");

    const generateReport = httpsCallable(functions, 'generateReport');

    // Case 1: Boundary Time Check (00:05 KST)
    // 서울(127.0)은 표준시(135.0)보다 약 32분 느림.
    // 00:05 KST -> -32분 보정 시 전날 23:33 (야자시) 판정 예상.
    console.log("\n1. Testing Boundary Time (00:05 KST -> Expect Night Ja-si)...");
    try {
        const res: any = await generateReport({
            birthDate: "2023-11-20",
            birthTime: "00:05",
            sex: "male",
            calendar: "solar",
            timeUnknown: false
        });
        const calc = res.data.calculation;
        console.log("✅ Result:", res.data.reportId);
        console.log("   - True Solar Time:", calc.forensicTime.trueSolarHHmm);
        console.log("   - Classification:", calc.forensicTime.classification);
        console.log("   - Day Shift:", calc.forensicTime.dayShift);
        console.log("   - Day Pillar:", calc.pillars.day.label);
    } catch (error: any) {
        console.error("❌ FAILURE:", error.message);
    }

    // Case 2: Lunar Leap Month Check
    console.log("\n2. Testing Lunar Leap Month (2023-05-15 Leap)...");
    try {
        const res: any = await generateReport({
            birthDate: "2023-05-15",
            sex: "female",
            calendar: "lunar",
            isLeapMonth: true,
            timeUnknown: true
        });
        console.log("✅ Result:", res.data.reportId);
        console.log("   - Normalized Solar:", res.data.calculation.normalization.solarDate);
        console.log("   - Year Pillar:", res.data.calculation.pillars.year.label);
    } catch (error: any) {
        console.error("❌ FAILURE:", error.message);
    }

    // Case 3: Error Handling (Missing isLeapMonth for Lunar)
    console.log("\n3. Testing Missing isLeapMonth for Lunar (Expect Error)...");
    try {
        await generateReport({
            birthDate: "2023-05-15",
            sex: "female",
            calendar: "lunar",
            timeUnknown: true
        });
        console.error("❌ FAILURE: Error should have occurred.");
    } catch (error: any) {
        console.log("✅ SUCCESS: Properly rejected:", error.message);
    }

    // Security Rules Check
    console.log("\n4. Final Security Check (List Denied)...");
    try {
        await getDocs(collection(db, "reports"));
        console.error("❌ FAILURE: List allowed!");
    } catch (error: any) {
        console.log("✅ SUCCESS: List blocked (permission-denied).");
    }

    console.log("\n✨ Phase 3-C Verification Completed.\n");
}

runVerification();
