import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container } from '../components/layout/Container';
import { Header } from '../components/layout/Header';
import { TRIVIA_LINES } from '../config/trivia';
import styles from './Processing.module.css';

export const Processing: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const formData = location.state;

    const [triviaIndex, setTriviaIndex] = useState(0);
    const [progressStep, setProgressStep] = useState(0);

    // Random duration between 3s and 5s
    const [totalDuration] = useState(() => Math.floor(Math.random() * 2000) + 3000);

    const nextTrivia = useCallback(() => {
        setTriviaIndex((prev) => (prev + 1) % TRIVIA_LINES.length);
    }, []);

    // Trivia rolling timer
    useEffect(() => {
        const triviaInterval = setInterval(nextTrivia, 1000); // ~1000ms interval
        return () => clearInterval(triviaInterval);
    }, [nextTrivia]);

    // Progress step timer (visual dots/steps)
    useEffect(() => {
        const stepInterval = setInterval(() => {
            setProgressStep((prev) => (prev + 1) % 4);
        }, 500);
        return () => clearInterval(stepInterval);
    }, []);

    // Completion timer
    useEffect(() => {
        const timer = setTimeout(() => {
            navigate('/report', { state: formData });
        }, totalDuration);
        return () => clearTimeout(timer);
    }, [navigate, totalDuration, formData]);

    return (
        <div className={styles.processingPage}>
            <Header lockupDisplay="en_name" />

            <Container className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.spinner} aria-hidden="true" />

                    <h2 className={styles.title}>분석 준비 중…</h2>

                    <div className={styles.triviaWrapper} aria-live="polite">
                        <p key={triviaIndex} className={styles.triviaText}>
                            {TRIVIA_LINES[triviaIndex]}
                        </p>
                    </div>

                    <div className={styles.progressIndicator}>
                        <span className={styles.dots}>
                            {Array.from({ length: 3 }).map((_, i) => (
                                <span
                                    key={i}
                                    className={`${styles.dot} ${i < progressStep ? styles.dotActive : ''}`}
                                />
                            ))}
                        </span>
                    </div>

                    <p className={styles.subtext}>초원자 단위 데이터 엔진 가동 중</p>
                </div>
            </Container>
        </div>
    );
};
