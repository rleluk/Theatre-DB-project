window.onload = () => {
    setVisibleNav(document.getElementById('performance-btn'));
   
    // update all selects

    updateGenres();

    selects = document.querySelectorAll('.directorSelect');
    selects.forEach(element => {
        updateSelect(element, '/admin/director/all', 
            record => `${record.rezyser_id}. ${record.imie} ${record.nazwisko}`);
    });

    selects = document.querySelectorAll('.scriptwriterSelect');
    selects.forEach(element => {
        updateSelect(element, '/admin/scriptwriter/all', 
            record => `${record.scenarzysta_id}. ${record.imie} ${record.nazwisko}`);
    });

    let select = document.querySelector('#technicianContainer .professionSelect');
    updateSelect(select, '/admin/technician/profession/all', record => `${record.nazwa}`);
}

/************************************** GENRES **************************************/
document.getElementById('viewGenres').addEventListener('click', event => {
    changeForm(null);

    let select = document.get
    getSimpleTable('/admin/performance/genre/all', '/admin/performance/genre/delete/', 
        ['ID', 'Nazwa'], 
        ['gatunek_id', 'nazwa'],
        () => updateGenres()
    );
});

document.getElementById('addGenreForm').addEventListener('submit', async event => {
    event.preventDefault();
    clearDataContainer();
    clearAlert();

    await addRecord('/admin/performance/genre/add', {
        name: document.addGenreForm.name.value
    });

    updateGenres();
});

/************************************** PERFORMANCES **************************************/
document.getElementById('addTechnician-btn').addEventListener('click', event => {
    document.getElementById('addTechnicianForm').style.display = 'inline-block';
    document.getElementById('addTechnician-btn').style.display = 'none';
});

document.getElementById('addRole-btn').addEventListener('click', event => {
    document.getElementById('addRoleForm').style.display = 'inline-block';
    document.getElementById('addRole-btn').style.display = 'none';
});

document.getElementById('addRoleForm').addEventListener('submit', event => {
    event.preventDefault();
    document.getElementById('addRole-btn').style.display = 'block';
    document.getElementById('addRoleForm').style.display = 'none';
});

document.getElementById('addTechnicianForm').addEventListener('submit', event => {
    event.preventDefault();




    document.getElementById('addTechnician-btn').style.display = 'block';
    document.getElementById('addTechnicianForm').style.display = 'none';
});

document.querySelector('#editContainer .professionSelect').addEventListener('change', async event => {
    let currentValue = document.querySelector('#editContainer .professionSelect').value;
    let select = document.querySelector('#editContainer .technicianSelect');
    updateSelect(select, '/admin/technician/' + currentValue, record => `${record.technik_id}. ${record.imie} ${record.nazwisko}`);
});

document.querySelector('.additionalSearch-btn').addEventListener('click', event => {
    let btn = document.querySelector('.additionalSearch-btn');
    let additionalOptions = document.querySelector('.additional-options');
    
    if(btn.innerHTML === 'Dodatkowe opcje wyszukiwania') {
        btn.innerHTML = 'Schowaj';
        additionalOptions.style.display = 'block';
    } else {
        btn.innerHTML = 'Dodatkowe opcje wyszukiwania';
        additionalOptions.style.display = 'none';
    }
});

document.getElementById('addPerformanceForm').addEventListener('submit', async event => {
    event.preventDefault();
    clearAlert();
    
    let director = document.querySelector('#addPerformanceForm .directorSelect');
    let scriptwriter = document.querySelector('#addPerformanceForm .scriptwriterSelect');

    const formData = {
        description: document.addPerformanceForm.description.value,
        title: document.addPerformanceForm.title.value,
        genre: document.querySelector('#addPerformanceForm .genreSelect').value,
        director_id: director.value.split('.')[0],
        scriptwriter_id: scriptwriter.value.split('.')[0]
    }   
    console.log(formData);
    let isOK = await addRecord('/admin/performance/add', formData);

    if(isOK) {
        changeForm('editContainer');
        document.editPerformanceForm.title.value = formData.title;
        document.querySelector('#editPerformanceForm .genreSelect').value = formData.genre;
        document.querySelector('#editPerformanceForm .directorSelect').value = director.value;
        document.querySelector('#editPerformanceForm .scriptwriterSelect').value = scriptwriter.value;
        document.editPerformanceForm.description.value = formData.description;
    }
});

document.getElementById('searchPerformanceForm').addEventListener('submit', event => {
    event.preventDefault();
    clearAlert();
    clearDataContainer();

    const searchData = {
        title: document.searchPerformanceForm.title.value,
        genre: document.searchPerformanceForm.genre.value,
        director_name: document.searchPerformanceForm.director_surname.value,
        director_surname: document.searchPerformanceForm.director_surname.value,
        scriptwriter_name: document.searchPerformanceForm.scriptwriter_name.value,
        scriptwriter_surname: document.searchPerformanceForm.scriptwriter_surname.value
    }

    let queryStr = `?title=${searchData.title}&genre=${searchData.genre}`;
    queryStr += `&director_name=${searchData.director_name}&director_surname=${searchData.director_surname}`;
    queryStr += `&scriptwriter_name=${searchData.scriptwriter_name}&scriptwriter_surname=${searchData.scriptwriter_surname}`;

    getComplexTable('/admin/performance/search' + queryStr, '/admin/performance/delete/', 
        ['ID', 'Tytuł', 'Gatunek', 'Imię reżysera', 'Nazwisko reżysera', 'Imię scenarzysty', 'Nazwisko scenarzysty'], 
        ['spektakl_id', 'tytul', 'gatunek', 'imie_rezysera', 'nazwisko_rezysera', 'imie_scenarzysty', 'nazwisko_scenarzysty'],
        editButton
    );
});

/************************************** CUSTOM FUNCTIONS **************************************/
function updateGenres() {
    let selects = document.querySelectorAll('.genreSelect');
    selects.forEach(element => {
        updateSelect(element, '/admin/performance/genre/all', 
            record => `${record.nazwa}`);
    });
}

async function editButton(id) {
    let record = await getData('/admin/performance/' + id);
    
    if(record != null) {
        changeForm('editContainer');
        document.editPerformanceForm.id.value = record[0].spektakl_id;
        document.editPerformanceForm.title.value = record[0].tytul;
        document.querySelector('#editPerformanceForm .genreSelect').value = record[0].gatunek;
        document.querySelector('#editPerformanceForm .directorSelect').value = 
            `${record[0].rezyser_id}. ${record[0].imie_rezysera} ${record[0].nazwisko_rezysera}`;
        document.querySelector('#editPerformanceForm .scriptwriterSelect').value = 
            `${record[0].scenarzysta_id}. ${record[0].imie_scenarzysty} ${record[0].nazwisko_scenarzysty}`;
        document.editPerformanceForm.description.value = record[0].opis;
    }
}