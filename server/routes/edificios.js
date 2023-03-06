import express from "express";
import { getEdificios, addEdificios, updateEdificios, deleteEdificios } from "../controllers/edificio.js"

const router = express.Router();

router.get("/edificios", getEdificios);

router.post("/edificios", addEdificios);

router.put("/edificios/:id_edificio", updateEdificios);

router.delete("/edificios/:id_edificio", deleteEdificios);

export default router;
