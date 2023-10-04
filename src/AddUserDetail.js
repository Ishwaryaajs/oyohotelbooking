import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import hotelImage from "./hotelimages/userbooking.jpg";
function AddUserDetail() {
  let location = useLocation();
  let navigate = useNavigate();
  
  const userName = useRef();
  const userPassword = useRef();
  const userEmail = useRef();
  const IntitalUserDetails = {userName: "", userEmail: "", userPassword: ""};
    const [userdetails, setUserDetails] = useState(IntitalUserDetails);
    const [showPassword, setShowPassword] = useState(false);
  function OnsubmitClick() {
    alert(`User Name:${userName.current.value} User Password:${userPassword.current.value} User Email:${userEmail.current.value}`);
  }
  function handleOnUserDetailChange(e) {
    let { name, value } = e.target;
    setUserDetails((prevstate) => {
      return ({ ...prevstate, [name]: value })
    })

  }
  function OnAddNewUser() {
    axios.post('https://localhost:44328/api/User', userdetails)
        .then((response) => {
            alert('New user added succesfully');
            setUserDetails(IntitalUserDetails);
        })
        .catch((err) => { alert('Failed to add new User') })
}
useEffect(() => {


    if (Boolean(location.state)) {
        setUserDetails(location.state);

    }



}, [location])
function OnUpdateUser() {
    axios.put('https://localhost:44328/api/User/Update', userdetails)
        .then((response) => {
            alert(' user Updated succesfully');
            navigate('/Users');
        })
        .catch((err) => { alert('Failed to update user') })
}
return (
  <div className="container mt-5">
    <div className="card col-md-6 mx-auto">
      <div className="row">
        <div className="col-md-6">
          <div className="card-body">
            <h2 className="card-title">User Details</h2>
            <form>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="userName">UserName:</label>
                    <input
                      type="text"
                      className="form-control"
                      name="userName"
                      onChange={handleOnUserDetailChange}
                      ref={userName} 
                      value={userdetails.userName}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="userEmail">UserEmail:</label>
                    <input
                      type="email"
                      className="form-control"
                      name="userEmail" 
                      onChange={handleOnUserDetailChange} 
                      ref={userEmail} 
                      value={userdetails.userEmail}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="userPassword">Password:</label>
                    <div className="input-group">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          className="form-control"
                          name="userPassword"
                          onChange={handleOnUserDetailChange}
                          ref={userPassword}
                          value={userdetails.userPassword}
                        />
                        <div className="input-group-append">
                          <span
                            className="input-group-text"
                            onClick={() => setShowPassword(!showPassword)}
                            style={{ cursor: 'pointer' }}
                          >
                            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                          </span>
                        </div>
                      </div>
                  </div>
                </div>
              </div>
              <br/>

              {Boolean(location.state)
          ? <button type="button" onClick={OnUpdateUser} className="btn btn-primary">Update</button>
          : <button type="button" onClick={OnAddNewUser} className="btn btn-primary">Add user</button>
        }
            </form>
          </div>
        </div>
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <img src={hotelImage} alt="Booking Image" className="img-fluid" />
        </div>
      </div>
    </div>
  </div>
);

}
export default AddUserDetail;
/*<label name="userId">Enter User Id</label>
        <input type="text" name="userId" onChange={handleOnUserDetailChange} ref={userId} value={userdetails.userId}/>
        <br />
        <br />  
        */