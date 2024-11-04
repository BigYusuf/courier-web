import React from "react";
import Lottie from "lottie-react";

import animation11 from "../../assets/animations/animation11.json"; // loading 1
import animation12 from "../../assets/animations/animation12.json"; // loading 2 cirlce

const LoadingBox = ({ circle }) => {
  return (
    <div className="loading">
      {circle ? (
        <Lottie animationData={animation12} />
      ) : (
        <Lottie animationData={animation11} />
      )}
    </div>
  );
};

export default LoadingBox;
