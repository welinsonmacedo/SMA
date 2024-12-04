import styled from "styled-components";

export const Container = styled.nav`
  background-color: #333;
  padding: 10px;
`;

export const List = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 0;
  padding: 0;
`;

export const Lines = styled.li`
  position: relative;
`;

export const Links = styled.a`
  text-decoration: none;
  color: white;
  font-size: 16px;
  padding: 10px 15px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #444;
    cursor: pointer;
  }
`;

export const DropdownContainer = styled.div`
  position: absolute;
  top: 40px;
  left: 0;
  background-color: #444;
  border-radius: 5px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  width: 200px;
`;

export const DropdownItem = styled.a`
  display: block;
  padding: 10px;
  text-decoration: none;
  color: white;
  font-size: 14px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #555;
    cursor: pointer;
  }
`;
