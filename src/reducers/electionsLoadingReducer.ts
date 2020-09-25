import { AnyAction, Reducer } from "redux";
import { isRefreshElectionsDoneAction, isRefreshElectionsRequestAction } from "../actions/electionActions";

// TODO: we can change AnyAction to be a more specific type
export const electionsLoadingReducer: Reducer<boolean, AnyAction> = (
  isLoading = true,
  action
) => {
  if(isRefreshElectionsRequestAction(action)) {
      return true;
  }

  if(isRefreshElectionsDoneAction(action)) {
      return false;
  }

  return isLoading;
};
