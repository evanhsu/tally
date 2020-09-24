import { AnyAction, Reducer } from "redux";
import { Voter } from "../models/models";
import {
  isFetchVotersRequestAction, 
  isFetchVotersDoneAction,
  FetchVotersRequestAction, 
  FetchVotersDoneAction,
  AppendVoterDoneAction,
  isRegisterVoterRequestAction,
  isRegisterVoterDoneAction,  
} from "../actions/tallyActions"

// TODO: we can change AnyAction to be a more specific type
const initialVoters = [] as Voter[];
type VoterReducerActions = FetchVotersDoneAction | AppendVoterDoneAction;
export const voterReducer: Reducer<Voter[], VoterReducerActions> = (voters = initialVoters, action) => {
  if (isFetchVotersDoneAction(action)) {
      return action.payload.voters;
  }
  if(isRegisterVoterDoneAction(action)) {
       return [
      ...voters,
      {
        ...action.payload.voter,
      },
    ];
  }
  return voters;
};