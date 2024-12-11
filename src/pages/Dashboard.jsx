import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Chart from "react-apexcharts";
import { Link } from "react-router-dom";

import StatusCard from "../components/status-card/StatusCard";
import "../assets/css/grid.css";
import "../assets/css/index.css";
import Table from "../components/table/Table";
import Badge from "../components/badge/Badge";
import { convertTimeStamp } from "../utils/others";
import { setProfile } from "../redux/slice/auth/authSlice";
import {
  useGetProfileQuery,
  useGetStaffProfileQuery,
} from "../redux/slice/auth";
import { useGetStaffsQuery, useGetUsersQuery } from "../redux/slice/user";
import { useGetPackagesQuery } from "../redux/slice/packages";
import { setMakeOrder } from "../redux/slice/orders/orderSlice";
import { useGetContactsQuery } from "../redux/slice/contact";
import {
  useGetAdminOrdersQuery,
  useGetOrdersQuery,
} from "../redux/slice/orders";

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
const contactHead = {
  head: ["Name", "Date Created"],
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
const renderContactBody = (item, index) => (
  <tr key={index}>
    <td>
      {item?.name?.length > 18
        ? item?.name.substring(0, 18) + "..."
        : item?.name}
    </td>
    <td>{convertTimeStamp(item?.createdAt)}</td>
  </tr>
);

const latestOrders = {
  head: ["Rec. Name", "Rec. country", "date", "status"],
};
const latestUsers = {
  head: ["user", " country", "date", "status"],
};

const renderNewUserHead = (item, index) => <th key={index}>{item}</th>;

const renderLatestOrderBody = (item, index) => (
  <tr key={index}>
    <td>{item?.destName}</td>
    <td>{item?.destCountry}</td>
    <td>{convertTimeStamp(item?.createdAt)}</td>
    <td>
      <Badge
        type={
          item.status === true || item.status === "active"
            ? "success"
            : "primary"
        }
        content={
          item.status === true || item.status === "active" ? "paid" : "not paid"
        }
      />
    </td>
  </tr>
);
const renderNewUserBody = (item, index) => (
  <tr key={index}>
    <td>{item?.lastName + " " + item?.firstName}</td>
    <td>{item?.country}</td>
    <td>{convertTimeStamp(item?.createdAt)}</td>
    <td>
      <Badge
        type={
          item.status === true || item.status === "active"
            ? "success"
            : "primary"
        }
        content={
          item.status === true || item.isVerified === "active"
            ? "verified"
            : "unverified"
        }
      />
    </td>
  </tr>
);

const Dashboard = () => {
  const dispatch = useDispatch();
  const themeReducer = useSelector((state) => state?.theme?.mode);
  const myProfile = useSelector((state) => state?.auth?.profile);
  // const makeOrder = useSelector((state) => state?.order?.makeOrder);
  const { data: customerData, isSuccess: customerSuccess } = useGetUsersQuery(
    undefined,
    {
      skip: myProfile?.role === "user" ? true : false,
    }
  );
  const { data: staffsData, isSuccess: staffSuccess } = useGetStaffsQuery(
    undefined,
    {
      skip: myProfile?.role === "user" ? true : false,
    }
  );
  const { data: packagesData, isSuccess: packagesSuccess } =
    useGetPackagesQuery();
  // const { data: ordersData, isSuccess: staffSuccess } = useGetStaffsQuery();
  const { data: orderData, isFetching: orderFetch } = useGetOrdersQuery(
    undefined,
    {
      skip: myProfile?.role !== "user" ? true : false,
    }
  );
  const { data: orderAdminData, isFetching: orderAdminFetch } =
    useGetAdminOrdersQuery(undefined, {
      skip: myProfile?.role === "user" ? true : false,
    });
  // console.log("orderAdminData", orderAdminData);
  useEffect(() => {
    if (myProfile?.role === "user") {
      setMakeOrder(true);
    }
  }, []);

  const { data: userData } = useGetProfileQuery(undefined, {
    skip: myProfile?.role !== "user" ? true : false,
  });
  const { data: contactData, isSuccess: contactSuccess } = useGetContactsQuery(
    undefined,
    {
      skip: myProfile?.role !== "user" ? true : false,
    }
  );
  const { data: staffData } = useGetStaffProfileQuery(undefined, {
    skip: myProfile?.role === "user" ? true : false,
  });

  useEffect(() => {
    if (!myProfile) {
      if (userData?.success) {
        dispatch(setProfile(userData?.user));
      }
      if (staffData?.success) {
        dispatch(setProfile(staffData?.staff));
      }
    }
  }, [dispatch, myProfile, staffData?.staff, staffData?.success, userData]);

  const activeContact = contactData?.contacts?.filter(
    (x) => x.status === "active"
  );

  const statsCard = [
    {
      icon: "bx bx-shopping-bag",
      count:
        myProfile?.role === "user"
          ? orderData?.data?.length
          : staffSuccess
          ? staffsData?.staffs?.length
          : 0, //contactSuccess ,
      title: "Total Orders",
    },
    {
      icon: "bx bx-receipt",
      count: packagesSuccess ? packagesData?.packages?.length : 0,
      title: myProfile?.role === "user" ? "Packages" : "Total Packages",
    },
    {
      icon: "bx bx-chart",
      count:
        myProfile?.role === "user"
          ? contactData?.contacts?.length
          : staffSuccess
          ? staffsData?.staffs?.length
          : 0, //contactSuccess
      title: myProfile?.role === "user" ? "Total Contacts" : "Total Staffs",
    },
    {
      icon: "bx bx-user",
      count:
        myProfile?.role === "user"
          ? activeContact?.length
          : customerSuccess
          ? customerData?.data?.length
          : 0, //contactSuccess
      title: myProfile?.role === "user" ? "Active Contacts" : "Total Users",
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
              <h3>
                {myProfile?.role === "user" ? "Latest Contact" : "Latest Order"}
              </h3>
            </div>
            {myProfile?.role === "user" ? (
              <div className="card__body">
                {!contactSuccess ? (
                  <div>No Contact ... </div>
                ) : (
                  <Table
                    headData={contactHead?.head}
                    renderHead={(item, index) =>
                      renderFeedbackHead(item, index)
                    }
                    bodyData={contactData?.contacts?.slice(0, 5)}
                    renderBody={(item, index) => renderContactBody(item, index)}
                  />
                )}
              </div>
            ) : (
              <div className="card__body">
                {[].length <= 0 ? (
                  <div>No Order ... </div>
                ) : (
                  <Table
                    headData={topCustomers.head}
                    renderHead={(item, index) =>
                      renderFeedbackHead(item, index)
                    }
                    bodyData={[]}
                    renderBody={(item, index) =>
                      renderFeedbackBody(item, index)
                    }
                  />
                )}
              </div>
            )}
            <div className="card__footer">
              <Link to={myProfile?.role === "user" ? "/contacts" : "/orders"}>
                View All
              </Link>
            </div>
          </div>
        </div>
        <div className="coll-8">
          <div className="card">
            <div className="card__header">
              <h3>
                {myProfile?.role === "user" ? "Latest Orders" : "New users"}
              </h3>
            </div>
            {myProfile?.role === "user" ? (
              <div className="card__body">
                {orderFetch ? (
                  <>Loading Please wait</>
                ) : orderData?.data?.length <= 0 ? (
                  <>No Orders ... </>
                ) : (
                  <Table
                    headData={latestOrders.head}
                    renderHead={(item, index) => renderNewUserHead(item, index)}
                    bodyData={orderData?.data?.slice(0, 5)}
                    renderBody={(item, index) =>
                      renderLatestOrderBody(item, index)
                    }
                  />
                )}
              </div>
            ) : (
              <div className="card__body">
                {!customerSuccess ? (
                  <>Loading Please wait</>
                ) : customerData?.data?.length <= 0 ? (
                  <>No User ... </>
                ) : (
                  <Table
                    headData={latestUsers.head}
                    renderHead={(item, index) => renderNewUserHead(item, index)}
                    bodyData={customerData?.data?.slice(0, 5)}
                    renderBody={(item, index) => renderNewUserBody(item, index)}
                  />
                )}
              </div>
            )}
            <div className="card__footer">
              <Link to={myProfile?.role === "user" ? "/orders" : "/users"}>
                View All
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
