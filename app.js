// EXCEL SHEET SE HAR MEMBER KA ACTUAL DATA WITH SERIAL / IMEI / NUMBER
const defaultTeam = [
    {
        id: 1,
        name: "Majid Mubarak Mohammed",
        tools: [
            { type: "Laptop", name: "HP Z Book", serial: "5CG2421T3F" },
            { type: "Ethernet Cable", name: "Type C ROHS", serial: "0" },
            { type: "Laptop Charger", name: "HP Charger", serial: "4CH24205WL" },
            { type: "Laptop Bag", name: "HP Bag", serial: "N/A" },
            { type: "SIM", name: "Zain SIM", serial: "592446843" },
            { type: "SIM", name: "Zain SIM", serial: "592448980" }
        ]
    },
    {
        id: 2,
        name: "Amer Mohammed",
        tools: [
            { type: "Laptop", name: "HP Z Book", serial: "5CG2421T85" },
            { type: "Laptop Charger", name: "65W Charger", serial: "N/A" },
            { type: "Laptop Bag", name: "HP Bag", serial: "N/A" },
            { type: "SIM", name: "Zain SIM", serial: "592446758" },
            { type: "SIM", name: "Zain SIM", serial: "592448050" }
        ]
    },
    {
        id: 3,
        name: "Yasir Nadeem",
        tools: [
            { type: "Laptop", name: "HP PROBOOK", serial: "N/A" },
            { type: "Laptop Charger", name: "Charger", serial: "N/A" },
            { type: "Inverter", name: "Car Inverter", serial: "N/A" },
            { type: "SIM", name: "Zain SIM", serial: "592446789" },
            { type: "SIM", name: "Zain SIM", serial: "592448903" },
            { type: "SIM", name: "Zain SIM", serial: "580174700" },
            { type: "SIM", name: "Zain SIM", serial: "592446967" },
            { type: "USB Hub", name: "USB Anker", serial: "N/A" },
            { type: "USB Hub", name: "USB HUB Kingston", serial: "N/A" },
            { type: "Mobile", name: "Huawei P40", serial: "868924051337642" },
            { type: "Mobile", name: "Huawei P40", serial: "868924051342642" },
            { type: "Mobile", name: "Huawei P40", serial: "N/A" },
            { type: "Mobile", name: "Samsung S9", serial: "N/A" },
            { type: "Mobile", name: "Samsung S9", serial: "N/A" },
            { type: "Huawei CPE", name: "Huawei CPE", serial: "N/A" }
        ]
    },
    {
        id: 4,
        name: "Saeed Iqbal",
        tools: [
            { type: "Mobile", name: "Huawei P40", serial: "N/A" },
            { type: "Mobile", name: "Huawei P40", serial: "N/A" },
            { type: "Mobile", name: "Samsung S22", serial: "N/A" },
            { type: "Mobile", name: "Samsung S22", serial: "N/A" },
            { type: "Mobile", name: "Huawei Mate 30 Pro", serial: "N/A" },
            { type: "Laptop", name: "HP PROBOOK", serial: "N/A" },
            { type: "SIM", name: "Zain SIM", serial: "592448269" },
            { type: "SIM", name: "Zain SIM", serial: "592446971" },
            { type: "SIM", name: "Zain SIM", serial: "592446902" },
            { type: "SIM", name: "Zain SIM", serial: "592446981" },
            { type: "USB Hub", name: "USB HUB Kensington", serial: "N/A" },
            { type: "USB Hub", name: "USB Anker", serial: "N/A" },
            { type: "Laptop Charger", name: "Charger", serial: "N/A" },
            { type: "Laptop Bag", name: "HP Bag", serial: "N/A" }
        ]
    },
    {
        id: 5,
        name: "Muhammad Sajawal",
        tools: [
            { type: "Laptop", name: "HP Elite book", serial: "5CG0462CY2" },
            { type: "Laptop Charger", name: "Charger", serial: "N/A" },
            { type: "Inverter", name: "Car Inverter", serial: "N/A" },
            { type: "SIM", name: "Zain SIM", serial: "592448818" },
            { type: "SIM", name: "Zain SIM", serial: "592449627" },
            { type: "SIM", name: "Zain SIM", serial: "592448924" },
            { type: "SIM", name: "Zain SIM", serial: "592446963" },
            { type: "USB Hub", name: "USB HUB Kensington", serial: "N/A" },
            { type: "USB Hub", name: "USB Anker", serial: "N/A" },
            { type: "Mobile", name: "Huawei P40", serial: "N/A" },
            { type: "Mobile", name: "Huawei P40", serial: "N/A" },
            { type: "Mobile", name: "Samsung S22", serial: "N/A" },
            { type: "Mobile", name: "Samsung S23", serial: "N/A" },
            { type: "Laptop Bag", name: "HP Bag", serial: "N/A" }
        ]
    },
    {
        id: 6,
        name: "Fuaad Alnakhli",
        tools: [
            { type: "SIM", name: "Zain SIM", serial: "966592446849" },
            { type: "Laptop Charger", name: "65W Charger", serial: "N/A" },
            { type: "Laptop Bag", name: "HP Bag", serial: "N/A" },
            { type: "Laptop", name: "HP Elite book 840 G8", serial: "5CG2138VYF" }
        ]
    },
    {
        id: 7,
        name: "Majed AlHarbi",
        tools: [
            { type: "Laptop", name: "HP Elite book 840 G8", serial: "5CG2138WDS" },
            { type: "Laptop Charger", name: "65W Charger", serial: "N/A" },
            { type: "SIM", name: "Zain SIM", serial: "966592448969" }
        ]
    }
];

let teamData = JSON.parse(localStorage.getItem('northTeamDataAdvance')) || defaultTeam;
let editId = null;
let barChart, donutChart;

// CONFLICTS DETECTOR LOGIC
function detectConflicts() {
    let serialMap = {};
    let conflicts = [];

    teamData.forEach(member => {
        member.tools.forEach(tool => {
            let s = tool.serial ? tool.serial.trim() : '';
            if (s && s !== '0' && s !== 'N/A' && s !== '') {
                if (!serialMap[s]) {
                    serialMap[s] = [];
                }
                if (!serialMap[s].includes(member.name)) {
                    serialMap[s].push(member.name);
                }
            }
        });
    });

    for (let serial in serialMap) {
        if (serialMap[serial].length > 1) {
            conflicts.push({
                serial: serial,
                owners: serialMap[serial]
            });
        }
    }
    return conflicts;
}

function renderDashboard() {
    // 1. Render Conflict Alert Box
    const conflictBox = document.getElementById('conflictAlertSection');
    const conflicts = detectConflicts();
    
    if (conflicts.length > 0) {
        conflictBox.classList.remove('hidden');
        let html = '';
        conflicts.forEach(c => {
            html += `
                <div class="flex flex-wrap items-center gap-2 bg-red-50 border border-red-200 p-3 rounded-lg text-xs text-red-700">
                    <span class="font-bold">⚠️ DUPLICATE DETECTED:</span> 
                    <span class="bg-red-600 text-white px-2 py-0.5 rounded font-mono">${c.serial}</span> 
                    <span>is assigned to multiple owners:</span>
                    <span class="font-semibold">${c.owners.join(' & ')}</span>
                </div>`;
        });
        conflictBox.innerHTML = html;
    } else {
        conflictBox.classList.add('hidden');
    }

    // 2. Render Team Grid
    const grid = document.getElementById('teamGrid');
    grid.innerHTML = '';

    teamData.forEach(member => {
        let badgesHtml = '';
        member.tools.forEach((t, index) => {
            let displaySerial = (t.serial && t.serial !== 'N/A') ? ` (${t.serial})` : '';
            badgesHtml += `
                <div class="bg-gray-50 hover:bg-gray-100 border border-gray-200 p-2 rounded-lg flex flex-col justify-between text-xs">
                    <div class="font-medium text-gray-700">${t.type}: <span class="text-blue-600 font-semibold">${t.name}</span></div>
                    <div class="text-[10px] text-gray-400 font-mono mt-0.5">S/N: ${t.serial || 'N/A'}</div>
                </div>`;
        });

        grid.innerHTML += `
            <div class="bg-white p-5 rounded-xl shadow-sm border border-gray-200 flex flex-col justify-between space-y-4">
                <div>
                    <div class="flex justify-between items-center pb-2 border-b border-gray-100">
                        <h4 class="font-bold text-gray-800 text-sm">${member.name}</h4>
                        <div class="flex gap-3">
                            <button onclick="editMember(${member.id})" class="text-blue-600 hover:text-blue-800 text-xs font-semibold cursor-pointer">Edit</button>
                            <button onclick="deleteMember(${member.id})" class="text-red-500 hover:text-red-700 text-xs font-semibold cursor-pointer">Del</button>
                        </div>
                    </div>
                    <div class="grid grid-cols-1 gap-2 mt-3">${badgesHtml}</div>
                </div>
            </div>
        `;
    });
    updateCharts();
}

// Open modal for editing text based structure safely
function editMember(id) {
    editId = id;
    const member = teamData.find(m => m.id === id);
    document.getElementById('modalTitle').innerText = "Edit Inventory - " + member.name;
    document.getElementById('memberName').value = member.name;
    
    // Format JSON array to readable comma lines for user editing
    let toolsText = member.tools.map(t => `${t.type}|${t.name}|${t.serial}`).join('\n');
    document.getElementById('memberTools').value = toolsText;
    document.getElementById('memberModal').classList.remove('hidden');
}

function showAddModal() {
    editId = null;
    document.getElementById('modalTitle').innerText = "Add New Team Member";
    document.getElementById('memberName').value = '';
    document.getElementById('memberTools').value = 'Laptop|HP Z Book|5CG2XXXXXX\nSIM|Zain SIM|5924XXXXX';
    document.getElementById('memberModal').classList.remove('hidden');
}

function closeModal() {
    document.getElementById('memberModal').classList.add('hidden');
}

function saveMember() {
    const name = document.getElementById('memberName').value;
    const toolsText = document.getElementById('memberTools').value;

    if (!name || !toolsText) return alert("Fields cannot be empty");

    // Parse data back to object structure
    let parsedTools = [];
    let lines = toolsText.split('\n');
    lines.forEach(line => {
        if(line.trim()){
            let parts = line.split('|');
            parsedTools.push({
                type: parts[0] || 'Tool',
                name: parts[1] || 'Device',
                serial: parts[2] || 'N/A'
            });
        }
    });

    if (editId) {
        const index = teamData.findIndex(m => m.id === editId);
        teamData[index].name = name;
        teamData[index].tools = parsedTools;
    } else {
        teamData.push({ id: Date.now(), name, tools: parsedTools });
    }

    localStorage.setItem('northTeamDataAdvanceSize', JSON.stringify(teamData));
    localStorage.setItem('northTeamDataAdvance', JSON.stringify(teamData));
    closeModal();
    renderDashboard();
}

function deleteMember(id) {
    if (confirm("Remove member?")) {
        teamData = teamData.filter(m => m.id !== id);
        localStorage.setItem('northTeamDataAdvance', JSON.stringify(teamData));
        renderDashboard();
    }
}

function updateCharts() {
    const ctxBar = document.getElementById('barChart');
    const ctxDonut = document.getElementById('donutChart');

    if (barChart) barChart.destroy();
    if (donutChart) donutChart.destroy();

    let sim = 0, mob = 0, lap = 0, chg = 0;
    teamData.forEach(m => {
        m.tools.forEach(t => {
            if(t.type.toUpperCase().includes('SIM')) sim++;
            else if(t.type.toUpperCase().includes('MOBILE')) mob++;
            else if(t.type.toUpperCase().includes('LAPTOP')) lap++;
            else chg++;
        });
    });

    const dataValues = [sim, mob, lap, chg];

    barChart = new Chart(ctxBar, {
        type: 'bar',
        data: {
            labels: ['SIM Cards', 'Mobiles', 'Laptops', 'Other Tools'],
            datasets: [{ data: dataValues, backgroundColor: ['#3B82F6', '#EC4899', '#8B5CF6', '#F59E0B'], barThickness: 25 }]
        },
        options: { responsive: true, plugins: { legend: { display: false } } }
    });

    donutChart = new Chart(ctxDonut, {
        type: 'doughnut',
        data: {
            labels: ['SIM Cards', 'Mobiles', 'Laptops', 'Other Tools'],
            datasets: [{ data: dataValues, backgroundColor: ['#3B82F6', '#EC4899', '#8B5CF6', '#F59E0B'] }]
        },
        options: { responsive: true, plugins: { legend: { position: 'right' } }, cutout: '70%' }
    });
}

window.onload = renderDashboard;