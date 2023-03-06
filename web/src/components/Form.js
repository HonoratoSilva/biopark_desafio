import axios from "axios";
import React, { useRef, useEffect } from "react";
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

const Form = ({ onEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const edificio = ref.current;

      edificio.numero_edificio.value = onEdit.numero_edificio;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const edificio = ref.current;

    if (!edificio.numero_edificio.value) {
      return toast.warn("Preencha todos os campos!");
    }

    if (onEdit) {
      await axios
        .put("http://localhost:8800/edificios/" + onEdit.id_edificio, {
          numero_edificio: edificio.numero_edificio.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      await axios
        .post("http://localhost:8800/edificios/", {
          numero_edificio: edificio.numero_edificio.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }

    edificio.numero_edificio.value = "";
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Nº Edificio</Label>
        <Input name="numero_edificio" />
      </InputArea>

      <Button type="submit">SALVAR</Button>
    </FormContainer>
  );
};

export default Form;
