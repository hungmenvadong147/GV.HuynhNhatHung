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
        formData.append('cloud_name', CLOUDINARY_CONFIG.cloudName);

        try {
            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/${resourceType}/upload`,
                {
                    method: 'POST',
                    body: formData
                }
            );

            if (!response.ok) {
                throw new Error(`Upload failed: ${response.statusText}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Cloudinary upload error:', error);
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
