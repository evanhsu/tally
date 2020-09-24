import React from "react";
import { Election } from "../models/models";

export type ElectionsTableProps = {
  elections: Election[];
  navigateToVotePage: (electionId: number) => void;
  navigateToElectionResultsPage: (electionId: number) => void;
};

export const ElectionsTable = (props: ElectionsTableProps) => {
  const {
    elections,
    navigateToVotePage,
    navigateToElectionResultsPage,
  } = props;
  return (
    <table id="view-elections-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Questions</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {elections.map((election) => (
          <tr>
            <td>{election.name}</td>
            <td>
              <ul>
                {election.questions.map((question) => (
                  <li>{question.question}</li>
                ))}
              </ul>
            </td>
            <td>
              <button
                type="button"
                onClick={() => navigateToVotePage(election.id)}
              >
                Vote
              </button>
              <button
                type="button"
                onClick={() => navigateToElectionResultsPage(election.id)}
              >
                View Results
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
