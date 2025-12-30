import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { PaperBackground } from './components/layout/PaperBackground';
import { Header } from './components/layout/Header';
import { BrandLockup } from './components/common/BrandLockup';
import { Home } from './pages/Home';
import { Start } from './pages/Start';
import { Processing } from './pages/Processing';
import { Report } from './pages/Report';
import styles from './App.module.css';

function App() {
  const [showHome, setShowHome] = useState(false);

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
      </Routes>
    </PaperBackground>
  );
}

export default App;
