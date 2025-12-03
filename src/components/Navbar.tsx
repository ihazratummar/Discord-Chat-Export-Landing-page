"use client";

import React, { useState, useEffect } from 'react';
import styles from './Navbar.module.css';
import { Download } from 'lucide-react';
import { Button } from './ui/Button';
import Link from 'next/link';
import Image from 'next/image';

export const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
            <div className={`container ${styles.inner}`}>
                <Link href="/" className={styles.logo}>
                    <Image
                        src="/logo_transparent.png"
                        alt="Logo"
                        width={48}
                        height={48}
                        className={styles.logoIcon}
                        priority
                    />
                    <span>ChatExporter</span>
                </Link>

                <div className={styles.links}>
                    <Link href="#features" className={styles.link}>Features</Link>
                    <Link href="#security" className={styles.link}>Security</Link>
                    <Link href="#pricing" className={styles.link}>Pricing</Link>
                    <Link href="#faq" className={styles.link}>FAQ</Link>
                </div>

                <div className={styles.actions}>
                    <Link href="#">
                        <Button variant="primary" size="md" icon={<Download size={18} />}>
                            Download
                        </Button>
                    </Link>
                </div>
            </div>
        </nav>
    );
};
