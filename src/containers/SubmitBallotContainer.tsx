import React from "react";
import { useHistory } from "react-router-dom";
import { bindActionCreators } from "redux";
import { useSelector, useDispatch } from "react-redux";

import { TallyState } from "../models/tallyState";
import { Voter } from "../models/models";
import * as TallyActions from "../actions/tallyActions";
import { LoginForm } from "../components/LoginForm";

export type SubmitBallotContainerProps = {};
export function SubmitBallotContainer(props: SubmitBallotContainerProps) {
  const history = useHistory();
  const currentVoterId = useSelector<TallyState, Voter["id"]>(
    (state) => state.currentVoterId
  );
  const loginFormError = useSelector<TallyState, string>(state => state.voterLoginForm.errorMessage);
  const authorizationInProgress = useSelector<TallyState, boolean>(state => state.voterLoginForm.authorizationInProgress);

  const dispatch = useDispatch();
  const boundActions = bindActionCreators(
    {
      authorizeVoter: TallyActions.authorizeVoter,
    },
    dispatch
  );

  if (authorizationInProgress) {
    return <div>Still Loading</div>;
  }
  if (currentVoterId < 0) {
    return <LoginForm electionId={1} onLogin={boundActions.authorizeVoter}/>; //<VoterLoginForm props={stuff}/>;
  }

  if (loginFormError !== '') {
    return <div>Unauthorized (show login form with error)</div>;
  }

  return <div>Logged in, go ahead and vote!</div>;
  //  return (<Ballot voter={voter} election={} />);
}
