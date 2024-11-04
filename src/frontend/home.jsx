import React, { useEffect, useState } from "react";
import { Button, LoadingBox, ModalOptions } from "../components";
import Header from "../components/header";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { convertNormalTime } from "../utils/others";

function Home() {
  const [trackerValue, setTrackerValue] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [trackData, setTrackeData] = useState([]);
  const [shipments, setShipments] = useState([]);
  const navigate = useNavigate();

  const handleOption = async () => {
    setError("");
    setOpenModal(true);
    setLoading(true);
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://api-eu.dhl.com/track/shipments?trackingNumber=${trackerValue}`,
      // url: `https://api-test.dhl.com/track/shipments?trackingNumber=${trackerValue}`,
      //url: `https://api.dhl.com/dgff/transportation/shipment-tracking?trackingNumber=${trackerValue}`,
      headers: {
        "content-type": "application/json",
        "DHL-API-Key": "MzijpufWBztmGXbDlKjUB0Z2FbiGKg1g",
      },
    };
    try {
      let cards = axios(config)
        .then((response) => {
          setTrackeData(response?.data);
          setShipments(response?.data?.shipments);
          setLoading(false);
          return response.data;
        })
        .catch((error) => {
          console.log(error);
          setError(error?.message);
          setLoading(false);
        });

      let result = await cards;
      console.log(result);
    } catch (error) {
      setError(error?.message);
      setLoading(false);
    }
    // axios
    //   .request(config)
    //   .then((response) => {
    //  //   console.log(JSON.stringify("response?.data", response?.data));
    //     console.log(JSON.stringify("response?.data", response));
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };
  const handleCancel = () => {
    setOpenModal(!openModal);
  };

  const TrackerItem = ({ title, trackerItem }) => {
    return (
      <div className="flex gap-2 items-start w-full md:w-96 mb-4">
        <div className="md:min-w-7">{title}: </div>
        <span className="capitalize">{trackerItem}</span>
      </div>
    );
  };
  return (
    <div
      onClick={() => {
        if (openModal) setOpenModal(false);
      }}
    >
      <Header />
      <div>
        <section className="bn-one">
          <div className="banner-alt-slider">
            <div className="banner-one">
              <div className="container">
                <div className="row justify-content-center justify-content-xl-start">
                  <div className="col-12 col-md-8 col-lg-7 col-xl-6 offset-xl-6">
                    <div className="banner-one-slider">
                      <div className="banner__content">
                        {/* <form className="w-96 pb-4"> */}
                        <div className="bg-white p-2 rounded-full flex w-full md:w-96 mb-4">
                          <input
                            className="w-[70%] text-base pl-4"
                            value={trackerValue}
                            name="trackerValue"
                            type="text"
                            // onKeyDown={() => setOpenModal(!openModal)}
                            onChange={(e) => setTrackerValue(e.target.value)}
                            placeholder="Input tracking number"
                          />
                          <button
                            onClick={handleOption}
                            className="bg-orange-600 py-1 px-2 text-xs text-white rounded-full"
                          >
                            Check Status
                          </button>
                        </div>
                        {/* </form> */}
                        <h5>Welcome to Coral Courier & Cargo Services</h5>
                        {/* <h2>We Provide Global Logistic</h2> */}
                        <div className="banner__content-text">
                          <p>
                            Coral Courier and Cargo Services Limited is a fast
                            growing reliable logistic company in Nigeria We
                            simplify global supply chain and facilitate shipment
                            of all goods via sea shipping and air cargo
                          </p>
                        </div>
                        <div className="banner__content-cta">
                          <Link to="/new" className="btn btn--primary">
                            Get Started
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="banner-one__car">
                <img src="images/banner-car.png" alt="Image" />
              </div>
            </div>
            {openModal && (
              <ModalOptions
                file={trackerValue}
                // title={"Coral Tracking Service"}
                handleCancel={handleCancel}
                handleOption={handleOption}
              >
                {loading ? (
                  <LoadingBox circle />
                ) : (
                  <div className="sendEmail">
                    <img
                      src="images/logo.png"
                      alt="Logo"
                      className="w-30 h-24"
                    />
                    <div className="bg-gray-700 p-2 rounded-full flex w-full md:w-96 mb-4">
                      <label
                        htmlFor="trackerValue"
                        className="w-[50%] text-base pl-4 text-white bg-transparent"
                      >
                        Tracking Number:
                      </label>
                      <input
                        className="w-[50%] text-base pl-4 text-white bg-transparent"
                        value={trackerValue}
                        name="trackerValue"
                        type="text"
                        onChange={(e) => setTrackerValue(e.target.value)}
                        placeholder="Input tracking number"
                      />
                    </div>
                    {error ? (
                      <span className="error">{error}</span>
                    ) : (
                      <div>
                        <TrackerItem
                          title={"Status"}
                          trackerItem={
                            shipments[0]?.status?.statusCode === "unknown"
                              ? "Processing"
                              : shipments[0]?.status?.statusCode
                          }
                        />
                        <TrackerItem
                          title={"Description"}
                          trackerItem={shipments[0]?.events[0]?.description}
                        />
                        <TrackerItem
                          title={"Location"}
                          trackerItem={
                            shipments[0]?.events[0]?.location?.address
                              ?.addressLocality +
                            ", " +
                            shipments[0]?.events[0]?.location?.address
                              ?.countryCode
                          }
                        />
                        <TrackerItem
                          title={"Delivery Time"}
                          trackerItem={convertNormalTime(
                            shipments[0]?.status?.timestamp
                          )}
                        />
                      </div>
                    )}
                    <div className="modalFooter">
                      <Button type={1} onClick={handleCancel} title="Okay" />
                      <Button
                        onClick={() => navigate("/signin")}
                        title="More Details"
                      />
                    </div>
                  </div>
                )}
              </ModalOptions>
            )}
            {/* <div className="banner-one">
            <div className="container">
              <div className="row justify-content-center justify-content-xl-start">
                <div className="col-12 col-md-8 col-lg-7 col-xl-6 offset-xl-6">
                  <div className="banner-one-slider">
                    <div className="banner__content">
                      <form className="w-96 pb-4">
                        <div className="bg-white p-2 rounded-full">
                          <input
                            className="text-xs w-64 pl-4"
                            placeholder="Input tracking number"
                          ></input>
                          <button className="bg-orange-600 ml-5 py-1 px-2 text-xs text-white rounded-full">
                            Check Status
                          </button>
                        </div>
                      </form>
                      <h5>Welcome to Coral Courier & Cargo Services</h5>
                      <h1>We Provide Global Logistic</h1>
                      <div className="banner__content-text">
                        <p>
                          The world of international supply chains involves a
                          myriad of unknown risks and challenging regulation.
                        </p>
                      </div>
                      <div className="banner__content-cta">
                        <a href="services.html" className="btn btn--primary">
                          View Service
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="banner-one__car">
              <img src="images/banner-car.png" alt="Image" />
            </div>
          </div>
          <div className="banner-one">
            <div className="container">
              <div className="row justify-content-center justify-content-xl-start">
                <div className="col-12 col-md-8 col-lg-7 col-xl-6 offset-xl-6">
                  <div className="banner-one-slider">
                    <div className="banner__content">
                      <form className="w-96 pb-4">
                        <div className="bg-white p-2 rounded-full">
                          <input
                            className="text-xs w-64 pl-4"
                            placeholder="Input tracking number"
                          ></input>
                          <button className="bg-orange-600 ml-5 py-1 px-2 text-xs text-white rounded-full">
                            Check Status
                          </button>
                        </div>
                      </form>
                      <h5>Welcome to Coral Courier & Cargo Services</h5>
                      <h1>We Provide Global Logistic</h1>
                      <div className="banner__content-text">
                        <p>
                          The world of international supply chains involves a
                          myriad of unknown risks and challenging regulation.
                        </p>
                      </div>
                      <div className="banner__content-cta">
                        <a href="services.html" className="btn btn--primary">
                          View Service
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="banner-one__car">
              <img src="images/banner-car.png" alt="Image" />
            </div>
          </div> */}
          </div>
          <div className="banner__content-btn-group">
            <button
              aria-label="previous item"
              className="slide-btn prev-ban-one"
            >
              {/* <i className="icon-left-arrow"></i> */}
              <i class="bx bx-right-arrow-alt"></i>
            </button>
            <button aria-label="next item" className="slide-btn next-ban-one">
              {/* <i className="icon-right-arrow"></i> */}
              <i class="bx bx-left-arrow-alt"></i>
            </button>
          </div>
        </section>

        <section className="section overview ext-over -mb-20">
          <div className="container">
            <div className="row align-items-center section__row">
              <div className="col-12 col-lg-6 col-xl-5 section__col">
                <div className="section__content">
                  <h6 className="title-anim">
                    WELCOME TO Coral Courier & Cargo Services
                  </h6>
                  <h2 className="title-anim">
                    We have a wide range of solutions for your business
                  </h2>
                  <div className="section__content-text text-anim">
                    <p className="secondary-text">
                      You can simplifying your freight &amp; logistics needs
                      with a personal approach on logixs company
                    </p>
                    <p>
                      Logistics seeks to be a premier, profitable provider of
                      global supply chainservices to help enable sustainable
                      trade and commerce in key markets and regions. We will
                      accomplish this by investing in our people in technology.
                      We will continue to build and nurture a culture
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-6 offset-xl-1 section__col">
                <div className="overview__thumb gFadeBottom">
                  <img
                    src="images/overview-thumb-one.png"
                    alt="Image"
                    className="main-thumb"
                  />
                  <div className="two fade_bottom">
                    <img src="images/overview-thumb-two.png" alt="Image" />
                  </div>
                  <img
                    src="images/overview-thumb-three.png"
                    alt="Image"
                    className="three"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* <Slide
          slidesToShow={
            window?.innerWidth > 1400
              ? 5
              : window?.innerWidth < 1400 && window?.innerWidth >= 1200
              ? 4
              : window?.innerWidth < 1200 && window?.innerWidth >= 768
              ? 3
              : 1
          }
          arrowsScroll={1}
        >
          {cards.map((card) => (
            <CatCard key={card.id} card={card} />
          ))}
        </Slide> */}
        <section className="section blog cmn-animation -mt-10">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 col-sm-10 col-md-9 col-lg-8 col-xxl-7">
                <div className="section__header">
                  <h6 className="title-anim">What we do</h6>
                  <h2 className="title-anim">
                    Logistics solutions to help businesses from end to start
                  </h2>
                </div>
              </div>
            </div>
            <div className="row justify-content-center section__row">
              <div className="col-12 col-md-6 col-lg-4 section__col">
                <div className="blog__single cmn-animation-item">
                  <div className="blog__single-thumb">
                    <a href="blog-details.html">
                      <img src="images/blog-thumb-one.png" alt="Image" />
                    </a>
                  </div>
                  <div className="blog__single-content">
                    <div className="blog__single-content__thumb">
                      <span>
                        <i className="icon-aeroplane"></i>
                      </span>
                    </div>
                    <div className="blog__single-content__content">
                      <p>
                        Dorem ipsum dolor sit amet, consectetu mod tempor
                        incididunt business
                      </p>
                      <h4>
                        <a href="blog-details.html">Air Freight Service</a>
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-4 section__col">
                <div className="blog__single cmn-animation-item">
                  <div className="blog__single-thumb">
                    <a href="blog-details.html">
                      <img src="images/blog-thumb-two.png" alt="Image" />
                    </a>
                  </div>
                  <div className="blog__single-content">
                    <div className="blog__single-content__thumb">
                      <span>
                        <i className="icon-ship"></i>
                      </span>
                    </div>
                    <div className="blog__single-content__content">
                      <p>
                        Dorem ipsum dolor sit amet, consectetu mod tempor
                        incididunt business
                      </p>
                      <h4>
                        <a href="blog-details.html">Sea Transportation</a>
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-6 col-lg-4 section__col">
                <div className="blog__single cmn-animation-item">
                  <div className="blog__single-thumb">
                    <a href="blog-details.html">
                      <img src="images/blog-thumb-three.png" alt="Image" />
                    </a>
                  </div>
                  <div className="blog__single-content">
                    <div className="blog__single-content__thumb">
                      <span>
                        <i className="icon-truck"></i>
                      </span>
                    </div>
                    <div className="blog__single-content__content">
                      <p>
                        Dorem ipsum dolor sit amet, consectetu mod tempor
                        incididunt business
                      </p>
                      <h4>
                        <a href="blog-details.html">Road Transportation</a>
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="section delivery section--space-top">
          <div className="container">
            <div className="row align-items-center section__row">
              <div className="col-12 col-lg-8 section__col">
                <div className="section__content">
                  <h6 className="title-anim mt-12">Get Contact With Us</h6>
                  <h2 className="title-anim">
                    We Enable to Deliver Quality, Sustained, Cost Effective
                    Services to all of our Customers.
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
                          <h6 className="title-anim">Project Estimateing</h6>
                          <h2 className="title-anim">Request a quick quotes</h2>
                        </div>
                        <div className="delivery__content-form">
                          <form action="#" method="post">
                            <div className="single-input">
                              <input
                                type="text"
                                name="contact-name"
                                id="contactName"
                                placeholder="Your Name"
                                required=""
                              />
                            </div>
                            <div className="group-input">
                              <div className="single-input">
                                <input
                                  type="email"
                                  name="contact-email"
                                  id="contactEmail"
                                  placeholder="Your Email"
                                  required=""
                                />
                              </div>
                              <div className="single-input">
                                <input
                                  type="number"
                                  name="contact-phone"
                                  id="contactPhone"
                                  placeholder="Phone No"
                                  required=""
                                />
                              </div>
                            </div>
                            <div className="range-slider single-input">
                              <div className="range-group">
                                <p>DIST (Miles):</p>
                                <div id="price-range" className="slider"></div>
                              </div>
                              <input type="text" id="priceRange" readOnly="" />
                            </div>
                            <div className="group-input">
                              <div className="single-input">
                                <label for="selectFreight">Freight Type</label>
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
                                <label for="selectLoad">Load</label>
                                <select id="selectLoad">
                                  <option value="select">Select</option>
                                  <option value="one">1 to 1000 pounds</option>
                                  <option value="two">
                                    1001 to 2000 pounds
                                  </option>
                                  <option value="three">
                                    2001 to 5000 pounds
                                  </option>
                                  <option value="four">
                                    5001 to 10000 pounds
                                  </option>
                                  <option value="five">
                                    10001 to 50000 pounds
                                  </option>
                                </select>
                              </div>
                            </div>
                            <div className="section__content-cta">
                              <button
                                type="submit"
                                className="btn btn--primary"
                              >
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
      </div>
    </div>
  );
}

export default Home;
