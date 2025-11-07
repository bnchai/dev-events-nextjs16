import { Event } from '@/database/models';
import dbConnect from '@/lib/mongodb';
import { NextRequest, NextResponse } from 'next/server';

type RouteParams = {
  params: Promise<{ slug: string }>;
};

export async function GET(request: NextRequest, { params }: RouteParams) {
  const { slug } = await params;

  await dbConnect();

  if (!slug || typeof slug !== 'string' || slug.trim() === '') {
    return NextResponse.json(
      { message: 'Invalid slug or missing slug parameter' },
      { status: 400 }
    );
  }

  const sanitizedSlug = slug.trim().toLowerCase();

  try {
    const event = await Event.findOne({ slug: sanitizedSlug }).lean();

    if (!event) {
      return NextResponse.json(
        { message: `Event with slug ${sanitizedSlug} not found` },
        { status: 404 }
      );
    }

    return NextResponse.json(event);
  } catch (e) {
    NextResponse.json(
      {
        message: 'Failed to fetch event',
        error: e instanceof Error ? e.message : 'Something went wrong',
      },
      { status: 500 }
    );
  }
}
