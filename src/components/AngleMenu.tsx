import React from "react";

export type AngleMenuProps = {};
export const AngleMenu = (props: AngleMenuProps) => {
  return (
    <nav className="angle-menu">
      <a href="#">
        <span>Register</span>
      </a>
      <a href="#">
        <span>Vote</span>
      </a>
      <a href="#">
        <span>Plan</span>
      </a>
    </nav>
  );
};
