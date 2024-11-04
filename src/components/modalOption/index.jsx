import React from "react";

import "./modalOptions.css";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";

import animation12 from "../../assets/animations/animation12.json"; // loading 2 cirlce

const ModalOptions = ({
  title,
  cancel,
  btnText,
  goHome,
  handleCancel,
  children,
  handleOption,
  loading,
}) => {
  const navigate = useNavigate();
  return (
    <div className="modalOptions">
      <div className="modalContainer" onClick={(e) => e.stopPropagation()}>
        <div className="closeBtn" onClick={handleCancel}>
          <i className="bx bx-x"></i>
        </div>

        <h2>{title}</h2>
        <div className="modalBody">{children}</div>
        <div className="modalFooter">
          {btnText && (
            <button className="modalFooterBtn1" onClick={handleOption}>
              {loading ? (
                <Lottie
                  width={35}
                  height={35}
                  className="lottieBtn"
                  animationData={animation12}
                />
              ) : (
                btnText
              )}
            </button>
          )}
          {cancel && (
            <button className="modalFooterBtn2" onClick={handleCancel}>
              {"cancel"}
            </button>
          )}
          {goHome && (
            <button className="modalFooterBtn1" onClick={() => navigate("/")}>
              {"Go Home"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalOptions;
