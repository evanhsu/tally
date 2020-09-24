import React from "react";
import { useForm } from "../hooks/useForm";
import { Voter, NewVoter } from "../models/models";

export type EditVoterProps = {
    voter: Voter
    onEditVoter: (newVoterInfo: Voter) => void,
    onCancelVoter: () => void
};

export const EditVoter = (props: EditVoterProps) => {
    const [ voterForm, change ] = useForm({
        firstName: props.voter.firstName, 
        lastName: props.voter.lastName, 
        address: props.voter.address, 
        county: props.voter.county,
        city: props.voter.city,
        birthdate: props.voter.birthdate,
        email: props.voter.email,
        phone: props.voter.phone,
        completedElectionIds: props.voter.completedElectionIds,
      });
    
      const saveVoter = () => {
        props.onEditVoter({
          ...voterForm,
          id: props.voter.id,
          completedElectionIds: props.voter.completedElectionIds,
        });
      }
    
      return (
        <tr>
          <td>{props.voter.id}</td>
          <td><input type="text" name="firstName" value={voterForm.firstName} onChange={change} /></td>
          <td><input type="text" name="lastName" value={voterForm.lastName} onChange={change} /></td>
          <td><input type="text" name="address" value={voterForm.address} onChange={change} /></td>
          <td><input type="text" name="county" value={voterForm.county} onChange={change} /></td>
          <td><input type="text" name="city" value={voterForm.city} onChange={change} /></td>
          <td><input type="text" name="birthdate" value={voterForm.birthdate} onChange={change} /></td>
          <td><input type="text" name="email" value={voterForm.email} onChange={change} /></td>
          <td><input type="text" name="phone" value={voterForm.phone} onChange={change} /></td>
          <td>
            <button type="button"
              onClick={saveVoter}>Save</button>
            { <button type="button"
              onClick={props.onCancelVoter}>Cancel</button> }
          </td>
        </tr>
      );
}