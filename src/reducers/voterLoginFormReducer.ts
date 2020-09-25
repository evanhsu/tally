import { AnyAction, Reducer } from "redux";
import { VoterLoginForm } from "../models/models";

// TODO: we can change AnyAction to be a more specific type
const initialLoginForm =  {
  authorizationInProgress: false,
  errorMessage: "",
};
export const voterLoginFormReducer: Reducer<VoterLoginForm, AnyAction> = (
    voterLoginForm = initialLoginForm,
    action
) => {
//   if (isSetElectionFormAction(action)) {
//     return {
//       ...electionForm,
//       ...action.payload
//     };
//   }
  return { ...voterLoginForm };
};
