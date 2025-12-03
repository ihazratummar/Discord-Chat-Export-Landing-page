import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;
        const platform = formData.get('platform') as string;

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Determine filename based on platform
        let filename = "";
        if (platform === 'mac') {
            filename = "latest-mac.dmg";
        } else if (platform === 'win') {
            filename = "latest-win.exe";
        } else {
            return NextResponse.json({ error: "Invalid platform" }, { status: 400 });
        }

        // Save to public/downloads
        // We use process.cwd() which is /app in Docker
        // The volume /home/app_data/discord_downloads is mounted to /app/public/downloads
        const uploadDir = path.join(process.cwd(), 'public', 'downloads');

        // Ensure directory exists (just in case)
        try {
            await mkdir(uploadDir, { recursive: true });
        } catch (e) {
            // Ignore if exists
        }

        const filePath = path.join(uploadDir, filename);

        await writeFile(filePath, buffer);
        console.log(`File saved to ${filePath}`);

        return NextResponse.json({ success: true, path: `/downloads/${filename}` });
    } catch (error: any) {
        console.error("Local Upload Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
