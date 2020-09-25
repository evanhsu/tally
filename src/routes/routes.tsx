import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { RegisterVoterContainer } from "../containers/RegisterVoterContainer";
import { ViewElectionsContainer } from "../components/ViewElections";
import { ElectionFormContainer } from "../components/ElectionForm";
import { Home } from "../components/Home";
import ErrorPage from "../components/ErrorPage";
import NoMatch from "../components/NoMatch";
import { SubmitBallotContainer } from "../containers/SubmitBallotContainer";
import { BallotTableContainer } from "../containers/BallotTableContainer";

export const Routes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/home" />
      </Route>
      <Route exact path="/home" component={Home} />
      {/* Elections Routes */}
      <Route exact path="/elections" component={ViewElectionsContainer} />
      <Route exact path="/elections/create" component={ElectionFormContainer} />
      <Route exact path="/vote/:electionId" component={SubmitBallotContainer} />
      {/* Change this component! */}
      <Route exact path="/results/:electionId" component={BallotTableContainer} />
      {/* Change this component! */}
      <Route path="/voters" component={RegisterVoterContainer} />
      {/* <Route exact path="/elections/:electionId" component={Elections} /> */}
      <Route path="/error" component={ErrorPage} />
      <Route path="*" component={NoMatch} />
    </Switch>
  );
};

//props.match.params.electionId,