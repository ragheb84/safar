import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("✅ Server attivo - Test base su Render");
});

// cattura errori non gestiti
process.on("uncaughtException", err => {
  console.error("❌ Errore non gestito:", err);
});

process.on("unhandledRejection", err => {
  console.error("❌ Promessa non gestita:", err);
});

app.listen(PORT, () => {
  console.log(`🚀 Server attivo sulla porta ${PORT}`);
  // Mantieni il processo vivo artificialmente
  setInterval(() => console.log("⏳ keep-alive"), 30000);
});
