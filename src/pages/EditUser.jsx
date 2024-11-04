import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import CompleteInput from "../components/completeInput";
import ProjectDataService from "../utils/firebaseUtils";
import { useDispatch, useSelector } from "react-redux";
import { getSingleUser } from "../redux/slice/auth";
import LoadingBox from "../components/loadingBox";
import { convertTimeStamp } from "../utils/others";
import { serverTimestamp } from "firebase/firestore";
import FeedBackByUserId from "../components/singleUserFeedback";
import ModalOptions from "../components/modalOption";
import { toast } from "react-toastify";
import { fetchUsers } from "../utils/fetch";

const QuestionAns = ({ question, ans }) => {
  return (
    <div>
      <span>{question}</span>
      <span>{ans === "" ? " -" : " " + ans}</span>
    </div>
  );
};
const EditUser = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = pathname.slice(7);

  const managerProfile = useSelector((state) => state?.auth?.manager);
  const myProfile = useSelector((state) => state.auth.profile);
  const [userInfo, setUserInfo] = useState(null);
  const [houseInfo, setHouseInfo] = useState(null);
  const [familyInfo, setFamilyInfo] = useState(null);
  const [supportInfo, setSupportInfo] = useState(null);
  const [formData, setFormData] = useState(userInfo);
  const [houseData, setHouseData] = useState(houseInfo);
  const [FamilyData, setFamilyData] = useState(familyInfo);
  const [supportData, setSupportData] = useState(supportInfo);

  const GetUser = async () => {
    setLoading(true);
    const docSnap = await ProjectDataService.getUser(userId);
    
    dispatch(getSingleUser(docSnap.data()));
    setUserInfo(docSnap.data());
    setLoading(false);
  };
  const GetHouseInfo = async () => {
    //setLoading(true);
    const docSnap = await ProjectDataService.gethouseQuestion(
      userInfo?.houseQuestionId
    );
    setHouseInfo(docSnap.data());
    
    // setLoading(false);
  };

  const GetFamilyInfo = async () => {
    //setLoading(true);
    const docSnap = await ProjectDataService.getfamilyQuestion(
      userInfo?.familyQuestionId
    );
    setFamilyInfo(docSnap.data());
    // setLoading(false);
  };
  const GetSupportInfo = async () => {
    //setLoading(true);
    const docSnap = await ProjectDataService.getsupportQuestion(
      userInfo?.supportQuestionId
    );
    setSupportInfo(docSnap.data());
    
    // setLoading(false);
  };
  useEffect(() => {
    GetUser();
  }, []);

  useEffect(() => {
    setFormData(userInfo);
    GetHouseInfo();
    GetFamilyInfo();
    GetSupportInfo();
  }, [userInfo]);

  useEffect(() => {
    if (houseInfo !== null) {
      setHouseData(houseInfo);
    }
    if (familyInfo !== null) {
      setFamilyData(familyInfo);
    }
    if (supportInfo !== null) {
      setSupportData(supportInfo);
    }
  }, [houseInfo, familyInfo, supportInfo]);

  const [file, setFile] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hideProfile, setHideProfile] = useState(false);
  const [hideHouse, setHideHouse] = useState(false);
  const [hideFamily, setHideFamily] = useState(false);
  const [hideSupport, setHideSupport] = useState(false);
  const [feedbackData, setFeedbackData] = useState(null);
  const [feedbackForm, setFeedbackForm] = useState(null);
  const [feedbackId, setFeedbackId] = useState("");
  const [feedbacks, setFeedbacks] = useState([]);
  const [loadingFeedback, setLoadingFeedback] = useState(false);

  const fetchFeedbacks = async () => {
    setLoadingFeedback(true);
    const docSnap = await ProjectDataService.getFeedbackByUser(userId);
    let Feedbacks = docSnap.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setFeedbacks(Feedbacks);
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

  const handleInputHouseChange = (e) => {
    const { name, value } = e.target;
    setHouseData((prevData) => ({
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
      title: "First Name",
      placeholder: "Input Your FirstName",
      name: "firstName",
      onChange: handleInputChange,
      dataLabel: formData?.firstName,
      value: formData?.firstName,
      cancel: userInfo?.firstName, //item?.license?.broker,
    },
    {
      id: 2,
      title: "Last Name",
      placeholder: "Input Your Family Name",
      name: "lastName",
      onChange: handleInputChange,
      dataLabel: formData?.lastName,
      value: formData?.lastName,
      cancel: userInfo?.lastName, // item?.license?.accountNumber,
    },
    {
      id: 3,
      title: "Cell Phone",
      placeholder: "Input Your Cell Number",
      name: "phone1",
      onChange: handleInputChange,
      dataLabel: formData?.phone1,
      value: formData?.phone1,
      cancel: userInfo?.phone1, // item?.license?.accountNumber,
    },
    {
      id: 4,
      title: "Phone Number",
      placeholder: "Input Your Phone Number",
      name: "phone1",
      onChange: handleInputChange,
      dataLabel: formData?.phone2,
      value: formData?.phone2,
      cancel: userInfo?.phone2, // item?.license?.accountNumber,
    },
    {
      id: 5,
      title: "Address",
      placeholder: "Input Your Address",
      name: "address",
      onChange: handleInputChange,
      dataLabel: formData?.address,
      value: formData?.address,
      cancel: userInfo?.address, // item?.license?.accountNumber,
    },
    {
      id: 6,
      title: "Street",
      placeholder: "Input Your Street",
      name: "street",
      onChange: handleInputChange,
      dataLabel: formData?.street,
      value: formData?.street,
      cancel: userInfo?.street, // item?.license?.accountNumber,
    },
    {
      id: 7,
      title: "Town",
      placeholder: "Input Your Town",
      name: "town",
      onChange: handleInputChange,
      dataLabel: formData?.town,
      value: formData?.town,
      cancel: userInfo?.town, // item?.license?.accountNumber,
    },
    {
      id: 8,
      title: "City",
      placeholder: "Input Your City",
      name: "city",
      onChange: handleInputChange,
      dataLabel: formData?.city,
      value: formData?.city,
      cancel: userInfo?.city, // item?.license?.accountNumber,
    },
    {
      id: 9,
      title: "Country",
      placeholder: "Input Your Country",
      name: "country",
      onChange: handleInputChange,
      dataLabel: formData?.country,
      value: formData?.country,
      cancel: userInfo?.country, // item?.license?.accountNumber,
    },
    {
      id: 10,
      title: "Verified Status",
      placeholder: "Select Verification",
      name: "isVerified",
      select: true,
      onChange: handleInputChange,
      dataLabel: formData?.isVerified,
      value: formData?.isVerified,
      data: statusData,
      cancel: userInfo?.isVerified, // item?.license?.accountNumber,
    },
    {
      id: 11,
      title: "Profile Photo",
      file,
      singleImage: true,
      name: "image",
      onChange: handleInputChange,
      dataLabel: formData?.image,
      value: formData?.image,
      cancel: userInfo?.image,
      onChangeFile: handleImg,
    },
  ];

  const houseDataInfo = [
    {
      id: 1,
      title: "First Name (Rep)",
      placeholder: "Input the FirstName",
      name: "firstName",
      onChange: handleInputHouseChange,
      dataLabel: houseData?.firstName,
      value: houseData?.firstName,
      cancel: houseInfo?.firstName, //item?.license?.broker,
    },
    {
      id: 2,
      title: "Last Name (Rep)",
      placeholder: "Input the Family Name",
      name: "lastName",
      onChange: handleInputHouseChange,
      dataLabel: houseData?.lastName,
      value: houseData?.lastName,
      cancel: houseInfo?.lastName, // item?.license?.accountNumber,
    },
    {
      id: 3,
      title: "Cell Number",
      placeholder: "Input the Cell Number",
      name: "cellPhone",
      onChange: handleInputHouseChange,
      dataLabel: houseData?.cellPhone,
      value: houseData?.cellPhone,
      cancel: houseInfo?.cellPhone, // item?.license?.accountNumber,
    },
    {
      id: 4,
      title: "Home Number",
      placeholder: "Input the Home Number",
      name: "homePhone",
      onChange: handleInputHouseChange,
      dataLabel: houseData?.homePhone,
      value: houseData?.homePhone,
      cancel: houseInfo?.homePhone, // item?.license?.accountNumber,
    },
    {
      id: 5,
      title: "Location",
      placeholder: "Input Your Location",
      name: "address",
      onChange: handleInputHouseChange,
      dataLabel: houseData?.location,
      value: houseData?.location,
      cancel: houseInfo?.location, // item?.license?.accountNumber,
    },
    {
      id: 6,
      title: "Street",
      placeholder: "Input Your Street",
      name: "street",
      onChange: handleInputHouseChange,
      dataLabel: houseData?.street,
      value: houseData?.street,
      cancel: houseInfo?.street, // item?.license?.accountNumber,
    },
    {
      id: 7,
      title: "Motel",
      placeholder: "Input Your motel",
      name: "motel",
      onChange: handleInputHouseChange,
      dataLabel: houseData?.motel,
      value: houseData?.motel,
      cancel: houseInfo?.motel, // item?.license?.accountNumber,
    },
    {
      id: 8,
      title: "Indigenous ID",
      placeholder: "Select Your indigenous ID",
      name: "indigenousID",
      onChange: () => {},
      dataLabel: houseData?.indigenousID,
      value: houseData?.indigenousID,
      cancel: houseInfo?.indigenousID, // item?.license?.accountNumber,
    },
    {
      id: 9,
      title: "Po Box",
      placeholder: "Input the PO Box",
      name: "poBox",
      onChange: handleInputHouseChange,
      dataLabel: houseData?.poBox,
      value: houseData?.poBox,
      cancel: houseInfo?.poBox, // item?.license?.accountNumber,
    },
    {
      id: 10,
      title: "House Number",
      placeholder: "Input the House Number",
      name: "house",
      onChange: handleInputHouseChange,
      dataLabel: houseData?.house,
      value: houseData?.house,
      cancel: houseInfo?.house, // item?.license?.accountNumber,
    },
    {
      id: 11,
      title: "Date of Birth",
      placeholder: "Input Date of birth",
      name: "dob",
      onChange: handleInputHouseChange,
      dataLabel: convertTimeStamp(houseData?.dob),
      value: convertTimeStamp(houseData?.dob),
      cancel: convertTimeStamp(houseInfo?.dob), // item?.license?.accountNumber,
    },
    {
      id: 12,
      title: "Treaty Card",
      placeholder: "Treaty Card",
      name: "treatyCard",
      onChange: handleInputHouseChange,
      dataLabel: houseData?.treatyCard,
      value: houseData?.treatyCard,
      cancel: houseInfo?.treatyCard, // item?.license?.accountNumber,
    },
    {
      id: 13,
      title: "Reserve",
      placeholder: "Reserve",
      name: "reserve",
      onChange: handleInputHouseChange,
      dataLabel: houseData?.reserve,
      value: houseData?.reserve,
      cancel: houseInfo?.reserve, // item?.license?.accountNumber,
    },
    {
      id: 14,
      title: "Preferred Name",
      placeholder: "Input Preferred Name",
      name: "preferName",
      onChange: handleInputHouseChange,
      dataLabel: houseData?.preferName,
      value: houseData?.preferName,
      cancel: houseInfo?.preferName, // item?.license?.accountNumber,
    },
  ];

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      let payload = {
        isVerified: true,
        updatedAt: serverTimestamp(),
      };

      await ProjectDataService.updateUser(userId, payload);
      GetUser();

      fetchUsers(dispatch, managerProfile);
      toast.success("Verified User Success");
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
      let payload = {
        firstName: formData?.firstName,
        lastName: formData?.lastName,
        phone1: formData?.phone1,
        country: formData?.country,
        city: formData?.city,
        isVerified: formData?.isVerified,
        updatedAt: serverTimestamp(),
      };

      await ProjectDataService.updateUser(userId, payload);
      GetUser();

      fetchUsers(dispatch, managerProfile);
      toast.success("Updated User Success");
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
          <div className="page-container">
            <h2 className="page-header">
              {userInfo?.email === myProfile?.email
                ? "My"
                : userInfo?.firstName + "'s"}{" "}
              Profile
            </h2>
            {(userInfo?.isVerified === false ||
              userInfo?.isVerified === "false") && (
              <div className="isVerifiedButton">
                <button
                  className="modalFooterBtn1"
                  disabled={loading}
                  onClick={handleVerify}
                >
                  Verify {userInfo?.firstName}{" "}
                </button>
                <i onClick={handleVerify} className="bx bx-check"></i>
              </div>
            )}
          </div>
          <div className="row1">
            <div className="coll-6">
              <div
                className="info-header"
                onClick={() => setHideProfile(!hideProfile)}
              >
                <h3>Profile Information</h3>
                {hideProfile ? (
                  <i className="bx bxs-caret-up-circle icon"></i>
                ) : (
                  <i className="bx bxs-caret-down-circle icon"></i>
                )}
              </div>
              {hideProfile && (
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
                  </div>
                </>
              )}

              <div
                className="info-header-alt"
                onClick={() => setHideHouse(!hideHouse)}
              >
                <h3>House-Hold Information</h3>
                {hideHouse ? (
                  <i className="bx bxs-caret-up-circle icon"></i>
                ) : (
                  <i className="bx bxs-caret-down-circle icon"></i>
                )}
              </div>
              {hideHouse && (
                <>
                  <div className="mbottom">
                    {houseInfo?.createdAt ? (
                      <>
                        created on the{" "}
                        <span className="blue">
                          {convertTimeStamp(houseInfo?.createdAt)}{" "}
                        </span>{" "}
                      </>
                    ) : (
                      "No records yet "
                    )}
                    {houseInfo?.updatedAt ? (
                      <>
                        and was last updated at{" "}
                        <span className="blue">
                          {convertTimeStamp(houseInfo?.updatedAt)}
                        </span>{" "}
                      </>
                    ) : (
                      "and No records update yet"
                    )}
                  </div>

                  {/*houseInfo?.createdAt && (
                    <div className="row1">
                      {houseDataInfo.map((val) => (
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
                    </div>
                  )*/}
                </>
              )}
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
                  {supportInfo?.createdAt && (
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
                  )}
                </>
              )}
            </div>
            <div className="coll-6">
              <FeedBackByUserId
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
              onClick={() => navigate("/users")}
            >
              Go Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditUser;
