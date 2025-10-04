const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("✅ Server attivo - Test base su Render (CommonJS)");
});

app.listen(PORT, () => {
  console.log(`🚀 Server in ascolto sulla porta ${PORT}`);
  setInterval(() => console.log("⏳ keep-alive"), 30000);
});
