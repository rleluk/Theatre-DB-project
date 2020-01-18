window.onload = () => {
    setVisibleNav(document.getElementById('director-btn'));
    changeForm(null);
}

document.getElementById('addDirectorForm').addEventListener('submit', async event => {
    event.preventDefault();
    document.getElementById('alert').innerHTML = '';

    const formData = {
        name: document.addDirectorForm.name.value,
        surname: document.addDirectorForm.surname.value,
        bday: document.addDirectorForm.bday.value,
        description: document.addDirectorForm.description.value
    }

    const isOK = await addRecord('/admin/director/add', formData);

    if(isOK) changeForm(null);
});

document.getElementById('editDirectorForm').addEventListener('submit', async event => {
    event.preventDefault();

    const formData = {
        id: document.editDirectorForm.id.value,
        name: document.editDirectorForm.name.value,
        surname: document.editDirectorForm.surname.value,
        bday: document.editDirectorForm.bday.value,
        description: document.editDirectorForm.description.value
    }

    const isOK = await editRecord('/admin/director/update', formData);
    
    if(isOK) changeForm(null);
});

document.getElementById('searchDirectorForm').addEventListener('submit', event => {
    event.preventDefault();
    clearDataContainer();

    let searchData = {
        name: document.searchDirectorForm.name.value, 
        surname: document.searchDirectorForm.surname.value
    };

    let queryStr = `?name=${searchData.name}&surname=${searchData.surname}`;
    
    getComplexTable('/admin/director/search' + queryStr, '/admin/director/delete/', 
        ['ID', 'Imię', 'Nazwisko', 'Data urodzenia'], 
        editFormButton
    );
});

/************************************** CUSTOM FUNCTIONS **************************************/
async function editFormButton(id) {
    let record = await getData('/admin/director/' + id);
    
    if(record != null) {
        changeForm('editDirectorForm');
        document.editDirectorForm.id.value = id;
        document.editDirectorForm.name.value = record[0].imie;
        document.editDirectorForm.surname.value = record[0].nazwisko;
        document.editDirectorForm.bday.value = record[0].data_urodzenia.split('T')[0];
        document.editDirectorForm.description.value = record[0].opis;
    }
}