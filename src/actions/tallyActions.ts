// This file contains all the actions for the app.
// We will split up these actions into seperate files if we find that we can/need to
import { Action, Dispatch } from "redux";
import {
  Voter,
  NewVoter,
  LoginInfo,
  Ballot,
  NewBallot,
  VoterLoginForm,
} from "../models/models";

export const FETCH_VOTERS_REQUEST_ACTION = "FETCH_VOTERS_REQUEST_ACTION";
export const FETCH_VOTERS_DONE_ACTION = "FETCH_VOTERS_DONE_ACTION";

export const REGISTER_VOTER_REQUEST_ACTION = "REGISTER_VOTER_REQUEST_ACTION";
export const REGISTER_VOTER_DONE_ACTION = "REGISTER_VOTER_DONE_ACTION";

export const DELETE_VOTER_REQUEST_ACTION = "DELETE_VOTER_REQUEST_ACTION";
export const DELETE_VOTER_DONE_ACTION = "DELETE_VOTER_DONE_ACTION";

export const EDIT_VOTER_REQUEST_ACTION = "EDIT_VOTER_REQUEST_ACTION";
export const EDIT_VOTER_DONE_ACTION = "EDIT_VOTER_DONE_ACTION";

export const SORT_VOTERS_ACTION = "SORT_VOTERS_ACTION";

export const EDIT_VOTER_ID_ACTION = "EDIT_VOTER_ACTION";
export const CANCEL_VOTER_ACTION = "CANCEL_VOTER_ACTION";

export const VOTER_LOGIN_REQUEST_ACTION = "VOTER_LOGIN_REQUEST_ACTION";
export const VOTER_LOGIN_SUCCESS_ACTION = "VOTER_LOGIN_SUCCESS_ACTION";
export const VOTER_LOGIN_FAILED_ACTION = "VOTER_LOGIN_FAILED_ACTION";

export const SUBMIT_BALLOT_REQUEST_ACTION = "SUBMIT_BALLOT_REQUEST_ACTION";
export const SUBMIT_BALLOT_SUCCESS_ACTION = "SUBMIT_BALLOT_SUCCESS_ACTION";
export const SUBMIT_BALLOT_FAILED_ACTION = "SUBMIT_BALLOT_FAILED_ACTION";

export const REFRESH_BALLOTS_REQUEST_ACTION = "REFRESH_BALLOTS_REQUEST_ACTION";
export const REFRESH_BALLOTS_SUCCESS_ACTION = "REFRESH_BALLOTS_SUCCESS_ACTION";
export const REFRESH_BALLOTS_FAILED_ACTION = "REFRESH_BALLOTS_FAILED_ACTION";

// Fetch Voters Start

export type FetchVotersRequestAction = Action<string>;

export interface FetchVotersDoneAction extends Action<string> {
  payload: { voters: Voter[] };
}

export type FetchVotersRequestActionCreator = () => FetchVotersRequestAction;
export type FetchVotersDoneActionCreator = (
  voters: Voter[]
) => FetchVotersDoneAction;

export function isFetchVotersRequestAction(
  action: Action<string>
): action is FetchVotersRequestAction {
  return [FETCH_VOTERS_REQUEST_ACTION].includes(action.type);
}

export function isFetchVotersDoneAction(
  action: Action<string>
): action is FetchVotersDoneAction {
  return [FETCH_VOTERS_DONE_ACTION].includes(action.type);
}

export const createFetchVotersRequestAction: FetchVotersRequestActionCreator = () => ({
  type: FETCH_VOTERS_REQUEST_ACTION,
});

export const createFetchVotersDoneAction: FetchVotersDoneActionCreator = (
  voters: Voter[]
) => ({
  type: FETCH_VOTERS_DONE_ACTION,
  payload: { voters },
});

export const fetchVoters = () => {
  // this is the function object which is dispatched
  return async (dispatch: Dispatch) => {
    dispatch(createFetchVotersRequestAction());
    const res = await fetch("http://localhost:3040/voters");
    const voters = await res.json();
    dispatch(createFetchVotersDoneAction(voters));
  };
};

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
      headers: { "Content-Type": "application/json" },
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
    voterId: number;
  };
}

export type DeleteVoterRequestActionCreator = () => DeleteVoterRequestAction;
export type DeleteVoterDoneActionCreator = (
  voterId: number
) => DeleteVoterDoneAction;

export function isDeleteVoterRequestAction(
  action: Action<string>
): action is DeleteVoterRequestAction {
  return [DELETE_VOTER_REQUEST_ACTION].includes(action.type);
}

export function isDeleteVoterDoneAction(
  action: Action<string>
): action is DeleteVoterDoneAction {
  return [DELETE_VOTER_DONE_ACTION].includes(action.type);
}

export const createDeleteVoterRequestAction: DeleteVoterRequestActionCreator = () => ({
  type: DELETE_VOTER_REQUEST_ACTION,
});

export const createDeleteVoterDoneAction: DeleteVoterDoneActionCreator = (
  voterId: number
) => ({
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
};

// Delete Voter End

// Edit Voter Start

export type EditVoterRequestAction = NewVoterAction;
export type EditVoterDoneAction = VoterAction;

export type EditVoterRequestActionCreator = (
  newVoterInfo: Voter
) => EditVoterRequestAction;
export type EditVoterDoneActionCreator = (voter: Voter) => EditVoterDoneAction;

export const createEditVoterRequestAction: EditVoterRequestActionCreator = (
  newVoterInfo
) => ({
  type: EDIT_VOTER_REQUEST_ACTION,
  payload: {
    newVoter: newVoterInfo,
  },
});

export const createEditVoterDoneAction: EditVoterDoneActionCreator = (
  voter
) => ({
  type: EDIT_VOTER_DONE_ACTION,
  payload: {
    voter,
  },
});

// Type Guards
export function isEditVoterRequestAction(
  action: Action<string>
): action is EditVoterRequestAction {
  return [EDIT_VOTER_REQUEST_ACTION].includes(action.type);
}

export function isEditVoterDoneAction(
  action: Action<string>
): action is EditVoterDoneAction {
  return [EDIT_VOTER_DONE_ACTION].includes(action.type);
}

export const editVoter = (newVoterInfo: Voter) => {
  return async (dispatch: Dispatch) => {
    dispatch(createEditVoterRequestAction(newVoterInfo));
    await fetch(
      "http://localhost:3040/voters/" + encodeURIComponent(newVoterInfo.id),
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newVoterInfo),
      }
    );
    dispatch(createEditVoterDoneAction(newVoterInfo));
  };
};

// Edit Voter End

// Sort Voters Start

export interface SortVotersAction extends Action<string> {
  payload: { col: keyof Voter };
}

export type SortVotersActionCreator = (col: keyof Voter) => SortVotersAction;

export function isSortVotersAction(
  action: Action<string>
): action is SortVotersAction {
  return [SORT_VOTERS_ACTION].includes(action.type);
}

export const createSortVotersAction: SortVotersActionCreator = (
  col: keyof Voter
) => ({
  type: SORT_VOTERS_ACTION,
  payload: { col },
});

// Sort Voters End

// Edit VoterId Action

export interface EditVoterIdAction extends Action<string> {
  payload: { voterId: number };
}

export type EditVoterIdActionCreator = (carId: number) => EditVoterIdAction;

export function isEditVoterIdAction(
  action: Action<string>
): action is EditVoterIdAction {
  return action.type === EDIT_VOTER_ID_ACTION;
}

export const createEditVoterIdAction: EditVoterIdActionCreator = (voterId) => ({
  type: EDIT_VOTER_ID_ACTION,
  payload: { voterId },
});

// End Edit VoterId Car

// Cancel Voter Action

export type CancelVoterAction = Action<string>;

export type CancelCarActionCreator = () => CancelVoterAction;

export function isCancelVoterAction(
  action: Action<string>
): action is CancelVoterAction {
  return action.type === CANCEL_VOTER_ACTION;
}

export const createCancelVoterAction: CancelCarActionCreator = () => ({
  type: CANCEL_VOTER_ACTION,
});

// End Cancel Voter Action

//start Voter login

export interface VoterLoginRequestAction extends Action<string> {
  payload: {
    authorizationInProgress: boolean,
    errorMessage: string,
  };
}

export interface VoterLoginFailedAction extends Action<string> {
  payload: {
    authorizationInProgress: boolean,
    errorMessage: string
  };
}

export interface VoterLoginSuccessAction extends Action<string> {
  payload: {
    voterId: Voter["id"];    
  };
}

// Action Creators TYPES
export type VoterLoginRequestActionCreator = (loginInfo: VoterLoginForm) => VoterLoginRequestAction;

export type VoterLoginSuccessActionCreator = (loginInfo: LoginInfo) => VoterLoginSuccessAction;

export type VoterLoginFailedActionCreator = (loginInfo: {
  authorizationInProgress: boolean,
  errorMessage: string
}
) => VoterLoginFailedAction;

// Action creators!
export const createVoterLoginFailedAction: VoterLoginFailedActionCreator = (loginInfo: VoterLoginForm) => (
  {
    type: VOTER_LOGIN_FAILED_ACTION,
    payload: {
      authorizationInProgress: loginInfo.authorizationInProgress,
      errorMessage: loginInfo.errorMessage
    },
  });

export const createVoterLoginAction: VoterLoginRequestActionCreator =  (loginInfo: VoterLoginForm) => ({
  type: VOTER_LOGIN_REQUEST_ACTION,
  payload: { 
    authorizationInProgress: loginInfo.authorizationInProgress,
    errorMessage: loginInfo.errorMessage
  }
});

export const createVoterLoginSuccessAction: VoterLoginSuccessActionCreator = (
  loginInfo: LoginInfo
) => ({
  type: VOTER_LOGIN_SUCCESS_ACTION,
  payload: {
    voterId: loginInfo.voterId,
  }
})


// Type Guards
export const isVoterLoginRequestAction = (
  action: Action<string>
): action is VoterLoginRequestAction => {
  return [VOTER_LOGIN_REQUEST_ACTION].includes(action.type);
};
export const isVoterLoginSuccessAction = (
  action: Action<string>
): action is VoterLoginSuccessAction => {
  return [VOTER_LOGIN_SUCCESS_ACTION].includes(action.type);
};
export const isVoterLoginFailedAction = (
  action: Action<string>
): action is VoterLoginFailedAction => {
  return [VOTER_LOGIN_FAILED_ACTION].includes(action.type);
};

// Thunks
export const authorizeVoter = (loginInfo: LoginInfo) => {
  return async (dispatch: Dispatch) => {
    dispatch(createVoterLoginAction({authorizationInProgress: true, errorMessage: ''}))
    const res = await fetch("http://localhost:3040/voters/"+loginInfo.voterId);
    const voter = await res.json();
    if (voter.completedElectionIds && voter.completedElectionIds.includes(loginInfo.electionId)) {
      dispatch(createVoterLoginAction({authorizationInProgress: false, errorMessage: 'You already voted for this Ballot!'}))
    } else {
      dispatch(createVoterLoginAction({authorizationInProgress: false, errorMessage: ''}))
      dispatch(createVoterLoginSuccessAction(loginInfo))
    }
  };
};

export interface SubmitBallotRequestAction extends Action<string> {
  payload: NewBallot;
}
export interface SubmitBallotSuccessAction extends Action<string> {
  payload: Ballot;
}
export interface SubmitBallotFailedAction extends Action<string> {
  payload: NewBallot;
}

export type SubmitBallotRequestActionCreator = (
  ballot: NewBallot
) => SubmitBallotRequestAction;
export type SubmitBallotSuccessActionCreator = (
  ballot: Ballot
) => SubmitBallotSuccessAction;
export type SubmitBallotFailedActionCreator = (
  ballot: NewBallot
) => SubmitBallotFailedAction;

export const CreateSubmitBallotRequestAction: SubmitBallotRequestActionCreator = (
  ballot
) => ({
  type: SUBMIT_BALLOT_REQUEST_ACTION,
  payload: ballot,
});
export const CreateSubmitBallotSuccessAction: SubmitBallotSuccessActionCreator = (
  ballot
) => ({
  type: SUBMIT_BALLOT_SUCCESS_ACTION,
  payload: ballot,
});
export const CreateSubmitBallotFailedAction: SubmitBallotFailedActionCreator = (
  ballot
) => ({
  type: SUBMIT_BALLOT_FAILED_ACTION,
  payload: ballot,
});

export const isSubmitBallotRequestAction = (action: Action<string>): action is SubmitBallotRequestAction => {
  return [SUBMIT_BALLOT_REQUEST_ACTION].includes(action.type);
};
export const isSubmitBallotSuccessAction = (action: Action<string>): action is SubmitBallotSuccessAction => {
  return [SUBMIT_BALLOT_SUCCESS_ACTION].includes(action.type);
};
export const isSubmitBallotFailedAction = (action: Action<string>): action is SubmitBallotFailedAction => {
  return [SUBMIT_BALLOT_FAILED_ACTION].includes(action.type);
};

export const saveBallot = (newBallot: NewBallot) => {
  return async (dispatch: Dispatch) => {
    dispatch(CreateSubmitBallotRequestAction(newBallot));

    const res = await fetch(`http://localhost:3040/ballots`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBallot),
    });

    // Something went wrong!
    if (res.status !== 201) {
      dispatch(CreateSubmitBallotFailedAction(newBallot));
      return;
    }

    const getVoterRes = await fetch(`http://localhost:3040/voters/${newBallot.voterId}`);
    const voter = await getVoterRes.json();

    const newCompleteElectionIds = [...voter.completedElectionIds, newBallot.electionId];
    const updateVoterRes = await fetch(`http://localhost:3040/voters/${newBallot.voterId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        ...voter,
        completedElectionIds: newCompleteElectionIds,
      }),
    });

    // Something went wrong!
    if (updateVoterRes.status !== 201) {
      dispatch(CreateSubmitBallotFailedAction(newBallot));
      return;
    }

    // Everything is OK!
    const ballot = await res.json();
    dispatch(CreateSubmitBallotSuccessAction(ballot));
  };
};




export interface RefreshBallotsRequestAction extends Action<string> {}
export interface RefreshBallotsFailedAction extends Action<string> {}
export interface RefreshBallotsSuccessAction extends Action<string> {
  payload: Ballot[];
}

export type RefreshBallotsRequestActionCreator = () => RefreshBallotsRequestAction;
export type RefreshBallotsSuccessActionCreator = (
  ballots: Ballot[]
) => RefreshBallotsSuccessAction;
export type RefreshBallotsFailedActionCreator = () => RefreshBallotsFailedAction;

export const createRefreshBallotsRequestAction: RefreshBallotsRequestActionCreator = () => ({
  type: REFRESH_BALLOTS_REQUEST_ACTION,
});
export const createRefreshBallotsSuccessAction: RefreshBallotsSuccessActionCreator = (
  ballots
) => ({
  type: REFRESH_BALLOTS_SUCCESS_ACTION,
  payload: ballots,
});
export const createRefreshBallotsFailedAction: RefreshBallotsFailedActionCreator = () => ({
  type: REFRESH_BALLOTS_FAILED_ACTION,
});

export const isRefreshBallotsRequestAction = (
  action: Action<string>
): action is RefreshBallotsRequestAction => {
  return [REFRESH_BALLOTS_REQUEST_ACTION].includes(action.type);
};
export const isRefreshBallotsSuccessAction = (
  action: Action<string>
): action is RefreshBallotsSuccessAction => {
  return [REFRESH_BALLOTS_SUCCESS_ACTION].includes(action.type);
};
export const isRefreshBallotsFailedAction = (
  action: Action<string>
): action is RefreshBallotsFailedAction => {
  return [REFRESH_BALLOTS_FAILED_ACTION].includes(action.type);
};
export const refreshBallots = () => {
  return async (dispatch: Dispatch) => {
    dispatch(createRefreshBallotsRequestAction());
    const res = await fetch("http://localhost:3040/ballots");

    if (res.status === 200) {
      const ballots = await res.json();
      dispatch(createRefreshBallotsSuccessAction(ballots));
    }
    else {
      dispatch(createRefreshBallotsFailedAction());
    }
  };
};