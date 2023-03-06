import { db } from "../db.js";

export const getLocatarios = (_, res) => {
    // const q = `SELECT id_apartamento, numero_apartamento, aluguel, edificio.numero_edificio, locatario.nome 
    // FROM apartamento 
    // INNER JOIN edificio ON edificio.id_edificio=apartamento.edificio_id_edificio
    // INNER JOIN locatario ON locatario.id_locatario=apartamento.locatario_id_locatario`;

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

        return res.status(200).json("Usuario criado com sucesso.");
    })
};

// export const updateLocatarios = (req, res) => {
//     const q = 
//     "UPDATE apartamento SET `nome` = ?, `telefone` = ?, `email` = ? WHERE `id_locatario` = ?";

//     const values = [
//         req.body.nome,
//         req.body.telefone,
//         req.body.email
//     ];

//     db.query(q, [...values, req.params.id_locatario], (err) => {
//         if (err) return res.json(err);

//         return  res.status(200).join("Usuário atualizado com sucesso.");
//     });
// };

// export const deleteLocatarios = (req, res) => {
//     const q = "DELETE FROM apartamento WHERE `id_apartamento` = ?";

//     db.query(q, [req.params.id_locatario], (err) => {
//         if (err) return res.json(err);

//         return res.status(200).json("Usuário deletado com sucesso.");

//     })
// }