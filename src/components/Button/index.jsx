import React from "react";
import LoadingBox from "../loadingBox";

const Button = ({ type, loading, onClick, title }) => {
  return (
    <button
      className={type === 1 ? "modalFooterBtn1" : "modalFooterBtn2"}
      disabled={loading}
      onClick={onClick}
    >
      {loading === true ? (
        <div style={{ marginTop: -14 }}>
          <LoadingBox circle={true} />
        </div>
      ) : (
        title
      )}
    </button>
  );
};

export default Button;
