import { db } from "../db.js";

export const getContratos = (_, res) => {

    const q = `SELECT id_contrato, apartamento.numero_apartamento, apartamento.status as apartamento_status, aluguel, locatario.nome as locatario_nome, edificio.numero_edificio
    FROM contrato 
    INNER JOIN apartamento ON apartamento.id_apartamento=contrato.apartamento_id_apartamento
    INNER JOIN locatario ON locatario.id_locatario=contrato.locatario_id_locatario
    INNER JOIN edificio ON edificio.id_edificio=apartamento.edificio_id_edificio`;

    db.query(q, (err, data) => {
        if (err) return res.json(err);

        return res.status(200).json(data);
    });
};

export const addContratos = (req, res) => {
    const q = "INSERT INTO contrato(`aluguel`, `apartamento_id_apartamento`, `locatario_id_locatario`) VALUES(?)";
    const updateApartamento = "UPDATE apartamento SET status = 'alugado', WHERE `id_apartamento` = ?";

    const valuesToUpdateApartamento = [
        req.body.apartamento_id_apartamento,
    ]

    db.query(updateApartamento, [valuesToUpdateApartamento], (err) => {
        console.log(err)
        if(err) return res.json(err);
    })

    const values = [
        req.body.aluguel,
        req.body.apartamento_id_apartamento,
        req.body.locatario_id_locatario,
    ];

    db.query(q, [values], (err) => {
        console.log(err)
        if(err) return res.json(err);

        return res.status(200).json("Contrato criado com sucesso.");
    });
};