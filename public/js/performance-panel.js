window.onload = async () => {
    setVisibleNav(document.getElementById('performance-btn'));
    updateNameSelect('genreSelect', '/admin/performance/genre/all');
    updatePersonSelect('directorSelect', '/admin/director/all', 'rezyser_id');
    updatePersonSelect('scriptwriterSelect', '/admin/scriptwriter/all', 'scenarzysta_id');
}

async function updatePersonSelect(selectID, url, idName) {
    let data = await getData(url);
    let select = document.getElementById(selectID);

    for (a in select.options) { 
        select.options.remove(0); 
    }

    if(data == null || data.length < 1) {
        return;
    }

    data.forEach(record => {
        let option = document.createElement('option');
        option.text = `${record[idName]}. ${record.imie} ${record.nazwisko}`;
        select.add(option);
    });
}


document.getElementById('viewGenres').addEventListener('click', event => {
    changeForm(null);

    getSimpleTable('/admin/performance/genre/all', '/admin/performance/genre/delete/', 
        ['ID', 'Nazwa'], 
        ['gatunek_id', 'nazwa'],
        () => updateNameSelect('genreSelect', '/admin/performance/genre/all')
    );
});

document.getElementById('addGenreForm').addEventListener('submit', async event => {
    event.preventDefault();
    clearDataContainer();
    clearAlert();

    await addRecord('/admin/performance/genre/add', {
        name: document.addGenreForm.name.value
    });

    updateNameSelect('genreSelect', '/admin/performance/genre/all');
});

document.getElementById('addPerformanceForm').addEventListener('submit', async event => {
    event.preventDefault();
    clearAlert();
    
    const formData = {
        description: document.addPerformanceForm.description.value,
        title: document.addPerformanceForm.title.value,
        genre_name: document.getElementById('genreSelect').value,
        director_id: document.getElementById('directorSelect').value.split('.')[0],
        scriptwriter_id: document.getElementById('scriptwriterSelect').value.split('.')[0]
    }

    addRecord('/admin/performance/add', formData);
});
