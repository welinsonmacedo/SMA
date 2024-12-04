// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import db from "../../../Config/FireBase";
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
} from "./ManageDriversStyle";

const DriversManagement = () => {
  const [drivers, setDrivers] = useState([]);
  const [filteredDrivers, setFilteredDrivers] = useState([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [passwordModal, setPasswordModal] = useState(false);
  const [action, setAction] = useState(""); // "edit" or "delete"
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [password, setPassword] = useState("");

  const fetchDrivers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "drivers"));
      const driversData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDrivers(driversData);
      setFilteredDrivers(driversData);
    } catch (error) {
      console.error("Erro ao buscar motoristas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  const handleFilterChange = (e) => {
    const value = e.target.value.toLowerCase();
    setFilter(value);
    setFilteredDrivers(
      drivers.filter((driver) =>
        driver.nome.toLowerCase().includes(value)
      )
    );
  };

  const handleAction = (driver, actionType) => {
    setSelectedDriver(driver);
    setAction(actionType);
    setPasswordModal(true);
  };

  const handlePasswordSubmit = async () => {
    if (password === "admin123") {
      if (action === "delete") {
        await deleteDriver(selectedDriver.id);
      }
      // Caso você deseje implementar a edição, adicione aqui
      setPasswordModal(false);
    } else {
      alert("Senha incorreta!");
    }
  };

  const deleteDriver = async (id) => {
    try {
      await deleteDoc(doc(db, "drivers", id));
      setDrivers((prev) => prev.filter((driver) => driver.id !== id));
      setFilteredDrivers((prev) => prev.filter((driver) => driver.id !== id));
      alert("Motorista excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir motorista:", error);
    }
  };

  if (loading) return <p>Carregando motoristas...</p>;

  return (
    <Container>
      <h2>Gerenciar Motoristas</h2>
      <FilterInput
        type="text"
        placeholder="Filtrar por nome..."
        value={filter}
        onChange={handleFilterChange}
      />
      <Table>
        <thead>
          <tr>
            <TableHeader>Nome</TableHeader>
            <TableHeader>Centro de Custo</TableHeader>
            <TableHeader>CNH</TableHeader>
            <TableHeader>Data Vencimento CNH</TableHeader>
            <TableHeader>Contato</TableHeader>
            <TableHeader>Ações</TableHeader>
          </tr>
        </thead>
        <tbody>
          {filteredDrivers.map((driver) => (
            <TableRow key={driver.id}>
              <TableCell>{driver.nome}</TableCell>
              <TableCell>{driver.centroDeCusto}</TableCell>
              <TableCell>{driver.cnh}</TableCell>
              <TableCell>{driver.dataVencimentoCnh}</TableCell>
              <TableCell>{driver.contato}</TableCell>
              <TableCell>
                <Button onClick={() => handleAction(driver, "edit")}>
                  Editar
                </Button>
                <Button onClick={() => handleAction(driver, "delete")}>
                  Excluir
                </Button>
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

export default DriversManagement;
