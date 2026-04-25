import "dotenv/config";
import express from "express";
import "./db";

import { PORT } from "#/utils/variables";

import authRouter from "#/routers/auth";
import audioRouter from "#/routers/audio";

const app = express();

// Solo static va global
app.use(express.static("src/public"));

// ✅ express.json() solo donde se necesita (auth usa JSON, audio usa multipart)
app.use("/auth", express.json(), express.urlencoded({ extended: true }), authRouter);
app.use("/audio", audioRouter); // fileParser maneja su propio parsing

app.listen(PORT, () => {
  console.log(`Server corriendo en puerto ${PORT}`);
});