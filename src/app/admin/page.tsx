"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/Button";
import styles from "./Admin.module.css";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, File, CheckCircle, XCircle, LogOut, Terminal, Monitor } from "lucide-react";

const AppleLogo = ({ size = 24, className = "" }: { size?: number, className?: string }) => (
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

interface LogEntry {
    id: string;
    timestamp: string;
    message: string;
    type: 'info' | 'success' | 'error';
}

export default function AdminPage() {
    const { data: session, status } = useSession();
    const [uploading, setUploading] = useState<string | null>(null); // 'mac' | 'win' | null
    const [progress, setProgress] = useState(0);
    const [logs, setLogs] = useState<LogEntry[]>([]);

    const addLog = (msg: string, type: 'info' | 'success' | 'error' = 'info') => {
        setLogs(prev => [{
            id: Math.random().toString(36).substr(2, 9),
            timestamp: new Date().toLocaleTimeString(),
            message: msg,
            type
        }, ...prev]);
    };

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, platform: 'mac' | 'win') => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(platform);
        setProgress(0);
        addLog(`Starting upload for ${platform}: ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`, 'info');

        try {
            const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB chunks (safe for Cloudflare)
            const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
            let finalPath = "";

            addLog(`Uploading in ${totalChunks} chunks...`, 'info');

            for (let i = 0; i < totalChunks; i++) {
                const start = i * CHUNK_SIZE;
                const end = Math.min(file.size, start + CHUNK_SIZE);
                const chunk = file.slice(start, end);

                const formData = new FormData();
                formData.append('chunk', chunk);
                formData.append('filename', file.name);
                formData.append('chunkIndex', i.toString());
                formData.append('totalChunks', totalChunks.toString());
                formData.append('platform', platform);

                const res = await axios.post('/api/admin/upload/chunk', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });

                if (res.data.completed) {
                    finalPath = res.data.path;
                }

                // Update progress
                const percentCompleted = Math.round(((i + 1) / totalChunks) * 100);
                setProgress(percentCompleted);
            }

            addLog(`Upload Complete! File saved as latest-${platform}.${platform === 'mac' ? 'dmg' : 'exe'}`, 'success');
            addLog(`Download URL: ${window.location.origin}${finalPath}`, 'success');

        } catch (error: any) {
            console.error(error);
            addLog(`ERROR: ${error.response?.data?.error || error.message}`, 'error');
        } finally {
            setUploading(null);
            setProgress(0);
            // Reset input
            e.target.value = '';
        }
    };

    if (status === "loading") return (
        <div className="flex items-center justify-center min-h-screen bg-black text-white">
            <div className="animate-pulse">Loading...</div>
        </div>
    );

    if (!session) {
        return (
            <div className={styles.container}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={styles.card}
                    style={{ maxWidth: '400px', width: '100%', alignItems: 'center', textAlign: 'center' }}
                >
                    <div className={styles.iconWrapper}>
                        <Terminal size={24} />
                    </div>
                    <h1>Admin Access Required</h1>
                    <p className="text-muted-foreground mb-4">Please sign in with your authorized account to manage application binaries.</p>
                    <Button onClick={() => signIn("google")} size="lg">Sign in with Google</Button>
                </motion.div>
            </div>
        );
    }

    return (
        <div className={styles.dashboard}>
            <motion.header
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className={styles.header}
            >
                <div className="flex items-center gap-3">
                    <div className={styles.iconWrapper}>
                        <Terminal size={24} />
                    </div>
                    <h1>Admin Dashboard</h1>
                </div>
                <div className={styles.user}>
                    <div className="flex flex-col items-end">
                        <span className="text-white font-medium">Administrator</span>
                        <span className="text-xs opacity-70">{session.user?.email}</span>
                    </div>
                    <Button variant="outline" onClick={() => signOut()} icon={<LogOut size={16} />}>Sign Out</Button>
                </div>
            </motion.header>

            <div className={styles.grid}>
                {/* macOS Upload Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className={styles.card}
                >
                    <div className={styles.cardHeader}>
                        <div className={styles.iconWrapper}>
                            <AppleLogo size={24} />
                        </div>
                        <div>
                            <h2>macOS Binary</h2>
                            <p className="text-sm text-muted-foreground">Upload .dmg file</p>
                        </div>
                    </div>

                    <div className={styles.uploadArea}>
                        <input
                            type="file"
                            accept=".dmg"
                            onChange={(e) => handleUpload(e, 'mac')}
                            disabled={!!uploading}
                        />
                        <div className={styles.uploadPlaceholder}>
                            <Upload size={32} className={uploading === 'mac' ? 'animate-bounce' : ''} />
                            <span>{uploading === 'mac' ? 'Uploading...' : 'Click or Drag .dmg file'}</span>
                        </div>
                    </div>

                    {uploading === 'mac' && (
                        <div className={styles.progressBar}>
                            <div className={styles.progressFill} style={{ width: `${progress}%` }} />
                        </div>
                    )}
                </motion.div>

                {/* Windows Upload Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className={styles.card}
                >
                    <div className={styles.cardHeader}>
                        <div className={styles.iconWrapper}>
                            <Monitor size={24} />
                        </div>
                        <div>
                            <h2>Windows Binary</h2>
                            <p className="text-sm text-muted-foreground">Upload .exe file</p>
                        </div>
                    </div>

                    <div className={styles.uploadArea}>
                        <input
                            type="file"
                            accept=".exe"
                            onChange={(e) => handleUpload(e, 'win')}
                            disabled={!!uploading}
                        />
                        <div className={styles.uploadPlaceholder}>
                            <Upload size={32} className={uploading === 'win' ? 'animate-bounce' : ''} />
                            <span>{uploading === 'win' ? 'Uploading...' : 'Click or Drag .exe file'}</span>
                        </div>
                    </div>

                    {uploading === 'win' && (
                        <div className={styles.progressBar}>
                            <div className={styles.progressFill} style={{ width: `${progress}%` }} />
                        </div>
                    )}
                </motion.div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className={styles.logs}
            >
                <h3><File size={18} /> Activity Log</h3>
                <div className={styles.logBox}>
                    <AnimatePresence initial={false}>
                        {logs.map((log) => (
                            <motion.div
                                key={log.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0 }}
                                className={`${styles.logEntry} ${styles[log.type]}`}
                            >
                                <span className="opacity-50 mr-2">[{log.timestamp}]</span>
                                {log.type === 'success' && <CheckCircle size={14} className="inline mr-2" />}
                                {log.type === 'error' && <XCircle size={14} className="inline mr-2" />}
                                {log.message}
                            </motion.div>
                        ))}
                        {logs.length === 0 && <div className="text-center opacity-30 py-8">No activity yet</div>}
                    </AnimatePresence>
                </div>
            </motion.div>
        </div>
    );
}
