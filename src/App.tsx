import React from "react";
import { TopNav } from "./components/TopNav";
import { BrowserRouter } from "react-router-dom";
import { Routes } from "./routes/routes";

export const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <TopNav />
        <div className="main-content">
          <Routes />
        </div>
      </BrowserRouter>
    </div>
  );
};
