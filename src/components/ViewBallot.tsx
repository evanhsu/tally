import React from "react";
import { Voter, NewVoter, Ballot } from "../models/models";

export type ViewBallotProps = {
    ballot: Ballot,
};

export const ViewBallot = (props: ViewBallotProps) => {
    return (
        <tr>
            <td>{props.ballot.id}</td>
            <td>{props.ballot.electionId}</td>
            <td>{props.ballot.voterId}</td>
            <table>
                {props.ballot.answers.map(answer =>
                    <tr>
                        <td>{answer.question}</td>
                        <td>{answer.voterResponse}</td>    
                    </tr>
                )}
            </table>
        </tr>
      );}