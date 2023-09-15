import { React, useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate ,useParams} from 'react-router-dom'
import hotelImage1 from './hotelimages/bedroom.jpg';
import hotelImage2 from './hotelimages/deluxe bedroom.jpg';
import hotelImage3 from './hotelimages/double bedroom.jpg';
import hotelImage4 from './hotelimages/modern.jpg';
import hotelImage5 from './hotelimages/lux room.jpg';
import hotelImage6 from './hotelimages/luxury bedroom.jpg';
import hotelImage7 from './hotelimages/curtain.jpg';
import hotelImage8 from './hotelimages/hike.jpg';
export function PostRooms() {
  
  const [rooms, setrooms] = useState([]);
  let navigate = useNavigate();
  


  const getRoom = async () => {
    try {
      
     let token = localStorage.getItem("Token");
     let inputData = undefined;
     const response = await axios({
       url: "https://localhost:44328/api/Room/GetRooms",
       method: "GET",
       params: inputData ? inputData : {},
       headers: { Authorization: "Bearer " + token },
     });
       const data = response.data;
       setrooms(data);
       console.log(data);
     } catch (error) {
       console.log(error);
     }
  };
  useEffect(() => {
    getRoom();
  }, [])

  function OnDelete(id) {
    axios.delete("https://localhost:44328/api/Room/Delete/" + id)
      .then((response) => {
        alert(' room deleted succesfully');
        getRoom();

      })
      .catch((err) => { alert('Failed to delete room') })
  }

  function OnEdit(p) {
    navigate('/AddRoomDetail', { state: p });



  }
  function onBookNowClick()
  {
    navigate(`/Reservation`);
  }

  const isAdmin = localStorage.getItem("IsAdmin") === "false";
  return (
    <div className="row">
      {rooms.map((room, index) => (
        <div key={index} className="col-lg-4 col-md-6 mb-4">
        
          <div className="card">
          <img
                src={index === 0 ? hotelImage1 : index === 1 ? hotelImage2 : index === 2 ? hotelImage3 : index===3?hotelImage4: index===4? hotelImage5:index===5?hotelImage6:index===6?hotelImage7:hotelImage8} // Use the imported images
                className="card-img-top hotel-image"
                alt={room.roomType}
                />
          
            <div className="card-body">
              
              <p className="card-text">
                <strong>Price:</strong> ${room.roomPrice}
                <br />
                <strong>Capacity:</strong> {room.roomCapacity} persons
                <br />
                <strong>Availability:</strong> {room.roomAvailable ? 'Available' : 'Not Available'}
              </p>
              {isAdmin && (
                <button
                  type="button"
                  onClick={() => onBookNowClick()}
                  className="btn btn-outline-primary btn-sm"
                >
                  Book Now
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
export function Rooms() {
  const OnClick = () => {
    window.location.href = "/AddRoomDetail";
  }
  
  const isAdmin = localStorage.getItem("IsAdmin") === "true";
  return (
    <div>
      {isAdmin &&(

      <button onClick={OnClick} className="btn btn-primary ms-4">Add New Room</button>
      )}
      <PostRooms />
    </div>
  );
}