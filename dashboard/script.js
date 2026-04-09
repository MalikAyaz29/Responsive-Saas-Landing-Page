document.addEventListener('DOMContentLoaded', () => {

    // 1. Sidebar Toggle Logic for Mobile
    const sidebar = document.querySelector('.sidebar');
    const toggleBtn = document.getElementById('sidebar-toggle');
    const closeBtn = document.getElementById('sidebar-close');

    if(toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            sidebar.classList.add('open');
        });
    }

    if(closeBtn) {
        closeBtn.addEventListener('click', () => {
            sidebar.classList.remove('open');
        });
    }

    // 2. Main Revenue Line Chart (Chart.js)
    const ctxRevenue = document.getElementById('revenueChart');
    
    if (ctxRevenue) {
        new Chart(ctxRevenue, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [{
                    label: 'Revenue ($)',
                    data: [45000, 52000, 48000, 61000, 59000, 75000, 82000, 78000, 91000, 85000, 105000, 124563],
                    borderColor: '#4f46e5', // Primary color
                    backgroundColor: 'rgba(79, 70, 229, 0.1)',
                    borderWidth: 3,
                    pointBackgroundColor: '#ffffff',
                    pointBorderColor: '#4f46e5',
                    pointBorderWidth: 2,
                    pointRadius: 4,
                    pointHoverRadius: 6,
                    fill: true,
                    tension: 0.4 // Smooth curves
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: '#0f172a',
                        padding: 12,
                        titleFont: { size: 13, family: 'Inter' },
                        bodyFont: { size: 14, family: 'Inter', weight: 'bold' },
                        displayColors: false,
                        callbacks: {
                            label: function(context) {
                                return '$' + context.parsed.y.toLocaleString();
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: { display: false },
                        ticks: { color: '#94a3b8', font: { family: 'Inter' } }
                    },
                    y: {
                        grid: { color: '#f1f5f9', drawBorder: false },
                        ticks: {
                            color: '#94a3b8',
                            font: { family: 'Inter' },
                            callback: function(value) {
                                if (value >= 1000) return '$' + value/1000 + 'k';
                                return '$' + value;
                            }
                        }
                    }
                }
            }
        });
    }

    // 3. Source Doughnut Chart
    const ctxSource = document.getElementById('sourceChart');
    
    if (ctxSource) {
        new Chart(ctxSource, {
            type: 'doughnut',
            data: {
                labels: ['Direct', 'Social', 'Referral', 'Organic'],
                datasets: [{
                    data: [45, 25, 20, 10],
                    backgroundColor: [
                        '#4f46e5', // Primary
                        '#0ea5e9', // Sky blue
                        '#10b981', // Success
                        '#f59e0b'  // Warning
                    ],
                    borderWidth: 0,
                    hoverOffset: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '75%',
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            usePointStyle: true,
                            pointStyle: 'circle',
                            font: { family: 'Inter', size: 12 },
                            color: '#475569'
                        }
                    },
                    tooltip: {
                        backgroundColor: '#0f172a',
                        bodyFont: { family: 'Inter' },
                        callbacks: {
                            label: function(context) {
                                return ' ' + context.label + ': ' + context.parsed + '%';
                            }
                        }
                    }
                }
            }
        });
    }
});
