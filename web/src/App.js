import GlobalStyle from "./styles/global";
import styled from "styled-components";
import Form from "./components/Form.js";
import FormApartamento from "./components/FormApartamento.js";
import FormLocatario from "./components/FormLocatario.js";
import FormContrato from "./components/FormContrato.js"
import TabelaAluguel from "./components/TabelaAluguel.js";
import TabelaApartamento from "./components/TabelaApartamento.js";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Title = styled.h2``;

function App() {
  const [contratos, setContratos] = useState([]);
  const [apartamentos, setApartamentos] = useState([]);

  const getContratos = async () => {
    try {
      const res = await axios.get("http://localhost:8800/contrato/");
      setContratos(res.data);
    } catch (error) {
      toast.error(error);
    }
  };
  getContratos();

  const getApartamentos = async () => {
    try {
      const res = await axios.get("http://localhost:8800/apartamento/");
      setApartamentos(res.data);
    } catch (error) {
      toast.error(error);
    }
  };
  getApartamentos();

  return (
    <>
      <Container>
        <Title>CADASTRAR EDIFÍCIOS</Title>
        <Form />
        <Title>CADASTRAR APARTAMENTO</Title>
        <FormApartamento />
        <Title>CADASTRAR LOCATÁRIO</Title>
        <FormLocatario />
        <Title>FAÇA SEU CONTRATO</Title>
        <FormContrato />
        <Title>APARTAMENTOS</Title>
        <TabelaApartamento apartamentos={apartamentos} />
        <Title>LOCATARIOS HOSPEDADOS</Title>
        <TabelaAluguel contratos={contratos} /> 
      </Container>
      <ToastContainer autoClose={3000} position={toast.POSITION.TOP_RIGHT} />
      <GlobalStyle />
    </>
  );
}

export default App;
