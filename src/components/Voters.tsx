import React from "react";
import { Voter, NewVoter, VotersSort } from "../models/models";
import { VoterTable } from './VoterTable';

export type VotersProps = {
    onRegisterVoter: (newVoter: NewVoter) => void,
    onViewRegisteredVoters: () => void,
    onDeleteVoters: (voterIds: number[]) => void,
    onEditVoter: (newVoterInfo: Voter) => void,
    onSortVoters: (col: keyof Voter) => void,
    onCancelVoter: () => void,
    onEditVoterId: (voterId: number) => void,
    navigateToRegisterVoterPage: () => void,
    voters: Voter[],
    votersSort: VotersSort,
    editVoterId: number,
};

export const Voters = (props: VotersProps) => {
  return (
    <div className="voter-page content-wrapper">
      <h1>Voters</h1>

      <button
        type="button"
        onClick={props.navigateToRegisterVoterPage}
      >
        Register Voter
      </button>

      <VoterTable 
        editVoterId={props.editVoterId}
        voters={props.voters}
        votersSort={props.votersSort}
        onSortVoters={props.onSortVoters}
        onDeleteVoters={props.onDeleteVoters}
        onEditVoter={props.onEditVoter}
        onCancelVoter={props.onCancelVoter}
        onEditVoterId={props.onEditVoterId}
      />
    </div>
  );
};
