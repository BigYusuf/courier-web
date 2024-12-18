import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import "./SignUp.css";
import country from "../../data/country.json";

import bubbleImage from "../../assets/images/bubble.png";
import { Button, ModalOptions } from "../../components";
import {
  useRegisterMutation,
  useSendOtpMutation,
  useVerifyEmailMutation,
} from "../../redux/slice/auth";
import { toast } from "react-toastify";

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
    token: "",
  };
  const [openModal, setOpenModal] = useState("");
  const [stageOne, setStageOne] = useState(true);
  const [stageTwo, setStageTwo] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [sendMail, setSendMail] = useState(false);
  // const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(initialValues);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const CloseModal = () => {
    if (openModal) {
      setOpenModal(false);
    }
  };
  const handleCancel = () => {
    setOpenModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const [register] = useRegisterMutation();
  const [sendOtp] = useSendOtpMutation();
  const [verifyEmail] = useVerifyEmailMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // formData["image"] = img;
      const redUser = await register(formData);
      if (redUser?.data?.success) {
        toast.success("Account created");
        navigate("/dashboard");
      } else {
        toast.error(redUser?.error?.data?.message);
      }
      // console.log(redUser);
      // dispatch(setCredentials(redUser))
      navigate("/dashboard");
    } catch (err) {
      console.log(err.data.message);
    }
  };

  const handleOption = async () => {
    try {
      setLoading(true);
      if (!formData?.email) {
        toast.error("Email is required");
        setLoading(false);
        return;
      }
      if (!sendMail) {
        const mailSent = await sendOtp(formData);
        if (mailSent?.data?.success) {
          toast.success("Mail Sent");
          setSendMail(true);
        } else {
          toast.error(mailSent?.error?.data?.message);
        }
        setLoading(false);
      } else {
        if (!formData?.token) {
          toast.error("OTP is required");
          setLoading(false);
          return;
        }
        const verify = await verifyEmail(formData);

        if (verify?.data?.success) {
          setStageOne(false);
          setStageTwo(true);
          setOpenModal(false);
        } else {
          toast.error(verify?.error?.data?.message);
        }

        setLoading(false);
      }
    } catch (error) {
      console.log("error", error);
      toast.error(error ? error?.message : "Error occured");
      setLoading(false);
    }
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
                title={""}
                handleCancel={handleCancel}
                handleOption={handleOption}
              >
                <>
                  <div className="sendEmail">
                    <span className="text-xl font-semibold text-yellow-600 mb-4">
                      {sendMail ? "Verify Email" : "Getting Started"}
                    </span>
                    {/* <div className="flex justify-between w-full ">
                      <div className="mostIcon">
                        <i className="bx bx-mail-send"></i>
                      </div>
                      <div className="mostIcon">
                        <i className="bx bxs-doughnut-chart"></i>
                      </div>
                    </div> */}
                    {!sendMail ? (
                      <input
                        type="text"
                        value={formData.email}
                        onChange={handleInputChange}
                        name="email"
                        placeholder="Enter a valid Email"
                        className="w-full px-4 rounded-2xl border border-yellow-600 bg-pink my-4 h-[50px]"
                      />
                    ) : (
                      <input
                        type="text"
                        value={formData.token}
                        onChange={handleInputChange}
                        name="token"
                        placeholder="Enter a OTP"
                        className="w-full px-4 rounded-2xl border border-yellow-600 bg-pink my-4 h-[50px]"
                      />
                    )}

                    <Button
                      onClick={handleOption}
                      loading={loading ? loading : null}
                      title={sendMail ? "Verify otp" : "Send"}
                    />
                  </div>
                </>
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
                  name="state"
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
                  {/* <option value="">Select Country</option> */}
                  {country.map((item) => (
                    <option
                      defaultValue={"NGA"}
                      key={item.country}
                      value={item["3-code"]}
                    >
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
