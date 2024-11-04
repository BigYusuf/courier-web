import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./sidebar.css";
import { useDispatch, useSelector } from "react-redux";

//import logo from '../../assets/images/logo.png'
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
  const managerProfile = useSelector((state) => state?.auth?.manager);
  const activeSideBar = useSelector((state) => state?.sidebar?.activeSideBar);
  const sidebarData = [
    {
      display_name: "Dashboard",
      route: "/",
      icon: "bx bx-category-alt",
    },
    {
      display_name: "Users",
      route: "/users",
      icon: "bx bx-user-pin",
    },
    {
      display_name: "Feedbacks",
      route: "/feedbacks",
      icon: "bx bx-package",
    },
    {
      display_name: "Events",
      route: "/events",
      icon: "bx bx-cart",
    },
    {
      display_name: "evaluation",
      route: "/evaluation",
      icon: "bx bx-chart",
    },
  ];
  let data = managerProfile?.role === "manager" ? sidebarData : sidebar_items;

  const activeItem = data?.findIndex(
    (item) => item?.route === location?.pathname
  );
  
  return (
    <div className={activeSideBar ? "sidebar activeSidebar" : "sidebar"}>
      <div className="sidebar__logo">
        {/*<img src={logo} alt="company logo" />*/}
        <h1 className="sidebar__logo">
          <span className="sidebar__logo-span">
            {managerProfile?.role === "manager" ? "Manager" : "Admin"}
          </span>{" "}
          Suite
        </h1>
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
