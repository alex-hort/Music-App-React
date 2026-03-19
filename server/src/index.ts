import "dotenv/config";
import express from "express";
import "./db";

import { PORT } from "#/utils/variables";
import authRouter from "#/routers/auth";


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("src/public"));
app.use("/auth", authRouter);


app.listen(PORT, () => {
  console.log(`🚀 Server corriendo en puerto ${PORT}`);
});
