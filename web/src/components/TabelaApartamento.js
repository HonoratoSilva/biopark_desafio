import React from "react";
import styled from "styled-components";

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

const Tabela = ({ apartamentos }) => {

    return (
        <Table>
            <Thead>
                <Tr>
                    <Th>Edifício</Th>
                    <Th>Apartamento</Th>
                    <Th>Status</Th>
                </Tr>
            </Thead>
            <Tbody>
                {apartamentos.map((item, i) => (
                    <Tr key={i}>
                        <Td width="40%">Nº {item.numero_edificio}</Td>
                        <Td width="40%">Ap. {item.numero_apartamento}</Td>
                        <Td>
                            <P>{item.status}</P>
                        </Td>
                    </Tr>
                ))}
                
            </Tbody>
        </Table>
    );
};

export default Tabela;