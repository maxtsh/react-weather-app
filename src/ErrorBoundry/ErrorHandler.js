import React, { useContext } from "react";
import { languageContext } from "../context/languageContext";
const languages = {
  English: {
    errMessage: "We are sorry but",
  },
  Persian: {
    errMessage: "خطا،",
  },
};

// **** This Component handles the errors happening withing Async Calls or Event Handlers
function ErrorHandler({ message, type }) {
  const language = useContext(languageContext);

  if (type === "success") {
    return (
      <div
        style={{ direction: language.current === "English" ? "ltr" : "rtl" }}
        className="popup-wrapper"
      >
        <h3 className="success-message">
          <i className="fas fa-check-circle"></i>
          {message}
        </h3>
      </div>
    );
  } else if (type === "error") {
    return (
      <div
        style={{ direction: language.current === "English" ? "ltr" : "rtl" }}
        className="popup-wrapper"
      >
        <h3 className="error-message">
          <i className="fas fa-exclamation-circle"></i>
          {languages[language.current].errMessage + " " + message}
        </h3>
      </div>
    );
  } else {
    return null;
  }
}

export default React.memo(ErrorHandler);
