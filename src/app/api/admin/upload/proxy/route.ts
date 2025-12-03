import { NextResponse } from 'next/server';

export async function PUT(request: Request) {
    const { searchParams } = new URL(request.url);
    const targetUrl = searchParams.get('url');

    if (!targetUrl) {
        return NextResponse.json({ error: 'Missing url param' }, { status: 400 });
    }

    // Fix: The backend generates URLs with 'minio-api.hazratdev.top' which seems unresolvable/internal.
    // We rewrite it to 'api-minio-storage.hazratdev.top' which we know works (it served the init request).
    // This assumes they point to the same server/IP.
    let finalUrl = targetUrl;
    if (finalUrl.includes('minio-api.hazratdev.top')) {
        finalUrl = finalUrl.replace('minio-api.hazratdev.top', 'api-minio-storage.hazratdev.top');
        console.log(`Rewrote target URL host to: ${finalUrl}`);
    }

    try {
        const contentLength = request.headers.get('content-length');
        const headers: Record<string, string> = {
            'Content-Type': request.headers.get('content-type') || 'application/octet-stream',
        };
        if (contentLength) {
            headers['Content-Length'] = contentLength;
        }

        // Forward the PUT request using native fetch
        // We can pass the request.body (ReadableStream) directly to fetch
        const response = await fetch(finalUrl, {
            method: 'PUT',
            body: request.body,
            headers,
            // @ts-ignore - duplex is required for streaming bodies in Node.js fetch
            duplex: 'half',
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Proxy Upstream Error: ${response.status} ${response.statusText}`, errorText);
            return NextResponse.json({
                error: `Upstream error: ${response.status}`,
                details: errorText
            }, { status: response.status });
        }

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error('Proxy Upload Error:', error);
        if (error.cause) console.error('Proxy Upload Error Cause:', error.cause);
        return NextResponse.json({
            error: error.message,
            cause: error.cause ? String(error.cause) : undefined
        }, { status: 500 });
    }
}

