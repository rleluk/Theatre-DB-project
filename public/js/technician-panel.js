var lastSearch = {name: '', surname: '', profession: ''};
window.onload = updateProfessionSelect;

async function getProfessions() {
    let res = await fetch('/admin/technician/profession/getall', {method: 'GET'});
    let data = await res.json();

    if(res.status !== 200) {
        document.getElementById('alert').innerHTML = data.msg;
        return;
    }

    if(data.length < 1) {
        document.getElementById('alert').innerHTML = "Nie znaleziono żadnej profesji.";
        return;
    }

    return data;
}

async function updateProfessionSelect() {
    let data = await getProfessions();
    let select = document.getElementById('professionSelect');

    for (a in select.options) { 
        select.options.remove(0); 
    
    }
    
    data.forEach(record => {
        let option = document.createElement('option');
        option.text = record.nazwa;
        select.add(option);
    });
}

function changeForm(id) {
    let navs = document.getElementsByClassName('nav');
    Array.prototype.forEach.call(navs, element => element.style.display = 'none');
    document.getElementById('alert').innerHTML = '';
    document.getElementById('dataContainer').innerHTML = '';
    let form = document.getElementById(id);
    if(form) form.style.display = "block";
}

async function deleteTechnician(technicianID) {
    let res = await fetch('/admin/technician/delete/' + technicianID, {method: 'DELETE'});
    let data = await res.json();
    if(res.status !== 200) {
        document.getElementById('alert').innerHTML = data.msg;
    } else {
        let queryStr = `?name=${lastSearch.name}&surname=${lastSearch.surname}&profession=${lastSearch.profession}`;
        searchData('/admin/technician/search' + queryStr);
    }
}

async function deleteProfession(professionID) {
    let res = await fetch('/admin/technician/profession/delete/' + professionID, {method: 'DELETE'});
    let data = await res.json();
    if(res.status !== 200) {
        document.getElementById('alert').innerHTML = data.msg;
    } else {
        updateProfessionSelect();
        viewProfessions();
    }
}

async function viewProfessions() {
    changeForm(null);
    let data = await getProfessions();
    let content = '';
    content = '<table> <tr> <th> ID </th> <th> Nazwa </th> <th> Akcja </th> </tr>';
    data.forEach(record => {
        content += `<tr> <td> ${record.profesja_id} </td>`
                + `<td> ${record.nazwa} </td>`
                + `<td> <button onclick='deleteProfession(${record.profesja_id})'> Usuń </button> </td> </tr>`;
    });
    content += '</table>'
    document.getElementById('dataContainer').innerHTML = content;
}

document.getElementById('addProfessionForm').addEventListener('submit', event => {
    event.preventDefault();
    document.getElementById('alert').innerHTML = '';

    fetch('/admin/technician/profession/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: document.addProfessionForm.name.value})
    })
        .then(async res => {
            let data = await res.json();
            document.getElementById('alert').innerHTML = (res.status === 400) ? data.name.msg : data.msg;
            updateProfessionSelect();
        })
        .catch(error => console.log(error));
});

document.getElementById('addTechnicianForm').addEventListener('submit', async event => {
    event.preventDefault();
    document.getElementById('alert').innerHTML = '';

    const formData = {
        name: document.addTechnicianForm.name.value,
        surname: document.addTechnicianForm.surname.value,
        profession: document.getElementById('professionSelect').value
    }

    await fetch('/admin/technician/add', {
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
                if(json.profession)
                    alertContent += json.profession.msg;
                console.log(json);
            } else {
                alertContent = json.msg;
            }
            document.getElementById('alert').innerHTML = alertContent;
        })
        .catch(error => console.log(error));
});

async function searchData(url) {
    let res = await fetch(url);
    let data = await res.json();

    if(res.status === 400) {
        lastSearch.name = '';
        lastSearch.surname = '';
        lastSearch.profession = '';
        console.log(data);
        document.getElementById('alert').innerHTML = "Pola powinny zawierać wyłącznie litery.";
        return;
    } 

    if(data.length < 1) {
        document.getElementById('alert').innerHTML = "Nie znaleziono żadnego technika.";
        return;
    }
    
    let content = '';
    content = '<table> <tr> <th> ID </th> <th> Imię </th> <th> Nazwisko </th> <th> Profesja </th> <th> Akcja </th> </tr>';
    data.forEach(record => {
        content += `<tr> <td> ${record.technik_id} </td>`
                + `<td> ${record.imie} </td>`
                + `<td> ${record.nazwisko} </td>`
                + `<td> ${record.profesja} </td>`
                + `<td> <button onclick='deleteTechnician(${record.technik_id})'> Usuń </button> </td> </tr>`;
    });
    content += '</table>'
    document.getElementById('dataContainer').innerHTML = content;
};

document.getElementById('searchTechnicianForm').addEventListener('submit', event => {
    event.preventDefault();
    document.getElementById('alert').innerHTML = '';
    document.getElementById('dataContainer').innerHTML = '';
    lastSearch.name = document.searchTechnicianForm.name.value;
    lastSearch.surname = document.searchTechnicianForm.surname.value;
    lastSearch.profession = document.searchTechnicianForm.profession.value;
    let queryStr = `?name=${lastSearch.name}&surname=${lastSearch.surname}&profession=${lastSearch.profession}`;
    searchData('/admin/technician/search' + queryStr);
});