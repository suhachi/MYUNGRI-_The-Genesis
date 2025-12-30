import React from 'react';
import { Container } from '../components/layout/Container';
import { Card } from '../components/ui/Card';
import { ContextBox } from '../components/ui/ContextBox';
import { AdviceBox } from '../components/ui/AdviceBox';
import { BrandLockup } from '../components/common/BrandLockup';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';

export const Home: React.FC = () => {
    return (
        <div className={styles.home}>
            {/* Hero Section */}
            <section className={styles.hero}>
                <Container className={styles.heroGrid}>
                    <div className={styles.heroContent}>
                        <BrandLockup display="kr_lockup" variant="accent" as="h1" className={styles.heroTitle} />
                        <p className={styles.heroSubtitle}>
                            현대적 유산과 초원자 단위 데이터 분석의 만남.<br />
                            명리: 제네시스를 통해 당신의 내일과 소통하십시오.
                        </p>
                        <div className={styles.ctaGroup}>
                            <Link to="/start" className={styles.primaryBtn}>내 사주 분석하기 →</Link>
                            <button className={styles.secondaryBtn}>샘플 리포트</button>
                        </div>
                    </div>

                    <div className={styles.heroVisual}>
                        <div className={styles.kanjiWatermark}>命</div>
                        <Card className={styles.principleCard} hasAccentBar>
                            <h3 className={styles.cardTitle}>서비스 원칙</h3>
                            <ul className={styles.principleList}>
                                <li>독자 개발된 만세력 정밀 알고리즘</li>
                                <li>Reason Card 기반 근거 중심 해석</li>
                                <li>AI는 문장 리라이팅에만 제한적으로 사용</li>
                            </ul>
                        </Card>
                    </div>
                </Container>
            </section>

            {/* Content Section Example */}
            <section className={styles.features}>
                <Container>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>초원자 단위 분석 리포트</h2>
                    </div>

                    <div className={styles.featureGrid}>
                        <Card className={styles.featureCard}>
                            <h4>32페이지 이상의 방대한 분석</h4>
                            <p>원전 근거와 현대적 해석을 담은 독보적인 권위의 리포트를 제공합니다.</p>
                            <ContextBox>
                                명리 분석 결과는 단순한 운세가 아닌, 과거의 지혜를 데이터로 재구성한 학술적 결과물입니다.
                            </ContextBox>
                        </Card>

                        <Card className={styles.featureCard}>
                            <h4>명확한 Action Plan</h4>
                            <p>분석 결과를 넘어 당신의 삶에 적용할 수 있는 구체적인 가이드를 제안합니다.</p>
                            <AdviceBox>
                                올해의 기운은 새로운 시작보다 내실을 다지는 것에 적합합니다. 학문적 성취나 전문성 강화에 시간을 투자하십시오.
                            </AdviceBox>
                        </Card>
                    </div>
                </Container>
            </section>
        </div>
    );
};
