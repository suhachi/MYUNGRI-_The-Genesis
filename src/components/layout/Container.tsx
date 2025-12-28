import React from 'react';
import styles from './Container.module.css';

interface ContainerProps {
    children: React.ReactNode;
    className?: string;
    as?: React.ElementType;
}

export const Container: React.FC<ContainerProps> = ({
    children,
    className = '',
    as: Component = 'div'
}) => {
    return (
        <Component className={`${styles.container} ${className}`.trim()}>
            {children}
        </Component>
    );
};
