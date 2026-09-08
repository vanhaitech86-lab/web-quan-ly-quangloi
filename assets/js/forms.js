/**
 * QUANGLOI Management System - Universal CRUD & Form Modal Engine
 * Provides interactive data input templates, edit modals, detail viewers,
 * delete handlers, and approval actions for EVERY module across the system.
 */

(function () {
    // Counter tracking for generated IDs
    const idCounters = {
        'suppliers': 104,
        'quotes': 208,
        'contracts': 305,
        'invoices': 406,
        'cases': 506,
        'tasks': 606,
        'stock-in': 705,
        'stock-out': 805,
        'delivery-notes': 905,
        'companies': 106,
        'dispatch': 502,
        'leads': 105,
        'services': 105,
        'combo-products': 104,
        'price-list': 104,
        'receipts': 104,
        'payments': 104,
        'tickets': 1090,
        'appointments': 1046
    };

    // Specific Module Form Schemas
    const FORM_SCHEMAS = {
        'suppliers': {
            title: 'Thêm Nhà Cung Cấp Mới',
            icon: 'bi-shop',
            btnSaveText: 'Lưu nhà cung cấp',
            prefix: 'NCC-',
            fields: [
                { name: 'name', label: 'Tên nhà cung cấp / Công ty', type: 'text', required: true, col: 12, placeholder: 'VD: Công ty TNHH Thiết Bị An Ninh Viễn Đông' },
                { name: 'contact', label: 'Người liên hệ', type: 'text', col: 6, placeholder: 'VD: Nguyễn Văn Hoàng' },
                { name: 'phone', label: 'Số điện thoại', type: 'tel', required: true, col: 6, placeholder: 'VD: 0909.123.456' },
                { name: 'email', label: 'Email liên hệ', type: 'email', col: 6, placeholder: 'VD: contact@viendong.vn' },
                { name: 'category', label: 'Nhóm sản phẩm cung cấp', type: 'select', col: 6, options: ['Camera giám sát & Đầu ghi', 'Thiết bị mạng & Switch PoE', 'Hệ thống báo động & Báo cháy', 'Khóa cửa điện tử & Chấm công'] },
                { name: 'address', label: 'Địa chỉ kho / Trụ sở', type: 'text', col: 12, placeholder: 'VD: 142 Nguyễn Trãi, Quận 5, TP. HCM' },
                { name: 'status', label: 'Trạng thái hợp tác', type: 'select', col: 6, options: ['Hoạt động', 'Tạm ngưng', 'Đang thẩm định'] },
                { name: 'note', label: 'Ghi chú bổ sung', type: 'textarea', col: 12, placeholder: 'Chính sách chiết khấu, hạn mức công nợ...' }
            ],
            formatRow: (d, id) => [
                `<span class="fw-bold">${id}</span>`,
                d.name,
                d.contact || 'Chưa cập nhật',
                d.phone,
                d.email || 'contact@ncc.vn',
                d.address || 'TP. Hồ Chí Minh',
                `<span class="badge bg-success">${d.status || 'Hoạt động'}</span>`,
                'action'
            ]
        },
        'quotes': {
            title: 'Tạo Báo Giá Mới',
            icon: 'bi-file-earmark-text',
            btnSaveText: 'Tạo & Gửi báo giá',
            prefix: 'BG-',
            fields: [
                { name: 'customer', label: 'Tên Khách hàng / Đơn vị', type: 'text', required: true, col: 6, placeholder: 'VD: Công ty CP Bất Động Sản Phúc Khang' },
                { name: 'phone', label: 'Số điện thoại liên hệ', type: 'tel', required: true, col: 6, placeholder: 'VD: 0918.776.889' },
                { name: 'package', label: 'Gói giải pháp / Thiết bị báo giá', type: 'text', required: true, col: 12, placeholder: 'VD: Hệ thống 8 Camera IP 4MP AI & Đầu ghi PoE 8 kênh' },
                { name: 'amount', label: 'Tổng giá trị báo giá (VNĐ)', type: 'number', required: true, col: 6, placeholder: 'VD: 24500000' },
                { name: 'discount', label: 'Chiết khấu ưu đãi (%)', type: 'number', col: 6, placeholder: 'VD: 10' },
                { name: 'expiry', label: 'Hiệu lực báo giá đến ngày', type: 'date', col: 6 },
                { name: 'creator', label: 'Nhân viên lập báo giá', type: 'text', col: 6, value: 'Admin' },
                { name: 'note', label: 'Điều khoản bảo hành & Thi công', type: 'textarea', col: 12, placeholder: 'Bao gồm chi phí lắp đặt hoàn thiện, bảo hành tận nơi 24 tháng...' }
            ],
            formatRow: (d, id) => [
                `<a href="#" class="fw-bold">${id}</a>`,
                d.customer,
                d.package,
                `<span class="fw-bold text-primary">${Number(d.amount || 0).toLocaleString('vi-VN')} ₫</span>`,
                d.expiry ? new Date(d.expiry).toLocaleDateString('vi-VN') : '30 ngày',
                `<span class="badge bg-warning-subtle text-warning">Chờ phản hồi</span>`,
                new Date().toLocaleDateString('vi-VN'),
                'action'
            ]
        },
        'contracts': {
            title: 'Tạo Hợp Đồng Mới',
            icon: 'bi-file-earmark-lock',
            btnSaveText: 'Lưu hợp đồng',
            prefix: 'HD-',
            fields: [
                { name: 'customer', label: 'Tên Khách hàng / Doanh nghiệp', type: 'text', required: true, col: 6, placeholder: 'VD: Khách sạn Mường Thanh Grand' },
                { name: 'type', label: 'Loại hợp đồng', type: 'select', col: 6, options: ['Hợp đồng Mua bán & Lắp đặt', 'Hợp đồng Bảo trì định kỳ', 'Hợp đồng Cho thuê thiết bị', 'Hợp đồng Dự án trọn gói'] },
                { name: 'value', label: 'Giá trị hợp đồng (VNĐ)', type: 'number', required: true, col: 6, placeholder: 'VD: 68000000' },
                { name: 'startDate', label: 'Ngày bắt đầu có hiệu lực', type: 'date', required: true, col: 6 },
                { name: 'endDate', label: 'Ngày kết thúc hợp đồng', type: 'date', col: 6 },
                { name: 'terms', label: 'Tiến độ thanh toán', type: 'select', col: 6, options: ['Tạm ứng 50% - Nghiệm thu 50%', 'Thanh toán 100% sau nghiệm thu', 'Thanh toán theo 3 đợt'] },
                { name: 'note', label: 'Điều khoản và cam kết kỹ thuật', type: 'textarea', col: 12, placeholder: 'Bàn giao thiết bị mới 100%, bảo hành phần cứng 24 tháng...' }
            ],
            formatRow: (d, id) => [
                `<a href="#" class="fw-bold">${id}</a>`,
                d.customer,
                d.type || 'Mua bán & Lắp đặt',
                `<span class="fw-bold text-success">${Number(d.value || 0).toLocaleString('vi-VN')} ₫</span>`,
                d.startDate ? new Date(d.startDate).toLocaleDateString('vi-VN') : '08/09/2026',
                d.endDate ? new Date(d.endDate).toLocaleDateString('vi-VN') : '08/09/2027',
                `<span class="badge bg-primary">Đang thực hiện</span>`,
                'action'
            ]
        },
        'invoices': {
            title: 'Tạo Hóa Đơn Mới',
            icon: 'bi-receipt-cutoff',
            btnSaveText: 'Xuất hóa đơn',
            prefix: 'INV-',
            fields: [
                { name: 'customer', label: 'Khách hàng / Đơn vị mua', type: 'text', required: true, col: 6, placeholder: 'VD: Công ty TNHH Dịch Vụ Ánh Sáng' },
                { name: 'orderRef', label: 'Mã đơn hàng liên quan', type: 'text', col: 6, placeholder: 'VD: DH-00156' },
                { name: 'amount', label: 'Tổng tiền thanh toán (VNĐ)', type: 'number', required: true, col: 6, placeholder: 'VD: 15500000' },
                { name: 'taxCode', label: 'Mã số thuế', type: 'text', col: 6, placeholder: 'VD: 0314567890' },
                { name: 'method', label: 'Hình thức thanh toán', type: 'select', col: 6, options: ['Chuyển khoản Vietcombank', 'Chuyển khoản MBBank', 'Tiền mặt', 'Thẻ tín dụng'] },
                { name: 'dueDate', label: 'Hạn chót thanh toán', type: 'date', col: 6 },
                { name: 'note', label: 'Ghi chú hóa đơn', type: 'textarea', col: 12, placeholder: 'Xuất hóa đơn điện tử gửi về email kế toán...' }
            ],
            formatRow: (d, id) => [
                `<a href="#" class="fw-bold">${id}</a>`,
                d.customer,
                d.orderRef || 'DH-00156',
                `<span class="fw-bold">${Number(d.amount || 0).toLocaleString('vi-VN')} ₫</span>`,
                '0 ₫',
                `<span class="fw-bold text-danger">${Number(d.amount || 0).toLocaleString('vi-VN')} ₫</span>`,
                `<span class="badge bg-warning-subtle text-warning">Chưa thanh toán</span>`,
                new Date().toLocaleDateString('vi-VN'),
                'action'
            ]
        },
        'cases': {
            title: 'Tạo Case Kỹ Thuật Mới',
            icon: 'bi-journal-text',
            btnSaveText: 'Lưu & Phân công',
            prefix: 'CS-',
            fields: [
                { name: 'title', label: 'Tiêu đề sự cố / Hiện tượng lỗi', type: 'text', required: true, col: 12, placeholder: 'VD: Camera sân sau bị mất tín hiệu sau mưa lớn' },
                { name: 'customer', label: 'Khách hàng / Công trình', type: 'text', required: true, col: 6, placeholder: 'VD: Trường Tiểu học Nguyễn Du' },
                { name: 'phone', label: 'Số điện thoại', type: 'tel', col: 6, placeholder: 'VD: 0938.990.112' },
                { name: 'priority', label: 'Mức độ ưu tiên', type: 'select', col: 6, options: ['Khẩn cấp', 'Cao', 'Trung bình', 'Thấp'] },
                { name: 'assignee', label: 'Kỹ thuật viên phụ trách', type: 'select', col: 6, options: ['Lê Hữu Đạt', 'Nguyễn Tiến Dũng', 'Trần Văn Cường', 'Vũ Văn Hùng'] },
                { name: 'address', label: 'Địa điểm kiểm tra', type: 'text', col: 12, placeholder: 'VD: 250 Nguyễn Trãi, Quận 1, TP. HCM' },
                { name: 'desc', label: 'Mô tả chi tiết sự cố', type: 'textarea', col: 12, placeholder: 'Mô tả cụ thể đèn báo, dây nguồn, thời điểm xảy ra lỗi...' }
            ],
            formatRow: (d, id) => {
                const colors = { 'Khẩn cấp': 'bg-danger', 'Cao': 'bg-warning text-dark', 'Trung bình': 'bg-info', 'Thấp': 'bg-secondary' };
                return [
                    `<a href="#" class="fw-bold">${id}</a>`,
                    d.title,
                    d.customer,
                    `<span class="badge ${colors[d.priority] || 'bg-info'}">${d.priority || 'Trung bình'}</span>`,
                    d.assignee || 'Lê Hữu Đạt',
                    `<span class="badge bg-warning">Đang xử lý</span>`,
                    new Date().toLocaleDateString('vi-VN'),
                    'action'
                ];
            }
        },
        'tasks': {
            title: 'Tạo Nhiệm Vụ (Task) Mới',
            icon: 'bi-list-task',
            btnSaveText: 'Giao việc',
            prefix: 'TSK-',
            fields: [
                { name: 'title', label: 'Tiêu đề công việc cần thực hiện', type: 'text', required: true, col: 12, placeholder: 'VD: Lắp đặt hoàn thiện 4 camera văn phòng chi nhánh Bình Thạnh' },
                { name: 'assigner', label: 'Người giao việc', type: 'text', col: 6, value: 'Admin' },
                { name: 'assignee', label: 'Người thực hiện', type: 'select', col: 6, options: ['Lê Hữu Đạt', 'Nguyễn Tiến Dũng', 'Trần Văn Cường', 'Vũ Văn Hùng', 'Phạm Thu Trang'] },
                { name: 'deadline', label: 'Hạn chót hoàn thành (Deadline)', type: 'date', required: true, col: 6 },
                { name: 'priority', label: 'Mức độ ưu tiên', type: 'select', col: 6, options: ['Gấp', 'Cao', 'Bình thường', 'Thấp'] },
                { name: 'desc', label: 'Chi tiết yêu cầu & Hướng dẫn', type: 'textarea', col: 12, placeholder: 'Yêu cầu kỹ thuật thi công, kiểm tra góc nhìn camera...' }
            ],
            formatRow: (d, id) => [
                `<a href="#" class="fw-bold">${id}</a>`,
                d.title,
                d.assigner || 'Admin',
                d.assignee || 'Lê Hữu Đạt',
                d.deadline ? new Date(d.deadline).toLocaleDateString('vi-VN') : '10/09/2026',
                `<div class="progress" style="height:6px;width:80px"><div class="progress-bar bg-warning" style="width:15%"></div></div><small class="text-muted">15%</small>`,
                `<span class="badge bg-warning text-dark">Đang làm</span>`,
                'action'
            ]
        },
        'stock-in': {
            title: 'Tạo Phiếu Nhập Kho Mới',
            icon: 'bi-box-arrow-in-down',
            btnSaveText: 'Nhập kho',
            prefix: 'NK-',
            fields: [
                { name: 'supplier', label: 'Nhà cung cấp', type: 'select', required: true, col: 6, options: ['Công ty CP Viễn Thông Á Châu', 'Công ty TNHH Phương Việt', 'DSS Việt Nam (Dahua)', 'Ezviz Việt Nam'] },
                { name: 'warehouse', label: 'Kho tiếp nhận', type: 'select', required: true, col: 6, options: ['Kho Tổng Quận 1', 'Kho Chi Nhánh Tân Bình', 'Kho Dự Án Thủ Đức'] },
                { name: 'product', label: 'Thiết bị / Sản phẩm nhập', type: 'text', required: true, col: 12, placeholder: 'VD: 50 Camera IP Dome 2MP Hikvision DS-2CD1123G0E' },
                { name: 'quantity', label: 'Số lượng nhập', type: 'number', required: true, col: 6, placeholder: 'VD: 50' },
                { name: 'totalAmount', label: 'Tổng tiền nhập kho (VNĐ)', type: 'number', required: true, col: 6, placeholder: 'VD: 45000000' },
                { name: 'note', label: 'Ghi chú nhập kho', type: 'textarea', col: 12, placeholder: 'Lô hàng số #2026-Q3, có hóa đơn GTGT đi kèm...' }
            ],
            formatRow: (d, id) => [
                `<a href="#" class="fw-bold">${id}</a>`,
                d.supplier || 'Nhà cung cấp',
                d.warehouse || 'Kho Tổng Quận 1',
                (d.quantity || '50') + ' cái',
                `<span class="fw-bold text-success">${Number(d.totalAmount || 0).toLocaleString('vi-VN')} ₫</span>`,
                'Admin',
                new Date().toLocaleDateString('vi-VN'),
                `<span class="badge bg-success">Đã nhập kho</span>`,
                'action'
            ]
        },
        'stock-out': {
            title: 'Tạo Phiếu Xuất Kho Mới',
            icon: 'bi-box-arrow-up',
            btnSaveText: 'Xuất kho',
            prefix: 'XK-',
            fields: [
                { name: 'orderRef', label: 'Đơn hàng / Công trình liên quan', type: 'text', required: true, col: 6, placeholder: 'VD: Đơn hàng DH-00156' },
                { name: 'customer', label: 'Khách hàng nhận', type: 'text', required: true, col: 6, placeholder: 'VD: Nguyễn Văn Thành' },
                { name: 'warehouse', label: 'Xuất từ kho', type: 'select', required: true, col: 6, options: ['Kho Tổng Quận 1', 'Kho Chi Nhánh Tân Bình', 'Kho Dự Án Thủ Đức'] },
                { name: 'product', label: 'Thiết bị / Vật tư xuất', type: 'text', required: true, col: 6, placeholder: 'VD: 5 Camera IP Wifi + 1 Đầu ghi 8 kênh' },
                { name: 'quantity', label: 'Số lượng xuất', type: 'number', required: true, col: 6, placeholder: 'VD: 6' },
                { name: 'reason', label: 'Lý do xuất kho', type: 'select', col: 6, options: ['Xuất bán hàng theo đơn', 'Xuất thi công công trình', 'Xuất bảo hành thay thế', 'Chuyển kho nội bộ'] },
                { name: 'note', label: 'Ghi chú xuất kho', type: 'textarea', col: 12, placeholder: 'Dán tem bảo hành công ty trước khi xuất kho...' }
            ],
            formatRow: (d, id) => [
                `<a href="#" class="fw-bold">${id}</a>`,
                d.orderRef || 'DH-00156',
                d.customer || 'Nguyễn Văn Thành',
                d.warehouse || 'Kho Tổng',
                (d.quantity || '6') + ' cái',
                'Admin',
                new Date().toLocaleDateString('vi-VN'),
                `<span class="badge bg-primary">Đã xuất kho</span>`,
                'action'
            ]
        },
        'delivery-notes': {
            title: 'Tạo Phiếu Giao Hàng Mới',
            icon: 'bi-truck',
            btnSaveText: 'Tạo phiếu giao',
            prefix: 'PGH-',
            fields: [
                { name: 'orderRef', label: 'Mã đơn hàng liên kết', type: 'text', required: true, col: 6, placeholder: 'VD: DH-00156' },
                { name: 'customer', label: 'Người nhận hàng', type: 'text', required: true, col: 6, placeholder: 'VD: Nguyễn Văn Thành' },
                { name: 'phone', label: 'Số điện thoại', type: 'tel', required: true, col: 6, placeholder: 'VD: 0901.234.567' },
                { name: 'shipper', label: 'Người giao / Nhân viên phụ trách', type: 'select', col: 6, options: ['KTV Lê Hữu Đạt', 'KTV Nguyễn Tiến Dũng', 'Đơn vị GHTK', 'Đơn vị ViettelPost'] },
                { name: 'address', label: 'Địa chỉ nhận hàng', type: 'text', required: true, col: 12, placeholder: 'VD: 128 Lê Văn Việt, Tăng Nhơn Phú B, TP. Thủ Đức' },
                { name: 'date', label: 'Ngày giờ giao dự kiến', type: 'date', col: 6 },
                { name: 'cod', label: 'Thu hộ tiền COD (nếu có)', type: 'number', col: 6, placeholder: 'VD: 15500000' },
                { name: 'note', label: 'Dặn dò người giao', type: 'textarea', col: 12, placeholder: 'Cho khách kiểm tra hàng trước khi thanh toán...' }
            ],
            formatRow: (d, id) => [
                `<a href="#" class="fw-bold">${id}</a>`,
                d.orderRef || 'DH-00156',
                d.customer || 'Nguyễn Văn Thành',
                d.address || 'TP. Thủ Đức',
                d.shipper || 'KTV Lê Hữu Đạt',
                d.date ? new Date(d.date).toLocaleDateString('vi-VN') : 'Hôm nay',
                `<span class="badge bg-warning">Đang giao</span>`,
                'action'
            ]
        },
        'companies': {
            title: 'Thêm Công Ty / Khách Hàng Doanh Nghiệp',
            icon: 'bi-building',
            btnSaveText: 'Lưu thông tin',
            prefix: 'CT-',
            fields: [
                { name: 'name', label: 'Tên công ty / Doanh nghiệp', type: 'text', required: true, col: 12, placeholder: 'VD: Tập đoàn Bất Động Sản Hưng Thịnh' },
                { name: 'field', label: 'Lĩnh vực hoạt động', type: 'text', col: 6, placeholder: 'VD: Bất động sản / Xây dựng' },
                { name: 'taxCode', label: 'Mã số thuế', type: 'text', col: 6, placeholder: 'VD: 0309988776' },
                { name: 'phone', label: 'Số điện thoại liên hệ', type: 'tel', required: true, col: 6, placeholder: 'VD: 028.3822.9999' },
                { name: 'email', label: 'Email doanh nghiệp', type: 'email', col: 6, placeholder: 'VD: info@hungthinhcorp.com.vn' },
                { name: 'website', label: 'Website công ty', type: 'text', col: 6, placeholder: 'VD: https://hungthinhcorp.com.vn' },
                { name: 'address', label: 'Địa chỉ trụ sở chính', type: 'text', col: 12, placeholder: 'VD: 53 Trần Quốc Thảo, Quận 3, TP. HCM' }
            ],
            formatRow: (d, id) => [
                `<a href="#" class="fw-bold">${id}</a>`,
                d.name,
                d.field || 'Doanh nghiệp',
                d.phone,
                d.email || 'contact@corp.vn',
                d.address || 'TP. HCM',
                d.website || 'quangloi.vn',
                'action'
            ]
        },
        'dispatch': {
            title: 'Tạo Phiếu Công Tác Kỹ Thuật',
            icon: 'bi-signpost-split',
            btnSaveText: 'Tạo phiếu & Điều phối',
            prefix: 'PCT-',
            fields: [
                { name: 'customer', label: 'Khách hàng / Công trình', type: 'text', required: true, col: 6, placeholder: 'VD: Biệt thự Anh Hoàng - Thảo Điền' },
                { name: 'workType', label: 'Loại công việc', type: 'select', required: true, col: 6, options: ['Lắp đặt mới hệ thống', 'Bảo trì định kỳ', 'Khắc phục sự cố khẩn cấp', 'Khảo sát hiện trường & Lập phương án'] },
                { name: 'technician', label: 'Kỹ thuật viên phụ trách', type: 'select', required: true, col: 6, options: ['Lê Hữu Đạt', 'Nguyễn Tiến Dũng', 'Trần Văn Cường', 'Vũ Văn Hùng'] },
                { name: 'date', label: 'Ngày thực hiện', type: 'date', required: true, col: 6 },
                { name: 'location', label: 'Địa điểm công tác', type: 'text', required: true, col: 12, placeholder: 'VD: Số 18 Đường 49, Thảo Điền, TP. Thủ Đức' },
                { name: 'tools', label: 'Vật tư & Thiết bị mang theo', type: 'text', col: 12, placeholder: 'VD: Thang nhôm, kìm bấm cáp, máy test mạng, cuộn cáp Cat6 100m' },
                { name: 'note', label: 'Yêu cầu kỹ thuật & Lưu ý', type: 'textarea', col: 12, placeholder: 'Khách yêu cầu đi dây luồn ống ghen thẩm mỹ, nghiệm thu trước 17h...' }
            ],
            formatRow: (d, id) => [
                `<a href="#" class="fw-bold">${id}</a>`,
                d.workType || 'Lắp đặt',
                d.customer,
                d.location || 'TP. Thủ Đức',
                d.technician || 'Lê Hữu Đạt',
                d.date ? new Date(d.date).toLocaleDateString('vi-VN') : '08/09/2026',
                `<span class="badge bg-info">Đang thực hiện</span>`,
                'action'
            ]
        }
    };

    /**
     * Build the Universal Form Modal & Detail Modal and insert into DOM
     */
    function initModals() {
        if (document.getElementById('universalDataModal')) return;

        const modalHtml = `
            <!-- Universal Dynamic Form Modal -->
            <div class="modal fade" id="universalDataModal" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-lg modal-dialog-centered">
                    <div class="modal-content shadow-lg border-0 rounded-4">
                        <div class="modal-header bg-primary text-white py-3 px-4 rounded-top-4">
                            <h5 class="modal-title d-flex align-items-center gap-2 mb-0" id="universalModalTitle">
                                <i class="bi bi-plus-circle"></i>
                                <span>Thêm dữ liệu mới</span>
                            </h5>
                            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body p-4">
                            <form id="universalDataForm" novalidate>
                                <div class="row g-3" id="universalFormFields">
                                    <!-- Dynamic fields rendered here -->
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer bg-light px-4 py-3 rounded-bottom-4">
                            <button type="button" class="btn btn-outline-secondary px-4" data-bs-dismiss="modal">
                                <i class="bi bi-x-circle me-1"></i> Đóng
                            </button>
                            <button type="button" class="btn btn-primary px-4" id="btnUniversalSubmit">
                                <i class="bi bi-save me-1"></i> Lưu dữ liệu
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Universal Detail Modal -->
            <div class="modal fade" id="universalDetailModal" tabindex="-1" aria-hidden="true">
                <div class="modal-dialog modal-lg modal-dialog-centered">
                    <div class="modal-content shadow-lg border-0 rounded-4">
                        <div class="modal-header bg-dark text-white py-3 px-4 rounded-top-4">
                            <h5 class="modal-title d-flex align-items-center gap-2 mb-0" id="universalDetailTitle">
                                <i class="bi bi-info-circle"></i>
                                <span>Chi tiết bản ghi</span>
                            </h5>
                            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body p-4" id="universalDetailBody">
                            <!-- Details dynamically inserted here -->
                        </div>
                        <div class="modal-footer bg-light px-4 py-3 rounded-bottom-4">
                            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Đóng</button>
                            <button type="button" class="btn btn-primary" onclick="window.print()">
                                <i class="bi bi-printer me-1"></i> In phiếu
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHtml);
    }

    /**
     * Open Form Modal for a given module
     */
    function openFormModal(moduleKey, editData = null, targetRow = null) {
        initModals();

        const modalEl = document.getElementById('universalDataModal');
        const modalTitleEl = document.getElementById('universalModalTitle');
        const fieldsContainer = document.getElementById('universalFormFields');
        const submitBtn = document.getElementById('btnUniversalSubmit');

        // Check if schema exists or create fallback based on current table columns
        let schema = FORM_SCHEMAS[moduleKey];
        if (!schema) {
            schema = buildFallbackSchema(moduleKey);
        }

        // Setup Title & Button
        modalTitleEl.innerHTML = `<i class="bi ${schema.icon || 'bi-pencil-square'} me-2"></i> ${editData ? 'Chỉnh sửa: ' : ''}${schema.title}`;
        submitBtn.innerHTML = `<i class="bi bi-save me-1"></i> ${editData ? 'Cập nhật thay đổi' : (schema.btnSaveText || 'Lưu dữ liệu')}`;

        // Render Fields
        fieldsContainer.innerHTML = schema.fields.map(f => {
            const val = editData ? (editData[f.name] || '') : (f.value || '');
            const requiredMark = f.required ? '<span class="text-danger">*</span>' : '';
            const colClass = `col-md-${f.col || 6}`;

            if (f.type === 'select') {
                const options = (f.options || []).map(opt => {
                    const selected = val === opt ? 'selected' : '';
                    return `<option value="${opt}" ${selected}>${opt}</option>`;
                }).join('');
                return `
                    <div class="${colClass}">
                        <label class="form-label fw-medium">${f.label} ${requiredMark}</label>
                        <select class="form-select" name="${f.name}" ${f.required ? 'required' : ''}>
                            <option value="">-- Chọn ${f.label.toLowerCase()} --</option>
                            ${options}
                        </select>
                    </div>
                `;
            } else if (f.type === 'textarea') {
                return `
                    <div class="${colClass}">
                        <label class="form-label fw-medium">${f.label} ${requiredMark}</label>
                        <textarea class="form-control" name="${f.name}" rows="3" placeholder="${f.placeholder || ''}" ${f.required ? 'required' : ''}>${val}</textarea>
                    </div>
                `;
            } else {
                return `
                    <div class="${colClass}">
                        <label class="form-label fw-medium">${f.label} ${requiredMark}</label>
                        <input type="${f.type || 'text'}" class="form-control" name="${f.name}" value="${val}" placeholder="${f.placeholder || ''}" ${f.required ? 'required' : ''}>
                    </div>
                `;
            }
        }).join('');

        // Store module context on submit button
        submitBtn.onclick = function () {
            handleFormSubmit(moduleKey, schema, editData, targetRow);
        };

        const bsModal = new bootstrap.Modal(modalEl);
        bsModal.show();
    }

    /**
     * Fallback Schema Generator: Inspects active table column headers
     */
    function buildFallbackSchema(moduleKey) {
        const activeSection = document.getElementById('page-' + moduleKey) || document.querySelector('.page-section.active');
        const pageTitle = activeSection?.querySelector('.page-title')?.textContent?.trim() || moduleKey;
        const headers = Array.from(activeSection?.querySelectorAll('table thead th') || [])
            .map(th => th.textContent.trim())
            .filter(t => t && t !== 'Thao tác' && !t.includes('#'));

        const fields = headers.map((h, i) => {
            const isAmount = h.toLowerCase().includes('tiền') || h.toLowerCase().includes('giá') || h.toLowerCase().includes('thu') || h.toLowerCase().includes('chi');
            const isDate = h.toLowerCase().includes('ngày') || h.toLowerCase().includes('hạn');
            const isPhone = h.toLowerCase().includes('thoại') || h.toLowerCase().includes('sđt');
            const isStatus = h.toLowerCase().includes('trạng thái');

            if (isStatus) {
                return { name: 'f_' + i, label: h, type: 'select', col: 6, options: ['Hoạt động / Đang xử lý', 'Hoàn thành', 'Chờ phê duyệt', 'Tạm ngưng'] };
            }
            return {
                name: 'f_' + i,
                label: h,
                type: isAmount ? 'number' : (isDate ? 'date' : (isPhone ? 'tel' : 'text')),
                required: i === 0 || i === 1,
                col: headers.length <= 4 ? 12 : 6,
                placeholder: `Nhập ${h.toLowerCase()}...`
            };
        });

        // Add note field if small
        if (fields.length < 6) {
            fields.push({ name: 'note', label: 'Ghi chú bổ sung', type: 'textarea', col: 12, placeholder: 'Nhập ghi chú chi tiết...' });
        }

        return {
            title: pageTitle.startsWith('Quản lý') || pageTitle.startsWith('Thêm') ? pageTitle : `Quản lý ${pageTitle}`,
            icon: 'bi-folder-check',
            btnSaveText: 'Lưu thông tin',
            prefix: moduleKey.slice(0, 3).toUpperCase() + '-',
            fields: fields,
            formatRow: (data, id) => {
                const cells = headers.map((h, i) => {
                    let val = data['f_' + i] || '---';
                    if (h.toLowerCase().includes('tiền') || h.toLowerCase().includes('giá')) {
                        return `<span class="fw-bold text-success">${Number(val || 0).toLocaleString('vi-VN')} ₫</span>`;
                    }
                    if (h.toLowerCase().includes('trạng thái')) {
                        return `<span class="badge bg-success">${val || 'Hoạt động'}</span>`;
                    }
                    if (i === 0) {
                        return `<span class="fw-bold">${id}</span>`;
                    }
                    return val;
                });
                cells.push('action');
                return cells;
            }
        };
    }

    /**
     * Handle Form Submission
     */
    function handleFormSubmit(moduleKey, schema, editData, targetRow) {
        const form = document.getElementById('universalDataForm');
        if (!form) return;

        // Check required
        const requiredInputs = form.querySelectorAll('[required]');
        for (let input of requiredInputs) {
            if (!input.value.trim()) {
                input.focus();
                input.classList.add('is-invalid');
                setTimeout(() => input.classList.remove('is-invalid'), 3000);
                if (window.orderManager) {
                    window.orderManager.showAlert('warning', `Vui lòng điền thông tin: ${input.previousElementSibling?.textContent?.replace('*', '').trim()}`);
                } else {
                    alert('Vui lòng điền đầy đủ các thông tin bắt buộc (*)');
                }
                return;
            }
        }

        // Collect Form Data
        const formData = {};
        const formElements = form.querySelectorAll('input, select, textarea');
        formElements.forEach(el => {
            if (el.name) formData[el.name] = el.value;
        });

        // Determine target table
        const activeSection = document.getElementById('page-' + moduleKey) || document.querySelector('.page-section.active');
        const tbody = activeSection?.querySelector('table.data-table tbody') || activeSection?.querySelector('table tbody');

        if (editData && targetRow) {
            // Updating existing row
            const cells = schema.formatRow(formData, targetRow.querySelector('td')?.textContent?.trim() || 'ID');
            targetRow.innerHTML = formatCellsToHtml(cells);
            highlightRow(targetRow);
            showToastSuccess(`Đã cập nhật thông tin thành công!`);
        } else {
            // Creating new row
            if (!idCounters[moduleKey]) idCounters[moduleKey] = 101;
            idCounters[moduleKey]++;
            const generatedId = (schema.prefix || 'QL-') + String(idCounters[moduleKey]).padStart(4, '0');

            if (tbody) {
                const cells = schema.formatRow(formData, generatedId);
                const newTr = document.createElement('tr');
                newTr.innerHTML = formatCellsToHtml(cells);
                tbody.insertBefore(newTr, tbody.firstChild);
                highlightRow(newTr);

                // Play notification sound
                if (window.notificationManager) {
                    window.notificationManager.playNotificationSound();
                    window.notificationManager.addNotification({
                        title: `Dữ liệu mới: ${schema.title}`,
                        message: `Đã thêm thành công bản ghi #${generatedId}`,
                        type: 'success',
                        icon: 'bi-check-circle',
                        showToast: false
                    });
                }

                showToastSuccess(`Đã thêm thành công [${generatedId}] vào hệ thống!`);
            }
        }

        // Hide modal
        const modalEl = document.getElementById('universalDataModal');
        const bsModal = bootstrap.Modal.getInstance(modalEl);
        if (bsModal) bsModal.hide();
    }

    /**
     * Convert cell array to TD HTML string
     */
    function formatCellsToHtml(cells) {
        return cells.map((c, i) => {
            if (c === 'action') {
                return `
                    <td>
                        <div class="dropdown">
                            <button class="btn btn-sm btn-outline-secondary" data-bs-toggle="dropdown">
                                <i class="bi bi-three-dots-vertical"></i>
                            </button>
                            <div class="dropdown-menu dropdown-menu-end shadow-sm">
                                <a class="dropdown-item btn-view-row" href="#"><i class="bi bi-eye text-primary me-2"></i> Xem chi tiết</a>
                                <a class="dropdown-item btn-edit-row" href="#"><i class="bi bi-pencil text-warning me-2"></i> Chỉnh sửa</a>
                                <a class="dropdown-item btn-approve-row" href="#"><i class="bi bi-check-circle text-success me-2"></i> Duyệt nhanh</a>
                                <div class="dropdown-divider"></div>
                                <a class="dropdown-item text-danger btn-delete-row" href="#"><i class="bi bi-trash me-2"></i> Xóa bản ghi</a>
                            </div>
                        </div>
                    </td>
                `;
            }
            return `<td>${c}</td>`;
        }).join('');
    }

    /**
     * Subtle pulse effect on added or updated row
     */
    function highlightRow(row) {
        row.classList.add('table-success');
        setTimeout(() => {
            row.classList.remove('table-success');
        }, 2000);
    }

    /**
     * Show toast alert
     */
    function showToastSuccess(msg) {
        if (window.orderManager && window.orderManager.showAlert) {
            window.orderManager.showAlert('success', msg);
        } else {
            alert(msg);
        }
    }

    /**
     * Open View Detail Modal for a table row
     */
    function openDetailModal(row) {
        initModals();

        const modalEl = document.getElementById('universalDetailModal');
        const bodyEl = document.getElementById('universalDetailBody');
        const titleEl = document.getElementById('universalDetailTitle');

        const activeSection = row.closest('.page-section') || document.querySelector('.page-section.active');
        const sectionTitle = activeSection?.querySelector('.page-title')?.textContent?.trim() || 'Bản ghi';
        titleEl.innerHTML = `<i class="bi bi-file-earmark-text text-primary me-2"></i> Chi tiết: ${sectionTitle}`;

        const headers = Array.from(activeSection?.querySelectorAll('table thead th') || []).map(th => th.textContent.trim());
        const cells = Array.from(row.querySelectorAll('td'));

        let itemsHtml = '';
        headers.forEach((h, i) => {
            if (h && h !== 'Thao tác' && !h.includes('#') && cells[i]) {
                itemsHtml += `
                    <div class="col-md-6 border-bottom py-2">
                        <small class="text-muted d-block">${h}</small>
                        <span class="fw-medium">${cells[i].innerHTML}</span>
                    </div>
                `;
            }
        });

        bodyEl.innerHTML = `
            <div class="p-3 bg-light rounded-3 mb-3 d-flex justify-content-between align-items-center">
                <div>
                    <h6 class="mb-1 text-primary fw-bold">${sectionTitle}</h6>
                    <small class="text-muted">Mã bản ghi: <strong>${cells[0]?.textContent?.trim() || cells[1]?.textContent?.trim() || 'N/A'}</strong></small>
                </div>
                <div>
                    <span class="badge bg-success-subtle text-success px-3 py-2">Trạng thái: Hoạt động</span>
                </div>
            </div>
            <div class="row g-2">
                ${itemsHtml}
            </div>
            <div class="mt-4 p-3 border rounded-3 bg-white">
                <small class="text-muted d-block mb-1"><i class="bi bi-clock-history"></i> Lịch sử cập nhật:</small>
                <small class="text-secondary">Được tạo bởi: <strong>Admin</strong> lúc ${new Date().toLocaleTimeString('vi-VN')} ngày ${new Date().toLocaleDateString('vi-VN')}</small>
            </div>
        `;

        new bootstrap.Modal(modalEl).show();
    }

    /**
     * Universal Event Delegation for Buttons across the app
     */
    document.addEventListener('DOMContentLoaded', function () {
        initModals();

        // Catch clicks on ANY "Thêm...", "Tạo...", "Nhập kho", "Xuất kho" buttons
        document.body.addEventListener('click', function (e) {
            // 1. Header action buttons ("Thêm", "Tạo", etc.)
            const btn = e.target.closest('.page-title-right button, .page-title-box button, .btn-open-modal');
            if (btn) {
                // If it already triggers an existing hardcoded modal via data-bs-target, let Bootstrap handle it
                const targetModalId = btn.getAttribute('data-bs-target');
                if (targetModalId && document.querySelector(targetModalId)) {
                    return;
                }

                // Check button text
                const text = btn.textContent.trim().toLowerCase();
                if (text.includes('thêm') || text.includes('tạo') || text.includes('nhập') || text.includes('xuất')) {
                    e.preventDefault();
                    e.stopPropagation();

                    const activeSection = btn.closest('.page-section') || document.querySelector('.page-section.active');
                    const sectionId = activeSection ? activeSection.id.replace('page-', '') : 'orders';

                    // If it's inventory page with "Nhập kho" vs "Xuất kho"
                    if (sectionId === 'inventory') {
                        if (text.includes('nhập')) {
                            openFormModal('stock-in');
                        } else {
                            openFormModal('stock-out');
                        }
                        return;
                    }

                    openFormModal(sectionId);
                    return;
                }
            }

            // 2. Table Row Action: Xem chi tiết
            const viewBtn = e.target.closest('.btn-view-row, a[href="#"]:has(i.bi-eye), a.dropdown-item:contains("Xem")');
            if (viewBtn || (e.target.closest('.dropdown-item') && e.target.textContent.includes('Xem'))) {
                e.preventDefault();
                const row = e.target.closest('tr');
                if (row) openDetailModal(row);
                return;
            }

            // 3. Table Row Action: Duyệt / Phê duyệt
            if (e.target.closest('.btn-approve-row') || (e.target.closest('.dropdown-item') && e.target.textContent.includes('Duyệt'))) {
                e.preventDefault();
                const row = e.target.closest('tr');
                if (row) {
                    const badge = row.querySelector('.badge');
                    if (badge) {
                        badge.className = 'badge bg-success-subtle text-success';
                        badge.textContent = 'Đã duyệt';
                    }
                    if (window.notificationManager) {
                        window.notificationManager.playNotificationSound();
                    }
                    showToastSuccess('Bản ghi đã được phê duyệt thành công!');
                }
                return;
            }

            // 4. Table Row Action: Xóa
            if (e.target.closest('.btn-delete-row') || (e.target.closest('.dropdown-item') && e.target.textContent.includes('Xóa'))) {
                e.preventDefault();
                const row = e.target.closest('tr');
                if (row) {
                    if (confirm('Bạn có chắc chắn muốn xóa bản ghi này khỏi danh sách?')) {
                        row.style.transition = 'all 0.4s ease';
                        row.style.opacity = '0';
                        row.style.transform = 'translateX(20px)';
                        setTimeout(() => {
                            row.remove();
                            showToastSuccess('Đã xóa bản ghi thành công!');
                        }, 400);
                    }
                }
                return;
            }

            // 5. Table Row Action: Chỉnh sửa
            if (e.target.closest('.btn-edit-row') || (e.target.closest('.dropdown-item') && (e.target.textContent.includes('Sửa') || e.target.textContent.includes('Chỉnh sửa')))) {
                e.preventDefault();
                const row = e.target.closest('tr');
                if (row) {
                    const activeSection = row.closest('.page-section') || document.querySelector('.page-section.active');
                    const sectionId = activeSection ? activeSection.id.replace('page-', '') : 'orders';

                    // Pre-fill rough edit data
                    const cells = Array.from(row.querySelectorAll('td')).map(td => td.textContent.trim());
                    const editData = {
                        name: cells[1] || cells[0] || '',
                        customer: cells[1] || cells[2] || '',
                        title: cells[1] || '',
                        phone: cells[3] || cells[2] || '',
                        amount: (cells[3] || cells[4] || '').replace(/[^0-9]/g, ''),
                        package: cells[2] || ''
                    };
                    openFormModal(sectionId, editData, row);
                }
                return;
            }
        });
    });

    // Expose for external calls
    window.openFormModal = openFormModal;
    window.openDetailModal = openDetailModal;
})();
