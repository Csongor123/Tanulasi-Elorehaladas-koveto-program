

function getActiveUser() {
    return localStorage.getItem('activeUser') || 'Vendég';
}

function setActiveUser(name) {
    localStorage.setItem('activeUser', name);
}



function loadAllProgress() {
    return JSON.parse(localStorage.getItem('progressByUser') || '{}');
}

function saveAllProgress(all) {
    localStorage.setItem('progressByUser', JSON.stringify(all));
}



function loadProgress() {
    const user = getActiveUser();
    const all = loadAllProgress();
    return all[user] || {};
}

function saveProgress(data) {
    const user = getActiveUser();
    const all = loadAllProgress();
    all[user] = data;
    saveAllProgress(all);
}

function resetProgressStorage() {
    const user = getActiveUser();
    const all = loadAllProgress();
    delete all[user];           
    saveAllProgress(all);
}


function getUsers() {
    return Object.keys(loadAllProgress());
}
