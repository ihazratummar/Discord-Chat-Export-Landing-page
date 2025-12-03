import { NextResponse } from 'next/server';
import { stat } from 'fs/promises';
import path from 'path';
import { createReadStream } from 'fs';

// Helper to convert Node stream to Web stream
function nodeStreamToWeb(nodeStream: any) {
    return new ReadableStream({
        start(controller) {
            nodeStream.on('data', (chunk: any) => controller.enqueue(chunk));
            nodeStream.on('end', () => controller.close());
            nodeStream.on('error', (err: any) => controller.error(err));
        },
        cancel() {
            nodeStream.destroy();
        }
    });
}

export async function GET(request: Request, { params }: { params: { filename: string } }) {
    const filename = params.filename;
    // Security: Allow only specific filenames to prevent LFI
    const allowedFiles = ['latest-mac.dmg', 'latest-win.exe'];

    if (!allowedFiles.includes(filename)) {
        return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    const filePath = path.join(process.cwd(), 'public', 'downloads', filename);

    try {
        const stats = await stat(filePath);
        const stream = createReadStream(filePath);
        const webStream = nodeStreamToWeb(stream);

        return new NextResponse(webStream as any, {
            headers: {
                'Content-Length': stats.size.toString(),
                'Content-Type': 'application/octet-stream',
                'Content-Disposition': `attachment; filename="${filename}"`,
            },
        });
    } catch (error) {
        console.error(`Download error for ${filename}:`, error);
        return NextResponse.json({ error: "File not found on server" }, { status: 404 });
    }
}
