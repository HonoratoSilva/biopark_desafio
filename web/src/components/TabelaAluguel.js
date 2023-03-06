import React from "react";
import axios from "axios";
import styled from "styled-components";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

const Table = styled.table`
    width: 100%;
    background-color: #fff;
    padding: 20px;
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 5px;
    max-width: 800px;
    margin: 20px auto;
    // word-break: break-all;
`;

export const Thead = styled.thead``;

export const Tr = styled.tr``;
export const Tbody = styled.tbody``;

export const Th = styled.th`
    text-aligh: start;
    border-bottom: inset;
    padding-bottom: 5px;
    padding-left: 5px;

    @media (max-width: 500px) {
        ${(props) => props.onlyWeb && "display: none"} 
    }
`;

export const Td = styled.td`
    padding-top: 15px;
    text-align: ${(props) => (props.alignCenter ? "center" : "start")};
    width: ${(props) => (props.width ? props.width : "auto")};

    @media (max-width: 500px) {
        ${(props) => props.onlyWeb && "display: none"} 
    }
`;

export const P = styled.p`
    color: #458510;
`;

const Tabela = ({ contratos, setContratos }) => {

    const handleDelete= async (id_contrato) => {
        await axios
            .delete("http://localhost:8800/contrato/" + id_contrato)
            .then(({ data }) => {
                const newArray = contratos.filter((contrato) => contrato.id_contrato !== id_contrato);

                setContratos(newArray);
                toast.success(data);
            }).catch(({ data }) => toast.error(data));

        //setOnEdit(null);
    };

    return (
        <Table>
            <Thead>
                <Tr>
                    <Th>Edifício</Th>
                    <Th>Apartamento</Th>
                    <Th>Locatário</Th>
                    <Th>Aluguel</Th>
                    <Th>Status</Th>
                </Tr>
            </Thead>
            <Tbody>
                {contratos.map((item, i) => (
                    <Tr key={i}>
                        <Td width="40%">Nº {item.numero_edificio}</Td>
                        <Td width="40%">Ap. {item.numero_apartamento}</Td>
                        <Td width="40%">{item.locatario_nome !== null ? item.locatario_nome : ''}</Td>
                        <Td width="40%">R$ {item.aluguel}</Td>
                        <Td>
                            <P>{item.apartamento_status}</P>
                        </Td>
                        <Td></Td>
                        <Td alignCenter width="5%">
                            <FaTrash onClick={() => handleDelete(item.id_contrato)} />
                        </Td>
                    </Tr>
                ))}
                
            </Tbody>
        </Table>
    );
};

export default Tabela;