import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import "./SignUp.css";
import country from "../../data/country.json";
// import { uploadFile } from '../../utils';
// import { useRegisterMutation } from '../../state/api';
// import { setCredentials } from "../../state/slice/authSlice";
import bubbleImage from "../../assets/images/bubble.png";
import { Button, CompleteInput, ModalOptions } from "../../components";

const SignUp = () => {
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    password: "",
    image: "",
    city: "",
    state: "",
  };
  const [openModal, setOpenModal] = useState("");
  const [stageOne, setStageOne] = useState(true);
  const [stageTwo, setStageTwo] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [formData, setFormData] = useState(initialValues);
  const [file, setFile] = useState("");
  const [img, setImg] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const CloseModal = () => {
    if (openModal) {
      setOpenModal(false);
    }
  };
  const handleCancel = () => {
    setFile("");
    setOpenModal(false);
  };
  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  // const [register, {error, isLoading}] = useRegisterMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      formData["image"] = img;
      //  const LoggedIn = await register(formData)
      //  dispatch(setCredentials(LoggedIn))
      navigate("/dashboard");
      //   if(error){
      //       console.log(error)
      //   }
    } catch (err) {
      console.log(err.data.message);
    }
  };

  const handleOption = async () => {
    // let url = await uploadFile(file);
    // setImg(url);
    setStageOne(false);
    setStageTwo(true);
    setOpenModal(false);
  };
  const handleSendOtp = async (e) => {
    e.preventDefault();

    navigate("/register");
  };

  return (
    <div className="signup" onClick={CloseModal}>
      <div className="left">
        <div className="bubbles">
          <img src={bubbleImage} alt="bubble1" className="bubbleimg" />
          <img src={bubbleImage} alt="bubble2" className="bubbleimg" />
          <img src={bubbleImage} alt="bubble3" className="bubbleimg" />
          <img src={bubbleImage} alt="bubble4" className="bubbleimg" />
          <img src={bubbleImage} alt="bubble5" className="bubbleimg" />
        </div>
      </div>
      {stageOne && (
        <div className="right">
          <div className={"closeIcon"} onClick={() => navigate(-1)}>
            <i className="bx bx-x"></i>
          </div>
          <div className="content">
            <h1>Sign up to Coral Courier</h1>
            <button className="googleBtn">Sign up with Google</button>
            <div className="dividerContainer">
              <hr className="divider" />
              <div className="dividerText">or</div>
              <hr className="divider" />
            </div>
            <button onClick={() => setOpenModal(true)} className="emailBtn">
              Continue with Email
            </button>
            <div className="disclaimer">
              By creating an account you agree with our{" "}
              <span>Terms of Service and Privacy Policy</span>.
            </div>
            <div className="other">
              Already have an account? <Link to="/signin">Sign In</Link>
            </div>
            {openModal && (
              <ModalOptions
                file={formData?.email}
                title={"Send Email OTP"}
                handleCancel={handleCancel}
                handleOption={handleOption}
              >
                <div className="sendEmail">
                  <CompleteInput
                    name="email"
                    title={"Email"}
                    type="text"
                    onChange={handleInputChange}
                    dataLabel={formData?.email}
                    value={formData?.email}
                    cancel={""}
                  />
                  <Button onClick={handleOption} title="Send" />
                </div>
                {/*
                <label className="customRadio">
                   <label className={!file ? "inputLabel" : "changeLabel"}>
                    {!file ? "+ Add Image" : "Change"}
                    <br />
                    <input
                      style={{ display: "none" }}
                      type="file"
                      name="images"
                      onChange={handleFile}
                      accept="image/png, image/jpeg, image/webp"
                    />
                  </label> */}
                {/* {file && (
                    <div className="imageContainer">
                      <img
                        className="image"
                        src={URL?.createObjectURL(file)}
                        alt=""
                      />
                    </div>
                  )}
                </label>
                   */}
              </ModalOptions>
            )}
          </div>
        </div>
      )}
      {stageTwo && (
        <div className="right">
          <div className={"closeIcon"} onClick={() => navigate(-1)}>
            <i className="bx bx-arrow-back"></i>
          </div>
          <div className="content">
            <h1>Sign up to Courier</h1>
            <div className="joinTwoInput">
              <div className="inputWrapper half">
                <label className="label">First Name</label>
                <input
                  name="firstName"
                  onChange={handleInputChange}
                  className="input"
                  type="text"
                  value={formData?.firstName}
                  placeholder="First Name"
                />
              </div>
              <div className="inputWrapper half">
                <label className="label">Last Name</label>
                <input
                  name="lastName"
                  onChange={handleInputChange}
                  className="input"
                  value={formData?.lastName}
                  type="text"
                  placeholder="Last Name"
                />
              </div>
            </div>

            <div className="joinTwoInput">
              <div className="inputWrapper half">
                <label className="label">Password</label>
                <input
                  name="password"
                  onChange={handleInputChange}
                  className="input"
                  type="password"
                  value={formData?.password}
                  placeholder="Password"
                />
              </div>
              <div className="inputWrapper half">
                <label className="label">City</label>
                <input
                  name="city"
                  onChange={handleInputChange}
                  className="input"
                  type="text"
                  value={formData?.city}
                  placeholder="First Name"
                />
              </div>
            </div>

            <div className="joinTwoInput">
              <div className="inputWrapper half">
                <label className="label">State</label>
                <input
                  name="State"
                  onChange={handleInputChange}
                  className="input"
                  value={formData?.state}
                  type="text"
                  placeholder="Enter a state"
                />
              </div>

              <div className="inputWrapper half">
                <label className="label">Country</label>
                <select
                  name="country"
                  value={formData?.country}
                  onChange={handleInputChange}
                  className="select"
                  type="text"
                >
                  <option value="">Select Country</option>
                  {country.map((item) => (
                    <option key={item.country} value={item["3-code"]}>
                      {item.country}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="disclaimer">
              <input
                type="checkbox"
                name="checkbox"
                value={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
                id=""
              />
              By creating an account you agree with our{" "}
              <span>Terms of Service and Privacy Policy</span>.
            </div>

            <button
              onClick={handleSubmit}
              className="googleBtn"
              //  disabled={isLoading}
            >
              Create Account
            </button>

            <div className="other">
              Already have an account? <Link to="/signin">Sign In</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUp;
