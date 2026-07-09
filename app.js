// INITIAL DATA FROM YOUR EXCEL SHEET
const defaultTeam = [
    { id: 1, name: "Majid Mubarak Mohammed", tools: "HP Z Book Laptop x1, Zain SIM x2, Ethernet Cable x1, HP Charger & Bag x1" },
    { id: 2, name: "Amer Mohammed", tools: "HP Z Book Laptop x1, Zain SIM x2, Charger & Bag x1" },
    { id: 3, name: "Yasir Nadeem", tools: "HP ProBook x1, Zain SIM x4, Huawei Mobile x3, Samsung S9 x2, Huawei CPE x1, USB Hub & Inverter x1" },
    { id: 4, name: "Saeed Iqbal", tools: "HP ProBook x1, Zain SIM x4, Huawei P40 x2, Samsung S22 x2, Mate 30 Pro x1, USB Hubs x1" },
    { id: 5, name: "Muhammad Sajawal", tools: "HP EliteBook x1, Zain SIM x4, Huawei P40 x2, Samsung S22 & S23 x2, USB Hubs & Inverter x1" },
    { id: 6, name: "Fuaad Alnakhli", tools: "HP EliteBook 840 x1, Zain SIM x1, Charger & Bag x1" },
    { id: 7, name: "Majed AlHarbi", tools: "HP EliteBook 840 x1, Zain SIM x1, HP Charger x1" }
];

// Load from LocalStorage or use default
let teamData = JSON.parse(localStorage.getItem('northTeamData')) || defaultTeam;
let editId = null;
let barChart, donutChart;

// Render Interface
function renderDashboard() {
    const grid = document.getElementById('teamGrid');
    grid.innerHTML = '';

    teamData.forEach(member => {
        const toolsArray = member.tools.split(',');
        let badgesHtml = '';
        
        toolsArray.forEach(t => {
            if(t.trim()) {
                badgesHtml += `<span class="bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-[10px] font-medium border border-gray-200">${t.trim()}</span>`;
            }
        });

        grid.innerHTML += `
            <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex flex-col justify-between">
                <div>
                    <div class="flex justify-between items-start mb-2">
                        <h4 class="font-bold text-gray-800 text-sm">${member.name}</h4>
                        <div class="flex gap-2">
                            <button onclick="editMember(${member.id})" class="text-blue-600 hover:text-blue-800 text-xs font-semibold cursor-pointer">Edit</button>
                            <button onclick="deleteMember(${member.id})" class="text-red-500 hover:text-red-700 text-xs font-semibold cursor-pointer">Del</button>
                        </div>
                    </div>
                    <div class="flex flex-wrap gap-1 mt-2">${badgesHtml}</div>
                </div>
            </div>
        `;
    });
    updateCharts();
}

// Modal Handlers
function showAddModal() {
    editId = null;
    document.getElementById('modalTitle').innerText = "Add New Team Member";
    document.getElementById('memberName').value = '';
    document.getElementById('memberTools').value = '';
    document.getElementById('memberModal').classList.remove('hidden');
}

function editMember(id) {
    editId = id;
    const member = teamData.find(m => m.id === id);
    document.getElementById('modalTitle').innerText = "Edit Tools - " + member.name;
    document.getElementById('memberName').value = member.name;
    document.getElementById('memberTools').value = member.tools;
    document.getElementById('memberModal').classList.remove('hidden');
}

function closeModal() {
    document.getElementById('memberModal').classList.add('hidden');
}

function saveMember() {
    const name = document.getElementById('memberName').value;
    const tools = document.getElementById('memberTools').value;

    if(!name || !tools) return alert("Please fill all fields");

    if(editId) {
        // Update existing
        const index = teamData.findIndex(m => m.id === editId);
        teamData[index].name = name;
        teamData[index].tools = tools;
    } else {
        // Add new
        teamData.push({ id: Date.now(), name, tools });
    }

    localStorage.setItem('northTeamData', JSON.stringify(teamData));
    closeModal();
    renderDashboard();
}

function deleteMember(id) {
    if(confirm("Are you sure you want to remove this member?")) {
        teamData = teamData.filter(m => m.id !== id);
        localStorage.setItem('northTeamData', JSON.stringify(teamData));
        renderDashboard();
    }
}

// Charts Dummy Dynamic Logic
function updateCharts() {
    const ctxBar = document.getElementById('barChart');
    const ctxDonut = document.getElementById('donutChart');

    if(barChart) barChart.destroy();
    if(donutChart) donutChart.destroy();

    // Auto calculate counts based on text analysis
    let simCount = (JSON.stringify(teamData).match(/SIM|Sim/g) || []).length * 2;
    let lapCount = (JSON.stringify(teamData).match(/Laptop|book|ProBook/g) || []).length;
    let mobCount = (JSON.stringify(teamData).match(/Mobile|Huawei|Samsung/g) || []).length;

    const dataValues = [simCount || 15, mobCount || 12, lapCount || 7, 10, 8];

    barChart = new Chart(ctxBar, {
        type: 'bar',
        data: {
            labels: ['SIM Cards', 'Mobiles', 'Laptops', 'Chargers', 'Cables'],
            datasets: [{ data: dataValues, backgroundColor: ['#3B82F6', '#EC4899', '#8B5CF6', '#F59E0B', '#10B981'], barThickness: 20 }]
        },
        options: { responsive: true, plugins: { legend: { display: false } } }
    });

    donutChart = new Chart(ctxDonut, {
        type: 'doughnut',
        data: {
            labels: ['SIM Cards', 'Mobiles', 'Laptops', 'Chargers', 'Cables'],
            datasets: [{ data: dataValues, backgroundColor: ['#3B82F6', '#EC4899', '#8B5CF6', '#F59E0B', '#10B981'] }]
        },
        options: { responsive: true, plugins: { legend: { position: 'right' } }, cutout: '70%' }
    });
}

// Start
window.onload = renderDashboard;