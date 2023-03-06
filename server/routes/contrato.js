import express from "express";
import { getContratos, addContratos, deleteContratos } from "../controllers/contratos.js"

const router = express.Router();

router.get("/contrato", getContratos);

router.post("/contrato", addContratos);

router.delete("/contrato/:id_contrato", deleteContratos);

export default router;