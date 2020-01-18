window.onload = () => {
    setVisibleNav(document.getElementById('ticket-btn'));
    changeForm(null);
}

document.getElementById('viewTicketTypes').addEventListener('click', event => {
    changeForm(null);

    getSimpleTable('/admin/ticket/type/all', '/admin/ticket/type/delete/', 
        ['ID', 'Nazwa', 'Cena'],
        deleteRecord
    );
});

document.getElementById('viewTicketInfo').addEventListener('click', event => {
    changeForm(null);

    getCustomTable('/admin/ticket/info', 
        ['ID wystawienia', 'Tytuł', 'Sala', 'Aktualna ilość kupionych biletów', 'Maksymalna ilość miejsc', 'Data rozpoczęcia wystawienia']
    );
});

document.getElementById('addTicketTypeForm').addEventListener('submit', async event => {
    event.preventDefault();
    clearDataContainer();

    const isOK = await addRecord('/admin/ticket/type/add', {
        name: document.addTicketTypeForm.name.value,
        price: document.addTicketTypeForm.price.value
    });

    if(isOK) changeForm(null);
});

/************************************** CUSTOM FUNCTIONS **************************************/
async function getCustomTable(url, columnNames) {
    let res = await fetch(url, {method: 'GET', credentials: 'include'});
    console.log(res);
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
        }
        
        clearDataContainer();
        document.getElementById('dataContainer').appendChild(table);
    }
}