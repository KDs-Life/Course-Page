// Importiere das "mongoose"-Modul.
import mongoose from "mongoose";

// Verbinde mit der MongoDB-Datenbank, die in der Umgebungsvariable "MONGO_URI" konfiguriert ist.
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // Wenn die Verbindung erfolgreich ist, gebe "Connected to MongoDB" in der Konsole aus.
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    // Wenn ein Fehler auftritt, gebe "MongoDB Connection Error" gefolgt von der Fehlermeldung in der Konsole aus.
    console.error("MongoDB Connection Error:", error);
  });
