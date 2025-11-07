import { Event } from '@/database/models';
import dbConnect from '@/lib/mongodb';
import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const formData = await request.formData();

    let event;

    try {
      event = Object.fromEntries(formData.entries());
    } catch {
      return NextResponse.json(
        { message: 'Invalid JSON data format' },
        { status: 400 }
      );
    }

    const file = formData.get('image') as File;
    if (!file)
      return NextResponse.json(
        { message: 'Image file is required' },
        { status: 400 }
      );

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const uploadResult = await new Promise<UploadApiResponse>(
      (resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            {
              resource_type: 'image',
              folder: 'events',
            },
            (error, result) => {
              if (error) return reject(error);
              resolve(result!);
            }
          )
          .end(buffer);
      }
    );

    event.image = uploadResult.secure_url;

    const createdEvent = await Event.create(event);

    return NextResponse.json(
      { message: 'Event created successfully', event: createdEvent },
      { status: 201 }
    );
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      {
        message: 'Event creation failed',
        error: e instanceof Error ? e.message : 'Something went wrong',
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await dbConnect();

    const events = await Event.find().sort({ createdAt: -1 }).lean();

    return NextResponse.json({ events });
  } catch (e) {
    return NextResponse.json(
      {
        message: 'Failed to fetch events',
        error: e instanceof Error ? e.message : 'Something went wrong',
      },
      { status: 500 }
    );
  }
}
