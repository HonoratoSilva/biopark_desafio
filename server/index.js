import express from "express";
import userRoutesEdificios from "./routes/edificios.js";
import userRoutesApartamentos from "./routes/apartamentos.js";
import userRoutesLocatarios from "./routes/locatario.js";
import userRoutesContrato from "./routes/contrato.js";

import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/", userRoutesEdificios);
app.use("/", userRoutesApartamentos);
app.use("/", userRoutesLocatarios);
app.use("/", userRoutesContrato);


app.listen(8800);