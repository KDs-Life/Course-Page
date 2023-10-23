// Zuerst importieren wir benötigte Module und Dateien
import User from "../models/User.js"; // Wir importieren das User-Modell
import asyncHandler from "../utils/asyncHandler.js"; // Wir importieren ein Hilfsmodul für asynchrone Funktionen
import bcrypt from "bcrypt"; // Wir importieren das bcrypt-Modul zur Passwortverschlüsselung
import jwt from "jsonwebtoken"; // Wir importieren das jwt-Modul zur Token-Erstellung

//TODO: express-validator for checking data? (Möglicherweise müssen wir ein Validierungsmodul hinzufügen)

// Hier erstellen wir eine Funktion, um einen Benutzer zu registrieren
export const registerUser = asyncHandler(async (req, res, next) => {
  // Zuerst holen wir die E-Mail und das Passwort aus der Anfrage
  const { email, password } = req.body;
  
  // Wir überprüfen, ob bereits ein Benutzer mit dieser E-Mail existiert
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    // Wenn ein Benutzer gefunden wurde, geben wir einen Konfliktstatus zurück
    return res
      .status(409)
      .send({ status: "error", message: "Email is already registered" });
  }

  // Wir verschlüsseln das Passwort
  const hash = await bcrypt.hash(password, 10);

  // Wir erstellen einen neuen Benutzer in der Datenbank
  const newUser = await User.create({
    email,
    password: hash,
  });

  // Wir generieren ein JWT-Token für den neuen Benutzer
  const token = jwt.sign(
    { uid: newUser._id, username: newUser.email },
    process.env.ACCESS_TOKEN_SECRET
  );

  // Wir senden eine Erfolgsmeldung mit dem Token zurück
  res
    .status(201)
    .send({ token, status: "success", message: "Register user successful" });
});

// Hier erstellen wir eine Funktion, um einen Benutzer abzumelden
export const logoutUser = async (req, res, next) => {
  // Wir entfernen das Access Token-Cookie und senden eine Erfolgsmeldung zurück
  return res
    .clearCookie("accessToken")
    .status(200)
    .json({ status: "success", message: "Logout successful" });
};

// Hier erstellen wir eine Funktion, um einen Benutzer einzuloggen
export const loginUser = asyncHandler(async (req, res) => {
  // Zuerst holen wir die E-Mail und das Passwort aus der Anfrage
  const { email, password } = req.body;
  
  // Wir überprüfen, ob E-Mail und Passwort vorhanden sind
  if (!email || !password) {
    return res
      .status(400)
      .json({ status: "error", message: "Email and password are required." });
  }

  // Wir suchen den Benutzer in der Datenbank anhand der E-Mail und holen das Passwort
  const foundUser = await User.findOne({ email }).select("+password");

  // Wenn der Benutzer nicht gefunden wurde, geben wir eine Fehlermeldung zurück
  if (!foundUser)
    return res
      .status(404)
      .send({ status: "error", message: "Email not found." });

  // Wir vergleichen das eingegebene Passwort mit dem gespeicherten Passwort
  const match = await bcrypt.compare(password, foundUser.password);

  if (match) {
    // Wenn das Passwort übereinstimmt, generieren wir ein Access Token
    const accessToken = jwt.sign(
      {
        email: foundUser.email,
      },
      process.env.ACCESS_TOKEN_SECRET
    );

    // Wir setzen das Access Token als Cookie mit einer begrenzten Gültigkeitsdauer
    res.cookie("accessToken", accessToken, { httpOnly: true, maxAge: 1800000 }); // 30 Minuten

    // Wir senden eine Erfolgsmeldung zurück
    res.status(200).send({ status: "success", message: "Login successful." });
  }
});

// TODO: Authentifizierte Benutzerroute zur Überprüfung von Anfragen (Diese Route fehlt im aktuellen Code)
