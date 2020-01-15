window.onload = () => {
    setVisibleNav(document.getElementById('performance-btn'));
    changeForm(null);
    // update all selects

    updateGenres();

    selects = document.querySelectorAll('.directorSelect');
    selects.forEach(element => {
        updateSelect(element, '/admin/director/all', 
            record => `${record.rezyser_id}. ${record.imie} ${record.nazwisko}`);
    });

    selects = document.querySelectorAll('.scriptwriterSelect');
    selects.forEach(element => {
        updateSelect(element, '/admin/scriptwriter/all', 
            record => `${record.scenarzysta_id}. ${record.imie} ${record.nazwisko}`);
    });

    let select = document.querySelector('#technicianContainer .professionSelect');
    updateSelect(select, '/admin/technician/profession/all', record => `${record.nazwa}`);

    select = document.querySelector('#stagePlayForm .hallSelect');
    updateSelect(select, '/admin/hall/search?name=', record => `${record.nazwa}`);

    select = document.querySelector('#roleContainer .actorSelect');
    updateSelect(select, '/admin/actor/search?name=&surname=', record => `${record.aktor_id}. ${record.imie} ${record.nazwisko}`);
}

/************************************** GENRES **************************************/
document.getElementById('viewGenres').addEventListener('click', event => {
    changeForm(null);

    getSimpleTable('/admin/performance/genre/all', '/admin/performance/genre/delete/', 
        ['ID', 'Nazwa'], 
        deleteRecord,
        () => updateGenres()
    );
});

document.getElementById('addGenreForm').addEventListener('submit', async event => {
    event.preventDefault();
    clearDataContainer();
    clearAlert();

    const isOK = await addRecord('/admin/performance/genre/add', {
        name: document.addGenreForm.name.value
    });

    if(isOK) {
        changeForm(null, false);
        updateGenres();
    }
});

/************************************** PERFORMANCES **************************************/

/************************ ADD ************************/
document.getElementById('addPerformanceForm').addEventListener('submit', async event => {
    event.preventDefault();
    clearAlert();

    const formData = {
        description: document.addPerformanceForm.description.value,
        title: document.addPerformanceForm.title.value,
        genre: document.querySelector('#addPerformanceForm .genreSelect').value,
        director_id: document.querySelector('#addPerformanceForm .directorSelect').value.split('.')[0],
        scriptwriter_id: document.querySelector('#addPerformanceForm .scriptwriterSelect').value.split('.')[0]
    }   

    console.log(formData);
    let id = await addRecordCustom('/admin/performance/add', formData);

    if(id) showEditForm(id);
});

/************************ SEARCH ************************/
document.getElementById('searchPerformanceForm').addEventListener('submit', event => {
    event.preventDefault();
    clearAlert();
    clearDataContainer();

    const searchData = {
        title: document.searchPerformanceForm.title.value,
        genre: document.searchPerformanceForm.genre.value,
        director_name: document.searchPerformanceForm.director_name.value,
        director_surname: document.searchPerformanceForm.director_surname.value,
        scriptwriter_name: document.searchPerformanceForm.scriptwriter_name.value,
        scriptwriter_surname: document.searchPerformanceForm.scriptwriter_surname.value
    }

    let queryStr = `?title=${searchData.title}&genre=${searchData.genre}`;
    queryStr += `&director_name=${searchData.director_name}&director_surname=${searchData.director_surname}`;
    queryStr += `&scriptwriter_name=${searchData.scriptwriter_name}&scriptwriter_surname=${searchData.scriptwriter_surname}`;

    getPerformanceList('/admin/performance/search' + queryStr);
});

/************************ EDIT ************************/
document.getElementById('editPerformanceForm').addEventListener('submit', event => {
    event.preventDefault();
    clearAlert();
    
    const formData = {
        performance_id: document.editPerformanceForm.id.value,  
        description: document.editPerformanceForm.description.value,
        title: document.editPerformanceForm.title.value,
        genre: document.querySelector('#editPerformanceForm .genreSelect').value,
        director_id: document.querySelector('#editPerformanceForm .directorSelect').value.split('.')[0],
        scriptwriter_id: document.querySelector('#editPerformanceForm .scriptwriterSelect').value.split('.')[0]
    }

    editRecord('/admin/performance/update', formData);
});

document.getElementById('addTechnician-btn').addEventListener('click', event => {
    document.getElementById('addTechnicianForm').style.display = 'inline-block';
    document.getElementById('addTechnician-btn').style.display = 'none';
});

document.getElementById('addRole-btn').addEventListener('click', event => {
    document.getElementById('addRoleForm').style.display = 'inline-block';
    document.getElementById('addRole-btn').style.display = 'none'; 
});

document.getElementById('addRoleForm').addEventListener('submit', async event => {
    event.preventDefault();
    clearAlert();

    let formData = {
        name: document.addRoleForm.role.value,
        performance_id: document.editPerformanceForm.id.value, 
        actor_id: document.querySelector('#editContainer .actorSelect').value.split('.')[0]
    }

    let isOK = await addRecord('/admin/role/add', formData);

    if(isOK) {
        tbody = document.querySelector('#listOfRoles tbody');
        getCustomTable(
            '/admin/role/' + formData.performance_id, 
            `/admin/role/delete/`,
            tbody, true
        );

        document.getElementById('addRole-btn').style.display = 'block';
        document.getElementById('addRoleForm').style.display = 'none';
        document.addRoleForm.role.value = '';
        document.querySelector('#editContainer .actorSelect').value = '';
    }
});

document.getElementById('addTechnicianForm').addEventListener('submit', async event => {
    event.preventDefault();
    clearAlert();

    let technician = document.querySelector('#editContainer .technicianSelect');

    let formData = {
        performance_id: document.editPerformanceForm.id.value, 
        technician_id: technician.value.split('.')[0]
    }

    let isOK = await addRecord('/admin/performance/technician/add', formData);

    if(isOK) {
        await addTableRow(
            {
                technician_id: technician.value.split('.')[0],
                name: technician.value.split(' ')[1],
                surname: technician.value.split(' ')[2],
                profession: document.querySelector('#editContainer .professionSelect').value,
                performance_id: formData.performance_id
            }, 
            document.querySelector('#listOfTechnicians tbody'), 
            `/admin/performance/technician/delete?performance_id=${formData.performance_id}&technician_id=`, 
            true
        );
        
        document.getElementById('addTechnician-btn').style.display = 'block';
        document.getElementById('addTechnicianForm').style.display = 'none';
        document.querySelector('#editContainer .professionSelect').value = '';
        for (a in technician.options) { 
            technician.options.remove(0); 
        }
    }
});

document.querySelector('#editContainer .professionSelect').addEventListener('change', async event => {
    let currentValue = document.querySelector('#editContainer .professionSelect').value;
    let select = document.querySelector('#editContainer .technicianSelect');
    updateSelect(select, '/admin/technician/' + currentValue, record => `${record.technik_id}. ${record.imie} ${record.nazwisko}`);
});

document.querySelector('.additionalSearch-btn').addEventListener('click', event => {
    let btn = document.querySelector('.additionalSearch-btn');
    let additionalOptions = document.querySelector('.additional-options');
    
    if(btn.innerHTML === 'Dodatkowe opcje wyszukiwania') {
        btn.innerHTML = 'Schowaj';
        additionalOptions.style.display = 'block';
    } else {
        btn.innerHTML = 'Dodatkowe opcje wyszukiwania';
        additionalOptions.style.display = 'none';
    }
});

/************************ STAGE A PLAY ************************/
document.getElementById('stagePlayForm').addEventListener('submit', async event => {
    event.preventDefault();
    clearAlert();

    let formData = {
        performance_id: document.stagePlayForm.id.value,
        startDate: document.stagePlayForm.startDate.value, 
        startTime: document.stagePlayForm.startTime.value,
        endDate: document.stagePlayForm.endDate.value,
        endTime: document.stagePlayForm.endTime.value,
        hall: document.querySelector('#stagePlayForm .hallSelect').value
    }
    
    let isOK = await addRecord('/admin/stageperformance/add', formData);

    if(isOK) changeForm(null, false);
});

document.getElementById('searchStagePerformanceForm').addEventListener('submit', async event => {
    event.preventDefault();
    clearAlert();
    clearDataContainer();

    const searchData = {
        startDate: document.searchStagePerformanceForm.startDate.value, 
        endDate: document.searchStagePerformanceForm.endDate.value,
    }

    let queryStr = `?startDate=${searchData.startDate}&endDate=${searchData.endDate}`;

    getSimpleTable('/admin/stageperformance/search' + queryStr, '/admin/stageperformance/delete/', 
        ['ID wystawienia', 'Tytuł', 'Sala', 'Data rozpoczęcia', 'Data zakończenia', 'ID spektaklu'],
        deleteRecord_WC
    );
});

document.getElementById('viewStagePerformances').addEventListener('click', async event => {
    changeForm(null);

    getSimpleTable('/admin/stageperformance/all', '/admin/stageperformance/delete/', 
        ['ID wystawienia', 'Tytuł', 'Sala', 'Data rozpoczęcia', 'Data zakończenia', 'ID spektaklu'],
        deleteRecord_WC
    );
});

/************************************** CUSTOM FUNCTIONS **************************************/
function updateGenres() {
    let selects = document.querySelectorAll('.genreSelect');
    selects.forEach(element => {
        updateSelect(element, '/admin/performance/genre/all', 
            record => `${record.nazwa}`);
    });
}

async function showEditForm(id) {
    let record = await getData('/admin/performance/' + id);

    if(record != null) {
        changeForm('editContainer');

        let tbody = document.querySelector('#listOfTechnicians tbody');
        getCustomTable(
            '/admin/performance/technicians/' + id, 
            `/admin/performance/technician/delete?performance_id=${id}&technician_id=`,
            tbody, true
        );

        tbody = document.querySelector('#listOfRoles tbody');
        getCustomTable(
            '/admin/role/' + id, 
            `/admin/role/delete/`,
            tbody, true
        );

        document.editPerformanceForm.id.value = id;
        document.editPerformanceForm.title.value = record[0].tytul;
        document.querySelector('#editPerformanceForm .genreSelect').value = record[0].gatunek;
        document.querySelector('#editPerformanceForm .directorSelect').value = 
            `${record[0].rezyser_id}. ${record[0].imie_rezysera} ${record[0].nazwisko_rezysera}`;
        document.querySelector('#editPerformanceForm .scriptwriterSelect').value = 
            `${record[0].scenarzysta_id}. ${record[0].imie_scenarzysty} ${record[0].nazwisko_scenarzysty}`;
        document.editPerformanceForm.description.value = record[0].opis;
    }
}

async function stagePlayForm(id) {
    changeForm('stagePlayForm');
    document.stagePlayForm.id.value = id;
}

async function addRecordCustom(url, dataToSend) {
    let res = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
    });

    let data = await res.json();
    
    if(res.status !== 200) {
        sendAlert(data.msg);
        return false;
    }
    
    return data.id;
}

/************************************** FETCH DATA AND CREATE TABLES - FUNCTIONS **************************************/
async function getCustomTable(url, deleteUrl, tbody, deleteBtn = false) {
    let res = await fetch(url, {method: 'GET', credentials: 'include'});
    let data = await res.json();
    tbody.innerHTML = '';

    if(res.status != 200) {
        sendAlert(data.msg);
    } else if(data.length < 1) {
        return;
    } else {
        for(let i = 0; i < data.length; i++) 
            addTableRow(data[i], tbody, deleteUrl, deleteBtn);
    }
}

function addTableRow(record, tbody, deleteUrl, deleteBtn = false) {
    let tableRow = tbody.insertRow(-1);
    
    let keys = Object.keys(record);
    let cell;
    for(let i = 0; i < keys.length - 1; i++) {
        cell = tableRow.insertCell(-1);
        cell.innerHTML = record[keys[i]];
    }

    // delete button
    if(deleteBtn) {
        cell = tableRow.insertCell(-1);
        cell.classList.add('action-cell2');
        let button = document.createElement('button');
        button.type = 'button';
        button.innerHTML = 'Usuń';
        button.classList.add('action-btn');
        button.addEventListener('click', deleteRecord.bind(this, deleteUrl + record[keys[0]], tableRow));
        cell.appendChild(button);
    }
}

async function getPerformanceList(url) {
    const deleteUrl = '/admin/performance/delete/';
    let res = await fetch(url, {method: 'GET', credentials: 'include'});
    let data = await res.json();

    let tableContainer = document.getElementById('dataContainer');
    let columnNames = ['ID', 'Tytuł', 'Gatunek sztuki', 'Reżyser', 'Scenarzysta'];

    if(res.status != 200) {
        sendAlert(data.msg);
    } else if(data.length < 1) {
        sendAlert('Nie znaleziono żadnych rekordów.');
    } else {
        clearDataContainer();

        for(let record of data) {
            // THEAD
            let table = document.createElement('table');
            let thead = table.createTHead();
    
            let theadRow = thead.insertRow(-1);
            let th;
            
            for(let columnName of columnNames) {
                th = document.createElement('th');
                th.innerHTML = columnName;
                theadRow.appendChild(th);
            }
    
            // TBODY
            let tbody = table.createTBody();
            let tbodyRow = tbody.insertRow(-1);
            let cell = tbodyRow.insertCell(-1);
            cell.innerHTML = record['spektakl_id'];
            cell = tbodyRow.insertCell(-1);
            cell.innerHTML = record['tytul'];
            cell = tbodyRow.insertCell(-1);
            cell.innerHTML = record['gatunek'];
            cell = tbodyRow.insertCell(-1);
            cell.innerHTML = `${record['imie_rezysera']} ${record['nazwisko_rezysera']}`;
            cell = tbodyRow.insertCell(-1);
            cell.innerHTML = `${record['imie_scenarzysty']} ${record['nazwisko_scenarzysty']}`;

            // description 'header'
            tbodyRow = tbody.insertRow(-1);
            th = document.createElement('th');
            th.colSpan = '5';
            th.innerHTML = 'Opis spektaklu';
            tbodyRow.appendChild(th);

            // description
            tbodyRow = tbody.insertRow(-1);
            cell = tbodyRow.insertCell(-1);
            cell.colSpan = '5';
            cell.classList.add('description-cell');
            cell.innerHTML = record['opis'];
            
            // row for buttons
            tbodyRow = tbody.insertRow(-1);
            cell = tbodyRow.insertCell(-1);
            cell.colSpan = '5';
            cell.classList.add('center');
            cell.classList.add('action-cell');
            
            // edit button
            let editButton = document.createElement('button');
            editButton.type = 'button';
            editButton.innerHTML = 'Edytuj';
            editButton.classList.add('action-btn');
            editButton.addEventListener('click', showEditForm.bind(this, record['spektakl_id']));
            cell.appendChild(editButton);

            // stage a play button
            let playButton = document.createElement('button');
            playButton.type = 'button';
            playButton.innerHTML = 'Wystaw sztukę';
            playButton.classList.add('action-btn');
            playButton.addEventListener('click', stagePlayForm.bind(this, record['spektakl_id']));
            cell.appendChild(playButton);

            // delete button
            let deleteButton = document.createElement('button');
            deleteButton.type = 'button';
            deleteButton.innerHTML = 'Usuń';
            deleteButton.classList.add('action-btn');
            deleteButton.addEventListener('click', deleteRecord_WC.bind(this, deleteUrl + record['spektakl_id'], table));
            cell.appendChild(deleteButton);

            tableContainer.appendChild(table);
        }
    }
}
