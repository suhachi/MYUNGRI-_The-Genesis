import React from 'react';
import styles from './ContextBox.module.css';

interface ContextBoxProps {
    children: React.ReactNode;
    className?: string;
    title?: string;
}

export const ContextBox: React.FC<ContextBoxProps> = ({
    children,
    className = '',
    title = '해석/설명'
}) => {
    return (
        <div className={`${styles.contextBox} ${className}`.trim()}>
            <div className={styles.label}>{title}</div>
            <div className={styles.content}>
                {children}
            </div>
        </div>
    );
};
