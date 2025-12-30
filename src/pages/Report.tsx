/* eslint-disable @tanstack/query/no-window-matchmedia */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container } from '../components/layout/Container';
import { Header } from '../components/layout/Header';
import { Card } from '../components/ui/Card';
import { ContextBox } from '../components/ui/ContextBox';
import { AdviceBox } from '../components/ui/AdviceBox';
import { REPORT_SECTIONS } from '../config/reportTemplate';
import { ShareActions } from '../components/share/ShareActions';
import styles from './Report.module.css';

export const Report: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const formData = location.state;
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    // Route hardening: Redirect if accessed without state
    useEffect(() => {
        if (!formData) {
            navigate('/start', { replace: true });
        }
    }, [formData, navigate]);

    // 접근성 설정 감지 (reduced-motion)
    useEffect(() => {
        // eslint-disable-next-line @tanstack/query/no-window-matchmedia
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        setPrefersReducedMotion(mediaQuery.matches);

        const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
        mediaQuery.addEventListener('change', handler);
        return () => mediaQuery.removeEventListener('change', handler);
    }, []);

    // 섹션 이동 핸들러 (접근성 고려)
    const scrollToSection = useCallback((id: number) => {
        const element = document.getElementById(`page-${id}`);
        if (element) {
            element.scrollIntoView({
                behavior: prefersReducedMotion ? 'auto' : 'smooth'
            });
            setIsMenuOpen(false);
        }
    }, [prefersReducedMotion]);

    return (
        <div className={styles.reportPage}>
            <Header lockupDisplay="en_name" />

            <Container className={styles.mainLayout}>
                {/* 사이드바 네비게이션 (데스크탑) / 드롭다운 메뉴 (모바일) */}
                <aside className={`${styles.sidebar} ${isMenuOpen ? styles.sidebarOpen : ''}`}>
                    <div className={styles.sidebarHeader}>
                        <h3>리포트 목차</h3>
                        <button className={styles.closeBtn} onClick={() => setIsMenuOpen(false)}>✕</button>
                    </div>
                    <nav className={styles.nav}>
                        {REPORT_SECTIONS.map((section) => (
                            <button
                                key={section.id}
                                className={styles.navItem}
                                onClick={() => scrollToSection(section.id)}
                            >
                                <span className={styles.pageNum}>{String(section.id).padStart(2, '0')}</span>
                                <span className={styles.pageTitle}>{section.title}</span>
                            </button>
                        ))}
                    </nav>
                </aside>

                {/* 모바일 메뉴 트리거 */}
                <button className={styles.mobileNavTrigger} onClick={() => setIsMenuOpen(true)}>
                    목차 열기
                </button>

                {/* 리포트 본문 콘텐츠 */}
                <main className={styles.reportContent}>
                    <ShareActions />

                    {REPORT_SECTIONS.map((section) => (
                        <section
                            key={section.id}
                            id={`page-${section.id}`}
                            className={`${styles.pageSection} ${styles[`type-${section.type}`]}`}
                        >
                            <div className={styles.pageHeader}>
                                <span className={styles.categoryTag}>{section.category}</span>
                                <span className={styles.pageIdentifier}>P. {section.id}</span>
                            </div>

                            <Card className={styles.contentCard}>
                                <h2 className={styles.sectionTitle}>{section.title}</h2>
                                <p className={styles.sectionContent}>{section.content}</p>

                                {/* 섹션 타입에 따른 프리미티브 재사용 예시 */}
                                {section.type === 'analysis' && (
                                    <ContextBox className={styles.primitiveBox}>
                                        분석 엔진의 초원자 단위 데이터 대조 결과입니다.
                                    </ContextBox>
                                )}

                                {section.type === 'action' && (
                                    <AdviceBox className={styles.primitiveBox}>
                                        지혜로운 변화를 위해 위 내용을 일상에 즉시 적용해 보십시오.
                                    </AdviceBox>
                                )}

                                {section.id === 3 && formData && (
                                    <div className={styles.formDataSummary}>
                                        <p><strong>생년월일:</strong> {formData.birthDate}</p>
                                        <p><strong>성별:</strong> {formData.sex === 'male' ? '남성' : '여성'}</p>
                                        <p><strong>달력:</strong> {formData.calendar === 'solar' ? '양력' : '음력'}</p>
                                    </div>
                                )}
                            </Card>
                        </section>
                    ))}
                </main>
            </Container>
        </div>
    );
};
