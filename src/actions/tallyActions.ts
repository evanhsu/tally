// This file contains all the actions for the app.
// We will split up these actions into seperate files if we find that we can/need to
import { Action, Dispatch } from "redux";
import { Voter, NewVoter } from "../models/models";

export const REGISTER_VOTER_REQUEST_ACTION = "REGISTER_VOTER_REQUEST_ACTION";
export const REGISTER_VOTER_DONE_ACTION = "REGISTER_VOTER_DONE_ACTION";

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
    const res = await fetch("http://localhost:300/voters", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(newVoter),
    });
    const voter = await res.json();
    dispatch(createRegisterVoterDoneAction(voter));
  };
};
