const labels = ['Mobile', 'USB Hub', 'Inverter', 'Cable', 'Laptop', 'SIM', 'Scanner'];
const counts = [15, 3, 3, 11, 7, 19, 1];
const colors = ['#8B5CF6', '#EC4899', '#F97316', '#84CC16', '#F59E0B', '#3B82F6', '#9CA3AF'];

// Bar Chart
new Chart(document.getElementById('barChart'), {
    type: 'bar',
    data: {
        labels: labels,
        datasets: [{ data: counts, backgroundColor: colors, barThickness: 20 }]
    },
    options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true, max: 20 } }
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
        plugins: { legend: { position: 'top' } },
        cutout: '70%'
    }
});