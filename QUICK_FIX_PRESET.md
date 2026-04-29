# ⚡ Quick Fix - Lỗi Upload Preset

## 🎯 Đã sửa trong code:

### ✅ Xóa `cloud_name` khỏi FormData
```typescript
// ❌ Trước: Gửi cloud_name (SAI!)
formData.append('cloud_name', CLOUDINARY_CONFIG.cloudName);

// ✅ Bây giờ: Không gửi cloud_name
// Cloud name chỉ dùng trong URL
```

### ✅ Thêm thông báo lỗi chi tiết
Bây giờ khi upload lỗi, bạn sẽ thấy hướng dẫn fix cụ thể!

---

## 🛠️ Bạn cần làm trên Cloudinary:

### Bước 1: Vào Upload Settings
https://console.cloudinary.com/settings/upload

### Bước 2: Tạo/Sửa Upload Preset

**Tên preset:** `learning-website` (chính xác!)

**Cấu hình:**
- ✅ Signing Mode: **Unsigned**
- ✅ Status: **Enabled**

### Bước 3: Save và thử lại

---

## 🧪 Test ngay:

1. Xóa cache (Ctrl + Shift + Delete)
2. Reload trang (F5)
3. Upload ảnh
4. Xem Console (F12)

**Nếu thành công:**
```
✅ Upload successful: { url: "...", ... }
✅ Image loaded successfully
```

**Nếu vẫn lỗi:**
- Kiểm tra tên preset có đúng `learning-website` không
- Kiểm tra Signing Mode = Unsigned
- Gửi screenshot Console logs cho tôi

---

## 📋 Checklist:

- [ ] Preset tên: `learning-website` ✅
- [ ] Signing Mode: `Unsigned` ✅
- [ ] Status: `Enabled` ✅
- [ ] Đã Save preset ✅
- [ ] Đã xóa cache ✅
- [ ] Đã reload trang ✅

Xong! Thử upload ảnh ngay! 🚀
