import React from "react";
import { Link } from "react-router-dom";

function AppNavbar() {
  return (
    <header className="appNavbar">
      <Link to="/">
        <h1>Class Management App</h1>
      </Link>
    </header>
  );
}

export default AppNavbar;
