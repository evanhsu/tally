import React, { useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { refreshBallots } from "../actions/tallyActions";
import { BallotTable } from "../components/BallotTable";
import { TallyState } from "../models/tallyState";
import { Ballot } from "../models/models";
import { Loading } from '../components/Loading';

export type BallotTableContainerProps = {};
export function BallotTableContainer(props: BallotTableContainerProps) {
  const { electionId }: { electionId: string } = useParams();
  const isLoading = useSelector<TallyState, boolean>((state) => state.ballotsLoading);
  const ballots = useSelector<TallyState, Ballot[]>((state) => state && state.ballots && state.ballots.filter(ballot => ballot.electionId === Number(electionId)));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshBallots());
  }, [dispatch]);

  if (isLoading) {
      return <Loading size="large"/>;
  }

  return <BallotTable ballots={ballots} />;
}
