import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.nav`
  position: fixed;
  top: 0;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: #fff;
`;

const List = styled.ul`
  display: flex;
  width: 100%;
  height: 100%;
  max-width: 980px;
  padding: 0px 20px;
  justify-content: space-evenly;
  align-items: center;
  list-style: none;
  border-bottom: 2px solid #ddd;
  a {
    text-decoration: none;
    color: #333;
    padding: 4px 8px;
    border: 2px solid #333;
    transition: all 0.2s ease;
  }
  a:hover {
    color: #ddd;
    border-color: #ddd;
  }
`;

export default function NavBar() {
  return (
    <Nav>
      <List>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/halfstack">HalfStack</Link>
        </li>
        <li>
          <Link to="/unicef">Unicef</Link>
        </li>
        <li>
          <Link to="/anecdotes">Anecdotes</Link>
        </li>
      </List>
    </Nav>
  );
}
