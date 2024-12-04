import styled from "styled-components";

// Contêiner principal da Navbar
export const Container = styled.nav`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 1rem;
  background: #333;
  color: #fff;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

// Botão Toggle para o menu (visível apenas em telas pequenas)
export const ToggleButton = styled.button`
  display: block;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #fff;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

// Menu Mobile
export const MobileMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: #444;
  padding: 1rem;
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    display: block;
  }
`;

// Lista principal dos links da Navbar
export const List = styled.ul`
  display: flex;
  flex-direction: row;
  list-style: none;
  margin: 0;
  padding: 0;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
  }
`;

// Estilo para cada linha da lista
export const Lines = styled.li`
  margin: 0.5rem 0;
`;

// Links da Navbar
export const Links = styled.a`
  text-decoration: none;
  color: #fff;
  font-weight: 500;
  padding: 0.5rem 1rem;
  cursor: pointer;

  &:hover {
    background: #555;
    border-radius: 5px;
  }

  @media (max-width: 768px) {
    padding: 0.5rem;
    width: 100%;
  }
`;

// Contêiner do Dropdown
export const DropdownContainer = styled.div`
  position: relative;
  background: #555;
  padding: 0.5rem;
  margin-top: 0.5rem;
  border-radius: 5px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

// Itens do Dropdown
export const DropdownItem = styled.a`
  display: block;
  color: #fff;
  text-decoration: none;
  margin: 0.5rem 0;
  padding: 0.5rem 1rem;
  cursor: pointer;

  &:hover {
    background: #666;
    border-radius: 5px;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;
