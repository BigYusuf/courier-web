import React from "react";
import ModalOptions from "../components/modalOption";


const Inventory = () => {
  return (
    <div className="containerr pad">
      <ModalOptions title={"Inventory"} goHome={"Go Home"}>
        <div className="flexx">
          <span className="desc">Comming Soon</span>
        </div>
      </ModalOptions>
    </div>
  );
};

export default Inventory;
