import { AnyAction, Reducer, combineReducers } from "redux";
import { TallyState } from "../models/tallyState";
import {
  voterReducer,
  editVoterIdReducer,
  votersSortReducer,
} from "./voterReducer";
import { electionReducer } from "./electionReducer";
import { electionsLoadingReducer } from "./electionsLoadingReducer";
import { ballotReducer } from "./ballotReducer";
import { electionFormReducer } from "./electionFormReducer";
import { currentVoterIdReducer } from "./currentVoterIdReducer";
import { voterLoginFormReducer } from "./voterLoginFormReducer";
import { ballotFormReducer } from "./ballotFormReducer";
import { ballotsLoadingReducer } from "./ballotsLoadingReducer";

export const tallyReducer: Reducer<TallyState, AnyAction> = combineReducers({
  currentVoterId: currentVoterIdReducer,
  voterLoginForm: voterLoginFormReducer,
  voters: voterReducer,
  editVoterId: editVoterIdReducer,
  votersSort: votersSortReducer,
  elections: electionReducer,
  electionsLoading: electionsLoadingReducer,
  electionForm: electionFormReducer,
  ballots: ballotReducer,
  ballotsLoading: ballotsLoadingReducer,
  ballotForm: ballotFormReducer,
});
