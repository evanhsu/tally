import React from "react";
import { Logo } from "./Logo";
import { Link } from "react-router-dom";

type Size = "small" | "medium" | "large";
export type BrandProps = {
  size?: Size;
  children?: React.ReactNode;
};

const fontSizes = {
  small: "1em",
  medium: "1.5em",
  large: "3em",
};
export const Brand = (props: BrandProps) => {
  const { size = "medium" } = props;
  return (
    <div className="brand">
      <nav>
        <Link to="/home">
          <Logo size={size} />
          <span style={{ fontSize: fontSizes[size] }}>{props.children}</span>
        </Link>
      </nav>
    </div>
  );
};
