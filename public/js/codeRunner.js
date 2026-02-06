function runCode(button) {
    const container = button.closest(".code-runner");
    const input = container.querySelector(".code-input");
    const outputBox = container.querySelector(".output-box");

    outputBox.innerHTML = ""; 
    outputBox.classList.remove("error");

    try {
        let result = eval(input.value);

        if (result === undefined) {
            outputBox.innerHTML = "<span class='ok'>✓ Kód sikeresen lefutott</span>";
        } else {
            outputBox.innerHTML = `<span class='result'>${result}</span>`;
        }

    } catch (error) {
        outputBox.classList.add("error");
        outputBox.innerHTML = `<span class='error-text'>❌ Hiba: ${error.message}</span>`;
    }

    outputBox.scrollTop = outputBox.scrollHeight;
}
