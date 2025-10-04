import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("✅ Proxy Safar attivo - test base");
});

app.listen(PORT, () => console.log(`🚀 Server in ascolto sulla porta ${PORT}`));
