import React from "react";
import { useHistory } from "react-router-dom";
import { Ballot } from "../models/models";
import { ViewBallot } from "./ViewBallot";

export type BallotTableProps = {
  ballots: Ballot[];
};

export const BallotTable = (props: BallotTableProps) => {

  const browserHistory = useHistory();
  const navigateToElectionResultsPage = () =>
  browserHistory.push(`/elections`);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Ballot ID</th>
            <th>Election ID</th>
            <th>Voter ID</th>
            <th>Election Answers</th>
          </tr>
        </thead>
        <tbody>
          {props.ballots.map((ballot) => (
            <ViewBallot key={ballot.id} ballot={ballot} />
          ))}
        </tbody>
      </table>
      <button type={"button"} onClick={navigateToElectionResultsPage}>Back To All Elections</button>
    </div>
  );
};
