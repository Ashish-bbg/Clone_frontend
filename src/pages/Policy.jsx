import React from "react";
import { useLocation } from "react-router-dom";

const Policy = () => {
  const location = useLocation();
  const pageName = location.pathname.replace("/", "").toUpperCase();

  return (
    <div style={{ padding: "50px", textAlign: "center" }}>
      <h2>{pageName}</h2>
      <p>
        This is a sample {pageName.toLowerCase()} page for a portfolio project.
      </p>
      <p>No real transactions take place here.</p>
      <p>Contact: demo@example.com</p>
    </div>
  );
};

export default Policy;
