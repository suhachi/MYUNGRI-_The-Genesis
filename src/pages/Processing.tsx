import React from 'react';
import { useLocation } from 'react-router-dom';
import { Container } from '../components/layout/Container';
import { Header } from '../components/layout/Header';
import styles from './Processing.module.css';

export const Processing: React.FC = () => {
    const location = useLocation();
    const formData = location.state;

    return (
        <div className={styles.processingPage}>
            <Header lockupDisplay="en_name" />

            <Container className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.spinner} />
                    <h2 className={styles.title}>분석 준비 중…</h2>
                    <p className={styles.text}>
                        {formData
                            ? `${formData.birthDate} 데이터에 기반하여 초원자 단위 분석을 시작합니다.`
                            : '입력된 데이터를 바탕으로 분석을 준비하고 있습니다.'}
                    </p>
                    <p className={styles.subtext}>(Step 2-C에서 트리비아 롤링 UI로 확장될 예정입니다)</p>
                </div>
            </Container>
        </div>
    );
};
