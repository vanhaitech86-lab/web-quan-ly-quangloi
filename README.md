# QUANGLOI - Hệ thống Quản lý Doanh nghiệp

[![Live Demo on Vercel](https://img.shields.io/badge/Vercel-Live_Demo-black?logo=vercel)](https://web-quan-ly-quangloi.vercel.app)
[![GitHub Repo](https://img.shields.io/badge/GitHub-Repository-blue?logo=github)](https://github.com/vanhaitech86-lab/web-quan-ly-quangloi)

## 🌐 Trải nghiệm trực tiếp

- **Bản Live Vercel:** [https://web-quan-ly-quangloi.vercel.app](https://web-quan-ly-quangloi.vercel.app)
- **Trang Đăng nhập:** [https://web-quan-ly-quangloi.vercel.app/login.html](https://web-quan-ly-quangloi.vercel.app/login.html)
- **Mã nguồn GitHub:** [https://github.com/vanhaitech86-lab/web-quan-ly-quangloi](https://github.com/vanhaitech86-lab/web-quan-ly-quangloi)

## 📌 Giới thiệu

Hệ thống quản lý doanh nghiệp chuyên nghiệp, thiết kế tham khảo từ **CloudPro CRM** (`vps.cloudpro.vn`) với đầy đủ các phân hệ quản lý: Khách hàng, Thiết bị, Đơn hàng, Kho hàng, Kỹ thuật và Báo cáo.

## 🚀 Tính năng nổi bật

- **12 Phân hệ Quản lý & 59 liên kết nghiệp vụ**: Dashboard, Khách hàng, Thiết bị, Sản phẩm, Bán hàng, Mua hàng, Kỹ thuật, Kho hàng, CSKH, Giao hàng, Báo cáo, Cấu hình.
- **Tạo & Duyệt Đơn hàng**: Form tính chiết khấu/VAT tự động theo thời gian thực, duyệt đơn nhanh.
- **🔔 Thông báo thời gian thực**: Chuông âm thanh (WAV/MP3 + Web Audio API fallback) khi có đơn mới, Toast thông báo, Badge counter.
- **5 Modals đầy đủ**: Tạo đơn hàng, Duyệt đơn hàng, Thêm khách hàng, Thêm thiết bị, Thêm sản phẩm.
- **Tài liệu dự án DOC**: File Word định dạng chuẩn [TAI-LIEU-DU-AN-QUANGLOI.doc](./TAI-LIEU-DU-AN-QUANGLOI.doc) gồm 18 mục chi tiết phục vụ tư vấn và làm việc với khách hàng.

## 💻 Cài đặt & Chạy cục bộ

### Cách 1: Mở trực tiếp
Mở file `login.html` bằng trình duyệt web bất kỳ.

### Cách 2: Sử dụng Live Server
Mở thư mục trong VS Code và khởi chạy Live Server với `index.html` hoặc `login.html`.

### Cách 3: Sử dụng Python HTTP Server
```bash
cd "e:\WEB QUẢN LY QUANGLOI"
python -m http.server 8000
```
Truy cập: `http://localhost:8000/login.html`

## 📁 Cấu trúc thư mục

```
├── index.html                      # Trang Dashboard & các phân hệ chính
├── login.html                      # Trang đăng nhập split-screen
├── TAI-LIEU-DU-AN-QUANGLOI.doc     # File tài liệu Word gửi khách hàng
├── TAI-LIEU-DU-AN.md               # Tài liệu dự án Markdown
├── README.md                       # Tài liệu hướng dẫn
├── vercel.json                     # Cấu hình deploy Vercel
└── assets/
    ├── css/
    │   ├── style.css               # Stylesheet chính (Sidebar, Cards, Tables, Responsive)
    │   └── login.css               # Stylesheet trang đăng nhập
    ├── js/
    │   ├── app.js                  # Khởi tạo, phím tắt (Ctrl+K, Ctrl+N), tiện ích
    │   ├── sidebar.js              # Điều hướng, Dynamic Page Engine (59 menu items)
    │   ├── notifications.js        # Hệ thống chuông thông báo âm thanh & toasts
    │   ├── dashboard.js            # Biểu đồ doanh thu & trạng thái (Chart.js)
    │   └── orders.js               # Nghiệp vụ đơn hàng, tính toán & modals CRUD
    ├── images/                     # Logo & hình ảnh
    └── sounds/                     # File âm thanh chuông (WAV & MP3)
```

## 📜 Bản quyền
© 2026 QUANGLOI Security & Management Solutions. All rights reserved.
