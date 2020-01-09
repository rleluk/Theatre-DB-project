var sendAlert = (msg) => document.getElementById('alert').innerHTML = msg;

var setDataContainer = (data) => document.getElementById('dataContainer').innerHTML = data;

var clearAlert = () => document.getElementById('alert').innerHTML = '';

var clearDataContainer = () => document.getElementById('dataContainer').innerHTML = '';

function setVisibleNav(currentNav) {
    const navBar = document.querySelector('.nav-bar');
    const navs = navBar.querySelectorAll('a.nav-item');

    for (let nav of navs) 
        nav.classList.remove('active-nav');

    currentNav.classList.add('active-nav');
}

function clearInputs() {
    let inputs = document.querySelectorAll('input');
    inputs.forEach(element => {
        element.value = '';
    });
    
    let selects = document.querySelectorAll('select');
    selects.forEach(element => {
        element.value = 'Wybierz';
    });
}

function changeForm(id) {
    let forms = document.getElementsByClassName('input-form');
    Array.prototype.forEach.call(forms, element => element.style.display = 'none');

    clearDataContainer();
    clearAlert();
    clearInputs();

    let form = document.getElementById(id);
    if(form) form.style.display = "block";
}

async function editRecord(url, dataToSend) {
    let res = await fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
    });

    let data = await res.json();
    sendAlert(data.msg);
    
    return (res.status === 200);
}

async function addRecord(url, dataToSend) {
    let res = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
    });

    let data = await res.json();
    sendAlert(data.msg);

    return (res.status === 200);
}

async function getData(url) {
    let res = await fetch(url, {method: 'GET'});
    let data = await res.json();

    if(res.status !== 200) {
        sendAlert(data.msg);
        return null;
    }

    return data;
};

async function deleteRecord(url, container) {
    let res = await fetch(url, {method: 'DELETE'});
    let data = await res.json();

    if(res.status === 200) 
        container.parentNode.removeChild(container);

    sendAlert(data.msg);
}

async function updateSelect(select, url, format) {
    let data = await getData(url);

    for (a in select.options) { 
        select.options.remove(0); 
    }

    if(data == null || data.length < 1) {
        return;
    }

    let option = document.createElement('option');
    option.disabled = true;
    option.selected = true;
    option.hidden = true;
    option.value = undefined;
    select.add(option);

    data.forEach(record => {
        option = document.createElement('option');
        option.text = format(record);
        select.add(option);
    });
}

async function getSimpleTable(url, deleteUrl, tableColumns, recordColumns, deleteAction = null) {
    let res = await fetch(url, {method: 'GET'});
    let data = await res.json();
    let table = document.createElement('table');
    
    if(res.status != 200) {
        sendAlert(data.msg);
    } else if(data.length < 1) {
        sendAlert('Nie znaleziono żadnych rekordów.');
    } else {
        // THEAD
        let thead = table.createTHead();
        let headerRow = thead.insertRow(-1);
        
        let cell;
        for(let element of tableColumns) {
            cell = headerRow.insertCell(-1);
            cell.innerHTML = element;
        }

        // TBODY
        let tbody = table.createTBody();

        for(let i = 0; i < data.length; i++) {
            let row = data[i];
            let tableRow = tbody.insertRow(-1);

            for(let columnName of recordColumns) {
                cell = tableRow.insertCell(-1);
                cell.innerHTML = row[columnName];
            }

            // delete button
            cell = tableRow.insertCell(-1);
            let button = document.createElement('button');
            button.type = 'button';
            button.innerHTML = 'Usuń';
            button.classList.add('action-btn');
            button.addEventListener('click', deleteRecord.bind(this, deleteUrl + row[recordColumns[0]], tableRow));

            if(deleteAction != null) 
                button.addEventListener('click', deleteAction.bind(this));

            cell.appendChild(button);
        }
        
        clearDataContainer();
        document.getElementById('dataContainer').appendChild(table);
    }
}

async function getComplexTable(url, deleteUrl, tableColumns, recordColumns, editAction) {
    let res = await fetch(url, {method: 'GET'});
    let data = await res.json();
    let tableContainer = document.getElementById('dataContainer');

    if(res.status != 200) {
        sendAlert(data.msg);
    } else if(data.length < 1) {
        sendAlert('Nie znaleziono żadnych rekordów.');
    } else {
        clearDataContainer();
        for(let i = 0; i < data.length; i++) {
            let table = document.createElement('table');

            // HEADER
            let headerRow = table.insertRow(0);
            
            let cell;
            for(let element of tableColumns) {
                cell = headerRow.insertCell(-1);
                cell.innerHTML = element;
            }

            // BODY
            let row = data[i];
            let tableRow = table.insertRow(-1);

            for(let j = 0; j < tableColumns.length; j++) {
                cell = tableRow.insertCell(-1);
                cell.innerHTML = row[recordColumns[j]];
            }

            // HEADER
            headerRow = table.insertRow(-1);
            cell = headerRow.insertCell(-1);
            cell.colSpan = tableColumns.length;
            cell.innerHTML = "Opis";

            // BODY
            tableRow = table.insertRow(-1);
            cell = tableRow.insertCell(-1);
            cell.colSpan = tableColumns.length;
            cell.innerHTML = row[recordColumns[recordColumns.length - 1]];

            // button row
            tableRow = table.insertRow(-1);
            cell = tableRow.insertCell(-1);
            cell.colSpan = tableColumns.length;

            // delete button
            let button = document.createElement('button');
            button.type = 'button';
            button.innerHTML = 'Usuń';
            button.classList.add('action-btn');
            button.addEventListener('click', deleteRecord.bind(this, deleteUrl + row[recordColumns[0]], table));
            cell.appendChild(button);

            // edit button
            button = document.createElement('button');
            button.type = 'button';
            button.innerHTML = 'Edytuj';
            button.classList.add('action-btn');
            // console.log(row[recordColumns[0]]);
            button.addEventListener('click', editAction.bind(this, row[recordColumns[0]]));
            cell.appendChild(button);

            tableContainer.appendChild(table);
        }
    }
}