import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { bindActionCreators } from "redux";
import { useSelector, useDispatch } from "react-redux";

import { TallyState } from "../models/tallyState";
import { Election, Voter } from "../models/models";
import { authorizeVoter, saveBallot } from "../actions/tallyActions";
import { refreshElections } from "../actions/electionActions";
import { Ballot } from "../components/Ballot";
import { Loading } from "../components/Loading";
import { LoginForm } from "../components/LoginForm";

export type SubmitBallotContainerProps = {};
export function SubmitBallotContainer(props: SubmitBallotContainerProps) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshElections());
  }, [dispatch]);

  // Grab the 'electionId' portion of the current URL from react-router
  const { electionId }: { electionId: string } = useParams();
  //   const currentVoterId = useSelector<TallyState, Voter["id"]>(
  //     (state) => state.currentVoterId
  //   );
  const currentVoterId = 1;

  const loginFormError = useSelector<TallyState, string>(
    (state) => state.voterLoginForm.errorMessage
  );
  const authorizationInProgress = useSelector<TallyState, boolean>(
    (state) => state.voterLoginForm.authorizationInProgress
  );
  const election = useSelector<TallyState, Election>((state) => {
    // We assume that the election exists because we've already
    // checked the current voter's authorization, which requires
    // us to have already located the matching Election. So we're
    // not addressing the 'undefined' case.
    return state.elections.find(
      (election) => election.id.toString() == electionId
    )!;
  });

  const electionsAreLoading = useSelector<TallyState, boolean>(
    (state) => state.electionsLoading
  );

  const ballotFormIsSubmitting = useSelector<TallyState, boolean>(
    (state) => state.ballotForm.isSubmitting
  );

  const boundActions = bindActionCreators(
    {
      authorizeVoter: authorizeVoter,
      saveBallot: saveBallot,
    },
    dispatch
  );

  if (authorizationInProgress) {
    return <div>Still Loading</div>;
  }
  if (currentVoterId < 0) {
    return <LoginForm electionId={1} onLogin={boundActions.authorizeVoter}/>; //<VoterLoginForm props={stuff}/>;
  }

  if (loginFormError !== "") {
    // pass boundActions.authorizeVoter to the login form
    return <div>Unauthorized (show login form with error)</div>;
  }

  if (electionsAreLoading) {
    return (
      <div>
        <Loading size="large" />
      </div>
    );
  }

  return (
    <Ballot
      voterId={currentVoterId}
      election={election}
      onSaveBallot={boundActions.saveBallot}
      formIsSubmitting={ballotFormIsSubmitting}
    />
  );
}
