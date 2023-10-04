import React,{useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Signup.css'; 
function SignUpForm() {
 
    let navigate=useNavigate();
    const[name,setname]  = useState("");
    const[email,setemail] = useState("");
    const[password,setpassword] = useState("");
    const [PwtVisibility,setPwtVisibility]=useState(false);
    
    

   async function Signup()
    {
  
         let item = {UserName:name,UserEmail:email,UserPassword:password,}
    
    axios.post('https://localhost:44328/api/User/SignUp',item)
    .then((response) => {
        navigate('/login');
    })
    .catch((err) => { alert('Invalid SignUp') })
    }
    


    return (
      <div className="signup-container">
        <div className="l-half">
        
        </div>
        <div className="r-half">
          <div className="signup-form">
            <h1>Registration Page</h1>
            <input
             type='text'
             value={name} 
             onChange={(e)=>setname(e.target.value)} 
             className='form-control'
              placeholder='name'/>
              <br/>
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
                name="showPassword"
                onChange={() => {
                  setPwtVisibility(!PwtVisibility);
                }}
                checked={PwtVisibility}
              />
              <label className="form-check-label">Show Password</label>
              
            </div>
            <br />
  
            <button type="button" onClick={Signup} className="btn btn-warning">
              Sign Up
            </button>
            <p>
            Already have an account? <a href="/login"> Login  </a>
              
            </p>
            
          </div>
        </div>
      </div>
    ); 
   
 
}

export default SignUpForm