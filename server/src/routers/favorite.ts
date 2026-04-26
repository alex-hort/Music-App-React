import { getFavorites, toggleFavorite, getIsFavorite } from "#/controllers/favorite";
import { isVerified, mustAuth } from "#/middleware/auth";
import { Router  } from "express";

const router = Router();

//favorite
router.post("/", mustAuth, isVerified, toggleFavorite);
router.get("/", mustAuth, isVerified, getFavorites);
router.get("/is-fav", mustAuth, getIsFavorite)

export default router;