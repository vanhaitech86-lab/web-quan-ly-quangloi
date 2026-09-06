# QUANGLOI - Hệ thống Quản lý Doanh nghiệp

## Giới thiệu

Hệ thống quản lý doanh nghiệp chuyên nghiệp, thiết kế tham khảo từ CloudPro CRM (vps.cloudpro.vn).

## Cài đặt & Chạy

### Cách 1: Mở trực tiếp
1. Mở file `login.html` bằng trình duyệt
2. Nhập bất kỳ username/password để đăng nhập (chế độ demo)
3. Hệ thống sẽ chuyển đến trang Dashboard

### Cách 2: Sử dụng Live Server
1. Cài đặt extension **Live Server** trên VS Code
2. Click chuột phải vào `login.html` → "Open with Live Server"
3. Trình duyệt sẽ tự động mở

### Cách 3: Sử dụng Python HTTP Server
```bash
cd "e:\WEB QUẢN LY QUANGLOI"
python -m http.server 8000
```
Mở trình duyệt: `http://localhost:8000/login.html`

## Tính năng Demo

- **Thông báo âm thanh**: Sau 10 giây sẽ tự động phát thông báo đơn hàng mới (demo)
- **Phím tắt**: `Ctrl+K` tìm kiếm, `Ctrl+N` tạo đơn hàng mới
- **Sidebar**: Click vào menu để mở/đóng, nút ☰ để thu gọn sidebar

## Công nghệ sử dụng

- HTML5, CSS3, JavaScript (ES6+)
- Bootstrap 5.3.3
- Bootstrap Icons 1.11.3
- Chart.js 4.4.7
- Google Fonts (Inter)
- Web Audio API (notification sounds)

## Cấu trúc thư mục

```
├── index.html          # Trang chính
├── login.html          # Trang đăng nhập
├── TAI-LIEU-DU-AN.md   # Tài liệu dự án
├── README.md           # File này
└── assets/
    ├── css/
    │   ├── style.css   # CSS chính
    │   └── login.css   # CSS trang đăng nhập
    ├── js/
    │   ├── app.js      # Khởi tạo ứng dụng
    │   ├── sidebar.js  # Sidebar navigation
    │   ├── notifications.js  # Thông báo & âm thanh
    │   ├── dashboard.js      # Dashboard charts
    │   └── orders.js         # Quản lý đơn hàng
    ├── images/         # Logo & hình ảnh
    └── sounds/         # Âm thanh thông báo
```

## License

© 2026 QUANGLOI. All rights reserved.
