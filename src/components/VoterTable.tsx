import React, { useState } from "react";
import { Voter, VotersSort } from "../models/models";
import { ViewVoter } from "./ViewVoter";
import { EditVoter } from "./EditVoter";

export type VoterTableProps = {
  editVoterId: number;
  voters: Voter[];
  votersSort: VotersSort;
  onSortVoters: (col: keyof Voter) => void;
  onDeleteVoters: (voterIds: number[]) => void;
  onEditVoter: (newVoterInfo: Voter) => void;
  onCancelVoter: () => void;
  onEditVoterId: (voterId: number) => void;
};

type ColHeaderProps = {
  carsSort: VotersSort;
  col: keyof Voter;
  caption: string;
  onClick: (col: keyof Voter) => void;
};

function ColHeader(props: ColHeaderProps) {
  return (
    <th onClick={() => props.onClick(props.col)}>
      {props.caption}
      {props.carsSort.col === props.col && <span>({props.carsSort.dir})</span>}
    </th>
  );
}

export const VoterTable = (props: VoterTableProps) => {
  const [selectedDeleteUsers, setSelectedDeleteUsers] = useState<number[]>(
    [] as number[]
  );

  const onToggleDelete = (
    voterId: number
  ) /*(e: ChangeEvent<HTMLInputElement>)*/ => {
    const indexOfToggledVoter = selectedDeleteUsers.indexOf(voterId);
    if (indexOfToggledVoter === -1) {
      // not in the array of selected delete users. Add it
      setSelectedDeleteUsers(selectedDeleteUsers.concat(voterId));
    } else {
      // toggled voter was found. Delete it.
      setSelectedDeleteUsers(
        selectedDeleteUsers.filter((user) => {
          return user !== voterId;
        })
      );
    }
  };

  const deleteVoters = () => {
    props.onDeleteVoters(selectedDeleteUsers);
    setSelectedDeleteUsers([]);
  };

  return (
    <>
      <table>
        <thead>
          <tr>
            <ColHeader
              carsSort={props.votersSort}
              col="id"
              caption="ID"
              onClick={props.onSortVoters}
            />
            <ColHeader
              carsSort={props.votersSort}
              col="firstName"
              caption="First Name"
              onClick={props.onSortVoters}
            />
            <ColHeader
              carsSort={props.votersSort}
              col="lastName"
              caption="Last Name"
              onClick={props.onSortVoters}
            />
            <ColHeader
              carsSort={props.votersSort}
              col="address"
              caption="Address"
              onClick={props.onSortVoters}
            />
            <ColHeader
              carsSort={props.votersSort}
              col="county"
              caption="County"
              onClick={props.onSortVoters}
            />
            <ColHeader
              carsSort={props.votersSort}
              col="city"
              caption="City"
              onClick={props.onSortVoters}
            />
            <ColHeader
              carsSort={props.votersSort}
              col="birthdate"
              caption="Birthdate"
              onClick={props.onSortVoters}
            />
            <ColHeader
              carsSort={props.votersSort}
              col="email"
              caption="Email"
              onClick={props.onSortVoters}
            />
            <ColHeader
              carsSort={props.votersSort}
              col="phone"
              caption="Phone"
              onClick={props.onSortVoters}
            />
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {props.voters.map((voter) =>
            voter.id === props.editVoterId ? (
              <EditVoter
                key={voter.id}
                voter={voter}
                onEditVoter={props.onEditVoter}
                onCancelVoter={props.onCancelVoter}
              />
            ) : (
              <ViewVoter
                key={voter.id}
                voter={voter}
                onEditVoterId={props.onEditVoterId}
                onToggleDelete={onToggleDelete}
              />
            )
          )}
        </tbody>
      </table>
      <button type="button" onClick={deleteVoters}>
        Deleted Selected Users
      </button>
    </>
  );
};
