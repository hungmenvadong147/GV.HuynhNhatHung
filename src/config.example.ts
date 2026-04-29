// Cloudinary Configuration Template
// Copy this file to config.ts and fill in your actual values

export const CLOUDINARY_CONFIG = {
    cloudName: 'your-cloud-name', // Cloud name từ dashboard
    apiKey: 'YOUR_API_KEY_HERE', // API Key từ dashboard
    apiSecret: 'YOUR_API_SECRET_HERE', // API Secret từ dashboard
    uploadPreset: 'your-upload-preset' // Tạo unsigned preset trong Cloudinary Dashboard
};

export const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/upload`;
