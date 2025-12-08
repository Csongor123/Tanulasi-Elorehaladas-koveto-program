const lessonData = {
    1: {
        title: "Bevezetés a programozásba",
        content: `
            <h2>1. lecke: Bevezetés a programozásba</h2>
            <h3>Mi az a programozás?</h3>
            <p>A programozás a számítógépes programok létrehozásának folyamata, amely logikát, problémamegoldást és kreativitást igényel.</p>

            <h3>Mit csinál egy program?</h3>
            <ul>
                <li>Feldolgoz adatokat</li>
                <li>Döntéseket hoz</li>
                <li>Utasításokat hajt végre</li>
                <li>Kimenetet ad vissza</li>
            </ul>

            <h3>Próbáld ki!</h3>
            <div class="code-runner">
                <textarea class="code-input">console.log("Hello World!");</textarea>
                <button class="run-btn" onclick="runCode(this)">▶ Futtatás</button>
                <div class="output-box"></div>
            </div>

            <h3>Miért fontos a programozás?</h3>
            <p>A programozás segítségével automatizálhatod a folyamatokat, alkalmazásokat készíthetsz és kreatív ötleteket valósíthatsz meg.</p>
        `
    },

    2: {
        title: "Változók és adattípusok",
        content: `
            <h2>2. lecke: Változók és adattípusok</h2>
            <p>A változók tárolják az adatokat, melyek később felhasználhatók.</p>

            <h3>Példák:</h3>
            <div class="code-runner">
                <textarea class="code-input">let nev = "Anna";
let kor = 25;
let diak = true;

console.log(nev);
console.log(kor);
console.log(diak);</textarea>
                <button class="run-btn" onclick="runCode(this)">▶ Futtatás</button>
                <div class="output-box"></div>
            </div>

            <h3>Alap adattípusok:</h3>
            <ul>
                <li>String (szöveg)</li>
                <li>Number (szám)</li>
                <li>Boolean (logikai érték)</li>
                <li>Object</li>
                <li>Array</li>
            </ul>
        `
    },

    3: {
        title: "Vezérlési szerkezetek",
        content: `
            <h2>3. lecke: Vezérlési szerkezetek</h2>

            <h3>Feltételkezelés (if)</h3>
            <div class="code-runner">
                <textarea class="code-input">let kor = 18;

if (kor >= 18) {
    console.log("Nagykorú");
} else {
    console.log("Kiskorú");
}</textarea>
                <button class="run-btn" onclick="runCode(this)">▶ Futtatás</button>
                <div class="output-box"></div>
            </div>

            <h3>Ciklusok</h3>
            <div class="code-runner">
                <textarea class="code-input">for (let i = 0; i < 5; i++) {
    console.log(i);
}</textarea>
                <button class="run-btn" onclick="runCode(this)">▶ Futtatás</button>
                <div class="output-box"></div>
            </div>
        `
    },

    4: {
        title: "Függvények",
        content: `
            <h2>4. lecke: Függvények</h2>
            <p>A függvények lehetővé teszik, hogy egy műveletsort újra felhasználjunk.</p>

            <h3>Egyszerű függvény:</h3>
            <div class="code-runner">
                <textarea class="code-input">function koszont() {
    console.log("Szia!");
}

koszont();</textarea>
                <button class="run-btn" onclick="runCode(this)">▶ Futtatás</button>
                <div class="output-box"></div>
            </div>

            <h3>Paraméteres függvény:</h3>
            <div class="code-runner">
                <textarea class="code-input">function hello(nev) {
    console.log("Szia " + nev + "!");
}

hello("Anna");</textarea>
                <button class="run-btn" onclick="runCode(this)">▶ Futtatás</button>
                <div class="output-box"></div>
            </div>
        `
    },

    5: {
        title: "Tömbök",
        content: `
            <h2>5. lecke: Tömbök</h2>
            <p>A tömb több értéket tárol egy változóban.</p>

            <div class="code-runner">
                <textarea class="code-input">let szamok = [1, 2, 3, 4];
console.log(szamok[0]);
console.log("Hossz:", szamok.length);</textarea>
                <button class="run-btn" onclick="runCode(this)">▶ Futtatás</button>
                <div class="output-box"></div>
            </div>
        `
    },

    6: {
        title: "Objektumok",
        content: `
            <h2>6. lecke: Objektumok</h2>
            <p>Az objektum kulcs–érték párokat tartalmaz.</p>

            <div class="code-runner">
                <textarea class="code-input">let szemely = {
    nev: "Anna",
    kor: 25,
    diak: true
};

console.log(szemely.nev);</textarea>
                <button class="run-btn" onclick="runCode(this)">▶ Futtatás</button>
                <div class="output-box"></div>
            </div>
        `
    },

    7: {
        title: "DOM manipuláció",
        content: `
            <h2>7. lecke: DOM manipuláció</h2>
            <p>A DOM segítségével módosíthatjuk a weboldal elemeit.</p>

            <p>Ez a példa nem fog működni itt, mert nincs HTML elem, de a működés elve:</p>

            <div class="code-runner">
                <textarea class="code-input">document.getElementById("cim").innerText = "Új cím!";</textarea>
                <button class="run-btn" onclick="runCode(this)">▶ Futtatás</button>
                <div class="output-box"></div>
            </div>
        `
    },

    8: {
        title: "Eseménykezelés",
        content: `
            <h2>8. lecke: Eseménykezelés</h2>

            <p>Elméleti példa (DOM elem nélkül nem fut):</p>

            <div class="code-runner">
                <textarea class="code-input">document.getElementById("gomb").onclick = function() {
    alert("Megnyomtad!");
};</textarea>
                <button class="run-btn" onclick="runCode(this)">▶ Futtatás</button>
                <div class="output-box"></div>
            </div>
        `
    },

    9: {
        title: "API-k",
        content: `
            <h2>9. lecke: API-k</h2>
            <p>API-val külső adatokat kérhetünk le.</p>

            <p>(Ez böngészőben futna valódi API-val.)</p>

            <div class="code-runner">
                <textarea class="code-input">fetch("https://api.example.com")
  .then(res => res.json())
  .then(data => console.log(data));</textarea>
                <button class="run-btn" onclick="runCode(this)">▶ Futtatás</button>
                <div class="output-box"></div>
            </div>
        `
    },

    10: {
        title: "Projekt befejezése",
        content: `
            <h2>10. lecke: Projekt befejezése</h2>
            <p>Gratulálok! Elérkeztél a tananyag végére.</p>

            <h3>Ismétlés:</h3>
            <ul>
                <li>Változók</li>
                <li>Ciklusok</li>
                <li>Függvények</li>
                <li>Objektumok</li>
                <li>DOM</li>
                <li>Események</li>
                <li>API használat</li>
            </ul>

            <h3>Próbáld ki utoljára!</h3>
            <div class="code-runner">
                <textarea class="code-input">console.log("Kész a tanfolyam! 🎉");</textarea>
                <button class="run-btn" onclick="runCode(this)">▶ Futtatás</button>
                <div class="output-box"></div>
            </div>
        `
    }
};
