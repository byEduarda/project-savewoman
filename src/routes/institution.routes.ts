import express from "express";
import { getAllInstitutions, createInstitution, getInstitutionById, deleteInstitution, updateInstitution, getInstitutionsByCity } from "../controllers/institution.controller";

const router = express.Router();

router.get("/", getAllInstitutions);
router.get("/:id", getInstitutionById);
router.get("/city/:city", getInstitutionsByCity);

router.post("/", createInstitution);
router.put("/:id", updateInstitution);
router.delete("/:id", deleteInstitution);

export default router;