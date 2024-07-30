import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dove8c7sk', 
  api_key:process.env.CLOUDINARY_API_KEY || '843931543327758', 
  api_secret: process.env.CLOUDINARY_API_SECRET || 'zsze9NfvFQFfvIWHZGAzT0dArXs' 
});
 console.log("hello")
export const uploadCloudinary = async (filePath) => {
  try {
   if(!filePath) return null
   // upload the file on cloudinary
   const response= await cloudinary.uploader.upload(filePath,{
    overwrite:true,
    resource_type: "auto",
   })

    // file has been uploaded successfully
    //

    fs.unlinkSync(filePath)
    return response;

  } catch (error) {
    fs.unlinkSync(filePath); // Delete the file in case of upload error
    console.error('Error uploading to Cloudinary:', error);
    return null;
  }
};

export const getImage =  (Id) => {
  try {

    const imageUrl =  cloudinary.url(Id, { secure: true });
    return imageUrl;


  } catch (error) {
    console.error('Error fetching image:', error);
    return `Error: ${error.message}`;
  }
};

export const deleteImageFromCloudinary = async (publicId) => {
  try {
    // Check if a public ID is provided
    if (!publicId) {
      console.error('No public ID provided for image deletion.');
      return null;
    }

    // Delete the image from Cloudinary
    const result = await cloudinary.uploader.destroy(publicId);

    // Check the result of the deletion
    if (result.result === 'ok') {
      console.log(`Image with public ID "${publicId}" has been deleted.`);
      return result;
    } else {
      console.error(`Error deleting image with public ID "${publicId}": ${result.result}`);
      return null;
    }
  } catch (error) {
    console.error('Error deleting image from Cloudinary:', error);
    return null;
  }
};