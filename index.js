const express = require("express");
const ftp = require("basic-ftp");

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", async (req, res) => {
  if (req.query.key !== "LYMPHEA123") {
    return res.status(403).send("Accesso non autorizzato");
  }

  const client = new ftp.Client();
  client.ftp.verbose = false;

  try {
    await client.access({
      host: "85.39.189.15",
      user: "listino_ff",
      password: "FcpoE3qRs6",
      secure: false,
      timeout: 20000
    });

    let text = "";
    const writable = {
      write: (chunk) => {
        text += chunk.toString("utf8");
      },
      end: () => {}
    };

    await client.downloadTo(writable, "safar_pe.txt");

    text = text.replace(/\|/g, ";");
    res.set("Content-Type", "text/plain; charset=utf-8");
    res.send(text);

  } catch (err) {
    console.error("❌ Errore FTP:", err.message);
    res.status(500).send("Errore FTP: " + err.message);
  } finally {
    client.close();
  }
});

app.listen(PORT, () => console.log(`🚀 Proxy Safar attivo sulla porta ${PORT}`));
