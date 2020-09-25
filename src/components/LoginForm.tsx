import React from 'react';
import { useForm } from '../hooks/useForm';
import { Election, LoginInfo } from '../models/models';

export type LoginFormProps = {
    onLogin : (loginForm: LoginInfo) => void,
    electionId: number
}

export const LoginForm = (props: LoginFormProps) => {

    const [ loginForm, change, resetCarForm ] = useForm({
        id: ''
      });

 
    
    return(
        <form>
        <label>
          LoginId
          <input type="text" name="id"
                 value={loginForm.id} onChange={change} />
        </label>
        <button type="button" onClick={() => props.onLogin({voterId: parseInt(loginForm.id), electionId: props.electionId})}>Login</button>
      </form>        
    )
}