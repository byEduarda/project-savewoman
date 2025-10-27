import express from "express";
import { getInstitutions, createInstitution } from "../controllers/institution.controller";

const router = express.Router();

router.get("/", getInstitutions);
router.post("/", createInstitution);

export default router;