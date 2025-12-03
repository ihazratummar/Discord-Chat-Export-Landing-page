"use client";

import React from 'react';
import styles from './Features.module.css';
import { FileText, Image, Search, Calendar, Shield, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
    {
        icon: <FileText size={24} />,
        title: "Multiple Formats",
        desc: "Export your chats to HTML, CSV, JSON, Markdown, or Plain Text. Perfect for archiving or data analysis."
    },
    {
        icon: <Image size={24} />,
        title: "Media Archival",
        desc: "Don't lose your memories. Automatically download and link images, videos, and other attachments locally."
    },
    {
        icon: <Search size={24} />,
        title: "Powerful Search",
        desc: "Filter messages by user, content, or mentions. Find exactly what you're looking for in seconds."
    },
    {
        icon: <Calendar size={24} />,
        title: "Date Filtering",
        desc: "Select specific time ranges to export. Archive just last year's messages or the entire history."
    },
    {
        icon: <Shield size={24} />,
        title: "Privacy First",
        desc: "Your token and data never leave your machine. The application runs completely locally."
    },
    {
        icon: <Zap size={24} />,
        title: "Lightning Fast",
        desc: "Built with performance in mind. Handle millions of messages without breaking a sweat."
    }
];

export const Features = () => {
    return (
        <section id="features" className={styles.section}>
            <div className="container">
                <div className={styles.header}>
                    <h2 className={styles.title}>Everything you need to archive</h2>
                    <p className={styles.subtitle}>
                        Powerful tools to help you preserve, search, and analyze your Discord conversation history.
                    </p>
                </div>

                <div className={styles.grid}>
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className={styles.card}
                        >
                            <div className={styles.iconWrapper}>
                                {feature.icon}
                            </div>
                            <h3 className={styles.cardTitle}>{feature.title}</h3>
                            <p className={styles.cardDesc}>{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
