import React from 'react';
import { useLocation } from 'react-router-dom';
import { Container } from '../components/layout/Container';
import { Header } from '../components/layout/Header';
import { Card } from '../components/ui/Card';
import styles from './Report.module.css';

export const Report: React.FC = () => {
    const location = useLocation();
    const formData = location.state;

    return (
        <div className={styles.reportPage}>
            <Header lockupDisplay="en_name" />

            <Container className={styles.container}>
                <div className={styles.content}>
                    <h2 className={styles.title}>분석 결과 리포트</h2>

                    <Card className={styles.placeholderCard}>
                        <p className={styles.placeholderText}>
                            {formData
                                ? `${formData.birthDate} 탄생 데이터 분석이 완료되었습니다.`
                                : '분석 결과 데이터를 불러올 수 없습니다. 다시 시도해 주세요.'}
                        </p>
                        <hr className={styles.divider} />
                        <p className={styles.status}>
                            Step 2-D: "명리 엔진 연동 및 리포트 UI" 단계에서 실제 분석 내용과 고품질의 제네시스 북 스타일 레이아웃이 구현될 예정입니다.
                        </p>
                    </Card>
                </div>
            </Container>
        </div>
    );
};
