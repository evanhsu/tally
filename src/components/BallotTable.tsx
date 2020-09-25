import React from "react";
import { Ballot } from "../models/models";
import { ViewBallot } from "./ViewBallot";

export type BallotTableProps = {
  ballots: Ballot[];
};

export const BallotTable = (props: BallotTableProps) => {
  return (
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
  );
};
