import React from "react";

const SubmitBtn = ({ disabled, bgColor, color, onClick, outline }) => {
  return (
    <button
      style={{
        backgroundColor: outline ? "white" : bgColor ? bgColor : "blue",
        color: color ? color : "white",
        borderColor: outline ? bgColor : "transparent",
      }}
      onClick={onClick}
      disabled={disabled}
    >
      SubmitBtn
    </button>
  );
};

export default SubmitBtn;
