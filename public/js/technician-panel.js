window.onload = () => {
    setVisibleNav(document.getElementById('technician-btn'));
    let select = document.getElementById('professionSelect');
    updateSelect(select, '/admin/technician/profession/all', record => `${record.nazwa}`);
}

document.getElementById('viewProfessions').addEventListener('click', event => {
    changeForm(null);

    let select = document.getElementById('professionSelect');
    getSimpleTable('/admin/technician/profession/all', '/admin/technician/profession/delete/', 
        ['ID', 'Nazwa'], 
        ['profesja_id', 'nazwa'],
        () => updateSelect(select, '/admin/technician/profession/all', record => `${record.nazwa}`)
    );
});

document.getElementById('addProfessionForm').addEventListener('submit', async event => {
    event.preventDefault();
    clearDataContainer();
    clearAlert();

    await addRecord('/admin/technician/profession/add', {
        name: document.addProfessionForm.name.value
    });

    let select = document.getElementById('professionSelect');
    updateSelect(select, '/admin/technician/profession/all', record => `${record.nazwa}`);
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