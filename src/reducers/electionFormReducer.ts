import { AnyAction, Reducer } from "redux";
import {
  isSetElectionFormAction,
} from "../actions/electionActions";
import { NewElection, ElectionQuestion } from "../models/models";

// TODO: we can change AnyAction to be a more specific type
const initialForm = {
  name: "",
  questions: [] as ElectionQuestion[],
};

export const electionFormReducer: Reducer<NewElection, AnyAction> = (
  electionForm = initialForm,
  action
) => {
  if (isSetElectionFormAction(action)) {
    return {
      ...electionForm,
      ...action.payload
    };
  }
  return { ...electionForm };
};
