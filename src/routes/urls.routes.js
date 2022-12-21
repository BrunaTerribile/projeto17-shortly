import { Router } from "express";
import { deleteUrl, getUrl, goToUrl, shortener } from "../controllers/urls.controllers.js";

const router = Router();

router.post("/urls/shorten", shortener);
router.get("/urls/:id", getUrl);
router.get("/urls/open/:shortUrl", goToUrl);
router.delete("/urls/:id", deleteUrl);

export default router;