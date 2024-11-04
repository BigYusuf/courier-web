import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { CSVLink } from "react-csv";

import ProjectDataService from "../utils/firebaseUtils";
import { convertTimeStamp, handleUploadImg } from "../utils/others";
import { getEvents, getEventsByNation } from "../redux/slice/events";
import {LoadingBox,CompleteInput, ModalOptions} from "../components";
import { serverTimestamp } from "firebase/firestore";
import { nationData } from "../data/registerData";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

const eventTableHead = ["", "Title", "nation", "date", "status", "action"];

const Orders = () => {
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [eventForm, setEventForm] = useState({
    nation: "",
    title: "",
    address: "",
    desc: "",
    timeframe: "",
    image: "",
  });
  const [loadingEvent, setLoadingEvent] = useState(false);
  const [file, setFile] = useState("");

  //get user profile & manager profile
  // const myProfile = useSelector((state) => state?.auth?.profile);
  const managerProfile = useSelector((state) => state?.auth?.manager);

  const allEvents = useSelector((state) => state.events.events);

  const fetchEvents = async () => {
    try {
      //  console.log("object");
      if (managerProfile?.role === "manager") {
        const docSnap = await ProjectDataService.getEventsByNation(
          managerProfile?.nation
        );
        //  console.log("object1", managerProfile?.nation);
        dispatch(
          getEventsByNation(
            docSnap.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
          )
        );
        // console.log(
        //   "aaaa",
        //   docSnap.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        // );
      } else {
        const docSnapAll = await ProjectDataService.getAllEvents();
        //console.log("object2");
        dispatch(
          getEvents(
            docSnapAll.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
          )
        );
      }
    } catch (error) {
      toast.error(
        error?.message ? error?.message : "Could not fetch events, Reload"
      );
    }
  };

  const handleInputEventChange = (e) => {
    const { name, value } = e.target;
    setEventForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImg = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    const fileName = `${new Date().getTime() + eventForm?.title}`;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {},
      (error) => {
        // Handle unsuccessful uploads
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setEventForm((prevData) => ({
            ...prevData,
            image: url,
          }));
          setFile("");
        });
      }
    );
  };

  const handleEvent = (id) => {
    //navigate to event
    navigate("/events/" + id);
  };

  const handleAddEvent = async (e) => {
    e.preventDefault();
    try {
      setLoadingEvent(true);
      let payload = {
        title: eventForm?.title,
        desc: eventForm?.desc,
        nation:
          managerProfile?.role === "manager"
            ? managerProfile?.nation
            : eventForm?.nation,
        timeframe: eventForm?.timeframe,
        image: eventForm?.image,
        address: eventForm?.address,
        createdBy: managerProfile?.id,
        creatorClass: managerProfile?.role,
        status: "active",
        createdAt: serverTimestamp(),
        updatedAt: "",
      };

      await ProjectDataService.addEvent(payload);
      fetchEvents();
      setEventForm({
        title: "",
        image: "",
        timeframe: "",
        address: "",
        desc: "",
      });
      setOpenModal(!openModal);
      setLoadingEvent(false);
      toast.success("Event Created Success");
    } catch (error) {
      toast.error(error?.message ? error?.message : "Error occured");
      setLoadingEvent(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

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
        <div className="pointer" onClick={() => handleEvent(item?.id)}>
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
          onClick={() => handleEvent(item?.id)}
        >
          {item.status}
        </div>
      </td>
      <td>
        <button onClick={() => handleEvent(item?.id)} className="card__button">
          View
        </button>
      </td>
    </tr>
  );

  let filteredItems = allEvents?.filter(
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
    <div className="container" onClick={closeModal}>
      <div className="page-top">
        <h2 className="page-header-alt">Events</h2>

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
          title={"Create Event"}
          btnText={"Save"}
          cancel={"Cancel"}
          handleOption={handleAddEvent}
        >
          <div className="flexx">
            <span className="desc">Access to unlimited Possibilities</span>
            <div className="row1">
              <div className="coll-6">
                <CompleteInput
                  name="title"
                  title={"Title"}
                  type="text"
                  onChange={handleInputEventChange}
                  dataLabel={eventForm?.title}
                  value={eventForm?.title}
                  cancel=""
                />
              </div>
              <div className="coll-6">
                <CompleteInput
                  name="address"
                  title={"Address"}
                  type="text"
                  onChange={handleInputEventChange}
                  dataLabel={eventForm?.address}
                  value={eventForm?.address}
                  cancel=""
                />
              </div>
              <div className="coll-6">
                <CompleteInput
                  name="desc"
                  title={"description"}
                  textarea
                  type="text"
                  onChange={handleInputEventChange}
                  dataLabel={eventForm?.desc}
                  value={eventForm?.desc}
                  cancel=""
                />
              </div>
              <div className="coll-6">
                <CompleteInput
                  name="image"
                  title={"Image"}
                  onChange={handleInputEventChange}
                  onChangeFile={handleImg}
                  file={file}
                  singleImage
                  handleUpload={handleUpload}
                  data={nationData}
                  dataLabel={eventForm?.image}
                  value={eventForm?.image}
                  cancel=""
                />
              </div>

              {(managerProfile?.role === "admin" ||
                managerProfile?.role === "superAdmin") && (
                <div className="coll-6">
                  <CompleteInput
                    name="nation"
                    title={"Nation"}
                    onChange={handleInputEventChange}
                    select={true}
                    data={nationData}
                    dataLabel={eventForm?.nation}
                    value={eventForm?.nation}
                    cancel=""
                  />
                </div>
              )}
              <div className="coll-6">
                <CompleteInput
                  name="timeframe"
                  title={"timeframe"}
                  type="text"
                  onChange={handleInputEventChange}
                  dataLabel={eventForm?.timeframe}
                  value={eventForm?.timeframe}
                  cancel=""
                />
              </div>
            </div>
            <span className="small">
              Event created by Manager will only be visible to that region
            </span>
          </div>
        </ModalOptions>
      )}
      <div className="row1">
        <div className="coll-12">
          <div className="card">
            <div className="card__body">
              {loadingEvent ? (
                <div className="flexx">
                  <LoadingBox circle={true} />
                </div>
              ) : allEvents?.length <= 0 ? (
                <div>No events created yet...</div>
              ) : (
                <div>
                  <div className="table-wrapper">
                    <table>
                      {eventTableHead && renderHead ? (
                        <thead>
                          <tr>
                            {eventTableHead.map((item, index) =>
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

export default Orders;
