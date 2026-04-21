import cloudinary from "cloudinary";

export async function uploadMedia(base64Images: string[]) {
  try {
    const uploadPromises = base64Images.map(async (base64Image) => {
      const uploadResponse = await cloudinary.v2.uploader.upload(base64Image, {
        folder: process.env.CLOUDINARY_FOLDER,
        resource_type: "auto",
      });
      return uploadResponse.secure_url;
    });

    const urls = await Promise.all(uploadPromises);
    return urls;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return [];
  }
}

/**
 * Fetch all image URLs from the configured Cloudinary folder.
 * Used by the vendor dashboard to bulk-import assets.
 */
export async function getFolderImages(folder?: string): Promise<string[]> {
  try {
    const targetFolder = folder ?? process.env.CLOUDINARY_FOLDER ?? "";
    const result = await cloudinary.v2.search
      .expression(`folder:${targetFolder}`)
      .with_field("secure_url")
      .max_results(100)
      .execute();

    return (result.resources ?? []).map((r: any) => r.secure_url);
  } catch (error) {
    console.error("Cloudinary folder fetch error:", error);
    return [];
  }
}
