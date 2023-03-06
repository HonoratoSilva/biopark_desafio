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
    const [edificios, setEdificios] = useState([]);
    const [apartamentos, setApartamentos] = useState([]);
    const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const locatario = ref.current;

      locatario.nome.value = onEdit.nome;
      locatario.telefone.value = onEdit.telefone;
      locatario.email.value = onEdit.email;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const locatario = ref.current;

    if (!locatario.nome.value || !locatario.telefone.value || !locatario.email.value) {
      return toast.warn("Preencha todos os campos!");
    }

    if (onEdit) {
      await axios
        .put("http://localhost:8800/locatarios/" + onEdit.id_locatario, {
          nome: locatario.nome.value,
          telefone: locatario.telefone.value,
          email: locatario.email.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
        console.log(handleSubmit);
      await axios
        .post("http://localhost:8800/locatarios/", {
            nome: locatario.nome.value,
            telefone: locatario.telefone.value,
            email: locatario.email.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }

    // apartamento.numero_apartamento.value = "";
    // apartamento.aluguel = "";
    // apartamento.numero_edificio = "";

    
  };

  const getEdificios = async () => {
    try {
      const res = await axios.get("http://localhost:8800/edificios/");
      setEdificios(res.data);
    } catch (error) {
      toast.error(error);
    }
  };

  getEdificios();

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
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Nome</Label>
        <Input name="nome" />
      </InputArea>

      <InputArea>
        <Label>Telefone</Label>
        <Input name="telefone" type="phone" />
      </InputArea>

      <InputArea>
        <Label>E-mail</Label>
        <Input name="email" type="email" />
      </InputArea>

      <Button type="submit">SALVAR</Button>
    </FormContainer>
  );
};

export default FormApartamento;
