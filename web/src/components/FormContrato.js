import axios from "axios";
import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 120px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 42px;
`;

const Label = styled.label``;

const FormApartamento = ({ onEdit }) => {
  const [apartamentos, setApartamentos] = useState([]);
  const [locatarios, setLocatarios] = useState([]);

  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const contrato = ref.current;

      contrato.aluguel.value = onEdit.aluguel;
      contrato.apartamento_id_apartamento.value = onEdit.apartamento_id_apartamento;
      contrato.locatario_id_locatario.value = onEdit.locatario_id_locatario;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const contrato = ref.current;

    console.log(contrato)

    if (!contrato.aluguel.value || !contrato.apartamento_id_apartamento.value || !contrato.locatario_id_locatario.value) {
      return toast.warn("Preencha todos os campos!");
    }

    if (onEdit) {
      await axios
        .put("http://localhost:8800/contrato/" + onEdit.id_contrato, {
          aluguel: contrato.aluguel.value,
          apartamento_id_apartamento: contrato.apartamento_id_apartamento.value,
          locatario_id_locatario: contrato.locatario_id_locatario.value
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      await axios
        .post("http://localhost:8800/contrato/", {
            aluguel: contrato.aluguel.value,
            apartamento_id_apartamento: contrato.apartamento_id_apartamento.value,
            locatario_id_locatario: contrato.locatario_id_locatario.value
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }

    // apartamento.numero_apartamento.value = "";
    // apartamento.aluguel = "";
    // apartamento.numero_edificio = "";
  };

  const getApartamentos = async () => {
    try {
      const res = await axios.get("http://localhost:8800/apartamento/");
      setApartamentos(res.data);
    } catch (error) {
      toast.error(error);
    }
  };

  getApartamentos();

  const getLocatarios = async () => {
    try {
      const res = await axios.get("http://localhost:8800/locatarios/");
      setLocatarios(res.data);
    } catch (error) {
      toast.error(error);
    }
  };

  getLocatarios();

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>

      <InputArea>
      <label>Apartamento:  </label>
        <select name="apartamento_id_apartamento">
         {/* FAZER FILTRO AQUI PARA APARTAMENTOS DISPONIVEIS */}
          {apartamentos.map((apartamento) => (
            <option key={apartamento.id_apartamento} value={apartamento.id_apartamento}>{apartamento.numero_apartamento}</option>
          ))}
        </select>
      </InputArea>

      <InputArea>
      <label>Locatário:  </label>
        <select name="locatario_id_locatario">
          {locatarios.map((locatario) => (
            <option key={locatario.id_locatario} value={locatario.id_locatario}>{locatario.nome}</option>
          ))}
        </select>
      </InputArea>

      <InputArea>
        <Label>Aluguel</Label>
        <Input name="aluguel" />
      </InputArea>

      <Button type="submit">SALVAR</Button>
    </FormContainer>
  );
};

export default FormApartamento;
