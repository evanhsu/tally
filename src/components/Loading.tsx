import React from "react";
import loadingImg from "../images/loading.gif";

type Size = "small" | "medium" | "large";
export type LoadingProps = {
  width?: number;
  height?: number;
  size?: Size;
};

const sizes = {
  small: {
    width: 50,
    height: 50,
  },
  medium: {
    width: 100,
    height: 100,
  },
  large: {
    width: 150,
    height: 150,
  },
};
export const Loading = (props: LoadingProps) => {
  const { width = 100, height = 100 } = props.size
    ? sizes[props.size]
    : { width: props.width, height: props.height };
  return <img alt="loading..." src={loadingImg} style={{ width: width, height: height }} />;
};
