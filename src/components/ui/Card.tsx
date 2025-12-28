import React from 'react';
import styles from './Card.module.css';

interface CardProps {
    children: React.ReactNode;
    className?: string;
    hasAccentBar?: boolean;
}

export const Card: React.FC<CardProps> = ({
    children,
    className = '',
    hasAccentBar = false
}) => {
    return (
        <div className={`${styles.card} ${hasAccentBar ? styles.accentBar : ''} ${className}`.trim()}>
            {children}
        </div>
    );
};
