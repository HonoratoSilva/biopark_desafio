import express from "express";
import { getLocatarios, addLocatarios /* , updateLocatarios, deleteLocatarios  */} from "../controllers/locatario.js"

const router = express.Router();

router.get("/locatarios", getLocatarios);

router.post("/locatarios", addLocatarios);

// router.put("/edificios/:id_edificio", updateLocatarios);

// router.delete("/edificios/:id_edificio", deleteLocatarios);

export default router;
