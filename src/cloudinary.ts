import { CLOUDINARY_CONFIG, CLOUDINARY_UPLOAD_URL } from './config';

export interface CloudinaryUploadResponse {
    secure_url: string;
    public_id: string;
    resource_type: string;
    format: string;
    width?: number;
    height?: number;
    duration?: number;
}

export class CloudinaryService {
    /**
     * Upload file to Cloudinary
     * @param file - File to upload (image or video)
     * @param resourceType - 'image' or 'video'
     * @returns Promise with Cloudinary response
     */
    static async uploadFile(
        file: File,
        resourceType: 'image' | 'video' = 'image'
    ): Promise<CloudinaryUploadResponse> {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', CLOUDINARY_CONFIG.uploadPreset);
        // ⚠️ KHÔNG GỬI cloud_name trong FormData cho unsigned upload!
        // Cloud name chỉ dùng trong URL

        // Log để debug
        console.log('🚀 Uploading to Cloudinary:', {
            cloudName: CLOUDINARY_CONFIG.cloudName,
            uploadPreset: CLOUDINARY_CONFIG.uploadPreset,
            resourceType,
            fileName: file.name,
            fileSize: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
            fileType: file.type
        });

        try {
            const uploadUrl = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/${resourceType}/upload`;
            console.log('📡 Upload URL:', uploadUrl);

            const response = await fetch(uploadUrl, {
                method: 'POST',
                body: formData
            });

            console.log('📥 Response status:', response.status);

            if (!response.ok) {
                const errorData = await response.json();
                console.error('❌ Cloudinary error response:', errorData);
                
                // Xử lý các loại lỗi cụ thể
                let errorMessage = 'Upload thất bại';
                
                if (errorData.error?.message) {
                    const msg = errorData.error.message;
                    
                    if (msg.includes('preset') && msg.includes('whitelisted')) {
                        errorMessage = `❌ Lỗi Upload Preset!\n\n` +
                            `Preset "${CLOUDINARY_CONFIG.uploadPreset}" chưa được cấu hình đúng.\n\n` +
                            `Hướng dẫn sửa:\n` +
                            `1. Vào: https://console.cloudinary.com/settings/upload\n` +
                            `2. Tìm preset tên: "${CLOUDINARY_CONFIG.uploadPreset}"\n` +
                            `3. Đảm bảo:\n` +
                            `   - Signing Mode = "Unsigned"\n` +
                            `   - Status = "Enabled"\n` +
                            `4. Nếu chưa có preset, tạo mới với tên chính xác: "${CLOUDINARY_CONFIG.uploadPreset}"\n` +
                            `5. Lưu lại và thử upload lại`;
                    } else if (msg.includes('Invalid')) {
                        errorMessage = `❌ Lỗi: ${msg}\n\nKiểm tra lại Cloud Name trong src/config.ts`;
                    } else if (msg.includes('File size')) {
                        errorMessage = `❌ File quá lớn!\n\n${msg}`;
                    } else {
                        errorMessage = `❌ Lỗi Cloudinary: ${msg}`;
                    }
                }
                
                throw new Error(errorMessage);
            }

            const data = await response.json();
            console.log('✅ Upload successful:', {
                url: data.secure_url,
                publicId: data.public_id,
                format: data.format,
                size: data.bytes ? `${(data.bytes / 1024 / 1024).toFixed(2)} MB` : 'N/A'
            });
            return data;
        } catch (error) {
            console.error('💥 Cloudinary upload error:', error);
            
            // Nếu là lỗi network
            if (error instanceof TypeError && error.message.includes('fetch')) {
                throw new Error('❌ Lỗi kết nối!\n\nKiểm tra kết nối internet của bạn.');
            }
            
            throw error;
        }
    }

    /**
     * Delete file from Cloudinary
     * @param publicId - Public ID of the file to delete
     * @param resourceType - 'image' or 'video'
     */
    static async deleteFile(
        publicId: string,
        resourceType: 'image' | 'video' = 'image'
    ): Promise<void> {
        // Note: Deletion requires authentication and should be done server-side
        // For now, we'll just remove the reference from our app
        console.log(`File ${publicId} should be deleted from Cloudinary`);
    }

    /**
     * Get optimized image URL
     * @param url - Original Cloudinary URL
     * @param width - Desired width
     * @param quality - Quality (1-100)
     */
    static getOptimizedImageUrl(
        url: string,
        width?: number,
        quality: number = 80
    ): string {
        if (!url.includes('cloudinary.com')) return url;

        const transformations = [];
        if (width) transformations.push(`w_${width}`);
        transformations.push(`q_${quality}`);
        transformations.push('f_auto'); // Auto format

        const parts = url.split('/upload/');
        if (parts.length === 2) {
            return `${parts[0]}/upload/${transformations.join(',')}/${parts[1]}`;
        }

        return url;
    }

    /**
     * Get video thumbnail URL
     * @param videoUrl - Cloudinary video URL
     */
    static getVideoThumbnail(videoUrl: string): string {
        if (!videoUrl.includes('cloudinary.com')) return '';

        const parts = videoUrl.split('/upload/');
        if (parts.length === 2) {
            // Get thumbnail at 2 seconds, 400px wide
            return `${parts[0]}/upload/so_2.0,w_400,q_auto,f_jpg/${parts[1].replace(/\.[^.]+$/, '.jpg')}`;
        }

        return '';
    }
}
