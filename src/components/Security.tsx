"use client";

import React from 'react';
import styles from './Security.module.css';
import { ShieldCheck, Lock, Server, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';

export const Security = () => {
    return (
        <section id="security" className={styles.section}>
            <div className={`container ${styles.container}`}>
                <div className={styles.content}>
                    <h2 className={styles.title}>Your Data Stays Yours</h2>
                    <p className={styles.description}>
                        We believe your conversations are private. That's why Discord Chat Exporter runs entirely on your local machine.
                    </p>

                    <div className={styles.list}>
                        <div className={styles.item}>
                            <div className={styles.iconBox}>
                                <Server size={20} />
                            </div>
                            <div>
                                <h3 className={styles.itemTitle}>Local Execution</h3>
                                <p className={styles.itemDesc}>The backend runs on your device. No data is ever sent to our servers.</p>
                            </div>
                        </div>

                        <div className={styles.item}>
                            <div className={styles.iconBox}>
                                <Lock size={20} />
                            </div>
                            <div>
                                <h3 className={styles.itemTitle}>Direct Connection</h3>
                                <p className={styles.itemDesc}>The app communicates directly with Discord's API using your token.</p>
                            </div>
                        </div>

                        <div className={styles.item}>
                            <div className={styles.iconBox}>
                                <EyeOff size={20} />
                            </div>
                            <div>
                                <h3 className={styles.itemTitle}>No Tracking</h3>
                                <p className={styles.itemDesc}>We don't track your exports, messages, or user activity.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.visual}>
                    <motion.div
                        className={styles.shield}
                        animate={{
                            boxShadow: ["0 0 20px rgba(88, 101, 242, 0.2)", "0 0 50px rgba(88, 101, 242, 0.4)", "0 0 20px rgba(88, 101, 242, 0.2)"]
                        }}
                        transition={{ duration: 3, repeat: Infinity }}
                    >
                        <ShieldCheck size={120} className={styles.shieldIcon} />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
