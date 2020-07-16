import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Story from "./components/story";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

const routes = (
  <BrowserRouter>
    <Switch>
      <Route path="/home" component={App} />
      <Route path="/story" component={Story} />
      <Redirect from="/" to="/home" />
    </Switch>
  </BrowserRouter>
);

export default routes;
