var lastSearch = {name: '', surname: ''};

function showAddForm() {
    document.getElementById('addFormAlert').innerHTML = '';
    document.getElementById('dataContainer').innerHTML = '';
    document.getElementById('addForm').style.display = 'block';
    document.getElementById('searchForm').style.display = 'none';
    document.getElementById('editForm').style.display = 'none';
}

function showSearchForm() {
    document.getElementById('searchFormAlert').innerHTML = '';
    document.getElementById('dataContainer').innerHTML = '';
    document.getElementById('searchForm').style.display = 'block';
    document.getElementById('addForm').style.display = 'none';
    document.getElementById('editForm').style.display = 'none';
}

async function deleteScriptwriter(id) {
    await fetch('http://pascal.fis.agh.edu.pl:3046/admin/scriptwriter/delete/' + id, {method: 'DELETE'})
        .then(res => res.json())
        .then(json => {
            console.log(json);
            let queryStr = `?name=${lastSearch.name}&surname=${lastSearch.surname}`;
            searchData('http://pascal.fis.agh.edu.pl:3046/admin/scriptwriter/search' + queryStr);
        });
}

async function editScriptwriter(id) {
    document.getElementById('editFormAlert').innerHTML = '';
    document.getElementById('addFormAlert').innerHTML = '';
    document.getElementById('dataContainer').innerHTML = '';
    document.getElementById('addForm').style.display = 'none';
    document.getElementById('searchForm').style.display = 'none';
    document.getElementById('editForm').style.display = 'block';
    await fetch('http://pascal.fis.agh.edu.pl:3046/admin/scriptwriter/' + id, {method: 'GET'})
        .then(res => res.json())
        .then(record => {
            document.editForm.id.value = id;
            document.editForm.name.value = record[0].imie;
            document.editForm.surname.value = record[0].nazwisko;
            document.editForm.bday.value = record[0].data_urodzenia.split('T')[0];
            document.editForm.description.value = record[0].opis;
        });
}

document.getElementById('editForm').addEventListener('submit', async event => {
    event.preventDefault();
    document.getElementById('editFormAlert').innerHTML = '';

    const formData = {
        id: document.editForm.id.value,
        name: document.editForm.name.value,
        surname: document.editForm.surname.value,
        bday: document.editForm.bday.value,
        description: document.editForm.description.value
    }

    await fetch('http://pascal.fis.agh.edu.pl:3046/admin/scriptwriter/update', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
        .then(async res => {
            let json = await res.json();
            let alertContent = '';
            if(res.status === 400) {
                if(json.name)
                    alertContent += json.name.msg + '<br>';
                if(json.surname)
                    alertContent += json.surname.msg + '<br>';
                if(json.bday)
                    alertContent += json.bday.msg;
                console.log(json);
            } else {
                alertContent = json.msg;
            }
            document.getElementById('editFormAlert').innerHTML = alertContent;
        })
        .catch(error => console.log(error));
});

async function searchData(url) {
    await fetch(url)
        .then(async res => {
            let data = await res.json();
            let alertContent = '';
            if(res.status === 400) {
                lastSearch.name = '';
                lastSearch.surname = '';
                console.log(data);
                document.getElementById('searchFormAlert').innerHTML = "Pola powinny zawierać wyłącznie litery.";
            } else {
                if(data.length < 1) {
                    document.getElementById('searchFormAlert').innerHTML = "Nie znaleziono takiego scenarzysty.";
                    return;
                }
                let content = '';
                data.forEach(record => {
                    content += '<table> <tr> <th> ID </th> <th> Imię </th> <th> Nazwisko </th> <th> Data urodzenia </th>'
                            + `<tr> <td> ${record.scenarzysta_id} </td>`
                            + `<td> ${record.imie} </td>` 
                            + `<td> ${record.nazwisko} </td>`
                            + `<td> ${record.data_urodzenia.split('T')[0]} </td> </tr>`
                            + '<tr colspan="4"> <th> Opis </th> </tr>'
                            + `<tr> <td colspan="4"> ${record.opis} </td> </tr>`
                            + '<tr colspan="4"> <th> Akcje </th> </tr>'
                            + `<tr colspan="4"> <td> <button onclick='deleteScriptwriter(${record.scenarzysta_id})'> Usuń </button> </td>`
                            + `<td> <button onclick='editScriptwriter(${record.scenarzysta_id})'> Edytuj </button> </td> </tr>`
                            + '</table>';
                });
                document.getElementById('dataContainer').innerHTML = content;
            }
        })
        .catch(error => console.log(error));
};

document.getElementById('searchForm').addEventListener('submit', event => {
    event.preventDefault();
    document.getElementById('searchFormAlert').innerHTML = '';
    document.getElementById('dataContainer').innerHTML = '';
    lastSearch.name = document.searchForm.name.value;
    lastSearch.surname = document.searchForm.surname.value;
    let queryStr = `?name=${lastSearch.name}&surname=${lastSearch.surname}`;
    searchData('http://pascal.fis.agh.edu.pl:3046/admin/scriptwriter/search' + queryStr);
});

document.getElementById('addForm').addEventListener('submit', async event => {
    event.preventDefault();
    document.getElementById('addFormAlert').innerHTML = '';

    const formData = {
        name: document.addForm.name.value,
        surname: document.addForm.surname.value,
        bday: document.addForm.bday.value,
        description: document.addForm.description.value
    }

    await fetch('http://pascal.fis.agh.edu.pl:3046/admin/scriptwriter/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
        .then(async res => {
            let json = await res.json();
            let alertContent = '';
            if(res.status === 400) {
                if(json.name)
                    alertContent += json.name.msg + '<br>';
                if(json.surname)
                    alertContent += json.surname.msg + '<br>';
                if(json.bday)
                    alertContent += json.bday.msg;
                console.log(json);
            } else {
                alertContent = json.msg;
            }
            document.getElementById('addFormAlert').innerHTML = alertContent;
        })
        .catch(error => console.log(error));
});
