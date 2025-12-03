import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: Promise<{ filename: string }> }) {
    const { filename } = await params;

    if (filename === 'latest-mac.dmg') {
        return NextResponse.redirect("https://github.com/ihazratummar/DCE-Downloads/releases/latest/download/DiscordChatExporter-Mac.dmg");
    }
    if (filename === 'latest-win.exe') {
        return NextResponse.redirect("https://github.com/ihazratummar/DCE-Downloads/releases/latest/download/DiscordChatExporter-Windows.exe");
    }

    return NextResponse.json({ error: "File not found" }, { status: 404 });
}
