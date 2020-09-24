import { AnyAction, Reducer } from "redux";
import { Ballot } from "../models/models";

// TODO: we can change AnyAction to be a more specific type
const initialBallots = [] as Ballot[];
export const ballotReducer: Reducer<Ballot[], AnyAction> = (
  ballots = initialBallots,
  action
) => {
  // if (isSomethingAction(action)) {
  //     return {something};
  // }
  return { ...ballots };
};
