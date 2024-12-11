import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { CSVLink } from "react-csv";

// import ProjectDataService from "../utils/firebaseUtils";
import { convertTimeStamp } from "../utils/others";
import { LoadingBox, CompleteInput, ModalOptions } from "../components";


const orderTableHead = ["", "Title", "nation", "date", "status", "action"];

const Messages = () => {
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [orderForm, setOrderForm] = useState({
    nation: "",
    title: "",
    address: "",
    desc: "",
    timeframe: "",
    image: "",
  });
  const [loadingOrder, setLoadingOrder] = useState(false);
  const [file, setFile] = useState("");

  //get user profile & manager profile
  // const myProfile = useSelector((state) => state?.auth?.profile);
  const managerProfile = useSelector((state) => state?.auth?.manager);

  // const allOrders = useSelector((state) => state.orders.orders);
  const allOrders = [];

  const handleInputOrderChange = (e) => {
    const { name, value } = e.target;
    setOrderForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImg = (e) => {
    setFile(e.target.files[0]);
  };

  // const handleUpload = async () => {
  //   const fileName = `${new Date().getTime() + orderForm?.title}`;
  //   const storage = getStorage(app);
  //   const storageRef = ref(storage, fileName);
  //   const uploadTask = uploadBytesResumable(storageRef, file);
  //   uploadTask.on(
  //     "state_changed",
  //     (snapshot) => {},
  //     (error) => {
  //       // Handle unsuccessful uploads
  //       console.log(error);
  //     },
  //     () => {
  //       getDownloadURL(uploadTask.snapshot.ref).then((url) => {
  //         setOrderForm((prevData) => ({
  //           ...prevData,
  //           image: url,
  //         }));
  //         setFile("");
  //       });
  //     }
  //   );
  // };

  const handleOrder = (id) => {
    //navigate to Order
    navigate("/messages/" + id);
  };

  const handleAddOrder = async (e) => {
    e.preventDefault();
    try {
      // setLoadingOrder(true);
      // let payload = {
      //   title: orderForm?.title,
      //   desc: orderForm?.desc,
      //   nation:
      //     managerProfile?.role === "manager"
      //       ? managerProfile?.nation
      //       : orderForm?.nation,
      //   timeframe: orderForm?.timeframe,
      //   image: orderForm?.image,
      //   address: orderForm?.address,
      //   createdBy: managerProfile?.id,
      //   creatorClass: managerProfile?.role,
      //   status: "active",
      //   createdAt: serverTimestamp(),
      //   updatedAt: "",
      // };
      // await ProjectDataService.addEvent(payload);
      // fetchEvents();
      // setOrderForm({
      //   title: "",
      //   image: "",
      //   timeframe: "",
      //   address: "",
      //   desc: "",
      // });
      // setOpenModal(!openModal);
      // setLoadingOrder(false);
      // toast.success("Order Created Success");
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
          {item.title}
        </div>
      </td>
      <td>{item.nation}</td>
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

  let filteredItems = allOrders?.filter(
    (item) =>
      item?.title?.toLowerCase()?.includes(search?.toLowerCase()) ||
      item?.nation?.toLowerCase()?.includes(search?.toLowerCase()) ||
      item?.status?.toLowerCase()?.includes(search?.toLowerCase())
  );
  const limit = "10";
  const initDataShow =
    limit && filteredItems
      ? filteredItems.slice(0, Number(limit))
      : filteredItems;

  const [dataShow, setDataShow] = useState(initDataShow);

  let pages = 1;

  let range = [];

  if (limit !== undefined) {
    let page = Math.floor(filteredItems.length / Number(limit));
    pages = filteredItems.length % Number(limit) === 0 ? page : page + 1;
    range = [...Array(pages).keys()];
  }

  const [currPage, setCurrPage] = useState(0);

  const selectPage = (page) => {
    const start = Number(limit) * page;
    const end = start + Number(limit);

    setDataShow(filteredItems.slice(start, end));

    setCurrPage(page);
  };

  return (
    <div className="containerr" onClick={closeModal}>
      <div className="page-top">
        <h2 className="page-header-alt">Messages</h2>

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

          <div className="page-filter">
            <CSVLink data={filteredItems}>
              <i className="bx bx-filter"></i>
            </CSVLink>
          </div>
          <div className="page-filter" onClick={() => setOpenModal(true)}>
            <i className="bx bx-plus"></i>
          </div>
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
          title={"Create Order"}
          btnText={"Save"}
          cancel={"Cancel"}
          handleOption={handleAddOrder}
        >
          <div className="flexx">
            <span className="desc">Access to unlimited Possibilities</span>
            <div className="row1">
              <div className="coll-6">
                <CompleteInput
                  name="title"
                  title={"Title"}
                  type="text"
                  onChange={handleInputOrderChange}
                  dataLabel={orderForm?.title}
                  value={orderForm?.title}
                  cancel=""
                />
              </div>
              <div className="coll-6">
                <CompleteInput
                  name="address"
                  title={"Address"}
                  type="text"
                  onChange={handleInputOrderChange}
                  dataLabel={orderForm?.address}
                  value={orderForm?.address}
                  cancel=""
                />
              </div>
              <div className="coll-6">
                <CompleteInput
                  name="desc"
                  title={"description"}
                  textarea
                  type="text"
                  onChange={handleInputOrderChange}
                  dataLabel={orderForm?.desc}
                  value={orderForm?.desc}
                  cancel=""
                />
              </div>
              {/* <div className="coll-6">
                <CompleteInput
                  name="image"
                  title={"Image"}
                  onChange={handleInputOrderChange}
                  onChangeFile={handleImg}
                  file={file}
                  singleImage
                  handleUpload={handleUpload}
                  data={nationData}
                  dataLabel={orderForm?.image}
                  value={orderForm?.image}
                  cancel=""
                />
              </div> */}

              <div className="coll-6">
                <CompleteInput
                  name="timeframe"
                  title={"timeframe"}
                  type="text"
                  onChange={handleInputOrderChange}
                  dataLabel={orderForm?.timeframe}
                  value={orderForm?.timeframe}
                  cancel=""
                />
              </div>
            </div>
            <span className="small">
              Order created by Manager will only be visible to that region
            </span>
          </div>
        </ModalOptions>
      )}
      <div className="row1">
        <div className="coll-12">
          <div className="card">
            <div className="card__body">
              {loadingOrder ? (
                <div className="flexx">
                  <LoadingBox circle={true} />
                </div>
              ) : allOrders?.length <= 0 ? (
                <div>Chat feature coming soon...</div>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;
