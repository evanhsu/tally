import { AnyAction, Reducer, combineReducers } from "redux";
import { TallyState } from "../models/tallyState";
import { voterReducer, editVoterIdReducer, votersSortReducer } from "./voterReducer";
import { electionReducer } from "./electionReducer";
import { electionsLoadingReducer } from "./electionsLoadingReducer";
import { ballotReducer } from "./ballotReducer";
import { electionFormReducer } from "./electionFormReducer";

export const tallyReducer: Reducer<TallyState, AnyAction> = combineReducers({
  voters: voterReducer,
  editVoterId: editVoterIdReducer,
  votersSort: votersSortReducer,
  elections: electionReducer,
  electionsLoading: electionsLoadingReducer,
  electionForm: electionFormReducer,
  ballots: ballotReducer,
});
