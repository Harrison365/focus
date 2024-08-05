import React from "react";
import "./Modal.css";

const Modal = ({ showModal, setShowModal }) => {
  if (!showModal) {
    return null;
  }
  return (
    <div className="modal-overlay">
      <div className="modal-text">
        <h2>Welcome to Focus Timer.</h2>
        <p>
          A common trap in meditation, is setting a timer to get in some solid
          mindfulness, only to be distracted by our thoughts. Before you know
          it, the timer goes off and you've missed the whole session. This app
          is designed to help you stay focused.
        </p>
        <p>
          Set your timer and sound interval, and we'll play a soothing noise to
          get you back on track if your mind starts to wander.
        </p>
        <p>Enjoy!</p>
      </div>
      <button
        className="close-button"
        onClick={() => {
          setShowModal(false);
        }}
      >
        &times;
      </button>
    </div>
  );
};

export default Modal;
