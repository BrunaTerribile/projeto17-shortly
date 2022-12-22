import { Router } from "express";
import { SignIn, SignUp, getUserUrls } from "../controllers/users.controllers.js";
import { userValidation } from "../middlewares/users.middleware.js";
import { sessionValidation } from "../middlewares/session.middleware.js";

const router = Router();

router.post("/signup", userValidation, SignUp);
router.post("/signin", SignIn);
router.get("/users/me", sessionValidation, getUserUrls)

export default router;