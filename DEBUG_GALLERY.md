# 🔍 Hướng dẫn Debug Gallery (Hiển thị ảnh)

## ✅ Đã sửa gì?

Tôi đã thêm **console.log chi tiết** vào các bước quan trọng để bạn có thể theo dõi:

### 1. **Khi upload ảnh** (`uploadGalleryImage`)
- ✅ Log khi bắt đầu upload
- ✅ Log kết quả từ Cloudinary (bao gồm `secure_url`)
- ✅ Log object `newImage` trước khi lưu
- ✅ Log toàn bộ `gallery` array sau khi thêm ảnh mới
- ✅ Log khi render gallery

### 2. **Khi render gallery** (`renderGallery`)
- ✅ Log số lượng ảnh trong gallery
- ✅ Log toàn bộ data gallery

### 3. **Khi tạo gallery item** (`createGalleryItem`)
- ✅ Log URL gốc và URL đã optimize
- ✅ Thêm `onerror` handler vào thẻ `<img>` để bắt lỗi load ảnh

---

## 🧪 Cách kiểm tra

### Bước 1: Mở Console
1. Mở website của bạn
2. Nhấn **F12** để mở DevTools
3. Chọn tab **Console**

### Bước 2: Upload ảnh
1. Bật chế độ quản trị
2. Click "Tải lên hình ảnh"
3. Chọn một ảnh và upload

### Bước 3: Xem Console logs

Bạn sẽ thấy các log theo thứ tự này:

```
📤 Starting image upload: ten-anh.jpg
🚀 Uploading to Cloudinary: { cloudName: "...", uploadPreset: "...", ... }
📡 Upload URL: https://api.cloudinary.com/v1_1/.../image/upload
📥 Response status: 200
✅ Upload successful: { secure_url: "https://...", public_id: "...", ... }
✅ Image uploaded successfully: { secure_url: "...", ... }
🔗 Image URL: https://res.cloudinary.com/...
💾 Saving new image to gallery: { id: "...", url: "...", publicId: "..." }
📊 Current gallery data: [{ id: "...", url: "...", ... }]
🔄 Rendering gallery...
🎨 Rendering gallery with 1 images
📸 Gallery data: [{ id: "...", url: "...", ... }]
🖼️ Creating gallery item: { originalUrl: "...", optimizedUrl: "...", imageId: "..." }
```

---

## 🐛 Các trường hợp lỗi có thể xảy ra

### ❌ Trường hợp 1: Không thấy log "✅ Image uploaded successfully"
**Nguyên nhân:** Upload thất bại  
**Giải pháp:** Kiểm tra:
- Upload Preset có đúng tên `learning-website` không?
- Upload Preset có bật **Unsigned** không?
- Cloud Name trong `src/config.ts` có đúng không?

### ❌ Trường hợp 2: Thấy log "✅ Image uploaded" nhưng không thấy "💾 Saving new image"
**Nguyên nhân:** Code bị lỗi giữa chừng  
**Giải pháp:** Xem log lỗi màu đỏ trong Console

### ❌ Trường hợp 3: Thấy "💾 Saving" nhưng không thấy "🎨 Rendering gallery"
**Nguyên nhân:** Hàm `renderGallery()` không được gọi  
**Giải pháp:** Kiểm tra có lỗi JavaScript nào không

### ❌ Trường hợp 4: Thấy "🖼️ Creating gallery item" nhưng ảnh không hiển thị
**Nguyên nhân:** URL ảnh bị sai hoặc Cloudinary chặn  
**Giải pháp:** 
1. Copy URL từ log `originalUrl`
2. Mở URL đó trong tab mới
3. Nếu không mở được → Kiểm tra Cloudinary settings
4. Nếu mở được → Kiểm tra CSS của `.gallery-item img`

### ❌ Trường hợp 5: Thấy log "❌ Failed to load image"
**Nguyên nhân:** Trình duyệt không load được ảnh từ URL  
**Giải pháp:**
1. Kiểm tra URL có đúng format không
2. Kiểm tra CORS settings trong Cloudinary
3. Thử mở URL trực tiếp trong trình duyệt

---

## 🔧 Kiểm tra thêm

### Kiểm tra localStorage
Mở Console và chạy:
```javascript
JSON.parse(localStorage.getItem('learning-website-data'))
```

Bạn sẽ thấy:
```json
{
  "courses": [...],
  "gallery": [
    {
      "id": "...",
      "url": "https://res.cloudinary.com/...",
      "publicId": "..."
    }
  ],
  "editableContent": {...},
  "videos": {...}
}
```

Nếu `gallery` array **rỗng** hoặc **không có URL** → Vấn đề ở việc lưu data

### Kiểm tra HTML
1. Nhấn chuột phải vào khung ảnh trắng
2. Chọn **Inspect** (Kiểm tra phần tử)
3. Xem thẻ `<img>`:

**✅ Đúng:**
```html
<img src="https://res.cloudinary.com/..." alt="Gallery Image" loading="lazy">
```

**❌ Sai:**
```html
<img src="" alt="Gallery Image">
<img src="undefined" alt="Gallery Image">
```

---

## 📞 Nếu vẫn không hiển thị

Sau khi upload ảnh, hãy gửi cho tôi:

1. **Toàn bộ Console logs** (copy từ đầu đến cuối)
2. **Screenshot của phần Inspect** (thẻ `<img>`)
3. **Kết quả của lệnh localStorage** ở trên

Tôi sẽ giúp bạn tìm ra vấn đề chính xác! 🎯
