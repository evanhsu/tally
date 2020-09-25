import React from "react";

export type ConfirmationProps = {
  message: string;
  handleClick: () => void;
  buttonText: string;
};
export const Confirmation = (props: ConfirmationProps) => {
  const { message, handleClick, buttonText } = props;

  return (
    <div className="confirmation-wrapper">
      <h1>{message}</h1>
      <button type="button" onClick={handleClick}>
        {buttonText}
      </button>
    </div>
  );
};
