import { NextResponse } from 'next/server';
import axios from 'axios';

const MINIO_API_URL = "https://api-minio-storage.hazratdev.top";
const API_KEY = process.env.MINIO_API_KEY;

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { filename, file_type, file_size } = body;

        // 0. Ensure Bucket Exists
        try {
            await axios.post(
                `${MINIO_API_URL}/buckets`,
                { name: "chat-export" },
                { headers: { "Authorization": API_KEY } }
            );
        } catch (bucketError: any) {
            // Ignore error if bucket already exists (likely 409 or 400, but we proceed)
            console.log("Bucket creation check:", bucketError.response?.data || bucketError.message);
        }

        // 1. Init Upload
        const initRes = await axios.post(
            `${MINIO_API_URL}/upload/init`,
            {
                filename,
                file_type,
                file_size,
                bucket: "chat-export"
            },
            {
                headers: { "Authorization": API_KEY }
            }
        );

        return NextResponse.json(initRes.data);
    } catch (error: any) {
        console.error("Upload Init Error Details:", {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status,
            apiKeyPresent: !!API_KEY
        });
        return NextResponse.json({
            error: "Failed to init upload",
            details: error.response?.data || error.message
        }, { status: 500 });
    }
}

