import { isVerified, mustAuth } from "#/middleware/auth";
import {validate} from "#/middleware/validators";
import { NewPlaylistValidationSchema, OldPlaylistValidationSchema } from "#/utils/validationSchema";
import { Router } from "express";
import { createPlaylist, updatePlaylist , deletePlaylist, getPlaylistByProfile, getAudios} from "../controllers/playlist";


const router = Router();

router.post("/create", mustAuth, isVerified, validate(NewPlaylistValidationSchema), createPlaylist);
router.patch("/", mustAuth, validate(OldPlaylistValidationSchema), updatePlaylist);
router.delete("/", mustAuth, deletePlaylist);
router.get("/by-profile", mustAuth, getPlaylistByProfile);
router.get("/:playlistId", mustAuth, getAudios)

export default router;