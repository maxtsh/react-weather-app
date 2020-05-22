import React, { useState } from "react";
import { clearAllCities } from "../../actions/index";

function Modal({ toggleModal }) {
  console.log("MODAL RENDER");
  const [err, setErr] = useState({ hasErr: false, message: "" });

  function handleClear() {
    try {
      clearAllCities();
      toggleModal(false);
      window.location.reload();
    } catch (err) {
      setErr({ hasErr: true, message: err.message });
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
          <h1 className="modal-title">Are you sure ?</h1>
          <button className="modal-confirm" onClick={handleClear}>
            Clear
          </button>
          {err.hasErr ? <h4 className="modal-error">{err.message}</h4> : null}
        </div>
      </div>
    </>
  );
}

export default Modal;
