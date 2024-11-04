import React from "react";
import { Link } from "react-router-dom";

function Header() {
  const LinkedItem = ({ to, title }) => {
    return (
      <Link className="nav__menu-item" to={to}>
        <div className="nav__menu-link hide-nav">{title}</div>
      </Link>
    );
  };
  
  return (
    <header className="header header--primary head-one">
      <div className="topbar topbar--primary d-none d-lg-block">
        <div className="container">
          <div className="topbar__inner min-full">
            <div className="container unset-container">
              <div className="row align-items-center">
                <div className="col-lg-9">
                  <ul className="topbar__items">
                    <li>
                      <a href="mailto:info@coralcourier.com">
                        <i className="icon-email"></i>
                        info@coralcourier.com
                      </a>
                    </li>
                    <li>
                      <i className="icon-clock"></i>
                      Hour: 09:00am - 5:00pm
                    </li>
                    <li>
                      <a href="tel:+2349033578863">
                        <i className="icon-phone"></i>
                        Please Make a call : (+234) 903 357 8863
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="col-lg-3">
                  <ul className="social justify-content-end pr-12">
                    <li>
                      <a href="/" aria-label="social media">
                        <i className="bx bxl-facebook"></i>
                      </a>
                    </li>
                    <li>
                      <a href="/" aria-label="social media">
                        <i className="bx bxl-twitter"></i>
                      </a>
                    </li>
                    <li>
                      <a href="/" aria-label="social media">
                        <i className="bx bxl-pinterest"></i>
                      </a>
                    </li>
                    <li>
                      <a href="/" aria-label="social media">
                        <i className="bx bxl-instagram"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <nav className="nav">
              <div className="nav__content">
                <div className="nav__logo nav-logo-fl d-none">
                  <a href="/">
                    <img
                      src="images/logo.png"
                      alt="Logo"
                      className="w-24 h-auto"
                    />
                  </a>
                </div>
                <div className="nav__menu">
                  <button
                    aria-label="close navbar"
                    className="nav__menu-close d-block d-xl-none"
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                  <div className="nav__menu-logo d-flex d-xl-none">
                    <a href="/" className="text-center hide-nav">
                      <img
                        src="images/logo-dark.png"
                        alt="Logo"
                        className="w-44 h-auto"
                      />
                    </a>
                  </div>
                  <div className="nav__menu-items">
                    <LinkedItem to="/" title={"Home"} />
                    <LinkedItem to="/about" title={"About Us"} />
                    <LinkedItem to="/services" title={"Services"} />
                    <LinkedItem to="/contact" title={"Contact"} />
                   
                    <li className="nav__menu-item d-block d-md-none">
                      <a href="/" className="btn btn--primary">
                        Get A Quote
                      </a>
                    </li>
                  </div>
                  <ul className="social-side justify-content-center d-xl-none">
                    <li>
                      <a href="/" aria-label="social media">
                        <i className="icon-facebook"></i>
                      </a>
                    </li>
                    <li>
                      <a href="/" aria-label="social media">
                        <i className="icon-twitter"></i>
                      </a>
                    </li>
                    <li>
                      <a href="/" aria-label="social media">
                        <i className="icon-pinterest"></i>
                      </a>
                    </li>
                    <li>
                      <a href="/" aria-label="social media">
                        <i className="icon-instagram"></i>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="nav__uncollapsed">
                  <div className="nav__uncollapsed-item d-none d-md-flex">
                    <a href="contact" className="btn btn--primary">
                      Get A Quote
                    </a>
                  </div>
                  <button
                    className="nav__bar d-block d-xl-none"
                    aria-label="toggle navbar"
                  >
                    <span className="icon-bar top-bar"></span>
                    <span className="icon-bar middle-bar"></span>
                    <span className="icon-bar bottom-bar"></span>
                  </button>
                </div>
              </div>
              <a href="/" className="side-logo d-none">
                <img src="images/logo.png" alt="Image" />
              </a>
            </nav>
          </div>
        </div>
      </div>
      <div className="backdrop"></div>
      <div className="search-popup">
        <button className="close-search style-two">
          <span className="fa-solid fa-xmark"></span>
        </button>
        <button className="close-search">
          <span className="fa-solid fa-xmark"></span>
        </button>
        <form method="post" action="/">
          <div className="form-group">
            <input
              type="search"
              name="search-field"
              value=""
              placeholder="Search Here"
              required=""
            />
            <button type="submit">
              <i className="icon-search"></i>
            </button>
          </div>
        </form>
      </div>
    </header>
  );
}

export default Header;
