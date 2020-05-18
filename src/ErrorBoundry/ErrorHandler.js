import React from "react";

const languages = {
  English: {
    errMessage: "We are sorry about this but",
  },
  Persian: {
    errMessage: "متاسفانه خطایی رخ داده است که",
  },
};

// **** This Component handles the errors happening withing Async Calls
export default function ErrorHandler({ currentLang, message, type }) {
  if (type === "success") {
    return (
      <div className="popup-wrapper">
        <h3 className="success-message">
          <i className="fas fa-check-circle"></i>
          {message}
        </h3>
      </div>
    );
  } else if (type === "error") {
    return (
      <div className="popup-wrapper">
        <h3 className="error-message">
          <i className="fas fa-exclamation-circle"></i>
          {languages[currentLang].errMessage + " " + message}
        </h3>
      </div>
    );
  } else {
    return null;
  }
}
