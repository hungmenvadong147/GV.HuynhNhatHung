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

## Bước 2: Cấu hình API Keys

1. Copy file `src/config.example.ts` thành `src/config.ts`:
   ```bash
   cp src/config.example.ts src/config.ts
   ```

2. Mở file `src/config.ts` và điền thông tin:
   ```typescript
   export const CLOUDINARY_CONFIG = {
       cloudName: 'dvlfaq9ma',
       apiKey: '688857149531381', // Hoặc key khác từ dashboard
       uploadPreset: 'learning-website' // Tên preset vừa tạo
   };
   ```

## Bước 3: Build và chạy

```bash
npm run build
```

Sau đó mở `index.html` trong trình duyệt.

## Lưu ý bảo mật

- **KHÔNG** commit file `src/config.ts` lên Git
- File này đã được thêm vào `.gitignore`
- Chỉ sử dụng **Unsigned Upload Preset** cho client-side upload
- API Secret không cần thiết cho unsigned uploads

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
