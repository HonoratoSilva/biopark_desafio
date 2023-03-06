import { db } from "../db.js";

export const getApartamentos = (_, res) => {
    // const q = `SELECT id_apartamento, numero_apartamento, aluguel, edificio.numero_edificio, locatario.nome 
    // FROM apartamento 
    // INNER JOIN edificio ON edificio.id_edificio=apartamento.edificio_id_edificio
    // INNER JOIN locatario ON locatario.id_locatario=apartamento.locatario_id_locatario`;
    //LEFT JOIN locatario ON locatario.id_locatario=apartamento.locatario_id_locatario

    const q = `SELECT * FROM apartamento`;

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
    console.log({values})
    db.query(q, [values], (err) => {
        console.log(err)
        if(err) return res.json(err);

        return res.status(200).json("Apartamento criado com sucesso.");
    })
};

// export const updateStatusApartamentos = (req, res) => {
//     const q = 
//     "UPDATE apartamento SET `status` = ?, WHERE `id_apartamento` = ?";

//     const values = [
//         req.body.status,
//     ];

//     db.query(q, [...values, req.params.id_apartamento], (err) => {
//         if (err) return res.json(err);

//         return  res.status(200).join("Usuário atualizado com sucesso.");
//     });
// };

export const deleteApartamentos = (req, res) => {
    const q = "DELETE FROM apartamento WHERE `id_apartamento` = ?";

    db.query(q, [req.params.id_apartamento], (err) => {
        if (err) return res.json(err);

        return res.status(200).json("Usuário deletado com sucesso.");

    })
}