var lastSearch = {name: '', surname: ''};

function changeForm(id) {
    let navs = document.getElementsByClassName('nav');
    Array.prototype.forEach.call(navs, element => element.style.display = 'none');
    document.getElementById('alert').innerHTML = '';
    document.getElementById('dataContainer').innerHTML = '';
    let form = document.getElementById(id);
    if(form) form.style.display = "block";
}

async function deleteActor(actorID) {
    await fetch('/admin/actor/delete/' + actorID, {method: 'DELETE'})
        .then(res => res.json())
        .then(json => {
            console.log(json);
            let queryStr = `?name=${lastSearch.name}&surname=${lastSearch.surname}`;
            searchData('/admin/actor/search' + queryStr);
        });
}

async function searchData(url) {
    await fetch(url)
        .then(async res => {
            let data = await res.json();
            if(res.status === 400) {
                lastSearch.name = '';
                lastSearch.surname = '';
                console.log(data);
                document.getElementById('alert').innerHTML = "Pola powinny zawierać wyłącznie litery.";
            } else {
                if(data.length < 1) {
                    document.getElementById('alert').innerHTML = "Nie znaleziono takiego aktora.";
                    return;
                }
                let content = '';
                content = '<table> <tr> <th> ID </th> <th> Imię </th> <th> Nazwisko </th> <th> Data urodzenia </th> <th> Akcja </th> </tr>';
                data.forEach(record => {
                    content += `<tr> <td> ${record.aktor_id} </td>`
                            + `<td> ${record.imie} </td>`
                            + `<td> ${record.nazwisko} </td>`
                            + `<td> ${record.data_urodzenia.split('T')[0]} </td>`
                            + `<td> <button onclick='deleteActor(${record.aktor_id})'> Usuń </button> </td> </tr>`;
                });
                content += '</table>'
                document.getElementById('dataContainer').innerHTML = content;
            }
        })
        .catch(error => console.log(error));
};

document.getElementById('searchActorForm').addEventListener('submit', event => {
    event.preventDefault();
    document.getElementById('alert').innerHTML = '';
    document.getElementById('dataContainer').innerHTML = '';
    lastSearch.name = document.searchActorForm.name.value;
    lastSearch.surname = document.searchActorForm.surname.value;
    let queryStr = `?name=${lastSearch.name}&surname=${lastSearch.surname}`;
    searchData('/admin/actor/search' + queryStr);
});

document.getElementById('addActorForm').addEventListener('submit', async event => {
    event.preventDefault();
    document.getElementById('alert').innerHTML = '';

    const formData = {
        name: document.addActorForm.name.value,
        surname: document.addActorForm.surname.value,
        bday: document.addActorForm.bday.value
    }

    await fetch('/admin/actor/add', {
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
