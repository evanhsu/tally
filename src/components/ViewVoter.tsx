import React from "react";
import { Voter } from "../models/models";

export type ViewVoterProps = {
  voter: Voter;
  onEditVoterId: (voterId: number) => void;
  onToggleDelete: (voterId: number) => void;
};

export const ViewVoter = (props: ViewVoterProps) => {
  return (
    <tr>
      <td>{props.voter.id}</td>
      <td>{props.voter.firstName}</td>
      <td>{props.voter.lastName}</td>
      <td>{props.voter.address}</td>
      <td>{props.voter.county}</td>
      <td>{props.voter.city}</td>
      <td>{props.voter.birthdate}</td>
      <td>{props.voter.email}</td>
      <td>{props.voter.phone}</td>
      <td>
        <button
          type="button"
          onClick={() => props.onEditVoterId(props.voter.id)}
        >
          Edit
        </button>
      </td>
      <td>
        <input
          type="checkbox"
          onChange={() => props.onToggleDelete(props.voter.id)}
          id={String(props.voter.id)}
          name={String(props.voter.id)}
          value={String(props.voter.id)}
        />
      </td>
    </tr>
  );
};
