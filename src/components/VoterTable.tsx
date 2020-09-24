import React from "react";
import { Voter, NewVoter, VotersSort, VoterKeys } from "../models/models";
import {ViewVoter} from "./ViewVoter"
import {EditVoter} from "./EditVoter"

export type VoterTableProps = {
    voters: Voter[],
    votersSort: VotersSort,
    onSortVoters: (col: VoterKeys) => void,
    onDeleteVoter: (voterId: number) => void,
  };
  
  type ColHeaderProps = {
    carsSort: VotersSort,
    col: keyof Voter,
    caption: string,
    onClick: (col: keyof Voter) => void,
  }
  
  function ColHeader(props: ColHeaderProps) {
    return (
      <th onClick={() => props.onClick(props.col)}>
        {props.caption}
        {props.carsSort.col === props.col && <span>({props.carsSort.dir})</span>}
      </th>
    );
  }

export const VoterTable = (props: VoterTableProps) => {
    return (
        <table>
        <thead>
          <tr>
            <ColHeader carsSort={props.votersSort} col="id" caption="ID" onClick={() => props.onSortVoters} />
            <ColHeader carsSort={props.votersSort} col="firstName" caption="First Name" onClick={() => props.onSortVoters} />
            <ColHeader carsSort={props.votersSort} col="lastName" caption="Last Name" onClick={() => props.onSortVoters} />
            <ColHeader carsSort={props.votersSort} col="address" caption="Address" onClick={() => props.onSortVoters} />
            <ColHeader carsSort={props.votersSort} col="county" caption="County" onClick={() => props.onSortVoters} />
            <ColHeader carsSort={props.votersSort} col="city" caption="City" onClick={() => props.onSortVoters} />
            <ColHeader carsSort={props.votersSort} col="birthdate" caption="Birthdate" onClick={() => props.onSortVoters} />
            <ColHeader carsSort={props.votersSort} col="email" caption="Email" onClick={() => props.onSortVoters} />
            <ColHeader carsSort={props.votersSort} col="phone" caption="Phone" onClick={() => props.onSortVoters} />            
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {props.voters.map(voter => voter.id === 1000 //editVoterId
            ? <EditVoter key={voter.id} voter={voter} />
            : <ViewVoter key={voter.id} voter={voter} onDeleteVoter={props.onDeleteVoter}/>)}
        </tbody>
      </table>
      );    
}