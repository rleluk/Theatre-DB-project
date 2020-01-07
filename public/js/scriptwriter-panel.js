async function editButton(id) {
    changeForm('editScriptwriterForm');
    let record = await getData('/admin/scriptwriter/' + id);

    if(record != null) {
        document.editScriptwriterForm.id.value = id;
        document.editScriptwriterForm.name.value = record[0].imie;
        document.editScriptwriterForm.surname.value = record[0].nazwisko;
        document.editScriptwriterForm.bday.value = record[0].data_urodzenia.split('T')[0];
        document.editScriptwriterForm.description.value = record[0].opis;
    }
}

document.getElementById('editScriptwriterForm').addEventListener('submit', async event => {
    event.preventDefault();
    clearAlert();

    const formData = {
        id: document.editScriptwriterForm.id.value,
        name: document.editScriptwriterForm.name.value,
        surname: document.editScriptwriterForm.surname.value,
        bday: document.editScriptwriterForm.bday.value,
        description: document.editScriptwriterForm.description.value
    }

    editRecord('/admin/scriptwriter/update', formData);
});

document.getElementById('searchScriptwriterForm').addEventListener('submit', event => {
    event.preventDefault();
    clearAlert();
    clearDataContainer();

    let searchData = {
        name: document.searchScriptwriterForm.name.value, 
        surname: document.searchScriptwriterForm.surname.value
    };

    let queryStr = `?name=${searchData.name}&surname=${searchData.surname}`;
    
    getComplexTable('/admin/scriptwriter/search' + queryStr, '/admin/scriptwriter/delete/', 
        ['ID', 'Imię', 'Nazwisko', 'Data urodzenia'], 
        ['scenarzysta_id', 'imie', 'nazwisko', 'data_urodzenia', 'opis'], 
        editButton
    );
});

document.getElementById('addScriptwriterForm').addEventListener('submit', async event => {
    event.preventDefault();
    clearAlert();
    
    const formData = {
        name: document.addScriptwriterForm.name.value,
        surname: document.addScriptwriterForm.surname.value,
        bday: document.addScriptwriterForm.bday.value,
        description: document.addScriptwriterForm.description.value
    }

    addRecord('/admin/scriptwriter/add', formData);
});
