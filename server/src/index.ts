import "dotenv/config";
import express from "express";
import "./db";

import { PORT } from "#/utils/variables";

import authRouter from "#/routers/auth";
import audioRouter from "#/routers/audio";
import favoriteRouter from "#/routers/favorite";

const app = express();

// Solo static va global
app.use(express.static("src/public"));


app.use("/auth", express.json(), express.urlencoded({ extended: true }), authRouter);
app.use("/audio", audioRouter); 
app.use("/favorite", favoriteRouter)
app.listen(PORT, () => {
  console.log(`Server corriendo en puerto ${PORT}`);
});