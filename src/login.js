import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FacebookLoginButton } from "react-social-login-buttons";
import { LoginSocialFacebook } from "reactjs-social-login";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import './Login.css'; 

function Login() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [PwtVisibility, setPwtVisibility] = useState(false);

  let navigate = useNavigate();

  async function login({onLogin}) {
   
    axios
    
      .post("https://localhost:44328/api/User/LoginUser", {
        UserEmail: email,
        Password: password,
      })
      .then((response) => {
        navigate("/Home");
        localStorage.setItem("IsLoggedIn", true);
        localStorage.setItem("UserName", response.data.userName);
        localStorage.setItem("UserEmail", response.data.userEmail);
        localStorage.setItem("Token", response.data.token);
        localStorage.setItem("IsAdmin",response.data.isAdmin);
        localStorage.setItem("UserId",response.data.userId);


        
      })
      .catch((err) => {
        alert("Invalid Login");
      });
     
  }

  return (
    <div className="login-container">
      <div className="left-half">
      
      </div>
      <div className="right-half">
        <div className="login-form">
          <h1>Login Page</h1>
          <input
            type="text"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            placeholder="Email"
            className="form-control"
          />
          <br />
          <input
            type={PwtVisibility ? "text" : "password"}
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            placeholder="Password"
            className="form-control"
          />

          <div className="form-check mt-1">
            <input
              className="form-check-input"
              type="checkbox"
              name="ShowPassword"
              onChange={() => {
                setPwtVisibility(!PwtVisibility);
              }}
              checked={PwtVisibility}
            />
            <label className="form-check-label">Show Password</label>
            
          </div>
          <br />

          <button type="button" onClick={login} className="btn btn-primary">
            Login
          </button>
          <p>
            Don't have an account? <a href="/signupform"> Signup </a>
            <center> or </center>
          </p>
          <GoogleOAuthProvider clientId="481512416806-s7pjnmhbhncue24pkc89h1d8bdtei1r0.apps.googleusercontent.com">
            <GoogleLogin
              onSuccess={(crendentialResponse) => {
                console.log(crendentialResponse);
              }}
            />
          </GoogleOAuthProvider>
          <LoginSocialFacebook
            appId="6060610557376840"
            onResolve={(response) => {
              console.log(response);
            }}
            onReject={(error) => {
              console.log(error);
            }}
          >
            <FacebookLoginButton />
          </LoginSocialFacebook>
        </div>
      </div>
    </div>
  );
}

export default Login;
