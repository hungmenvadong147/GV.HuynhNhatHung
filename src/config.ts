// Cloudinary Configuration
// Cấu hình cho website tĩnh (static site)
// Chỉ cần cloudName và uploadPreset cho unsigned uploads

export const CLOUDINARY_CONFIG = {
    cloudName: 'dvlfaq9ma',
    uploadPreset: 'learning-website' // Tạo unsigned preset trong Cloudinary Dashboard
};

export const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/upload`;
