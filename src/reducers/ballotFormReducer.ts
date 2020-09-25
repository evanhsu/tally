import { AnyAction, Reducer } from "redux";
import {
  isSubmitBallotRequestAction,
  isSubmitBallotSuccessAction,
  isSubmitBallotFailedAction,
} from "../actions/tallyActions";
import { BallotForm } from "../models/models";

const initialBallotForm = {
  isSubmitting: false,
};
export const ballotFormReducer: Reducer<BallotForm, AnyAction> = (
  ballotForm = initialBallotForm,
  action
) => {
  if (isSubmitBallotRequestAction(action)) {
    return {
      isSubmitting: true,
    };
  }

  if (isSubmitBallotSuccessAction(action)) {
    return {
      isSubmitting: false,
    };
  }

  if (isSubmitBallotFailedAction(action)) {
    return {
      isSubmitting: false,
    };
  }

  return { ...ballotForm };
};
