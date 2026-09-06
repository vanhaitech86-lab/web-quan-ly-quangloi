/**
 * QUANGLOI Management System - Dashboard Charts
 * Initialize and render dashboard charts using Chart.js
 */

document.addEventListener('DOMContentLoaded', function () {
    initRevenueChart();
    initOrderStatusChart();
});

/**
 * Revenue / Sales Chart (Line + Bar)
 */
function initRevenueChart() {
    const ctx = document.getElementById('revenueChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
            datasets: [
                {
                    label: 'Doanh thu (triệu VNĐ)',
                    data: [180, 220, 195, 280, 310, 350, 290, 320, 380, 420, 390, 450],
                    backgroundColor: 'rgba(37, 99, 235, 0.8)',
                    borderColor: '#2563eb',
                    borderWidth: 1,
                    borderRadius: 6,
                    maxBarThickness: 40,
                },
                {
                    label: 'Chi phí (triệu VNĐ)',
                    data: [120, 150, 130, 180, 200, 220, 190, 210, 240, 260, 250, 280],
                    backgroundColor: 'rgba(239, 68, 68, 0.3)',
                    borderColor: '#ef4444',
                    borderWidth: 1,
                    borderRadius: 6,
                    maxBarThickness: 40,
                },
                {
                    label: 'Lợi nhuận (triệu VNĐ)',
                    type: 'line',
                    data: [60, 70, 65, 100, 110, 130, 100, 110, 140, 160, 140, 170],
                    borderColor: '#22c55e',
                    backgroundColor: 'rgba(34, 197, 94, 0.1)',
                    borderWidth: 2,
                    pointBackgroundColor: '#22c55e',
                    pointRadius: 4,
                    fill: true,
                    tension: 0.4,
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                mode: 'index',
                intersect: false,
            },
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        padding: 16,
                        font: { size: 12, family: 'Inter' }
                    }
                },
                tooltip: {
                    backgroundColor: '#1e293b',
                    padding: 12,
                    cornerRadius: 8,
                    titleFont: { size: 13, family: 'Inter' },
                    bodyFont: { size: 12, family: 'Inter' },
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.parsed.y.toLocaleString('vi-VN') + ' triệu';
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: { display: false },
                    ticks: { font: { size: 12, family: 'Inter' } }
                },
                y: {
                    beginAtZero: true,
                    grid: { color: 'rgba(0,0,0,0.05)' },
                    ticks: {
                        font: { size: 11, family: 'Inter' },
                        callback: function(value) {
                            return value + 'tr';
                        }
                    }
                }
            }
        }
    });
}

/**
 * Order Status Doughnut Chart
 */
function initOrderStatusChart() {
    const ctx = document.getElementById('orderStatusChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Hoàn thành', 'Đang xử lý', 'Chờ duyệt', 'Đã hủy'],
            datasets: [{
                data: [65, 20, 10, 5],
                backgroundColor: [
                    '#22c55e',
                    '#f59e0b',
                    '#06b6d4',
                    '#ef4444'
                ],
                borderWidth: 0,
                hoverOffset: 8,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '65%',
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: '#1e293b',
                    padding: 12,
                    cornerRadius: 8,
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.parsed + '%';
                        }
                    }
                }
            }
        }
    });
}
