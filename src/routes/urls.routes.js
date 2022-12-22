import { Router } from "express";
import { deleteUrl, getUrl, goToUrl, shortener } from "../controllers/urls.controllers.js";
import { sessionValidation } from "../middlewares/session.middleware.js";

const router = Router();

router.post("/urls/shorten", sessionValidation, shortener);
router.get("/urls/:id", getUrl);
router.get("/urls/open/:shortUrl", goToUrl);
router.delete("/urls/:id", sessionValidation, deleteUrl);

export default router;