const lessonData = {
    1: {
        title: "Bevezetés a programozásba",
        content: `
            <h2>1. lecke: Bevezetés a programozásba</h2>

            <h3>Feladat:</h3>
            <p>Írd be a következő programot, majd futtasd:</p>
<pre class="code-example">console.log("Hello World!");</pre>

            <p><strong>Mit csinál ez a kód?</strong><br>
            A <code>console.log("Hello World!");</code> utasítás kiírja a konzolra a
            <em>Hello World!</em> szöveget. Ez a klasszikus „első program”, amivel sokan kezdenek.</p>

            <div class="code-runner">
                <textarea class="code-input"></textarea>
                <button class="run-btn"
                    data-expected='console.log("Hello World!");'
                    onclick="runTask(this)">▶ Futtatás</button>
                <div class="output-box"></div>
            </div>
        `
    },

    2: {
        title: "Változók és adattípusok",
        content: `
            <h2>2. lecke: Változók és adattípusok</h2>

            <h3>Feladat:</h3>
            <p>Írd be pontosan ezt a kódot (a konkrét értékeket szabadon változtathatod):</p>
<pre class="code-example">let nev = "Anna";
let kor = 25;
let diak = true;

console.log(nev);
console.log(kor);
console.log(diak);</pre>

            <p><strong>Mit csinál ez a kód?</strong><br>
            Három változót hoz létre:
            <ul>
                <li><code>nev</code> – egy szöveg (string),</li>
                <li><code>kor</code> – egy szám (number),</li>
                <li><code>diak</code> – egy logikai érték (boolean).</li>
            </ul>
            Ezután a <code>console.log()</code> segítségével kiírja mindhárom változó értékét a konzolra.</p>

            <div class="code-runner">
                <textarea class="code-input"></textarea>
                <button class="run-btn"
                    data-expected='let nev="Anna";let kor=25;let diak=true;console.log(nev);console.log(kor);console.log(diak);'
                    data-mode="free"
                    onclick="runTask(this)">▶ Futtatás</button>
                <div class="output-box"></div>
            </div>
        `
    },

    3: {
        title: "Vezérlési szerkezetek",
        content: `
            <h2>3. lecke: Vezérlési szerkezetek</h2>

            <h3>If feladat:</h3>
<pre class="code-example">let kor = 18;

if (kor >= 18) {
    console.log("Nagykorú");
} else {
    console.log("Kiskorú");
}</pre>

            <p><strong>Mit csinál ez a kód?</strong><br>
            Létrehoz egy <code>kor</code> változót 18-as értékkel, majd egy
            <code>if</code> feltétellel eldönti, hogy a személy nagykorú-e.
            Ha a kor nagyobb vagy egyenlő 18-nál, a konzolra az kerül, hogy <em>"Nagykorú"</em>,
            különben az, hogy <em>"Kiskorú"</em>.</p>

            <div class="code-runner">
                <textarea class="code-input"></textarea>
                <button class="run-btn"
                    data-expected='let kor=18;if(kor>=18){console.log("Nagykorú");}else{console.log("Kiskorú");}'
                    data-mode="free"
                    data-range="0-99"
                    onclick="runTask(this)">▶ Futtatás</button>
                <div class="output-box"></div>
            </div>

            <h3>For ciklus:</h3>
<pre class="code-example">for (let i = 0; i < 5; i++) {
    console.log(i);
}</pre>

            <p><strong>Mit csinál ez a kód?</strong><br>
            Egy <code>for</code> ciklus, ami 0-tól 4-ig kiírja a számokat a konzolra.
            Az <code>i</code> változó 0-ról indul, minden ciklusban 1-gyel nő, és addig fut,
            amíg <code>i &lt; 5</code>.</p>

            <div class="code-runner">
                <textarea class="code-input"></textarea>
                <button class="run-btn"
                    data-expected='for(let i=0;i<5;i++){console.log(i);}'
                    data-mode="free"
                    data-range="0-99"
                    onclick="runTask(this)">▶ Futtatás</button>
                <div class="output-box"></div>
            </div>
        `
    },

    4: {
        title: "Függvények",
        content: `
            <h2>4. lecke: Függvények</h2>

            <h3>Egyszerű függvény:</h3>
<pre class="code-example">function koszont() {
    console.log("Szia!");
}

koszont();</pre>

            <p><strong>Mit csinál ez a kód?</strong><br>
            Létrehoz egy <code>koszont</code> nevű függvényt, ami kiírja a konzolra, hogy <em>"Szia!"</em>.
            Az utolsó sorban, a <code>koszont();</code> meghívja a függvényt, így a benne lévő utasítás lefut.</p>

            <div class="code-runner">
                <textarea class="code-input"></textarea>
                <button class="run-btn"
                    data-expected='function koszont(){console.log("Szia!");}koszont();'
                    data-mode="free"
                    onclick="runTask(this)">▶ Futtatás</button>
                <div class="output-box"></div>
            </div>

            <h3>Paraméteres függvény:</h3>
<pre class="code-example">function hello(nev) {
    console.log("Szia " + nev + "!");
}

hello("Anna");</pre>

            <p><strong>Mit csinál ez a kód?</strong><br>
            A <code>hello</code> függvény egy <code>nev</code> nevű paramétert kap.
            A függvény a kapott névvel együtt írja ki, hogy <em>"Szia Anna!"</em>.
            Ha más nevet adnál át, a kimenet is annak megfelelően változna.</p>

            <div class="code-runner">
                <textarea class="code-input"></textarea>
                <button class="run-btn"
                    data-expected='function hello(nev){console.log("Szia "+nev+"!");}hello("Anna");'
                    data-mode="free"
                    onclick="runTask(this)">▶ Futtatás</button>
                <div class="output-box"></div>
            </div>
        `
    },

    5: {
        title: "Tömbök",
        content: `
            <h2>5. lecke: Tömbök</h2>

            <h3>Feladat:</h3>
<pre class="code-example">let szamok = [1, 2, 3, 4];
console.log(szamok[0]);
console.log("Hossz:", szamok.length);</pre>

            <p><strong>Mit csinál ez a kód?</strong><br>
            Létrehoz egy <code>szamok</code> nevű tömböt négy számmal.
            Ezután:
            <ul>
                <li><code>console.log(szamok[0]);</code> – kiírja az első elemet,</li>
                <li><code>console.log("Hossz:", szamok.length);</code> – kiírja a tömb hosszát.</li>
            </ul>
            Így látod, hogyan érjük el az egyes elemeket és a tömb méretét.</p>

            <div class="code-runner">
                <textarea class="code-input"></textarea>
                <button class="run-btn"
                    data-expected='let szamok=[1,2,3,4];console.log(szamok[0]);console.log("Hossz:",szamok.length);'
                    data-mode="free"
                    onclick="runTask(this)">▶ Futtatás</button>
                <div class="output-box"></div>
            </div>
        `
    },

    6: {
        title: "Objektumok",
        content: `
            <h2>6. lecke: Objektumok</h2>

            <h3>Feladat:</h3>
<pre class="code-example">let szemely = {
    nev: "Anna",
    kor: 25,
    diak: true
};

console.log(szemely.nev);</pre>

            <p><strong>Mit csinál ez a kód?</strong><br>
            Létrehoz egy <code>szemely</code> nevű objektumot, amely három tulajdonságot tartalmaz:
            <code>nev</code>, <code>kor</code> és <code>diak</code>.
            A <code>console.log(szemely.nev);</code> csak a név tulajdonság értékét írja ki.</p>

            <div class="code-runner">
                <textarea class="code-input"></textarea>
                <button class="run-btn"
                    data-expected='let szemely={nev:"Anna",kor:25,diak:true};console.log(szemely.nev);'
                    data-mode="free"
                    onclick="runTask(this)">▶ Futtatás</button>
                <div class="output-box"></div>
            </div>
        `
    },

    7: {
        title: "DOM manipuláció",
        content: `
            <h2>7. lecke: DOM manipuláció</h2>

            <h3>Feladat:</h3>
            <p>Az alábbi címsor szövegét fogjuk JavaScriptből módosítani.</p>

            <div class="dom-demo-box">
                <h3 id="cim">Eredeti cím</h3>
            </div>

            <p>Írd be a következő kódot, majd futtasd (a szöveget bátran átírhatod):</p>
<pre class="code-example">document.getElementById("cim").innerText = "Új cím!";</pre>

            <p><strong>Mit csinál ez a kód?</strong><br>
            Megkeresi azt a HTML elemet, amelynek az <code>id</code>-je <code>"cim"</code>,
            majd annak a szövegét átírja <em>"Új cím!"</em>-re. Így tudjuk JavaScriptből módosítani
            egy weboldal tartalmát.</p>

            <div class="code-runner">
                <textarea class="code-input"></textarea>
                <button class="run-btn"
                    data-expected='document.getElementById("cim").innerText="Új cím!";'
                    data-mode="free"
                    onclick="runTask(this)">▶ Futtatás</button>
                <div class="output-box"></div>
            </div>
        `
    },

    8: {
        title: "Eseménykezelés",
        content: `
            <h2>8. lecke: Eseménykezelés</h2>

            <p>Most egy <strong>valódi gombot</strong> fogunk kezelni JavaScriptből.</p>

            <button id="gomb" class="run-btn" style="background:#2196f3;margin-bottom:10px;">
                Kattints ide, ha a kód jó!
            </button>

            <p>Írd be az alábbi kódot, majd futtasd:</p>
<pre class="code-example">document.getElementById("gomb").onclick = function() {
    alert("Siker!");
};</pre>

            <p><strong>Mit csinál ez a kód?</strong><br>
            Megkeresi a <code>gomb</code> azonosítójú HTML elemet, és beállít egy kattintás eseménykezelőt.
            Amikor a felhasználó rákattint erre a gombra, megjelenik egy felugró ablak azzal a szöveggel, hogy
            <em>"Siker!"</em>.</p>

            <div class="code-runner">
                <textarea class="code-input"></textarea>
                <button class="run-btn"
                    data-expected='document.getElementById("gomb").onclick=function(){alert("Siker!");};'
                    onclick="runTask(this)">▶ Futtatás</button>
                <div class="output-box"></div>
            </div>
        `
    },

     9: {
        title: "API-k",
        content: `
            <h2>9. lecke: API-k</h2>

            <p>(Ez csak példa, valós API nélkül hibát dobna.)</p>

<pre class="code-example">fetch("https://api.example.com").then(res => res.json()).then(data => console.log(data));</pre>

            <p><strong>Mit csinál ez a kód?</strong><br>
            A <code>fetch()</code> segítségével egy külső szerverről kér le adatokat.
            Ha a kérés sikeres:
            <ul>
                <li><code>res.json()</code> – a választ JSON formátumúra alakítja,</li>
                <li><code>console.log(data)</code> – kiírja a lekért adatokat a konzolra.</li>
            </ul>
            Valódi API cím megadásával ez egy alap minta az adatok lekérésére.</p>

            <div class="code-runner">
                <textarea class="code-input"></textarea>
                <button class="run-btn"
                    data-expected='fetch("https://api.example.com").then(res=>res.json()).then(data=>console.log(data));'
                    onclick="runTask(this)">▶ Futtatás</button>
                <div class="output-box"></div>
            </div>
        `
    },

    10: {
        title: "Projekt befejezése",
        content: `
            <h2>10. lecke: Projekt befejezése</h2>

            <h3>Utolsó feladat:</h3>
<pre class="code-example">console.log("Kész a tanfolyam! 🎉");</pre>

            <p><strong>Mit csinál ez a kód?</strong><br>
            Egyszerűen kiírja a konzolra, hogy <em>"Kész a tanfolyam! 🎉"</em>.
            Ez egy jelképes lezárás: ezzel üzenjük, hogy a program (és a tananyag) sikeresen lefutott.</p>

            <div class="code-runner">
                <textarea class="code-input"></textarea>
                <button class="run-btn"
                    data-expected='console.log("Kész a tanfolyam! 🎉");'
                    onclick="runTask(this)">▶ Futtatás</button>
                <div class="output-box"></div>
            </div>
        `
    }
};
