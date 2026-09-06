/**
 * QUANGLOI Management System - Notification System
 * Handles push notifications with sound alerts for new orders
 */

class NotificationManager {
    constructor() {
        this.notifications = [];
        this.unreadCount = 0;
        this.soundEnabled = true;
        this.notifCountEl = document.getElementById('notifCount');
        this.notifListEl = document.getElementById('notificationList');
        this.notifSound = document.getElementById('notificationSound');
        this.newOrderBadge = document.getElementById('newOrderBadge');
        
        this.init();
    }

    init() {
        // Mark all read button
        const markAllBtn = document.getElementById('markAllRead');
        if (markAllBtn) {
            markAllBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.markAllAsRead();
            });
        }

        // Request browser notification permission
        if ('Notification' in window && Notification.permission === 'default') {
            Notification.requestPermission();
        }

        // Simulate new order notifications (for demo)
        this.startDemoNotifications();
    }

    /**
     * Add a new notification
     */
    addNotification(notification) {
        const notif = {
            id: Date.now(),
            title: notification.title || 'Thông báo',
            message: notification.message || '',
            type: notification.type || 'info', // info, order, warning, success
            icon: notification.icon || 'bi-bell',
            time: new Date(),
            read: false,
            data: notification.data || null
        };

        this.notifications.unshift(notif);
        this.unreadCount++;
        this.updateBadge();
        this.renderNotifications();

        // Play sound
        if (this.soundEnabled) {
            this.playNotificationSound();
        }

        // Show toast notification
        if (notification.showToast !== false) {
            this.showToast(notif);
        }

        // Show browser notification
        this.showBrowserNotification(notif);

        return notif;
    }

    /**
     * Play notification sound
     */
    playNotificationSound() {
        if (this.notifSound) {
            this.notifSound.currentTime = 0;
            this.notifSound.play().catch(err => {
                console.log('Sound autoplay blocked, using Web Audio fallback:', err);
                this.playBeep();
            });
        } else {
            // Fallback: use Web Audio API to generate a notification beep
            this.playBeep();
        }
    }

    /**
     * Generate a notification beep using Web Audio API (fallback)
     */
    playBeep() {
        try {
            const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            
            // First beep
            const osc1 = audioCtx.createOscillator();
            const gain1 = audioCtx.createGain();
            osc1.connect(gain1);
            gain1.connect(audioCtx.destination);
            osc1.frequency.value = 800;
            osc1.type = 'sine';
            gain1.gain.setValueAtTime(0.3, audioCtx.currentTime);
            gain1.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
            osc1.start(audioCtx.currentTime);
            osc1.stop(audioCtx.currentTime + 0.3);

            // Second beep (higher pitch)
            const osc2 = audioCtx.createOscillator();
            const gain2 = audioCtx.createGain();
            osc2.connect(gain2);
            gain2.connect(audioCtx.destination);
            osc2.frequency.value = 1000;
            osc2.type = 'sine';
            gain2.gain.setValueAtTime(0.3, audioCtx.currentTime + 0.15);
            gain2.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.45);
            osc2.start(audioCtx.currentTime + 0.15);
            osc2.stop(audioCtx.currentTime + 0.45);

            // Third beep (highest pitch)
            const osc3 = audioCtx.createOscillator();
            const gain3 = audioCtx.createGain();
            osc3.connect(gain3);
            gain3.connect(audioCtx.destination);
            osc3.frequency.value = 1200;
            osc3.type = 'sine';
            gain3.gain.setValueAtTime(0.3, audioCtx.currentTime + 0.3);
            gain3.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.6);
            osc3.start(audioCtx.currentTime + 0.3);
            osc3.stop(audioCtx.currentTime + 0.6);

        } catch (e) {
            console.log('Web Audio API not available:', e);
        }
    }

    /**
     * Show toast notification
     */
    showToast(notif) {
        const toastEl = document.getElementById('newOrderToast');
        if (!toastEl) return;

        const toastInfo = document.getElementById('toastOrderInfo');
        const toastDetail = document.getElementById('toastOrderDetail');

        if (toastInfo) toastInfo.textContent = notif.title;
        if (toastDetail) toastDetail.textContent = notif.message;

        const toast = new bootstrap.Toast(toastEl, { delay: 8000 });
        toast.show();
    }

    /**
     * Show browser notification
     */
    showBrowserNotification(notif) {
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification(notif.title, {
                body: notif.message,
                icon: '/assets/images/logo.png',
                badge: '/assets/images/logo.png',
                tag: 'order-' + notif.id,
                requireInteraction: true
            });
        }
    }

    /**
     * Update badge count
     */
    updateBadge() {
        if (this.notifCountEl) {
            if (this.unreadCount > 0) {
                this.notifCountEl.style.display = 'inline-block';
                this.notifCountEl.textContent = this.unreadCount > 99 ? '99+' : this.unreadCount;
            } else {
                this.notifCountEl.style.display = 'none';
            }
        }

        // Update order badge in sidebar
        if (this.newOrderBadge) {
            const pendingOrders = this.notifications.filter(n => n.type === 'order' && !n.read).length;
            if (pendingOrders > 0) {
                this.newOrderBadge.style.display = 'inline-block';
                this.newOrderBadge.textContent = pendingOrders;
            } else {
                this.newOrderBadge.style.display = 'none';
            }
        }

        // Update page title
        if (this.unreadCount > 0) {
            document.title = `(${this.unreadCount}) QUANGLOI - Hệ thống Quản lý`;
        } else {
            document.title = 'QUANGLOI - Hệ thống Quản lý Doanh nghiệp';
        }
    }

    /**
     * Render notification list in dropdown
     */
    renderNotifications() {
        if (!this.notifListEl) return;

        if (this.notifications.length === 0) {
            this.notifListEl.innerHTML = `
                <div class="notification-empty">
                    <i class="bi bi-bell-slash"></i>
                    <p>Không có thông báo mới</p>
                </div>
            `;
            return;
        }

        const html = this.notifications.slice(0, 10).map(notif => {
            const typeColors = {
                order: 'bg-primary-subtle text-primary',
                warning: 'bg-warning-subtle text-warning',
                success: 'bg-success-subtle text-success',
                info: 'bg-info-subtle text-info'
            };

            const colorClass = typeColors[notif.type] || typeColors.info;
            const timeAgo = this.getTimeAgo(notif.time);

            return `
                <div class="notification-item ${notif.read ? '' : 'unread'}" data-id="${notif.id}">
                    <div class="notif-icon ${colorClass}">
                        <i class="bi ${notif.icon}"></i>
                    </div>
                    <div class="notif-text">
                        <p><strong>${notif.title}</strong></p>
                        <p>${notif.message}</p>
                        <small>${timeAgo}</small>
                    </div>
                </div>
            `;
        }).join('');

        this.notifListEl.innerHTML = html;

        // Add click handlers
        this.notifListEl.querySelectorAll('.notification-item').forEach(item => {
            item.addEventListener('click', () => {
                const id = parseInt(item.getAttribute('data-id'));
                this.markAsRead(id);
            });
        });
    }

    /**
     * Mark single notification as read
     */
    markAsRead(id) {
        const notif = this.notifications.find(n => n.id === id);
        if (notif && !notif.read) {
            notif.read = true;
            this.unreadCount = Math.max(0, this.unreadCount - 1);
            this.updateBadge();
            this.renderNotifications();
        }
    }

    /**
     * Mark all notifications as read
     */
    markAllAsRead() {
        this.notifications.forEach(n => n.read = true);
        this.unreadCount = 0;
        this.updateBadge();
        this.renderNotifications();
    }

    /**
     * Get relative time string
     */
    getTimeAgo(date) {
        const now = new Date();
        const diff = Math.floor((now - date) / 1000);

        if (diff < 60) return 'Vừa xong';
        if (diff < 3600) return `${Math.floor(diff / 60)} phút trước`;
        if (diff < 86400) return `${Math.floor(diff / 3600)} giờ trước`;
        return `${Math.floor(diff / 86400)} ngày trước`;
    }

    /**
     * Toggle sound on/off
     */
    toggleSound() {
        this.soundEnabled = !this.soundEnabled;
        return this.soundEnabled;
    }

    /**
     * Demo: Simulate periodic new order notifications
     */
    startDemoNotifications() {
        const demoOrders = [
            { customer: 'Nguyễn Văn Thành', product: 'Camera IP Wifi x5', amount: '15,500,000đ' },
            { customer: 'Trần Hoàng Minh', product: 'Bộ Kit 8 Camera', amount: '42,000,000đ' },
            { customer: 'Lê Thị Hương', product: 'Hệ thống báo động', amount: '8,200,000đ' },
            { customer: 'Phạm Đức Hải', product: 'Đầu ghi hình 16 kênh', amount: '6,500,000đ' },
            { customer: 'Võ Minh Tuấn', product: 'Camera PTZ ngoài trời', amount: '22,800,000đ' },
        ];

        let orderCount = 157;

        // Simulate a new order every 30-60 seconds (for demo)
        const simulateNewOrder = () => {
            const randomOrder = demoOrders[Math.floor(Math.random() * demoOrders.length)];
            orderCount++;

            this.addNotification({
                title: `Đơn hàng mới #DH-${String(orderCount).padStart(5, '0')}`,
                message: `${randomOrder.customer} - ${randomOrder.product} - ${randomOrder.amount}`,
                type: 'order',
                icon: 'bi-receipt',
                data: {
                    orderId: `DH-${String(orderCount).padStart(5, '0')}`,
                    customer: randomOrder.customer,
                    product: randomOrder.product,
                    amount: randomOrder.amount
                }
            });

            // Schedule next notification (random 30-60 seconds)
            const nextDelay = 30000 + Math.random() * 30000;
            setTimeout(simulateNewOrder, nextDelay);
        };

        // Start first notification after 10 seconds
        setTimeout(simulateNewOrder, 10000);
    }
}

// Initialize notification manager
let notificationManager;
document.addEventListener('DOMContentLoaded', function() {
    notificationManager = new NotificationManager();
});

// Global functions for toast buttons
function viewNewOrder() {
    navigateToPage('orders');
}

function approveNewOrder() {
    const modal = new bootstrap.Modal(document.getElementById('approveOrderModal'));
    modal.show();
}
