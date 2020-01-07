async function editButton(id) {
    changeForm('editDirectorForm');
    let record = await getData('/admin/director/' + id);
    
    if(record != null) {
        document.editDirectorForm.id.value = id;
        document.editDirectorForm.name.value = record[0].imie;
        document.editDirectorForm.surname.value = record[0].nazwisko;
        document.editDirectorForm.bday.value = record[0].data_urodzenia.split('T')[0];
        document.editDirectorForm.description.value = record[0].opis;
    }
}

document.getElementById('editDirectorForm').addEventListener('submit', async event => {
    event.preventDefault();
    clearAlert();

    const formData = {
        id: document.editDirectorForm.id.value,
        name: document.editDirectorForm.name.value,
        surname: document.editDirectorForm.surname.value,
        bday: document.editDirectorForm.bday.value,
        description: document.editDirectorForm.description.value
    }

    editRecord('/admin/director/update', formData);
    
});

document.getElementById('searchDirectorForm').addEventListener('submit', event => {
    event.preventDefault();
    clearAlert();
    clearDataContainer();

    let searchData = {
        name: document.searchDirectorForm.name.value, 
        surname: document.searchDirectorForm.surname.value
    };

    let queryStr = `?name=${searchData.name}&surname=${searchData.surname}`;
    
    getComplexTable('/admin/director/search' + queryStr, '/admin/director/delete/', 
        ['ID', 'Imię', 'Nazwisko', 'Data urodzenia'], 
        ['rezyser_id', 'imie', 'nazwisko', 'data_urodzenia', 'opis'], 
        editButton
    );
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

    addRecord('/admin/director/add', formData);
});
