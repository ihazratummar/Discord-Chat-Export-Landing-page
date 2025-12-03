import { NextResponse } from 'next/server';
import { writeFile, appendFile, rename, mkdir, unlink } from 'fs/promises';
import path from 'path';
import { existsSync } from 'fs';

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('chunk') as File;
        const filename = formData.get('filename') as string;
        const chunkIndex = parseInt(formData.get('chunkIndex') as string);
        const totalChunks = parseInt(formData.get('totalChunks') as string);
        const platform = formData.get('platform') as string;

        if (!file) {
            return NextResponse.json({ error: "No chunk uploaded" }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());

        // Temp directory for chunks
        const uploadDir = path.join(process.cwd(), 'public', 'downloads');
        const tempDir = path.join(uploadDir, 'temp');

        // Ensure directories exist
        if (!existsSync(uploadDir)) await mkdir(uploadDir, { recursive: true });
        if (!existsSync(tempDir)) await mkdir(tempDir, { recursive: true });

        const tempFilePath = path.join(tempDir, `${filename}.part`);

        // If first chunk, write (overwrite if exists from failed previous attempt)
        if (chunkIndex === 0) {
            await writeFile(tempFilePath, buffer);
        } else {
            // Append subsequent chunks
            await appendFile(tempFilePath, buffer);
        }

        // If last chunk, finalize
        if (chunkIndex === totalChunks - 1) {
            const finalFilename = platform === 'mac' ? 'latest-mac.dmg' : 'latest-win.exe';
            const finalPath = path.join(uploadDir, finalFilename);

            // Rename temp file to final file
            await rename(tempFilePath, finalPath);
            console.log(`Upload complete: ${finalPath}`);
            return NextResponse.json({ success: true, completed: true, path: `/downloads/${finalFilename}` });
        }

        return NextResponse.json({ success: true, completed: false });

    } catch (error: any) {
        console.error("Chunk Upload Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
