/**
 * QUANGLOI Management System - Main Application
 * Global initialization, preloader, and utility functions
 */

document.addEventListener('DOMContentLoaded', function () {
    
    // ---- Hide preloader ----
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('loaded');
            setTimeout(() => preloader.remove(), 500);
        }, 800);
    }

    // ---- Handle URL hash navigation ----
    const hash = window.location.hash.replace('#', '');
    if (hash) {
        navigateToPage(hash);
    }

    // ---- Global Search ----
    const globalSearch = document.getElementById('globalSearch');
    if (globalSearch) {
        let searchTimeout;
        globalSearch.addEventListener('input', function() {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                const query = this.value.trim();
                if (query.length >= 2) {
                    performGlobalSearch(query);
                }
            }, 300);
        });
    }

    // ---- Tooltips initialization ----
    const tooltips = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltips.forEach(el => new bootstrap.Tooltip(el));

    // ---- Keyboard shortcuts ----
    document.addEventListener('keydown', function(e) {
        // Ctrl+K = Focus search
        if (e.ctrlKey && e.key === 'k') {
            e.preventDefault();
            const search = document.getElementById('globalSearch');
            if (search) search.focus();
        }
        // Ctrl+N = Create new order
        if (e.ctrlKey && e.key === 'n') {
            e.preventDefault();
            const modal = new bootstrap.Modal(document.getElementById('createOrderModal'));
            modal.show();
        }
    });

    console.log('🚀 QUANGLOI Management System - Initialized');
    console.log('📋 Keyboard shortcuts: Ctrl+K (Search), Ctrl+N (New Order)');
});

/**
 * Global search function
 */
function performGlobalSearch(query) {
    console.log('Searching for:', query);
    // TODO: Implement search across all modules
    // This would call an API endpoint in production
}

/**
 * Format currency VNĐ
 */
function formatCurrency(amount) {
    return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        maximumFractionDigits: 0
    }).format(amount);
}

/**
 * Format date to Vietnamese locale
 */
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

/**
 * Show confirmation dialog
 */
function confirmAction(message, callback) {
    if (confirm(message)) {
        callback();
    }
}

/**
 * Export table to Excel (basic CSV)
 */
function exportTableToCSV(tableSelector, filename) {
    const table = document.querySelector(tableSelector);
    if (!table) return;

    let csv = [];
    const rows = table.querySelectorAll('tr');

    rows.forEach(row => {
        const cols = row.querySelectorAll('td, th');
        const rowData = [];
        cols.forEach(col => {
            rowData.push('"' + col.innerText.replace(/"/g, '""') + '"');
        });
        csv.push(rowData.join(','));
    });

    const csvContent = '\uFEFF' + csv.join('\n'); // BOM for UTF-8
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename || 'export.csv';
    link.click();
}

/**
 * Print page section
 */
function printSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <html>
        <head>
            <title>In - QUANGLOI</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
            <style>body { padding: 20px; font-family: Inter, sans-serif; }</style>
        </head>
        <body>${section.innerHTML}</body>
        </html>
    `);
    printWindow.document.close();
    printWindow.print();
}
