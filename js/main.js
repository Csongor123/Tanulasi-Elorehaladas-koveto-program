let completed = loadProgress();

window.addEventListener("DOMContentLoaded", () => {
    renderLessons();
    updateStats();
});

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

        div.addEventListener("click", () => toggleComplete(lesson.id));
        container.appendChild(div);
    });
}

function toggleComplete(id) {
    if (completed[id]) delete completed[id];
    else completed[id] = true;

    saveProgress(completed);
    renderLessons();
    updateStats();
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
    if (confirm("Biztosan törölsz mindent?")) {
        completed = {};
        resetProgressStorage();
        renderLessons();
        updateStats();
    }
}
