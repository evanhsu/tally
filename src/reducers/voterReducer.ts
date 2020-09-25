import { AnyAction, Reducer } from "redux";
import { Voter, VotersSort } from "../models/models";
import {
  isFetchVotersRequestAction, 
  isFetchVotersDoneAction,
  FetchVotersDoneAction,
  AppendVoterDoneAction,
  isRegisterVoterDoneAction,
  isRegisterVoterRequestAction,
  isDeleteVoterDoneAction, 
  isEditVoterDoneAction, 
  SortVotersAction, 
  isSortVotersAction,
  EditVoterIdAction,
  isEditVoterIdAction,
  CancelVoterAction,
  isCancelVoterAction
} from "../actions/tallyActions"

export const votersSortReducer: Reducer<VotersSort, SortVotersAction> = (votersSort = { col:'id', dir: 'inc' }, action) => {

  if (isSortVotersAction(action)) {

    if (action.payload.col === votersSort.col) {
      return {
        ...votersSort,
        dir: 'asc' === votersSort.dir ? 'desc' : 'asc',
      };
    } else {
      return {
        col: action.payload.col,
        dir: 'asc',
      };
    }
  }

  return votersSort;
};

const initialVoters = [] as Voter[];
type VoterReducerActions = FetchVotersDoneAction | AppendVoterDoneAction;
export const voterReducer: Reducer<Voter[], VoterReducerActions> = (voters = initialVoters, action) => {

  if (isEditVoterDoneAction(action)) {
    const voterIndex = voters.findIndex(v => v.id === action.payload.voter.id);
    const newVoters = voters.concat();
    newVoters[voterIndex] = action.payload.voter;
    return newVoters;
  }

  if (isDeleteVoterDoneAction(action)) {
    return voters.filter(v => v.id !== action.payload.voterId)
  }

  if (isRegisterVoterDoneAction(action)) {
    return [
   ...voters,
   {
     ...action.payload.voter,
   },
 ];
}

  if (isFetchVotersDoneAction(action)) {
      return action.payload.voters;
  }

  return voters;
};

type EditVoterIdReducerActions = EditVoterIdAction;

export const editVoterIdReducer: Reducer<number, EditVoterIdReducerActions> = (editCarId = -1, action) => {

  if (isEditVoterIdAction(action)) {
    return action.payload.voterId;
  }

  if (isCancelVoterAction(action)) {
    return -1;
  }

  if (isEditVoterDoneAction(action)) {
    return -1;
  }

  return editCarId;
}