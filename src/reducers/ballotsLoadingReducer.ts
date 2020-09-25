import { AnyAction, Reducer } from "redux";
import { isRefreshBallotsRequestAction, isRefreshBallotsSuccessAction, isRefreshBallotsFailedAction } from "../actions/tallyActions";

// TODO: we can change AnyAction to be a more specific type
export const ballotsLoadingReducer: Reducer<boolean, AnyAction> = (
  isLoading = true,
  action
) => {
  if(isRefreshBallotsRequestAction(action)) {
      return true;
  }

  if(isRefreshBallotsSuccessAction(action)) {
      return false;
  }

  if(isRefreshBallotsFailedAction(action)) {
      return false;
  }

  return isLoading;
};
