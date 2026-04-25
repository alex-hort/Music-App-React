import { Router } from "express";
import { CreateUserSchema, SignInVerificationSchema, TokenAndIDValidation, UpdatePasswordSchema  } from "#/utils/validationSchema";
import { validate } from "#/middleware/validators";
import { create, generateForgetPasswordLink, grantValid, logOut, sendProfile, sendReVerificationToken, signIn, updatePassword, updateProfile, verifyEmail } from "#/controllers/auth";
import { isValidPasswordResetToken, mustAuth } from "#/middleware/auth";
import fileParser from "#/middleware/fileParser";
import { sendPasswordResetSuccessEmail } from "#/utils/mail";


const router = Router();

router.post("/create",validate(CreateUserSchema), create);
router.post("/verify-email",validate(TokenAndIDValidation ),verifyEmail);
router.post("/re-verify-email" , sendReVerificationToken);
router.post("/forget-password" , generateForgetPasswordLink);
router.post("/verify-pass-reset-token",validate(TokenAndIDValidation),isValidPasswordResetToken, grantValid);
router.post("/update-password",validate(UpdatePasswordSchema),isValidPasswordResetToken, updatePassword);
router.post("/sign-in",validate(SignInVerificationSchema), signIn);
router.get("/is-auth", mustAuth, sendProfile)

router.post("/update-profile",mustAuth,fileParser, updateProfile)
router.post("/log-out",mustAuth, logOut)

export default router;