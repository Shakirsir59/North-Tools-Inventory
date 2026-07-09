// 1. AAPKI INVENTORY KA TOTAL DATA (GRAPH KE LIYE)
const labels = ['Laptop', 'Sim', 'Mobile', 'Cable/Hub', 'Charger/Bag/CPE'];
const counts = [3, 4, 7, 2, 4]; // Aapki file ke actual counts
const colors = ['#8B5CF6', '#3B82F6', '#EC4899', '#84CC16', '#F59E0B'];

// Bar Chart Setup
new Chart(document.getElementById('barChart'), {
    type: 'bar',
    data: {
        labels: labels,
        datasets: [{ data: counts, backgroundColor: colors, barThickness: 22 }]
    },
    options: {
        responsive: true,
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true } }
    }
});

// Donut Chart Setup
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