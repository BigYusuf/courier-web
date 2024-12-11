import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import CompleteInput from "../components/completeInput";
import LoadingBox from "../components/loadingBox";
import { convertTimeStamp } from "../utils/others";
import ModalOptions from "../components/modalOption";
import { Button, QuestionAns } from "../components";
import { useGetUserQuery } from "../redux/slice/user";

const EditUser = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = pathname.slice(7);

  const { data: userInfo } = useGetUserQuery(userId);
  const myProfile = useSelector((state) => state.auth.profile);

  const [formData, setFormData] = useState(userInfo?.user);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hideProfile, setHideProfile] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const closeModal = () => {
    if (openModal) {
      setOpenModal(false);
    }
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
      cancel: userInfo?.user?.firstName,
    },
    {
      id: 2,
      title: "Last Name",
      placeholder: "Input Your Family Name",
      name: "lastName",
      onChange: handleInputChange,
      dataLabel: formData?.lastName,
      value: formData?.lastName,
      cancel: userInfo?.user?.lastName,
    },
    {
      id: 3,
      title: "Cell Phone",
      placeholder: "Input Your Cell Number",
      name: "phone1",
      onChange: handleInputChange,
      dataLabel: formData?.phone1,
      value: formData?.phone1,
      cancel: userInfo?.user?.phone1, // item?.license?.accountNumber,
    },
    {
      id: 5,
      title: "Address",
      placeholder: "Input Your Address",
      name: "address",
      onChange: handleInputChange,
      dataLabel: formData?.address,
      value: formData?.address,
      cancel: userInfo?.user?.address, // item?.license?.accountNumber,
    },
    {
      id: 6,
      title: "Street",
      placeholder: "Input Your Street",
      name: "street",
      onChange: handleInputChange,
      dataLabel: formData?.street,
      value: formData?.street,
      cancel: userInfo?.user?.street, // item?.license?.accountNumber,
    },
    {
      id: 7,
      title: "Town",
      placeholder: "Input Your Town",
      name: "town",
      onChange: handleInputChange,
      dataLabel: formData?.town,
      value: formData?.town,
      cancel: userInfo?.user?.town, // item?.license?.accountNumber,
    },
    {
      id: 8,
      title: "City",
      placeholder: "Input Your City",
      name: "city",
      onChange: handleInputChange,
      dataLabel: formData?.city,
      value: formData?.city,
      cancel: userInfo?.user?.city, // item?.license?.accountNumber,
    },
    {
      id: 9,
      title: "Country",
      placeholder: "Input Your Country",
      name: "country",
      onChange: handleInputChange,
      dataLabel: formData?.country,
      value: formData?.country,
      cancel: userInfo?.user?.country, // item?.license?.accountNumber,
    },
    {
      id: 10,
      title: "Status",
      placeholder: "Select Verification",
      name: "status",
      select: true,
      onChange: handleInputChange,
      dataLabel: formData?.status,
      value: formData?.status,
      data: statusData,
      cancel: userInfo?.status, // item?.license?.accountNumber,
    },
  ];

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      // let payload = {
      //   isVerified: true,
      //   updatedAt: serverTimestamp(),
      // };

      // await ProjectDataService.updateUser(userId, payload);
      // GetUser();

      // fetchUsers(dispatch, managerProfile);
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
      // let payload = {
      //   firstName: formData?.firstName,
      //   lastName: formData?.lastName,
      //   phone1: formData?.phone1,
      //   country: formData?.country,
      //   city: formData?.city,
      //   isVerified: formData?.isVerified,
      //   updatedAt: serverTimestamp(),
      // };
      // await ProjectDataService.updateUser(userId, payload);
      // GetUser();
      // fetchUsers(dispatch, managerProfile);
      // toast.success("Updated User Success");
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
          <div className="page-container">
            <h2 className="page-header">
              {userInfo?.email === myProfile?.email
                ? "My"
                : userInfo?.user?.firstName + "'s"}{" "}
              Profile
            </h2>
            {(userInfo?.status === false ||
              userInfo?.isVerified === "active") && (
              <div className="isVerifiedButton">
                <button
                  className="modalFooterBtn1"
                  disabled={loading}
                  onClick={handleVerify}
                >
                  Verify {userInfo?.user?.firstName}{" "}
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
                    {userInfo?.user?.createdAt ? (
                      <>
                        created on the{" "}
                        <span className="blue">
                          {convertTimeStamp(userInfo?.user?.createdAt)}{" "}
                        </span>{" "}
                      </>
                    ) : (
                      "No records yet "
                    )}
                    {userInfo?.user?.updatedAt ? (
                      <>
                        and was last updated at{" "}
                        <span className="blue">
                          {convertTimeStamp(userInfo?.user?.updatedAt)}
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
            </div>
            <div className="coll-6">
              {/* <FeedBackByUserId
                feedbacks={feedbacks}
                handleFeedback={handleFeedback}
                loadingFeedback={loadingFeedback}
              /> */}
            </div>
            {/*addRevLoaded && <LoadingBox circle/> */}
          </div>

          <div className="modalFooter">
            <Button
              type={1}
              onClick={handleSubmit}
              title={"Update"}
              loading={loading}
            />

            <button
              className="modalFooterBtn2"
              disabled={loading}
              onClick={() => navigate("/users")}
            >
              Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditUser;
