// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import db from "../../../Config/FireBase"; // Importe a configuração do Firebase
import {
  FormContainer,
  FormField,
  Label,
  Input,
  TextArea,
  SubmitButton,
  FormTitle,
} from "./DriversRegistrationStyle"; // Importando os estilos

const DriversRegistration = () => {
  const [driverData, setDriverData] = useState({
    nome: "",
    centroDeCusto: "",
    cnh: "",
    dataVencimentoCnh: "",
    endereco: "",
    numero: "",
    bairro: "",
    cidade: "",
    cep: "",
    contato: "",
    rg: "",
    cpf: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDriverData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "drivers"), driverData);
      alert("Motorista cadastrado com sucesso!");
      setDriverData({
        nome: "",
        centroDeCusto: "",
        cnh: "",
        dataVencimentoCnh: "",
        endereco: "",
        numero: "",
        bairro: "",
        cidade: "",
        cep: "",
        contato: "",
        rg: "",
        cpf: "",
      });
    } catch (error) {
      console.error("Erro ao cadastrar motorista:", error);
      alert("Erro ao cadastrar o motorista. Tente novamente.");
    }
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormTitle>Cadastro de Motoristas</FormTitle>
      <FormField>
        <Label>Nome:</Label>
        <Input
          type="text"
          name="nome"
          value={driverData.nome}
          onChange={handleChange}
          required
        />
      </FormField>
      <FormField>
        <Label>Centro de Custo:</Label>
        <Input
          type="text"
          name="centroDeCusto"
          value={driverData.centroDeCusto}
          onChange={handleChange}
          required
        />
      </FormField>
      <FormField>
        <Label>CNH:</Label>
        <Input
          type="text"
          name="cnh"
          value={driverData.cnh}
          onChange={handleChange}
          required
        />
      </FormField>
      <FormField>
        <Label>Data de Vencimento da CNH:</Label>
        <Input
          type="date"
          name="dataVencimentoCnh"
          value={driverData.dataVencimentoCnh}
          onChange={handleChange}
          required
        />
      </FormField>
      <FormField>
        <Label>Endereço:</Label>
        <TextArea
          name="endereco"
          value={driverData.endereco}
          onChange={handleChange}
          placeholder="Rua, Avenida, etc."
          required
        />
      </FormField>
      <FormField>
        <Label>Número:</Label>
        <Input
          type="text"
          name="numero"
          value={driverData.numero}
          onChange={handleChange}
          required
        />
      </FormField>
      <FormField>
        <Label>Bairro:</Label>
        <Input
          type="text"
          name="bairro"
          value={driverData.bairro}
          onChange={handleChange}
          required
        />
      </FormField>
      <FormField>
        <Label>Cidade:</Label>
        <Input
          type="text"
          name="cidade"
          value={driverData.cidade}
          onChange={handleChange}
          required
        />
      </FormField>
      <FormField>
        <Label>CEP:</Label>
        <Input
          type="text"
          name="cep"
          value={driverData.cep}
          onChange={handleChange}
          required
        />
      </FormField>
      <FormField>
        <Label>Contato:</Label>
        <Input
          type="text"
          name="contato"
          value={driverData.contato}
          onChange={handleChange}
          required
        />
      </FormField>
      <FormField>
        <Label>RG:</Label>
        <Input
          type="text"
          name="rg"
          value={driverData.rg}
          onChange={handleChange}
          required
        />
      </FormField>
      <FormField>
        <Label>CPF:</Label>
        <Input
          type="text"
          name="cpf"
          value={driverData.cpf}
          onChange={handleChange}
          required
        />
      </FormField>
      <SubmitButton type="submit">Cadastrar Motorista</SubmitButton>
    </FormContainer>
  );
};

export default DriversRegistration;
