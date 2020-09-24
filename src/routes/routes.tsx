import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { RegisterVoterContainer } from "../containers/RegisterVoterContainer";
import { Elections } from "../components/Elections";
import { Home } from "../components/Home";
import ErrorPage from "../components/ErrorPage";
import NoMatch from "../components/NoMatch";
import { VoterForm } from "../components/VoterForm";

export const Routes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/home" />
      </Route>
      <Route exact path="/home" component={Home} />
      <Route path="/voters" component={RegisterVoterContainer} />
      <Route exact path="/elections" component={Elections} />
      <Route exact path="/elections/:electionId" component={Elections} />
      <Route path="/error" component={ErrorPage} />
      <Route path="*" component={NoMatch} />
    </Switch>
  );
};

//props.match.params.electionId,