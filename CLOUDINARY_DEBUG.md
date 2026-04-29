# 🔍 Hướng dẫn Debug Cloudinary Upload

## Bước 1: Mở DevTools để xem lỗi chi tiết

### Cách 1: Xem Console
1. Mở website trên trình duyệt
2. Nhấn **F12** hoặc **Ctrl+Shift+I** (Windows) / **Cmd+Option+I** (Mac)
3. Chọn tab **Console**
4. Thử upload file
5. Xem các log màu đỏ (❌) để biết lỗi chính xác

### Cách 2: Xem Network
1. Mở DevTools (F12)
2. Chọn tab **Network**
3. Thử upload file
4. Tìm request đến `cloudinary.com`
5. Click vào request đó
6. Xem tab **Response** để thấy lỗi chi tiết từ Cloudinary

## Bước 2: Các lỗi thường gặp và cách khắc phục

### ❌ Lỗi: "Upload preset not found"
**Nguyên nhân:** Chưa tạo upload preset hoặc tên sai

**Giải pháp:**
1. Vào: https://console.cloudinary.com/settings/upload
2. Scroll xuống "Upload presets"
3. Click "Add upload preset"
4. Điền:
   - **Preset name**: `learning-website` (chính xác!)
   - **Signing Mode**: **Unsigned** ⚠️
   - **Folder**: `learning-website` (tùy chọn)
   - **Access Mode**: Public
5. Click **Save**

### ❌ Lỗi: "Invalid cloud name"
**Nguyên nhân:** Cloud name sai

**Giải pháp:**
- Kiểm tra file `src/config.ts`
- Cloud name phải là: `dvlfaq9ma`

### ❌ Lỗi: "Unsigned upload not allowed"
**Nguyên nhân:** Upload preset có Signing Mode = Signed

**Giải pháp:**
1. Vào preset settings
2. Đổi **Signing Mode** thành **Unsigned**
3. Save

### ❌ Lỗi CORS
**Nguyên nhân:** Hiếm gặp với unsigned uploads

**Giải pháp:**
- Đảm bảo preset là Unsigned
- Kiểm tra không có extension browser chặn request

### ❌ Lỗi: "File too large"
**Nguyên nhân:** File vượt quá giới hạn

**Giải pháp:**
- Free tier: Max 10MB/file
- Nén file trước khi upload
- Hoặc upgrade plan

## Bước 3: Kiểm tra cấu hình

### File: `src/config.ts`
```typescript
export const CLOUDINARY_CONFIG = {
    cloudName: 'dvlfaq9ma',           // ✓ Đúng
    uploadPreset: 'learning-website'   // ⚠️ Phải tạo preset này!
};
```

### Checklist:
- [ ] Cloud name đúng: `dvlfaq9ma`
- [ ] Đã tạo upload preset: `learning-website`
- [ ] Preset có mode: **Unsigned**
- [ ] Preset có access: **Public**

## Bước 4: Test upload

1. Mở website
2. Mở Console (F12)
3. Đăng nhập admin (admin/123456)
4. Thử upload hình ảnh
5. Xem log trong Console:
   - 🚀 Uploading to Cloudinary
   - 📡 Upload URL
   - 📥 Response status
   - ✅ Upload successful (nếu thành công)
   - ❌ Error (nếu thất bại)

## Bước 5: Xem file đã upload

Sau khi upload thành công:
1. Vào: https://console.cloudinary.com/console/media_library
2. Tìm folder `learning-website`
3. Xem các file đã upload

## Các log quan trọng

Khi upload, bạn sẽ thấy:
```
🚀 Uploading to Cloudinary: {
  cloudName: "dvlfaq9ma",
  uploadPreset: "learning-website",
  resourceType: "image",
  fileName: "photo.jpg",
  fileSize: 123456,
  fileType: "image/jpeg"
}

📡 Upload URL: https://api.cloudinary.com/v1_1/dvlfaq9ma/image/upload

📥 Response status: 200

✅ Upload successful: {
  secure_url: "https://res.cloudinary.com/...",
  public_id: "learning-website/abc123",
  ...
}
```

Nếu lỗi:
```
❌ Cloudinary error: {
  error: {
    message: "Upload preset not found"
  }
}
```

## Liên hệ hỗ trợ

Nếu vẫn lỗi, gửi cho tôi:
1. Screenshot Console (tab Console)
2. Screenshot Network (request cloudinary)
3. Thông tin preset đã tạo
