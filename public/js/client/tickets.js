window.onload = () => {
    setVisibleNav(document.getElementById('tickets-btn'));
    makeGrid('/play/current');
}

function buyTicket(id) {
    if(confirm('Na pewno chcesz kupić bilet na ten spektakl?')) {
        let container = document.getElementById('playsContainer');
        container.innerHTML = '<p> Kupiłeś bilet. </p>';
    }
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
                    <button id='buyTicket' onclick='buyTicket(${record.spektakl_id})'> Kup bilet </button>
                `;
                container.appendChild(div);
            }
        }
    }
}