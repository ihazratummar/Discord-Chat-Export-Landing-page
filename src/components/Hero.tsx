"use client";

import React from 'react';
import styles from './Hero.module.css';
import { Button } from './ui/Button';
import { Download, ShieldCheck, Monitor } from 'lucide-react';
import { motion } from 'framer-motion';

const AppleLogo = ({ size = 20, className = "" }: { size?: number, className?: string }) => (
    <svg
        viewBox="0 0 384 512"
        width={size}
        height={size}
        fill="currentColor"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 52.3-11.4 69.5-34.3z" />
    </svg>
);

export const Hero = () => {
    return (
        <section className={styles.hero} id="hero">
            <div className={styles.bgGlow} />

            <div className="container">
                <div className={styles.content}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className={styles.badge}
                    >
                        <ShieldCheck size={16} />
                        <span>Secure Local Execution</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className={styles.title}
                    >
                        Preserve Your <span className="text-gradient-primary">Digital History</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className={styles.description}
                    >
                        The professional tool to export, archive, and analyze your Discord conversations.
                        Runs entirely on your machine for maximum privacy.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className={styles.buttons}
                    >
                        <a href="/downloads/latest-mac.dmg" download>
                            <Button size="lg" icon={<AppleLogo size={20} />}>
                                Download for macOS
                            </Button>
                        </a>
                        <a href="/downloads/latest-win.exe" download>
                            <Button size="lg" variant="secondary" icon={<Monitor size={20} />}>
                                Download for Windows
                            </Button>
                        </a>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 40, rotateX: 10 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className={styles.mockupWrapper}
                >
                    <div className={styles.mockup}>
                        <div className={styles.mockupHeader}>
                            <div className={styles.dot} style={{ background: '#ef4444' }} />
                            <div className={styles.dot} style={{ background: '#eab308' }} />
                            <div className={styles.dot} style={{ background: '#22c55e' }} />
                        </div>
                        <div className={styles.mockupBody}>
                            <div className={styles.mockupSidebar} />
                            <div className={styles.mockupMain}>
                                {/* Abstract content representation */}
                                <div style={{ width: '60%', height: '20px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', marginBottom: '1rem' }} />
                                <div style={{ width: '40%', height: '20px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', marginBottom: '2rem' }} />

                                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
                                    <div style={{ flex: 1 }}>
                                        <div style={{ width: '120px', height: '14px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', marginBottom: '0.5rem' }} />
                                        <div style={{ width: '100%', height: '14px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px' }} />
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
                                    <div style={{ flex: 1 }}>
                                        <div style={{ width: '120px', height: '14px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', marginBottom: '0.5rem' }} />
                                        <div style={{ width: '90%', height: '14px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px' }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
