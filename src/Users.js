import {React,useState, useEffect,useRef } from 'react';
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom';
import backgroundImage from './hotelimages/splash.jpg';
export function PostUsers()
{
  const [users, setusers] = useState([]);
  const [isUserAvailable, setUserAvailable] = useState(false);
  let navigate = useNavigate();
  

    const getUser = async () => {
    try {
      
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
const cardStyle={
  border: '1px solid #ccc', 
    borderRadius: '5px',
    margin: '10px',
    padding: '10px',
    backgroundImage: `url(${backgroundImage})`, 
    backgroundSize: 'cover',
}
const cardBodyStyle = {
  textAlign: 'center', 
};


    return (
      <div >
        {isUserAvailable ? (
          <div className="row">
            {users.map((item, i) => (
              <div key={i} className={`col-md-4${!isAdmin ? '' : ' mx-auto'}`}>
                 
                <div className="card mb-4" style={cardStyle}>
                  <div className="card-body" style={cardBodyStyle}>
                    <h3 className="card-title">{item.userName}</h3>
                    <p className="card-text">Email: {item.userEmail}</p>
                    <p className="card-text">Password: {item.userPassword}</p>
                    {isAdmin && (
                  
                    <button
                      type="button"
                      onClick={() => {
                        OnEdit(item);
                      }}
                      className="btn btn-outline-success btn-sm m-2"
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
