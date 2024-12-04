import { useState } from "react";
import { Container, Lines, Links, List, DropdownContainer, DropdownItem } from "./NavBarMainStyle";
import { Link } from "react-router-dom";

function NavBarMain() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDropdownCadastro, setShowDropdownCadastro] = useState(false);
  const [showDropdownLacing, setShowDropdownLacing] = useState(false);

  const handleDropdownToggle = () => {
    setShowDropdown((prev) => !prev);
  };
  const handleDropdownToggleCadastro = () => {
    setShowDropdownCadastro((prev) => !prev);
  };
  const handleDropdownToggleLacing = () => {
    setShowDropdownLacing((prev) => !prev);
  };

  return (
    <Container>
      <List>
        <Lines>
          <Links as={Link} to="/">Home</Links>
        </Lines>
        <Lines>
          <Links as={Link} to="/dashboard">Dashboard</Links>
        </Lines>
        
        <Lines>
          <Links onClick={handleDropdownToggleLacing}>Lançamentos</Links>
          {showDropdownLacing && (
            <DropdownContainer>
           
              <DropdownItem as={Link} to="/lacingfine">Lançar Multas</DropdownItem>
              <DropdownItem as={Link} to="/lacingfineaut">Lançar Autuações</DropdownItem>
            
            </DropdownContainer>
          )}
        </Lines>
        <Lines>
          <Links onClick={handleDropdownToggleCadastro}>Cadastros</Links>
          {showDropdownCadastro && (
            <DropdownContainer>
              <DropdownItem as={Link} to="/registerdrivers">Cadastrar Motorista</DropdownItem>
              <DropdownItem as={Link} to="/registerCostCenter">Cadastrar Filiais</DropdownItem>
           
            
            </DropdownContainer>
          )}
        </Lines>
        <Lines>
          <Links onClick={handleDropdownToggle}>Registros</Links>
          {showDropdown && (
            <DropdownContainer>
         
              <DropdownItem as={Link} to="finemanagement">Gerenciar Multas</DropdownItem>
              <DropdownItem as={Link} to="finemanagementAut">Gerenciar Autuações</DropdownItem>
              <DropdownItem as={Link} to="/drivesmanagement">Gerenciar Motoristas</DropdownItem>
            </DropdownContainer>
          )}
        </Lines>
      </List>
    </Container>
  );
}

export default NavBarMain;
