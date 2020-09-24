import { AnyAction, Reducer, combineReducers } from "redux";
import { TallyState } from "../models/tallyState";
import { voterReducer } from "./voterReducer";
import { electionReducer } from "./electionReducer";
import { electionsLoadingReducer } from "./electionsLoadingReducer";
import { ballotReducer } from "./ballotReducer";
import { electionFormReducer } from "./electionFormReducer";

export const tallyReducer: Reducer<TallyState, AnyAction> = combineReducers({
  voters: voterReducer,
  elections: electionReducer,
  electionsLoading: electionsLoadingReducer,
  electionForm: electionFormReducer,
  ballots: ballotReducer,
});
