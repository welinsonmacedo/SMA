// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import db from "../../../Config/FireBase";
import { FaEdit, FaTrash} from 'react-icons/fa';
import {
  Container,
  Table,
  TableHeader,
  TableCell,
  TableRow,
  Button,
  FilterInput,
  Modal,
  ModalContent,
  ModalOverlay,
  TableCellIcon
} from "./FineAutManagementStyle";

const FineManagementAut = () => {
  const [autuacoes, setAutuacoes] = useState([]);
  const [filteredAutuacoes, setFilteredAutuacoes] = useState([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [passwordModal, setPasswordModal] = useState(false);
  const [action, setAction] = useState(""); // "edit" or "delete"
  const [selectedAutuacoes, setSelectedAutuacoes] = useState(null);
  const [password, setPassword] = useState("");

  const fetchAutuacoes = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "autuacoes"));
      const AutuacoesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAutuacoes(AutuacoesData);
      setFilteredAutuacoes(AutuacoesData);
    } catch (error) {
      console.error("Erro ao buscar Autuacoes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAutuacoes();
  }, []);

  const handleFilterChange = (e) => {
    const value = e.target.value.toLowerCase();
    setFilter(value);
    setFilteredAutuacoes(
      autuacoes.filter((autuacoes) =>
        autuacoes.placa.toLowerCase().includes(value) ||
      autuacoes.numeroAutuacoes.toLowerCase().includes(value)
      )
    );
  };

  const handleAction = (autuacoes, actionType) => {
    setSelectedAutuacoes(autuacoes);
    setAction(actionType);
    setPasswordModal(true);
  };

  const handlePasswordSubmit = async () => {
    if (password === "admin123") {
      if (action === "delete") {
        await deleteAutuacoes(selectedAutuacoes.id);
      }
      // Adicionar lógica de edição aqui, se necessário
      setPasswordModal(false);
    } else {
      alert("Senha incorreta!");
    }
  };

  const deleteAutuacoes = async (id) => {
    try {
      await deleteDoc(doc(db, "autuacoes", id));
      setAutuacoes((prev) => prev.filter((autuacoes) => autuacoes.id !== id));
      setFilteredAutuacoes((prev) => prev.filter((autuacoes) => autuacoes.id !== id));
      alert("autuacao excluída com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir autuacao:", error);
    }
  };

  if (loading) return <p>Carregando autuacoes...</p>;

  return (
    <Container>
      <h2>Gerenciar Autuacoes</h2>
      <FilterInput
        type="text"
        placeholder="Filtrar por placa ou número de autuacoes..."
        value={filter}
        onChange={handleFilterChange}
      />
      <Table>
        <thead>
          <tr>
            <TableHeader>Placa</TableHeader>
            <TableHeader>N° Autuação</TableHeader>
            <TableHeader>Data</TableHeader>
            <TableHeader>Horario</TableHeader>
            <TableHeader>Local</TableHeader>
            <TableHeader>Infração</TableHeader>
            <TableHeader>Motorista</TableHeader>
            <TableHeader>Valor</TableHeader>
            <TableHeader>Limite Real Infrator</TableHeader>
            <TableHeader>Ações</TableHeader>
          </tr>
        </thead>
        <tbody>
          {filteredAutuacoes.map((autuacoes) => (
            <TableRow key={autuacoes.id}>
              <TableCell>{autuacoes.placa}</TableCell>
              <TableCell>{autuacoes.numeroAutuacao}</TableCell>
              <TableCell>{autuacoes.dataAutuacao}</TableCell>
              <TableCell>{autuacoes.horaInfracao}</TableCell>
              <TableCell>{autuacoes.local}</TableCell>
              <TableCell>{autuacoes.infracao}</TableCell>
              <TableCell>{autuacoes.motorista}</TableCell>
              <TableCell>R$ {autuacoes.valor}</TableCell>
              <TableCell>{autuacoes.dataRealInfrator}</TableCell>
              <TableCell>
                <TableCellIcon>
                <Button onClick={() => handleAction(autuacoes, "edit")}>
                <FaEdit />
                </Button>
                <Button onClick={() => handleAction(autuacoes, "delete")}>
                <FaTrash />
                </Button>
                </TableCellIcon>
                
              
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
      {passwordModal && (
        <Modal>
          <ModalOverlay onClick={() => setPasswordModal(false)} />
          <ModalContent>
            <h3>Digite a senha para confirmar</h3>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button onClick={handlePasswordSubmit}>Confirmar</Button>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
};

export default FineManagementAut;
