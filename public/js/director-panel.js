var lastSearch = {name: '', surname: ''};

function changeForm(id) {
    let navs = document.getElementsByClassName('nav');
    Array.prototype.forEach.call(navs, element => element.style.display = 'none');
    document.getElementById('alert').innerHTML = '';
    document.getElementById('dataContainer').innerHTML = '';
    let form = document.getElementById(id);
    if(form) form.style.display = "block";
}

async function deleteDirector(id) {
    await fetch('/admin/director/delete/' + id, {method: 'DELETE'})
        .then(res => res.json())
        .then(json => {
            console.log(json);
            let queryStr = `?name=${lastSearch.name}&surname=${lastSearch.surname}`;
            searchData('/admin/director/search' + queryStr);
        });
}

async function editDirector(id) {
    changeForm('editDirectorForm');
    await fetch('/admin/director/' + id, {method: 'GET'})
        .then(res => res.json())
        .then(record => {
            document.editDirectorForm.id.value = id;
            document.editDirectorForm.name.value = record[0].imie;
            document.editDirectorForm.surname.value = record[0].nazwisko;
            document.editDirectorForm.bday.value = record[0].data_urodzenia.split('T')[0];
            document.editDirectorForm.description.value = record[0].opis;
        });
}

document.getElementById('editDirectorForm').addEventListener('submit', async event => {
    event.preventDefault();
    document.getElementById('alert').innerHTML = '';

    const formData = {
        id: document.editDirectorForm.id.value,
        name: document.editDirectorForm.name.value,
        surname: document.editDirectorForm.surname.value,
        bday: document.editDirectorForm.bday.value,
        description: document.editDirectorForm.description.value
    }

    await fetch('/admin/director/update', {
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
            document.getElementById('alert').innerHTML = alertContent;
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
                document.getElementById('alert').innerHTML = "Pola powinny zawierać wyłącznie litery.";
            } else {
                if(data.length < 1) {
                    document.getElementById('alert').innerHTML = "Nie znaleziono takiego scenarzysty.";
                    return;
                }
                let content = '';
                data.forEach(record => {
                    content += '<table> <tr> <th> ID </th> <th> Imię </th> <th> Nazwisko </th> <th> Data urodzenia </th>'
                            + `<tr> <td> ${record.rezyser_id} </td>`
                            + `<td> ${record.imie} </td>` 
                            + `<td> ${record.nazwisko} </td>`
                            + `<td> ${record.data_urodzenia.split('T')[0]} </td> </tr>`
                            + '<tr colspan="4"> <th> Opis </th> </tr>'
                            + `<tr> <td colspan="4"> ${record.opis} </td> </tr>`
                            + '<tr colspan="4"> <th> Akcje </th> </tr>'
                            + `<tr colspan="4"> <td> <button onclick='deleteDirector(${record.rezyser_id})'> Usuń </button> </td>`
                            + `<td> <button onclick='editDirector(${record.rezyser_id})'> Edytuj </button> </td> </tr>`
                            + '</table>';
                });
                document.getElementById('dataContainer').innerHTML = content;
            }
        })
        .catch(error => console.log(error));
};

document.getElementById('searchDirectorForm').addEventListener('submit', event => {
    event.preventDefault();
    document.getElementById('alert').innerHTML = '';
    document.getElementById('dataContainer').innerHTML = '';
    lastSearch.name = document.searchDirectorForm.name.value;
    lastSearch.surname = document.searchDirectorForm.surname.value;
    let queryStr = `?name=${lastSearch.name}&surname=${lastSearch.surname}`;
    searchData('/admin/director/search' + queryStr);
});

document.getElementById('addDirectorForm').addEventListener('submit', async event => {
    event.preventDefault();
    document.getElementById('alert').innerHTML = '';

    const formData = {
        name: document.addDirectorForm.name.value,
        surname: document.addDirectorForm.surname.value,
        bday: document.addDirectorForm.bday.value,
        description: document.addDirectorForm.description.value
    }

    await fetch('/admin/director/add', {
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
            document.getElementById('alert').innerHTML = alertContent;
        })
        .catch(error => console.log(error));
});
