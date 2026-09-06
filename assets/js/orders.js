/**
 * QUANGLOI Management System - Order & Business Modules Manager
 * Handles order calculations, creation, approval workflow, sound notifications,
 * and CRUD modal forms for Customer, Equipment, and Products.
 */

class OrderManager {
    constructor() {
        this.orders = [];
        this.orderCounter = 156;
        this.productPrices = {
            'cam-ip-wifi': { name: 'Camera IP Wifi Hikvision 2MP', price: 3100000 },
            'cam-ptz': { name: 'Camera PTZ ngoài trời Dahua 4MP', price: 4500000 },
            'dau-ghi-8': { name: 'Đầu ghi hình 8 kênh PoE Hikvision', price: 3200000 },
            'dau-ghi-16': { name: 'Đầu ghi hình 16 kênh 4K', price: 6500000 },
            'kit-4cam': { name: 'Bộ Kit 4 Camera IP Full HD', price: 12000000 },
            'kit-8cam': { name: 'Bộ Kit 8 Camera 4MP AI', price: 22000000 },
            'bao-dong': { name: 'Hệ thống báo động thông minh không dây', price: 8200000 }
        };

        this.customers = [
            { id: 'KH-00001', name: 'Lý Thành Luân', contact: 'Anh Luân', phone: '0905556677', email: 'luan.ly@hotmail.com', address: 'Quận Bình Thạnh, TP. HCM' },
            { id: 'KH-00002', name: 'Đinh Thị Hằng', contact: 'Chị Hằng', phone: '0990123456', email: 'hang.dinh@hangphat.vn', address: 'Quận Gò Vấp, TP. HCM' },
            { id: 'KH-00003', name: 'Ngô Văn Phúc', contact: 'Anh Phúc', phone: '0989012345', email: 'phuc.ngo@gmail.com', address: 'Quận Phú Nhuận, TP. HCM' },
            { id: 'KH-00004', name: 'Nguyễn Văn Thành', contact: 'Anh Thành', phone: '0901234567', email: 'thanh.nv@gmail.com', address: '128 Lê Văn Việt, TP. Thủ Đức' },
            { id: 'KH-00005', name: 'Trần Hoàng Minh', contact: 'Anh Minh', phone: '0912345678', email: 'minh.th@vinapro.vn', address: 'Tòa nhà Landmark 81, Bình Thạnh' },
            { id: 'KH-00006', name: 'Lê Văn Phước', contact: 'Anh Phước', phone: '0923456789', email: 'phuoc.le@saigoncorp.com', address: '45 Nguyễn Huệ, Quận 1, TP. HCM' }
        ];

        this.init();
    }

    init() {
        // Quick Action button in header
        const btnCreateOrder = document.getElementById('btnCreateOrder');
        if (btnCreateOrder) {
            btnCreateOrder.addEventListener('click', () => {
                const modal = new bootstrap.Modal(document.getElementById('createOrderModal'));
                modal.show();
            });
        }

        // Add order item line
        const addItemBtn = document.getElementById('addOrderItem');
        if (addItemBtn) {
            addItemBtn.addEventListener('click', () => this.addOrderItemRow());
        }

        // Submit order
        const submitBtn = document.getElementById('submitOrder');
        if (submitBtn) {
            submitBtn.addEventListener('click', () => this.submitOrder());
        }

        // Setup customer dropdown in order modal
        this.setupCustomerSelect();

        // Setup calculation listeners on the initial order row
        this.setupItemCalculations();

        // Setup other modals (Customer, Equipment, Product)
        this.setupExtraModals();

        // Setup table action buttons (Approve, View, etc.)
        this.bindTableActions();
    }

    /**
     * Populate customer select inside createOrderModal
     */
    setupCustomerSelect() {
        const modal = document.getElementById('createOrderModal');
        if (!modal) return;

        const custSelect = modal.querySelector('select[required]');
        if (custSelect) {
            custSelect.innerHTML = '<option value="">-- Chọn khách hàng --</option>' +
                this.customers.map(c => `<option value="${c.id}">${c.name} - ${c.phone}</option>`).join('');

            custSelect.addEventListener('change', (e) => {
                const selected = this.customers.find(c => c.id === e.target.value);
                if (selected) {
                    const inputs = modal.querySelectorAll('.card:first-child input');
                    if (inputs[0]) inputs[0].value = selected.contact;
                    if (inputs[1]) inputs[1].value = selected.phone;
                    if (inputs[2]) inputs[2].value = selected.email;
                    if (inputs[3]) inputs[3].value = selected.address;
                }
            });
        }
    }

    /**
     * Add product item row to order form
     */
    addOrderItemRow() {
        const table = document.getElementById('orderItemsTable');
        if (!table) return;

        const rowCount = table.rows.length + 1;
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${rowCount}</td>
            <td>
                <select class="form-select form-select-sm product-select">
                    <option value="">-- Chọn sản phẩm --</option>
                    <option value="cam-ip-wifi">Camera IP Wifi Hikvision - 3,100,000đ</option>
                    <option value="cam-ptz">Camera PTZ ngoài trời Dahua - 4,500,000đ</option>
                    <option value="dau-ghi-8">Đầu ghi hình 8 kênh PoE - 3,200,000đ</option>
                    <option value="dau-ghi-16">Đầu ghi hình 16 kênh 4K - 6,500,000đ</option>
                    <option value="kit-4cam">Bộ Kit 4 Camera IP Full HD - 12,000,000đ</option>
                    <option value="kit-8cam">Bộ Kit 8 Camera 4MP AI - 22,000,000đ</option>
                    <option value="bao-dong">Hệ thống báo động thông minh - 8,200,000đ</option>
                </select>
            </td>
            <td><input type="number" class="form-control form-control-sm qty-input" value="1" min="1"></td>
            <td><input type="text" class="form-control form-control-sm price-input" value="0"></td>
            <td><input type="number" class="form-control form-control-sm discount-input" value="0" min="0" max="100"></td>
            <td>
                <select class="form-select form-select-sm vat-select">
                    <option value="10">10%</option>
                    <option value="8">8%</option>
                    <option value="0">0%</option>
                </select>
            </td>
            <td class="fw-bold text-end row-total">0đ</td>
            <td><button type="button" class="btn btn-sm btn-outline-danger btn-remove-row"><i class="bi bi-trash"></i></button></td>
        `;
        table.appendChild(newRow);
        this.bindRowEvents(newRow);
    }

    /**
     * Attach calculation events to inputs in a row
     */
    bindRowEvents(row) {
        const prodSelect = row.querySelector('.product-select') || row.querySelector('select:first-of-type');
        const qtyInput = row.querySelector('.qty-input') || row.querySelector('input[type="number"]');
        const priceInput = row.querySelector('.price-input') || row.querySelectorAll('input')[1];
        const discountInput = row.querySelector('.discount-input') || row.querySelectorAll('input')[2];
        const vatSelect = row.querySelector('.vat-select') || row.querySelectorAll('select')[1];
        const totalCell = row.querySelector('.row-total') || row.querySelector('td.text-end');
        const removeBtn = row.querySelector('.btn-remove-row') || row.querySelector('button.btn-outline-danger');

        if (prodSelect) {
            prodSelect.addEventListener('change', () => {
                const prodKey = prodSelect.value;
                if (this.productPrices[prodKey]) {
                    if (priceInput) priceInput.value = this.productPrices[prodKey].price.toLocaleString('vi-VN');
                }
                this.calculateRow(row);
            });
        }

        [qtyInput, priceInput, discountInput, vatSelect].forEach(el => {
            if (el) el.addEventListener('input', () => this.calculateRow(row));
        });

        if (removeBtn) {
            removeBtn.addEventListener('click', () => {
                row.remove();
                this.calculateAll();
            });
        }
    }

    setupItemCalculations() {
        const table = document.getElementById('orderItemsTable');
        if (!table) return;

        const rows = table.querySelectorAll('tr');
        rows.forEach(r => this.bindRowEvents(r));
    }

    calculateRow(row) {
        const qty = parseFloat(row.querySelector('input[type="number"]')?.value) || 1;
        const priceStr = (row.querySelectorAll('input')[1]?.value || '0').replace(/[^0-9]/g, '');
        const price = parseFloat(priceStr) || 0;
        const discountStr = (row.querySelectorAll('input')[2]?.value || '0').replace(/[^0-9.]/g, '');
        const discount = parseFloat(discountStr) || 0;
        const vatStr = row.querySelectorAll('select')[1]?.value || '10';
        const vat = parseFloat(vatStr) || 0;

        const subtotal = qty * price;
        const afterDiscount = subtotal * (1 - discount / 100);
        const total = afterDiscount * (1 + vat / 100);

        const totalCell = row.querySelector('td.text-end');
        if (totalCell) {
            totalCell.textContent = Math.round(total).toLocaleString('vi-VN') + 'đ';
            totalCell.dataset.val = total;
            totalCell.dataset.subtotal = subtotal;
            totalCell.dataset.discount = subtotal - afterDiscount;
            totalCell.dataset.vat = total - afterDiscount;
        }

        this.calculateAll();
    }

    calculateAll() {
        const table = document.getElementById('orderItemsTable');
        if (!table) return;

        let totalSubtotal = 0;
        let totalDiscount = 0;
        let totalVat = 0;
        let grandTotal = 0;

        table.querySelectorAll('tr').forEach(r => {
            const cell = r.querySelector('td.text-end');
            if (cell && cell.dataset.val) {
                totalSubtotal += parseFloat(cell.dataset.subtotal || 0);
                totalDiscount += parseFloat(cell.dataset.discount || 0);
                totalVat += parseFloat(cell.dataset.vat || 0);
                grandTotal += parseFloat(cell.dataset.val || 0);
            }
        });

        const summaryBox = document.querySelector('.order-summary');
        if (summaryBox) {
            const rows = summaryBox.querySelectorAll('.summary-row span:last-child');
            if (rows[0]) rows[0].textContent = Math.round(totalSubtotal).toLocaleString('vi-VN') + 'đ';
            if (rows[1]) rows[1].textContent = '-' + Math.round(totalDiscount).toLocaleString('vi-VN') + 'đ';
            if (rows[2]) rows[2].textContent = Math.round(totalVat).toLocaleString('vi-VN') + 'đ';
            if (rows[3]) rows[3].textContent = Math.round(grandTotal).toLocaleString('vi-VN') + 'đ';
        }

        return grandTotal;
    }

    /**
     * Submit new order and add to tables
     */
    submitOrder() {
        this.orderCounter++;
        const orderId = `DH-${String(this.orderCounter).padStart(5, '0')}`;

        // Get customer info
        const modal = document.getElementById('createOrderModal');
        const custSelect = modal?.querySelector('select[required]');
        const custName = custSelect?.options[custSelect.selectedIndex]?.text?.split(' - ')[0] || 'Khách hàng mới';
        const phone = modal?.querySelectorAll('.card:first-child input')[1]?.value || '0901.234.567';

        // Get product info
        const firstProdSelect = modal?.querySelector('#orderItemsTable select');
        const prodName = firstProdSelect?.options[firstProdSelect.selectedIndex]?.text?.split(' - ')[0] || 'Camera IP Wifi';

        // Get total amount
        const grandTotal = this.calculateAll() || 15500000;
        const formattedAmount = Math.round(grandTotal).toLocaleString('vi-VN') + 'đ';

        // Close modal
        const bsModal = bootstrap.Modal.getInstance(modal);
        if (bsModal) bsModal.hide();

        // 1. Prepend to Recent Orders on Dashboard
        const recentTable = document.getElementById('recentOrdersTable');
        if (recentTable) {
            const newRecentRow = document.createElement('tr');
            newRecentRow.innerHTML = `
                <td><a href="#orders" class="text-primary fw-bold">#${orderId}</a></td>
                <td>
                    <div class="d-flex align-items-center">
                        <div class="avatar-sm bg-warning-subtle rounded-circle me-2 d-flex align-items-center justify-content-center">
                            <span class="text-warning">${custName.slice(0, 2).toUpperCase()}</span>
                        </div>
                        ${custName}
                    </div>
                </td>
                <td>${prodName}</td>
                <td class="fw-bold">${formattedAmount}</td>
                <td><span class="badge bg-warning-subtle text-warning">Chờ duyệt</span></td>
                <td>Vừa xong</td>
                <td>
                    <div class="dropdown">
                        <button class="btn btn-sm btn-outline-secondary" data-bs-toggle="dropdown">
                            <i class="bi bi-three-dots-vertical"></i>
                        </button>
                        <div class="dropdown-menu">
                            <a class="dropdown-item" href="#"><i class="bi bi-eye"></i> Xem chi tiết</a>
                            <a class="dropdown-item btn-quick-approve" href="#" data-id="${orderId}"><i class="bi bi-check-circle text-success"></i> Duyệt đơn</a>
                            <a class="dropdown-item" href="#"><i class="bi bi-printer"></i> In đơn</a>
                        </div>
                    </div>
                </td>
            `;
            recentTable.insertBefore(newRecentRow, recentTable.firstChild);
        }

        // 2. Prepend to Orders Table on page-orders
        const ordersTable = document.querySelector('#page-orders .data-table tbody');
        if (ordersTable) {
            const newOrderRow = document.createElement('tr');
            newOrderRow.innerHTML = `
                <td><input type="checkbox" class="form-check-input"></td>
                <td><a href="#" class="text-primary fw-bold">#${orderId}</a></td>
                <td>
                    <div class="d-flex align-items-center">
                        <div class="avatar-sm bg-warning-subtle rounded-circle me-2 d-flex align-items-center justify-content-center">
                            <span class="text-warning">${custName.slice(0, 2).toUpperCase()}</span>
                        </div>
                        ${custName}
                    </div>
                </td>
                <td>${phone}</td>
                <td>${prodName}</td>
                <td class="fw-bold">${formattedAmount}</td>
                <td><span class="badge bg-warning-subtle text-warning">Chờ duyệt</span></td>
                <td>06/09/2026</td>
                <td>Admin</td>
                <td>
                    <div class="dropdown">
                        <button class="btn btn-sm btn-outline-secondary" data-bs-toggle="dropdown">
                            <i class="bi bi-three-dots-vertical"></i>
                        </button>
                        <div class="dropdown-menu dropdown-menu-end">
                            <a class="dropdown-item" href="#"><i class="bi bi-eye"></i> Xem</a>
                            <a class="dropdown-item btn-quick-approve" href="#" data-id="${orderId}"><i class="bi bi-check-circle text-success"></i> Duyệt</a>
                            <a class="dropdown-item" href="#"><i class="bi bi-printer"></i> In</a>
                        </div>
                    </div>
                </td>
            `;
            ordersTable.insertBefore(newOrderRow, ordersTable.firstChild);
        }

        // 3. Update Dashboard Stats Counters
        const totalOrdersEl = document.getElementById('totalOrders');
        if (totalOrdersEl) {
            totalOrdersEl.textContent = this.orderCounter;
        }

        // 4. Trigger Real Sound & Toast Notification
        if (window.notificationManager) {
            window.notificationManager.addNotification({
                title: `Đơn hàng mới #${orderId}`,
                message: `${custName} - ${prodName} (${formattedAmount})`,
                type: 'order',
                icon: 'bi-receipt',
                data: { orderId, customer: custName, product: prodName, amount: formattedAmount }
            });
        }

        this.showAlert('success', `Đã tạo thành công đơn hàng #${orderId} - Trạng thái: Chờ duyệt!`);
        this.bindTableActions();
    }

    /**
     * Bind actions on table buttons (e.g. Duyệt đơn)
     */
    bindTableActions() {
        document.querySelectorAll('.btn-quick-approve').forEach(btn => {
            btn.onclick = (e) => {
                e.preventDefault();
                const id = btn.getAttribute('data-id') || 'DH-00156';
                this.approveOrder(id);
            };
        });
    }

    /**
     * Approve order and update badge
     */
    approveOrder(orderId) {
        // Update all badges for this order in tables
        document.querySelectorAll(`tr`).forEach(row => {
            if (row.textContent.includes(orderId)) {
                const badge = row.querySelector('.badge');
                if (badge) {
                    badge.className = 'badge bg-success-subtle text-success';
                    badge.textContent = 'Đã duyệt';
                }
            }
        });

        // Hide approval modal if open
        const approveModal = document.getElementById('approveOrderModal');
        if (approveModal) {
            const bs = bootstrap.Modal.getInstance(approveModal);
            if (bs) bs.hide();
        }

        this.showAlert('success', `Đơn hàng #${orderId} đã được phê duyệt thành công!`);

        if (window.notificationManager) {
            window.notificationManager.addNotification({
                title: `Đơn hàng #${orderId} đã duyệt`,
                message: `Đơn hàng đã được duyệt và chuyển sang phân hệ Kỹ thuật/Giao hàng.`,
                type: 'success',
                icon: 'bi-check-circle',
                showToast: true
            });
        }
    }

    /**
     * Extra Modals: Customer, Equipment, Product
     */
    setupExtraModals() {
        // Customer Modal
        const custModal = document.getElementById('createCustomerModal');
        if (custModal) {
            const saveBtn = custModal.querySelector('.modal-footer .btn-primary');
            if (saveBtn) {
                saveBtn.addEventListener('click', () => {
                    const inputs = custModal.querySelectorAll('input');
                    const name = inputs[0]?.value || 'Khách hàng mới';
                    const company = inputs[1]?.value || 'Cá nhân';
                    const phone = inputs[2]?.value || '0901.888.999';
                    const email = inputs[3]?.value || 'contact@khachhang.com';
                    const address = custModal.querySelector('textarea')?.value || 'TP. Hồ Chí Minh';

                    const table = document.querySelector('#page-contacts .data-table tbody');
                    if (table) {
                        const newRow = document.createElement('tr');
                        newRow.innerHTML = `
                            <td><input type="checkbox" class="form-check-input"></td>
                            <td><a href="#" class="fw-bold">KH-${Math.floor(10000 + Math.random() * 90000)}</a></td>
                            <td>${name}</td>
                            <td>${company}</td>
                            <td>${phone}</td>
                            <td>${email}</td>
                            <td>${address}</td>
                            <td><span class="badge bg-info">Tiềm năng</span></td>
                            <td>
                                <button class="btn btn-sm btn-outline-secondary"><i class="bi bi-pencil"></i></button>
                            </td>
                        `;
                        table.insertBefore(newRow, table.firstChild);
                    }

                    bootstrap.Modal.getInstance(custModal)?.hide();
                    this.showAlert('success', `Đã thêm khách hàng: ${name}`);
                });
            }
        }

        // Equipment Modal
        const equipModal = document.getElementById('createEquipmentModal');
        if (equipModal) {
            const saveBtn = equipModal.querySelector('.modal-footer .btn-primary') || equipModal.querySelector('.modal-footer .btn-info');
            if (saveBtn) {
                saveBtn.addEventListener('click', () => {
                    const inputs = equipModal.querySelectorAll('input');
                    const name = inputs[0]?.value || 'Thiết bị mới';
                    const serial = inputs[1]?.value || `SN-${Math.floor(10000000 + Math.random() * 90000000)}`;

                    const table = document.querySelector('#page-equipment .data-table tbody');
                    if (table) {
                        const newRow = document.createElement('tr');
                        newRow.innerHTML = `
                            <td><input type="checkbox" class="form-check-input"></td>
                            <td><a href="#" class="fw-bold">TB-${Math.floor(1000 + Math.random() * 9000)}</a></td>
                            <td>${name}</td>
                            <td>Camera</td>
                            <td><code>${serial}</code></td>
                            <td>Lý Thành Luân</td>
                            <td>Quận 1, TP. HCM</td>
                            <td><span class="badge bg-success">Hoạt động</span></td>
                            <td>12 tháng</td>
                            <td><button class="btn btn-sm btn-outline-secondary"><i class="bi bi-gear"></i></button></td>
                        `;
                        table.insertBefore(newRow, table.firstChild);
                    }

                    bootstrap.Modal.getInstance(equipModal)?.hide();
                    this.showAlert('success', `Đã thêm thiết bị: ${name}`);
                });
            }
        }

        // Product Modal
        const prodModal = document.getElementById('createProductModal');
        if (prodModal) {
            const saveBtn = prodModal.querySelector('.modal-footer .btn-primary') || prodModal.querySelector('.modal-footer .btn-success');
            if (saveBtn) {
                saveBtn.addEventListener('click', () => {
                    const inputs = prodModal.querySelectorAll('input');
                    const name = inputs[0]?.value || 'Sản phẩm mới';
                    const code = inputs[1]?.value || `SP-${Math.floor(1000 + Math.random() * 9000)}`;
                    const price = inputs[2]?.value || '2,500,000đ';

                    const table = document.querySelector('#page-products .data-table tbody');
                    if (table) {
                        const newRow = document.createElement('tr');
                        newRow.innerHTML = `
                            <td><input type="checkbox" class="form-check-input"></td>
                            <td><div class="bg-light rounded d-flex align-items-center justify-content-center" style="width:36px;height:36px"><i class="bi bi-box text-primary"></i></div></td>
                            <td><a href="#" class="fw-bold">${code}</a></td>
                            <td>${name}</td>
                            <td>Thiết bị an ninh</td>
                            <td class="fw-bold text-primary">${price}</td>
                            <td>50</td>
                            <td>Bộ</td>
                            <td><span class="badge bg-success">Đang bán</span></td>
                            <td><button class="btn btn-sm btn-outline-secondary"><i class="bi bi-pencil"></i></button></td>
                        `;
                        table.insertBefore(newRow, table.firstChild);
                    }

                    bootstrap.Modal.getInstance(prodModal)?.hide();
                    this.showAlert('success', `Đã thêm sản phẩm: ${name}`);
                });
            }
        }
    }

    /**
     * Show toast alert
     */
    showAlert(type, message) {
        const alertHtml = `
            <div class="alert alert-${type} alert-dismissible fade show position-fixed" 
                 style="top:80px; right:24px; z-index:9999; max-width:420px; box-shadow: 0 8px 24px rgba(0,0,0,0.15); border-radius: 10px;">
                <i class="bi bi-${type === 'success' ? 'check-circle-fill' : type === 'warning' ? 'exclamation-triangle-fill' : 'info-circle-fill'} me-2"></i>
                ${message}
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', alertHtml);

        setTimeout(() => {
            const alert = document.body.querySelector('.alert.position-fixed');
            if (alert) alert.remove();
        }, 5000);
    }
}

// Global initialization
let orderManager;
document.addEventListener('DOMContentLoaded', function() {
    orderManager = new OrderManager();
});
