# TÀI LIỆU DỰ ÁN - HỆ THỐNG QUẢN LÝ DOANH NGHIỆP QUANGLOI

---

## THÔNG TIN CHUNG

| Thông tin | Chi tiết |
|-----------|----------|
| **Tên dự án** | Hệ thống Quản lý Doanh nghiệp QUANGLOI |
| **Phiên bản** | 1.0 (Template Framework) |
| **Ngày tạo** | 06/09/2026 |
| **Công nghệ** | HTML5, CSS3, JavaScript, Bootstrap 5, Chart.js |
| **Tham khảo** | CloudPro CRM (vps.cloudpro.vn) |
| **Mục tiêu** | Xây dựng hệ thống web/app chuyên nghiệp để quản lý toàn diện hoạt động kinh doanh |

---

## 1. MÔ TẢ TỔNG QUAN

Hệ thống Quản lý Doanh nghiệp QUANGLOI là giải pháp web/app toàn diện giúp doanh nghiệp quản lý khách hàng, thiết bị, đơn hàng, kho hàng, sản phẩm và kỹ thuật. Hệ thống được thiết kế theo mô hình CloudPro CRM với giao diện hiện đại, responsive và hỗ trợ thông báo thời gian thực.

### 1.1 Các tính năng chính

- ✅ **Quản lý Khách hàng** - CRUD khách hàng, người liên hệ, phân loại khách
- ✅ **Quản lý Thiết bị** - Theo dõi thiết bị, serial, vị trí, bảo hành, bảo trì
- ✅ **Quản lý Đơn hàng** - Tạo đơn, duyệt đơn, theo dõi trạng thái
- ✅ **Quản lý Kho hàng** - Nhập kho, xuất kho, chuyển kho, kiểm kho, cảnh báo tồn
- ✅ **Quản lý Sản phẩm** - Danh mục SP, giá, dòng SP, combo, đơn vị
- ✅ **Quản lý Kỹ thuật** - Điều phối, phiếu công tác, khảo sát, bảo trì
- ✅ **Thông báo thời gian thực** - Âm thanh + Toast + Browser notification khi có đơn mới
- ✅ **Dashboard** - Biểu đồ thống kê, KPI, hoạt động gần đây

---

## 2. CẤU TRÚC MENU HỆ THỐNG

Dựa trên phân tích CloudPro CRM, hệ thống có cấu trúc menu sau:

### 2.1 Sơ đồ Menu

```
📁 TRANG CHỦ (Dashboard)
│
📁 DANH MỤC
├── 🏢 Công ty
├── 👤 Người liên hệ
├── 👤 Đầu mối (Leads)
├── 🏪 Nhà cung cấp
├── 📦 Sản phẩm
├── ⚙️ Dịch vụ
├── 📦 Sản phẩm Combo
├── 📋 Dòng sản phẩm
├── 💻 Thiết bị
├── 📍 Địa điểm lắp đặt
└── 🏗️ Đơn vị
│
📁 BÁN HÀNG
├── 🏆 Cơ hội
├── 📄 Báo giá
├── 💰 Bảng giá
├── 📋 Đơn hàng ⭐ (có badge thông báo)
├── 📑 Hợp đồng
├── 🧾 Hóa đơn
├── 💵 Phiếu thu
├── 💳 Phiếu chi
├── 📑 Hợp đồng DV
├── 🎁 Gói sản phẩm
└── 📊 Bảng kê
│
📁 MUA HÀNG
├── 📋 Đơn mua hàng
├── 🧾 Hóa đơn mua
└── 📥 Phiếu nhập mua
│
📁 KỸ THUẬT
├── 🔀 Điều phối công việc
├── 📓 Case
├── ☑️ Task
├── 💻 Thiết bị
├── 📝 Phiếu công tác
├── 📥 P. Ứng vật tư
├── 📤 P. Tiếp nhận VT
├── 📊 P. Khảo sát
├── 📥 Phiếu nhập kho
├── 🔧 P. Bảo trì
└── ⚠️ Cảnh báo vật tư
│
📁 CSKH
├── 🎫 Yêu cầu hỗ trợ
├── 💬 Phản hồi KH
└── 📅 Cuộc hẹn
│
📁 QUẢN LÝ KHO
├── 📊 Tồn kho
├── 📥 Phiếu nhập kho
├── 📤 Phiếu xuất kho
├── ↔️ Chuyển kho
└── 🔍 Kiểm kho
│
📁 VẬN HÀNH
├── 📋 Dự án
└── 📅 Lịch trình
│
📁 GIAO HÀNG
├── 🚚 Phiếu giao hàng
├── 📥 Phiếu nhập kho
└── ✈️ Phiếu vận chuyển
│
📁 BÁO CÁO
├── 📈 Báo cáo bán hàng
├── 💰 Báo cáo doanh thu
├── 📦 Báo cáo tồn kho
├── 🔧 Báo cáo kỹ thuật
└── 👥 Báo cáo khách hàng
│
📁 CẤU HÌNH
├── ⚙️ Cài đặt chung
├── 👤 Quản lý người dùng
├── 🔐 Phân quyền
└── 🔔 Cài đặt thông báo
```

---

## 3. MÔ TẢ CHI TIẾT CÁC MODULE

### 3.1 Module Dashboard (Trang chủ)

| Thành phần | Mô tả |
|------------|--------|
| **KPI Cards** | 8 thẻ thống kê: Đơn hàng, Doanh thu, Khách hàng, Thiết bị, Cuộc hẹn, Thực chi, Đơn chờ duyệt, SP trong kho |
| **Biểu đồ doanh thu** | Biểu đồ cột+đường hiển thị doanh thu/chi phí/lợi nhuận 12 tháng |
| **Biểu đồ trạng thái** | Biểu đồ tròn thể hiện tỷ lệ trạng thái đơn hàng |
| **Đơn hàng gần đây** | Bảng 5 đơn hàng mới nhất với thao tác nhanh |
| **Hoạt động gần đây** | Timeline hoạt động của nhân viên |

### 3.2 Module Quản lý Khách hàng

| Trường dữ liệu | Kiểu | Bắt buộc | Ghi chú |
|-----------------|------|----------|---------|
| Mã KH | Text (tự sinh) | ✅ | Tự động tạo |
| Họ tên | Text | ✅ | |
| Công ty | Dropdown/Text | | Liên kết module Công ty |
| Điện thoại | Phone | ✅ | |
| Email | Email | | |
| Địa chỉ | Text | | Tỉnh/Huyện/Xã |
| Phân loại | Dropdown | | VIP/Thường/Tiềm năng |
| Nguồn KH | Dropdown | | Online/Giới thiệu/Quảng cáo |
| Nhân viên phụ trách | Dropdown | | |
| Ghi chú | Textarea | | |

### 3.3 Module Quản lý Thiết bị

| Trường dữ liệu | Kiểu | Bắt buộc | Ghi chú |
|-----------------|------|----------|---------|
| Mã TB | Text (tự sinh) | ✅ | |
| Tên thiết bị | Text | ✅ | |
| Loại thiết bị | Dropdown | ✅ | Camera/Đầu ghi/Báo động/... |
| Serial Number | Text | ✅ | |
| Khách hàng | Dropdown | | Liên kết module KH |
| Địa điểm lắp đặt | Text | | |
| Ngày lắp đặt | Date | | |
| Trạng thái | Dropdown | ✅ | Hoạt động/Bảo trì/Hỏng/Chưa lắp |
| Bảo hành đến | Date | | |
| Hình ảnh | File Upload | | |

### 3.4 Module Quản lý Đơn hàng

| Trường dữ liệu | Kiểu | Bắt buộc | Ghi chú |
|-----------------|------|----------|---------|
| Mã đơn hàng | Text (tự sinh) | ✅ | Định dạng DH-XXXXX |
| Khách hàng | Dropdown | ✅ | |
| Người liên hệ | Text | | |
| Điện thoại | Phone | ✅ | |
| Email | Email | | |
| Địa chỉ giao hàng | Text | | |
| **Sản phẩm** | | | **Bảng chi tiết** |
| - Sản phẩm | Dropdown | ✅ | |
| - Số lượng | Number | ✅ | |
| - Đơn giá | Currency | ✅ | |
| - Chiết khấu | Percent | | |
| - VAT | Dropdown | | 0%/8%/10% |
| - Thành tiền | Currency (tính) | | |
| Ghi chú | Textarea | | |
| Tổng cộng | Currency (tính) | | |
| Trạng thái | Dropdown | ✅ | Chờ duyệt/Đã duyệt/Đang xử lý/Hoàn thành/Đã hủy |
| Người tạo | System | | |
| Người duyệt | System | | |
| Ngày tạo | Datetime | | |
| Ngày duyệt | Datetime | | |

#### Quy trình duyệt đơn hàng:
```
Tạo đơn → Chờ duyệt → [Duyệt/Từ chối] → Đang xử lý → Hoàn thành
                            ↓
                        Đã hủy (nếu từ chối)
```

### 3.5 Module Quản lý Kho hàng

| Chức năng | Mô tả |
|-----------|--------|
| **Tồn kho** | Hiển thị tồn kho theo SP, theo kho. Cảnh báo SP sắp hết/hết hàng |
| **Nhập kho** | Tạo phiếu nhập kho từ NCC hoặc từ đơn mua |
| **Xuất kho** | Tạo phiếu xuất kho theo đơn hàng/phiếu giao hàng |
| **Chuyển kho** | Chuyển SP giữa các kho |
| **Kiểm kho** | Tạo phiếu kiểm kho, điều chỉnh tồn |

### 3.6 Module Quản lý Sản phẩm

| Trường dữ liệu | Kiểu | Bắt buộc | Ghi chú |
|-----------------|------|----------|---------|
| Mã SP | Text (tự sinh) | ✅ | |
| Tên sản phẩm | Text | ✅ | |
| Hình ảnh | File Upload | | Hỗ trợ nhiều ảnh |
| Dòng sản phẩm | Dropdown | | |
| Đơn giá bán | Currency | ✅ | |
| Giá nhập | Currency | | |
| Đơn vị tính | Dropdown | ✅ | Cái/Bộ/Hộp/... |
| Tồn kho | Number | | Tự tính từ module Kho |
| Mô tả | Rich Text | | |
| Trạng thái | Dropdown | ✅ | Đang bán/Ngừng bán/Sắp ra mắt |

### 3.7 Module Quản lý Kỹ thuật

| Chức năng | Mô tả |
|-----------|--------|
| **Điều phối công việc** | Phân công KTV, lên lịch, theo dõi tiến độ |
| **Case** | Quản lý các case kỹ thuật từ CSKH |
| **Task** | Quản lý task công việc |
| **Phiếu công tác** | Tạo phiếu cho KTV đi hiện trường |
| **P. Ứng vật tư** | KTV yêu cầu ứng vật tư |
| **P. Tiếp nhận VT** | Tiếp nhận vật tư từ kho |
| **P. Khảo sát** | Phiếu khảo sát hiện trường |
| **P. Bảo trì** | Lịch bảo trì định kỳ |
| **Cảnh báo vật tư** | Cảnh báo tồn vật tư dưới mức tối thiểu |

---

## 4. HỆ THỐNG THÔNG BÁO

### 4.1 Các loại thông báo

| Loại | Trigger | Âm thanh | Toast | Browser Push |
|------|---------|----------|-------|-------------|
| **Đơn hàng mới** | Khi tạo đơn mới | ✅ Có | ✅ Có | ✅ Có |
| **Đơn đã duyệt** | Khi duyệt đơn | ✅ Có | ✅ Có | ✅ Có |
| **Đơn bị từ chối** | Khi từ chối đơn | ✅ Có | ✅ Có | ✅ Có |
| **Cảnh báo tồn kho** | Khi SP dưới mức tối thiểu | ✅ Có | ✅ Có | ❌ Không |
| **Lịch bảo trì** | Khi đến hạn bảo trì | ❌ Không | ✅ Có | ❌ Không |

### 4.2 Cơ chế thông báo

1. **Âm thanh**: Sử dụng Web Audio API tạo beep sound hoặc file MP3 tùy chỉnh
2. **Toast Notification**: Pop-up góc phải màn hình, tự đóng sau 8 giây
3. **Browser Push**: Yêu cầu quyền từ trình duyệt, hiển thị ngay cả khi không mở tab
4. **Badge Count**: Cập nhật số thông báo chưa đọc trên icon chuông và title trang
5. **Sidebar Badge**: Hiển thị số đơn hàng mới trên menu "Đơn hàng"

---

## 5. CẤU TRÚC FILE DỰ ÁN

```
📂 WEB QUẢN LY QUANGLOI/
│
├── 📄 index.html              ← Trang chính (Dashboard + các module)
├── 📄 login.html              ← Trang đăng nhập
│
├── 📂 assets/
│   ├── 📂 css/
│   │   ├── style.css          ← Stylesheet chính
│   │   └── login.css          ← Stylesheet trang đăng nhập
│   │
│   ├── 📂 js/
│   │   ├── app.js             ← Khởi tạo ứng dụng, tiện ích
│   │   ├── sidebar.js         ← Điều khiển sidebar navigation
│   │   ├── notifications.js   ← Hệ thống thông báo & âm thanh
│   │   ├── dashboard.js       ← Biểu đồ Dashboard
│   │   └── orders.js          ← Quản lý đơn hàng
│   │
│   ├── 📂 images/             ← Logo, hình ảnh
│   └── 📂 sounds/             ← File âm thanh thông báo
│
└── 📄 README.md               ← Hướng dẫn cài đặt
```

---

## 6. GIAO DIỆN MẪU

### 6.1 Trang đăng nhập
- Layout chia đôi: Panel thương hiệu (xanh) + Form đăng nhập (trắng)
- Hỗ trợ hiện/ẩn mật khẩu
- Ghi nhớ đăng nhập
- Quên mật khẩu
- Chuyển đổi ngôn ngữ Việt/Anh

### 6.2 Dashboard
- 8 thẻ KPI với icon và % thay đổi
- Biểu đồ doanh thu 12 tháng (Bar + Line)
- Biểu đồ trạng thái đơn hàng (Doughnut)
- Bảng đơn hàng gần đây
- Timeline hoạt động

### 6.3 Sidebar Navigation
- Dark theme (#1e293b)
- Accordion submenu
- Thu gọn/mở rộng
- Responsive mobile (hamburger menu + overlay)
- Badge thông báo đơn hàng mới

### 6.4 Form tạo đơn hàng
- Modal full-width
- 3 phần: Thông tin KH + Sản phẩm (bảng) + Tổng kết
- Thêm/xóa dòng sản phẩm
- Tự tính thành tiền, VAT, chiết khấu
- Nút: Hủy / Lưu nháp / Gửi duyệt

---

## 7. YÊU CẦU KỸ THUẬT (ĐỀ XUẤT CHO GIAI ĐOẠN 2)

### 7.1 Backend
| Thành phần | Đề xuất |
|------------|---------|
| Ngôn ngữ | PHP / Node.js / Python |
| Framework | Laravel / Express.js / Django |
| Database | MySQL / PostgreSQL |
| API | RESTful API |
| Authentication | JWT Token |

### 7.2 Frontend (nâng cấp)
| Thành phần | Đề xuất |
|------------|---------|
| Framework | Vue.js / React.js |
| UI Library | Vuetify / Ant Design |
| State Management | Vuex / Redux |
| Realtime | WebSocket / Server-Sent Events |

### 7.3 Hosting & Deployment
| Thành phần | Đề xuất |
|------------|---------|
| Server | VPS (2-4 CPU, 4-8GB RAM) |
| OS | Ubuntu 22.04 LTS |
| Web Server | Nginx |
| SSL | Let's Encrypt (free) |
| Domain | Tùy chỉnh |

---

## 8. PHÂN QUYỀN NGƯỜI DÙNG

| Vai trò | Dashboard | Xem đơn | Tạo đơn | Duyệt đơn | Quản lý kho | Kỹ thuật | Cấu hình |
|---------|-----------|---------|---------|-----------|-------------|----------|----------|
| **Admin** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| **Quản lý** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ❌ |
| **Nhân viên BH** | ✅ | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ |
| **Kỹ thuật viên** | ✅ (giới hạn) | ✅ | ❌ | ❌ | ❌ | ✅ | ❌ |
| **Kế toán** | ✅ | ✅ | ❌ | ❌ | ✅ | ❌ | ❌ |
| **Kho** | ✅ (giới hạn) | ✅ | ❌ | ❌ | ✅ | ❌ | ❌ |

---

## 9. LỘ TRÌNH PHÁT TRIỂN

### Giai đoạn 1: Template & Prototype (Hiện tại ✅)
- [x] Thiết kế giao diện HTML/CSS template
- [x] Sidebar navigation đầy đủ module
- [x] Dashboard với biểu đồ mẫu
- [x] Form tạo đơn hàng
- [x] Hệ thống thông báo âm thanh (demo)
- [x] Responsive design

### Giai đoạn 2: Backend & Database
- [ ] Thiết kế cơ sở dữ liệu
- [ ] Xây dựng API backend
- [ ] Tích hợp authentication
- [ ] CRUD khách hàng, sản phẩm, thiết bị
- [ ] Module đơn hàng hoàn chỉnh
- [ ] Module kho hàng

### Giai đoạn 3: Tính năng nâng cao
- [ ] Real-time notifications (WebSocket)
- [ ] Báo cáo & thống kê nâng cao
- [ ] Export Excel/PDF
- [ ] Import dữ liệu từ Excel
- [ ] Email/SMS thông báo
- [ ] Tích hợp thanh toán

### Giai đoạn 4: Mobile App
- [ ] Progressive Web App (PWA)
- [ ] Push notification trên mobile
- [ ] Offline mode
- [ ] App native (React Native / Flutter)

---

## 10. DANH SÁCH CẦN BỔ SUNG TỪ KHÁCH HÀNG

> ⚠️ **Vui lòng xác nhận/bổ sung các thông tin sau trước khi phát triển:**

- [ ] Logo doanh nghiệp (file vector .svg hoặc .png)
- [ ] Bảng màu thương hiệu (nếu khác màu mặc định)
- [ ] Danh sách chi tiết các loại sản phẩm/dịch vụ
- [ ] Quy trình duyệt đơn hàng cụ thể (ai duyệt, bao nhiêu cấp?)
- [ ] Danh sách kho hàng (bao nhiêu kho? ở đâu?)
- [ ] Yêu cầu về phân quyền chi tiết
- [ ] Tích hợp với hệ thống nào khác? (Kế toán, Email, SMS,...)
- [ ] Yêu cầu về hosting & domain
- [ ] Số lượng người dùng dự kiến
- [ ] Ngân sách dự kiến
- [ ] Thời gian hoàn thành mong muốn

---

*Tài liệu được tạo bởi QUANGLOI Development Team - Phiên bản 1.0*
*Cập nhật lần cuối: 06/09/2026*
