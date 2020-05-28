import React, { useState, useContext } from "react";
import { languageContext } from "../../context/languageContext";
import { clearAllCities } from "../../actions/index";

const langs = {
  English: {
    rusure: "Are you sure ?",
    clear: "Clear",
    nothing: "There is nothing to delete!",
  },
  Persian: {
    rusure: "آیا مطمئن هستید ؟",
    clear: "پاک سازی",
    nothing: "چیزی برای پاک کردن وجود ندارد!",
  },
};

function Modal({ toggleModal }) {
  const language = useContext(languageContext);
  const [err, setErr] = useState({ hasErr: false, message: "" });

  function handleClear() {
    try {
      clearAllCities();
      toggleModal(false);
      window.location.reload();
    } catch (err) {
      setErr({ hasErr: true, message: langs[language.current].nothing });
    }
  }

  return (
    <>
      <div className="black-layer"></div>
      <div className="modal-container">
        <div className="modal-wrapper">
          <i
            className="fas fa-times-circle"
            onClick={() => toggleModal(false)}
          ></i>
          <h1 className="modal-title">{langs[language.current].rusure}</h1>
          <button className="modal-confirm" onClick={handleClear}>
            {langs[language.current].clear}
          </button>
          {err.hasErr ? <h4 className="modal-error">{err.message}</h4> : null}
        </div>
      </div>
    </>
  );
}

export default Modal;
