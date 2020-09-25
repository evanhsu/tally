import React from "react";
import { useHistory } from "react-router-dom";

export const Confirmation = () => {
  
    const browserHistory = useHistory();
    const navigateToHomeResultsPage = () =>
    browserHistory.push(`/home`);
  
  return (
    <div className="confirmation-wrapper">
      <h1>Congratulations! Your inputs have been saved.</h1>
      <button type="button" onClick={navigateToHomeResultsPage}>Go back to home</button>
    </div>
  );
};