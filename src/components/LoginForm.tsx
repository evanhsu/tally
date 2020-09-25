import React from "react";
import { useForm } from "../hooks/useForm";
import { LoginInfo } from "../models/models";

export type LoginFormProps = {
  onLogin: (loginForm: LoginInfo) => void;
  electionId: number;
  errorMessage: string;
};

export const LoginForm = (props: LoginFormProps) => {
  const [loginForm, change ] = useForm({
    id: "",
  });

  const showError = () => <div>{props.errorMessage}</div>;

  return (
    <form>
      {props.errorMessage && showError()}
      <label>
        LoginId
        <input type="text" name="id" value={loginForm.id} onChange={change} />
      </label>
      <button
        type="button"
        onClick={() =>
          props.onLogin({
            voterId: parseInt(loginForm.id),
            electionId: props.electionId,
          })
        }
      >
        Login
      </button>
    </form>
  );
};
