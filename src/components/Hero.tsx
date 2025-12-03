"use client";

import React from 'react';
import styles from './Hero.module.css';
import { Button } from './ui/Button';
import { Download, ShieldCheck, Apple, Monitor } from 'lucide-react';
import { motion } from 'framer-motion';

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
                            <Button size="lg" icon={<Apple size={20} />}>
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
