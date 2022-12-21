import { Router } from "express";
import { SignIn, SignUp } from "../controllers/users.controllers.js";

const router = Router();

router.post("/signin", SignIn);
router.post("/signup", SignUp);

export default router;