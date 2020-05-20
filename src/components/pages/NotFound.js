import React from "react";
import BackBtn from "../layouts/BackBtn";

function NotFound() {
  return (
    <div className="not-found-container">
      <div className="not-found-wrapper">
        <BackBtn />
        <h1 className="not-found-title">Not Found</h1>
        <p className="not-found-text">
          We are sorry but something you were looking for does not exist.
        </p>
      </div>
    </div>
  );
}

export default NotFound;
