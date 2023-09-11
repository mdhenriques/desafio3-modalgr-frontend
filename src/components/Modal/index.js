import React from "react";
import "./Modal.css"; // Importe o CSS para estilizar o modal

const Modal = ({ children }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">{children}</div>
    </div>
  );
};

export default Modal;
