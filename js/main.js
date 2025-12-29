let completed = loadProgress();

window.addEventListener("DOMContentLoaded", () => {
    completed = loadProgress();   
    initUserBar();                
    renderLessons();
    updateStats();
});


function initUserBar() {
    const select = document.getElementById("userSelect");
    if (!select) return;

    const current = getActiveUser();
    const users = getUsers();

   
    if (!users.includes(current)) {
        users.push(current);
    }

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
        renderLessons();
        updateStats();
    };
}

function addUser() {
    const name = prompt("Új felhasználó neve:");
    if (!name) return;

    setActiveUser(name);
    completed = loadProgress();   
    initUserBar();
    renderLessons();
    updateStats();
}



function renderLessons() {
    const container = document.getElementById("lessonsContainer");
    container.innerHTML = "";

    lessons.forEach(lesson => {
        const done = completed[lesson.id];

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
    const done = Object.keys(completed).length;
    const total = lessons.length;
    const pct = Math.round((done / total) * 100);

    document.getElementById("completedCount").textContent = done;
    document.getElementById("remainingCount").textContent = total - done;
    document.getElementById("percentage").textContent = pct + "%";
    document.getElementById("progressBar").style.width = pct + "%";
}

function resetProgress() {
    if (confirm("Biztosan törölsz mindent az AKTUÁLIS felhasználónál?")) {
        completed = {};
        resetProgressStorage();
        renderLessons();
        updateStats();
    }
}
