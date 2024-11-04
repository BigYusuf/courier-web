import React from "react";
import "./topnav.css";
import { Link, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";

import Dropdown from "../dropdown/Dropdown";
import ThemeMenu from "../ThemeMenu/ThemeMenu";
import user_menu from "../../assets/JsonData/user_menus.json";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../firebase";
import { getAllUsers, logOut } from "../../redux/slice/auth";
import { abrevateName } from "../../utils/others";
import logo from "../../assets/images/logo.png";
import {
  getFeedbacks,
  getFeedbacksByNation,
} from "../../redux/slice/feedbacks";
import { getEvents, getEventsByNation } from "../../redux/slice/events";
import { setActiveSideBar } from "../../redux/slice/sidebar";

const renderUserToggle = (user) => (
  <div className="topnav__right-user">
    <div className="topnav__right-user__image">
      <img
        src={
          user?.image
            ? user?.image
            : abrevateName(user?.firstName + " " + user?.lastName)
        }
        alt=""
      />
    </div>
    <div className="topnav__right-user__name">
      {user?.firstName + " " + user?.lastName}
    </div>
  </div>
);

const Topnav = () => {
  const myProfile = useSelector((state) => state?.auth?.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const activeSideBar = useSelector((state) => state?.sidebar?.activeSideBar);
  const handleSideBar = () => {
    dispatch(setActiveSideBar(!activeSideBar));
  };

  const renderUserMenu = (item, index) => {
    const handleClick = async () => {
      if (item?.action === "logout") {
        dispatch(logOut());
        await signOut(auth);
        dispatch(getAllUsers([]));
        dispatch(getFeedbacks([]));
        dispatch(getFeedbacksByNation([]));
        dispatch(getEvents([]));
        dispatch(getEventsByNation([]));

        navigate("/login");
      }
    };
    return (
      <Link to={`${item.link}`} key={index}>
        <div onClick={handleClick} className="notification-item">
          <i className={item.icon}></i>
          <span>{item.content}</span>
        </div>
      </Link>
    );
  };
  return (
    <div className="topnav">
      <div className="topnav__search">
        <img src={logo} alt="company logo" />
        <input type="text" placeholder="Search here..." />
        <i className="bx bx-search"></i>
      </div>
      <div className="topnav__right">
        <div className="topnav__right-item">
          <Dropdown
            customToggle={() => renderUserToggle(myProfile)}
            contentData={user_menu}
            renderItems={(item, index) => renderUserMenu(item, index)}
          />
        </div>
        {/* <div className="topnav__right-item">
          <Dropdown
            icon="bx bx-bell"
            badge="5"
            contentData={notifications}
            renderItems={(item, index) => renderNotificationItem(item, index)}
            renderFooter={() => <Link to="/">View All</Link>}
          />
        </div> */}
        <div className="topnav__right-item">
          <ThemeMenu />
        </div>
        <div className="topnav__right-item" onClick={handleSideBar}>
          <i className="bx bx-menu"></i>
        </div>
      </div>
    </div>
  );
};

export default Topnav;
