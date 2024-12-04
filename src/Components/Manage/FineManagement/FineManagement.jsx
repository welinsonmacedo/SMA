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
} from "./FineManagementStyle";

const FineManagement = () => {
  const [multas, setMultas] = useState([]);
  const [filteredMultas, setFilteredMultas] = useState([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [passwordModal, setPasswordModal] = useState(false);
  const [action, setAction] = useState(""); // "edit" or "delete"
  const [selectedMulta, setSelectedMulta] = useState(null);
  const [password, setPassword] = useState("");

  const fetchMultas = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "multas"));
      const multasData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMultas(multasData);
      setFilteredMultas(multasData);
    } catch (error) {
      console.error("Erro ao buscar multas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMultas();
  }, []);

  const handleFilterChange = (e) => {
    const value = e.target.value.toLowerCase();
    setFilter(value);
    setFilteredMultas(
      multas.filter((multa) =>
        multa.placa.toLowerCase().includes(value) ||
        multa.numeroMulta.toLowerCase().includes(value)
      )
    );
  };

  const handleAction = (multa, actionType) => {
    setSelectedMulta(multa);
    setAction(actionType);
    setPasswordModal(true);
  };

  const handlePasswordSubmit = async () => {
    if (password === "admin123") {
      if (action === "delete") {
        await deleteMulta(selectedMulta.id);
      }
      // Adicionar lógica de edição aqui, se necessário
      setPasswordModal(false);
    } else {
      alert("Senha incorreta!");
    }
  };

  const deleteMulta = async (id) => {
    try {
      await deleteDoc(doc(db, "multas", id));
      setMultas((prev) => prev.filter((multa) => multa.id !== id));
      setFilteredMultas((prev) => prev.filter((multa) => multa.id !== id));
      alert("Multa excluída com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir multa:", error);
    }
  };

  if (loading) return <p>Carregando multas...</p>;

  return (
    <Container>
      <h2>Gerenciar Multas</h2>
      <FilterInput
        type="text"
        placeholder="Filtrar por placa ou número de multa..."
        value={filter}
        onChange={handleFilterChange}
      />
      <Table>
        <thead>
          <tr>
            <TableHeader>Placa</TableHeader>
            <TableHeader>N° Multa</TableHeader>
            <TableHeader>Data</TableHeader>
            <TableHeader>Local</TableHeader>
            <TableHeader>Infração</TableHeader>
            <TableHeader>Motorista</TableHeader>
            <TableHeader>Valor</TableHeader>
            <TableHeader>Ações</TableHeader>
          </tr>
        </thead>
        <tbody>
          {filteredMultas.map((multa) => (
            <TableRow key={multa.id}>
              <TableCell>{multa.placa}</TableCell>
              <TableCell>{multa.numeroMulta}</TableCell>
              <TableCell>{multa.dataMulta}</TableCell>
              <TableCell>{multa.local}</TableCell>
              <TableCell>{multa.infracao}</TableCell>
              <TableCell>{multa.motorista}</TableCell>
              <TableCell>R$ {multa.valor}</TableCell>
              <TableCell>
                <TableCellIcon>
                <Button onClick={() => handleAction(multa, "edit")}>
                <FaEdit />
                </Button>
                <Button onClick={() => handleAction(multa, "delete")}>
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

export default FineManagement;
