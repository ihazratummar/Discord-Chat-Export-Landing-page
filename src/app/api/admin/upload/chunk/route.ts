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

        // Temp directory for chunks (use system temp to avoid permission issues)
        const tempDir = path.join('/tmp', 'discord-chat-exporter-uploads');
        const uploadDir = path.join(process.cwd(), 'public', 'downloads');

        // Ensure directories exist
        try {
            if (!existsSync(tempDir)) await mkdir(tempDir, { recursive: true });
            if (!existsSync(uploadDir)) await mkdir(uploadDir, { recursive: true });
        } catch (err) {
            console.error("Directory creation failed:", err);
            throw err;
        }

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

            // Move temp file to final file using streams (handles cross-device & memory)
            try {
                const { pipeline } = await import('stream/promises');
                const { createReadStream, createWriteStream } = await import('fs');

                // Ensure destination does not exist or we can overwrite it
                if (existsSync(finalPath)) {
                    try {
                        await unlink(finalPath);
                    } catch (unlinkError) {
                        console.warn(`Could not delete existing file ${finalPath}:`, unlinkError);
                    }
                }

                await pipeline(
                    createReadStream(tempFilePath),
                    createWriteStream(finalPath)
                );

                // Ensure 777 permissions on the new file so anyone can read/overwrite it later
                try {
                    await import('fs/promises').then(fs => fs.chmod(finalPath, 0o777));
                } catch (chmodError) {
                    console.warn("Could not chmod final file:", chmodError);
                }

                await unlink(tempFilePath);
                console.log(`Upload complete: ${finalPath}`);
                return NextResponse.json({ success: true, completed: true, path: `/downloads/${finalFilename}` });

            } catch (moveError: any) {
                console.error("Move failed:", moveError);
                return NextResponse.json({ error: `Move failed: ${moveError.message}` }, { status: 500 });
            }
        }

        return NextResponse.json({ success: true, completed: false });

    } catch (error: any) {
        console.error("Chunk Upload Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
