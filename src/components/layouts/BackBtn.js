import React from "react";
import "./BackBtn.css";

function BackBtn() {
  return (
    <div className="go-back">
      <a href="/" className="go-back-btn">
        Go home
      </a>
    </div>
  );
}

export default React.memo(BackBtn);
