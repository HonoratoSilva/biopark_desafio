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

        return res.status(200).json("Usuario criado com sucesso.");
    })
};

export const updateEdificios = (req, res) => {
    const q = 
    "UPDATE edificio SET `numero_edificio` = ?, WHERE `id_edificio` = ?";

    const values = [
        req.body.numero_edificio,
    ];

    db.query(q, [...values, req.params.id_edificio], (err) => {
        if (err) return res.json(err);

        return  res.status(200).join("Usuário atualizado com sucesso.");
    });
};

export const deleteEdificios = (req, res) => {
    const q = "DELETE FROM edificio WHERE `id_edificio` = ?";

    db.query(q, [req.params.id_edificio], (err) => {
        if (err) return res.json(err);

        return res.status(200).json("Usuário deletado com sucesso.");

    })
}