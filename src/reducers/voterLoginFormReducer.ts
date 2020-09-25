import { AnyAction, Reducer } from "redux";
import { VoterLoginForm } from "../models/models";

import {
  isVoterLoginRequestAction,
  isVoterLoginSuccessAction,
} from "../actions/tallyActions";

// TODO: we can change AnyAction to be a more specific type
const initialLoginForm = {
  authorizationInProgress: false,
  errorMessage: "",
};
export const voterLoginFormReducer: Reducer<VoterLoginForm, AnyAction> = (
  voterLoginForm = initialLoginForm,
  action
) => {
  if (isVoterLoginRequestAction(action)) {
    return {
      authorizationInProgress: action.payload.authorizationInProgress,
      errorMessage: action.payload.errorMessage,
    };
  }
  return { ...voterLoginForm };
};
