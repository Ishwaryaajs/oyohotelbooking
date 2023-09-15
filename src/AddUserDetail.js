import { useRef, useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from 'react-router-dom';
function AddUserDetail() {
  let location = useLocation();
  let navigate = useNavigate();
  
  const userName = useRef();
  const userPassword = useRef();
  const userEmail = useRef();
  const IntitalUserDetails = {userName: "", userEmail: "", userPassword: ""};
    const [userdetails, setUserDetails] = useState(IntitalUserDetails);
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
    <div>
      <h2>User Details</h2>
      <form onSubmit={OnsubmitClick}>
      
        <label name="userName">Enter User Name</label>
        <input type="text" name="userName"onChange={handleOnUserDetailChange} ref={userName} value={userdetails.userName}/>
        <br />
        <br />
        <label name="userPassword">Enter Password</label>
        <input type="password" name="userPassword" onChange={handleOnUserDetailChange} ref={userPassword} value={userdetails.userPassword} />
        <br />
        <br />
        <label name="userEmail">Enter Email</label>
        <input type="email" name="userEmail" onChange={handleOnUserDetailChange} ref={userEmail} value={userdetails.userEmail} />
        <br />
        <br />
        {Boolean(location.state)
          ? <button type="button" onClick={OnUpdateUser} className="btn btn-primary">Update</button>
          : <button type="button" onClick={OnAddNewUser} className="btn btn-primary">Add user</button>
        }
      </form>
    </div>
  )
}
export default AddUserDetail;
/*<label name="userId">Enter User Id</label>
        <input type="text" name="userId" onChange={handleOnUserDetailChange} ref={userId} value={userdetails.userId}/>
        <br />
        <br />  
        */