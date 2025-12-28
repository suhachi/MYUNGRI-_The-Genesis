import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BrandLockup } from '../common/BrandLockup';
import { Container } from './Container';
import styles from './Header.module.css';

interface HeaderProps {
    lockupDisplay?: 'kr_lockup' | 'en_name';
}

export const Header: React.FC<HeaderProps> = ({ lockupDisplay = 'kr_lockup' }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <header className={styles.header}>
            <Container className={styles.headerContainer}>
                <Link to="/" className={styles.brandLink}>
                    <BrandLockup display={lockupDisplay} variant="default" as="div" className={styles.brand} />
                </Link>

                <nav className={styles.desktopNav}>
                    <Link to="/" className={styles.navLink}>Home</Link>
                    <Link to="/about" className={styles.navLink}>Principles</Link>
                    <Link to="/start" className={styles.ctaButton}>분석하기</Link>
                </nav>

                <button className={styles.mobileMenuBtn} onClick={toggleMenu} aria-label="Toggle Menu">
                    <div className={`${styles.hamburger} ${isMenuOpen ? styles.isOpen : ''}`} />
                </button>
            </Container>

            <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.mobileMenuVisible : ''}`}>
                <nav className={styles.mobileNav}>
                    <Link to="/" className={styles.mobileNavLink} onClick={toggleMenu}>Home</Link>
                    <Link to="/about" className={styles.mobileNavLink} onClick={toggleMenu}>Principles</Link>
                    <Link to="/start" className={styles.mobileCtaButton} onClick={toggleMenu}>분석하기</Link>
                </nav>
            </div>
        </header>
    );
};
