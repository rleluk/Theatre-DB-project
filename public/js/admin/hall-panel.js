window.onload = () => {
    setVisibleNav(document.getElementById('hall-btn'));
    changeForm(null);
}

document.getElementById('addHallForm').addEventListener('submit', async event => {
    event.preventDefault();

    const formData = {
        name: document.addHallForm.name.value,
        numberOfRows: document.addHallForm.numberOfRows.value,
        seatsInRow: document.addHallForm.seatsInRow.value
    }

    const isOK = await addRecord('/admin/hall/add', formData);

    if(isOK) changeForm(null);
});

document.getElementById('searchHallForm').addEventListener('submit', event => {
    event.preventDefault();
    clearDataContainer();

    let searchData = {name: document.searchHallForm.name.value};

    let queryStr = `?name=${searchData.name}`;

    getSimpleTable('/admin/hall/search' + queryStr, '/admin/hall/delete/', 
        ['ID', 'Nazwa', 'Ilość rzędów', 'Ilość siedzeń'],
        deleteRecord_WC
    );
});