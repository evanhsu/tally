import React from 'react';
import { useForm } from '../hooks/useForm';
import { NewVoter } from '../models/models';

export type CarFormProps = {
  onRegisterVoter: (voter: NewVoter) => void,
};

export function VoterForm(props: CarFormProps) {

  const [ voterForm, change, resetVoterForm ] = useForm({
    firstName: "", 
    lastName: "", 
    address: "", 
    county: "",
    city: "",
    birthdate: "",
    email: "",
    phone: "",
    completedElectionIds: [],
  });

  const submitVoter = () => {

    props.onRegisterVoter({
      ...voterForm,
    });

    resetVoterForm();
  };

  return (
    <form>
      <label>
        First Name
        <input type="text" name="firstName"
               value={voterForm.firstName} onChange={change} />
      </label>
      <label>
        Last Name
        <input type="text" name="lastName"
               value={voterForm.lastName} onChange={change} />
      </label>
      <label>
        Address
        <input type="text" name="address"
               value={voterForm.address} onChange={change} />
      </label>
      <label>
        County
        <input type="text" name="county"
               value={voterForm.county} onChange={change} />
      </label>
      <label>
        City
        <input type="text" name="city"
               value={voterForm.city} onChange={change} />
      </label>
      <label>
        Phone
        <input type="text" name="phone"
               value={voterForm.phone} onChange={change} />
      </label>
      <label>
        Email
        <input type="text" name="email"
               value={voterForm.email} onChange={change} />
      </label>
      
      <button type="button" onClick={submitVoter}>Register</button>
    </form>
  );
}