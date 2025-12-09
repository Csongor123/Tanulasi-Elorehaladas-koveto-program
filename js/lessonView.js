let progress = loadProgress();

// Kódszöveg normalizálása (strict módnál használjuk)
function normalizeCode(str) {
    return str
        .replace(/\s+/g, "")
        .trim();
}

// Egyszerű szabály: minden "normál" sor végén legyen ;
function hasMissingSemicolon(code) {
    const lines = code.split("\n");

    for (let raw of lines) {
        const line = raw.trim();
        if (!line) continue;                   // üres sor
        if (line.startsWith("//")) continue;   // komment

        // blokknyitás/zárás – itt nem kell ;
        if (line.endsWith("{") || line.endsWith("}")) continue;

        // sor végén vessző (objektum/array tulajdonság, többes deklaráció, stb.)
        if (line.endsWith(",")) continue;

        // objektum-tulajdonság (pl. nev: "Anna", kor: 25) – itt sem kérünk ;
        // (kezdő azonosító + kettőspont valahol a sor elején)
        if (/^[a-zA-Z_$][\w$]*\s*:/.test(line)) {
            continue;
        }

        // vezérlési sorok – if / else / for / while / switch
        if (
            line.startsWith("if ") || line.startsWith("if(") ||
            line.startsWith("else") ||
            line.startsWith("for ") || line.startsWith("for(") ||
            line.startsWith("while ") || line.startsWith("while(") ||
            line.startsWith("switch ") || line.startsWith("switch(")
        ) {
            continue;
        }

        // Minden más utasítás végén elvárjuk a pontosvesszőt
        if (!line.endsWith(";")) {
            return true;   // találtunk olyan sort, ahol hiányzik
        }
    }
    return false;
}

function runTask(button) {
    const wrapper = button.closest(".code-runner");
    const input = wrapper.querySelector(".code-input").value;
    const output = wrapper.querySelector(".output-box");

    const expected = button.getAttribute("data-expected") || "";
    const mode = button.getAttribute("data-mode") || (expected ? "strict" : "free");
    const range = button.getAttribute("data-range"); // pl. "0-99"

    const escapeHtml = (str) =>
        str.replace(/&/g, "&amp;")
           .replace(/</g, "&lt;")
           .replace(/>/g, "&gt;");

    // --- 0–99 tartomány ellenőrzése (3. lecke feladataihoz) ---
    if (range === "0-99") {
        const numRegex = /-?\d+/g;
        let match;
        while ((match = numRegex.exec(input)) !== null) {
            const n = parseInt(match[0], 10);
            if (isNaN(n) || n < 0 || n > 99) {
                output.innerHTML = `
                    <div class="output-status" style="color:#ff4444;">
                        ❌ Ebben a feladatban csak 0 és 99 közötti egész számokat használhatsz.
                    </div>
                `;
                return; // nem futtatjuk le a kódot
            }
        }
    }

    // --- Globális pontosvessző-ellenőrzés minden feladatra ---
    if (hasMissingSemicolon(input)) {
        output.innerHTML = `
            <div class="output-status" style="color:#ff4444;">
                ❌ Hiányzó pontosvessző valamelyik sor végén.<br>
                Ebben a tananyagban minden utasítás végére írj <code>;</code>-t!
            </div>
        `;
        return;
    }

    // --- STRICT mód: pontos kód-ellenőrzés (ahol nem "free" a feladat) ---
    if (mode === "strict" && expected) {
        const isCorrect = normalizeCode(input) === normalizeCode(expected);
        if (!isCorrect) {
            output.innerHTML = `
                <div class="output-status" style="color:#ff4444;">
                    ❌ Hibás megoldás – nem egyezik a várt kóddal.<br>
                    Ellenőrizd a pontosvesszőket, idézőjeleket, zárójeleket és a sorok sorrendjét!
                </div>
            `;
            return; // nem futtatjuk le a kódot
        }
    }

    // --- Innentől ténylegesen futtatjuk a kódot, loggyűjtéssel ---

    const originalConsoleLog = console.log;
    let logs = [];
    console.log = (...args) => {
        const text = args
            .map(a => (typeof a === "object" ? JSON.stringify(a) : String(a)))
            .join(" ");
        logs.push(text);
        originalConsoleLog.apply(console, args);
    };

    try {
        eval(input); // kód futtatása

        console.log = originalConsoleLog;

        const logText = logs.length
            ? logs.map(escapeHtml).join("<br>")
            : "<em>(A program nem írt ki semmit.)</em>";

        const statusText = (mode === "strict")
            ? "✓ Kód sikeresen lefutott"
            : "✓ A kód lefutott hiba nélkül – nyugodtan kísérletezz a változókkal!";

        output.innerHTML = `
            <div><strong>Program kimenete:</strong></div>
            <div class="output-log">${logText}</div>
            <div class="output-status" style="margin-top:8px;color:#4caf50;">
                ${statusText}
            </div>
        `;
    } catch (err) {
        console.log = originalConsoleLog;

        output.innerHTML = `
            <div class="output-status" style="margin-top:8px;color:#ff4444;">
                ❌ Hiba történt futtatás közben (ellenőrizd a zárójeleket, pontosvesszőket, idézőjeleket!):<br>
                <code>${escapeHtml(err.message)}</code>
            </div>
        `;
    }
}

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
