var sendAlert = (msg) => document.getElementById('alert').innerHTML = msg;

var setDataContainer = (data) => document.getElementById('dataContainer').innerHTML = data;

var clearAlert = () => document.getElementById('alert').innerHTML = '';

var clearDataContainer = () => document.getElementById('dataContainer').innerHTML = '';

function changeForm(id) {
    let navs = document.getElementsByClassName('nav');
    Array.prototype.forEach.call(navs, element => element.style.display = 'none');

    clearAlert();
    clearDataContainer();

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
}

async function searchData(url, makeTable = null, lastSearch = null) {
    let res = await fetch(url, {method: 'GET'});
    let data = await res.json();

    if(res.status !== 200) {
        sendAlert(data.msg);

        if(lastSearch) {
            for(let key in lastSearch) 
                lastSearch[key] = '';
        }

        return null;
    }

    if(data.length < 1) {
        sendAlert('Nie znaleziono żadnego rekordu.');
        clearDataContainer();
        return null;
    }

    if(makeTable) 
        setDataContainer(makeTable(data));
};

async function getData(url) {
    let res = await fetch(url, {method: 'GET'});
    let data = await res.json();
    
    if(res.status !== 200) {
        sendAlert(data.msg);
        return null;
    }

    return data;
};

async function deleteRecord(url, tableBody, rowIndex) {
    let res = await fetch(url, {method: 'DELETE'});
    let data = await res.json();

    if(res.status === 200) 
        tableBody.deleteRow(rowIndex);

    sendAlert(data.msg);
}

async function getSimpleTable(url, deleteUrl, tableColumns, recordColumns, deleteAction = null) {
    let res = await fetch(url, {method: 'GET'});
    let data = await res.json();
    let table = document.createElement('table');
    console.log(data);
    if(res.status != 200) {
        sendAlert(data.msg);
    } else if(data.length < 1) {
        sendAlert('Nie znaleziono żadnych rekordów.');
    } else {
        // THEAD
        let thead = table.createTHead();
        let headerRow = thead.insertRow(0);
        
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
            button.addEventListener('click', deleteRecord.bind(this, deleteUrl + row[recordColumns[0]], tbody, i));

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
    let tableContainer = document.createElement('table');

    if(res.status != 200) {
        sendAlert(data.msg);
    } else if(data.length < 1) {
        sendAlert('Nie znaleziono żadnych rekordów.');
    } else {
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
            button.addEventListener('click', deleteRecord.bind(this, deleteUrl + row[recordColumns[0]], tableContainer, i));
            cell.appendChild(button);

            // edit button
            button = document.createElement('button');
            button.type = 'button';
            button.innerHTML = 'Edytuj';
            button.classList.add('action-btn');
            button.addEventListener('click', editAction.bind(this, row[recordColumns[0]]));
            cell.appendChild(button);

            let tableContainerRow = tableContainer.insertRow(-1);
            tableContainerRow.appendChild(table);
        }

        clearDataContainer();
        document.getElementById('dataContainer').appendChild(tableContainer);
    }
}