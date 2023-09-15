 import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from 'react-router-dom';
function AddRoomDetail() {
let location = useLocation();
let navigate = useNavigate();
const hotelId = useRef();
const roomType = useRef();
const roomCapacity = useRef();
const roomPrice = useRef();
const roomAvailable = useRef();
const IntitalRoomDetails = { hotelId: "", roomType: "", roomCapacity: "", roomPrice: "", roomPrice: "", roomAvailable: "" };
const [roomdetails, setRoomDetails] = useState(IntitalRoomDetails);
function onSubmitClick() {
alert(`Hotel Id: ${hotelId.current.value} Room Type: ${roomType.current.value} Room Capaciy: ${roomCapacity.current.value} Room Price:${roomPrice} Room Available:${roomAvailable}`);  }

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
    
    let token = localStorage.getItem("Token");
    axios.post('https://localhost:44328/api/Room', roomdetails, {
        headers: { Authorization: "Bearer " + token },
      })
        .then((response) => {
            alert('New room added succesfully');
           setRoomDetails(IntitalRoomDetails);
        })
        .catch((err) => { alert('Failed to add new Room') })
  }
  useEffect(() => {


      if (Boolean(location.state)) {
          setRoomDetails(location.state);

       }



  }, [location])
  function OnUpdateRoom() {
      axios.put('https://localhost:44328/api/Room/Update', roomdetails)
          .then((response) => {
              alert(' room Updated succesfully');
                            navigate('/Rooms');
         })
         .catch((err) => { alert('Failed to update Room') })
   }
   return (
       <div>
           <h2>Room Details</h2>
           <form onSubmit={onSubmitClick}>
             <label name="hotelId">Enter Hotel Id</label>
              <input type="text" name="hotelId" onChange={handleOnRoomDetailChange} ref={hotelId} value={roomdetails.hotelId} />
              <br />
              <br />
              <label name="roomType">Enter Type</label>
              <input type="text" name="roomType" onChange={handleOnRoomDetailChange} ref={roomType} value={roomdetails.roomType} />
              <br />
              <br />
              <label name="roomCapacity">Enter Capacity</label>
               <input type="text" name="roomCapacity" onChange={handleOnRoomDetailChange} ref={roomCapacity} value={roomdetails.roomCapacity} />
                <br />
                <br />
                <label name="roomPrice">Enter Price</label>
                <input type="text" name="roomPrice" onChange={handleOnRoomDetailChange} ref={roomPrice} value={roomdetails.roomPrice} />
                <br />
               <br />
                <label name="roomAvailable">Enter Availabilty</label>
      <input type="checkbox" name="roomAvailable" onChange={OnRoomAvailabilityChange} ref={roomAvailable} value={roomdetails.roomAvailable}/> 
             <div className="form-check">
                    
                        
                </div>
                <br />
                <br />
                 {Boolean(location.state)
                  ? <button type="button" onClick={OnUpdateRoom} className="btn btn-primary">Update</button>
                     : <button type="button" onClick={OnAddNewRoom} className="btn btn-primary">Add Room</button>
                 }



             </form>
         </div>
    );
 }
 export default AddRoomDetail;