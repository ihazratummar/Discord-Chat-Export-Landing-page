import React from 'react';
import styles from './Footer.module.css';
import Link from 'next/link';

export const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={`container ${styles.container}`}>
                <div>
                    &copy; {new Date().getFullYear()} Discord Chat Exporter. All rights reserved.
                </div>
                <div className={styles.links}>
                    <Link href="#" className={styles.link}>Privacy Policy</Link>
                    <Link href="#" className={styles.link}>Terms of Service</Link>
                    <Link href="#" className={styles.link}>Support</Link>
                </div>
            </div>
        </footer>
    );
};
