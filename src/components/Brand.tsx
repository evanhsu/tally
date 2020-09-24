import React from "react";
import { Logo } from "./Logo";

type Size = "small" | "medium" | "large";
export type BrandProps = {
  size?: Size;
  children?: React.ReactNode;
};

const fontSizes = {
  small: "1em",
  medium: "2em",
  large: "3em",
};
export const Brand = (props: BrandProps) => {
  const { size = "medium" } = props;
  return (
    <div className="brand">
      <Logo size={size} />
      <span style={{ fontSize: fontSizes[size] }}>{props.children}</span>
    </div>
  );
};
