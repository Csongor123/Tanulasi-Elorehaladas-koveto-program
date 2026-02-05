const express = require("express");
const path = require("path");

const app = express();
app.use(express.json());

// 1) Statikus fájlok (index.html stb.) kiszolgálása a public mappából
app.use(express.static(path.join(__dirname, "public")));

// 2) Teszt végpont
app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

// 3) Indítás
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Fut: http://localhost:" + PORT);
  console.log("Health: http://localhost:" + PORT + "/api/health");
});
