import { CloudinaryService } from './cloudinary';

// Interfaces
interface Course {
    id: string;
    title: string;
    description: string;
    videoUrl?: string;
    videoPublicId?: string;
}

interface GalleryImage {
    id: string;
    url: string;
    publicId?: string;
}

interface AppData {
    courses: Course[];
    gallery: GalleryImage[];
    editableContent: { [key: string]: string };
    videos: { [key: string]: { url: string; publicId?: string } };
}

// Storage Manager
class DataStorageManager {
    private static readonly STORAGE_KEY = 'learning-website-data';

    static saveData(data: AppData): void {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    }

    static loadData(): AppData {
        const data = localStorage.getItem(this.STORAGE_KEY);
        if (data) {
            return JSON.parse(data);
        }
        return {
            courses: [],
            gallery: [],
            editableContent: {},
            videos: {}
        };
    }
}

// App Class
class LearningWebsite {
    private isAdminMode: boolean = false;
    private data: AppData;
    private currentEditingCourse: string | null = null;

    constructor() {
        this.data = DataStorageManager.loadData();
        this.init();
    }

    private init(): void {
        this.setupEventListeners();
        this.renderCourses();
        this.renderGallery();
        this.loadEditableContent();
        this.loadVideos();
    }

    private setupEventListeners(): void {
        // Menu toggle
        const menuToggle = document.getElementById('menuToggle');
        const navMenu = document.getElementById('navMenu');
        
        menuToggle?.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu?.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle?.classList.remove('active');
                navMenu?.classList.remove('active');
            });
        });

        // Admin mode toggle
        const adminModeBtn = document.getElementById('adminModeBtn');
        adminModeBtn?.addEventListener('click', () => {
            this.toggleAdminMode();
        });

        // Add course button
        const addCourseBtn = document.getElementById('addCourseBtn');
        addCourseBtn?.addEventListener('click', () => {
            this.openCourseModal();
        });

        // Course form
        const courseForm = document.getElementById('courseForm') as HTMLFormElement;
        courseForm?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveCourse();
        });

        // Cancel course button
        const cancelBtn = document.getElementById('cancelBtn');
        cancelBtn?.addEventListener('click', () => {
            this.closeCourseModal();
        });

        // Gallery upload button
        const uploadGalleryBtn = document.getElementById('uploadGalleryBtn');
        uploadGalleryBtn?.addEventListener('click', () => {
            this.openGalleryModal();
        });

        // Gallery form
        const galleryForm = document.getElementById('galleryForm') as HTMLFormElement;
        galleryForm?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.uploadGalleryImage();
        });

        // Cancel gallery button
        const cancelGalleryBtn = document.getElementById('cancelGalleryBtn');
        cancelGalleryBtn?.addEventListener('click', () => {
            this.closeGalleryModal();
        });

        // Modal close buttons
        const closeButtons = document.querySelectorAll('.modal .close');
        closeButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const modal = (e.target as HTMLElement).closest('.modal');
                modal?.classList.remove('active');
            });
        });

        // Close modal when clicking outside
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('active');
                }
            });
        });

        // Editable content
        this.setupEditableContent();

        // Video upload buttons
        this.setupVideoUploads();
    }

    private toggleAdminMode(): void {
        this.isAdminMode = !this.isAdminMode;
        const body = document.body;
        const adminBtn = document.getElementById('adminModeBtn');

        if (this.isAdminMode) {
            body.classList.add('admin-mode');
            adminBtn?.classList.add('active');
            if (adminBtn) adminBtn.textContent = 'Thoát chế độ quản trị';
            this.enableEditing();
        } else {
            body.classList.remove('admin-mode');
            adminBtn?.classList.remove('active');
            if (adminBtn) adminBtn.textContent = 'Chế độ quản trị';
            this.disableEditing();
        }
    }

    private setupEditableContent(): void {
        const editableElements = document.querySelectorAll('.editable-content');
        editableElements.forEach(element => {
            const key = element.getAttribute('data-key');
            if (key && this.data.editableContent[key]) {
                element.innerHTML = this.data.editableContent[key];
            }

            element.addEventListener('blur', () => {
                if (this.isAdminMode && key) {
                    this.data.editableContent[key] = element.innerHTML;
                    DataStorageManager.saveData(this.data);
                }
            });
        });
    }

    private enableEditing(): void {
        const editableElements = document.querySelectorAll('.editable-content');
        editableElements.forEach(element => {
            element.setAttribute('contenteditable', 'true');
            element.classList.add('editing');
        });
    }

    private disableEditing(): void {
        const editableElements = document.querySelectorAll('.editable-content');
        editableElements.forEach(element => {
            element.setAttribute('contenteditable', 'false');
            element.classList.remove('editing');
        });
    }

    private loadEditableContent(): void {
        const editableElements = document.querySelectorAll('.editable-content');
        editableElements.forEach(element => {
            const key = element.getAttribute('data-key');
            if (key && this.data.editableContent[key]) {
                element.innerHTML = this.data.editableContent[key];
            }
        });
    }

    private setupVideoUploads(): void {
        const videoContainers = document.querySelectorAll('.video-container');
        videoContainers.forEach(container => {
            const key = container.getAttribute('data-key');
            if (!key) return;

            // Create upload button
            const uploadBtn = document.createElement('button');
            uploadBtn.className = 'video-upload-btn admin-only';
            uploadBtn.textContent = 'Tải lên video';
            uploadBtn.style.display = 'none';

            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = 'video/*';
            fileInput.style.display = 'none';

            uploadBtn.addEventListener('click', () => {
                fileInput.click();
            });

            fileInput.addEventListener('change', (e) => {
                const file = (e.target as HTMLInputElement).files?.[0];
                if (file) {
                    this.handleVideoUpload(file, key, container as HTMLElement);
                }
            });

            container.appendChild(fileInput);
            container.appendChild(uploadBtn);
        });
    }

    private async handleVideoUpload(file: File, key: string, container: HTMLElement): Promise<void> {
        try {
            // Show loading indicator
            this.showLoading(container, 'Đang tải video lên Cloudinary...');

            // Upload to Cloudinary
            const result = await CloudinaryService.uploadFile(file, 'video');

            // Save URL and public ID
            this.data.videos[key] = {
                url: result.secure_url,
                publicId: result.public_id
            };
            DataStorageManager.saveData(this.data);

            // Display video
            this.displayVideo(result.secure_url, container);
            this.hideLoading(container);
        } catch (error) {
            console.error('Video upload error:', error);
            alert('Lỗi khi tải video lên. Vui lòng thử lại.');
            this.hideLoading(container);
        }
    }

    private displayVideo(url: string, container: HTMLElement): void {
        // Remove existing video
        const existingVideo = container.querySelector('video');
        if (existingVideo) {
            existingVideo.remove();
        }

        const video = document.createElement('video');
        video.src = url;
        video.controls = true;
        container.insertBefore(video, container.firstChild);
    }

    private loadVideos(): void {
        const videoContainers = document.querySelectorAll('.video-container');
        videoContainers.forEach(container => {
            const key = container.getAttribute('data-key');
            if (key && this.data.videos[key]) {
                const videoData = this.data.videos[key];
                const url = typeof videoData === 'string' ? videoData : videoData.url;
                this.displayVideo(url, container as HTMLElement);
            }
        });
    }

    // Course Management
    private renderCourses(): void {
        const coursesGrid = document.getElementById('coursesGrid');
        if (!coursesGrid) return;

        coursesGrid.innerHTML = '';

        this.data.courses.forEach(course => {
            const courseCard = this.createCourseCard(course);
            coursesGrid.appendChild(courseCard);
        });
    }

    private createCourseCard(course: Course): HTMLElement {
        const card = document.createElement('div');
        card.className = 'course-card';

        let videoHtml = '';
        if (course.videoUrl) {
            videoHtml = `<video src="${course.videoUrl}" controls></video>`;
        }

        card.innerHTML = `
            ${videoHtml}
            <div class="course-card-content">
                <h3>${this.escapeHtml(course.title)}</h3>
                <p>${this.escapeHtml(course.description)}</p>
                <div class="course-actions admin-only" style="display: none;">
                    <button class="btn-edit" data-id="${course.id}">Chỉnh sửa</button>
                    <button class="btn-delete" data-id="${course.id}">Xóa</button>
                </div>
            </div>
        `;

        // Add event listeners
        const editBtn = card.querySelector('.btn-edit');
        const deleteBtn = card.querySelector('.btn-delete');

        editBtn?.addEventListener('click', () => {
            this.editCourse(course.id);
        });

        deleteBtn?.addEventListener('click', () => {
            this.deleteCourse(course.id);
        });

        return card;
    }

    private openCourseModal(course?: Course): void {
        const modal = document.getElementById('courseModal');
        const modalTitle = document.getElementById('modalTitle');
        const form = document.getElementById('courseForm') as HTMLFormElement;

        if (course) {
            this.currentEditingCourse = course.id;
            if (modalTitle) modalTitle.textContent = 'Chỉnh sửa khóa học';
            (document.getElementById('courseTitle') as HTMLInputElement).value = course.title;
            (document.getElementById('courseDescription') as HTMLTextAreaElement).value = course.description;

            if (course.videoUrl) {
                const preview = document.getElementById('courseVideoPreview');
                if (preview) {
                    preview.innerHTML = `<video src="${course.videoUrl}" controls style="width: 100%; margin-top: 10px;"></video>`;
                }
            }
        } else {
            this.currentEditingCourse = null;
            if (modalTitle) modalTitle.textContent = 'Thêm khóa học mới';
            form.reset();
            const preview = document.getElementById('courseVideoPreview');
            if (preview) preview.innerHTML = '';
        }

        modal?.classList.add('active');
    }

    private closeCourseModal(): void {
        const modal = document.getElementById('courseModal');
        modal?.classList.remove('active');
        this.currentEditingCourse = null;
        const form = document.getElementById('courseForm') as HTMLFormElement;
        form.reset();
        const preview = document.getElementById('courseVideoPreview');
        if (preview) preview.innerHTML = '';
    }

    private async saveCourse(): Promise<void> {
        const title = (document.getElementById('courseTitle') as HTMLInputElement).value;
        const description = (document.getElementById('courseDescription') as HTMLTextAreaElement).value;
        const videoInput = document.getElementById('courseVideo') as HTMLInputElement;
        const videoFile = videoInput.files?.[0];

        try {
            if (this.currentEditingCourse) {
                // Update existing course
                const course = this.data.courses.find(c => c.id === this.currentEditingCourse);
                if (course) {
                    course.title = title;
                    course.description = description;

                    if (videoFile) {
                        // Show loading
                        this.showModalLoading('Đang tải video lên Cloudinary...');

                        // Upload to Cloudinary
                        const result = await CloudinaryService.uploadFile(videoFile, 'video');
                        course.videoUrl = result.secure_url;
                        course.videoPublicId = result.public_id;

                        this.hideModalLoading();
                    }

                    DataStorageManager.saveData(this.data);
                    this.renderCourses();
                    this.closeCourseModal();
                }
            } else {
                // Create new course
                const newCourse: Course = {
                    id: this.generateId(),
                    title,
                    description
                };

                if (videoFile) {
                    // Show loading
                    this.showModalLoading('Đang tải video lên Cloudinary...');

                    // Upload to Cloudinary
                    const result = await CloudinaryService.uploadFile(videoFile, 'video');
                    newCourse.videoUrl = result.secure_url;
                    newCourse.videoPublicId = result.public_id;

                    this.hideModalLoading();
                }

                this.data.courses.push(newCourse);
                DataStorageManager.saveData(this.data);
                this.renderCourses();
                this.closeCourseModal();
            }
        } catch (error) {
            console.error('Save course error:', error);
            alert('Lỗi khi lưu khóa học. Vui lòng thử lại.');
            this.hideModalLoading();
        }
    }

    private editCourse(id: string): void {
        const course = this.data.courses.find(c => c.id === id);
        if (course) {
            this.openCourseModal(course);
        }
    }

    private deleteCourse(id: string): void {
        if (confirm('Bạn có chắc chắn muốn xóa khóa học này?')) {
            this.data.courses = this.data.courses.filter(c => c.id !== id);
            DataStorageManager.saveData(this.data);
            this.renderCourses();
        }
    }

    // Gallery Management
    private renderGallery(): void {
        const galleryGrid = document.getElementById('galleryGrid');
        if (!galleryGrid) return;

        galleryGrid.innerHTML = '';

        this.data.gallery.forEach(image => {
            const galleryItem = this.createGalleryItem(image);
            galleryGrid.appendChild(galleryItem);
        });

        // Add placeholder items if less than 4
        const placeholderCount = Math.max(0, 4 - this.data.gallery.length);
        for (let i = 0; i < placeholderCount; i++) {
            const placeholder = document.createElement('div');
            placeholder.className = 'gallery-item';
            placeholder.style.backgroundColor = '#e9ecef';
            placeholder.style.display = 'flex';
            placeholder.style.alignItems = 'center';
            placeholder.style.justifyContent = 'center';
            placeholder.innerHTML = '<span style="color: #6c757d;">Chưa có hình ảnh</span>';
            galleryGrid.appendChild(placeholder);
        }
    }

    private createGalleryItem(image: GalleryImage): HTMLElement {
        const item = document.createElement('div');
        item.className = 'gallery-item';

        // Use optimized image URL
        const optimizedUrl = CloudinaryService.getOptimizedImageUrl(image.url, 400, 85);

        item.innerHTML = `
            <img src="${optimizedUrl}" alt="Gallery Image" loading="lazy">
            <button class="gallery-item-delete admin-only" data-id="${image.id}">×</button>
        `;

        const deleteBtn = item.querySelector('.gallery-item-delete');
        deleteBtn?.addEventListener('click', () => {
            this.deleteGalleryImage(image.id);
        });

        return item;
    }

    private openGalleryModal(): void {
        const modal = document.getElementById('galleryModal');
        modal?.classList.add('active');
    }

    private closeGalleryModal(): void {
        const modal = document.getElementById('galleryModal');
        modal?.classList.remove('active');
        const form = document.getElementById('galleryForm') as HTMLFormElement;
        form.reset();
    }

    private async uploadGalleryImage(): Promise<void> {
        const fileInput = document.getElementById('galleryImage') as HTMLInputElement;
        const file = fileInput.files?.[0];

        if (file) {
            try {
                // Show loading
                this.showModalLoading('Đang tải hình ảnh lên Cloudinary...');

                // Upload to Cloudinary
                const result = await CloudinaryService.uploadFile(file, 'image');

                const newImage: GalleryImage = {
                    id: this.generateId(),
                    url: result.secure_url,
                    publicId: result.public_id
                };

                this.data.gallery.push(newImage);
                DataStorageManager.saveData(this.data);
                this.renderGallery();
                this.closeGalleryModal();
                this.hideModalLoading();
            } catch (error) {
                console.error('Gallery upload error:', error);
                alert('Lỗi khi tải hình ảnh lên. Vui lòng thử lại.');
                this.hideModalLoading();
            }
        }
    }

    private deleteGalleryImage(id: string): void {
        if (confirm('Bạn có chắc chắn muốn xóa hình ảnh này?')) {
            this.data.gallery = this.data.gallery.filter(img => img.id !== id);
            DataStorageManager.saveData(this.data);
            this.renderGallery();
        }
    }

    // Utility functions
    private generateId(): string {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    private escapeHtml(text: string): string {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Loading indicators
    private showLoading(container: HTMLElement, message: string): void {
        const loading = document.createElement('div');
        loading.className = 'loading-indicator';
        loading.innerHTML = `
            <div class="spinner"></div>
            <p>${message}</p>
        `;
        container.appendChild(loading);
    }

    private hideLoading(container: HTMLElement): void {
        const loading = container.querySelector('.loading-indicator');
        if (loading) {
            loading.remove();
        }
    }

    private showModalLoading(message: string): void {
        const modal = document.querySelector('.modal.active .modal-content');
        if (modal) {
            const loading = document.createElement('div');
            loading.className = 'modal-loading';
            loading.innerHTML = `
                <div class="spinner"></div>
                <p>${message}</p>
            `;
            modal.appendChild(loading);
        }
    }

    private hideModalLoading(): void {
        const loading = document.querySelector('.modal-loading');
        if (loading) {
            loading.remove();
        }
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new LearningWebsite();
});
