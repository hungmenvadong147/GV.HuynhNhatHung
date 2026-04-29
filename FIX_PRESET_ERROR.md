# 🔧 Fix Lỗi "Upload preset must be whitelisted for unsigned upload"

## 🐛 Nguyên nhân:

Lỗi này xảy ra khi:
1. **Upload Preset chưa được tạo** trong Cloudinary
2. **Upload Preset không phải Unsigned mode**
3. **Tên preset không khớp** giữa code và Cloudinary
4. **Code gửi sai tham số** (ví dụ: gửi `cloud_name` trong FormData)

---

## ✅ Đã sửa gì trong code:

### 1. Xóa `cloud_name` khỏi FormData

**Trước (Sai):**
```typescript
formData.append('file', file);
formData.append('upload_preset', CLOUDINARY_CONFIG.uploadPreset);
formData.append('cloud_name', CLOUDINARY_CONFIG.cloudName); // ❌ KHÔNG CẦN!
```

**Bây giờ (Đúng):**
```typescript
formData.append('file', file);
formData.append('upload_preset', CLOUDINARY_CONFIG.uploadPreset);
// ✅ Cloud name chỉ dùng trong URL, không gửi trong FormData
```

### 2. Thêm xử lý lỗi chi tiết

Bây giờ khi upload lỗi, bạn sẽ thấy thông báo rõ ràng:

```
❌ Lỗi Upload Preset!

Preset "learning-website" chưa được cấu hình đúng.

Hướng dẫn sửa:
1. Vào: https://console.cloudinary.com/settings/upload
2. Tìm preset tên: "learning-website"
3. Đảm bảo:
   - Signing Mode = "Unsigned"
   - Status = "Enabled"
4. Nếu chưa có preset, tạo mới với tên chính xác: "learning-website"
5. Lưu lại và thử upload lại
```

### 3. Thêm logs chi tiết hơn

Console sẽ hiển thị:
- File size (MB)
- Upload URL
- Response status
- Error details (nếu có)

---

## 🛠️ Cách fix trên Cloudinary:

### Bước 1: Đăng nhập Cloudinary
Vào: https://console.cloudinary.com/

### Bước 2: Vào Settings → Upload
URL: https://console.cloudinary.com/settings/upload

### Bước 3: Kiểm tra Upload Presets

Tìm preset tên: **`learning-website`**

#### Nếu ĐÃ CÓ preset:
1. Click vào preset để edit
2. Kiểm tra:
   - **Upload preset name:** `learning-website` (phải khớp chính xác!)
   - **Signing Mode:** `Unsigned` ✅
   - **Status:** `Enabled` ✅
3. Click **Save**

#### Nếu CHƯA CÓ preset:
1. Click **Add upload preset**
2. Điền thông tin:
   - **Upload preset name:** `learning-website` (chính xác!)
   - **Signing Mode:** Chọn `Unsigned`
   - **Folder:** (để trống hoặc đặt tên folder bạn muốn)
3. Click **Save**

### Bước 4: Kiểm tra Cloud Name

1. Xem Cloud Name ở góc trên bên trái Dashboard
2. Mở file `src/config.ts`
3. Đảm bảo `cloudName` khớp chính xác:

```typescript
export const CLOUDINARY_CONFIG = {
    cloudName: 'dvlfaq9ma', // ✅ Phải khớp với Cloud Name trên Dashboard
    uploadPreset: 'learning-website'
};
```

---

## 🧪 Cách test:

### Test 1: Kiểm tra preset trên Cloudinary
```
1. Vào: https://console.cloudinary.com/settings/upload
2. Tìm preset: learning-website
3. Xem Signing Mode = Unsigned
4. Xem Status = Enabled
```

### Test 2: Upload ảnh
```
1. Xóa cache trình duyệt (Ctrl + Shift + Delete)
2. Reload trang (F5)
3. Bật chế độ quản trị
4. Upload 1 ảnh
5. Xem Console (F12)
```

### Test 3: Xem logs trong Console

**Nếu thành công:**
```
🚀 Uploading to Cloudinary: { cloudName: "...", uploadPreset: "learning-website", ... }
📡 Upload URL: https://api.cloudinary.com/v1_1/dvlfaq9ma/image/upload
📥 Response status: 200
✅ Upload successful: { url: "...", publicId: "...", ... }
```

**Nếu vẫn lỗi preset:**
```
🚀 Uploading to Cloudinary: ...
📡 Upload URL: ...
📥 Response status: 400
❌ Cloudinary error response: { error: { message: "Upload preset must be whitelisted..." } }
```

→ Nếu vẫn lỗi, kiểm tra lại tên preset có khớp không (chữ hoa/thường, dấu gạch ngang)

---

## 🔍 Checklist debug:

- [ ] Cloud Name trong `src/config.ts` khớp với Cloudinary Dashboard
- [ ] Upload Preset tên `learning-website` đã được tạo
- [ ] Signing Mode = `Unsigned`
- [ ] Status = `Enabled`
- [ ] Đã xóa cache trình duyệt
- [ ] Đã reload trang
- [ ] Đã build lại code (`npm run build`)

---

## 📸 Screenshot hướng dẫn:

### 1. Vị trí Cloud Name
```
Cloudinary Dashboard → Góc trên bên trái
Ví dụ: dvlfaq9ma
```

### 2. Upload Presets Settings
```
Settings → Upload → Upload presets
Tìm: learning-website
```

### 3. Preset Configuration
```
Upload preset name: learning-website
Signing Mode: Unsigned ✅
Status: Enabled ✅
```

---

## ❓ Các lỗi khác có thể gặp:

### Lỗi: "Invalid cloud_name"
```
✅ Giải pháp:
- Kiểm tra Cloud Name trong src/config.ts
- So sánh với Cloud Name trên Dashboard
- Đảm bảo không có khoảng trắng thừa
```

### Lỗi: "File size too large"
```
✅ Giải pháp:
- Cloudinary free tier giới hạn 10MB/ảnh
- Nén ảnh trước khi upload
- Hoặc nâng cấp plan
```

### Lỗi: "Network error"
```
✅ Giải pháp:
- Kiểm tra kết nối internet
- Kiểm tra firewall/antivirus
- Thử trình duyệt khác
```

---

## 📞 Vẫn không được?

Nếu đã làm hết các bước trên mà vẫn lỗi, hãy gửi cho tôi:

1. ✅ Screenshot của Upload Presets page trong Cloudinary
2. ✅ Nội dung file `src/config.ts`
3. ✅ Toàn bộ Console logs sau khi upload
4. ✅ Screenshot thông báo lỗi

Tôi sẽ giúp bạn fix ngay! 🎯
