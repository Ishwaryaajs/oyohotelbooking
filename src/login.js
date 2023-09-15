import React,{useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FacebookLoginButton } from "react-social-login-buttons";
import { LoginSocialFacebook } from "reactjs-social-login";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
//import COVER_IMAGE from './hotelimages/lux room.jpg';
//import sessionStorageService from "./common/services/SessionStorageService";


function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [PwtVisibility, setPwtVisibility] = useState(false);
  
  let navigate = useNavigate();

  async function login({onLogin}) {
    // if(.)
    // {
    //    navigate('/Home');
    // }
    // else{
    //   alert(`Invalid Login`);
    // }
    
    axios
    
      .post("https://localhost:44328/api/User/LoginUser", {
        UserEmail: email,
        Password: password,
      })
      .then((response) => {
        navigate("/Home");
        localStorage.setItem("IsLoggedIn", true);
        localStorage.setItem("UserName", response.data.userName);
        localStorage.setItem("Token", response.data.token);
        localStorage.setItem("IsAdmin",response.data.isAdmin);
        localStorage.setItem("UserId",response.data.userId);


        
      })
      .catch((err) => {
        alert("Invalid Login");
      });
     
  }
  return (
    <div className="vh-100 d-flex align-items-center">
      <div className="col-sm-4 offset-sm-3">
       
        <h1>login page</h1>
        <input
          type="text"
          value={email}
          onChange={(e) => setemail(e.target.value)}
          placeholder="email"
          className="form-control"
        />
        <br></br>
        <input
          type={PwtVisibility ? "text" : "password"}
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          placeholder="password"
          className="form-control"
        />

        <div className="form-check mt-1">
          <input
            className="form-check-input"
            type="checkbox"
            name="roomAvailable"
            onChange={() => {
              setPwtVisibility(!PwtVisibility);
            }}
            checked={PwtVisibility}
          />
          <label className="form-check-label">Show Password</label>
        </div>
        <br></br>
      

        <button type="button" onClick={login} className="btn btn-primary">
          Login
        </button>
        <p>
          Dont have an account? <a href="/signupform"> Signup </a>
          <center> or </center>
        </p>
        <GoogleOAuthProvider clientId="481512416806-s7pjnmhbhncue24pkc89h1d8bdtei1r0.apps.googleusercontent.com">
          <GoogleLogin
             onSuccess={crendentialResponse => {
              console.log(crendentialResponse);
             }}/>

          
    </GoogleOAuthProvider>
    <LoginSocialFacebook
      appId="6060610557376840"
      onResolve={(response)=>{
        console.log(response);
      }}
      onReject={(error)=>{
        console.log(error);
      }}
      >
        <FacebookLoginButton/>
    </LoginSocialFacebook>
      </div>
    </div>
    
  );
}

export default Login;
 /*<div className='absolute top-[20%] left-[10%] flex flex-col'>
          <h1 className='text-4xl text-white font-bold my-4'>Turn Your Dreams into Reality</h1>
          <p className='text-xl text-white font-normal'>Start your Journey Now by Booking Now</p>
        </div>*/