import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { httpsCallable } from 'firebase/functions';
import { functionsKR as functions } from '../lib/firebase';
import { InputSchema } from '../../contracts/input.schema';
import { Container } from '../components/layout/Container';
import { Header } from '../components/layout/Header';
import { Card } from '../components/ui/Card';
import styles from './Processing.module.css';

/**
 * Processing Page [Phase 27: Zero Silent Redirect]
 * 1. 호출: generateReport Callable API 호출 (functionsKR 강제)
 * 2. 대기: 최소 시각적 대기 시간을 확보하며 트리비아 롤링
 * 3. 이동: 성공 시에만 reportId 경로로 이동
 * 4. 에러: 실패 시 상세 에러 패널 노출 (자동 이동 절대 금지)
 */
export const Processing: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const formData = location.state;

    const [logs, setLogs] = useState<string[]>([]);
    const [error, setError] = useState<{
        code?: string;
        message: string;
        details?: string;
    } | null>(null);

    // 로그 시퀀스 정의
    const LOG_SEQUENCE = [
        { text: "SYSTEM_BOOT_SEQUENCE_INIT...", delay: 0 },
        { text: "PARSING_FOUR_PILLARS_DATA...", delay: 1500 },
        { text: "ACCESSING_GENESIS_ARCHIVE...", delay: 3000 },
        { text: "AUDITING_HUMAN_OS_KERNEL...", delay: 4500 }
    ];

    useEffect(() => {
        LOG_SEQUENCE.forEach((item) => {
            setTimeout(() => {
                setLogs(prev => [...prev, `> ${item.text} `]);
            }, item.delay);
        });
    }, []);

    const executeGeneration = useCallback(async () => {
        if (!formData) return;

        setError(null);
        const startTime = Date.now();

        try {
            // [Layer 0] Contract Validation
            const validation = InputSchema.safeParse(formData);
            if (!validation.success) {
                const issues = validation.error.format();
                const errorKey = Object.keys(issues).find(k => k !== '_errors');
                const firstMsg = errorKey ? (issues as any)[errorKey]._errors[0] : "입력 형식이 올바르지 않습니다.";

                throw {
                    code: "VALIDATION_FAILED",
                    message: firstMsg || "입력 데이터 검증 실패",
                    details: JSON.stringify(issues, null, 2)
                };
            }

            const generateReportFunc = httpsCallable(functions, 'generateReport');
            const result = await generateReportFunc(formData);

            const { reportId } = result.data as any;

            // 최소 시각적 시간 보장 (로그 시퀀스가 4.5s에 시작하므로 최소 6s 대기 권장)
            const elapsedTime = Date.now() - startTime;
            const minTime = 6000;
            const remainingTime = Math.max(0, minTime - elapsedTime);

            if (remainingTime > 0) {
                await new Promise(resolve => setTimeout(resolve, remainingTime));
            }

            navigate(`/ report / ${reportId} `, { replace: true });
        } catch (err: any) {
            console.error("[generateReport] Analysis Failed:", err);
            setError({
                code: err.code,
                message: err.message || "알 수 없는 시스템 오류가 발생했습니다.",
                details: err.details ? JSON.stringify(err.details, null, 2) : ""
            });
        }
    }, [formData, navigate]);

    useEffect(() => {
        if (formData) {
            executeGeneration();
        }
    }, [formData, executeGeneration]);

    if (!formData) {
        return (
            <div className={styles.processingPage}>
                <Header lockupDisplay="en_name" />
                <Container className={styles.loadingContainer}>
                    <Card className={styles.errorCard}>
                        <h2 className={styles.errorTitle}>DATA_NOT_FOUND</h2>
                        <p className={styles.errorText}>입력 정보가 전달되지 않았습니다. 분석 시작 페이지로 돌아가 정보를 다시 입력해주세요.</p>
                        <button className={styles.retryBtn} onClick={() => navigate('/start', { replace: true })}>
                            REBOOT_SYSTEM
                        </button>
                    </Card>
                </Container>
            </div>
        );
    }

    return (
        <div className={styles.processingPage}>
            <Header lockupDisplay="en_name" />
            <Container className={styles.loadingContainer}>
                {!error ? (
                    <div className={styles.terminal}>
                        {logs.map((log, i) => (
                            <div key={i} className={styles.logLine}>
                                {log}
                                {i === logs.length - 1 && <span className={styles.cursor}>_</span>}
                            </div>
                        ))}
                    </div>
                ) : (
                    <Card className={styles.errorCard}>
                        <div className={styles.errorHeader}>
                            <h2 className={styles.errorTitle}>CRITICAL_SYSTEM_ERROR</h2>
                            {error.code && <span className={styles.errorCode}>ID: {error.code}</span>}
                        </div>
                        <p className={styles.errorText}>{error.message}</p>
                        {error.details && (
                            <div className={styles.detailsBox}>
                                <pre>{error.details}</pre>
                            </div>
                        )}
                        <div className={styles.actionRow}>
                            <button className={styles.retryBtn} onClick={executeGeneration}>RETRY</button>
                            <button className={styles.cancelBtn} onClick={() => navigate('/start')}>EXIT</button>
                        </div>
                    </Card>
                )}
            </Container>

            <footer className={styles.footer}>
                <Container>
                    <p className={styles.copyright}>&copy; 2025 MYUNGRI: The Genesis. All rights reserved.</p>
                </Container>
            </footer>
        </div>
    );
};
