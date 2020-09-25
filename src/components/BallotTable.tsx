import React from "react";
import { Ballot } from "../models/models";
import { ViewBallot } from "./ViewBallot";
import { Confirmation } from "./Confirmation";

export type BallotTableProps = {
  ballots: Ballot[];
};

export const BallotTable = (props: BallotTableProps) => {
  return (
    <div className="ballot-table-page content-wrapper">
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
    <Confirmation message="You are done viewing all your ballots" buttonText="Back To Home Page" handleClick={() => null} /> 
     </div>
  );
};
