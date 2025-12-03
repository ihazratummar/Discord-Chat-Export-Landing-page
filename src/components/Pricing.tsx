"use client";

import React from 'react';
import styles from './Pricing.module.css';
import { Button } from './ui/Button';
import { Check } from 'lucide-react';

export const Pricing = () => {
    return (
        <section id="pricing" className={styles.section}>
            <div className="container">
                <div className={styles.header}>
                    <h2 className={styles.title}>Simple, Transparent Pricing</h2>
                    <p style={{ color: 'var(--muted)' }}>Start for free, upgrade for power.</p>
                </div>

                <div className={styles.grid}>
                    {/* Free Plan */}
                    <div className={styles.card}>
                        <h3 className={styles.planName}>Free</h3>
                        <div className={styles.price}>$0<span className={styles.period}>/forever</span></div>

                        <ul className={styles.features}>
                            <li className={styles.feature}>
                                <Check size={20} className={styles.check} />
                                <span>Export to HTML & TXT</span>
                            </li>
                            <li className={styles.feature}>
                                <Check size={20} className={styles.check} />
                                <span>Basic Filtering</span>
                            </li>
                            <li className={styles.feature}>
                                <Check size={20} className={styles.check} />
                                <span>Single Channel Export</span>
                            </li>
                            <li className={`${styles.feature} ${styles.muted}`}>
                                <Check size={20} className={styles.check} style={{ opacity: 0.3 }} />
                                <span>JSON & CSV Export</span>
                            </li>
                            <li className={`${styles.feature} ${styles.muted}`}>
                                <Check size={20} className={styles.check} style={{ opacity: 0.3 }} />
                                <span>Media Downloading</span>
                            </li>
                        </ul>

                        <Button variant="outline" fullWidth>Download Free</Button>
                    </div>

                    {/* Pro Plan */}
                    <div className={`${styles.card} ${styles.proCard}`}>
                        <div className={styles.popularBadge}>MOST POPULAR</div>
                        <h3 className={styles.planName}>Pro License</h3>
                        <div className={styles.price}>$19<span className={styles.period}>/lifetime</span></div>

                        <ul className={styles.features}>
                            <li className={styles.feature}>
                                <Check size={20} className={styles.check} />
                                <span>All Export Formats (JSON, CSV, MD)</span>
                            </li>
                            <li className={styles.feature}>
                                <Check size={20} className={styles.check} />
                                <span>Download Images & Videos</span>
                            </li>
                            <li className={styles.feature}>
                                <Check size={20} className={styles.check} />
                                <span>Bulk Export (Entire Server)</span>
                            </li>
                            <li className={styles.feature}>
                                <Check size={20} className={styles.check} />
                                <span>Advanced Filtering (Bots, Roles)</span>
                            </li>
                            <li className={styles.feature}>
                                <Check size={20} className={styles.check} />
                                <span>Priority Support</span>
                            </li>
                        </ul>

                        <Button variant="primary" fullWidth>Get Pro License</Button>
                    </div>
                </div>
            </div>
        </section>
    );
};
