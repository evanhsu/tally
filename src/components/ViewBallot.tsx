import React from "react";
import { Ballot } from "../models/models";

export type ViewBallotProps = {
  ballot: Ballot;
};

export const ViewBallot = (props: ViewBallotProps) => {
  return (
    <tr>
      <td>{props.ballot.id}</td>
      <td>{props.ballot.electionId}</td>
      <td>{props.ballot.voterId}</td>
      <td>
        <ul>
          {props.ballot.answers.map((answer) => (
            <li key={`${props.ballot.id}-${answer.question}`}>
              <span>{answer.question}</span>
              <span>{answer.voterResponse}</span>
            </li>
          ))}
        </ul>
      </td>
    </tr>
  );
};
