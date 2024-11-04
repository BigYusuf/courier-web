import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";

import ModalOptions from "../components/modalOption";
import ProjectDataService from "../utils/firebaseUtils";
import { getSingleUser } from "../redux/slice/auth";
import { convertTimeStamp } from "../utils/others";
import FeedBackBystaffId from "../components/singleUserFeedback";
import { fetchManagers, fetchUsers } from "../utils/fetch";
import { nationData } from "../data/registerData";
import { CompleteInput, LoadingBox } from "../components";

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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const staffId = pathname.slice(10);

  const managerProfile = useSelector((state) => state?.auth?.manager);
  const myProfile = useSelector((state) => state.auth.user);

  const [staffInfo, setStaffInfo] = useState(null);
  const [staffInfoId, setStaffInfoId] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [userLoading, setUserLoading] = useState(false);
  const [editUser, setEditUser] = useState(false);
  const [editManager, setEditManager] = useState(false);
  const [formData, setFormData] = useState(staffInfo);
  const [userData, setUserData] = useState(userInfo);

  const GetStaff = async () => {
    try {
      setLoading(true);
      const docSnap = await ProjectDataService.getManager(staffId);
      setStaffInfo(docSnap.data());
      setStaffInfoId(docSnap?.id);
      setLoading(false);
    } catch (error) {
      toast.error(
        error?.message ? error?.message : "Error occured while getting staff"
      );
      setLoading(false);
    }
  };
  useEffect(() => {
    GetStaff();
  }, []);

  const GetUser = async () => {
    if (!staffInfo?.userId) {
      return;
    }
    try {
      const docSnap = await ProjectDataService.getUser(staffInfo?.userId);
      setUserInfo(docSnap.data());
    } catch (error) {
      console.log("err", error);
      toast.error(
        error?.message ? error?.message : "Error occured while getting user"
      );
    }
  };
  useEffect(() => {
    setFormData(staffInfo);
    // setUserLoading(true);
    GetUser();
    //setUserLoading(false);
  }, [staffInfo]);

  useEffect(() => {
    if (userInfo !== null) {
      setUserData(userInfo);
    }
  }, [userInfo]);

  const [file, setFile] = useState("");
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
    const docSnap = await ProjectDataService.getFeedback(id);
    setFeedbackData(docSnap.data());
    setFeedbackForm(docSnap.data());
    //setLoading(false);
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
    //update feedback
    await ProjectDataService.updateFeedback(feedbackId, payload);
    //add feedback count to manager
    if (feedbackForm?.status !== "answered") {
      await ProjectDataService.updateManager(managerProfile?.id, {
        feedbacksAdded: managerProfile?.feedbacksAdded + 1,
        lastFeedback: serverTimestamp(),
      });
    }
    fetchFeedbacks();
    setOpenModal(!openModal);
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
  const handleImg = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    let url = ""; //await uploadFile(file);

    setFormData((prevData) => ({
      ...prevData,
      image: url,
    }));
    setFile("");
  };

  const statusData = [
    { id: 1, title: "Verified", link: true },
    { id: 2, title: "unVerified", link: false },
  ];

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
        { id: 1, label: "Manager", value: "manager" },
      ],
      cancel: staffInfo?.role,
    },
    {
      id: 2,
      title: "Nation",
      placeholder: "Select Nation",
      name: "nation",
      select: true,
      onChange: handleInputChange,
      dataLabel: formData?.nation,
      value: formData?.nation,
      data: nationData,
      cancel: staffInfo?.nation,
    },
  ];
  const userDataInfo = [
    {
      id: 1,
      title: "First Name",
      placeholder: "Input the FirstName",
      name: "firstName",
      onChange: () => {},
      dataLabel: userData?.firstName,
      value: userData?.firstName,
      cancel: userInfo?.firstName, //item?.license?.broker,
    },
    {
      id: 2,
      title: "Last Name",
      placeholder: "Input the Family Name",
      name: "lastName",
      onChange: () => {},
      dataLabel: userData?.lastName,
      value: userData?.lastName,
      cancel: userInfo?.lastName, // item?.license?.accountNumber,
    },
    {
      id: 3,
      title: "Cell Number",
      placeholder: "Input the Cell Number",
      name: "cellPhone",
      onChange: () => {},
      dataLabel: userData?.cellPhone,
      value: userData?.cellPhone,
      cancel: userInfo?.cellPhone, // item?.license?.accountNumber,
    },
    {
      id: 4,
      title: "Home Number",
      placeholder: "Input the Home Number",
      name: "homePhone",
      onChange: () => {},
      dataLabel: userData?.homePhone,
      value: userData?.homePhone,
      cancel: userInfo?.homePhone, // item?.license?.accountNumber,
    },
    {
      id: 5,
      title: "Location",
      placeholder: "Input Your Location",
      name: "address",
      onChange: () => {},
      dataLabel: userData?.location,
      value: userData?.location,
      cancel: userInfo?.location, // item?.license?.accountNumber,
    },
    {
      id: 6,
      title: "Street",
      placeholder: "Input Your Street",
      name: "street",
      onChange: () => {},
      dataLabel: userData?.street,
      value: userData?.street,
      cancel: userInfo?.street, // item?.license?.accountNumber,
    },
    {
      id: 7,
      title: "Motel",
      placeholder: "Input Your motel",
      name: "town",
      onChange: () => {},
      dataLabel: userData?.motel,
      value: userData?.motel,
      cancel: userInfo?.motel, // item?.license?.accountNumber,
    },
    {
      id: 8,
      title: "Indigenous ID",
      placeholder: "Select Your indigenous ID",
      name: "indigenousID",
      onChange: () => {},
      dataLabel: userData?.indigenousID,
      value: userData?.indigenousID,
      cancel: userInfo?.indigenousID, // item?.license?.accountNumber,
    },
    {
      id: 9,
      title: "Po Box",
      placeholder: "Input the PO Box",
      name: "poBox",
      onChange: () => {},
      dataLabel: userData?.poBox,
      value: userData?.poBox,
      cancel: userInfo?.poBox, // item?.license?.accountNumber,
    },
    {
      id: 10,
      title: "House Number",
      placeholder: "Input the House Number",
      name: "house",
      onChange: () => {},
      dataLabel: userData?.house,
      value: userData?.house,
      cancel: userInfo?.house, // item?.license?.accountNumber,
    },
    {
      id: 11,
      title: "Date of Birth",
      placeholder: "Input Date of birth",
      name: "dob",
      onChange: () => {},
      dataLabel: userData?.dob,
      value: userData?.dob,
      cancel: userInfo?.dob, // item?.license?.accountNumber,
    },
    {
      id: 12,
      title: "Treaty Card",
      placeholder: "Treaty Card",
      name: "treatyCard",
      onChange: () => {},
      dataLabel: userData?.treatyCard,
      value: userData?.treatyCard,
      cancel: userInfo?.treatyCard, // item?.license?.accountNumber,
    },
    {
      id: 13,
      title: "Reserve",
      placeholder: "Reserve",
      name: "reserve",
      onChange: () => {},
      dataLabel: userData?.reserve,
      value: userData?.reserve,
      cancel: userInfo?.reserve, // item?.license?.accountNumber,
    },
    {
      id: 14,
      title: "Preferred Name",
      placeholder: "Input Preferred Name",
      name: "preferName",
      onChange: () => {},
      dataLabel: userData?.preferName,
      value: userData?.preferName,
      cancel: userInfo?.preferName, // item?.license?.accountNumber,
    },
  ];

  const handleDemote = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await ProjectDataService.deleteManager(staffInfoId);

      //change user profile from staff to user
      await ProjectDataService.updateUser(staffInfo?.userId, { role: "user" });
      await fetchManagers(dispatch, managerProfile);
      await fetchUsers(dispatch, managerProfile);

      toast.success("Staff demoted to User");
      setLoading(false);
      navigate("/");
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
      if (formData?.nation === "") {
        toast.error("Select nation");
        return;
      }
      if (formData?.role === "") {
        toast.error("Select role");
        return;
      }
      let payload = {
        nation: formData?.nation,
        role: formData?.role,
        updatedAt: serverTimestamp(),
      };

      await ProjectDataService.updateManager(staffId, payload);
      GetStaff(staffId, setLoading, setStaffInfo);

      fetchUsers(dispatch, managerProfile);
      toast.success("Manager Updated Success");
    } catch (error) {
      toast.error(
        error?.message ? error?.message : "Error occured, contact support"
      );
      setLoading(false);
    }
  };

  return (
    <div className="container" onClick={closeModal}>
      {loading ? (
        <div>
          <LoadingBox circle={true} />
        </div>
      ) : (
        <div>
          <div>
            <h2 className="page-header">
              {staffInfo?.userId === myProfile?.uid
                ? "My"
                : staffInfo?.name + "'s"}{" "}
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
                    {staffInfo?.createdAt ? (
                      <>
                        created on the{" "}
                        <span className="blue">
                          {convertTimeStamp(staffInfo?.createdAt)}{" "}
                        </span>{" "}
                      </>
                    ) : (
                      "No records yet "
                    )}
                    {staffInfo?.updatedAt ? (
                      <>
                        and was last updated at{" "}
                        <span className="blue">
                          {convertTimeStamp(staffInfo?.updatedAt)}
                        </span>{" "}
                      </>
                    ) : (
                      "and No records update yet"
                    )}
                  </div>
                  {editManager ? (
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

                      <div className="">
                        <span
                          className="editProfile"
                          onClick={() => setEditManager(!editManager)}
                        >
                          Click Here to Cancel Edit Mode (Manager)
                        </span>
                        <div className="modalFooter">
                          <button
                            className="modalFooterBtn1"
                            disabled={loading}
                            onClick={handleSubmit}
                          >
                            Update Profile
                          </button>
                          <button
                            className="modalFooterBtn2"
                            disabled={loading}
                            onClick={handleDemote}
                          >
                            Demote to User
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="mainBackground">
                      <QuestionAns
                        question={"Staff Name: "}
                        ans={staffInfo?.name}
                      />
                      <QuestionAns
                        question={"Staff Role: "}
                        ans={staffInfo?.role}
                      />
                      <QuestionAns
                        question={"Staff Nation: "}
                        ans={staffInfo?.nation}
                      />
                      <QuestionAns
                        question={"Total Feedbacks responded: "}
                        ans={staffInfo?.feedbacksAdded}
                      />
                      <QuestionAns
                        question={"Total Events created: "}
                        ans={staffInfo?.eventsAdded}
                      />
                      <QuestionAns
                        question={"Total Users added: "}
                        ans={staffInfo?.usersAdded}
                      />
                      <QuestionAns
                        question={"Total Users added: "}
                        ans={staffInfo?.usersAdded}
                      />
                      {managerProfile?.role === "superAdmin" ||
                        (managerProfile?.role === "admin" && (
                          <QuestionAns
                            question={"Total Managers added: "}
                            ans={staffInfo?.managersAdded}
                          />
                        ))}
                      <QuestionAns
                        question={"Last feedback response: "}
                        ans={
                          staffInfo?.lastFeedback === ""
                            ? "No feedback responded yet"
                            : convertTimeStamp(staffInfo?.lastFeedback)
                        }
                      />
                      <QuestionAns
                        question={"Last event created: "}
                        ans={
                          staffInfo?.lastEvent == ""
                            ? "No event created"
                            : convertTimeStamp(staffInfo?.lastEvent)
                        }
                      />
                      <QuestionAns
                        question={"Staff Created At: "}
                        ans={
                          staffInfo?.createdAt === ""
                            ? "No info"
                            : convertTimeStamp(staffInfo?.createdAt)
                        }
                      />

                      <span
                        className="editProfile"
                        onClick={() => setEditManager(!editManager)}
                      >
                        Click Here to Edit Manager
                      </span>
                    </div>
                  )}
                </>
              )}

              <div
                className="info-header-alt"
                onClick={() => setHideUser(!hideUser)}
              >
                <h3>User Information</h3>
                {hideUser ? (
                  <i className="bx bxs-caret-up-circle icon"></i>
                ) : (
                  <i className="bx bxs-caret-down-circle icon"></i>
                )}
              </div>
              {hideUser &&
                (userLoading ? (
                  <>Loading, Please wait</>
                ) : (
                  <>
                    <div className="mbottom">
                      {userInfo?.createdAt ? (
                        <>
                          created on the{" "}
                          <span className="blue">
                            {convertTimeStamp(userInfo?.createdAt)}{" "}
                          </span>{" "}
                        </>
                      ) : (
                        "No records yet "
                      )}
                      {userInfo?.updatedAt ? (
                        <>
                          and was last updated at{" "}
                          <span className="blue">
                            {convertTimeStamp(userInfo?.updatedAt)}
                          </span>{" "}
                        </>
                      ) : (
                        "and No records update yet"
                      )}
                    </div>
                    {editUser ? (
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

                        <span
                          className="editProfile"
                          onClick={() => setEditUser(!editUser)}
                        >
                          Click Here to Cancel Edit Mode
                        </span>
                      </div>
                    ) : (
                      <div className="mainBackground">
                        <QuestionAns
                          question={"User Name: "}
                          ans={userInfo?.firstName + " " + userInfo?.lastName}
                        />
                        <QuestionAns
                          question={"User Role: "}
                          ans={userInfo?.role}
                        />
                        <QuestionAns
                          question={"User Nation: "}
                          ans={userInfo?.nation}
                        />

                        <QuestionAns
                          question={"Cell Phone: "}
                          ans={
                            userInfo?.phone1 === ""
                              ? "No Cell filled yet"
                              : userInfo?.phone1
                          }
                        />
                        <QuestionAns
                          question={"Street: "}
                          ans={
                            userInfo?.street === ""
                              ? "No Street filled yet"
                              : userInfo?.street
                          }
                        />
                        <QuestionAns
                          question={"Town: "}
                          ans={
                            userInfo?.town === ""
                              ? "No Town filled yet"
                              : userInfo?.town
                          }
                        />
                        <QuestionAns
                          question={"City: "}
                          ans={
                            userInfo?.city === ""
                              ? "No City filled yet"
                              : userInfo?.city
                          }
                        />
                        <QuestionAns
                          question={"Country: "}
                          ans={
                            userInfo?.country === ""
                              ? "No Country filled yet"
                              : userInfo?.country
                          }
                        />
                        <QuestionAns
                          question={"Tribal Council: "}
                          ans={
                            userInfo?.tribalCouncil === ""
                              ? "Not filled yet"
                              : userInfo?.tribalCouncil
                          }
                        />
                        <QuestionAns
                          question={"Indegenous ID: "}
                          ans={
                            userInfo?.indigenousId === ""
                              ? "Not filled yet"
                              : userInfo?.indigenousId
                          }
                        />
                        <QuestionAns
                          question={"Verified User Account: "}
                          ans={
                            userInfo?.isVerified === "false" ||
                            userInfo?.isVerified === false
                              ? "Not verified"
                              : "Verified"
                          }
                        />
                        <QuestionAns
                          question={"User Created At: "}
                          ans={
                            userInfo?.createdAt === ""
                              ? "No info"
                              : convertTimeStamp(userInfo?.createdAt)
                          }
                        />
                        <span
                          className="editProfile"
                          onClick={() => setEditUser(!editUser)}
                        >
                          Click Here to Edit User
                        </span>
                      </div>
                    )}
                  </>
                ))}
              {/*
              <div
                className="info-header-alt"
                onClick={() => setHideFamily(!hideFamily)}
              >
                <h3>Family Information</h3>
                {hideFamily ? (
                  <i className="bx bxs-caret-up-circle icon"></i>
                ) : (
                  <i className="bx bxs-caret-down-circle icon"></i>
                )}
              </div>
              {hideFamily && (
                <>
                  <div className="mbottom">
                    {familyInfo?.createdAt ? (
                      <>
                        created on the{" "}
                        <span className="blue">
                          {convertTimeStamp(familyInfo?.createdAt)}{" "}
                        </span>{" "}
                      </>
                    ) : (
                      "No records yet "
                    )}
                    {familyInfo?.updatedAt ? (
                      <>
                        and was last updated at{" "}
                        <span className="blue">
                          {convertTimeStamp(familyInfo?.updatedAt)}
                        </span>{" "}
                      </>
                    ) : (
                      "and No records update yet"
                    )}
                  </div>
                  <div className="mainBackground">
                    <QuestionAns
                      question={"Revamping this section"}
                      ans={"Please wait"}
                    />
                  </div>
                </>
              )}

              <div
                className="info-header-alt"
                onClick={() => setHideSupport(!hideSupport)}
              >
                <h3>Support Information</h3>
                {hideSupport ? (
                  <i className="bx bxs-caret-up-circle icon"></i>
                ) : (
                  <i className="bx bxs-caret-down-circle icon"></i>
                )}
              </div>
              {hideSupport && (
                <>
                  <div className="mbottom">
                    {supportInfo?.createdAt ? (
                      <>
                        created on the{" "}
                        <span className="blue">
                          {convertTimeStamp(supportInfo?.createdAt)}{" "}
                        </span>{" "}
                      </>
                    ) : (
                      "No records yet "
                    )}
                    {supportInfo?.updatedAt ? (
                      <>
                        and was last updated at{" "}
                        <span className="blue">
                          {convertTimeStamp(supportInfo?.updatedAt)}
                        </span>{" "}
                      </>
                    ) : (
                      "and No records update yet"
                    )}
                  </div>

                  <div className="mainBackground">
                    <QuestionAns
                      question={
                        "Is your home privately insured for content coverage?"
                      }
                      ans={supportData?.insured}
                    />
                    <QuestionAns
                      question={"Damage Classification?"}
                      ans={supportData?.damage}
                    />
                    <QuestionAns
                      question={"Event Type?"}
                      ans={supportData?.eventType}
                    />
                    <QuestionAns
                      question={
                        "Are any of the following support required? Alternative Accomodations?"
                      }
                      ans={supportData?.altAccomodation}
                    />
                    <QuestionAns
                      question={
                        "Are any of the following support required? Assistance with meals?"
                      }
                      ans={supportData?.asstMeals}
                    />
                    <QuestionAns
                      question={
                        "Are any of the following support required? Assistance with clothing and toiletries?"
                      }
                      ans={supportData?.asstCloths}
                    />
                    <QuestionAns
                      question={
                        "Did you drive your own vehicle out of the evacuation, travel by bus, or catch a ride with friends/ family (other)?"
                      }
                      ans={supportData?.driveVehicle}
                    />
                    <QuestionAns
                      question={
                        "Do you have your prescription medication? ( if no, please provide the name of your regular pharmacy)"
                      }
                      ans={supportData?.pressMedication}
                    />
                    <QuestionAns
                      question={
                        "Do you require personal mobility equipment/devices?"
                      }
                      ans={supportData?.mobileEquipment}
                    />
                    <QuestionAns
                      question={
                        "Do you use a visual aid( glasses) or hearing aid?"
                      }
                      ans={supportData?.visualHearingAids}
                    />
                    <QuestionAns
                      question={"Do you have those aids with you?"}
                      ans={supportData?.aidPresent}
                    />
                    <QuestionAns
                      question={
                        "Does any one in your household need additional support to cope emotionally with disaster impacts?( i.e. support groups/ counselling)"
                      }
                      ans={supportData?.additionalSupport}
                    />
                    <QuestionAns
                      question={
                        "What service(s) may help the household/individual?"
                      }
                      ans={supportData?.service}
                    />
                    <QuestionAns
                      question={
                        "Can other members of your household who inquire about you be given your contact information?"
                      }
                      ans={supportData?.contactConsent}
                    />
                    <QuestionAns
                      question={"How would like to receive the support?"}
                      ans={supportData?.supportType}
                    />
                    <QuestionAns
                      question={
                        "What is your " + supportData?.supportType + " id"
                      }
                      ans={supportData?.supportId}
                    />
                  </div>
                </>
              )}*/}
            </div>
            <div className="coll-6">
              <FeedBackBystaffId
                feedbacks={feedbacks}
                handleFeedback={handleFeedback}
                loadingFeedback={loadingFeedback}
              />
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
                  created at {convertTimeStamp(feedbackData?.createdAt)},
                  {feedbackData?.updatedAt === ""
                    ? " No response yet"
                    : " responded at " +
                      convertTimeStamp(feedbackData?.updatedAt)}
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
