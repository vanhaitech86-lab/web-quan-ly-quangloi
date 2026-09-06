/**
 * QUANGLOI Management System - Sidebar Navigation
 * Handles sidebar toggle, submenu expand/collapse, active states,
 * and dynamic page generation for all module links.
 */

document.addEventListener('DOMContentLoaded', function () {
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');

    // ---- Desktop: Toggle sidebar collapse ----
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function () {
            sidebar.classList.toggle('collapsed');
            // Close all submenus when collapsing
            if (sidebar.classList.contains('collapsed')) {
                document.querySelectorAll('.nav-item.open').forEach(item => {
                    item.classList.remove('open');
                });
            }
            // Save state
            localStorage.setItem('sidebar-collapsed', sidebar.classList.contains('collapsed'));
        });
    }

    // Restore sidebar state
    if (localStorage.getItem('sidebar-collapsed') === 'true') {
        sidebar.classList.add('collapsed');
    }

    // ---- Mobile: Toggle sidebar visibility ----
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function () {
            sidebar.classList.toggle('mobile-open');
            toggleOverlay(sidebar.classList.contains('mobile-open'));
        });
    }

    // ---- Submenu toggle ----
    document.querySelectorAll('.nav-item.has-submenu > .nav-link').forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const parentItem = this.parentElement;

            // If sidebar is collapsed on desktop, expand first
            if (sidebar.classList.contains('collapsed') && window.innerWidth > 991) {
                sidebar.classList.remove('collapsed');
                localStorage.setItem('sidebar-collapsed', false);
            }

            // Close other open submenus (accordion behavior)
            document.querySelectorAll('.nav-item.has-submenu.open').forEach(function (openItem) {
                if (openItem !== parentItem) {
                    openItem.classList.remove('open');
                }
            });

            // Toggle current submenu
            parentItem.classList.toggle('open');
        });
    });

    // ---- Page navigation (SPA-style) ----
    document.querySelectorAll('[data-page]').forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const pageName = this.getAttribute('data-page');
            navigateToPage(pageName);

            // Update active state in sidebar
            document.querySelectorAll('.nav-item.active').forEach(item => item.classList.remove('active'));
            
            // Set active on parent nav-item
            const navItem = this.closest('.nav-item') || this.closest('.submenu')?.closest('.nav-item');
            if (navItem) navItem.classList.add('active');
            
            // Set active on submenu link
            document.querySelectorAll('.submenu a.active').forEach(a => a.classList.remove('active'));
            if (this.closest('.submenu')) {
                this.classList.add('active');
            }

            // Close mobile sidebar
            if (window.innerWidth <= 991) {
                sidebar.classList.remove('mobile-open');
                toggleOverlay(false);
            }
        });
    });

    // ---- Helper: Overlay for mobile ----
    function toggleOverlay(show) {
        let overlay = document.querySelector('.sidebar-overlay');
        if (show) {
            if (!overlay) {
                overlay = document.createElement('div');
                overlay.className = 'sidebar-overlay show';
                overlay.addEventListener('click', function () {
                    sidebar.classList.remove('mobile-open');
                    toggleOverlay(false);
                });
                document.body.appendChild(overlay);
            } else {
                overlay.classList.add('show');
            }
        } else if (overlay) {
            overlay.classList.remove('show');
        }
    }
});

/**
 * Module metadata and sample data for dynamic pages
 */
const MODULE_METADATA = {
    'leads': {
        title: 'Quản lý Đầu mối (Leads)',
        subtitle: 'Danh sách khách hàng tiềm năng và đầu mối kinh doanh',
        icon: 'bi-person-plus',
        btnText: 'Thêm đầu mối',
        cols: ['Mã ĐM', 'Họ tên', 'Công ty', 'Điện thoại', 'Nguồn', 'Giai đoạn', 'Người phụ trách', 'Thao tác'],
        rows: [
            ['<span class="fw-bold">DM-00101</span>', 'Trương Minh Tuấn', 'Công ty BĐS An Khang', '0918889999', 'Website', '<span class="badge bg-warning">Chưa liên hệ</span>', 'Nguyễn Thị Bích', 'action'],
            ['<span class="fw-bold">DM-00102</span>', 'Vũ Thị Ngọc', 'Khách sạn Sen Vàng', '0928776655', 'Giới thiệu', '<span class="badge bg-info">Đang tư vấn</span>', 'Trần Văn Cường', 'action'],
            ['<span class="fw-bold">DM-00103</span>', 'Lê Đình Trọng', 'Trường Mầm Non Ánh Dương', '0938112233', 'Facebook Ads', '<span class="badge bg-primary">Khảo sát</span>', 'Lê Hữu Đạt', 'action'],
            ['<span class="fw-bold">DM-00104</span>', 'Phạm Quốc Bảo', 'Showroom Ô tô Quốc Bảo', '0948445566', 'Triển lãm', '<span class="badge bg-success">Đã báo giá</span>', 'Phạm Văn Nam', 'action']
        ]
    },
    'services': {
        title: 'Quản lý Dịch vụ',
        subtitle: 'Danh mục dịch vụ lắp đặt, bảo trì, tư vấn hệ thống',
        icon: 'bi-gear-wide-connected',
        btnText: 'Thêm dịch vụ',
        cols: ['Mã DV', 'Tên dịch vụ', 'Đơn vị tính', 'Đơn giá', 'Thời lượng', 'Bảo hành', 'Trạng thái', 'Thao tác'],
        rows: [
            ['<span class="fw-bold">DV-001</span>', 'Thi công lắp đặt trọn gói camera (1-4 mắt)', 'Gói', '1,200,000đ', '1 ngày', '12 tháng', '<span class="badge bg-success">Kích hoạt</span>', 'action'],
            ['<span class="fw-bold">DV-002</span>', 'Thi công lắp đặt camera công trình lớn (>8 mắt)', 'Mắt', '300,000đ', '2-3 ngày', '12 tháng', '<span class="badge bg-success">Kích hoạt</span>', 'action'],
            ['<span class="fw-bold">DV-003</span>', 'Bảo trì định kỳ hệ thống an ninh hàng tháng', 'Tháng', '800,000đ', 'Định kỳ', 'Theo hợp đồng', '<span class="badge bg-success">Kích hoạt</span>', 'action'],
            ['<span class="fw-bold">DV-004</span>', 'Xử lý sự cố mạng & đầu ghi tận nơi (khẩn cấp)', 'Lượt', '500,000đ', '2 giờ', '1 tháng', '<span class="badge bg-success">Kích hoạt</span>', 'action']
        ]
    },
    'combo-products': {
        title: 'Quản lý Sản phẩm Combo',
        subtitle: 'Các gói combo camera, đầu ghi và phụ kiện ưu đãi',
        icon: 'bi-boxes',
        btnText: 'Tạo combo mới',
        cols: ['Mã Combo', 'Tên gói combo', 'Bao gồm', 'Giá gốc', 'Giá ưu đãi', 'Trạng thái', 'Thao tác'],
        rows: [
            ['<span class="fw-bold">CB-01</span>', 'Combo Gia đình An Tâm 4 Camera IP', '4 Camera Dome 2MP + Đầu ghi 4 kênh + Ổ cứng 1TB + Nguồn + Dây', '7,800,000đ', '<span class="text-danger fw-bold">6,500,000đ</span>', '<span class="badge bg-success">Đang bán</span>', 'action'],
            ['<span class="fw-bold">CB-02</span>', 'Combo Doanh nghiệp 8 Camera Full HD', '8 Camera Thân 4MP + Đầu ghi 8 kênh + Ổ cứng 2TB + Switch PoE', '18,500,000đ', '<span class="text-danger fw-bold">15,800,000đ</span>', '<span class="badge bg-success">Đang bán</span>', 'action'],
            ['<span class="fw-bold">CB-03</span>', 'Combo Nhà xưởng 16 Camera AI', '16 Camera PTZ 5MP + Đầu ghi 16 kênh AI + Ổ cứng 4TB + Tủ rack', '45,000,000đ', '<span class="text-danger fw-bold">39,900,000đ</span>', '<span class="badge bg-success">Đang bán</span>', 'action']
        ]
    },
    'tickets': {
        title: 'Yêu cầu Hỗ trợ (Tickets)',
        subtitle: 'Tiếp nhận và xử lý sự cố từ khách hàng',
        icon: 'bi-ticket-detailed',
        btnText: 'Tạo ticket mới',
        cols: ['Mã Ticket', 'Tiêu đề', 'Khách hàng', 'Mức độ', 'KTV phụ trách', 'Hạn xử lý', 'Trạng thái', 'Thao tác'],
        rows: [
            ['<span class="fw-bold">#TK-1089</span>', 'Camera sảnh không lên hình sau mưa lớn', 'Công ty May Việt Thắng', '<span class="badge bg-danger">Khẩn cấp</span>', 'Lê Hữu Đạt', '06/09/2026', '<span class="badge bg-warning">Đang xử lý</span>', 'action'],
            ['<span class="fw-bold">#TK-1088</span>', 'Hỏi cách xem lại lịch sử ghi hình trên app', 'Anh Trần Minh', '<span class="badge bg-secondary">Thấp</span>', 'CSKH Trực tuyến', '06/09/2026', '<span class="badge bg-success">Đã đóng</span>', 'action'],
            ['<span class="fw-bold">#TK-1087</span>', 'Đầu ghi kêu tít tít báo lỗi ổ cứng', 'Trường Tiểu học Lê Quý Đôn', '<span class="badge bg-warning">Trung bình</span>', 'Nguyễn Tiến Dũng', '07/09/2026', '<span class="badge bg-info">Đã lên lịch</span>', 'action']
        ]
    },
    'appointments': {
        title: 'Quản lý Cuộc hẹn',
        subtitle: 'Lịch hẹn khảo sát, bàn giao và gặp gỡ đối tác',
        icon: 'bi-calendar-check',
        btnText: 'Tạo cuộc hẹn mới',
        cols: ['Mã hẹn', 'Khách hàng', 'Mục đích', 'Thời gian', 'Địa điểm', 'Người tham gia', 'Trạng thái', 'Thao tác'],
        rows: [
            ['<span class="fw-bold">LH-045</span>', 'Công ty Vận tải Biển Đông', 'Khảo sát lắp đặt 12 camera bãi xe', '07/09/2026 09:30', 'KCN Cát Lái, TP. Thủ Đức', 'KTV Trưởng + Sale', '<span class="badge bg-primary">Sắp diễn ra</span>', 'action'],
            ['<span class="fw-bold">LH-044</span>', 'Nhà hàng Biển Nhớ', 'Nghiệm thu và bàn giao hệ thống', '08/09/2026 14:00', 'Quận 1, TP. HCM', 'Admin + Đại diện KH', '<span class="badge bg-info">Đã xác nhận</span>', 'action']
        ]
    },
    'price-list': {
        title: 'Bảng giá Sản phẩm & Dịch vụ',
        subtitle: 'Thiết lập bảng giá sỉ, lẻ, đại lý cho toàn hệ thống',
        icon: 'bi-currency-exchange',
        btnText: 'Tạo bảng giá',
        cols: ['Mã bảng giá', 'Tên bảng giá', 'Đối tượng áp dụng', 'Ngày áp dụng', 'Hiệu lực', 'Trạng thái', 'Thao tác'],
        rows: [
            ['<span class="fw-bold">BG-2026-LE</span>', 'Bảng giá Bán lẻ Tiêu chuẩn 2026', 'Khách hàng cá nhân, công ty nhỏ', '01/01/2026', 'Vô thời hạn', '<span class="badge bg-success">Đang áp dụng</span>', 'action'],
            ['<span class="fw-bold">BG-2026-DL1</span>', 'Bảng giá Đại lý Cấp 1 (Chiết khấu 25%)', 'Đại lý phân phối cấp tỉnh', '01/01/2026', '31/12/2026', '<span class="badge bg-success">Đang áp dụng</span>', 'action'],
            ['<span class="fw-bold">BG-2026-DUAN</span>', 'Bảng giá Dự án Công trình Lớn', 'Chủ đầu tư, tổng thầu xây dựng', '01/03/2026', '31/12/2026', '<span class="badge bg-success">Đang áp dụng</span>', 'action']
        ]
    },
    'receipts': {
        title: 'Quản lý Phiếu thu',
        subtitle: 'Danh sách phiếu thu tiền mặt và chuyển khoản từ đơn hàng',
        icon: 'bi-cash-stack',
        btnText: 'Tạo phiếu thu',
        cols: ['Mã phiếu thu', 'Khách hàng', 'Đơn hàng', 'Số tiền thu', 'Hình thức', 'Người nộp', 'Ngày thu', 'Thao tác'],
        rows: [
            ['<span class="fw-bold">PT-092601</span>', 'Nguyễn Văn Thành', 'DH-00156', '15,500,000đ', 'Chuyển khoản VCB', 'Nguyễn Văn Thành', '06/09/2026', 'action'],
            ['<span class="fw-bold">PT-092602</span>', 'Trần Hoàng Minh', 'DH-00155', '42,000,000đ', 'Chuyển khoản MB', 'Kế toán Minh', '05/09/2026', 'action'],
            ['<span class="fw-bold">PT-092603</span>', 'Lê Văn Phước', 'DH-00154', '4,000,000đ (Tạm ứng)', 'Tiền mặt', 'Lê Văn Phước', '05/09/2026', 'action']
        ]
    },
    'payments': {
        title: 'Quản lý Phiếu chi',
        subtitle: 'Danh sách chi phí nhập hàng, vật tư và công tác',
        icon: 'bi-wallet2',
        btnText: 'Tạo phiếu chi',
        cols: ['Mã phiếu chi', 'Đối tượng nhận', 'Mục đích chi', 'Số tiền', 'Hình thức', 'Người duyệt', 'Ngày chi', 'Thao tác'],
        rows: [
            ['<span class="fw-bold">PC-092601</span>', 'Công ty Hikvision VN', 'Thanh toán đợt 1 nhập lô camera Q3', '85,000,000đ', 'Chuyển khoản', 'Giám đốc', '04/09/2026', 'action'],
            ['<span class="fw-bold">PC-092602</span>', 'Đội KTV Công trình', 'Tạm ứng xăng xe, công tác phí tuần 36', '3,500,000đ', 'Tiền mặt', 'Kế toán trưởng', '05/09/2026', 'action']
        ]
    },
    'settings-general': {
        title: 'Cài đặt Chung Hệ thống',
        subtitle: 'Thông tin doanh nghiệp, cấu hình hệ thống và tham số vận hành',
        icon: 'bi-gear',
        btnText: 'Lưu cấu hình',
        isSettings: true
    },
    'settings-users': {
        title: 'Quản lý Người dùng & Tài khoản',
        subtitle: 'Danh sách nhân viên, tài khoản đăng nhập và trạng thái kích hoạt',
        icon: 'bi-person-gear',
        btnText: 'Thêm tài khoản',
        cols: ['Mã NV', 'Họ tên', 'Tên đăng nhập', 'Email', 'Phòng ban', 'Vai trò', 'Trạng thái', 'Thao tác'],
        rows: [
            ['<span class="fw-bold">NV-001</span>', 'Quản trị viên Hệ thống', 'admin', 'admin@quangloi.vn', 'Ban Giám Đốc', '<span class="badge bg-danger">Admin</span>', '<span class="badge bg-success">Hoạt động</span>', 'action'],
            ['<span class="fw-bold">NV-002</span>', 'Nguyễn Thị Bích', 'bich.nt', 'bich.nt@quangloi.vn', 'Phòng Kinh Doanh', '<span class="badge bg-primary">Trưởng phòng KD</span>', '<span class="badge bg-success">Hoạt động</span>', 'action'],
            ['<span class="fw-bold">NV-003</span>', 'Lê Hữu Đạt', 'dat.lh', 'dat.lh@quangloi.vn', 'Phòng Kỹ Thuật', '<span class="badge bg-warning text-dark">Kỹ thuật viên</span>', '<span class="badge bg-success">Hoạt động</span>', 'action'],
            ['<span class="fw-bold">NV-004</span>', 'Phạm Thu Trang', 'trang.pt', 'trang.pt@quangloi.vn', 'Phòng Kế Toán', '<span class="badge bg-info">Kế toán</span>', '<span class="badge bg-success">Hoạt động</span>', 'action']
        ]
    }
};

/**
 * Generate a dynamic page section on demand if not present in static HTML
 */
function createDynamicPageSection(pageName) {
    const mainContainer = document.querySelector('.page-content');
    if (!mainContainer) return null;

    // Determine info from sidebar link
    const linkEl = document.querySelector(`.sidebar a[data-page="${pageName}"]`);
    const linkText = linkEl ? linkEl.textContent.trim() : pageName;
    const linkIcon = linkEl ? (linkEl.querySelector('i')?.className || 'bi-folder') : 'bi-folder';
    const parentCategory = linkEl?.closest('.nav-item.has-submenu')?.querySelector('.nav-text')?.textContent.trim() || 'HỆ THỐNG';

    const meta = MODULE_METADATA[pageName] || {
        title: `Quản lý ${linkText}`,
        subtitle: `Phân hệ ${linkText} thuộc danh mục ${parentCategory}`,
        icon: linkIcon,
        btnText: `Thêm ${linkText} mới`,
        cols: ['Mã', 'Tiêu đề / Tên', 'Phân loại', 'Người phụ trách', 'Ngày tạo', 'Trạng thái', 'Thao tác'],
        rows: [
            [`<span class="fw-bold">QL-001</span>`, `${linkText} Mẫu 01`, parentCategory, 'Admin', '06/09/2026', '<span class="badge bg-success">Hoạt động</span>', 'action'],
            [`<span class="fw-bold">QL-002</span>`, `${linkText} Mẫu 02`, parentCategory, 'Nhân viên A', '05/09/2026', '<span class="badge bg-info">Đang xử lý</span>', 'action'],
            [`<span class="fw-bold">QL-003</span>`, `${linkText} Mẫu 03`, parentCategory, 'Nhân viên B', '04/09/2026', '<span class="badge bg-warning">Chờ duyệt</span>', 'action']
        ]
    };

    const sectionEl = document.createElement('div');
    sectionEl.id = 'page-' + pageName;
    sectionEl.className = 'page-section';

    if (meta.isSettings) {
        sectionEl.innerHTML = `
            <div class="page-title-box">
                <div class="page-title-left">
                    <h4 class="page-title"><i class="bi ${meta.icon} text-primary me-2"></i>${meta.title}</h4>
                    <p class="page-subtitle">${meta.subtitle}</p>
                </div>
                <div class="page-title-right">
                    <button class="btn btn-primary" onclick="alert('Đã lưu cấu hình hệ thống!')">
                        <i class="bi bi-save"></i> ${meta.btnText}
                    </button>
                </div>
            </div>
            <div class="row g-4">
                <div class="col-lg-6">
                    <div class="card mb-4">
                        <div class="card-header bg-white"><h6 class="mb-0 fw-bold">Thông tin Doanh nghiệp</h6></div>
                        <div class="card-body">
                            <div class="mb-3">
                                <label class="form-label">Tên Công ty / Cửa hàng</label>
                                <input type="text" class="form-control" value="QUANGLOI SECURITY SOLUTIONS">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Số điện thoại Hotline</label>
                                <input type="text" class="form-control" value="0901.234.567">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Email liên hệ</label>
                                <input type="email" class="form-control" value="contact@quangloi.vn">
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Địa chỉ trụ sở</label>
                                <input type="text" class="form-control" value="123 Nguyễn Thị Thập, P. Tân Phong, Quận 7, TP. HCM">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="card mb-4">
                        <div class="card-header bg-white"><h6 class="mb-0 fw-bold">Cấu hình Đơn hàng & Thông báo</h6></div>
                        <div class="card-body">
                            <div class="form-check form-switch mb-3">
                                <input class="form-check-input" type="checkbox" id="swAudio" checked>
                                <label class="form-check-label" for="swAudio">Phát âm thanh chuông khi có đơn hàng mới</label>
                            </div>
                            <div class="form-check form-switch mb-3">
                                <input class="form-check-input" type="checkbox" id="swPush" checked>
                                <label class="form-check-label" for="swPush">Bật Browser Push Notification</label>
                            </div>
                            <div class="form-check form-switch mb-3">
                                <input class="form-check-input" type="checkbox" id="swAutoApprove">
                                <label class="form-check-label" for="swAutoApprove">Tự động duyệt đơn giá trị dưới 1,000,000đ</label>
                            </div>
                            <div class="mb-3">
                                <label class="form-label">Mức tồn kho cảnh báo tối thiểu</label>
                                <input type="number" class="form-control" value="5">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    } else {
        const theadHtml = meta.cols.map(c => `<th>${c}</th>`).join('');
        const tbodyHtml = meta.rows.map(r => {
            const cells = r.map((c, i) => {
                if (c === 'action') {
                    return `
                        <td>
                            <div class="dropdown">
                                <button class="btn btn-sm btn-outline-secondary" data-bs-toggle="dropdown">
                                    <i class="bi bi-three-dots-vertical"></i>
                                </button>
                                <div class="dropdown-menu dropdown-menu-end">
                                    <a class="dropdown-item" href="#"><i class="bi bi-eye"></i> Xem chi tiết</a>
                                    <a class="dropdown-item" href="#"><i class="bi bi-pencil"></i> Chỉnh sửa</a>
                                    <a class="dropdown-item text-danger" href="#"><i class="bi bi-trash"></i> Xóa</a>
                                </div>
                            </div>
                        </td>
                    `;
                }
                return `<td>${c}</td>`;
            }).join('');
            return `<tr>${cells}</tr>`;
        }).join('');

        sectionEl.innerHTML = `
            <div class="page-title-box">
                <div class="page-title-left">
                    <h4 class="page-title"><i class="bi ${meta.icon} text-primary me-2"></i>${meta.title}</h4>
                    <p class="page-subtitle">${meta.subtitle}</p>
                </div>
                <div class="page-title-right">
                    <button class="btn btn-primary" onclick="alert('Mở form: ${meta.btnText}')">
                        <i class="bi bi-plus-circle"></i> ${meta.btnText}
                    </button>
                </div>
            </div>
            <div class="card mb-3">
                <div class="card-body">
                    <div class="row g-2 align-items-center">
                        <div class="col-md-4">
                            <div class="input-group input-group-sm">
                                <span class="input-group-text"><i class="bi bi-search"></i></span>
                                <input type="text" class="form-control" placeholder="Tìm kiếm trong danh sách...">
                            </div>
                        </div>
                        <div class="col-md-3">
                            <select class="form-select form-select-sm">
                                <option value="">-- Tất cả trạng thái --</option>
                                <option>Hoạt động / Đang xử lý</option>
                                <option>Hoàn thành</option>
                                <option>Đang chờ</option>
                            </select>
                        </div>
                        <div class="col-md-5 text-md-end">
                            <button class="btn btn-sm btn-outline-success me-2">
                                <i class="bi bi-file-earmark-excel"></i> Xuất Excel
                            </button>
                            <button class="btn btn-sm btn-outline-secondary">
                                <i class="bi bi-arrow-clockwise"></i> Làm mới
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="card-body p-0">
                    <div class="table-responsive">
                        <table class="table table-hover data-table mb-0">
                            <thead>
                                <tr>${theadHtml}</tr>
                            </thead>
                            <tbody>
                                ${tbodyHtml}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="card-footer d-flex justify-content-between align-items-center">
                    <span class="text-muted">Hiển thị 1-${meta.rows.length} / ${meta.rows.length} bản ghi</span>
                    <nav>
                        <ul class="pagination pagination-sm mb-0">
                            <li class="page-item disabled"><a class="page-link" href="#">«</a></li>
                            <li class="page-item active"><a class="page-link" href="#">1</a></li>
                            <li class="page-item disabled"><a class="page-link" href="#">»</a></li>
                        </ul>
                    </nav>
                </div>
            </div>
        `;
    }

    mainContainer.appendChild(sectionEl);
    return sectionEl;
}

/**
 * Navigate to a page section (SPA-style)
 */
function navigateToPage(pageName) {
    // Hide all page sections
    document.querySelectorAll('.page-section').forEach(section => {
        section.classList.remove('active');
    });

    // Find or dynamically build target page
    let targetPage = document.getElementById('page-' + pageName);
    if (!targetPage) {
        targetPage = createDynamicPageSection(pageName);
    }

    if (targetPage) {
        targetPage.classList.add('active');
    } else {
        // Fallback to dashboard
        const dashboard = document.getElementById('page-dashboard');
        if (dashboard) dashboard.classList.add('active');
    }

    // Update URL hash
    window.location.hash = pageName;

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
