// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import db from "../../../Config/FireBase"; // Importe a configuração do Firebase
import { collection, addDoc } from "firebase/firestore";
import { FormContainer, FormTitle, Form, InputGroup, Label, Input, SubmitButton } from "./LacingFineStyle"; // Importe os estilos

const LacingFine= () => {
  const [formData, setFormData] = useState({
    placa: "",
    numeroMulta: "",
    dataMulta: "",
    local: "",
    infracao: "",
    motorista: "",
    valor: "",
    responsabilidadeFilial: "",
    horaInfracao:""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "multas"), formData);
      alert("Multa cadastrada com sucesso!");
      setFormData({
        placa: "",
        numeroMulta: "",
        dataMulta: "",
        horaInfracao:"",
        local: "",
        infracao: "",
        motorista: "",
        valor: "",
        responsabilidadeFilial: "",
      });
    } catch (error) {
      console.error("Erro ao salvar multa:", error);
      alert("Erro ao salvar a multa. Tente novamente.");
    }
  };

  return (
    <FormContainer>
      <FormTitle>Cadastro de Multas</FormTitle>
      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <Label>Placa:</Label>
          <Input
            type="text"
            name="placa"
            value={formData.placa}
            onChange={handleChange}
            required
          />
        </InputGroup>
        <InputGroup>
          <Label>N° Multa:</Label>
          <Input
            type="text"
            name="numeroMulta"
            value={formData.numeroMulta}
            onChange={handleChange}
            required
          />
        </InputGroup>
        <InputGroup>
          <Label>Data Multa:</Label>
          <Input
            type="date"
            name="dataMulta"
            value={formData.dataMulta}
            onChange={handleChange}
            required
          />
        </InputGroup>
        <InputGroup>
          <Label>Horario Multa:</Label>
          <Input
            type="time"
            name="horaInfracao"
            value={formData.horaInfracao}
            onChange={handleChange}
            required
          />
        </InputGroup>
        <InputGroup>
          <Label>Local:</Label>
          <Input
            type="text"
            name="local"
            value={formData.local}
            onChange={handleChange}
            required
          />
        </InputGroup>
        <InputGroup>
          <Label>Infração:</Label>
          <Input
            type="text"
            name="infracao"
            value={formData.infracao}
            onChange={handleChange}
            required
          />
        </InputGroup>
        <InputGroup>
          <Label>Motorista:</Label>
          <Input
            type="text"
            name="motorista"
            value={formData.motorista}
            onChange={handleChange}
            required
          />
        </InputGroup>
        <InputGroup>
          <Label>Valor:</Label>
          <Input
            type="number"
            name="valor"
            value={formData.valor}
            onChange={handleChange}
            required
          />
        </InputGroup>
        <InputGroup>
          <Label>Responsabilidade Filial:</Label>
          <Input
            type="text"
            name="responsabilidadeFilial"
            value={formData.responsabilidadeFilial}
            onChange={handleChange}
            required
          />
        </InputGroup>
        <SubmitButton type="submit">Salvar</SubmitButton>
      </Form>
    </FormContainer>
  );
};

export default LacingFine;
