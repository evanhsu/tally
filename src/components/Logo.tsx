import React from "react";
import logo from "../images/tally-logo-120x120.png";

type Size = "small" | "medium" | "large";
export type LogoProps = {
  width?: number;
  height?: number;
  size?: Size;
};

const sizes = {
  small: {
    width: 30,
    height: 30,
  },
  medium: {
    width: 50,
    height: 50,
  },
  large: {
    width: 120,
    height: 120,
  },
};
export const Logo = (props: LogoProps) => {
  const { width = 130, height = 150 } = props.size
    ? sizes[props.size]
    : { width: props.width, height: props.height };
  return <img alt="logo" src={logo} style={{ width: width, height: height }} />;
};
