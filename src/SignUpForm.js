import React,{useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignUpForm() {
 
    let navigate=useNavigate();
    const[name,setname]  = useState("");
    const[email,setemail] = useState("");
    const[password,setpassword] = useState("");
    const [PwtVisibility,setPwtVisibility]=useState(false);
    
    

   async function Signup()
    {
    //     console.log({name,email,password,});
         let item = {UserName:name,UserEmail:email,UserPassword:password,}
    //  let result = await fetch("https://localhost:44328/api/User/SignUp",{
    //     method:"POST",
    //      body:JSON.stringify(item),
    //     headers: {
    //         "Content-Type" : "application/json",
    //         "Accept":"application/json"
    //     }

    //  })   
    //  result = await result.json()
    //  console.warn("result",result);
    axios.post('https://localhost:44328/api/User/SignUp',item)
    .then((response) => {
        navigate('/login');
    })
    .catch((err) => { alert('Invalid SignUp') })
    }
    


     
   
  return (
    <div className='vh-100 d-flex align-items-center'>
    <div className='col-sm-6 offset-sm-3'>
        <h1>Registration page</h1>
          <input type='text'value={name} onChange={(e)=>setname(e.target.value)} className='form-control' placeholder='name'/>
          <br></br>
          <input type='text' value={email} onChange={(e)=>setemail(e.target.value)} className='form-control' placeholder='email'/>
          <br></br>
          <input type={PwtVisibility? "text" : "password"} value={password} onChange={(e)=>setpassword(e.target.value)} className='form-control' placeholder='password'/>
          <div className="form-check mt-1">
                    <input className="form-check-input" type="checkbox"  name="roomAvailable" onChange={()=>{setPwtVisibility(!PwtVisibility)}}  checked={PwtVisibility}/>
                        <label className="form-check-label" >
                           Show Password
                        </label>
                        
                </div>
          <br></br>
          
         <button  onClick={Signup} className='btn btn-warning'>Sign Up</button>
         <p>Already have an account? <a href="/login"> Login </a></p>
    </div>
    </div>

  )
}

export default SignUpForm