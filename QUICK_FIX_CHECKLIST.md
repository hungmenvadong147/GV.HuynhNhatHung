# ✅ Checklist Kiểm tra Nhanh - Ảnh không hiển thị

## 🎯 Mục tiêu
Sau khi upload ảnh lên Cloudinary thành công, ảnh phải hiển thị ngay trong mục "Hình ảnh học trò"

---

## 📋 Checklist theo thứ tự

### ☑️ 1. Kiểm tra Cloudinary đã nhận ảnh chưa
- [ ] Đăng nhập vào: https://console.cloudinary.com/
- [ ] Vào **Media Library**
- [ ] Tìm ảnh vừa upload (tên file hoặc thời gian upload)
- [ ] **Nếu KHÔNG thấy ảnh** → Vấn đề ở phần upload (xem mục 2)
- [ ] **Nếu THẤY ảnh** → Vấn đề ở phần hiển thị (xem mục 3)

---

### ☑️ 2. Nếu ảnh KHÔNG lên Cloudinary

#### A. Kiểm tra Upload Preset
```
1. Vào: https://console.cloudinary.com/settings/upload
2. Tìm preset tên: learning-website
3. Kiểm tra:
   ✅ Signing Mode = Unsigned
   ✅ Status = Enabled
```

#### B. Kiểm tra Cloud Name
```
1. Mở file: src/config.ts
2. Kiểm tra CLOUDINARY_CONFIG.cloudName
3. So sánh với Cloud Name trong Cloudinary Dashboard
   (góc trên bên trái màn hình)
```

#### C. Xem Console logs
```
1. Nhấn F12 → Tab Console
2. Upload ảnh
3. Tìm log màu đỏ (lỗi)
4. Copy toàn bộ log gửi cho tôi
```

---

### ☑️ 3. Nếu ảnh ĐÃ lên Cloudinary nhưng không hiển thị

#### A. Kiểm tra Console logs
```
Nhấn F12 → Tab Console
Tìm các log sau khi upload:

✅ CẦN THẤY:
   📤 Starting image upload
   ✅ Image uploaded successfully
   🔗 Image URL: https://res.cloudinary.com/...
   💾 Saving new image to gallery
   📊 Current gallery data: [...]
   🔄 Rendering gallery...
   🎨 Rendering gallery with X images
   🖼️ Creating gallery item

❌ KHÔNG THẤY log nào ở trên?
   → Gửi toàn bộ Console logs cho tôi
```

#### B. Kiểm tra localStorage
```
1. Mở Console (F12)
2. Chạy lệnh:
   JSON.parse(localStorage.getItem('learning-website-data'))
3. Xem phần "gallery":

✅ ĐÚNG:
{
  "gallery": [
    {
      "id": "abc123",
      "url": "https://res.cloudinary.com/...",
      "publicId": "..."
    }
  ]
}

❌ SAI:
{
  "gallery": []  // Rỗng
}
hoặc
{
  "gallery": [
    {
      "id": "abc123",
      "url": "",  // Không có URL
      "publicId": ""
    }
  ]
}
```

#### C. Kiểm tra HTML
```
1. Nhấn chuột phải vào khung ảnh trắng
2. Chọn "Inspect" (Kiểm tra phần tử)
3. Tìm thẻ <img>

✅ ĐÚNG:
<img src="https://res.cloudinary.com/..." alt="Gallery Image">

❌ SAI:
<img src="" alt="Gallery Image">
<img src="undefined" alt="Gallery Image">
```

#### D. Kiểm tra URL ảnh có mở được không
```
1. Copy URL từ Console log (🔗 Image URL: ...)
2. Mở URL đó trong tab mới của trình duyệt
3. Nếu KHÔNG mở được:
   - Kiểm tra Cloudinary Security Settings
   - Đảm bảo không bật "Restrict media access"
```

---

## 🚨 Các lỗi thường gặp

### Lỗi 1: "Upload preset not found"
```
✅ Giải pháp:
1. Vào Cloudinary Settings → Upload
2. Tạo preset mới tên: learning-website
3. Chọn Signing Mode: Unsigned
4. Save
```

### Lỗi 2: Ảnh hiển thị lúc đầu, reload lại mất
```
✅ Giải pháp:
- Vấn đề ở localStorage
- Chạy lệnh kiểm tra localStorage (mục 3B)
- Nếu gallery rỗng → Code không lưu được data
```

### Lỗi 3: Thấy khung trắng, không có ảnh
```
✅ Giải pháp:
- Kiểm tra CSS của .gallery-item img
- Kiểm tra src của thẻ <img> (mục 3C)
- Kiểm tra Console có lỗi CORS không
```

### Lỗi 4: "Failed to load image"
```
✅ Giải pháp:
1. Mở URL ảnh trực tiếp trong trình duyệt
2. Nếu không mở được:
   - Vào Cloudinary Settings → Security
   - Tắt "Restrict media access"
   - Hoặc thêm domain của bạn vào whitelist
```

---

## 📸 Cách test nhanh

### Test 1: Upload và kiểm tra ngay
```
1. Bật chế độ quản trị
2. Upload 1 ảnh
3. Đợi thông báo "Tải hình ảnh lên thành công!"
4. Xem ảnh có hiển thị không
5. Nếu KHÔNG → Mở Console (F12) xem logs
```

### Test 2: Reload trang
```
1. Sau khi upload thành công
2. Nhấn F5 (reload trang)
3. Ảnh vẫn phải hiển thị
4. Nếu KHÔNG → Vấn đề ở localStorage
```

### Test 3: Xóa cache và thử lại
```
1. Nhấn Ctrl + Shift + Delete
2. Xóa cache và cookies
3. Reload trang
4. Upload ảnh mới
5. Kiểm tra lại
```

---

## 📞 Cần trợ giúp?

Nếu đã làm hết các bước trên mà vẫn không được, hãy gửi cho tôi:

1. ✅ Screenshot của Cloudinary Media Library (có ảnh không?)
2. ✅ Toàn bộ Console logs sau khi upload
3. ✅ Kết quả của lệnh localStorage
4. ✅ Screenshot của phần Inspect (thẻ `<img>`)
5. ✅ Screenshot của website (khung trắng)

Tôi sẽ giúp bạn fix ngay! 🎯
