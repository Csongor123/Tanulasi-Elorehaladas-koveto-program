function loadProgress() {
    return JSON.parse(localStorage.getItem('progress') || '{}');
}

function saveProgress(data) {
    localStorage.setItem('progress', JSON.stringify(data));
}

function resetProgressStorage() {
    localStorage.removeItem('progress');
}
