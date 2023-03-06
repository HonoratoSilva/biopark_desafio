import express from "express";
import { getApartamentos,  addApartamentos, /* updateApartamentos,*/ deleteApartamentos  } from "../controllers/apartamento.js"

const router = express.Router();

router.get("/apartamento", getApartamentos);

router.post("/apartamento", addApartamentos);

// router.put("/apartamento/:id_apartamento", updateApartamentos);

router.delete("/apartamento/:id_apartamento", deleteApartamentos);

export default router;
