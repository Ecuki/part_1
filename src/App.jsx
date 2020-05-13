import React from 'react';
import { BrowserRouter as Router, NavLink, Switch } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';
import { Provider } from 'react-redux';

import Anecdotes from './pages/Anecdotes';
import { BlogRoute } from './pages/BlogList';
import Countries from './pages/Countries';
import Footer from './components/Footer';
import MenuBar from './components/MenuBar';

import HalfStack from './pages/HalfStack';
import Home from './pages/Home';
import Phonebook from './pages/Phonebook';
import Unicef from './pages/Unicef';
import { UsersRoute } from './pages/Users';

import anecdoteStore from './redux/anecdoteStore';
import feedbackStore from './redux/feedbackStore';
import phonebookStore from './redux/phonebookStore';
import loginStore from './redux/loginStore';
import blogStore from './redux/blogStore';
import userStore from './redux/userStore';
import Login from './pages/Login';
import PrivateRoute from './components/Login/PrivateRoute';
const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  width: 100%;
  max-width: 980px;
  min-height: calc(100vh - 60px);
  padding: 0 30px;

`;

const leftItems = [
  { as: NavLink, content: 'Home', key: "home", to: "/home" },

  { as: NavLink, content: 'HalfStack', key: "halfstack", to: "/halfstack" },
  {
    as: NavLink,
    content: 'Unicef',
    key: "unicef", to: "/unicef"
  },

  { as: NavLink, content: 'Countries', key: "countries", to: "/countries" },
  { as: NavLink, content: 'Phonebook', key: "phonebook", to: "/phonebook" },
  { as: NavLink, content: 'BlogList', key: "blog", to: "/blog" },
  {
    as: NavLink,
    content: 'Anecdotes',
    key: "anecdotes", to: "/anecdotes"
  },
  {
    as: NavLink,
    content: 'Users',
    key: "users", to: "/users"
  },

];
const rightItems = [
  { as: NavLink, content: "Login", key: "login", to: "/login" },
  { as: NavLink, content: "Register", key: "register", to: "/register" }
];
const routes = [
  { path: '/home', Component: Home, name: 'Home', exact: true, privateRoute: false },
  { path: '/halfstack', Component: HalfStack, name: 'HalfStack', exact: true, privateRoute: false },
  {
    path: '/unicef',
    Component: Unicef,
    storage: feedbackStore,
    name: 'Unicef',
    exact: true,
    privateRoute: true
  },
  { path: '/countries', Component: Countries, name: 'Countries', exact: true, privateRoute: true },
  { path: '/phonebook', Component: Phonebook, name: 'Phonebook', exact: true, storage: phonebookStore, privateRoute: true },
  { path: '/blog', Component: BlogRoute, name: 'BlogList', exact: false, privateRoute: true, storage: blogStore, },
  {
    path: '/anecdotes',
    Component: Anecdotes,
    storage: anecdoteStore,
    name: 'Anecdotes',
    exact: false, privateRoute: false
  },
  { path: '/users', Component: UsersRoute, name: 'Users', exact: false, privateRoute: false, storage: userStore, },
  { path: '/login', Component: Login, name: 'Login', exact: true, privateRoute: false, storage: loginStore, },

];

function App() {
  return (
    <Router>

      <Container className="container">
        <MenuBar leftItems={leftItems} rightItems={rightItems} >
          <Switch>
            {routes.map(({ path, Component, storage, exact, privateRoute }) => (
              <PrivateRoute key={path} exact={exact} path={path} privateRoute={privateRoute}>
                {({ match }) => (
                  <CSSTransition
                    in={match != null}
                    timeout={300}
                    classNames="page"
                    unmountOnExit
                  >
                    <div className="page">
                      {!storage ? (
                        <Component match={match} />
                      ) : (
                          <Provider store={storage}>
                            <Component match={match} />
                          </Provider>
                        )}
                    </div>
                  </CSSTransition>
                )}
              </PrivateRoute>
            ))}
          </Switch>
        </MenuBar>
      </Container>

      <Footer />
    </Router>
  );
}
export default App;


