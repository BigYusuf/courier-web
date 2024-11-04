import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import statusCards from "../assets/JsonData/status-card-data.json";
import Chart from "react-apexcharts";
import "../assets/css/grid.css";
import "../assets/css/index.css";
import { Badge, StatusCard, Table } from "../components";

const chartOptions = {
  series: [
    {
      name: "Verified Customers",
      data: [40, 70, 20, 90, 36, 80, 91, 60],
    },
    {
      name: "Total Customers",
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
  head: ["user", "total orders", "total spending"],
  body: [
    {
      username: "yusuf lateef",
      order: "490",
      price: "$15,870",
    },
    {
      username: "adam lukman",
      order: "250",
      price: "$12,251",
    },
    {
      username: "anthony baker",
      order: "120",
      price: "$10,840",
    },
    {
      username: "sidu padish",
      order: "110",
      price: "$9,251",
    },
    {
      username: "roman emmanuel",
      order: "80",
      price: "$8,840",
    },
  ],
};

const renderCustomerHead = (item, index) => <th key={index}>{item}</th>;

const renderCustomerBody = (item, index) => (
  <tr key={index}>
    <td>{item.username}</td>
    <td>{item.order}</td>
    <td>{item.price}</td>
  </tr>
);

const latestOrders = {
  header: ["order id", "user", "total price", "date", "status"],
  body: [
    {
      id: "#OD1711",
      user: "john freeman",
      date: "17 Jun 2021",
      price: "$900",
      status: "shipping",
    },
    {
      id: "#OD1712",
      user: "frank iva",
      date: "1 Jun 2021",
      price: "$400",
      status: "paid",
    },
    {
      id: "#OD1713",
      user: "Jack Mon",
      date: "27 Jun 2021",
      price: "$200",
      status: "pending",
    },
    {
      id: "#OD1712",
      user: "Emily blake",
      date: "1 Jun 2021",
      price: "$30",
      status: "paid",
    },
    {
      id: "#OD1713",
      user: "anthony baker",
      date: "27 Jun 2021",
      price: "$200",
      status: "refund",
    },
  ],
};

const orderStatus = {
  shipping: "primary",
  pending: "warning",
  paid: "success",
  refund: "danger",
};

const renderOrderHead = (item, index) => <th key={index}>{item}</th>;

const renderOrderBody = (item, index) => (
  <tr key={index}>
    <td>{item.id}</td>
    <td>{item.user}</td>
    <td>{item.price}</td>
    <td>{item.date}</td>
    <td>
      <Badge type={orderStatus[item.status]} content={item.status} />
    </td>
  </tr>
);

const Dashboard = () => {
  const themeReducer = useSelector((state) => state.theme.mode);

  return (
    <div>
      <h2 className="page-header">Dashboard</h2>
      <div className="row1">
        <div className="coll-6">
          <div className="row1">
            {statusCards.map((item, index) => (
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
        <div className="coll-6">
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
            <div className="car__header">
              <h3>Top Customers</h3>
              <div className="card__body">
                <Table
                  headData={topCustomers.head}
                  renderHead={(item, index) => renderCustomerHead(item, index)}
                  bodyData={topCustomers.body}
                  renderBody={(item, index) => renderCustomerBody(item, index)}
                />
              </div>
              <div className="card__footer">
                <Link to="/"> View All</Link>
              </div>
            </div>
          </div>
        </div>
        <div className="coll-8">
          <div className="card">
            <div className="card__header">
              <h3>latest orders</h3>
            </div>
            <div className="card__body">
              <Table
                headData={latestOrders.head}
                renderHead={(item, index) => renderOrderHead(item, index)}
                bodyData={latestOrders.body}
                renderBody={(item, index) => renderOrderBody(item, index)}
              />
            </div>
            <div className="card__footer">
              <Link to="/">View All</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
