import React from "react";

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
