import React from "react";
import { Voter, NewVoter } from "../models/models";
import { VoterTable } from './VoterTable'

export type VotersProps = {
    onRegisterVoter: (newVoter: NewVoter) => void,
    onViewRegisteredVoters: () => void,
    onDeleteVoter: (voterId: number) => void,
    onEditVoter: (newVoterInfo: Voter) => void,
    voters: Voter[]
};

export const Voters = (props: VotersProps) => {

  console.log(props.voters);

  return (
    <>
      <h1>Voters Page</h1>

      <button
        type="button"
        onClick={() => props.onRegisterVoter({
          firstName: "Mekha",
          lastName: "V",
          address: "123 Tally St",
          county: "ABC",
          city: "East Coast",
          birthdate: "1915-01-01",
          email: "lwang@ymail.com",
          phone: "555-888-0909",
          completedElectionIds: [],
        })}
      >
        Register Voter
      </button>

      <VoterTable voters={props.voters} votersSort={{col: "id", dir: "asc"}} onSortVoters={()=>{}}/>
      
      {/* <button
        type="button"
        onClick={() => props.onViewRegisteredVoters()}
      >
        View Voters
      </button>

      <button
        type="button"
        onClick={() => props.onRegisterVoter({
          firstName: "Mekha",
          lastName: "V",
          address: "123 Tally St",
          county: "ABC",
          city: "East Coast",
          birthdate: "1915-01-01",
          email: "lwang@ymail.com",
          phone: "555-888-0909",
          completedElectionIds: [],
        })}
      >
        Add Voter
      </button>

      <button
        type="button"
        onClick={() => props.onDeleteVoter(3)}
      >
        Delete Voter
      </button>

      <button
        type="button"
        onClick={() => props.onEditVoter({
          id: 3,
          firstName: "Muneer",
          lastName: "Y",
          address: "123 Tally St",
          county: "ABC",
          city: "East Coast",
          birthdate: "1915-01-01",
          email: "lwang@ymail.com",
          phone: "555-888-0909",
          completedElectionIds: [],
        })}
      >
        Edit Voter
      </button> */}
    </>
  );
};
