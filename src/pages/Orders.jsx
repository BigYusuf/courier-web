import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { convertTimeStamp } from "../utils/others";
import { LoadingBox, CompleteInput, ModalOptions } from "../components";
import { setMakeOrder } from "../redux/slice/orders/orderSlice";
import {
  useGetAdminOrdersQuery,
  useGetOrdersQuery,
} from "../redux/slice/orders";

const orderTableHead = [
  "",
  "Sender",
  "receiver",
  "tracker id",
  "date",
  "status",
  "action",
];

const Orders = () => {
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //get user profile & manager profile
  const myProfile = useSelector((state) => state?.auth?.profile);

  const [search, setSearch] = useState("");
  const initTracker = {
    realTracker: "",
    status: "",
    description: "",
  };
  const [orderForm, setOrderForm] = useState(initTracker);
  const [loadingOrder, setLoadingOrder] = useState(false);

  const handleInputOrderChange = (e) => {
    const { name, value } = e.target;
    setOrderForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleOrder = (id) => {
    //navigate to Order
    navigate("/orders/" + id);
  };
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

  const handleUpdatedOrder = async (e) => {
    e.preventDefault();
    try {
      setLoadingOrder(true);

      setOrderForm(initTracker);
      setOpenModal(!openModal);
      setLoadingOrder(false);
      toast.success("Order Updated Success");
    } catch (error) {
      toast.error(error?.message ? error?.message : "Error occured");
      setLoadingOrder(false);
    }
  };

  const closeModal = () => {
    if (openModal) {
      setOpenModal(false);
    }
  };
  const renderHead = (item, index) => <th key={index}>{item}</th>;

  const renderBody = (item, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>
        <div className="pointer" onClick={() => handleOrder(item?.id)}>
          {item.senderName}
        </div>
      </td>
      <td>{item.destName}</td>
      <td>{item.tracker}</td>
      <td>{convertTimeStamp(item.createdAt)}</td>
      <td>
        <div
          className={
            item.status === "active"
              ? "status_green pointer"
              : "status_blue pointer"
          }
          onClick={() => handleOrder(item?.id)}
        >
          {item.status}
        </div>
      </td>
      <td>
        <button onClick={() => handleOrder(item?.id)} className="card__button">
          View
        </button>
      </td>
    </tr>
  );

  let filteredAdminItems = orderAdminData?.data
    ? orderAdminData?.data?.filter(
        (item) =>
          item?.senderName?.toLowerCase()?.includes(search?.toLowerCase()) ||
          item?.senderEmail?.toLowerCase()?.includes(search?.toLowerCase()) ||
          item?.destName?.toLowerCase()?.includes(search?.toLowerCase()) ||
          item?.destEmail?.toLowerCase()?.includes(search?.toLowerCase()) ||
          item?.status?.toLowerCase()?.includes(search?.toLowerCase())
      )
    : [];

  let filteredItems = orderData?.data
    ? orderData?.data?.filter(
        (item) =>
          item?.senderName?.toLowerCase()?.includes(search?.toLowerCase()) ||
          item?.senderEmail?.toLowerCase()?.includes(search?.toLowerCase()) ||
          item?.destName?.toLowerCase()?.includes(search?.toLowerCase()) ||
          item?.destEmail?.toLowerCase()?.includes(search?.toLowerCase()) ||
          item?.status?.toLowerCase()?.includes(search?.toLowerCase())
      )
    : [];
  const limit = "10";
  const initDataShow =
    limit && filteredItems
      ? filteredItems.slice(0, Number(limit))
      : filteredItems;
  const initDataShowAdmin =
    limit && filteredAdminItems
      ? filteredAdminItems.slice(0, Number(limit))
      : filteredAdminItems;

  const [dataShow, setDataShow] = useState(
    myProfile?.role === "user" ? initDataShow : initDataShowAdmin
  );

  let pages = 1;

  let range = [];

  if (limit !== undefined) {
    let page =
      myProfile?.role === "user"
        ? Math.floor(filteredItems.length / Number(limit))
        : Math.floor(filteredAdminItems.length / Number(limit));

    pages =
      myProfile?.role === "user"
        ? filteredItems?.length % Number(limit) === 0
          ? page
          : page + 1
        : filteredAdminItems?.length % Number(limit) === 0
        ? page
        : page + 1;
    range = [...Array(pages).keys()];
  }

  const [currPage, setCurrPage] = useState(0);

  const selectPage = (page) => {
    const start = Number(limit) * page;
    const end = start + Number(limit);
    if (myProfile?.role === "user") {
      setDataShow(filteredItems?.slice(start, end));
    } else {
      setDataShow(filteredAdminItems?.slice(start, end));
    }
    setCurrPage(page);
  };

  return (
    <div className="containerr" onClick={closeModal}>
      <div className="page-top">
        <h2 className="page-header-alt">Orders</h2>

        <div className="page-options">
          <div className="page-search">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search here..."
            />
            <i className="bx bx-search"></i>
          </div>
          {/* for only customer */}
          {myProfile?.role === "user" && (
            <div
              className="page-filter"
              onClick={() => {
                if (myProfile?.role === "user") {
                  dispatch(setMakeOrder(true));
                }
              }}
            >
              <i className="bx bx-plus"></i>
            </div>
          )}
        </div>
      </div>
      <div className="table-search">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search here..."
        />
        <i className="bx bx-search"></i>
      </div>
      {openModal && (
        <ModalOptions
          handleCancel={() => setOpenModal(!openModal)}
          title={"Update Status"}
          btnText={"Save"}
          cancel={"Cancel"}
          handleOption={handleUpdatedOrder}
          loading={loadingOrder}
        >
          <div className="flexx">
            <span className="desc">Update Order Status</span>
            <div className="row1">
              <div className="coll-6">
                <CompleteInput
                  name="realTracker"
                  title={"Tracking ID"}
                  type="text"
                  onChange={handleInputOrderChange}
                  dataLabel={orderForm?.realTracker}
                  value={orderForm?.realTracker}
                  cancel=""
                />
              </div>
              <div className="coll-6">
                <CompleteInput
                  name="status"
                  title={"Status"}
                  type="text"
                  onChange={handleInputOrderChange}
                  dataLabel={orderForm?.status}
                  value={orderForm?.status}
                  cancel=""
                />
              </div>
              <div className="coll-6">
                <CompleteInput
                  name="description"
                  title={"description"}
                  textarea
                  type="text"
                  onChange={handleInputOrderChange}
                  dataLabel={orderForm?.description}
                  value={orderForm?.description}
                  cancel=""
                />
              </div>
            </div>
            <span className="small">Only Staff can access this popup</span>
          </div>
        </ModalOptions>
      )}
      <div className="row1">
        <div className="coll-12">
          <div className="card">
            {myProfile?.role === "user" ? (
              <div className="card__body">
                {orderFetch ? (
                  <div className="flexx">
                    <LoadingBox circle={true} />
                  </div>
                ) : filteredItems?.length <= 0 ? (
                  <div>No Orders created yet...</div>
                ) : (
                  <div>
                    <div className="table-wrapper">
                      <table>
                        {orderTableHead && renderHead ? (
                          <thead>
                            <tr>
                              {orderTableHead.map((item, index) =>
                                renderHead(item, index)
                              )}
                            </tr>
                          </thead>
                        ) : null}
                        {filteredItems && renderBody ? (
                          <tbody>
                            {filteredItems?.map((item, index) =>
                              renderBody(item, index)
                            )}
                          </tbody>
                        ) : null}
                      </table>
                    </div>
                    {pages > 1 ? (
                      <div className="table__pagination">
                        {range.map((item, index) => (
                          <div
                            key={index}
                            className={`table__pagination-item ${
                              currPage === index ? "active" : ""
                            }`}
                            onClick={() => selectPage(index)}
                          >
                            {item + 1}
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                )}
              </div>
            ) : (
              <div className="card__body">
                {orderAdminFetch ? (
                  <div className="flexx">
                    <LoadingBox circle={true} />
                  </div>
                ) : filteredAdminItems?.length <= 0 ? (
                  <div>No Orders created yet...</div>
                ) : (
                  <div>
                    <div className="table-wrapper">
                      <table>
                        {orderTableHead && renderHead ? (
                          <thead>
                            <tr>
                              {orderTableHead.map((item, index) =>
                                renderHead(item, index)
                              )}
                            </tr>
                          </thead>
                        ) : null}
                        {filteredAdminItems && renderBody ? (
                          <tbody>
                            {filteredAdminItems?.map((item, index) =>
                              renderBody(item, index)
                            )}
                          </tbody>
                        ) : null}
                      </table>
                    </div>
                    {pages > 1 ? (
                      <div className="table__pagination">
                        {range.map((item, index) => (
                          <div
                            key={index}
                            className={`table__pagination-item ${
                              currPage === index ? "active" : ""
                            }`}
                            onClick={() => selectPage(index)}
                          >
                            {item + 1}
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
