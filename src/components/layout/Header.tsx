import React, { useState } from 'react';
import { BrandLockup } from '../common/BrandLockup';
import { Container } from './Container';
import styles from './Header.module.css';

export const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <header className={styles.header}>
            <Container className={styles.headerContainer}>
                <BrandLockup display="kr_lockup" variant="default" as="div" className={styles.brand} />

                <nav className={styles.desktopNav}>
                    <a href="/" className={styles.navLink}>Home</a>
                    <a href="/about" className={styles.navLink}>Principles</a>
                    <button className={styles.ctaButton}>분석하기</button>
                </nav>

                <button className={styles.mobileMenuBtn} onClick={toggleMenu} aria-label="Toggle Menu">
                    <div className={`${styles.hamburger} ${isMenuOpen ? styles.isOpen : ''}`} />
                </button>
            </Container>

            <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.mobileMenuVisible : ''}`}>
                <nav className={styles.mobileNav}>
                    <a href="/" className={styles.mobileNavLink} onClick={toggleMenu}>Home</a>
                    <a href="/about" className={styles.mobileNavLink} onClick={toggleMenu}>Principles</a>
                    <button className={styles.mobileCtaButton}>분석하기</button>
                </nav>
            </div>
        </header>
    );
};
