import React from "react";
import logo from "../images/tally-logo-138x182.png";

export type LogoProps = {
  width?: number;
  height?: number;
};

export const Logo = (props: LogoProps) => {
  const { width = 130, height = 150 } = props;
  return <img src={logo} style={{ width: width, height: height }} />;
};
