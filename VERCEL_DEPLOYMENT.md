# Hướng dẫn Deploy lên Vercel

## ⚠️ Quan trọng: Không cần Environment Variables!

Website này sử dụng **Unsigned Upload Preset** của Cloudinary, nên:
- ✅ Không cần API Key
- ✅ Không cần API Secret
- ✅ Chỉ cần `cloudName` và `uploadPreset` (public)
- ✅ An toàn để commit vào Git

## 🔧 Bước 1: Tạo Upload Preset (BẮT BUỘC!)

Trước khi deploy, đảm bảo đã tạo upload preset trong Cloudinary:

1. Vào: https://console.cloudinary.com/settings/upload
2. Tạo preset:
   - **Name**: `learning-website`
   - **Signing Mode**: **Unsigned** ⚠️ (quan trọng!)
   - **Access Mode**: Public
   - **Folder**: `learning-website` (tùy chọn)
3. Click **Save**

## 📦 Bước 2: Deploy lên Vercel

### Cách 1: Tự động (Recommended)
1. Push code lên GitHub
2. Vercel sẽ tự động build và deploy
3. Không cần cấu hình gì thêm!

### Cách 2: Thủ công
```bash
vercel --prod
```

## ✅ Kiểm tra

Sau khi deploy thành công:
1. Mở website trên domain Vercel (ví dụ: `your-site.vercel.app`)
2. Click nút "Chế độ quản trị"
3. Thử upload hình ảnh vào Gallery
4. Kiểm tra trong Cloudinary Dashboard → Media Library

## 🐛 Troubleshooting

### Lỗi: "Could not resolve ./config"
✅ **Đã sửa!** File `src/config.ts` giờ được commit vào Git

### Lỗi: "Upload preset not found"
- Kiểm tra đã tạo preset `learning-website` trong Cloudinary
- Đảm bảo preset có mode **Unsigned**
- Đảm bảo preset name chính xác (không có khoảng trắng)

### Lỗi CORS
- Unsigned presets không gặp vấn đề CORS
- Nếu vẫn lỗi, kiểm tra lại Signing Mode phải là **Unsigned**

### Build thành công nhưng upload không hoạt động
- Kiểm tra đã tạo upload preset chưa
- Mở Console trong browser (F12) để xem lỗi chi tiết
- Kiểm tra cloud name đúng: `dvlfaq9ma`

## 📝 Lưu ý

- ✅ File `src/config.ts` an toàn để commit (không chứa secret)
- ✅ Unsigned uploads hoạt động trực tiếp từ browser
- ✅ Không cần backend hay serverless functions
- ✅ Hoàn toàn miễn phí trên Vercel Free tier

## 🎯 Cấu trúc deploy

```
Vercel (Static Hosting)
    ↓
index.html + dist/app.js
    ↓
Upload trực tiếp lên Cloudinary
    ↓
Cloudinary CDN
```

Đơn giản và hiệu quả! 🚀
