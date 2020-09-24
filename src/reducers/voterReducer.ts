import { AnyAction, Reducer } from "redux";
import { Voter } from "../models/models";
import {
  isFetchVotersRequestAction, 
  isFetchVotersDoneAction,
  FetchVotersDoneAction,
  AppendVoterDoneAction,
  isRegisterVoterDoneAction,
  isDeleteVoterDoneAction, isEditVoterDoneAction  
} from "../actions/tallyActions"

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