import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Chart from "react-apexcharts";
import { Link } from "react-router-dom";

import StatusCard from "../components/status-card/StatusCard";
import "../assets/css/grid.css";
import "../assets/css/index.css";
import Table from "../components/table/Table";
import Badge from "../components/badge/Badge";
import ProjectDataService from "../utils/firebaseUtils";
import { getEvents, getEventsByNation } from "../redux/slice/events";
import { getAllUsers } from "../redux/slice/auth";
import { convertTimeStamp } from "../utils/others";
import { getFeedbacks, getFeedbacksByNation } from "../redux/slice/feedbacks";

const chartOptions = {
  series: [
    {
      name: "Total Users",
      data: [40, 70, 20, 90, 36, 80, 91, 60],
    },
    {
      name: "Verified Users",
      data: [40, 30, 70, 16, 40, 20, 51, 10],
    },
  ],
  options: {
    color: ["#6ab04c", "#2980b9"],
    chart: {
      background: "transparent",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
      ],
    },
    legend: {
      position: "top",
    },
    grid: {
      show: false,
    },
  },
};

const topCustomers = {
  head: ["title", "Date Created"],
};

const renderFeedbackHead = (item, index) => <th key={index}>{item}</th>;

const renderFeedbackBody = (item, index) => (
  <tr key={index}>
    <td>
      {item?.feedbackTitle?.length > 18
        ? item?.feedbackTitle.substring(0, 18) + "..."
        : item?.feedbackTitle}
    </td>
    <td>{convertTimeStamp(item?.createdAt)}</td>
  </tr>
);

const latestOrders = {
  head: ["user", " nation", "date", "status"],
};

const renderNewUserHead = (item, index) => <th key={index}>{item}</th>;

const renderNewUserBody = (item, index) => (
  <tr key={index}>
    <td>{item?.lastName + " " + item?.firstName}</td>
    <td>{item?.nation}</td>
    <td>{convertTimeStamp(item?.createdAt)}</td>
    <td>
      <Badge
        type={
          item.isVerified === true || item.isVerified === "true"
            ? "success"
            : "primary"
        }
        content={
          item.isVerified === true || item.isVerified === "true"
            ? "verified"
            : "unverified"
        }
      />
    </td>
  </tr>
);

const Dashboard = () => {
  const dispatch = useDispatch();
  const themeReducer = useSelector((state) => state.theme.mode);
  const managerProfile = useSelector((state) => state?.auth?.manager);

  const allEvents = useSelector((state) => state.events.events);
  const allUsers = useSelector((state) => state.auth.users);
  const allFeedbacks = useSelector((state) => state.feedbacks.feedbacks);

  const fetchEvents = async () => {
    const docSnap = await ProjectDataService.getEventsByNation(
      managerProfile?.nation
    );
    const docSnapAll = await ProjectDataService.getAllEvents();
    if (managerProfile?.role === "manager") {
      dispatch(
        getEventsByNation(
          docSnap.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        )
      );
    } else {
      dispatch(
        getEvents(docSnapAll.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      );
    }
  };
  const fetchUsers = async () => {
    const docSnap = await ProjectDataService.getAllUsers();
    let Users = docSnap.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    if (managerProfile?.role === "manager") {
      dispatch(
        getAllUsers(Users.filter((x) => x.nation === managerProfile?.nation))
      );
    } else {
      dispatch(getAllUsers(Users));
    }
  };

  const fetchFeedbacks = async () => {
    const docSnap = await ProjectDataService.getAllFeedback();
    let Feedbacks = docSnap.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    if (managerProfile?.role === "manager") {
      dispatch(
        getFeedbacksByNation(
          Feedbacks.filter((x) => x.region === managerProfile?.nation)
        )
      );
    } else {
      dispatch(getFeedbacks(Feedbacks));
    }
  };
  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    fetchUsers();
  }, []);
  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const activeEvent = allEvents.filter((x) => x.status === "active");
  const verifiedUser = allUsers.filter(
    (x) => x.isVerified === true || x.isVerified === "true"
  );

  const statsCard = [
    {
      icon: "bx bx-shopping-bag",
      count: allEvents?.length,
      title: "Total Events",
    },
    {
      icon: "bx bx-receipt",
      count: activeEvent.length,
      title: "Active events",
    },
    {
      icon: "bx bx-chart",
      count: verifiedUser.length,
      title: "Verified Users",
    },
    {
      icon: "bx bx-user",
      count: allUsers.length,
      title: "Total Users",
    },
  ];
  
  return (
    <div>
      <h2 className="page-header">Dashboard</h2>
      <div className="row1">
        <div className="coll-6">
          <div className="row1">
            {statsCard.map((item, index) => (
              <div className="coll-6" key={index}>
                <StatusCard
                  icon={item.icon}
                  count={item.count}
                  title={item.title}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="coll-6 chart">
          <div className="card full-height">
            <Chart
              options={
                themeReducer === "theme-mode-dark"
                  ? {
                      ...chartOptions.options,
                      theme: { mode: "dark" },
                    }
                  : {
                      ...chartOptions.options,
                      theme: { mode: "light" },
                    }
              }
              series={chartOptions.series}
              type="line"
              height="100%"
            />
          </div>
        </div>
        <div className="coll-4">
          <div className="card">
            <div className="card__header">
              <h3>Latest Order</h3>
            </div>
            <div className="card__body">
              {allFeedbacks.length <= 0 ? (
                <div>No Order ... </div>
              ) : (
                <Table
                  headData={topCustomers.head}
                  renderHead={(item, index) => renderFeedbackHead(item, index)}
                  bodyData={allFeedbacks}
                  renderBody={(item, index) => renderFeedbackBody(item, index)}
                />
              )}
            </div>
            <div className="card__footer">
              <Link to="/feedbacks"> View All</Link>
            </div>
          </div>
        </div>
        <div className="coll-8">
          <div className="card">
            <div className="card__header">
              <h3>New users</h3>
            </div>
            <div className="card__body">
              {allUsers.length <= 0 ? (
                <>No User ... </>
              ) : (
                <Table
                  headData={latestOrders.head}
                  renderHead={(item, index) => renderNewUserHead(item, index)}
                  bodyData={allUsers.slice(0, 5)}
                  renderBody={(item, index) => renderNewUserBody(item, index)}
                />
              )}
            </div>
            <div className="card__footer">
              <Link to="/users">View All</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
