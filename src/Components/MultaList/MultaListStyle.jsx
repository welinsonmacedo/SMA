import styled from "styled-components";

export const TableContainer = styled.div`
  max-width: 1000px;
  margin: 20px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;
export const ContainerHeader = styled.div`
display:flex;
gap:2rem;
`;


export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  font-size:13px;
`;

export const TableHeader = styled.th`
  background-color: #007bff;
  color: white;
  padding: 10px;
  text-align: left;
`;

export const TableCell = styled.td`
  padding: 10px;
  border: 1px solid #ddd;
`;

export const TableRow = styled.tr`
width:auto;
  &:hover {
    background-color: #f1f1f1;
  }
`;
