import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import ProjectDataService from "../utils/firebaseUtils";
import Table from "../components/table/Table";
import { getFeedbacks, getFeedbacksByNation } from "../redux/slice/feedbacks";
import { convertTimeStamp } from "../utils/others";
import { serverTimestamp } from "firebase/firestore";
import { CompleteInput, LoadingBox } from "../components";
import ModalOptions from "../components/modalOption";

const productTableHead = ["", "title", "user", "date", "status", "action"];

const Feedbacks = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const renderHead = (item, index) => <th key={index}>{item}</th>;
  const [openModal, setOpenModal] = useState(false);
  const [feedbackData, setFeedbackData] = useState(null);
  const [feedbackForm, setFeedbackForm] = useState(null);
  const [feedbackId, setFeedbackId] = useState("");
  const [loadingFeedback, setLoadingFeedback] = useState(false);

  // manager profile
  const managerProfile = useSelector((state) => state?.auth?.manager);

  const Users = useSelector((state) => state.auth.users);
  
  const allFeedbacks = useSelector((state) => state.feedbacks.feedbacks);

  const fetchFeedbacks = async () => {
    setLoadingFeedback(true);
    const docSnap = await ProjectDataService.getAllFeedback();
    let Feedback = docSnap.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    if (managerProfile?.role === "manager") {
 
      dispatch(
        getFeedbacksByNation(
          Feedback.filter((x) => x.nation === managerProfile?.nation)
        )
      );
      setLoadingFeedback(false);
    } else {
      dispatch(getFeedbacks(Feedback));
      setLoadingFeedback(false);
    }
  };

  const handleInputfeedBackChange = (e) => {
    const { name, value } = e.target;
    setFeedbackForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const GetSingleFeedBack = async (id) => {
    const docSnap = await ProjectDataService.getFeedback(id);
    setFeedbackData(docSnap.data());
    setFeedbackForm(docSnap.data());
  };

  const handleFeedback = (id) => {
    setFeedbackId(id);
    //get feedback
    GetSingleFeedBack(id);

    setOpenModal(!openModal);
    //open modal
  };

  const handleResponse = async (e) => {
    e.preventDefault();
    let payload = {
      response: feedbackForm?.response,
      responderId: managerProfile?.id,
      status: "answered",
      updatedAt: serverTimestamp(),
    };

    await ProjectDataService.updateFeedback(feedbackId, payload);
    fetchFeedbacks();
    setOpenModal(!openModal);
  };

  const closeModal = () => {
    if (openModal) {
      setOpenModal(false);
    }
  };

  useEffect(() => {
    if (allFeedbacks?.length > 0) {
      return;
    }
    fetchFeedbacks();
  }, []);
  const GetName = (item) => {
    let userName = Users.filter((x) => x?.id === item);

    return userName[0].firstName + " " + userName[0].lastName;
  };
  const renderBody = (item, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>
        <div className="pointer" onClick={() => handleFeedback(item?.id)}>
          {item.feedbackTitle}
        </div>
      </td>
      <td>
        <div className="pointer" onClick={() => handleFeedback(item?.id)}>
          {GetName(item?.userId)}
        </div>
      </td>
      <td>{convertTimeStamp(item.createdAt)}</td>
      <td>
        <div
          className={
            item.status === "pending"
              ? "status_blue pointer"
              : "status_green pointer"
          }
          onClick={() => handleFeedback(item?.id)}
        >
          {item.status}
        </div>
      </td>
      <td>
        <button
          className="card__button"
          onClick={() => handleFeedback(item?.id)}
        >
          View
        </button>
      </td>
    </tr>
  );
  return (
    <div className="container" onClick={closeModal}>
      <h2 className="page-header">Feedbacks</h2>
      <div className="row1">
        <div className="coll-12">
          <div className="card">
            <div className="card__body">
              {loadingFeedback ? (
                <div className="flexx">
                  <LoadingBox circle={true} />
                </div>
              ) : allFeedbacks.length <= 0 ? (
                <div>No Feedbacks found...</div>
              ) : (
                <Table
                  limit="7"
                  headData={productTableHead}
                  renderHead={(item, index) => renderHead(item, index)}
                  bodyData={allFeedbacks}
                  renderBody={(item, index) => renderBody(item, index)}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {openModal && (
        <ModalOptions
          handleCancel={() => setOpenModal(!openModal)}
          title={"Respond to Feedback"}
          btnText={"Save"}
          cancel={"Cancel"}
          handleOption={handleResponse}
        >
          <div className="flexx">
            <span className="desc">
              created at {convertTimeStamp(feedbackData?.createdAt)},
              {feedbackData?.updatedAt === ""
                ? " No response yet"
                : " responded at " + convertTimeStamp(feedbackData?.updatedAt)}
            </span>
            <div className="row1">
              <div className="coll-6">
                <CompleteInput
                  name="Name"
                  title={"Title"}
                  type="text"
                  onChange={handleInputfeedBackChange}
                  dataLabel={feedbackForm?.feedbackTitle}
                  value={feedbackForm?.feedbackTitle}
                  cancel={feedbackData?.feedbackTitle}
                />
              </div>
              <div className="coll-6">
                <CompleteInput
                  name="feedbackDesc"
                  title={"Description"}
                  type="text"
                  onChange={handleInputfeedBackChange}
                  dataLabel={feedbackForm?.feedbackDesc}
                  value={feedbackForm?.feedbackDesc}
                  cancel={feedbackData?.feedbackDesc}
                  textarea
                />
              </div>
              <div className="coll-6">
                <CompleteInput
                  name="response"
                  title={"Response"}
                  placeholder={"PLease Input a response"}
                  type="text"
                  onChange={handleInputfeedBackChange}
                  dataLabel={feedbackForm?.response}
                  value={feedbackForm?.response}
                  cancel={feedbackData?.response}
                  textarea
                />
              </div>
            </div>
            <span className="small">Please note, only response is saved.</span>
          </div>
        </ModalOptions>
      )}
    </div>
  );
};

export default Feedbacks;
