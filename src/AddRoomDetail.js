import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from 'react-router-dom';
import hotelImage from "./hotelimages/addrooms.jpg";
function AddRoomDetail() {
let location = useLocation();
let navigate = useNavigate();
const hotelName = useRef(null);
const hotelId = useRef();
const roomType = useRef();
const roomCapacity = useRef();
const roomPrice = useRef();
const roomAvailable = useRef();
const IntitalRoomDetails = { hotelId:"", hotelName: "", roomType: "", roomCapacity: "", roomPrice: "", roomPrice: "", roomAvailable: "" };
const [roomdetails, setRoomDetails] = useState(IntitalRoomDetails);
const [hotelNames, setHotelNames] = useState([]);
function onSubmitClick() {
alert(`Hotel Name: ${roomdetails.hotelName} Room Type: ${roomType.current.value} Room Capaciy: ${roomCapacity.current.value} Room Price:${roomPrice} Room Available:${roomAvailable}`);  }

 function handleOnRoomDetailChange(e) {
     let { name, value } = e.target;
      setRoomDetails((prevstate) => {
          return ({ ...prevstate, [name]: value })
      })

   }
    function OnRoomAvailabilityChange(e) {
        let { name, checked } = e.target;

      setRoomDetails((prevstate) => {
          return ({ ...prevstate, [name]: checked })
      })
  }
  function OnAddNewRoom() {
    const token = localStorage.getItem("Token");

    const roomData = {
      hotelId: hotelId.current.value, 
      roomType: roomType.current.value,
      roomCapacity: roomCapacity.current.value,
      roomPrice: roomPrice.current.value,
      roomAvailable: roomAvailable.current.checked, 
    };

    axios
      .post('https://localhost:44328/api/Room', roomData, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((response) => {
        if (response.status === 201) {
          alert('New room added successfully');
          setRoomDetails(IntitalRoomDetails); 
        } else {
          alert('Failed to add new Room');
        }
      })
      .catch((error) => {
        console.error('Error adding new Room', error);
        alert('Failed to add new Room');
      });
  }

    
    

  

  



useEffect(() => {
    const token = localStorage.getItem("Token"); 

    if (token) {
      axios
        .get('https://localhost:44328/api/Hotel/GetHotels', {
          headers: { Authorization: `Bearer ${token}` }, 
        })
        .then((response) => {
          const names = response.data;
          setHotelNames(names);
        })
        .catch((err) => {
          console.error('Failed to fetch hotel names', err);
        });
    } else {
     
      console.error('Authentication token is missing.');
    }
  }, []);
  function OnUpdateRoom() {
      axios.put('https://localhost:44328/api/Room/Update', roomdetails)
          .then((response) => {
              alert(' room Updated succesfully');
                            navigate('/Rooms');
         })
         .catch((err) => { alert('Failed to update Room') })
   }
   return (
    <div className="container mt-5">
      <div className="card col-md-6 mx-auto">
        <div className="row">
          <div className="col-md-6">
            <div className="card-body">
              <h2 className="card-title">Room Details</h2>
              <form>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="hotelName">Hotel Name:</label>
                      <select
              name="hotelName"
              onChange={handleOnRoomDetailChange}
              ref={hotelId}
              value={roomdetails.hotelName}
            >
              <option value="">Select a Hotel</option>
              {hotelNames && hotelNames.length > 0 ? (
                hotelNames.map((x) => (
                  <option key={x.hotelId} value={x.hotelId}>
                    {x.hotelName}
                  </option>
                ))
              ) : (
                <option value="">Loading...</option>
              )}
            </select>
            
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="roomType">Room Type:</label>
                      <input
                        type="text"
                        className="form-control"
                        name="roomType" onChange={handleOnRoomDetailChange}
                         ref={roomType}
                          value={roomdetails.roomType}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="roomCapacity">Room Capacity:</label>
                      <input
                        type="text"
                        className="form-control"
                        name="roomCapacity" 
                        onChange={handleOnRoomDetailChange} 
                        ref={roomCapacity} 
                        value={roomdetails.roomCapacity}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="roomPrice">Room Price:</label>
                      <input
                        type="text"
                        className="form-control"
                        name="roomPrice" 
                        onChange={handleOnRoomDetailChange} 
                        ref={roomPrice} 
                        value={roomdetails.roomPrice}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="roomAvailable">Availablility:</label>
                      <input
                        type="checkbox"
                        className="form-check"
                        name="roomAvailable" 
                        onChange={OnRoomAvailabilityChange} 
                        ref={roomAvailable} 
                        value={roomdetails.roomAvailable}
                      />
                      
                    </div>
                  </div>
                </div>

             
                {Boolean(location.state)
                  ? <button type="button" onClick={OnUpdateRoom} className="btn btn-primary">Update</button>
                     : <button type="button" onClick={OnAddNewRoom} className="btn btn-primary">Add Room</button>
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
 export default AddRoomDetail;