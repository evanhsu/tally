import React from "react";
import { bindActionCreators } from "redux";
import { useSelector, useDispatch } from "react-redux";

import * as TallyActions from "../actions/tallyActions";
import { TallyState } from "../models/tallyState";
import { Voter } from "../models/models";
import { Voters } from "../components/Voters";

export function RegisterVoterContainer() {
  // const voters = useSelector<TallyState, Voter[]>((state) => state.voters);

  // const state = {
  //   voters
  // };

  const dispatch = useDispatch();
  const boundActions = bindActionCreators(
    {
      onRegisterVoter: TallyActions.appendVoter,
    },
    dispatch
  );

  return (<Voters {...boundActions}  />);
}
