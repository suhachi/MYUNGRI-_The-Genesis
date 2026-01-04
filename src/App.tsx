import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { PaperBackground } from './components/layout/PaperBackground';
import { Header } from './components/layout/Header';
import { BrandLockup } from './components/common/BrandLockup';
import { Home } from './pages/Home';
import { Start } from './pages/Start';
import { Processing } from './pages/Processing';
import { Report } from './pages/Report';
import { ReportPrint } from './pages/ReportPrint';
import styles from './App.module.css';
import { Footer } from './components/layout/Footer';
import { isAppCheckReady, appCheckError as libAppCheckError, firebaseConfigError } from './lib/firebase';
import { SecurityShield } from './components/system/SecurityShield';

function App() {
  const [showHome, setShowHome] = useState(false);
  const [appCheckTimeout, setAppCheckTimeout] = useState(false);

  // [Zero Tolerance] Initializing UI Timeout (Prevent hanging)
  useEffect(() => {
    if (import.meta.env.PROD && !isAppCheckReady && !libAppCheckError && !firebaseConfigError) {
      const timer = setTimeout(() => {
        setAppCheckTimeout(true);
      }, 5000); // 5s Limit
      return () => clearTimeout(timer);
    }
  }, []);

  const effectiveAppCheckError = libAppCheckError || (appCheckTimeout ? "APPCHECK_TIMEOUT" : null);

  // [Zero Tolerance] Security Gate: Block on config error or initialization failure
  if (import.meta.env.PROD) {
    if (firebaseConfigError || effectiveAppCheckError) {
      return <SecurityShield reason={firebaseConfigError || effectiveAppCheckError} />;
    }

    if (!isAppCheckReady) {
      return (
        <div style={{
          height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'var(--bg-main)', color: 'var(--muted)', fontSize: '0.9rem'
        }}>
          Security Initializing...
        </div>
      );
    }
  }

  return (
    <PaperBackground>
      <Routes>
        <Route path="/" element={
          !showHome ? (
            <main className={styles.introContainer}>
              <BrandLockup
                display="kr_lockup"
                variant="accent"
                as="h1"
                className={styles.heroBrand}
              />
              <button
                className={styles.enterBtn}
                onClick={() => setShowHome(true)}
              >
                시작하기 →
              </button>
            </main>
          ) : (
            <>
              <Header lockupDisplay="kr_lockup" />
              <Home />
            </>
          )
        } />
        <Route path="/start" element={<Start />} />
        <Route path="/processing" element={<Processing />} />
        <Route path="/report" element={<Report />} />
        <Route path="/report/:reportId" element={<Report />} />
        <Route path="/report/:reportId/print" element={<ReportPrint />} />
      </Routes>
      <Footer />
    </PaperBackground>
  );
}

export default App;
