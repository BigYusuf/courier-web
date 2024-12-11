import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import ModalOptions from "../components/modalOption";
import { CompleteInput, LoadingBox } from "../components";
import { useGetStaffQuery } from "../redux/slice/user";
import { convertTimeStamp } from "../utils/others";
import { countryData } from "../data/countries";
import { statusData } from "../data/statusData";

const QuestionAns = ({ question, ans }) => {
  return (
    <div>
      <span>{question}</span>
      <span>{ans === "" ? " -" : " " + ans}</span>
    </div>
  );
};
const EditManager = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const staffId = pathname.slice(8);
  const myProfile = useSelector((state) => state.auth.profile);
  const { data: staffInfo } = useGetStaffQuery(staffId);

  const [userLoading, setUserLoading] = useState(false);
  const [editUser, setEditUser] = useState(false);
  const [editManager, setEditManager] = useState(false);
  const [formData, setFormData] = useState(staffInfo?.staff);

  useEffect(() => {
    if (staffInfo?.staff) setFormData(staffInfo?.staff);
  }, []);

  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hideProfile, setHideProfile] = useState(false);
  const [hideUser, setHideUser] = useState(false);
  const [feedbackData, setFeedbackData] = useState(null);
  const [feedbackForm, setFeedbackForm] = useState(null);
  const [feedbackId, setFeedbackId] = useState("");
  const [feedbacks, setFeedbacks] = useState([]);
  const [loadingFeedback, setLoadingFeedback] = useState(false);

  const fetchFeedbacks = async () => {
    setLoadingFeedback(true);
    //const docSnap = await ProjectDataService.getFeedbackByUser(staffId);
    //let Feedbacks = docSnap.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    // setFeedbacks(Feedbacks);
    setLoadingFeedback(false);
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const GetSingleFeedBack = async (id) => {
    //setLoading(true);
    // const docSnap = await ProjectDataService.getFeedback(id);
    // setFeedbackData(docSnap.data());
    // setFeedbackForm(docSnap.data());
    // //setLoading(false);
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
    // let payload = {
    //   response: feedbackForm?.response,
    //   responderId: managerProfile?.id,
    //   status: "answered",
    //   updatedAt: serverTimestamp(),
    // };
    // //update feedback
    // await ProjectDataService.updateFeedback(feedbackId, payload);
    // //add feedback count to manager
    // if (feedbackForm?.status !== "answered") {
    //   await ProjectDataService.updateManager(managerProfile?.id, {
    //     feedbacksAdded: managerProfile?.feedbacksAdded + 1,
    //     lastFeedback: serverTimestamp(),
    //   });
    // }
    // fetchFeedbacks();
    // setOpenModal(!openModal);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleInputfeedBackChange = (e) => {
    const { name, value } = e.target;
    setFeedbackForm((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const closeModal = () => {
    if (openModal) {
      setOpenModal(false);
    }
  };

  const InputDataInfo = [
    {
      id: 1,
      title: "Role",
      placeholder: "Select Role",
      name: "role",
      select: true,
      onChange: handleInputChange,
      dataLabel: formData?.role,
      value: formData?.role,
      data: [
        { id: 1, label: "Admin", value: "admin" },
        { id: 1, label: "Staff", value: "staff" },
      ],
      cancel: staffInfo?.staff?.role,
    },
    {
      id: 2,
      title: "Status",
      placeholder: "Select Status",
      name: "status",
      select: true,
      onChange: handleInputChange,
      dataLabel: formData?.status,
      value: formData?.status,
      data: statusData,
      cancel: staffInfo?.staff?.status,
    },
  ];
  const userDataInfo = [
    {
      id: 1,
      title: "First Name",
      placeholder: "Input the FirstName",
      name: "firstName",
      onChange: handleInputChange,
      dataLabel: formData?.firstName,
      value: formData?.firstName,
      cancel: staffInfo?.staff?.firstName, //item?.license?.broker,
    },
    {
      id: 2,
      title: "Last Name",
      placeholder: "Input the Family Name",
      name: "lastName",
      onChange: handleInputChange,
      dataLabel: formData?.lastName,
      value: formData?.lastName,
      cancel: staffInfo?.staff?.lastName,
    },
    {
      id: 3,
      title: "Phone Number",
      placeholder: "Input the Phone Number",
      name: "phoneNumber",
      onChange: handleInputChange,
      dataLabel: formData?.phoneNumber,
      value: formData?.phoneNumber,
      cancel: staffInfo?.staff?.phoneNumber,
    },
    {
      id: 4,
      title: "Email",
      placeholder: "Input Valid Email",
      name: "email",
      onChange: handleInputChange,
      dataLabel: formData?.email,
      value: formData?.email,
      cancel: staffInfo?.staff?.email,
    },
    {
      id: 5,
      title: "Address",
      placeholder: "Input Valid Address",
      name: "address",
      onChange: handleInputChange,
      dataLabel: formData?.address,
      value: formData?.address,
      cancel: staffInfo?.staff?.address,
    },
    {
      id: 6,
      title: "City",
      placeholder: "Input City",
      name: "city",
      onChange: handleInputChange,
      dataLabel: formData?.city,
      value: formData?.city,
      cancel: staffInfo?.staff?.city,
    },
    {
      id: 7,
      title: "State",
      placeholder: "Input State",
      name: "state",
      onChange: handleInputChange,
      dataLabel: formData?.state,
      value: formData?.state,
      cancel: staffInfo?.staff?.motel,
    },
    {
      id: 8,
      title: "Country",
      placeholder: "Select Country",
      name: "country",
      onChange: handleInputChange,
      dataLabel: formData?.coutry,
      value: formData?.country,
      cancel: staffInfo?.staff?.country,
      select: true,
      data: countryData,
    },
    {
      id: 9,
      title: "Status",
      placeholder: "Select Status",
      name: "status",
      select: true,
      data: statusData,
      onChange: handleInputChange,
      dataLabel: formData?.status,
      value: formData?.status,
      cancel: staffInfo?.staff?.status,
    },
    {
      id: 10,
      title: "PO Box",
      placeholder: "Input PO Box",
      name: "poBox",
      onChange: handleInputChange,
      dataLabel: formData?.poBox,
      value: formData?.poBox,
      cancel: staffInfo?.staff?.poBox,
    },
  ];

  const handleDemote = async (e) => {
    e.preventDefault();
    try {
      // setLoading(true);
      // await ProjectDataService.deleteManager(staffInfoId);
      // //change user profile from staff to user
      // await ProjectDataService.updateUser(staffInfo?.userId, { role: "user" });
      // await fetchManagers(dispatch, managerProfile);
      // await fetchUsers(dispatch, managerProfile);
      // toast.success("Staff demoted to User");
      // setLoading(false);
      // navigate("/");
    } catch (error) {
      toast.error(
        error?.message ? error?.message : "Error occured, contact support"
      );
      setLoading(false);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // if (formData?.nation === "") {
      //   toast.error("Select nation");
      //   return;
      // }
      // if (formData?.role === "") {
      //   toast.error("Select role");
      //   return;
      // }
      // let payload = {
      //   nation: formData?.nation,
      //   role: formData?.role,
      //   updatedAt: serverTimestamp(),
      // };

      // await ProjectDataService.updateManager(staffId, payload);
      // GetStaff(staffId, setLoading, setStaffInfo);

      // fetchUsers(dispatch, managerProfile);
      toast.success("Manager Updated Success");
    } catch (error) {
      toast.error(
        error?.message ? error?.message : "Error occured, contact support"
      );
      setLoading(false);
    }
  };

  return (
    <div className="containerr" onClick={closeModal}>
      {loading ? (
        <div>
          <LoadingBox circle={true} />
        </div>
      ) : (
        <div>
          <div>
            <h2 className="page-header">
              {staffInfo?.staff?.id === myProfile?.id
                ? "My"
                : staffInfo?.staff?.firstName + "'s"}{" "}
              Profile
            </h2>
          </div>
          <div className="row1">
            <div className="coll-6">
              <div
                className="info-header"
                onClick={() => setHideProfile(!hideProfile)}
              >
                <h3>Staff Profile </h3>
                {hideProfile ? (
                  <i className="bx bxs-caret-up-circle icon"></i>
                ) : (
                  <i className="bx bxs-caret-down-circle icon"></i>
                )}
              </div>
              {hideProfile && (
                <>
                  <div className="mbottom">
                    {staffInfo?.staff?.createdAt ? (
                      <>
                        created on the{" "}
                        <span className="blue">
                          {convertTimeStamp(staffInfo?.staff?.createdAt)}{" "}
                        </span>{" "}
                      </>
                    ) : (
                      "No records yet "
                    )}
                    {staffInfo?.staff?.updatedAt ? (
                      <>
                        and was last updated at{" "}
                        <span className="blue">
                          {convertTimeStamp(staffInfo?.staff?.updatedAt)}
                        </span>{" "}
                      </>
                    ) : (
                      "and No records update yet"
                    )}
                  </div>
                  {editManager ? (
                    <div className="row1">
                      {userDataInfo.map((val) => (
                        <div className="coll-6" key={val.id}>
                          <CompleteInput
                            title={val.title}
                            placeholder={val.placeholder}
                            name={val.name}
                            onChange={val.onChange}
                            dataLabel={val.dataLabel}
                            value={val.value}
                            cancel={val.cancel}
                            select={val.select}
                            data={val.data}
                            singleImage={val.singleImage}
                            multipleImages={val.multipleImages}
                            textarea={val.textarea}
                            type={val.type}
                          />
                        </div>
                      ))}

                      <div className="coll-12">
                        <span
                          className="editProfile"
                          onClick={() => setEditManager(!editManager)}
                        >
                          Click Here to Cancel Edit Mode (Staff)
                        </span>
                        <div className="modalFooter">
                          <button
                            className="modalFooterBtn1"
                            disabled={loading}
                            onClick={handleSubmit}
                          >
                            Update
                          </button>
                          <button
                            className="modalFooterBtn2"
                            disabled={loading}
                            onClick={() => setEditManager(!editManager)}
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="mainBackground">
                      <QuestionAns
                        question={"Staff Name: "}
                        ans={
                          staffInfo?.staff?.firstName +
                          " " +
                          staffInfo?.staff?.lastName
                        }
                      />
                      <QuestionAns
                        question={"Staff Role: "}
                        ans={
                          staffInfo?.staff?.role === ""
                            ? "No Country filled yet"
                            : staffInfo?.staff?.role
                        }
                      />
                      <QuestionAns
                        question={"Staff Email: "}
                        ans={
                          staffInfo?.staff?.email === ""
                            ? "No Country filled yet"
                            : staffInfo?.staff?.email
                        }
                      />
                      <QuestionAns
                        question={"Staff Phone: "}
                        ans={
                          staffInfo?.staff?.phoneNumber === ""
                            ? "No Country filled yet"
                            : staffInfo?.staff?.phoneNumber
                        }
                      />
                      <QuestionAns
                        question={"Staff Address: "}
                        ans={
                          staffInfo?.staff?.address === ""
                            ? "No Country filled yet"
                            : staffInfo?.staff?.address
                        }
                      />
                      <QuestionAns
                        question={"Staff City: "}
                        ans={
                          staffInfo?.staff?.city === ""
                            ? "No Country filled yet"
                            : staffInfo?.staff?.city
                        }
                      />
                      <QuestionAns
                        question={"Staff State: "}
                        ans={
                          staffInfo?.staff?.state === ""
                            ? "No Country filled yet"
                            : staffInfo?.staff?.state
                        }
                      />
                      <QuestionAns
                        question={"Staff Country: "}
                        ans={
                          staffInfo?.staff?.country === ""
                            ? "No Country filled yet"
                            : staffInfo?.staff?.country
                        }
                      />
                      <QuestionAns
                        question={"Staff Created At: "}
                        ans={
                          staffInfo?.staff?.createdAt === ""
                            ? "No info"
                            : convertTimeStamp(staffInfo?.staff?.createdAt)
                        }
                      />
                      <span
                        className="editProfile"
                        onClick={() => setEditManager(!editManager)}
                      >
                        Click Here to Edit Staff
                      </span>
                    </div>
                  )}
                </>
              )}

              <div
                className="info-header-alt"
                onClick={() => setHideUser(!hideUser)}
              >
                <h3>Staff Information</h3>
                {hideUser ? (
                  <i className="bx bxs-caret-up-circle icon"></i>
                ) : (
                  <i className="bx bxs-caret-down-circle icon"></i>
                )}
              </div>
              {hideUser &&
                (userLoading ? (
                  <>Loading other records, Please wait</>
                ) : (
                  <>
                    <div className="mbottom">
                      Pre-recorded staff information
                    </div>
                    {editUser ? (
                      <div className="row1">
                        {InputDataInfo.map((val) => (
                          <div className="coll-6" key={val.id}>
                            <CompleteInput
                              title={val.title}
                              placeholder={val.placeholder}
                              name={val.name}
                              onChange={val.onChange}
                              dataLabel={val.dataLabel}
                              value={val.value}
                              cancel={val.cancel}
                              select={val.select}
                              data={val.data}
                              singleImage={val.singleImage}
                              multipleImages={val.multipleImages}
                              textarea={val.textarea}
                              type={val.type}
                            />
                          </div>
                        ))}
                        <div className="coll-12">
                          <span
                            className="editProfile"
                            onClick={() => setEditUser(!editUser)}
                          >
                            Click Here to Cancel Edit Mode
                          </span>
                          <div className="modalFooter">
                            <button
                              className="modalFooterBtn1"
                              disabled={loading}
                              onClick={handleDemote}
                            >
                              {formData?.role === "staff"
                                ? "Demote"
                                : "Promote"}
                            </button>
                            <button
                              className="modalFooterBtn2"
                              disabled={loading}
                              onClick={() => setEditUser(!editUser)}
                            >
                              Close
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="mainBackground">
                        <QuestionAns
                          question={"Total Staff added: "}
                          ans={
                            !staffInfo?.staff?.staffsAdded
                              ? 0
                              : staffInfo?.staff?.staffsAdded
                          }
                        />
                        <QuestionAns
                          question={"Total Packages created: "}
                          ans={
                            !staffInfo?.staff?.packagesAdded
                              ? 0
                              : staffInfo?.staff?.packagesAdded
                          }
                        />
                        <QuestionAns
                          question={"Total Users added: "}
                          ans={
                            !staffInfo?.staff?.usersAdded
                              ? 0
                              : staffInfo?.staff?.usersAdded
                          }
                        />
                        <span
                          className="editProfile"
                          onClick={() => setEditUser(!editUser)}
                        >
                          Click Here to{" "}
                          {staffInfo?.staff?.role === "staff"
                            ? "Promote to Admin"
                            : "Demote to Staff"}{" "}
                        </span>
                      </div>
                    )}
                  </>
                ))}
            </div>
            <div className="coll-6">
              {/* <FeedBackBystaffId
                feedbacks={feedbacks}
                handleFeedback={handleFeedback}
                loadingFeedback={loadingFeedback}
              /> */}
            </div>
            {/*addRevLoaded && <LoadingBox circle/> */}
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
                  {/* created at {convertTimeStamp(feedbackData?.createdAt)}, */}
                  {/* {feedbackData?.updatedAt === ""
                    ? " No response yet"
                    : " responded at " +
                      convertTimeStamp(feedbackData?.updatedAt)} */}
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
                  <div className="coll-6">
                    <CompleteInput name="Name" title={"Further discuss"} />
                  </div>
                </div>
                <span className="small">
                  Please note, only response is saved.
                </span>
              </div>
            </ModalOptions>
          )}
        </div>
      )}
    </div>
  );
};

export default EditManager;
