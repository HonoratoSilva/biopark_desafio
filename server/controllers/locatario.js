import { db } from "../db.js";

export const getLocatarios = (_, res) => {

    const q = "SELECT * FROM locatario";

    db.query(q, (err, data) => {
        if (err) return res.json(err);

        return res.status(200).json(data);
    });
};

export const addLocatarios = (req, res) => {
    const q = "INSERT INTO locatario(`nome`, `telefone`, `email`) VALUES(?)";

    const values = [
        req.body.nome,
        req.body.telefone,
        req.body.email
    ];

    db.query(q, [values], (err) => {
        if(err) return res.json(err);

        return res.status(200).json("Locatário criado com sucesso.");
    })
};