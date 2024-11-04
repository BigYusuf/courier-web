import React, { useEffect, useState } from 'react'
import { useDispatch } from "react-redux";
import { Link, useNavigate } from 'react-router-dom';
// import { useLoginMutation } from "../../state/api";
// import { setCredentials } from "../../state/slice/authSlice";
import bubbleImage from "../../assets/images/bubble.png";

// import "./SignIn.css";

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    // const [login, { isLoading }] = useLoginMutation();

    const user = {
        email,
        password,
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          if (email === "" || password === "") {
            setError("Please fill all the fields");
            return;
          } else {
          // const LoggedInUser = await login(user).unwrap()
    
          // dispatch(setCredentials(LoggedInUser))
         // console.log(LoggedInUser)
          navigate("/dashboard");
          setEmail('');
          setPassword('');
          }
        } catch (err) {
          setError(err.data.message);
        }
      };
    
      useEffect(() => {
        
        if(error){
            setTimeout(()=>{
                setError("")
            }, 3000)
        }
      }, [error])
    
      
      const DisplayCredentials = () => {
        return (
            <div className="loading">Loading...
            </div> 
        );
      };
      
  return (
    <div className='signup'> 
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
            <div className={'closeBtn'} onClick={()=> navigate(-1)}>
                <i className="bx bx-arrow-back"></i>
            </div>
            <div className="content">
                <h1>Sign in to Coral Courier</h1>
                
                <button className='emailBtn'>Sign in with Google</button>
                <div className='dividerContainer'>
                    <hr className='divider'/>
                    <div className="dividerText">
                        or
                    </div>
                    <hr className='divider'/>
                </div>
                <div className="inputWrapper">
                    <label className="label">Email</label>
                    <input className="input" type='email' name="email" placeholder='Email'onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="inputWrapper">
                    <label className="label">Password</label>
                    <input className="input" type='password' name="password" placeholder='Password' onChange={(e) => setPassword(e.target.value)}/>
                </div>
                    <span onClick={() => navigate('/passreset')} className='disclaimer'>
                        Forgot Password?
                    </span>

                <button className='googleBtn'onClick={handleSubmit}>Sign In</button>
                {error && <div className="error">{error}</div>}
                
                {/* {isLoading && <DisplayCredentials />} */}
                
               
            <div className='other'>
                Don{"'"}t have account? <Link to ='/new'>Sign Up</Link>
            </div>
          
            </div>
        </div>
        
    </div>
  )
}

export default SignIn