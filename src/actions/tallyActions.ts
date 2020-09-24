// This file contains all the actions for the app.
// We will split up these actions into seperate files if we find that we can/need to
import { Action, Dispatch } from "redux";
import { Voter, NewVoter } from "../models/models";

export const FETCH_VOTERS_REQUEST_ACTION = 'FETCH_VOTERS_REQUEST_ACTION';
export const FETCH_VOTERS_DONE_ACTION = 'FETCH_VOTERS_DONE_ACTION';

export const REGISTER_VOTER_REQUEST_ACTION = "REGISTER_VOTER_REQUEST_ACTION";
export const REGISTER_VOTER_DONE_ACTION = "REGISTER_VOTER_DONE_ACTION";

export const DELETE_VOTER_REQUEST_ACTION = "DELETE_VOTER_REQUEST_ACTION";
export const DELETE_VOTER_DONE_ACTION = "DELETE_VOTER_DONE_ACTION";

export const EDIT_VOTER_REQUEST_ACTION = "EDIT_VOTER_REQUEST_ACTION";
export const EDIT_VOTER_DONE_ACTION = "EDIT_VOTER_DONE_ACTION";

// Fetch Voters Start

export type FetchVotersRequestAction = Action<string>;

export interface FetchVotersDoneAction extends Action<string> {
  payload: {voters: Voter[]}
}

export type FetchVotersRequestActionCreator = () => FetchVotersRequestAction;
export type FetchVotersDoneActionCreator = (voters: Voter[]) => FetchVotersDoneAction;

export function isFetchVotersRequestAction(action: Action<string>): action is FetchVotersRequestAction {
  return [FETCH_VOTERS_REQUEST_ACTION].includes(action.type);
}

export function isFetchVotersDoneAction(action: Action<string>): action is FetchVotersDoneAction {
  return [FETCH_VOTERS_DONE_ACTION].includes(action.type);
}

export const createFetchVotersRequestAction: FetchVotersRequestActionCreator = () => ({
  type: FETCH_VOTERS_REQUEST_ACTION
})

export const createFetchVotersDoneAction: FetchVotersDoneActionCreator = (voters: Voter[]) => ({
  type: FETCH_VOTERS_DONE_ACTION, payload: {voters},
})

export const fetchVoters = () => {
  // this is the function object which is dispatched
  return async (dispatch: Dispatch) => {
    dispatch(createFetchVotersRequestAction());
    const res = await fetch("http://localhost:3040/voters");
    const voters = await res.json();
    dispatch(createFetchVotersDoneAction(voters));
  };
}

// Fetch Voters End

// Append Voter Start
export interface NewVoterAction extends Action {
  payload: {
    newVoter: NewVoter;
  };
}
export interface VoterAction extends Action {
  payload: {
    voter: Voter;
  };
}

export type AppendVoterRequestAction = NewVoterAction;
export type AppendVoterDoneAction = VoterAction;

export type RegisterVoterRequestActionCreator = (
  newVoter: NewVoter
) => AppendVoterRequestAction;
export type RegisterVoterDoneActionCreator = (
  voter: Voter
) => AppendVoterDoneAction;

export const createRegisterVoterRequestAction: RegisterVoterRequestActionCreator = (
  newVoter
) => ({
  type: REGISTER_VOTER_REQUEST_ACTION,
  payload: {
    newVoter,
  },
});

export const createRegisterVoterDoneAction: RegisterVoterDoneActionCreator = (
  voter
) => ({
  type: REGISTER_VOTER_DONE_ACTION,
  payload: {
    voter,
  },
});

// Type Guards
export function isRegisterVoterRequestAction(
  action: Action<string>
): action is AppendVoterRequestAction {
  return [REGISTER_VOTER_REQUEST_ACTION].includes(action.type);
}

export function isRegisterVoterDoneAction(
  action: Action<string>
): action is AppendVoterDoneAction {
  return [REGISTER_VOTER_DONE_ACTION].includes(action.type);
}

export const appendVoter = (newVoter: NewVoter) => {
  return async (dispatch: Dispatch) => {
    dispatch(createRegisterVoterRequestAction(newVoter));
    // TODO: the api request needs to be a POST with body
    const res = await fetch("http://localhost:3040/voters", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(newVoter),
    });
    const voter = await res.json();
    dispatch(createRegisterVoterDoneAction(voter));
  };
};

// Append voter end

// Delete Voter Start

export type DeleteVoterRequestAction = Action<string>;

export interface DeleteVoterDoneAction extends Action {
  payload: {
    voterId: number
  }
}

export type DeleteVoterRequestActionCreator = () => DeleteVoterRequestAction;
export type DeleteVoterDoneActionCreator = (voterId: number) => DeleteVoterDoneAction;

export function isDeleteVoterRequestAction(action: Action<string>): action is DeleteVoterRequestAction {
  return [DELETE_VOTER_REQUEST_ACTION].includes(action.type);
};

export function isDeleteVoterDoneAction(action: Action<string>): action is DeleteVoterDoneAction {
  return [DELETE_VOTER_DONE_ACTION].includes(action.type);
};

export const createDeleteVoterRequestAction: DeleteVoterRequestActionCreator = () => ({
  type: DELETE_VOTER_REQUEST_ACTION,
});

export const createDeleteVoterDoneAction: DeleteVoterDoneActionCreator = (voterId: number) => ({
  type: DELETE_VOTER_DONE_ACTION,
  payload: {
    voterId,
  },
});

export const deleteVoter = (voterId: number) => {
  // this is the function object which is dispatched
  return async (dispatch: Dispatch) => {
    dispatch(createDeleteVoterRequestAction());
    await fetch("http://localhost:3040/voters/" + voterId, {
      method: "DELETE",
    });
    dispatch(createDeleteVoterDoneAction(voterId));
  };
}

// Delete Voter End

// Edit Voter Start

export type EditVoterRequestAction = NewVoterAction;
export type EditVoterDoneAction = VoterAction;

export type EditVoterRequestActionCreator = (newVoterInfo: Voter) => EditVoterRequestAction;
export type EditVoterDoneActionCreator = (voter: Voter) => EditVoterDoneAction;

export const createEditVoterRequestAction: EditVoterRequestActionCreator = (newVoterInfo) => ({
  type: EDIT_VOTER_REQUEST_ACTION,
  payload: {
    newVoter: newVoterInfo,
  },
});

export const createEditVoterDoneAction: EditVoterDoneActionCreator = (voter) => ({
  type: EDIT_VOTER_DONE_ACTION,
  payload: {
    voter,
  },
});

// Type Guards
export function isEditVoterRequestAction(action: Action<string>): action is EditVoterRequestAction {
  return [EDIT_VOTER_REQUEST_ACTION].includes(action.type);
}

export function isEditVoterDoneAction(action: Action<string>): action is EditVoterDoneAction {
  return [EDIT_VOTER_DONE_ACTION].includes(action.type);
}

export const editVoter = (newVoterInfo: Voter) => {
  return async (dispatch: Dispatch) => {
    dispatch(createEditVoterRequestAction(newVoterInfo));
    await fetch('http://localhost:3040/voters/' + encodeURIComponent(newVoterInfo.id), {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newVoterInfo),
    })
    dispatch(createEditVoterDoneAction(newVoterInfo));
  };
};

// Edit Voter End

// Sort Voters Start

// Sort Voters End
