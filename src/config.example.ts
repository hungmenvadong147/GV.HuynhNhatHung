// Cloudinary Configuration Template
// Copy this file to config.ts and fill in your actual values

export const CLOUDINARY_CONFIG = {
    cloudName: 'dvlfaq9ma',
    apiKey: 'YOUR_API_KEY_HERE', // Get from Cloudinary dashboard
    uploadPreset: 'learning-website' // Create this in Cloudinary settings
};

export const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/upload`;
