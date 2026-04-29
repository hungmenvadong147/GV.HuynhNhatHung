# Website Học Tập với Cloudinary

Website học tập hiện đại được xây dựng bằng TypeScript với tích hợp Cloudinary để lưu trữ hình ảnh và video.

## 🚀 Tính năng

### 1. Giao diện tổng thể
- Thiết kế đơn giản, hiện đại
- Nền màu trắng, font chữ rõ ràng
- Responsive - hiển thị tốt trên mọi thiết bị
- Hiệu ứng hover và animation mượt mà

### 2. Header
- Hiển thị thông tin liên hệ:
  - Số điện thoại: 0786985687
  - Email: huynhnhathunghhcl@gmail.com
- Menu hamburger ở góc phải

### 3. Menu điều hướng
- Menu xổ xuống với các mục:
  - Giới thiệu giáo viên
  - Nội dung khóa học
  - Nhận xét
  - Liên hệ
- Có thể chỉnh sửa nội dung văn bản
- Có thể tải lên video

### 4. Quản lý khóa học
- Hiển thị danh sách khóa học dạng grid
- Mỗi khóa học có:
  - Tiêu đề
  - Mô tả
  - Video (tùy chọn)
- Chức năng:
  - Thêm khóa học mới
  - Chỉnh sửa khóa học
  - Xóa khóa học

### 5. Gallery hình ảnh
- Hiển thị 4 hình ảnh học trò
- Dạng lưới responsive
- Có thể thêm/xóa hình ảnh
- Tự động tối ưu hóa với Cloudinary

### 6. Chế độ quản trị
- Nút "Chế độ quản trị" để bật/tắt
- Khi bật:
  - Có thể chỉnh sửa văn bản trực tiếp
  - Hiển thị nút thêm/sửa/xóa
  - Có thể tải lên video và hình ảnh
- Dữ liệu lưu trong Local Storage

### 7. Tích hợp Cloudinary ☁️
- Upload hình ảnh/video lên cloud
- Tự động tối ưu hóa chất lượng
- CDN nhanh, không giới hạn dung lượng
- Không lo mất dữ liệu

## 📦 Cài đặt

### Bước 1: Cài đặt dependencies
```bash
npm install
```

### Bước 2: Cấu hình Cloudinary (QUAN TRỌNG!)

#### 2.1. Tạo Upload Preset
1. Đăng nhập vào Cloudinary: https://console.cloudinary.com
2. Vào **Settings** → **Upload**
3. Scroll xuống phần **Upload presets**
4. Click **Add upload preset**
5. Cấu hình:
   - **Preset name**: `learning-website`
   - **Signing Mode**: **Unsigned** ⚠️ (quan trọng!)
   - **Folder**: `learning-website` (tùy chọn)
   - **Access Mode**: **Public**
6. Click **Save**

#### 2.2. Cấu hình API Keys
Mở file `src/config.ts` và điền thông tin:

```typescript
export const CLOUDINARY_CONFIG = {
    cloudName: 'dvlfaq9ma',
    apiKey: '688857149531381', // Chọn một trong các key từ dashboard
    uploadPreset: 'learning-website' // Tên preset vừa tạo
};
```

### Bước 3: Build project
```bash
npm run build
```

### Bước 4: Mở website
Mở file `index.html` trong trình duyệt

## 🎯 Sử dụng

1. **Mở website**: Mở file `index.html` trong trình duyệt

2. **Vào chế độ quản trị**: Click nút "Chế độ quản trị" (nút sẽ chuyển màu xanh)

3. **Chỉnh sửa nội dung**:
   - Click vào văn bản để sửa trực tiếp
   - Click "Tải lên video" để thêm video (upload lên Cloudinary)
   - Click "+ Thêm khóa học" để tạo khóa học mới
   - Click "Tải lên hình ảnh" để thêm ảnh gallery (upload lên Cloudinary)

4. **Tất cả tự động lưu**:
   - Văn bản lưu trong Local Storage
   - Media (ảnh/video) lưu trên Cloudinary
   - Chỉ lưu URL trong Local Storage (rất nhẹ)

## 📁 Cấu trúc thư mục

```
.
├── index.html              # File HTML chính
├── styles.css              # File CSS với tất cả styles
├── src/
│   ├── app.ts             # File TypeScript chính
│   ├── cloudinary.ts      # Service xử lý Cloudinary
│   ├── config.ts          # Cấu hình API keys
│   └── config.example.ts  # Template cấu hình
├── dist/
│   └── app.js             # File JavaScript đã bundle
├── package.json           # Dependencies và scripts
├── tsconfig.json          # Cấu hình TypeScript
├── CLOUDINARY_SETUP.md    # Hướng dẫn chi tiết Cloudinary
└── README.md              # File này
```

## 🛠 Công nghệ sử dụng

- **TypeScript**: Ngôn ngữ lập trình chính
- **HTML5**: Cấu trúc trang web
- **CSS3**: Styling với animations và transitions
- **Local Storage**: Lưu trữ dữ liệu văn bản
- **Cloudinary**: Lưu trữ và tối ưu hóa media
- **esbuild**: Bundler nhanh cho TypeScript

## ✨ Tính năng nổi bật

- ✅ Responsive design
- ✅ Giao diện quản trị đầy đủ
- ✅ Upload video và hình ảnh lên cloud
- ✅ Tự động tối ưu hóa media
- ✅ Chỉnh sửa nội dung trực tiếp
- ✅ Lưu dữ liệu tự động
- ✅ Hiệu ứng animation mượt mà
- ✅ Code TypeScript type-safe
- ✅ Dễ dàng mở rộng
- ✅ CDN nhanh từ Cloudinary

## 🔧 Scripts

```bash
# Build một lần
npm run build

# Build và watch (tự động build khi có thay đổi)
npm run watch

# Hoặc
npm run dev
```

## ⚠️ Lưu ý

### Bảo mật
- File `src/config.ts` chứa API keys, đã được thêm vào `.gitignore`
- **KHÔNG** commit file này lên Git
- Sử dụng **Unsigned Upload Preset** cho client-side upload
- API Secret không cần thiết cho unsigned uploads

### Dữ liệu
- Văn bản lưu trong Local Storage của trình duyệt
- Media (ảnh/video) lưu trên Cloudinary
- Xóa cache trình duyệt chỉ xóa văn bản, không ảnh hưởng media
- Media có thể quản lý từ Cloudinary Dashboard

### Giới hạn
- Cloudinary Free tier: 25 GB storage, 25 GB bandwidth/tháng
- Đủ cho hầu hết website học tập nhỏ và vừa

## 🐛 Troubleshooting

### Lỗi: "Upload preset not found"
- Đảm bảo bạn đã tạo upload preset với tên chính xác: `learning-website`
- Kiểm tra preset có mode là **Unsigned**

### Lỗi: "Invalid cloud name"
- Kiểm tra lại cloud name trong `src/config.ts`
- Cloud name của bạn là: `dvlfaq9ma`

### Lỗi CORS
- Unsigned presets không gặp vấn đề CORS
- Nếu vẫn lỗi, kiểm tra lại Signing Mode phải là **Unsigned**

### Video không load
- Kiểm tra kết nối internet
- Kiểm tra video đã upload thành công trong Cloudinary Dashboard
- Thử refresh trang

## 📞 Hỗ trợ

Nếu có vấn đề hoặc câu hỏi, vui lòng liên hệ:
- Email: huynhnhathunghhcl@gmail.com
- Điện thoại: 0786985687

## 📄 License

MIT License - Tự do sử dụng và chỉnh sửa
