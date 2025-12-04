import express from "express";
import axios from "axios";
import cors from "cors";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// 1. Redirect URL → Google envía ?code=XXX aquí
app.get("/auth/google/redirect", async (req, res) => {
  const code = req.query.code;
  try {
    // 2. Intercambio del "code" por tokens (Google)
    const response = await axios.post(
      "https://oauth2.googleapis.com/token",
      {
        code,
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        redirect_uri: "http://localhost:3000/auth/google/redirect",
        grant_type: "authorization_code",
      }
    );

    const { access_token, id_token } = response.data;

    // Opcional: crear un JWT propio
    const ourJWT = jwt.sign(
      { google_token: access_token },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "1h" }
    );

    // 3. Enviar token al frontend
    res.redirect(`http://localhost:5173/auth/callback?token=${ourJWT}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Authentication error");
  }
});
// 2. Endpoint para generar imagen
app.post("/generate-image", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    // Usando Pollinations (no requiere API key)
    const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`;
    
    res.json({ imageUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error generating image" });
  }
});

app.listen(3000, () => console.log("Backend running on 3000"));
