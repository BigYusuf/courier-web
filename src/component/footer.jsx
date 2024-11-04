import React from 'react'

function footer() {
  return (
        <footer className="footer section section--space-top">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-md-6 col-lg-5 col-xl-3">
                                <div className="footer__single footer__single--secondary">
                                    <a href="/">
                                        <img src="images/logo.png" alt="Logo" className="w-44 h-auto" />
                                    </a>
                                    <p>
                                        We work with a passion of taking challenges and creating new
                    ones in advertising sector.
                                    </p>
                                    <div className="footer-cta section__content-cta">
                                        <a href="/about" className="btn btn--primary">About Us</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-lg-5 offset-lg-2 col-xl-3 offset-xl-0">
                                <div className="footer__single">
                                    <h4>Our Services</h4>
                                    <ul>
                                        <li>
                                            <a href="/services">
                                                <i className="icon-double-arrow-right"></i>
                                                Fast Shipping
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/services">
                                                <i className="icon-double-arrow-right"></i>
                                                Export Packaging
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/services">
                                                <i className="icon-double-arrow-right"></i>
                                                Shop For Me
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/services">
                                                <i className="icon-double-arrow-right"></i>
                                                Pickup
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/services">
                                                <i className="icon-double-arrow-right"></i>
                                                Delivery
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-lg-5 col-xl-3">
                                <div className="footer__single">
                                    <h4>Our Projects</h4>
                                    <div className="footer__single-projects">
                                        <a href="/project" className="footer__single-project" aria-label="our recent projects">
                                            <img src="images/pr-one.png" alt="Project"/>
                                        </a>
                                        <a href="/project" className="footer__single-project" aria-label="our recent projects">
                                            <img src="images/pr-two.png" alt="Project"/>
                                        </a>
                                        <a href="/project" className="footer__single-project" aria-label="our recent projects">
                                            <img src="images/pr-three.png" alt="Project"/>
                                        </a>
                                        <a href="/project" className="footer__single-project" aria-label="our recent projects">
                                            <img src="images/pr-four.png" alt="Project"/>
                                        </a>
                                        <a href="/project" className="footer__single-project" aria-label="our recent projects">
                                            <img src="images/pr-five.png" alt="Project"/>
                                        </a>
                                        <a href="/project" className="footer__single-project" aria-label="our recent projects">
                                            <img src="images/pr-six.png" alt="Project"/>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-6 col-lg-5 offset-lg-2 col-xl-3 offset-xl-0">
                                <div className="footer__single">
                                    <h4>Newsletter</h4>
                                    <div className="footer__single-news">
                                        <p>
                                            Subscribe our newsletter to get our latest update &amp; news
                                        </p>
                                        <form action="#">
                                            <div className="form-group">
                                                <input type="email" name="news-email" id="newsEmail" required="" placeholder="Email..."/>
                                                <button type="submit" aria-label="subscribe to our newsletter">
                                                    <i className="fa-solid fa-paper-plane"></i>
                                                </button>
                                            </div>
                                        </form>
                                        <ul className="social">
                                            <li>
                                                <a href="#" aria-label="social media">
                                                    <i className="icon-facebook"></i>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" aria-label="social media">
                                                    <i className="icon-twitter"></i>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" aria-label="social media">
                                                    <i className="icon-pinterest"></i>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#" aria-label="social media">
                                                    <i className="icon-instagram"></i>
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="footer__info">
                                    <div className="row section__row">
                                        <div className="col-12 col-sm-6 col-lg-4 col-xl-4 section__col">
                                            <div className="footer__info-single">
                                                <div className="footer__info-single__thumb">
                                                    <img src="images/location-one.png" alt="Image"/>
                                                </div>
                                                <div className="footer__info-single__content">
                                                    <h5>Office Address</h5>
                                                    <p>30, Osolo Way, Off International Airport Road, Lagos State, Nigeria</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-6 col-lg-4 col-xl-4 section__col">
                                            <div className="footer__info-single">
                                                <div className="footer__info-single__thumb">
                                                    <img src="images/contact-one.png" alt="Image"/>
                                                </div>
                                                <div className="footer__info-single__content">
                                                    <h5>Contact info</h5>
                                                    <a href="mailto:infoexample@gmail.com">
                                                        info@coral.com
                                                    </a>
                                                    <a href="tel:+2349033578863">+234 903 357 8863</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 col-sm-6 col-lg-4 col-xl-4 section__col">
                                            <div className="footer__info-single">
                                                <div className="footer__info-single__thumb">
                                                    <img src="images/hours-one.png" alt="Image"/>
                                                </div>
                                                <div className="footer__info-single__content">
                                                    <h5>Working hours</h5>
                                                    <p>Mon - Sat: 8 am - 5 pm, Sunday: CLOSED</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <div className="copyright">
                                    <div className="row align-items-center">
                                        <div className="col-12 col-sm-3 col-md-2 text-center text-sm-start">
                                            <button className="scroll-to-top" aria-label="scroll to top">
                                                <i className="icon-arrow-up"></i>
                                            </button>
                                        </div>
                                        <div className="col-12 col-sm-9 col-md-10 order-first order-sm-last">
                                            <p className="text-center">
                                                ©
                                                <span id="copyYear"></span>
                                                <a href="#">Coral Courier & Cargo Services</a>
                                                - Transport Services. All rights reserved.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
  )
}

export default footer
