window.onload = async () => {
    setVisibleNav(document.getElementById('staff-btn'));
    makeGrid('/actor/all');
    setVisibleBtn(document.getElementById('viewActors'));
}

document.getElementById('viewTechnicians').addEventListener('click', event => {
    clearContainer();
    makeGrid('/technician/all');
    setVisibleBtn(document.getElementById('viewTechnicians'));
});

document.getElementById('viewActors').addEventListener('click', event => {
    clearContainer();
    makeGrid('/actor/all');
    setVisibleBtn(document.getElementById('viewActors'));
});

document.getElementById('viewDirectors').addEventListener('click', event => {
    clearContainer();
    makeGrid('/director/all');
    setVisibleBtn(document.getElementById('viewDirectors'));
});

document.getElementById('viewScriptwriters').addEventListener('click', event => {
    clearContainer();
    makeGrid('/scriptwriter/all');
    setVisibleBtn(document.getElementById('viewScriptwriters'));
});

/************************************** FUNCTIONS **************************************/
function setVisibleBtn(currentBtn) {
    const navBar = document.querySelector('.button-nav');
    const navs = navBar.querySelectorAll('button.nav-btn');

    for (let nav of navs) 
        nav.classList.remove('active-btn');

    currentBtn.classList.add('active-btn');
}

async function makeGrid(url) {
    let res = await fetch(url);

    if(res.status === 200) {
        let data = await res.json();

        if(data.length > 0) {
            for(let record of data) {
                let container = document.getElementById('staffContainer');

                let div = document.createElement('div');
                div.classList.add('staff-item');
                div.innerHTML = `${record.imie} <br/> ${record.nazwisko}`
                container.appendChild(div);
            }
        }
    }
}

clearContainer = () => document.getElementById('staffContainer').innerHTML = '';