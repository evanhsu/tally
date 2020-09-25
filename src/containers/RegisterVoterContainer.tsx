import React, {useEffect} from "react";
import { useHistory, Switch, Route, useRouteMatch } from 'react-router-dom';
import { bindActionCreators } from "redux";
import { useSelector, useDispatch } from "react-redux";

import * as TallyActions from "../actions/tallyActions";
import { TallyState } from "../models/tallyState";
import { Voter, VotersSort } from "../models/models";
import { Voters } from "../components/Voters";
import { VoterForm } from "../components/VoterForm";

const sortedVoters = (voters: Voter[], votersSort: VotersSort) => {
  return voters.concat().sort((a: Voter, b: Voter) => {

    const left = String(a[votersSort.col]).toUpperCase();
    const right = String(b[votersSort.col]).toUpperCase();

    if (left < right) {
      return votersSort.dir === 'asc' ? -1 : 1;
    } else if (left > right) {
      return votersSort.dir === 'asc' ? 1 : -1;
    } else {
      return 0;
    }
  });
}

export type RegisterVoterContainerProps = {};
export function RegisterVoterContainer(props: RegisterVoterContainerProps) {
  let match = useRouteMatch();
  const history = useHistory();
  const voters = useSelector<TallyState, Voter[]>(state => sortedVoters(state.voters, state.votersSort));
  const votersSort = useSelector<TallyState, VotersSort>(state => state.votersSort);
  const editVoterId = useSelector<TallyState, number>(state => state.editVoterId);

  const navigateToRegisterVoterPage = () => history.push('/voters/create');

  const dispatch = useDispatch();
  const boundActions = bindActionCreators(
    {
      onRegisterVoter: TallyActions.appendVoter,
      onViewRegisteredVoters: TallyActions.fetchVoters,
      onDeleteVoters: TallyActions.deleteMultipleVoters,
      onEditVoter: TallyActions.editVoter,
      onSortVoters: TallyActions.createSortVotersAction,
      onCancelVoter: TallyActions.createCancelVoterAction,
      onEditVoterId: TallyActions.createEditVoterIdAction,
    },
    dispatch
  );

  useEffect(() => {
    dispatch(TallyActions.fetchVoters());
  }, [dispatch])

  return (
    <>
    <Switch>
        <Route path={`${match.path}/create`}>
          <VoterForm onRegisterVoter={boundActions.onRegisterVoter} />
        </Route>
        <Route path={`${match.path}`}>
          <Voters {...boundActions} navigateToRegisterVoterPage={navigateToRegisterVoterPage} editVoterId={editVoterId} votersSort={votersSort} voters={voters} />
        </Route>
    </Switch>    
    </>
    );
}
