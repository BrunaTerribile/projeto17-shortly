import { Router } from "express";
import { SignIn, SignUp, getUserUrls, getRanking } from "../controllers/users.controllers.js";
import { userValidation } from "../middlewares/users.middleware.js";
import { sessionValidation } from "../middlewares/session.middleware.js";

const router = Router();

router.post("/signup", userValidation, SignUp);
router.post("/signin", SignIn);
router.get("/users/me", sessionValidation, getUserUrls)
router.get("/ranking", getRanking)

export default router;