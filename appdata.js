// 1. NORTH INVENTORY EXCEL DATA COUNTS
const labels = ['SIM Cards', 'Mobile Phones', 'Laptops', 'Chargers/Bags', 'Cables/Hubs/CPE'];
const counts = [18, 14, 7, 12, 10]; 
const colors = ['#3B82F6', '#EC4899', '#8B5CF6', '#F59E0B', '#10B981'];

// Bar Chart
new Chart(document.getElementById('barChart'), {
    type: 'bar',
    data: {
        labels: labels,
        datasets: [{ data: counts, backgroundColor: colors, barThickness: 25 }]
    },
    options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true } }
    }
});

// Donut Chart
new Chart(document.getElementById('donutChart'), {
    type: 'doughnut',
    data: {
        labels: labels,
        datasets: [{ data: counts, backgroundColor: colors }]
    },
    options: {
        responsive: true,
        plugins: { legend: { position: 'right' } },
        cutout: '70%'
    }
});