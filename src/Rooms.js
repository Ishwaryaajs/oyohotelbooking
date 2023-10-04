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
  const [checkinDate, setCheckinDate] = useState(''); 
  const [checkoutDate, setCheckoutDate] = useState(''); 
  let navigate = useNavigate();
  const { id } = useParams();

  const getRoomsByDates = async () => {
    try {
      let token = localStorage.getItem("Token");
      const response = await axios.get(`https://localhost:44328/api/Room/GetAvailableRooms`, {
        params: {
          hotelId: id,
          checkInDate: checkinDate,
          checkOutDate: checkoutDate
        },
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
    getRoomsByDates();
  }, [checkinDate, checkoutDate]); 
  const getRoom = async () => {
    try {
      let token = localStorage.getItem("Token");
      let inputData = undefined;
      const response = await axios({
        url: "https://localhost:44328/api/Room/" + id,
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
  }, []);
  async function OnDelete(id) {
    try {
      const token = localStorage.getItem("Token");
      const response = await axios.delete(
        `https://localhost:44328/api/Room/Delete/${id}`,
        { headers: { Authorization: "Bearer " + token } }
      );
  
      console.log("Delete Response:", response);
  
      if (response.status === 200) {
        const responseData = response.data; 
        alert(`Room deleted successfully`);
        getRoom();
      } else {
       
        alert(`Failed to delete Room. Status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error Deleting Room", error);
      alert("Failed to delete Room");
    }
  }
  
  
 

  function OnEdit(room) {
    navigate("/AddRoomDetail", { state: {room} });
  }
  function onBookNowClick(room) {
    navigate("/AddBookingDetail", { state:  room });
    
  }

  const isAdmin = localStorage.getItem("IsAdmin") === "false";
  const cardStyle={
    border: '1px solid #ccc', 
      borderRadius: '5px',
      margin: '10px',
      padding: '10px',
      
  }
  return (
    <div className="row">
     {isAdmin && (
              <div>
                <label>Check-in Date:</label>
                <input
                  type="date"
                  value={checkinDate}
                  onChange={(e) => setCheckinDate(e.target.value)}
                />
                <label>Check-out Date:</label>
                <input
                  type="date"
                  value={checkoutDate}
                  onChange={(e) => setCheckoutDate(e.target.value)}
                />
                 
              </div>
            )}
      {rooms.map((room, index) => (
        <div key={index} className="col-lg-4 col-md-6 mb-4">
           
          <div className="card" style={cardStyle}>
            
            <img
              src={
                index === 0
                  ? hotelImage1
                  : index === 1
                  ? hotelImage2
                  : index === 2
                  ? hotelImage3
                  : index === 3
                  ? hotelImage4
                  : index === 4
                  ? hotelImage5
                  : index === 5
                  ? hotelImage6
                  : index === 6
                  ? hotelImage7
                  : hotelImage8
              } 
              className="card-img-top hotel-image"
              alt={room.roomType}
            />

            <div className="card-body">
            <h5 className="card-title">{room.roomType}</h5>
              
              
              <p>
                <strong>Price:</strong> ${room.roomPrice}
                <br />
                <strong>Capacity:</strong> {room.roomCapacity} persons
                <br />
                <strong>Availability:</strong>{" "}
                {room.roomAvailable ? "Available" : "Not Available"}
              </p>
              <div className="card-footer">
              {isAdmin && (
                <button
                  type="button"
                  onClick={() => onBookNowClick(room)}
                  className="btn btn-outline-primary btn-sm"
                >
                  Book Now
                </button>
              )}
              
                {!isAdmin && (
              
                <button type="cancel-button"
                onClick={() => { OnDelete(room.roomId) }}
                className="btn btn-outline-danger btn-sm">Delete
              </button>
             
             
             
             )}
             </div>
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
  };

  const isAdmin = localStorage.getItem("IsAdmin") === "true";
  return (
    <div>
      {isAdmin && (
        <button onClick={OnClick} className="btn btn-primary ms-4">
          Add New Room
        </button>
      )}
      <PostRooms />
    </div>
  );
}
