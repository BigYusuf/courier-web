import React, { useEffect, useState } from "react";
import frontImg from "../assets/images/frontImg.jpg";
// import ProjectDataService from "../utils/firebaseUtils";
// import { auth } from "../firebase";
// import { signInWithEmailAndPassword } from "firebase/auth";
import { setStaff, setProfile, setUser } from "../redux/slice/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [remember, setRemember] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRemember = async () => {
    setRemember(!remember);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!email || !password) {
        setError("Email and Password required");
        setLoading(false);
      } else {
        /*
        const loggedUser = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        */
        if (remember) {
          // saveValueToStorage(email, "userEmail");
          //saveValueToStorage(password, "userPass");
        } else {
          // removeValueFromStorage("userEmail");
          //  removeValueFromStorage("userPass");
        }
        // //get user info
        // const docSnap = await ProjectDataService.getUser(loggedUser?.user?.uid);
        // //get manager info
        // const docManager = await ProjectDataService.getManagerByUserId(
        //   loggedUser?.user?.uid
        // );
        // let manager = docManager.docs.map((doc) => ({
        //   ...doc.data(),
        //   id: doc.id,
        // }));

        //get admin info
        // dispatch(setUser(loggedUser?.user));
        // if (docSnap?.data()?.role === "user") {
        //   setError("No access");
        //   toast.error("No access, UnAuthorized");
        // }
        // if (
        //   manager[0]?.role === "manager" ||
        //   manager[0]?.role === "admin" ||
        //   manager[0]?.role === "superAdmin"
        // ) {
        //   dispatch(setProfile(docSnap?.data()));

        //   dispatch(setStaff(manager[0]));
      //     toast.success("Sign Success");
      //     navigate("/");
      //   } else {
      //     toast.error("No User");
      //   }
      //   setLoading(false);
       }
    } catch (error) {
      setError(error.message);
      toast.error(
        error?.message ? error?.message : "Error occured, contact support"
      );
      setLoading(false);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (error) {
        setError("");
        setLoading(false)
      }
    }, 3500);
  }, [error]);

  return (
    <div className="loginContainer">
      <div className="loginWrapper">
        <input type="checkbox" id="flip" />
        <div className="cover">
          <div className="front">
            <img src={frontImg} alt="" />
            <div className="text">
              <span className="text-1">
                Access top tier tools <br /> manage trinity services
              </span>
              <span className="text-2">Let's get connected</span>
            </div>
          </div>
          <div className="back">
            <img className="backImg" src="images/backImg.jpg" alt="" />
            <div className="text">
              <span className="text-1">
                Complete miles of journey <br /> with one step
              </span>
              <span className="text-2">Let's get started</span>
            </div>
          </div>
        </div>
        <div className="forms">
          <div className="form-content">
            <div className="login-form">
              <div className="title">Login</div>
              <form>
                <div className="input-boxes">
                  <div className="input-box">
                    <i className="bx bx-user"></i>
                    <input
                      type="text"
                      placeholder="Enter your email"
                      value={email}
                      name="email"
                      required
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="input-box">
                    <i className="bx bx-lock"></i>
                    <input
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      name="password"
                      required
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="text">
                    {error && <div className="error">{error}</div>}
                  </div>
                  <button
                    disabled={loading}
                    className="button input-box"
                    onClick={handleLogin}
                  >
                    {loading ? "loading..." : "Submit"}
                  </button>
                  <div className="text sign-up-text">
                    Forgot Password? <label htmlFor="flip">Retrieve now</label>
                  </div>
                </div>
              </form>
            </div>
            <div className="signup-form">
              <div className="title">Forgot Password</div>
              <form action="#">
                <div className="input-boxes">
                  <div className="input-box">
                    <i className="fas fa-user"></i>
                    <input type="text" placeholder="Enter your name" required />
                  </div>
                  <div className="input-box">
                    <i className="fas fa-envelope"></i>
                    <input
                      type="text"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  <div className="input-box">
                    <i className="fas fa-lock"></i>
                    <input
                      type="password"
                      placeholder="Enter your password"
                      required
                    />
                  </div>
                  <div className="button input-box">Submit</div>
                  <div className="text sign-up-text">
                    Already have an account?{" "}
                    <label htmlFor="flip">Login now</label>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
