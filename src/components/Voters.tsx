import React from "react";
import { NewVoter } from "../models/models";

export type VotersProps = {
    onRegisterVoter: (newVoter: NewVoter) => void,
};

export const Voters = (props: VotersProps) => {
    console.log(props);
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
        Add Voter
      </button>
    </>
  );
};
