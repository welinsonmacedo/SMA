// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import db from "../../../Config/FireBase"; // Importe a configuração do Firebase
import { collection, addDoc } from "firebase/firestore";
import { FormContainer, FormTitle, Form, InputGroup, Label, Input, SubmitButton } from "./LacingFineAutStyle"; // Importe os estilos

const LacingFineAut= () => {
  const [formData, setFormData] = useState({
    placa: "",
    numeroAutuacao: "",
    dataAutuacao: "",
    dataRealInfrator: "",
    horaInfracao:"",
    local: "",
    infracao: "",
    motorista: "",
    valor: "",
    responsabilidadeFilial: "",
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
      await addDoc(collection(db, "autuacoes"), formData);
      alert("Autuação cadastrada com sucesso!");
      setFormData({
        placa: "",
        numeroAutuacao: "",
        dataMulta: "",
        dataRealInfrator: "",
        horaInfracao:"",
        local: "",
        infracao: "",
        motorista: "",
        valor: "",
        responsabilidadeFilial: "",
      });
    } catch (error) {
      console.error("Erro ao salvar Autuação:", error);
      alert("Erro ao salvar a Autuação. Tente novamente.");
    }
  };

  return (
    <FormContainer>
      <FormTitle>Lançar  Autuações</FormTitle>
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
          <Label>N° Ait:</Label>
          <Input
            type="text"
            name="numeroAutuacao"
            value={formData.numeroAit}
            onChange={handleChange}
            required
          />
        </InputGroup>
        <InputGroup>
          <Label>Data Autuação:</Label>
          <Input
            type="date"
            name="dataAutuacao"
            value={formData.dataMulta}
            onChange={handleChange}
            required
          />
        </InputGroup>
        <InputGroup>
          <Label>Horario Autuação:</Label>
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
          <Label>Data Real Infrator:</Label>
          <Input
            type="date"
            name="dataRealInfrator"
            value={formData.dataRealInfrator}
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

export default LacingFineAut;
