import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { ElectionsTable } from "./ElectionsTable";
import { Election } from "../models/models";
import { TallyState } from "../models/tallyState";
import { refreshElections } from "../actions/electionActions";
import { Loading } from "./Loading";

export type ViewElectionsProps = {
  elections: Election[];
  isLoading: boolean;
  navigateToVotePage: (electionId: Election["id"]) => void;
  navigateToElectionResultsPage: (electionId: Election["id"]) => void;
  navigateToCreateElectionPage: () => void;
};
export const ViewElections = (props: ViewElectionsProps) => {
  const {
    elections,
    isLoading,
    navigateToVotePage,
    navigateToElectionResultsPage,
    navigateToCreateElectionPage,
  } = props;

  if (isLoading) {
    return (
      <div className="elections-page">
        <h1>Elections Page</h1>
        <Loading size="medium" />
      </div>
    );
  }

  return (
    <div className="elections-page content-wrapper">
      <h1>Elections</h1>

      <ElectionsTable
        elections={elections}
        navigateToVotePage={navigateToVotePage}
        navigateToElectionResultsPage={navigateToElectionResultsPage}
      />

      <button type="button" onClick={navigateToCreateElectionPage}>
        Create New Election
      </button>
    </div>
  );
};

export type ViewElectionsContainerProps = {};
export const ViewElectionsContainer = (props: ViewElectionsContainerProps) => {
  const dispatch = useDispatch();

  const elections = useSelector<TallyState, Election[]>(
    (state) => state.elections
  );

  const isLoading = useSelector<TallyState, boolean>(
    (state) => state.electionsLoading
  );

  // react-router navigation functions
  const browserHistory = useHistory();
  const navigateToVotePage = (electionId: Election["id"]) =>
    browserHistory.push(`/vote/${electionId}`);
  const navigateToElectionResultsPage = (electionId: Election["id"]) =>
    browserHistory.push(`/results/${electionId}`);
  const navigateToCreateElectionPage = () =>
    browserHistory.push(`/elections/create`);

  const state = {
    elections,
    isLoading,
  };

  const actions = {
    navigateToVotePage,
    navigateToElectionResultsPage,
    navigateToCreateElectionPage,
  };

  useEffect(() => {
    dispatch(refreshElections());
  }, [dispatch]);

  return <ViewElections {...actions} {...state} />;
};
