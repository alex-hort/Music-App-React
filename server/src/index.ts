import "dotenv/config";
import express from "express";
import "./db";

import { PORT } from "#/utils/variables";

import authRouter from "#/routers/auth";
import audioRouter from "#/routers/audio";
import favoriteRouter from "#/routers/favorite";
import playlistRouter from "#/routers/playlist";
import profileRouter from '#/routers/profile';

// ✅ Ponlo global, antes de todas las rutas
const app = express();

app.use(express.static("src/public"));
app.use(express.json());                     
app.use(express.urlencoded({ extended: true })); 

app.use("/auth", authRouter);
app.use("/audio", audioRouter); 
app.use("/favorite", favoriteRouter);
app.use("/playlist", playlistRouter);
app.use("/profile", profileRouter);

app.listen(PORT, () => {
  console.log(`Server corriendo en puerto ${PORT}`);
});