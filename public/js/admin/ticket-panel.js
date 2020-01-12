window.onload = () => {
    setVisibleNav(document.getElementById('ticket-btn'));
    changeForm(null);
}

document.getElementById('viewTicketTypes').addEventListener('click', event => {
    changeForm(null);

    getSimpleTable('/admin/ticket/type/getall', '/admin/ticket/type/delete/', 
        ['ID', 'Nazwa', 'Cena'],
        deleteRecord
    );
});

document.getElementById('addTicketTypeForm').addEventListener('submit', async event => {
    event.preventDefault();
    clearDataContainer();
    clearAlert();

    const isOK = await addRecord('/admin/ticket/type/add', {
        name: document.addTicketTypeForm.name.value,
        price: document.addTicketTypeForm.price.value
    });

    if(isOK) changeForm(null, false);
});