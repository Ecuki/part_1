import styled from 'styled-components'
import React, { useEffect } from 'react'
import { Menu } from 'semantic-ui-react'
import { CSSTransition } from 'react-transition-group'
import {

  NavLink,
} from 'react-router-dom'
import Anecdote from '../components/Anecdotes/Anecdote'
import AnecdoteForm from '../components/Anecdotes/AnecdoteForm'
import AnecdotesAbout from '../components/Anecdotes/AnecdotesAbout'
import AnecdotesList from '../components/Anecdotes/AnecdotesList'
import PrivateRoute from '../components/Login/PrivateRoute'
import { useDispatch, useSelector } from 'react-redux'
import Notification from '../components/Notification'
import { checkStorage } from '../reducers/loginReducer'
const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  width: 100%;
`

export default function AppRouter() {
  const dispatch = useDispatch()
  const { user, notification: { message, color, isShow } } = useSelector(state => state)
  useEffect(() => {
    dispatch(checkStorage())
  }, []);


  const routes = [
    { path: '/anecdotes/create', Component: AnecdoteForm, name: 'Add new', privateRoute: true },
    { path: '/anecdotes/about', Component: AnecdotesAbout, name: 'About', privateRoute: false },
    { path: '/anecdotes/:id', Component: Anecdote, name: 'Anecdote', privateRoute: true },
    { path: '/anecdotes', Component: AnecdotesList, name: 'Anecdotes', privateRoute: false },
  ]
  return (
    <>
      <Menu pointing secondary>
        <Menu.Menu>
          {routes.map(
            (route) =>
              route.path !== '/anecdotes/:id' && (
                <Menu.Item key={route.path} as={NavLink} to={route.path} >
                  {route.name}
                </Menu.Item>
              )
          )}
        </Menu.Menu>
      </Menu>
      {isShow && < Notification message={message} color={color} />}
      <Container className="container">
        {routes.map(({ path, Component, privateRoute }) => (
          <PrivateRoute key={path} exact path={path} privateRoute={privateRoute}>
            {({ match }) => (
              <CSSTransition
                in={match != null}
                timeout={300}
                classNames="page"
                unmountOnExit
              >
                <div className="page">
                  <Component />
                </div>
              </CSSTransition>
            )}
          </PrivateRoute>
        ))}
      </Container>
    </>
  )
}
