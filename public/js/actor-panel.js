window.onload = () => {
    setVisibleNav(document.getElementById('actor-btn'));
}

document.getElementById('addActorForm').addEventListener('submit', async event => {
    event.preventDefault();
    clearDataContainer();
    clearAlert();

    const formData = {
        name: document.addActorForm.name.value,
        surname: document.addActorForm.surname.value,
        bday: document.addActorForm.bday.value
    }

    addRecord('/admin/actor/add', formData);
});

document.getElementById('searchActorForm').addEventListener('submit', event => {
    event.preventDefault();
    clearDataContainer();
    clearAlert();

    let searchData = {
        name: document.searchActorForm.name.value, 
        surname: document.searchActorForm.surname.value
    };
    
    let queryStr = `?name=${searchData.name}&surname=${searchData.surname}`;
    
    getSimpleTable('/admin/actor/search' + queryStr, '/admin/actor/delete/', 
        ['ID', 'Imię', 'Nazwisko', 'Data urodzenia']
    );
});

