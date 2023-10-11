import React from "react";

const Overlay = ({ children, setShow, setModalShow }) => {
  return (
    <div className="modal" onClick={() => setShow(false)}>
      {children}
    </div>
  );
};

export default Overlay;
