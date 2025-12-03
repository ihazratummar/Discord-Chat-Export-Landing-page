"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/Button";
import styles from "./Admin.module.css";

export default function AdminPage() {
    const { data: session, status } = useSession();
    const [uploading, setUploading] = useState(false);
    const [logs, setLogs] = useState<string[]>([]);

    const addLog = (msg: string) => setLogs(prev => [...prev, `${new Date().toLocaleTimeString()} - ${msg}`]);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, platform: 'mac' | 'win') => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        addLog(`Starting upload for ${platform}: ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`);

        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('platform', platform);

            addLog("Uploading to local server...");

            const res = await axios.post('/api/admin/upload/local', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            addLog(`✅ Upload Complete! File saved as latest-${platform}.${platform === 'mac' ? 'dmg' : 'exe'}`);
            addLog(`Download URL: ${window.location.origin}${res.data.path}`);

        } catch (error: any) {
            console.error(error);
            addLog(`❌ ERROR: ${error.response?.data?.error || error.message}`);
        } finally {
            setUploading(false);
        }
    };

    if (status === "loading") return <div className="p-10">Loading...</div>;

    if (!session) {
        return (
            <div className={styles.container}>
                <h1>Admin Access Required</h1>
                <Button onClick={() => signIn("google")}>Sign in with Google</Button>
            </div>
        );
    }

    return (
        <div className={styles.dashboard}>
            <header className={styles.header}>
                <h1>Admin Dashboard</h1>
                <div className={styles.user}>
                    <span>{session.user?.email}</span>
                    <Button variant="outline" onClick={() => signOut()}>Sign Out</Button>
                </div>
            </header>

            <div className={styles.grid}>
                <div className={styles.card}>
                    <h2>Upload macOS Binary (.dmg)</h2>
                    <input
                        type="file"
                        accept=".dmg"
                        onChange={(e) => handleUpload(e, 'mac')}
                        disabled={uploading}
                        className={styles.fileInput}
                    />
                </div>

                <div className={styles.card}>
                    <h2>Upload Windows Binary (.exe)</h2>
                    <input
                        type="file"
                        accept=".exe"
                        onChange={(e) => handleUpload(e, 'win')}
                        disabled={uploading}
                        className={styles.fileInput}
                    />
                </div>
            </div>

            <div className={styles.logs}>
                <h3>Activity Log</h3>
                <div className={styles.logBox}>
                    {logs.map((log, i) => <div key={i}>{log}</div>)}
                </div>
            </div>
        </div>
    );
}
