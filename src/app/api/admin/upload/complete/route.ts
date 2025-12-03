import { NextResponse } from 'next/server';
import axios from 'axios';

const MINIO_API_URL = "https://api-minio-storage.hazratdev.top";
const API_KEY = process.env.MINIO_API_KEY;

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { object_key, file_size, file_type } = body;

        // 2. Complete Upload
        const completeRes = await axios.post(
            `${MINIO_API_URL}/upload/complete`,
            {
                object_key,
                file_size,
                file_type,
                bucket: "chat-export",
                optimize: false // Don't optimize binaries
            },
            {
                headers: { "Authorization": API_KEY }
            }
        );

        return NextResponse.json(completeRes.data);
    } catch (error: any) {
        console.error("Upload Complete Error Details:", {
            message: error.message,
            response: error.response?.data,
            status: error.response?.status
        });
        return NextResponse.json({
            error: "Failed to complete upload",
            details: error.response?.data || error.message
        }, { status: 500 });
    }
}

