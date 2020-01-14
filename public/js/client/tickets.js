window.onload = () => {
    setVisibleNav(document.getElementById('tickets-btn'));
    makeGrid('/play/current');
}

async function addTicket(id) {
    const formData = {
        play_id: id,
        ticketType: document.getElementById('ticketTypeSelect').value.split(':')[0]
    }
    console.log(formData);
    let res = await fetch('/tickets/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });

    let container = document.getElementById('playsContainer');
    let data = await res.json();

    if(res.status === 200) {
        container.innerHTML = `
            <h2> Bilet został zakupiony. </h2>
            <p> Spektakl odbędzie się w sali ${data.sala}. </p> 
            <p> Numer twojego siedzenia: ${data.miejsce}. </p>    
            `;
    } else {
        container.innerHTML = `<h1> ${data.msg} </h1>`;
    }
}


async function buyTicket(id) {
    let container = document.getElementById('playsContainer');
    let div = document.createElement('div');
    div.id = 'purchaseForm';

    div.innerHTML = `<h2> Wybierz typ biletu </h2>`;

    let select = document.createElement('select');
    select.id = 'ticketTypeSelect';
    updateSelect(select, '/ticket/type/all', record => `${record.nazwa}: ${record.cena}zł`);

    let button = document.createElement('button');
    button.id = 'submitPurchaseButton';
    button.innerHTML = 'Kup bilet';
    button.addEventListener('click', addTicket.bind(this, id));

    div.appendChild(select);
    div.appendChild(button);

    container.innerHTML = '';
    container.appendChild(div);
}

async function makeGrid(url) {
    let res = await fetch(url);

    if(res.status === 200) {
        let data = await res.json();

        if(data.length > 0) {
            for(let record of data) {
                let container = document.getElementById('playsContainer');

                let div = document.createElement('div');
                div.classList.add('play-item');
                div.innerHTML = `
                    <h2> ${record.tytul} </h2>
                    <p> Data rozpoczęcia spektaklu: ${new Date(record.data_rozpoczecia)} </p>
                    <button id='buyTicketButton' onclick='buyTicket(${record.wystawienie_id})'> Kup bilet </button>`;
                container.appendChild(div);
            }
        }
    }
}