// main.js
let completed = {};

window.addEventListener("DOMContentLoaded", () => {
    completed = loadProgress();
    console.log("Betöltött progress:", completed); // DEBUG
    
    initUserBar();                
    renderLessons();
    updateStats();
});

function initUserBar() {
    const select = document.getElementById("userSelect");
    if (!select) return;

    const users = getUserList();
    const current = getActiveUser();

    select.innerHTML = "";

    users.forEach(name => {
        const opt = document.createElement("option");
        opt.value = name;
        opt.textContent = name;
        if (name === current) opt.selected = true;
        select.appendChild(opt);
    });

    select.onchange = () => {
        setActiveUser(select.value);
        completed = loadProgress();
        console.log("Felhasználó váltás utáni progress:", completed); // DEBUG
        renderLessons();
        updateStats();
    };
}

function addUser() {
    const name = prompt("Új felhasználó neve:");
    if (!name) return;

    let users = getUserList();

    if (users.includes(name)) {
        alert("Ez a felhasználó már létezik.");
        return;
    }

    users.push(name);
    saveUserList(users);

    setActiveUser(name);
    completed = loadProgress();
    
    console.log("Új felhasználó progress:", completed); // DEBUG

    initUserBar();
    renderLessons();
    updateStats();
}

function renderLessons() {
    const container = document.getElementById("lessonsContainer");
    if (!container) return;
    
    container.innerHTML = "";

    lessons.forEach(lesson => {
        // Fontos: az ID-t stringként használjuk, mert a localStorage kulcsai stringek
        const done = completed[lesson.id.toString()] === true;
        
        console.log(`Lesson ${lesson.id}: done = ${done}`); // DEBUG

        const div = document.createElement("div");
        div.className = "lesson" + (done ? " completed" : "");

        div.innerHTML = `
            <div class="checkbox">${done ? "✓" : ""}</div>
            <div class="lesson-content">
                <div class="lesson-title">${lesson.id}. ${lesson.title}</div>
                <div style="opacity: 0.8">${lesson.desc}</div>
            </div>
            <a class="view-btn" href="lesson.html?id=${lesson.id}">Megnyitás</a>
        `;

        container.appendChild(div);
    });
}

function updateStats() {
    console.log("updateStats called, completed:", completed); // DEBUG
    
    let completedCount = 0;
    
    // Megszámoljuk a true értékű bejegyzéseket
    Object.values(completed).forEach(value => {
        if (value === true) completedCount++;
    });
    
    // VAGY alternatív számolás:
    // completedCount = Object.keys(completed).filter(key => completed[key] === true).length;
    
    const total = lessons.length;
    const remaining = total - completedCount;
    const percent = Math.round((completedCount / total) * 100);

    console.log(`Stats: ${completedCount}/${total}, ${percent}%`); // DEBUG

    document.getElementById("completedCount").textContent = completedCount;
    document.getElementById("remainingCount").textContent = remaining;
    document.getElementById("percentage").textContent = percent + "%";

    document.getElementById("progressBar").style.width = percent + "%";
}

function resetProgress() {
    if (confirm("Biztosan törölsz mindent az AKTUÁLIS felhasználónál?")) {
        completed = {};
        resetProgressStorage();
        renderLessons();
        updateStats();
    }
}

function deleteUser() {
    const user = getActiveUser();
    if (!user) return;

    if (!confirm(`Biztosan törlöd a(z) "${user}" felhasználót?`)) return;

    let users = getUserList().filter(u => u !== user);
    saveUserList(users);

    deleteUserFromStorage(user);

    const next = users.length ? users[0] : "";
    setActiveUser(next);

    completed = loadProgress();
    initUserBar();
    renderLessons();
    updateStats();
}