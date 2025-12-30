import { NextRequest, NextResponse } from 'next/server';
import { mockStorage, type PasteData } from '../../../../lib/storage';

function getCurrentTime(request: NextRequest): number {
  const testMode = process.env.TEST_MODE === '1';
  if (testMode) {
    const testTime = request.headers.get('x-test-now-ms');
    if (testTime) {
      return parseInt(testTime, 10);
    }
  }
  return Date.now();
}

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const now = getCurrentTime(request);

  try {
    const pasteData = mockStorage.get(`paste:${id}`);

    if (!pasteData) {
      return NextResponse.json({ error: 'Paste not found' }, { status: 404 });
    }

    // Check if expired
    if (pasteData.expires_at && now >= pasteData.expires_at) {
      return NextResponse.json({ error: 'Paste not found' }, { status: 404 });
    }

    // Check if view limit exceeded
    if (pasteData.max_views && pasteData.views >= pasteData.max_views) {
      return NextResponse.json({ error: 'Paste not found' }, { status: 404 });
    }

    // Increment view count
    const updatedPaste = {
      ...pasteData,
      views: pasteData.views + 1,
    };

    mockStorage.set(`paste:${id}`, updatedPaste);

    const remaining_views = pasteData.max_views 
      ? Math.max(0, pasteData.max_views - updatedPaste.views)
      : null;

    const expires_at = pasteData.expires_at 
      ? new Date(pasteData.expires_at).toISOString()
      : null;

    return NextResponse.json({
      content: pasteData.content,
      remaining_views,
      expires_at,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Paste not found' }, { status: 404 });
  }
}