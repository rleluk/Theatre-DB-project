window.onload = () => {
    setVisibleNav(document.getElementById('ticket-btn'));
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

    addRecord('/admin/ticket/type/add', {
        name: document.addTicketTypeForm.name.value,
        price: document.addTicketTypeForm.price.value
    });
});