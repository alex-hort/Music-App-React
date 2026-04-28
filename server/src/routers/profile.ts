import { mustAuth } from '#/middleware/auth';
import {Router} from 'express';
import { updateFollower, getUploads, getPublicUploads , getPublicProfile, getPublicPlaylist } from '../controllers/profile';

const router = Router();


router.post("/update-follower/:profileId", mustAuth,updateFollower)
router.get("/upload", mustAuth, getUploads)
router.get("/upload/:profileId", getPublicUploads)
router.get("/info/:profileId", getPublicProfile)
router.get("/playlist/:profileId", getPublicPlaylist)

export default router;