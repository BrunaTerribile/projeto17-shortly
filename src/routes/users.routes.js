import { Router } from "express";
import { SignIn, SignUp } from "../controllers/users.controllers.js";
import { userValidation } from "../middlewares/users.middleware.js";

const router = Router();

router.post("/signup", userValidation, SignUp);
router.post("/signin", userValidation, SignIn);

export default router;