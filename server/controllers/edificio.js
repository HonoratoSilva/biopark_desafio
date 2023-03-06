import { db } from "../db.js";

export const getEdificios = (_, res) => {
    const q = "SELECT * FROM edificio";

    db.query(q, (err, data) => {
        if (err) return res.json(err);

        return res.status(200).json(data);
    });
};

export const addEdificios = (req, res) => {
    const q = "INSERT INTO edificio(`numero_edificio`) VALUES(?)";

    const values = [
        req.body.numero_edificio,
    ];

    db.query(q, [values], (err) => {
        if(err) return res.json(err);

        return res.status(200).json("Edificio criado com sucesso.");
    })
};