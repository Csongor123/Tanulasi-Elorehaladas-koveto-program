let progress = loadProgress();

window.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get("id"));
    const lesson = lessonData[id];

    const container = document.getElementById("lessonContent");

    container.innerHTML = `
        <div class="lesson-detail">
            ${lesson.content}
            <button class="complete-btn" id="completeBtn">
                ${progress[id] ? "✓ Teljesítve" : "Lecke teljesítése"}
            </button>
        </div>
    `;

    document.getElementById("completeBtn").onclick = () => {
        progress[id] = true;
        saveProgress(progress);
        location.href = "index.html";
    };
});
