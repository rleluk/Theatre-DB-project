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
    
    // let selects = document.querySelectorAll('select');
    // selects.forEach(element => {
    //     element.value = undefined;
    // });
}

function changeForm(id, cAlert = true) {
    let forms = document.getElementsByClassName('input-form');
    Array.prototype.forEach.call(forms, element => element.style.display = 'none');

    clearDataContainer();
    if(cAlert) clearAlert();
    clearInputs();

    let form = document.getElementById(id);
    if(form) form.style.display = "block";
}

async function updateSelect(select, url, format) {
    let data = await getData(url);

    for (a in select.options) { 
        select.options.remove(0); 
    }

    if(data == null || data.length < 1) {
        return;
    }

    let option = new Option('Wybierz', '');
    option.disabled = true;
    option.selected = true;
    option.hidden = true;
    select.options[0] = option;

    data.forEach(record => {
        option = document.createElement('option');
        option.text = format(record);
        option.value = format(record);
        select.add(option);
    });
}

/************************************** FETCHES - FUNCTIONS **************************************/
async function editRecord(url, dataToSend) {
    let res = await fetch(url, {
        method: 'PUT',
        credentials: 'include', 
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
        credentials: 'include', 
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
    let res = await fetch(url, {
        method: 'GET', 
        credentials: 'include'
    });
    let data = await res.json();
    
    if(res.status !== 200) {
        sendAlert(data.msg);
        return null;
    }

    return data;
};

async function deleteRecord_WC(url, container) {
    if (confirm('Czy na pewno chcesz usunąć rekord, oraz WSZYSTKIE powiązane rekordy w innych tabelach?')) {
        let res = await fetch(url, {method: 'DELETE', credentials: 'include'});
        let data = await res.json();
        
        if(res.status === 200) 
            container.parentNode.removeChild(container);
    
        sendAlert(data.msg);
    }
}

async function deleteRecord(url, container) {
    let res = await fetch(url, {method: 'DELETE', credentials: 'include'});
    let data = await res.json();
    
    if(res.status === 200) 
        container.parentNode.removeChild(container);

    sendAlert(data.msg);
}

/************************************** FETCH DATA AND CREATE TABLES - FUNCTIONS **************************************/
async function getSimpleTable(url, deleteUrl, columnNames, deleteFunction, deleteAction = null) {
    let res = await fetch(url, {method: 'GET', credentials: 'include'});
    let data = await res.json();
    let table = document.createElement('table');
    
    if(res.status !== 200) {
        sendAlert(data.msg);
    } else if(data.length < 1) {
        sendAlert('Nie znaleziono żadnych rekordów.');
    } else {
        // THEAD

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

        for(let record of data) {
            let tbodyRow = tbody.insertRow(-1);

            for(let key in record) {
                cell = tbodyRow.insertCell(-1);
                cell.innerHTML = record[key];
            }

            let id = record[Object.keys(record)[0]];

            // delete button
            cell = tbodyRow.insertCell(-1);
            cell.classList.add('action-cell');
            let button = document.createElement('button');
            button.type = 'button';
            button.innerHTML = 'Usuń';
            button.classList.add('action-btn');
            button.addEventListener('click', deleteFunction.bind(this, deleteUrl + id, tbodyRow));

            if(deleteAction != null) 
                button.addEventListener('click', deleteAction.bind(this));

            cell.appendChild(button);
        }
        
        clearDataContainer();
        document.getElementById('dataContainer').appendChild(table);
    }
}

async function getComplexTable(url, deleteUrl, columnNames, editAction) {
    let res = await fetch(url, {method: 'GET', credentials: 'include'});
    let data = await res.json();
    let tableContainer = document.getElementById('dataContainer');

    if(res.status != 200) {
        sendAlert(data.msg);
    } else if(data.length < 1) {
        sendAlert('Nie znaleziono żadnych rekordów.');
    } else {
        clearDataContainer();
        let size = Object.keys(data[0]).length;
        for(let record of data) {
            let table = document.createElement('table');
            // THEAD
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
            let cell;
            
            let description = record['opis'];
            delete record['opis'];

            for(let key in record) {
                cell = tbodyRow.insertCell(-1);
                cell.innerHTML = record[key];
            }

            // description 'header'
            tbodyRow = tbody.insertRow(-1);
            th = document.createElement('th');
            th.colSpan = size;
            th.innerHTML = 'Opis';
            tbodyRow.appendChild(th);

            // description
            tbodyRow = tbody.insertRow(-1);
            cell = tbodyRow.insertCell(-1);
            cell.colSpan = size;
            cell.innerHTML = description;
            cell.classList.add('description-cell');
            
            // row for buttons
            tbodyRow = tbody.insertRow(-1);
            cell = tbodyRow.insertCell(-1);
            cell.colSpan = size;
            cell.classList.add('center');
            cell.classList.add('action-cell');

            // id
            let id = record[Object.keys(record)[0]];

            // edit button
            let editButton = document.createElement('button');
            editButton.type = 'button';
            editButton.innerHTML = 'Edytuj';
            editButton.classList.add('action-btn');
            editButton.addEventListener('click', editAction.bind(this, id));
            cell.appendChild(editButton);

            // delete button
            let deleteButton = document.createElement('button');
            deleteButton.type = 'button';
            deleteButton.innerHTML = 'Usuń';
            deleteButton.classList.add('action-btn');
            deleteButton.addEventListener('click', deleteRecord.bind(this, deleteUrl + id, table));
            cell.appendChild(deleteButton);

            tableContainer.appendChild(table);
        }
    }
}
