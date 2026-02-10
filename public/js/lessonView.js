let progress = loadProgress();
let codeIsValid = false;


function normalizeCode(str) {
    return str
        .replace(/\s+/g, "")
        .trim();
}
function extractRequiredParts(code) {
    const parts = [];

    // stringek
    const stringRegex = /(["'])(?:(?=(\\?))\2.)*?\1/g;
    const strings = code.match(stringRegex);
    if (strings) parts.push(...strings);

    // függvényhívások (console.log, alert, fetch stb.)
    const callRegex = /\b[a-zA-Z_$][\w$]*\s*\(/g;
    const calls = code.match(callRegex);
    if (calls) parts.push(...calls.map(c => c.replace(/\s*\($/, "")));

    // kulcsszavak
    ["if", "else", "for", "function", "return", "let", "const"].forEach(k => {
        if (code.includes(k)) parts.push(k);
    });

    // pontosvessző
    if (code.includes(";")) parts.push(";");

    return [...new Set(parts)];
}

function findMissingParts(input, expected) {
    const missing = [];
    const required = extractRequiredParts(expected);

    required.forEach(part => {
        if (!input.includes(part)) {
            missing.push(part);
        }
    });

    return missing;
}


function hasMissingSemicolon(code) {
    const lines = code.split("\n");

    let objectAssignmentOpen = false;

    for (let raw of lines) {
        const line = raw.trim();
        if (!line) continue;
        if (line.startsWith("//")) continue;

        if (/^(let|const|var)\s+[a-zA-Z_$][\w$]*\s*=\s*\{/.test(line)) {
            objectAssignmentOpen = true;
            continue;
        }

        if (line === "}" && objectAssignmentOpen) {
            return true; 
        }
        if (line === "};" && objectAssignmentOpen) {
            objectAssignmentOpen = false;
            continue;
        }

        
        if (line.endsWith("{") || line.endsWith("}")) continue;
       
        if (line.endsWith(",")) continue;
        
        if (/^[a-zA-Z_$][\w$]*\s*:/.test(line)) continue;
        
        if (
            line.startsWith("if ")  || line.startsWith("if(")  ||
            line.startsWith("else") ||
            line.startsWith("for ") || line.startsWith("for(") ||
            line.startsWith("while ") || line.startsWith("while(") ||
            line.startsWith("switch ") || line.startsWith("switch(")
        ) {
            continue;
        }

        
        if (!line.endsWith(";")) {
            return true;
        }
    }
    return false;
}


function analyzeCode(input, expected) {
    const errors = [];

    // Zárójel
    const pairs = [
        ["(", ")"],
        ["{", "}"],
        ["[", "]"]
    ];

    pairs.forEach(([open, close]) => {
        const openCount = (input.match(new RegExp(`\\${open}`, "g")) || []).length;
        const closeCount = (input.match(new RegExp(`\\${close}`, "g")) || []).length;
        if (openCount !== closeCount) {
            errors.push(`Hiányzó vagy felesleges <code>${open}</code> / <code>${close}</code> zárójel`);
        }
    });

    //Idézőjel
    const doubleQuotes = (input.match(/"/g) || []).length;
    if (doubleQuotes % 2 !== 0) {
        errors.push("Hiányzó vagy rossz <code>\"</code> idézőjel");
    }

    const singleQuotes = (input.match(/'/g) || []).length;
    if (singleQuotes % 2 !== 0) {
        errors.push("Hiányzó vagy rossz <code>'</code> idézőjel");
    }

    //Pontosvessző
    if (expected.includes(";")) {
        const inputSemi = (input.match(/;/g) || []).length;
        const expectedSemi = (expected.match(/;/g) || []).length;
        if (inputSemi < expectedSemi) {
            errors.push("Hiányzó <code>;</code> (pontosvessző)");
        }
    }

    //Kulcsszavak
    ["if", "else", "for", "function", "return", "let", "const"].forEach(keyword => {
        if (expected.includes(keyword) && !input.includes(keyword)) {
            errors.push(`Hiányzik a <code>${keyword}</code> kulcsszó`);
        }
    });

    //Függvényhívások
    const callRegex = /\b[a-zA-Z_$][\w$]*\s*\(/g;
    const expectedCalls = expected.match(callRegex) || [];
    const inputCalls = input.match(callRegex) || [];

    expectedCalls.forEach(call => {
        const name = call.replace(/\s*\($/, "");
        if (!inputCalls.some(c => c.includes(name))) {
            errors.push(`Hiányzik a <code>${name}()</code> függvényhívás`);
        }
    });

    //String tartalom
    const stringRegex = /(["'])(?:(?=(\\?))\2.)*?\1/g;
    const expectedStrings = expected.match(stringRegex) || [];

    expectedStrings.forEach(str => {
        if (!input.includes(str)) {
            errors.push(`Hiányzik a szöveg: <code>${str}</code>`);
        }
    });

    return errors;
}

function runTask(button) {
    const demoButton = document.getElementById("gomb");
if (demoButton) {
    demoButton.onclick = null; 
}
    codeIsValid = false;
    const wrapper = button.closest(".code-runner");
    const input = wrapper.querySelector(".code-input").value;
    const output = wrapper.querySelector(".output-box");

    const expected = button.getAttribute("data-expected") || "";
    const mode = button.getAttribute("data-mode") || (expected ? "strict" : "free");
    const range = button.getAttribute("data-range");

    /*1. Szintaktikai Ellenőrzés mindegyik feladatnál*/
    const syntaxErrors = [];

    // zárójelek
    const pairs = [
        ["(", ")"],
        ["{", "}"],
        ["[", "]"]
    ];

    pairs.forEach(([o, c]) => {
        const open = (input.match(new RegExp(`\\${o}`, "g")) || []).length;
        const close = (input.match(new RegExp(`\\${c}`, "g")) || []).length;
        if (open !== close) {
            syntaxErrors.push(
                `Hiányzó vagy hibás <code>${o}</code> / <code>${c}</code> zárójel`
            );
        }
    });

    // idézőjelek
    if ((input.match(/"/g) || []).length % 2 !== 0) {
        syntaxErrors.push('Hiányzó vagy hibás <code>"</code> idézőjel');
    }
    if ((input.match(/'/g) || []).length % 2 !== 0) {
        syntaxErrors.push("Hiányzó vagy hibás <code>'</code> idézőjel");
    }

    // pontosvessző
    if (hasMissingSemicolon(input)) {
        syntaxErrors.push("Hiányzó <code>;</code> (pontosvessző)");
    }

    if (syntaxErrors.length > 0) {
        output.innerHTML = `
            <div class="output-status" style="color:#ff4444;">
                ❌ Szintaktikai hiba a kódban:
                <ul>${syntaxErrors.map(e => `<li>${e}</li>`).join("")}</ul>
            </div>
        `;
        return;
    }

    /* 2. Tartomány Ellenőrzés*/
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
                return;
            }
        }
    }

    /* 3. STRICT Feladatellenőrzés*/
    if (mode === "strict" && expected) {
        const errors = analyzeCode(input, expected);

        if (errors.length > 0) {
            output.innerHTML = `
                <div class="output-status" style="color:#ff4444;">
                    ❌ A megoldás nem felel meg a feladat követelményeinek:
                    <ul>${errors.map(e => `<li>${e}</li>`).join("")}</ul>
                </div>
            `;
            return;
        }
    }

    /* 4. Futtatás*/
    const escapeHtml = (str) =>
        str.replace(/&/g, "&amp;")
           .replace(/</g, "&lt;")
           .replace(/>/g, "&gt;");

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
        eval(input);
        console.log = originalConsoleLog;

        codeIsValid = true;

        const logText = logs.length
            ? logs.map(escapeHtml).join("<br>")
            : "<em>(A program nem írt ki semmit.)</em>";

        const statusText =
            mode === "strict"
                ? "✓ Kód sikeresen lefutott"
                : "✓ A kód lefutott hiba nélkül – nyugodtan kísérletezz!";

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
                ❌ Hiba történt futtatás közben:<br>
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
        
        container.innerHTML =` 
        <div class="lesson-detail">
        ${lesson.content}
        <button class="complete-btn" id="completeBtn"> 
        ${progress[id] ? "✓ Teljesítve" : "Lecke teljesítése"} 
        </button>
        </div> 
        `; 
        
        document.getElementById("completeBtn").onclick = async () => {
        const user = getActiveUser();
        const current = await loadProgress();
        current[id] = true;
        await saveProgress(current);
        location.href = "index.html"; 
    }; 
    document.addEventListener("click", function (e) {
    if (e.target.id === "gomb") {
        if (!codeIsValid) {
            alert("⚠️ Előbb futtasd le hibátlanul a kódot!");
            e.preventDefault();
            e.stopPropagation();
        }
    }
});
});