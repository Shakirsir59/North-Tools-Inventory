// EXCEL DATA BASED ON REGION NORTH
const defaultTeam = [
    {
        id: 1,
        name: "Majid Mubarak Mohammed",
        tools: [
            { type: "Laptop", name: "HP Z Book", serial: "5CG2421T3F" },
            { type: "Ethernet Cable", name: "Type C", serial: "ROHS" },
            { type: "Laptop Charger", name: "HP Charger", serial: "4CH24205WL" },
            { type: "Laptop Bag", name: "HP Bag", serial: "NA" },
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
            { type: "Laptop", name: "HP ProBook", serial: "5CG0462CX0" },
            { type: "Laptop Charger", name: "HP Charger", serial: "N/A" },
            { type: "Car Inverter", name: "Inverter", serial: "N/A" },
            { type: "SIM", name: "Zain SIM", serial: "592446789" },
            { type: "SIM", name: "Zain SIM", serial: "592448903" },
            { type: "SIM", name: "Zain SIM", serial: "580174700" },
            { type: "SIM", name: "Zain SIM", serial: "592446967" },
            { type: "USB Hub", name: "Kingston", serial: "N/A" },
            { type: "Mobile", name: "Huawei P40", serial: "863725044378535" },
            { type: "Mobile", name: "Huawei P40", serial: "863725044379731" },
            { type: "Mobile", name: "Huawei P40", serial: "863725044539847" },
            { type: "Mobile", name: "Samsung S9", serial: "354663104805962" },
            { type: "Mobile", name: "Samsung S9", serial: "354663104812380" },
            { type: "Huawei CPE", name: "Huawei CPE", serial: "867206040945128" }
        ]
    },
    {
        id: 4,
        name: "Saeed Iqbal",
        tools: [
            { type: "Laptop", name: "HP ProBook", serial: "5CG1152Y1V" },
            { type: "Laptop Charger", name: "HP Charger", serial: "N/A" },
            { type: "Laptop Bag", name: "HP Bag", serial: "N/A" },
            { type: "Mobile", name: "Huawei P40", serial: "863725044378261" },
            { type: "Mobile", name: "Huawei P40", serial: "863725044377792" },
            { type: "Mobile", name: "Samsung S22", serial: "354839122746814" },
            { type: "Mobile", name: "Samsung S22", serial: "354839122784532" },
            { type: "Mobile", name: "Huawei Mate 30 Pro", serial: "862781041935423" },
            { type: "SIM", name: "Zain SIM", serial: "592448269" },
            { type: "SIM", name: "Zain SIM", serial: "592446971" },
            { type: "SIM", name: "Zain SIM", serial: "592446902" },
            { type: "SIM", name: "Zain SIM", serial: "592446981" },
            { type: "USB Hub", name: "Kensington", serial: "N/A" },
            { type: "USB Hub", name: "Anker", serial: "N/A" }
        ]
    },
    {
        id: 5,
        name: "Muhammad Sajawal",
        tools: [
            { type: "Laptop", name: "HP Elite book", serial: "5CG0462CY2" },
            { type: "Laptop Charger", name: "HP Charger", serial: "N/A" },
            { type: "Laptop Bag", name: "HP Bag", serial: "N/A" },
            { type: "SIM", name: "Zain SIM", serial: "592448818" },
            { type: "SIM", name: "Zain SIM", serial: "592449627" },
            { type: "SIM", name: "Zain SIM", serial: "592448924" },
            { type: "SIM", name: "Zain SIM", serial: "592446963" },
            { type: "USB Hub", name: "Kensington", serial: "N/A" },
            { type: "USB Hub", name: "Anker", serial: "N/A" },
            { type: "Mobile", name: "Huawei P40", serial: "N/A" },
            { type: "Mobile", name: "Samsung S22", serial: "N/A" },
            { type: "Mobile", name: "Samsung S23", serial: "N/A" },
            { type: "Car Inverter", name: "Inverter", serial: "N/A" }
        ]
    },
    {
        id: 6,
        name: "Fuaad Alnakhli",
        tools: [
            { type: "Laptop", name: "HP Elite book 840 G8", serial: "5CG2138VYF" },
            { type: "Laptop Charger", name: "65W Charger", serial: "N/A" },
            { type: "Laptop Bag", name: "HP Bag", serial: "N/A" },
            { type: "SIM", name: "Zain SIM", serial: "592446849" }
        ]
    },
    {
        id: 7,
        name: "Majed AlHarbi",
        tools: [
            { type: "Laptop", name: "HP Elite book 840 G8", serial: "5CG2138WDS" },
            { type: "Laptop Charger", name: "65W Charger", serial: "N/A" },
            { type: "SIM", name: "Zain SIM", serial: "592448969" }
        ]
    }
];

let teamData = JSON.parse(localStorage.getItem('northInventorySystemV3')) || defaultTeam;
let editId = null;
let barChart, donutChart;

function detectConflicts() {
    let serialMap = {};
    let conflicts = [];

    teamData.forEach(member => {
        member.tools.forEach(tool => {
            let s = tool.serial ? tool.serial.trim() : '';
            if (s && s !== '0' && s !== 'N/A' && s !== 'NA' && s !== '') {
                if (!serialMap[s]) serialMap[s] = [];
                if (!serialMap[s].includes(member.name)) serialMap[s].push(member.name);
            }
        });
    });

    for (let serial in serialMap) {
        if (serialMap[serial].length > 1) {
            conflicts.push({ serial: serial, owners: serialMap[serial] });
        }
    }
    return conflicts;
}

function renderDashboard() {
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
                    <span>assigned to:</span> <span class="font-semibold">${c.owners.join(' & ')}</span>
                </div>`;
        });
        conflictBox.innerHTML = html;
    } else {
        conflictBox.classList.add('hidden');
    }

    const grid = document.getElementById('teamGrid');
    grid.innerHTML = '';

    teamData.forEach(member => {
        let itemsHtml = '';
        member.tools.forEach(t => {
            itemsHtml += `
                <div class="bg-gray-50 border border-gray-200 p-2 rounded-lg text-xs">
                    <div class="font-medium text-gray-700">${t.type}: <span class="text-blue-600 font-semibold">${t.name}</span></div>
                    <div class="text-[10px] text-gray-400 font-mono mt-0.5">S/N or IMEI: ${t.serial}</div>
                </div>`;
        });

        grid.innerHTML += `
            <div class="bg-white p-5 rounded-xl shadow-sm border border-gray-200 space-y-4">
                <div class="flex justify-between items-center pb-2 border-b border-gray-100">
                    <h4 class="font-bold text-gray-800 text-sm">${member.name}</h4>
                    <div class="flex gap-2">
                        <button onclick="editMember(${member.id})" class="text-blue-600 hover:text-blue-800 text-xs font-semibold cursor-pointer">Edit</button>
                        <button onclick="deleteMember(${member.id})" class="text-red-500 hover:text-red-700 text-xs font-semibold cursor-pointer">Del</button>
                    </div>
                </div>
                <div class="grid grid-cols-1 gap-2">${itemsHtml}</div>
            </div>`;
    });
    updateCharts();
}

function editMember(id) {
    editId = id;
    const member = teamData.find(m => m.id === id);
    document.getElementById('modalTitle').innerText = "Edit Assets: " + member.name;
    document.getElementById('memberName').value = member.name;
    document.getElementById('memberTools').value = member.tools.map(t => `${t.type}|${t.name}|${t.serial}`).join('\n');
    document.getElementById('memberModal').classList.remove('hidden');
}

function showAddModal() {
    editId = null;
    document.getElementById('modalTitle').innerText = "Add New Team Member";
    document.getElementById('memberName').value = '';
    document.getElementById('memberTools').value = 'Laptop|HP Z Book|5CG2421T3F\nSIM|Zain SIM|592446843';
    document.getElementById('memberModal').classList.remove('hidden');
}

function closeModal() {
    document.getElementById('memberModal').classList.add('hidden');
}

function saveMember() {
    const name = document.getElementById('memberName').value;
    const toolsText = document.getElementById('memberTools').value;
    if (!name || !toolsText) return alert("Fields cannot be empty");

    let parsedTools = [];
    toolsText.split('\n').forEach(line => {
        if(line.trim()){
            let parts = line.split('|');
            parsedTools.push({ type: parts[0]||'Tool', name: parts[1]||'Device', serial: parts[2]||'N/A' });
        }
    });

    if (editId) {
        const index = teamData.findIndex(m => m.id === editId);
        teamData[index].name = name;
        teamData[index].tools = parsedTools;
    } else {
        teamData.push({ id: Date.now(), name, tools: parsedTools });
    }

    localStorage.setItem('northInventorySystemV3', JSON.stringify(teamData));
    closeModal();
    renderDashboard();
}

function deleteMember(id) {
    if (confirm("Are you sure?")) {
        teamData = teamData.filter(m => m.id !== id);
        localStorage.setItem('northInventorySystemV3', JSON.stringify(teamData));
        renderDashboard();
    }
}

function updateCharts() {
    const ctxBar = document.getElementById('barChart');
    const ctxDonut = document.getElementById('donutChart');
    if (barChart) barChart.destroy();
    if (donutChart) donutChart.destroy();

    let counts = { SIM: 0, Mobile: 0, Laptop: 0, Others: 0 };
    teamData.forEach(m => m.tools.forEach(t => {
        let type = t.type.toUpperCase();
        if(type.includes('SIM')) counts.SIM++;
        else if(type.includes('MOBILE')) counts.Mobile++;
        else if(type.includes('LAPTOP')) counts.Laptop++;
        else counts.Others++;
    }));

    const dataVals = [counts.SIM, counts.Mobile, counts.Laptop, counts.Others];

    barChart = new Chart(ctxBar, {
        type: 'bar',
        data: {
            labels: ['SIM Cards', 'Mobiles', 'Laptops', 'Others'],
            datasets: [{ data: dataVals, backgroundColor: ['#3B82F6', '#EC4899', '#8B5CF6', '#F59E0B'], barThickness: 25 }]
        },
        options: { responsive: true, plugins: { legend: { display: false } } }
    });

    donutChart = new Chart(ctxDonut, {
        type: 'doughnut',
        data: {
            labels: ['SIM Cards', 'Mobiles', 'Laptops', 'Others'],
            datasets: [{ data: dataVals, backgroundColor: ['#3B82F6', '#EC4899', '#8B5CF6', '#F59E0B'] }]
        },
        options: { responsive: true, plugins: { legend: { position: 'right' } }, cutout: '70%' }
    });
}

window.onload = renderDashboard;