import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div>
      <h1>Welcome</h1>
      <Link to="/dogs">
        <button>get into</button>
      </Link>
    </div>
  );
}
