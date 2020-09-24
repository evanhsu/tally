import React from "react";
import { Voter, NewVoter } from "../models/models";

export type ViewVoterProps = {
    voter: Voter,
    onDeleteVoter: (voterId: number) => void,
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
          <td>{props.voter.city}</td>   
          <td>{props.voter.phone}</td>         
          <td>
            <button type="button"
              //onClick={() => props.onEditCar(props.car.id)}
              >Edit
              </button>
            <button type="button"
              onClick={() => props.onDeleteVoter(props.voter.id)}
              >Delete
              </button>
          </td>
        </tr>
      );}