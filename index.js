try {
  const express = require("express");
  const app = express();
  const PORT = process.env.PORT || 3000;

  app.get("/", (req, res) => {
    res.send("✅ Render server attivo - test debug");
  });

  app.listen(PORT, () => {
    console.log(`🚀 Server in ascolto sulla porta ${PORT}`);
    setInterval(() => console.log("⏳ keep-alive"), 30000);
  });
} catch (err) {
  console.error("❌ Errore di avvio:", err);
  process.exit(1);
}
