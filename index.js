import express from "express";
import ftp from "basic-ftp";

const app = express();

app.get("/", async (req, res) => {
  if (req.query.key !== "LYMPHEA123") return res.status(403).send("Accesso non autorizzato");

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

    const chunks = [];
    await client.downloadTo({
      write: (data) => chunks.push(data)
    }, "safar_pe.txt");

    const buffer = Buffer.concat(chunks);
    const text = buffer.toString("utf8").replace(/\|/g, ";");

    res.set("Content-Type", "text/csv; charset=utf-8");
    res.send(text);
  } catch (err) {
    console.error("Errore FTP:", err.message);
    res.status(500).send("Errore FTP: " + err.message);
  } finally {
    client.close();
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Proxy Safar attivo sulla porta ${PORT}`));
