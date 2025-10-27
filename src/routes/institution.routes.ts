import express from "express";
import { getInstitutions, createInstitution, getInstitutionById, deleteInstitutionById, updateInstitutionById, getInstitutionByCity } from "../controllers/institution.controller";

const router = express.Router();

router.get("/", getInstitutions);
router.get("/:id", getInstitutionById);
router.get("/city/:city", getInstitutionByCity);

router.post("/", createInstitution);
router.put("/:id", updateInstitutionById);
router.delete("/:id", deleteInstitutionById);

export default router;