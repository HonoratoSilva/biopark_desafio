import express from "express";
import { getEdificios, addEdificios } from "../controllers/edificio.js"

const router = express.Router();

router.get("/edificios", getEdificios);

router.post("/edificios", addEdificios);

export default router;
