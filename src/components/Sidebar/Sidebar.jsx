import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./sidebar.css";
import { useDispatch, useSelector } from "react-redux";

import logo from "../../assets/images/logo.png";
import sidebar_items from "../../assets/JsonData/sidebar_routes.json";
import { setActiveSideBar } from "../../redux/slice/sidebar";

const SidebarItem = (props) => {
  const active = props.active ? "active" : "";
  const dispatch = useDispatch();
  const activeSideBar = useSelector((state) => state?.sidebar?.activeSideBar);
  const handleSideBar = () => {
    dispatch(setActiveSideBar(!activeSideBar));
  };
  return (
    <div className="sidebar__item" onClick={handleSideBar}>
      <div className={`sidebar__item-inner ${active}`}>
        <i className={props.icon}></i>
        <span>{props.title}</span>
      </div>
    </div>
  );
};

const Sidebar = () => {
  const location = useLocation();
  const myProfile = useSelector((state) => state?.auth?.profile);
  const activeSideBar = useSelector((state) => state?.sidebar?.activeSideBar);

  const sidebarData = [
    {
      display_name: "Dashboard",
      route: "/dashboard",
      icon: "bx bx-category-alt",
    },
    {
      display_name: "Users",
      route: "/users",
      icon: "bx bx-user-pin",
    },
    {
      display_name: "Packages",
      route: "/mypackages",
      icon: "bx bx-package",
    },
    {
      display_name: "Orders",
      route: "/orders",
      icon: "bx bx-cart",
    },
    {
      display_name: "Message",
      route: "/message",
      icon: "bx bx-chart",
    },
  ];
  const sidebarDataUser = [
    {
      display_name: "Dashboard",
      route: "/dashboard",
      icon: "bx bx-category-alt",
    },
    {
      display_name: "Orders",
      route: "/orders",
      icon: "bx bx-cart",
    },
    {
      display_name: "Contacts",
      route: "/contacts",
      icon: "bx bx-user-pin",
    },
    {
      display_name: "Messages",
      route: "/messages",
      icon: "bx bx-envelope",
    },
  ];
  let data =
    myProfile?.role === "user"
      ? sidebarDataUser
      : myProfile?.role === "staff"
      ? sidebarData
      : sidebar_items;

  const activeItem = data?.findIndex(
    (item) => item?.route === location?.pathname
  );
  const navigate = useNavigate();
  const handleHome = () => {
    navigate("/");
  };
  return (
    <div className={activeSideBar ? "sidebar activeSidebar" : "sidebar"}>
      <div className="sidebar__logo" onClick={handleHome}>
        <img
          src={logo}
          style={{ width: 150, height: 120 }}
          alt="company logo"
        />
        
      </div>
      {data.map((item, index) => (
        <Link to={item.route} key={index}>
          <SidebarItem
            title={item.display_name}
            icon={item.icon}
            active={index === activeItem}
          />
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
