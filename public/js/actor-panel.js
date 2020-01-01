var lastSearch = {name: '', surname: ''};

function showAddForm() {
    document.getElementById('addFormAlert').innerHTML = '';
    document.getElementById('dataContainer').innerHTML = '';
    document.getElementById('addForm').style.display = 'block';
    document.getElementById('searchForm').style.display = 'none';
}

function showSearchForm() {
    document.getElementById('searchFormAlert').innerHTML = '';
    document.getElementById('dataContainer').innerHTML = '';
    document.getElementById('searchForm').style.display = 'block';
    document.getElementById('addForm').style.display = 'none';
}

// document.getElementById('showListBtn').addEventListener('click', async event => {
//     document.getElementById('searchForm').style.display = 'none';
//     document.getElementById('addForm').style.display = 'none';
//     await fetch('http://pascal.fis.agh.edu.pl:3046/admin/actor/all')
//         .then(res => res.json())
//         .then(data => makeTable(data))
//         .catch(error => console.log(error));
// });

async function deleteActor(actorID) {
    await fetch('http://pascal.fis.agh.edu.pl:3046/admin/actor/delete/' + actorID, {method: 'DELETE'})
        .then(res => res.json())
        .then(json => {
            console.log(json);
            let queryStr = `?name=${lastSearch.name}&surname=${lastSearch.surname}`;
            searchData('http://pascal.fis.agh.edu.pl:3046/admin/actor/search' + queryStr);
        });
}

async function searchData(url) {
    await fetch(url)
        .then(async res => {
            let data = await res.json();
            let alertContent = '';
            if(res.status === 400) {
                lastSearch.name = '';
                lastSearch.surname = '';
                document.getElementById('searchFormAlert').innerHTML = "Pola powinny zawierać wyłącznie litery.";
            } else {
                if(data.length < 1) {
                    document.getElementById('searchFormAlert').innerHTML = "Nie znaleziono takiego aktora.";
                    return;
                }
                let content = '';
                content = '<table> <tr> <th> ID </th> <th> Imię </th> <th> Nazwisko </th> <th> Data urodzenia </th>';
                content += '<th> Akcja </th>';
                content += '</tr>';
                data.forEach(record => {
                    content += `<tr> <td> ${record.aktor_id} </td>`; 
                    content += `<td> ${record.imie} </td>` ;
                    content += `<td> ${record.nazwisko} </td>`;
                    content += `<td> ${record.data_urodzenia.split('T')[0]} </td>`
                    content += `<td> <button onclick='deleteActor(${record.aktor_id})'> Usuń </button> </td> </tr>`
                });
                content += '</table>'
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
    searchData('http://pascal.fis.agh.edu.pl:3046/admin/actor/search' + queryStr);
});

document.getElementById('addForm').addEventListener('submit', async event => {
    event.preventDefault();
    document.getElementById('addFormAlert').innerHTML = '';

    const formData = {
        name: document.addForm.name.value,
        surname: document.addForm.surname.value,
        bday: document.addForm.bday.value
    }

    await fetch('http://pascal.fis.agh.edu.pl:3046/admin/actor/add', {
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
                console.log(json);
                if(json.name)
                    alertContent += json.name.msg + '<br>';
                if(json.surname)
                    alertContent += json.surname.msg + '<br>';
                if(json.bday)
                    alertContent += json.bday.msg;
            } else {
                alertContent = json.msg;
            }
            document.getElementById('addFormAlert').innerHTML = alertContent;
        })
        .catch(error => console.log(error));
});
