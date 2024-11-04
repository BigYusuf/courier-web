import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
//
// import "./PassReset.css";
// import { usePassResetMutation, useSendTokenMutation } from '../../state/api';
import bubbleImage from "../../assets/images/bubble.png";

const PassReset = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");
  const [otp, setOtp] = useState(false);
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  // const [sendToken, {isLoading: sendTokenLoading, error: sendTokenError}] = useSendTokenMutation()
  // const [passreset, {isLoading: resetPassLoading, error: resetPassError}] = usePassResetMutation()

  const handleReset = async () => {
    try {
      if (password === conPassword && token) {
        // await passreset({token, password, confirmPassword: conPassword}).unwrap()
        // if (resetPassError)return console.log(resetPassError)
        console.log("reset pass success");
        navigate("/signin");
      } else if (password !== conPassword) {
        console.log("please make sure the password match");
      } else {
        console.log("All fields must be filled");
      }
    } catch (err) {
      console.log(err?.data?.message);
      console.log(err);
    }
  };

  const handleSubmit = async () => {
    try {
      if (!email) {
        console.log("Please fill all the fields");
        return;
      } else {
        //  await sendToken({email}).unwrap()
        //  if (sendTokenError)return console.log(sendTokenError)
        setOtp(true);
      }
    } catch (err) {
      console.log(err.data.message);
    }
  };

  return (
    <div className="signup">
      <div className="left">
        <div className="bubbles">
          <img src={bubbleImage} alt="bubble1" className="bubbleimg" />
          <img src={bubbleImage} alt="bubble2" className="bubbleimg" />
          <img src={bubbleImage} alt="bubble3" className="bubbleimg" />
          <img src={bubbleImage} alt="bubble4" className="bubbleimg" />
          <img src={bubbleImage} alt="bubble5" className="bubbleimg" />
        </div>
      </div>

      <div className="right">
        <div className={"closeBtn"} onClick={() => navigate(-1)}>
          <i className="bx bx-arrow-back"></i>
        </div>
        <div className="content">
          <h1>Reset You Password</h1>
          <span>Hello. An OTP will be sent to the registered email</span>

          {!otp ? (
            <div className="inputPassReset">
              <label className="label">Email</label>
              <input
                className="input"
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email"
              />
            </div>
          ) : (
            <>
              <div className="inputPassReset">
                <label className="label">Token</label>
                <input
                  className="input"
                  onChange={(e) => setToken(e.target.value)}
                  type="text"
                  placeholder="Enter Correct OTP"
                />
              </div>
              <div className="inputPassReset">
                <label className="label">Password</label>
                <input
                  className="input"
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Password"
                />
              </div>
              <div className="inputPassReset">
                <label className="label">Confirm Password</label>
                <input
                  className="input"
                  onChange={(e) => setConPassword(e.target.value)}
                  type="password"
                  placeholder="Password"
                />
              </div>
            </>
          )}

          {!otp ? (
            <button
              className="emailBtn"
              //  disabled={sendTokenLoading}
              onClick={handleSubmit}
            >
              Send Email
            </button>
          ) : (
            <>
              <button
                className="emailBtn"
                //  disabled={resetPassLoading}
                onClick={handleReset}
              >
                Reset Password
              </button>
              <span onClick={() => setOtp(false)} className="disclaimer">
                Didn{`'`}t recieve token after 15 minutes
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PassReset;
