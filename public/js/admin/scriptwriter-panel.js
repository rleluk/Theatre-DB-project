window.onload = () => {
    setVisibleNav(document.getElementById('scriptwriter-btn'));
    changeForm(null);
}

document.getElementById('addScriptwriterForm').addEventListener('submit', async event => {
    event.preventDefault();
    
    const formData = {
        name: document.addScriptwriterForm.name.value,
        surname: document.addScriptwriterForm.surname.value,
        bday: document.addScriptwriterForm.bday.value,
        description: document.addScriptwriterForm.description.value
    }

    const isOK = await addRecord('/admin/scriptwriter/add', formData);
    
    if(isOK) changeForm(null);
});

document.getElementById('editScriptwriterForm').addEventListener('submit', async event => {
    event.preventDefault();

    const formData = {
        id: document.editScriptwriterForm.id.value,
        name: document.editScriptwriterForm.name.value,
        surname: document.editScriptwriterForm.surname.value,
        bday: document.editScriptwriterForm.bday.value,
        description: document.editScriptwriterForm.description.value
    }

    const isOK = await editRecord('/admin/scriptwriter/update', formData);

    if(isOK) changeForm(null);
});

document.getElementById('searchScriptwriterForm').addEventListener('submit', event => {
    event.preventDefault();
    clearDataContainer();

    let searchData = {
        name: document.searchScriptwriterForm.name.value, 
        surname: document.searchScriptwriterForm.surname.value
    };

    let queryStr = `?name=${searchData.name}&surname=${searchData.surname}`;
    
    getComplexTable('/admin/scriptwriter/search' + queryStr, '/admin/scriptwriter/delete/', 
        ['ID', 'Imię', 'Nazwisko', 'Data urodzenia'],
        editFormButton
    );
});

/************************************** CUSTOM FUNCTIONS **************************************/
async function editFormButton(id) {
    let record = await getData('/admin/scriptwriter/' + id);
    
    if(record != null) {
        changeForm('editScriptwriterForm');
        document.editScriptwriterForm.id.value = id;
        document.editScriptwriterForm.name.value = record[0].imie;
        document.editScriptwriterForm.surname.value = record[0].nazwisko;
        document.editScriptwriterForm.bday.value = record[0].data_urodzenia.split('T')[0];
        document.editScriptwriterForm.description.value = record[0].opis;
    }
}