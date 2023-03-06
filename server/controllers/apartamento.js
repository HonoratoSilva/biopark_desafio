import { db } from "../db.js";

export const getApartamentos = (_, res) => {

    const q = `SELECT * FROM apartamento
    INNER JOIN edificio ON edificio.id_edificio=apartamento.edificio_id_edificio`;

    db.query(q, (err, data) => {
        if (err) return res.json(err);

        return res.status(200).json(data);
    });
};

export const addApartamentos = (req, res) => {
    const q = "INSERT INTO apartamento(`numero_apartamento`,  `edificio_id_edificio`) VALUES(?)";

    const values = [
        req.body.numero_apartamento,
        req.body.edificio_id_edificio
    ];

    db.query(q, [values], (err) => {
        if(err) return res.json(err);

        return res.status(200).json("Apartamento criado com sucesso.");
    })
};

export const deleteApartamentos = (req, res) => {
    const q = "DELETE FROM apartamento WHERE `id_apartamento` = ?";

    db.query(q, [req.params.id_apartamento], (err) => {
        if (err) return res.json(err);

        return res.status(200).json("Apartamento deletado com sucesso.");

    })
}