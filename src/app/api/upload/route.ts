import { NextRequest, NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Convert File to base64 for Cloudinary upload
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64 = `data:${file.type};base64,${buffer.toString('base64')}`;

    const result = await cloudinary.uploader.upload(base64, {
      folder: process.env.CLOUDINARY_FOLDER || process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER || 'Furniture-Studio',
      resource_type: 'image',
      transformation: [
        { width: 1200, height: 1200, crop: 'limit', quality: 'auto', fetch_format: 'auto' }
      ],
    });

    return NextResponse.json({ url: result.secure_url, publicId: result.public_id });
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
