'use server';

import cloudinary from '@/lib/cloudinary';

export async function uploadMedia(base64Image: string) {
  try {
    const uploadResponse = await cloudinary.uploader.upload(base64Image, {
      folder: process.env.CLOUDINARY_FOLDER,
      resource_type: 'auto',
    });
    return { success: true, url: uploadResponse.secure_url };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    return { error: 'Media backend declined the upload' };
  }
}
