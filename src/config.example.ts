// Cloudinary Configuration Template
// Copy this file to config.ts and fill in your actual values

export const CLOUDINARY_CONFIG = {
    cloudName: 'your-cloud-name', // Thay bằng cloud name của bạn
    uploadPreset: 'your-upload-preset' // Tạo unsigned preset trong Cloudinary Dashboard
};

export const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/upload`;
