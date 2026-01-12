let progress = loadProgress();

function normalizeCode(str) {
    return str
        .replace(/\s+/g, "")
        .trim();
}


function hasMissingSemicolon(code) {
    const lines = code.split("\n");

    for (let raw of lines) {
        const line = raw.trim();
        if (!line) continue;
        if (line.startsWith("//")) continue;

        
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

function runTask(button) {
    const wrapper = button.closest(".code-runner");
    const input = wrapper.querySelector(".code-input").value;
    const output = wrapper.querySelector(".output-box");

    const expected = button.getAttribute("data-expected") || "";
    const mode = button.getAttribute("data-mode") || (expected ? "strict" : "free");
    const range = button.getAttribute("data-range");

    const escapeHtml = (str) =>
        str.replace(/&/g, "&amp;")
           .replace(/</g, "&lt;")
           .replace(/>/g, "&gt;");

    
    const demoBtn = document.getElementById("gomb");
    if (demoBtn) {
        demoBtn.onclick = null;
    }

    
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

    
    if (hasMissingSemicolon(input)) {
        output.innerHTML = `
            <div class="output-status" style="color:#ff4444;">
                ❌ Hiányzó pontosvessző valamelyik sor végén.<br>
                Ebben a tananyagban minden utasítás végére írj <code>;</code>-t!
            </div>
        `;
        return;
    }

    
    if (mode === "strict" && expected) {
      const isCorrect = normalizeCode(input) === normalizeCode(expected);
        if (!isCorrect) {
         output.innerHTML = `
          <div class="output-status" style="color:#ff4444;"> 
           ❌ Hibás megoldás – nem egyezik a várt kóddal.<br>
           Ellenőrizd a pontosvesszőket, idézőjeleket, zárójeleket és a sorok sorrendjét! 
           
           </div> 
     `;
     return;
    }
}


 const originalConsoleLog = console.log;
  let logs = [];
  console.log = (...args) => {
   const text = args 
   .map(a => (typeof a === "object" ? JSON.stringify(a) : String(a))) .join(" ");
  logs.push(text); 
  originalConsoleLog.apply(console, args);
 }; 
 
 try { 
 eval(input);

  console.log = originalConsoleLog;
  
  const logText = logs.length
   ? logs.map(escapeHtml).join("<br>") : "<em>(A program nem írt ki semmit – ha a kód a weboldal elemeit módosítja, a változást feljebb látod.)</em>";

   const statusText = (mode === "strict") 
   ? "✓ Kód sikeresen lefutott" : "✓ A kód lefutott hiba nélkül – nyugodtan kísérletezz a változókkal!"; 
   
   output.innerHTML = `
   <div><strong>Program kimenete:</strong></div>
     <div class="output-log">${logText}</div> 
     <div class="output-status" style="margin-top:8px;color:#4caf50;"> 
     ${statusText} 
     </div>
      `; 
      } 
     catch (err) {
         console.log = originalConsoleLog;
          output.innerHTML =` 
          <div class="output-status" 
     style="margin-top:8px;color:#ff4444;">
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
        
        container.innerHTML =` 
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