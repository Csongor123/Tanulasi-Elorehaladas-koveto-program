let completed = {};

window.addEventListener("DOMContentLoaded", async () => {
  completed = await loadProgress();

  await initUserBar();
  renderLessons();
  updateStats();
});

async function initUserBar() {
  const select = document.getElementById("userSelect");
  if (!select) return;

  const users = await getUserList();
  const current = getActiveUser();

  select.innerHTML = "";

  users.forEach(name => {
    const opt = document.createElement("option");
    opt.value = name;
    opt.textContent = name;
    if (name === current) opt.selected = true;
    select.appendChild(opt);
  });

  select.onchange = async () => {
    setActiveUser(select.value);
    completed = await loadProgress();
    renderLessons();
    updateStats();
  };
}

async function addUser() {
  const name = prompt("Új felhasználó neve:");
  if (!name) return;

  const users = await getUserList();
  if (users.includes(name)) {
    alert("Ez a felhasználó már létezik.");
    return;
  }

  await createUser(name);

  setActiveUser(name);
  completed = await loadProgress();

  await initUserBar();
  renderLessons();
  updateStats();
}

function renderLessons() {
  const container = document.getElementById("lessonsContainer");
  if (!container) return;

  container.innerHTML = "";

  lessons.forEach(lesson => {
    const done = completed[String(lesson.id)] === true;

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
  let completedCount = 0;
  Object.values(completed).forEach(v => {
    if (v === true) completedCount++;
  });

  const total = lessons.length;
  const remaining = total - completedCount;
  const percent = Math.round((completedCount / total) * 100);

  document.getElementById("completedCount").textContent = completedCount;
  document.getElementById("remainingCount").textContent = remaining;
  document.getElementById("percentage").textContent = percent + "%";
  document.getElementById("progressBar").style.width = percent + "%";
}

async function resetProgress() {
  if (confirm("Biztosan törölsz mindent az AKTUÁLIS felhasználónál?")) {
    await resetProgressStorage();
    completed = await loadProgress();
    renderLessons();
    updateStats();
  }
}

async function deleteUser() {
  const user = getActiveUser();
  if (!user || user === "Vendég") return;

  if (!confirm(`Biztosan törlöd a(z) "${user}" felhasználót?`)) return;

  await deleteUserFromStorage(user);

  // váltsunk egy meglévő userre vagy Vendégre
  const users = await getUserList();
  const next = users.length ? users[0] : "Vendég";
  setActiveUser(next);

  completed = await loadProgress();
  await initUserBar();
  renderLessons();
  updateStats();
}
