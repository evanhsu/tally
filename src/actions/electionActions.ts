import { Election, NewElection } from "../models/models";
import { Action, Dispatch } from "redux";

//Temporarily adding the elction action in this file. Will later mput in tallyActions file to avoid merge conflicts

// Define Action Types
export const APPEND_ELECTION_REQUEST_ACTION = "APPEND_ELECTION_REQUEST_ACTION";
export const APPEND_ELECTION_DONE_ACTION = "APPEND_ELECTION_DONE_ACTION";

export const REFRESH_ELECTIONS_REQUEST_ACTION = "REFRESH_ELECTIONS_REQUEST_ACTION";
export const REFRESH_ELECTIONS_DONE_ACTION = "REFRESH_ELECTIONS_DONE_ACTION";

// export const APPEND_QUESTION_TO_ELECTION_FORM_ACTION = "APPEND_QUESTION_TO_ELECTION_FORM_ACTION";
export const SET_ELECTION_FORM_ACTION = "SET_ELECTION_FORM_ACTION";

// Define Action interfaces
export interface AppendElectionRequestAction extends Action<string> {
  payload: NewElection;
}
export interface AppendElectionDoneAction extends Action<string> {
  payload: Election;
}

export interface RefreshElectionsRequestAction extends Action<string> {}
export interface RefreshElectionsDoneAction extends Action<string> {
  payload: Election[];
}

export interface SetElectionFormAction extends Action<string> {
  payload: NewElection;
}

// Define Action-creator types/interfaces
export type AppendElectionRequestActionCreator = (
  newElection: NewElection
) => AppendElectionRequestAction;
export type AppendElectionDoneActionCreator = (
  election: Election
) => AppendElectionDoneAction;

export type RefreshElectionsRequestActionCreator = () => RefreshElectionsRequestAction;
export type RefreshElectionsDoneActionCreator = (
  elections: Election[]
) => RefreshElectionsDoneAction;

export type SetElectionFormActionCreator = (
  electionForm: NewElection
) => SetElectionFormAction;



// Write some Action-creators!
export const createAppendElectionRequestAction: AppendElectionRequestActionCreator = (
  newElection
) => ({
  type: APPEND_ELECTION_REQUEST_ACTION,
  payload: newElection,
});

export const createAppendElectionDoneAction: AppendElectionDoneActionCreator = (
  election
) => ({
  type: APPEND_ELECTION_DONE_ACTION,
  payload: election,
});

export const createRefreshElectionsRequestAction: RefreshElectionsRequestActionCreator = () => ({
  type: REFRESH_ELECTIONS_REQUEST_ACTION,
});
export const createRefreshElectionsDoneAction: RefreshElectionsDoneActionCreator = (
  elections
) => ({
  type: REFRESH_ELECTIONS_DONE_ACTION,
  payload: elections,
});

export const createSetElectionFormAction: SetElectionFormActionCreator = (electionForm) => ({
    type: SET_ELECTION_FORM_ACTION,
    payload: electionForm,
});


// Write type-guards for each action
export const isAppendElectionRequestAction = (
  action: Action<string>
): action is AppendElectionRequestAction => {
  return [APPEND_ELECTION_REQUEST_ACTION].includes(action.type);
};
export const isAppendElectionDoneAction = (
  action: Action<string>
): action is AppendElectionDoneAction => {
  return [APPEND_ELECTION_DONE_ACTION].includes(action.type);
};
export const isRefreshElectionsRequestAction = (
  action: Action<string>
): action is RefreshElectionsRequestAction => {
  return [REFRESH_ELECTIONS_REQUEST_ACTION].includes(action.type);
};
export const isRefreshElectionsDoneAction = (
  action: Action<string>
): action is RefreshElectionsDoneAction => {
  return [REFRESH_ELECTIONS_DONE_ACTION].includes(action.type);
};
export const isSetElectionFormAction = (action: Action<string>): action is SetElectionFormAction => {
    return [SET_ELECTION_FORM_ACTION].includes(action.type);
};

// Write the thunks!
export const appendElection = (newElection: NewElection) => {
  return async (dispatch: Dispatch) => {
    dispatch(createAppendElectionRequestAction(newElection));
    const res = await fetch("http://localhost:3040/elections", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newElection),
    });

    const election = await res.json();
    dispatch(createAppendElectionDoneAction(election));
  };
};

export const refreshElections = () => {
  return async (dispatch: Dispatch) => {
    dispatch(createRefreshElectionsRequestAction());
    const res = await fetch("http://localhost:3040/elections");
    const elections = await res.json();
    dispatch(createRefreshElectionsDoneAction(elections));
  };
};
