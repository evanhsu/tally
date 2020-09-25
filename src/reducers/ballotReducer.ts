import { AnyAction, Reducer } from "redux";
import { Ballot } from "../models/models";
import { isRefreshBallotsSuccessAction } from "../actions/tallyActions";

// TODO: we can change AnyAction to be a more specific type
const initialBallots = [] as Ballot[];
export const ballotReducer: Reducer<Ballot[], AnyAction> = (
  ballots = initialBallots,
  action
) => {
  if (isRefreshBallotsSuccessAction(action)) {
    return [...action.payload];
  }
  return [ ...ballots ];
};
