import express from "express";
import { getAllContents, createContent } from "../controllers/content.controller";

const router = express.Router();

router.get("/", getAllContents);
router.post("/", createContent); 
export default router;