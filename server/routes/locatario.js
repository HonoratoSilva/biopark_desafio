import express from "express";
import { getLocatarios, addLocatarios } from "../controllers/locatario.js"

const router = express.Router();

router.get("/locatarios", getLocatarios);

router.post("/locatarios", addLocatarios);

export default router;
