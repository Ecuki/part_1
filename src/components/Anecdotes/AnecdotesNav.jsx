import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Nav = styled.nav`
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: #fff;
`

const List = styled.ul`
  display: flex;
  width: 100%;
  height: 100%;
  max-width: 980px;
  padding: 0px 10px;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
  list-style: none;
  border-bottom: 2px solid #ddd;
  a {
    text-decoration: none;
    color: #333;
    padding: 2px 4px;
    margin: 0 2px;

    transition: all 0.2s ease;
    font-size: 0.9rem;
  }
  a:hover {
    color: #ddd;
  }
`

export default function NavBar() {
  // let { url } = useRouteMatch();
  return (
    <Nav>
      <List>
        <li>
          <Link to={'/anecdotes'}>Anecdotes</Link>
        </li>
        <li>
          <Link to={'/anecdotes/create'}>Add new</Link>
        </li>
        <li>
          <Link to={'/anecdotes/about'}>About</Link>
        </li>
      </List>
    </Nav>
  )
}
