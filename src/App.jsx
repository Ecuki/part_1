import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import styled from 'styled-components';
import { Provider } from 'react-redux';

import Anecdotes from './pages/Anecdotes';
import BlogList from './pages/BlogList';
import Countries from './pages/Countries';

import HalfStack from './pages/HalfStack';
// import Home from './pages/Home'
import NavBar from './components/NavBar';
import Phonebook from './pages/Phonebook';
import Unicef from './pages/Unicef';

import anecdoteStore from './redux/anecdoteStore';
import feedbackStore from './redux/feedbackStore';

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  width: 100%;
  max-width: 980px;
  min-height: calc(100vh - 60px);
  padding: 0 30px;
  margin: 60px auto 0;
`;

export default function App() {
  return (
    <Router>
      <NavBar />
      <Container>
        <Switch>
          <Route exact path="/halfstack">
            <HalfStack />
          </Route>
          <Route exact path="/unicef">
            <Provider store={feedbackStore}>
              <Unicef />
            </Provider>
          </Route>
          <Route exact path="/anecdotes">
            <Provider store={anecdoteStore}>
              <Anecdotes />
            </Provider>
          </Route>
          <Route exact path="/phonebook">
            <Phonebook />
          </Route>
          <Route exact path="/countries">
            <Countries />
          </Route>
          <Route path="/blog">
            <BlogList />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}
