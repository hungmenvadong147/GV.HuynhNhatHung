# 📋 Hướng dẫn tạo Upload Preset trên Cloudinary

## ⚠️ QUAN TRỌNG: Phải làm bước này trước khi upload!

Upload Preset là cấu hình cho phép website upload file lên Cloudinary mà không cần API Secret.

## 🔧 Các bước tạo Upload Preset

### Bước 1: Đăng nhập Cloudinary
1. Truy cập: https://console.cloudinary.com
2. Đăng nhập với tài khoản của bạn

### Bước 2: Vào Settings
1. Click vào icon **⚙️ Settings** (góc dưới bên trái)
2. Hoặc truy cập trực tiếp: https://console.cloudinary.com/settings/upload

### Bước 3: Tìm Upload Presets
1. Trong trang Settings, chọn tab **Upload**
2. Scroll xuống phần **"Upload presets"**
3. Click nút **"Add upload preset"**

### Bước 4: Cấu hình Preset

#### Tab "Upload preset name"
```
Preset name: learning-website
```
⚠️ **Tên phải chính xác là `learning-website`** (không có khoảng trắng, không viết hoa)

#### Tab "Signing Mode" ⚠️ QUAN TRỌNG!
```
Signing Mode: Unsigned
```
✅ **BẮT BUỘC phải chọn "Unsigned"** để upload từ browser

#### Tab "Folder" (Tùy chọn nhưng nên có)
```
Folder: learning-website
```
Tất cả file upload sẽ được lưu vào folder này, dễ quản lý

#### Tab "Access Mode"
```
Access Mode: Public
```
Cho phép truy cập file công khai

#### Tab "Unique filename" (Khuyến nghị)
```
☑ Use filename or externally defined Public ID
```
Giữ tên file gốc hoặc tự động tạo ID unique

### Bước 5: Lưu Preset
1. Scroll xuống cuối trang
2. Click nút **"Save"**
3. Preset sẽ xuất hiện trong danh sách

## ✅ Kiểm tra Preset đã tạo đúng

Sau khi tạo, bạn sẽ thấy preset trong danh sách với:
- **Name**: learning-website
- **Signing Mode**: Unsigned
- **Status**: Active (màu xanh)

## 🎯 Cấu hình nâng cao (Tùy chọn)

### Giới hạn kích thước file
Trong preset settings, tab **"Upload manipulations"**:
```
Max file size: 10485760 (10MB cho ảnh)
Max file size: 104857600 (100MB cho video)
```

### Tự động tối ưu hóa
Tab **"Eager transformations"**:
```
Transformation: q_auto,f_auto
```
Tự động tối ưu chất lượng và format

### Allowed formats
Tab **"Upload control"**:
```
Allowed formats: jpg, png, gif, webp, mp4, mov, avi
```

## 🐛 Troubleshooting

### Lỗi: "Upload preset not found"
**Nguyên nhân:**
- Chưa tạo preset
- Tên preset sai (phải là `learning-website`)
- Preset chưa được save

**Giải pháp:**
1. Kiểm tra lại tên preset: `learning-website`
2. Đảm bảo đã click Save
3. Refresh trang Cloudinary và kiểm tra lại

### Lỗi: "Unsigned upload not allowed"
**Nguyên nhân:**
- Signing Mode không phải là "Unsigned"

**Giải pháp:**
1. Vào preset settings
2. Đổi Signing Mode thành **Unsigned**
3. Save lại

### Lỗi: "Invalid signature"
**Nguyên nhân:**
- Preset có Signing Mode = Signed

**Giải pháp:**
- Đổi thành Unsigned (xem trên)

## 📸 Screenshots mẫu

### Trang Upload Presets
```
┌─────────────────────────────────────────┐
│ Upload presets                          │
├─────────────────────────────────────────┤
│ [+ Add upload preset]                   │
│                                         │
│ learning-website                        │
│ Signing Mode: Unsigned                  │
│ Status: ● Active                        │
│ [Edit] [Delete]                         │
└─────────────────────────────────────────┘
```

### Form tạo preset
```
┌─────────────────────────────────────────┐
│ Upload preset name                      │
│ ┌─────────────────────────────────────┐ │
│ │ learning-website                    │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ Signing Mode                            │
│ ○ Signed                                │
│ ● Unsigned  ← Chọn cái này!            │
│                                         │
│ Folder (optional)                       │
│ ┌─────────────────────────────────────┐ │
│ │ learning-website                    │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ Access Mode                             │
│ ● Public                                │
│ ○ Authenticated                         │
│                                         │
│ [Save]                                  │
└─────────────────────────────────────────┘
```

## 🎓 Giải thích

### Tại sao cần Upload Preset?
- Cho phép upload từ browser (client-side)
- Không cần lộ API Secret
- Bảo mật hơn signed uploads
- Dễ cấu hình và quản lý

### Unsigned vs Signed
- **Unsigned**: Upload trực tiếp từ browser, không cần server
- **Signed**: Cần server tạo signature, phức tạp hơn

### Folder trong Cloudinary
- Giúp tổ chức file theo dự án
- Dễ tìm kiếm và quản lý
- Có thể set permissions riêng cho từng folder

## 📞 Cần hỗ trợ?

Nếu vẫn gặp vấn đề:
1. Chụp screenshot trang Upload Presets
2. Chụp screenshot Console (F12) khi upload
3. Gửi cho tôi để được hỗ trợ

## 🔗 Links hữu ích

- Upload Settings: https://console.cloudinary.com/settings/upload
- Media Library: https://console.cloudinary.com/console/media_library
- Documentation: https://cloudinary.com/documentation/upload_presets
