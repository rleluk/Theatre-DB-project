window.onload = () => {
    setVisibleNav(document.getElementById('performances-btn'));
    clearContainer();
    makeGrid('/performance/all');
}

/************************************** FUNCTIONS **************************************/
async function showDetails(id) {
    let role_res = await fetch('/performance/roles/' + id, {method: 'GET'}); 
    let tech_res = await fetch('/performance/technicians/' + id, {method: 'GET'});
    let perf_res = await fetch('/performance/descriptions/' + id, {method: 'GET'});

    if(role_res.status === 200 && tech_res.status === 200 && perf_res.status === 200) {
        clearContainer();

        let roles = await role_res.json();
        let technicians = await tech_res.json();
        let performance = await perf_res.json();
        console.log(performance);
        let container = document.getElementById('detailsContainer');

        let staffDiv = document.createElement('div');
        staffDiv.classList.add('description-item');

        let descriptionDiv = document.createElement('div');
        descriptionDiv.classList.add('description-item');
        
        staffDiv.innerHTML = 
            `<h2> Autor </h2>
            <p> ${performance[0].imie_scenarzysty} ${performance[0].nazwisko_scenarzysty} </p>
            <h2> Reżyser </h2>
            <p> ${performance[0].imie_rezysera} ${performance[0].nazwisko_rezysera} </p>`;

        staffDiv.innerHTML += '<h2> Obsada </h2>';    

        for(let record of roles) {
            staffDiv.innerHTML += `<p> ${record.nazwa}: ${record.imie} ${record.nazwisko} </p>`;
        }

        staffDiv.innerHTML += '<h2> Technicy teatralni </h2>';    

        for(let record of technicians) {
            staffDiv.innerHTML += `<p> ${record.profesja}: ${record.imie} ${record.nazwisko} </p>`;
        }

        descriptionDiv.innerHTML = 
            `<h2> O spektaklu: </h2>
            <p> ${performance[0].opis_spektaklu} </p>
            <h2> O autorze: </h2>
            <p> ${performance[0].opis_scenarzysty}</p>
            <h2> O reżyserze: </h2>
            <p> ${performance[0].opis_rezysera}</p>`;

        container.appendChild(staffDiv);
        container.appendChild(descriptionDiv);
    }
}

async function makeGrid(url) {
    let res = await fetch(url);

    if(res.status === 200) {
        let data = await res.json();

        if(data.length > 0) {
            for(let record of data) {
                let container = document.getElementById('performancesContainer');

                let div = document.createElement('div');
                div.classList.add('performance-item');
                div.addEventListener('click', showDetails.bind(this, record.spektakl_id));
                div.innerHTML = `${record.tytul}`
                container.appendChild(div);
            }
        }
    }
}

clearContainer = () => document.getElementById('performancesContainer').innerHTML = '';