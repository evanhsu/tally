import React from "react";
import { Brand } from "./Brand";

export type TopNavProps = {
  brandOnly?: boolean;
};
export const TopNav = (props: TopNavProps) => {
  const { brandOnly = false } = props;

  return (
    <div className="top-nav">
      <Brand size="medium">Tally Ho!</Brand>

      {brandOnly ? null : (
        <nav>
          <a href="#">Register</a>
          <a href="#">Vote</a>
          <a href="#">Plan</a>
        </nav>
      )}
    </div>
  );
};
