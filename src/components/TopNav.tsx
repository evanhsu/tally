import React from "react";
import { Brand } from "./Brand";
import { Link, useRouteMatch } from "react-router-dom";

export type TopNavProps = {
  brandOnly?: boolean;
};
export const TopNav = (props: TopNavProps) => {
  const { brandOnly = false } = props;
  let homeRouteMatch = useRouteMatch("/home");

  const isHomePage = homeRouteMatch?.isExact;
  const hideLinks = brandOnly || isHomePage;

  return (
    <div className={`top-nav ${isHomePage && 'fixed'}`}>
      <Brand size="medium">Tally Ho!</Brand>
      <nav>
        {hideLinks ? null : (
          <>
            <Link to="/voters">Register</Link>
            <Link to="/elections">Vote</Link>
            <Link to="/elections">Plan</Link>
          </>
        )}
      </nav>
    </div>
  );
};
