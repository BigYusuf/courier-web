import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import bubbleImage from "../../assets/images/bubble.png";
import {
  useLoginMutation,
  useLoginStaffMutation,
} from "../../redux/slice/auth";
import { toast } from "react-toastify";
import { setProfile } from "../../redux/slice/auth/authSlice";
import { LoadingBox } from "../../components";

// import "./SignIn.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login] = useLoginMutation();
  const [loginStaff] = useLoginStaffMutation();

  const user = {
    email,
    password,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (email === "" || password === "") {
        setError("Please fill all the fields");
        setLoading(false);
        return;
      } else {
        const LoggedInUser = isChecked
          ? await loginStaff(user).unwrap()
          : await login(user).unwrap();

        // dispatch(setCredentials(LoggedInUser))
        // console.log("LoggedInUser", LoggedInUser);
        if (LoggedInUser?.success) {
          if (isChecked) {
            await dispatch(setProfile(LoggedInUser?.staff));
          } else {
            await dispatch(setProfile(LoggedInUser?.user));
          }
          toast.success(isChecked ? "Staff Login" : "Signed in");
          navigate("/dashboard");
        } else {
          toast.error(LoggedInUser?.error?.message);
        }

        setLoading(false);
        setEmail("");
        setPassword("");
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error(
        err
          ? err?.data
          : err?.data?.message
          ? err?.data?.message
          : "Error Occured"
      );
      setError(
        err
          ? err?.data
          : err?.data?.message
          ? err?.data?.message
          : "Error Occured"
      );
    }
  };

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  }, [error]);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  }, [error]);

  const DisplayCredentials = () => {
    return <div className="loading">Loading...</div>;
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
          <h1>Sign in to Coral Courier</h1>
          {/* 
          <button className="emailBtn">Sign in with Google</button>
          <div className="dividerContainer">
            <hr className="divider" />
            <div className="dividerText">or</div>
            <hr className="divider" />
          </div> */}
          <div className="inputWrapper">
            <label className="label">Email</label>
            <input
              className="input"
              type="email"
              name="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="inputWrapper">
            <label className="label">Password</label>
            <input
              className="input"
              type="password"
              name="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {/* <span onClick={() => navigate("/passreset")} className="disclaimer">
            Forgot Password?
          </span> */}
          <div className="flex items-center flex-row justify-between mb-3 mt-[-10px]">
            <label
              htmlFor="isChecked"
              className="flex items-center flex-row gap-2 cursor-pointer"
            >
              <input
                type="checkbox"
                name="isChecked"
                className="cursor-pointer"
                value={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
                id="isChecked"
              />
              <span className="text-sm cursor-pointer">Login as a staff</span>
            </label>
            <span
              onClick={() => navigate("/passreset")}
              className="underline text-sm cursor-pointer"
            >
              Forgot Password?
            </span>
          </div>

          <button className="googleBtn" onClick={handleSubmit}>
            {isLoading === true ? (
              <div style={{ marginTop: -14 }}>
                <LoadingBox circle={true} />
              </div>
            ) : (
              "Sign In"
            )}
          </button>
          {error && <div className="error">{error}</div>}

          {/* {isLoading && <DisplayCredentials />} */}

          <div className="other">
            Don{"'"}t have account? <Link to="/new">Sign Up</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
