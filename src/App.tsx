import React from "react";
import { AngleMenu } from "./components/AngleMenu";
import { TopNav } from "./components/TopNav";
export const App = () => {
  return (
    <div className="app">
      <TopNav brandOnly />
      <AngleMenu />
    </div>
  );
};
