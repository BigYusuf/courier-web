import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ProjectDataService from "../utils/firebaseUtils";
import { getEvents, getEventsByNation } from "../redux/slice/events";
import { serverTimestamp } from "firebase/firestore";
import CompleteInput from "../components/completeInput";
import { useLocation, useNavigate } from "react-router-dom";
import { nationData } from "../data/registerData";
import ModalOptions from "../components/modalOption";
import LoadingBox from "../components/loadingBox";
import { convertTimeStamp, handleUploadImg } from "../utils/others";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

const ManageOrder = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const eventId = pathname.slice(8);

  const [eventData, setEventData] = useState(null);
  const [eventForm, setEventForm] = useState(null);
  //  const [eventId, setEventId] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [loadingEvent, setLoadingEvent] = useState(false);
  const [file, setFile] = useState("");

  //get user profile & manager profile
  //  const myProfile = useSelector((state) => state?.auth?.profile);
  const managerProfile = useSelector((state) => state?.auth?.manager);

  const allEvents = useSelector((state) => state.events.events);

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

  const GetSingleEvent = async () => {
    setLoadingEvent(true);
    const docSnap = await ProjectDataService.getEvent(eventId);
    setEventData(docSnap.data());
    setEventForm(docSnap.data());
    setLoadingEvent(false);
  };
  useEffect(() => {
    GetSingleEvent();
  }, []);

  const handleDeleteEvent = async (e) => {
    e.preventDefault();

    await ProjectDataService.deleteEvent(eventId);
    fetchEvents();
    navigate("/events");
  };
  const handleUpdateEvent = async (e) => {
    e.preventDefault();
    let payload = {
      title: eventForm?.title,
      desc: eventForm?.desc,
      nation: eventForm?.nation,
      timeframe: eventForm?.timeframe,
      address: eventForm?.address,
      status: eventForm?.status,
      createdBy: managerProfile?.id,
      creatorClass: managerProfile?.role,
      updatedAt: serverTimestamp(),
    };

    await ProjectDataService.updateEvent(eventId, payload);
    fetchEvents();
    //  setOpenModal(!openModal);
  };

  useEffect(() => {
    if (allEvents?.length > 0) {
      return;
    }
    fetchEvents();
  }, [allEvents]);

  const closeModal = () => {
    if (openModal) {
      setOpenModal(false);
    }
  };
  return (
    <div className="container" onClick={closeModal}>
      {loadingEvent ? (
        <div>
          <LoadingBox circle={true} />
        </div>
      ) : (
        <div>
          <h2>{"Manage Event"}</h2>
          <div className="flexx">
            <span className="desc">
              Event was created on{" "}
              {" " + convertTimeStamp(eventData?.createdAt)}{" "}
              {eventData?.updatedAt === ""
                ? " has never been modified"
                : " and updated on " + convertTimeStamp(eventData?.updatedAt)}
            </span>
            <div className="row1">
              <div className="coll-6">
                <CompleteInput
                  name="Name"
                  title={"Title"}
                  type="text"
                  onChange={handleInputEventChange}
                  dataLabel={eventForm?.title}
                  value={eventForm?.title}
                  cancel={eventData?.title}
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
                  cancel={eventData?.address}
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
                  cancel={eventData?.desc}
                />
              </div>
              <div className="coll-6">
                <CompleteInput
                  name="image"
                  title={"Image"}
                  onChange={handleInputEventChange}
                  onChangeFile={handleImg}
                  handleUpload={handleUpload}
                  file={file}
                  singleImage
                  data={nationData}
                  dataLabel={eventForm?.image}
                  value={eventForm?.image}
                  cancel={eventData?.image}
                />
              </div>
              {(managerProfile?.role === "admin" ||
                managerProfile?.role === "superAdmin") && (
                <div className="coll-6">
                  <CompleteInput
                    name="Nation"
                    title={"Nation"}
                    onChange={handleInputEventChange}
                    select
                    data={nationData}
                    dataLabel={eventForm?.nation}
                    value={eventForm?.nation}
                    cancel={eventData?.nation}
                  />
                </div>
              )}
              <div className="coll-6">
                <CompleteInput
                  name="timeframe"
                  title={"timeframe"}
                  type="text"
                  placeholder={"e.g. 8:00 AM - 10:00 AM"}
                  onChange={handleInputEventChange}
                  dataLabel={eventForm?.timeframe}
                  value={eventForm?.timeframe}
                  cancel={eventData?.timeframe}
                />
              </div>
            </div>
            <span className="small">
              Event created by Manager will only be visible to that region
            </span>
            <span className="small status_green pad">
              This event is available for {" " + eventData?.nation}
            </span>
          </div>

          <div className="modalFooter">
            <button className="modalFooterBtn1" onClick={handleUpdateEvent}>
              Update
            </button>
            <button
              className="modalFooterBtn2"
              onClick={() => setOpenModal(!openModal)}
            >
              Delete Event
            </button>
            <button
              className="modalFooterBtn1"
              onClick={() => navigate("/events")}
            >
              {"Back"}
            </button>
          </div>
        </div>
      )}
      {openModal && (
        <ModalOptions
          handleCancel={() => setOpenModal(!openModal)}
          title={"Delete this Event"}
          btnText={"Delete"}
          cancel={"Cancel"}
          handleOption={handleDeleteEvent}
        >
          <div className="flexx">
            <span className="desc">Event {eventId}</span>
            <span className="small">Event will be permanently deleted</span>
          </div>
        </ModalOptions>
      )}
    </div>
  );
};

export default ManageOrder;
