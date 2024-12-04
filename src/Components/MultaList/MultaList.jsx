// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import db from "../../Config/FireBase"; // Importe a configuração do Firebase
import { TableContainer, Table, TableHeader, TableCell, TableRow, ContainerHeader } from "./MultaListStyle"; // Importe os estilos
import { FaEdit, FaTrash, FaPrint } from 'react-icons/fa'; // Importando ícones do FontAwesome

const MultaList = () => {
  const [multas, setMultas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    placa: "",
    data: "",
  });
  const [editPassword, setEditPassword] = useState("");
  const [deletePassword, setDeletePassword] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [editMode, setEditMode] = useState(false);
  const [selectedMulta, setSelectedMulta] = useState(null);
  const [action, setAction] = useState(null); // Controla a ação (editar ou excluir)

  // Função para buscar as multas no Firestore
  useEffect(() => {
    const fetchMultas = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "multas"));
        const multasData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMultas(multasData);
      } catch (error) {
        console.error("Erro ao buscar multas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMultas();
  }, []);

  // Função para aplicar os filtros
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const filteredMultas = multas.filter((multa) => {
    return (
      (filter.placa ? multa.placa.includes(filter.placa) : true) &&
      (filter.data ? multa.dataMulta === filter.data : true)
    );
  });

  // Função para excluir a multa
  const handleDelete = async () => {
    if (deletePassword !== "1234") {
      alert("Senha incorreta para exclusão.");
      return;
    }
    try {
      await deleteDoc(doc(db, "multas", selectedMulta.id));
      alert("Multa excluída com sucesso!");
      setMultas(multas.filter((multa) => multa.id !== selectedMulta.id));
      setAction(null); // Resetar a ação após excluir
    } catch (error) {
      console.error("Erro ao excluir a multa:", error);
      alert("Erro ao excluir a multa.");
    }
  };

  // Função para editar a multa
  const handleEdit = async () => {
    if (editPassword !== "1234") {
      alert("Senha incorreta para edição.");
      return;
    }
    // Aqui você pode implementar a lógica de atualização no Firestore
    alert("Multa editada com sucesso!");
    setEditMode(false);
    setSelectedMulta(null);
    setAction(null); // Resetar a ação após editar
  };

  // Função para imprimir a tabela
  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return <p>Carregando multas...</p>;
  }

  return (
    <TableContainer>
      <h2>Lista de Multas</h2>
      <ContainerHeader>
      <div>
        <label>Filtrar por Placa:</label>
        <input
          type="text"
          name="placa"
          value={filter.placa}
          onChange={handleFilterChange}
        />
      </div>
      <div>
        <label>Filtrar por Data:</label>
        <input
          type="date"
          name="data"
          value={filter.data}
          onChange={handleFilterChange}
        />
      </div>
      <div>
        <button onClick={handlePrint}><FaPrint /> Imprimir</button>
      </div>
      </ContainerHeader>
      
      <Table>
        <thead>
          <tr>
            <TableHeader>Placa</TableHeader>
            <TableHeader>N° Multa</TableHeader>
            <TableHeader>Data Multa</TableHeader>
            <TableHeader>Local</TableHeader>
            <TableHeader>Infração</TableHeader>
            <TableHeader>Motorista</TableHeader>
            <TableHeader>Valor</TableHeader>
            <TableHeader>Responsabilidade Filial</TableHeader>
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
              <TableCell>{multa.valor}</TableCell>
              <TableCell>{multa.responsabilidadeFilial}</TableCell>
              <TableCell>
                <button onClick={() => { setAction("edit"); setSelectedMulta(multa); }}><FaEdit /> </button>
                <button onClick={() => { setAction("delete"); setSelectedMulta(multa); }}><FaTrash /> </button>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>

      {/* Campos de senha aparecem apenas quando Editar ou Excluir é clicado */}
      {action === "edit" && (
        <div>
          <h3>Editar Multa (Senha)</h3>
          <input
            type="password"
            value={editPassword}
            onChange={(e) => setEditPassword(e.target.value)}
            placeholder="Digite a senha para editar"
          />
          <button onClick={handleEdit}>Salvar Edição</button>
        </div>
      )}

      {action === "delete" && (
        <div>
          <h3>Excluir Multa (Senha)</h3>
          <input
            type="password"
            value={deletePassword}
            onChange={(e) => setDeletePassword(e.target.value)}
            placeholder="Digite a senha para excluir"
          />
          <button onClick={handleDelete}>Excluir</button>
        </div>
      )}
    </TableContainer>
  );
};

export default MultaList;
