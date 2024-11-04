import React from "react";
import Slider from "infinite-react-carousel";

import "./Slide.css";

const Slide = ({ children, slidesToShow, arrows, dots, autoplay, arrowsScroll, small }) => {
  if(small)return (
    <div className="slide small">
      <div className="smallContainer">
        <Slider slidesToShow={slidesToShow}dots={dots} arrows={arrows} autoplay={autoplay} arrowsScroll={arrowsScroll}>
          {children}
        </Slider>
      </div>
    </div>
  );
  return (
    <div className="slide">
      <div className="slideContainer">
        <Slider slidesToShow={slidesToShow}autoplay={autoplay} arrowsScroll={arrowsScroll}>
          {children}
        </Slider>
      </div>
    </div>
  );
};

export default Slide;
