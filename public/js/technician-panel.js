window.onload = updateProfessionSelect;

async function updateProfessionSelect() {
    let data = await getData('/admin/technician/profession/getall');
    let select = document.getElementById('professionSelect');

    for (a in select.options) { 
        select.options.remove(0); 
    }

    if(data.length < 1) {
        return;
    }
    
    data.forEach(record => {
        let option = document.createElement('option');
        option.text = record.nazwa;
        select.add(option);
    });
}

document.getElementById('viewProfessions').addEventListener('click', event => {
    changeForm(null);

    getSimpleTable('/admin/technician/profession/getall', '/admin/technician/profession/delete/', 
        ['ID', 'Nazwa'], 
        ['profesja_id', 'nazwa'],
        updateProfessionSelect
    );
});

document.getElementById('addProfessionForm').addEventListener('submit', async event => {
    event.preventDefault();
    clearDataContainer();
    clearAlert();

    await addRecord('/admin/technician/profession/add', {
        name: document.addProfessionForm.name.value
    });

    updateProfessionSelect();
});

document.getElementById('addTechnicianForm').addEventListener('submit', event => {
    event.preventDefault();
    clearDataContainer();
    clearAlert();

    const formData = {
        name: document.addTechnicianForm.name.value,
        surname: document.addTechnicianForm.surname.value,
        profession: document.getElementById('professionSelect').value
    }

    addRecord('/admin/technician/add', formData);
});

document.getElementById('searchTechnicianForm').addEventListener('submit', event => {
    event.preventDefault();
    clearDataContainer();
    clearAlert();

    let searchData = {
        name: document.searchTechnicianForm.name.value, 
        surname: document.searchTechnicianForm.surname.value, 
        profession: document.searchTechnicianForm.profession.value
    };
    
    let queryStr = `?name=${searchData.name}&surname=${searchData.surname}&profession=${searchData.profession}`;

    getSimpleTable('/admin/technician/search' + queryStr, '/admin/technician/delete/', 
        ['ID', 'Imię', 'Nazwisko', 'Profesja'], 
        ['technik_id', 'imie', 'nazwisko', 'profesja']
    );
});