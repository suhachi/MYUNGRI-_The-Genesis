import { useState } from 'react';
import { PaperBackground } from './components/layout/PaperBackground';
import { Header } from './components/layout/Header';
import { BrandLockup } from './components/common/BrandLockup';
import { Home } from './pages/Home';
import styles from './App.module.css';

function App() {
  const [showHome, setShowHome] = useState(false);

  return (
    <PaperBackground>
      {!showHome ? (
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
          <Header />
          <Home />
        </>
      )}
    </PaperBackground>
  );
}

export default App;
