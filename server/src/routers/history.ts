import { mustAuth } from "#/middleware/auth";
import {Router} from "express";
import { updateHistory, removeHistory, getHistories, getRecentlyPlayed} from "#/controllers/history";
import { validate } from "#/middleware/validators";
import { UpdateeHistorySchema,  } from "#/utils/validationSchema";

const router = Router();


router.post("/", mustAuth,validate(UpdateeHistorySchema) ,updateHistory)
router.delete("/", mustAuth, removeHistory)
router.get("/", mustAuth, getHistories )
router.get("/recently-played", mustAuth, getRecentlyPlayed)

export default router;