import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { httpsCallable } from 'firebase/functions';
import { functions } from '../lib/firebase';
import { Container } from '../components/layout/Container';
import { Header } from '../components/layout/Header';
import { TRIVIA_LINES } from '../config/trivia';
import styles from './Processing.module.css';

/**
 * Processing Page
 * 1. 호출: generateReport Callable API 호출
 * 2. 대기: 최소 시각적 대기 시간을 확보하며 트리비아 롤링
 * 3. 이동: 생성된 reportId 경로로 이동
 */
export const Processing: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const formData = location.state;

    const [triviaIndex, setTriviaIndex] = useState(0);
    const [progressStep, setProgressStep] = useState(0);

    // [Hardening] 데이터 없이 직접 접근 시 즉시 차단
    useEffect(() => {
        if (!formData) {
            navigate('/start', { replace: true });
        }
    }, [formData, navigate]);

    // 최소 시각적 대기 시간 (3.5s ~ 5s 랜덤)
    const [visualDuration] = useState(() => Math.floor(Math.random() * 1500) + 3500);

    const nextTrivia = useCallback(() => {
        setTriviaIndex((prev) => (prev + 1) % TRIVIA_LINES.length);
    }, []);

    useEffect(() => {
        const interval = setInterval(nextTrivia, 1200);
        return () => clearInterval(interval);
    }, [nextTrivia]);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgressStep((prev) => (prev + 1) % 4);
        }, 500);
        return () => clearInterval(interval);
    }, []);

    // 서버 사이드 리포트 생성 및 이동
    useEffect(() => {
        let isMounted = true;

        const executeGeneration = async () => {
            const startTime = Date.now();

            try {
                // A. 서버 엔진 호출
                const generateReportFunc = httpsCallable(functions, 'generateReport');
                const result = await generateReportFunc(formData);
                const { reportId } = result.data as { reportId: string };

                // B. 최소 시각적 시간 보장
                const elapsedTime = Date.now() - startTime;
                const remainingTime = Math.max(0, visualDuration - elapsedTime);

                if (remainingTime > 0) {
                    await new Promise(resolve => setTimeout(resolve, remainingTime));
                }

                if (isMounted) {
                    navigate(`/report/${reportId}`, { replace: true });
                }
            } catch (error) {
                console.error("Analysis Failed:", error);
                if (isMounted) {
                    navigate('/start', { replace: true });
                }
            }
        };

        if (formData) {
            executeGeneration();
        }

        return () => { isMounted = false; };
    }, [formData, navigate, visualDuration]);

    return (
        <div className={styles.processingPage}>
            <Header lockupDisplay="en_name" />
            <Container className={styles.loadingContainer}>
                <div className={styles.visualizer}>
                    <div className={styles.orbit}>
                        <div className={`${styles.node} ${styles.n1}`}></div>
                        <div className={`${styles.node} ${styles.n2}`}></div>
                        <div className={`${styles.node} ${styles.n3}`}></div>
                    </div>
                </div>

                <div className={styles.messageBox}>
                    <p className={styles.triviaLine}>{TRIVIA_LINES[triviaIndex]}</p>
                    <div className={styles.progressBar}>
                        <span className={styles.progressState}>
                            분석 중{'.'.repeat(progressStep + 1)}
                        </span>
                    </div>
                </div>
            </Container>

            <footer className={styles.footer}>
                <Container>
                    <p className={styles.copyright}>&copy; 2025 MYUNGRI: The Genesis. All rights reserved.</p>
                </Container>
            </footer>
        </div>
    );
};
