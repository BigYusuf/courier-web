import React from "react";
import "./inputField.css";

const InputField = (icon, value, type, onChange, placeholder) => {
  return (
    <div className="input__container">
      <div className="input__tab">
        <input
          type={type}
          // value={value}
          //onChange={onChange}
          placeholder={placeholder}
        />
        {icon && <i className="bx bx-search"></i>}
      </div>
      <button className="input__button">Save</button>
    </div>
  );
};

export default InputField;
