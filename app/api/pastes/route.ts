import { NextRequest, NextResponse } from 'next/server';
import { nanoid } from 'nanoid';
import { mockStorage, type PasteData } from '../../../lib/storage';

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

export async function POST(request: NextRequest) {
  let body;
  try {
    body = await request.json();
  } catch (error) {
    return NextResponse.json(
      { error: 'Invalid JSON format' },
      { status: 400 }
    );
  }

  // Validate content
  if (!body.content || typeof body.content !== 'string' || body.content.trim() === '') {
    return NextResponse.json(
      { error: 'Content is required and must be a non-empty string' },
      { status: 400 }
    );
  }

  // Validate ttl_seconds
  if (body.ttl_seconds !== undefined && body.ttl_seconds !== null && (!Number.isInteger(body.ttl_seconds) || body.ttl_seconds < 1)) {
    return NextResponse.json(
      { error: 'ttl_seconds must be an integer >= 1' },
      { status: 400 }
    );
  }

  // Validate max_views
  if (body.max_views !== undefined && body.max_views !== null && (!Number.isInteger(body.max_views) || body.max_views < 1)) {
    return NextResponse.json(
      { error: 'max_views must be an integer >= 1' },
      { status: 400 }
    );
  }

  try {
    const id = nanoid();
    const now = getCurrentTime(request);
    const expires_at = body.ttl_seconds ? now + (body.ttl_seconds * 1000) : null;

    const pasteData: PasteData = {
      content: body.content,
      created_at: now,
      expires_at,
      max_views: body.max_views || null,
      views: 0,
    };

    // Use mock storage for development
    mockStorage.set(`paste:${id}`, pasteData);

    const url = `${request.nextUrl.origin}/p/${id}`;

    return NextResponse.json({ id, url });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create paste' },
      { status: 500 }
    );
  }
}