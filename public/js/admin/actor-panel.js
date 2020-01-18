window.onload = () => {
    setVisibleNav(document.getElementById('actor-btn'));
    changeForm(null);
}

document.getElementById('addActorForm').addEventListener('submit', async event => {
    event.preventDefault();
    clearDataContainer();

    const formData = {
        name: document.addActorForm.name.value,
        surname: document.addActorForm.surname.value,
        bday: document.addActorForm.bday.value
    }
    
    let isOK = await addRecord('/admin/actor/add', formData);
    
    if(isOK) changeForm(null);
});

document.getElementById('searchActorForm').addEventListener('submit', event => {
    event.preventDefault();
    clearDataContainer();

    let searchData = {
        name: document.searchActorForm.name.value, 
        surname: document.searchActorForm.surname.value
    };
    
    let queryStr = `?name=${searchData.name}&surname=${searchData.surname}`;
    
    getSimpleTable('/admin/actor/search' + queryStr, '/admin/actor/delete/', 
        ['ID', 'Imię', 'Nazwisko', 'Data urodzenia'],
        deleteRecord_WC
    );
});




