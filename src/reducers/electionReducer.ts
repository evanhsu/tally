import { AnyAction, Reducer } from "redux";
import { Election } from "../models/models";

// TODO: we can change AnyAction to be a more specific type
const initialElections = [] as Election[];
export const electionReducer: Reducer<Election[], AnyAction> = (
  elections = initialElections,
  action
) => {
  // if (isSomethingAction(action)) {
  //     return {something};
  // }
  return { ...elections };
};
