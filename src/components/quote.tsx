import React, { useState } from "react";

const Quote = () => {
  const [contactName, seContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");

  return (
    <section className="section delivery section--space-top">
      <div className="container">
        <div className="row align-items-center section__row">
          <div className="col-12 col-lg-8 section__col">
            <div className="section__content">
              <h6 className="title-anim mt-12">Get Contact With Us</h6>
              <h2 className="title-anim">
                We Enable to Deliver Quality, Sustained, Cost Effective Services
                to all of our Customers.
              </h2>
              <div className="section__content-cta">
                <a href="contact" className="btn btn--primary">
                  Explore More
                </a>
              </div>
              <img
                src="images/arrow.png"
                alt="Image"
                className="d-none d-lg-block"
              />
            </div>
          </div>
          <div className="col-12 col-lg-4 section__col text-start text-lg-end">
            <div className="video-wrap">
              <a
                href="https://www.youtube.com"
                target="_blank"
                title="video Player"
                className="video-btn"
              >
                <i className="icon-play-two"></i>
              </a>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="delivery__inner">
              <div className="row section section--space-top">
                <div className="col-12 col-lg-4">
                  <div className="delivery__thumb d-none d-lg-block">
                    <img
                      src="images/delivery-man.png"
                      alt="Image"
                      data-speed="auto"
                    />
                  </div>
                </div>
                <div className="col-12 col-lg-8">
                  <div className="delivery__content gFadeBottom">
                    <div className="delivery__content-meta">
                      <h6 className="title-anim">Project Estimating</h6>
                      <h2 className="title-anim">Request a quick quotes</h2>
                    </div>
                    <div className="delivery__content-form">
                      <form action="#" method="post">
                        <div className="single-input">
                          <input
                            type="text"
                            value={contactName}
                            onChange={(e) => seContactName(e.target.value)}
                            name="contact-name"
                            id="contactName"
                            placeholder="Your Name"
                          />
                        </div>
                        <div className="group-input">
                          <div className="single-input">
                            <input
                              type="email"
                              value={contactEmail}
                              onChange={(e) => setContactEmail(e.target.value)}
                              name="contact-email"
                              id="contactEmail"
                              placeholder="Your Email"
                            />
                          </div>
                          <div className="single-input">
                            <input
                              type="number"
                              value={contactPhone}
                              onChange={(e) => setContactPhone(e.target.value)}
                              name="contact-phone"
                              id="contactPhone"
                              placeholder="Phone No"
                            />
                          </div>
                        </div>
                        <div className="range-slider single-input">
                          <div className="range-group">
                            <p>DIST (Miles):</p>
                            <div id="price-range" className="slider"></div>
                          </div>
                          <input type="text" id="priceRange"readOnly=""  />
                        </div>
                        <div className="group-input">
                          <div className="single-input">
                            <label htmlFor="selectFreight">Freight Type</label>
                            <select id="selectFreight">
                              <option value="select">Select</option>
                              <option value="ocean">Ocean Freight</option>
                              <option value="air">Air Freight.</option>
                              <option value="expedited">
                                Expedited Freight
                              </option>
                              <option value="truck">
                                Full Truckload Freight
                              </option>
                              <option value="rail">
                                Intermodal Rail Freight
                              </option>
                            </select>
                          </div>
                          <div className="single-input">
                            <label htmlFor="selectLoad">Load</label>
                            <select id="selectLoad">
                              <option value="select">Select</option>
                              <option value="one">1 to 1000 pounds</option>
                              <option value="two">1001 to 2000 pounds</option>
                              <option value="three">2001 to 5000 pounds</option>
                              <option value="four">5001 to 10000 pounds</option>
                              <option value="five">
                                10001 to 50000 pounds
                              </option>
                            </select>
                          </div>
                        </div>
                        <div className="section__content-cta">
                          <button type="submit" className="btn btn--primary">
                            Submit Request
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Quote;
