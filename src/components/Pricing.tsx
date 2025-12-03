"use client";

import React, { useState } from 'react';
import styles from './Pricing.module.css';
import { Button } from './ui/Button';
import { Check, Loader2 } from 'lucide-react';
import Script from 'next/script';

declare global {
    interface Window {
        Razorpay: any;
    }
}

export const Pricing = () => {
    const [loading, setLoading] = useState(false);

    const handlePayment = () => {
        setLoading(true);

        if (!window.Razorpay) {
            alert("Razorpay SDK failed to load. Please check your connection.");
            setLoading(false);
            return;
        }

        const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
            amount: 1900, // Amount in smallest currency unit (e.g., 1900 cents = $19)
            currency: "USD",
            name: "Discord Chat Exporter",
            description: "Pro License (Lifetime)",
            image: "/logo_transparent.png",
            handler: function (response: any) {
                // Payment successful
                alert("Payment Successful! Your license key will be sent to your email shortly.");
                console.log("Payment ID: ", response.razorpay_payment_id);
                // You could optionally call your backend here to confirm, 
                // but the webhook will handle the fulfillment.
            },
            prefill: {
                name: "",
                email: ""
            },
            theme: {
                color: "#5865F2"
            },
            modal: {
                ondismiss: function () {
                    setLoading(false);
                }
            }
        };

        const rzp1 = new window.Razorpay(options);
        rzp1.on('payment.failed', function (response: any) {
            alert("Payment Failed: " + response.error.description);
            setLoading(false);
        });

        rzp1.open();
    };

    return (
        <section id="pricing" className={styles.section}>
            <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />

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

                        <a href="https://github.com/ihazratummar/DCE-Downloads/releases/latest/download/DiscordChatExporter-Windows.exe" download style={{ width: '100%' }}>
                            <Button variant="outline" fullWidth>Download Free</Button>
                        </a>
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

                        <Button
                            variant="primary"
                            fullWidth
                            onClick={handlePayment}
                            disabled={loading}
                        >
                            {loading ? <><Loader2 className="animate-spin mr-2" size={18} /> Processing...</> : 'Get Pro License'}
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};
