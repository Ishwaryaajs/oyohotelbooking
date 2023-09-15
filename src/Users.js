import {React,useState, useEffect,useRef } from 'react';
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom'
export function PostUsers()
{
  const [users, setusers] = useState([]);
  const [isUserAvailable, setUserAvailable] = useState(false);
  let navigate = useNavigate();
  

    const getUser = async () => {
    try {
       // const response = await fetch('https://localhost:44328/api/User/GetUser');
      let token = localStorage.getItem("Token");
      let UserId = localStorage.getItem("UserId");
      let IsAdmin = localStorage.getItem("IsAdmin");
      let inputData = { userId: UserId, IsAdmin: IsAdmin };
      
      const response = await axios({
        url: "https://localhost:44328/api/User/GetUser",
        method: "GET",
        params: inputData ? inputData : {},
        headers: { Authorization: "Bearer " + token },
      });
        const data = response.data;
        setusers(data);
        setUserAvailable(data.length > 0 ? true : false);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    useEffect(()=>
    {   getUser();
    }, [])
    function OnDelete(id) {
      axios.delete("https://localhost:44328/api/User/Delete/" + id)
        .then((response) => {
          alert(' user deleted succesfully');
          getUser();
  
        })
        .catch((err) => { alert('Failed to delete user') })
    }
  
    function OnEdit(item) {
      navigate('/AddUserDetail', { state: item });
  
  
  
    }
    
 
    const isAdmin = localStorage.getItem("IsAdmin") === "false";

    return (
      <div>
        {isUserAvailable ? (
          <div className="row">
            {users.map((item, i) => (
              <div key={i} className="col-md-4">
                <div className="card mb-4">
                  <div className="card-body">
                    <h3 className="card-title">{item.userName}</h3>
                    <p className="card-text">Email: {item.userEmail}</p>
                    <p className="card-text">Password: {item.userPassword}</p>
                    {isAdmin && (
                  
                    <button
                      type="button"
                      onClick={() => {
                        OnEdit(item);
                      }}
                      className="btn btn-success"
                    >
                      Edit
                    </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>No User Available</div>
        )}
      </div>
    );
}

export function Users()
{
  const OnClick=()=>
  {
    window.location.href="/AddUserDetail";
  }
  return(
    <div>
      <PostUsers/>
    </div>
  );
}
//<th className="p-1">Action</th>
//<button type="button" onClick={() => { OnDelete(item.userId) }} className="btn btn-outline-danger btn-sm">Delete</button>
//<button type="button" onClick={() => { OnEdit(item) }} className="btn btn-outline-success btn-sm">Edit</button>
//<button onClick={OnClick} className="btn btn-primary ms-4">Add New User</button>
//<td className="p-1">
//<button type="button" onClick={() => { OnDelete(item.userId) }} className="btn btn-outline-danger btn-sm">Delete</button>
//<button type="button" onClick={() => { OnEdit(item) }} className="btn btn-outline-success btn-sm">Edit</button>
            
          //</td>