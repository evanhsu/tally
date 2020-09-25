import { AnyAction, Reducer } from "redux";
import { Voter } from "../models/models";
import { isVoterLoginSuccessAction } from "../actions/tallyActions";


// TODO: we can change AnyAction to be a more specific type
const initial = -1;
export const currentVoterIdReducer: Reducer<Voter["id"], AnyAction> = (
  currentVoterId = initial,
  action
) => {
    if(isVoterLoginSuccessAction(action)) {
        return action.payload.voterId;
    }
    
  // if (isSomethingAction(action)) {
  //     return {something};
  // }
  return currentVoterId;
};
