import { AnyAction, Reducer, combineReducers } from "redux";
import { TallyState } from "../models/tallyState";
import { voterReducer, editVoterIdReducer, votersSortReducer } from "./voterReducer";
// import { electionReducer } from "./electionReducer";
import { ballotReducer } from "./ballotReducer";

export const tallyReducer: Reducer<TallyState, AnyAction> = combineReducers({
  voters: voterReducer,
  editVoterId: editVoterIdReducer,
  votersSort: votersSortReducer,
  // elections: electionReducer,
  ballots: ballotReducer,
});
