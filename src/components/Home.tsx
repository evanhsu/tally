import React from "react";
import { Link } from "react-router-dom";

export type HomeProps = {};
export const Home = (props: HomeProps) => {
  return (
    <nav className="angle-menu">
      <Link to="/voters">
        <span>Register</span>
      </Link>
      <Link to="/elections">
        <span>Vote</span>
      </Link>
      <Link to="/elections/create">
        <span>Plan</span>
      </Link>
    </nav>
  );
};
