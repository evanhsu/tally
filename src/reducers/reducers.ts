import { AnyAction, Reducer, combineReducers } from "redux";
import { TallyState } from "../models/tallyState";
import { voterReducer } from "./voterReducer";
// import { electionReducer } from "./electionReducer";
import { ballotReducer } from "./ballotReducer";

export const tallyReducer: Reducer<TallyState, AnyAction> = combineReducers({
  voters: voterReducer,
  // elections: electionReducer,
  ballots: ballotReducer,
});
