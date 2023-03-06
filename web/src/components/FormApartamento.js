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

const Select = styled.select`
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

const FormApartamento = ({ apartamentos, onEdit }) => {
  const [edificios, setEdificios] = useState([]);
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      const edificio = ref.current;

      edificio.numero_edificio.value = onEdit.numero_edificio;
      edificio.aluguel.value = onEdit.aluguel;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const apartamento = ref.current;

    if (!apartamento.numero_apartamento.value || !apartamento.edificio_id_edificio.value) {
      return toast.warn("Preencha todos os campos!");
    }

    if (onEdit) {
      await axios
        .put("http://localhost:8800/apartamento/" + onEdit.id_apartamento, {
          numero_apartamento: apartamento.numero_apartamento.value,
          edificio_id_edificio: apartamento.edificio_id_edificio.value
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    } else {
      await axios
        .post("http://localhost:8800/apartamento/", {
          numero_apartamento: apartamento.numero_apartamento.value,
          edificio_id_edificio: apartamento.edificio_id_edificio.value,
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
    }
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

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
      <label>Edificio:  </label>
        <Select name="edificio_id_edificio">
          {edificios.map((edificio) => (
            <option key={edificio.id_edificio} value={edificio.id_edificio}>{edificio.numero_edificio}</option>
          ))}
        </Select>
      </InputArea>

      <InputArea>
        <Label>Nº Apartamento</Label>
        <Input name="numero_apartamento" />
      </InputArea>

      <Button type="submit">SALVAR</Button>
    </FormContainer>
  );
};

export default FormApartamento;
