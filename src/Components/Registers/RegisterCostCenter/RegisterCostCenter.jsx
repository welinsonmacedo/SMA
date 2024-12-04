// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import db from "../../../Config/FireBase";
import {
  Container,
  Form,
  Label,
  Input,
  Button,
  Title,
} from "./RegisterCostCenterStyle";

const RegisterCostCenter = () => {
  const [formData, setFormData] = useState({
    codigo: "",
    nome: "",
    cnpj: "",
    endereco: "",
    gerente: "",
    contato: "",
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
      await addDoc(collection(db, "centrosDeCusto"), formData);
      alert("Centro de custo cadastrado com sucesso!");
      setFormData({
        codigo: "",
        nome: "",
        cnpj: "",
        endereco: "",
        gerente: "",
        contato: "",
      });
    } catch (error) {
      console.error("Erro ao cadastrar centro de custo:", error);
      alert("Erro ao salvar. Tente novamente.");
    }
  };

  return (
    <Container>
      <Title>Cadastrar Centro de Custo</Title>
      <Form onSubmit={handleSubmit}>
        <Label>Código:</Label>
        <Input
          type="text"
          name="codigo"
          value={formData.codigo}
          onChange={handleChange}
          required
        />
        <Label>Nome:</Label>
        <Input
          type="text"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          required
        />
        <Label>CNPJ:</Label>
        <Input
          type="text"
          name="cnpj"
          value={formData.cnpj}
          onChange={handleChange}
          required
        />
        <Label>Endereço:</Label>
        <Input
          type="text"
          name="endereco"
          value={formData.endereco}
          onChange={handleChange}
          required
        />
        <Label>Gerente:</Label>
        <Input
          type="text"
          name="gerente"
          value={formData.gerente}
          onChange={handleChange}
          required
        />
        <Label>Contato:</Label>
        <Input
          type="text"
          name="contato"
          value={formData.contato}
          onChange={handleChange}
          required
        />
        <Button type="submit">Cadastrar</Button>
      </Form>
    </Container>
  );
};

export default RegisterCostCenter;
