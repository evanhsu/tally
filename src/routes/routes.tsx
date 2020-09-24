import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Voters } from "../components/Voters";
import { Elections } from "../components/Elections";
import { Home } from "../components/Home";
import ErrorPage from "../components/ErrorPage";
import NoMatch from "../components/NoMatch";

export const Routes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/home" />
      </Route>
      <Route exact path="/home" component={Home} />
      <Route exact path="/voters" component={Voters} />
      <Route exact path="/elections" component={Elections} />
      <Route path="/error" component={ErrorPage} />
      <Route path="*" component={NoMatch} />
    </Switch>
  );
};
