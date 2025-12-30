import React from 'react';
import styles from './Footer.module.css';

export const Footer: React.FC = () => {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.copyright}>
                    Copyright © 2025 MYUNGRI: The Genesis.
                </div>
                <div className={styles.companyInfo}>
                    KS컴퍼니 <span className={styles.divider}>|</span> 대표: 배종수, 석경선 <span className={styles.divider}>|</span> 문의: suhachi78@gmail.com
                </div>
            </div>
        </footer>
    );
};
