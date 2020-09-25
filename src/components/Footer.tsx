import React from "react";
import { Brand } from "./Brand";
import { useRouteMatch } from "react-router-dom";

export type FooterProps = {};
export const Footer = (props: FooterProps) => {
  let homeRouteMatch = useRouteMatch("/home");
  const isHomePage = homeRouteMatch?.isExact;
  if (isHomePage) {
      return null;
  }
  return (
    <div className="footer">
      <Brand size="small">Evan, Lucille, Muneer, Mekha</Brand>
    </div>
  );
};
