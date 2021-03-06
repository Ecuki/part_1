import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import styled from "styled-components";

import Anecdotes from "./pages/Anecdotes";
import HalfStack from "./pages/HalfStack";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import Unicef from "./pages/Unicef";

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
            <Unicef />
          </Route>
          <Route exact path="/anecdotes">
            <Anecdotes />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}
