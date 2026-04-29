# Hướng dẫn cấu hình Cloudinary

## Bước 1: Tạo Upload Preset (Quan trọng!)

1. Đăng nhập vào Cloudinary: https://console.cloudinary.com
2. Vào **Settings** → **Upload**
3. Scroll xuống phần **Upload presets**
4. Click **Add upload preset**
5. Cấu hình:
   - **Preset name**: `learning-website`
   - **Signing Mode**: **Unsigned** (quan trọng!)
   - **Folder**: `learning-website` (tùy chọn)
   - **Access Mode**: **Public**
6. Click **Save**

## Bước 2: Kiểm tra cấu hình

Mở file `src/config.ts` và đảm bảo có đúng thông tin:

```typescript
export const CLOUDINARY_CONFIG = {
    cloudName: 'dvlfaq9ma',
    uploadPreset: 'learning-website' // Tên preset vừa tạo ở bước 1
};
```

**Lưu ý**: Không cần API Key hay API Secret cho unsigned uploads!

## Bước 3: Build và chạy

```bash
npm run build
```

Sau đó mở `index.html` trong trình duyệt.

## Lưu ý quan trọng

- ✅ **Unsigned uploads** không cần API Key hay API Secret
- ✅ Chỉ cần `cloudName` và `uploadPreset`
- ✅ Upload trực tiếp từ browser, an toàn và đơn giản
- ⚠️ Đảm bảo preset có **Signing Mode = Unsigned**

## Kiểm tra

1. Bật chế độ quản trị
2. Thử upload một hình ảnh vào Gallery
3. Kiểm tra trong Cloudinary Dashboard → Media Library
4. Bạn sẽ thấy file được upload vào folder `learning-website`

## Troubleshooting

### Lỗi: "Upload preset not found"
- Đảm bảo bạn đã tạo upload preset với tên chính xác
- Kiểm tra preset có mode là **Unsigned**

### Lỗi: "Invalid cloud name"
- Kiểm tra lại cloud name trong config.ts
- Cloud name của bạn là: `dvlfaq9ma`

### Lỗi CORS
- Unsigned presets không gặp vấn đề CORS
- Nếu vẫn lỗi, kiểm tra lại Signing Mode phải là Unsigned
