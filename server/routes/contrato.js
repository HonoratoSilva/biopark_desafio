import express from "express";
import { getContratos, addContratos } from "../controllers/contratos.js"

const router = express.Router();

router.get("/contrato", getContratos);

router.post("/contrato", addContratos);

export default router;