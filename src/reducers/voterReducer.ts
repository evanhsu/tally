import { AnyAction, Reducer } from "redux";
import { Voter } from "../models/models";

// TODO: we can change AnyAction to be a more specific type
const initialVoters = [] as Voter[];
export const voterReducer: Reducer<Voter[], AnyAction> = (
  voters = initialVoters,
  action
) => {
  // if (isSomethingAction(action)) {
  //     return {something};
  // }
  return { ...voters };
};
