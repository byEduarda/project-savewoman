import express from "express";
import { getAllContents, createContent, getContentsByCategory, getContentById, updateContentById, deleteContentById } from "../controllers/content.controller";

const router = express.Router();

router.get("/", getAllContents);
router.get("/", getContentById);    
router.get("/:category", getContentsByCategory);

router.post("/", createContent); 
router.put("/:id", updateContentById); 
router.delete("/:id", deleteContentById); 

export default router;