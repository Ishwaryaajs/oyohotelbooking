import { React, useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useReactToPrint } from 'react-to-print';
import 'bootstrap/dist/css/bootstrap.min.css';
export function PostBookings() {
  const [bookings, setbookings] = useState([]);
  const [isDataAvailable, setDataAvailable] = useState(false);
  const componentRef = useRef();
  let navigate = useNavigate();
  
  

  const getBooking = async () => {
    try {
      let token = localStorage.getItem("Token");
      let UserId = localStorage.getItem("UserId");
      let IsAdmin = localStorage.getItem("IsAdmin");
      let inputData = { userId: UserId, IsAdmin: IsAdmin };
      const response = await axios({
        url: "https://localhost:44328/api/Booking/GetBookings",
        method: "GET",
        params: inputData ? inputData : {},
        headers: { Authorization: "Bearer " + token },
      });
      const data = response.data;
      

      setbookings(data);
      setDataAvailable(data.length > 0 ? true : false);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getBooking();
  }, []);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'booking-data',
    onAfterPrint: () => alert('Print Success')
    

});
  async function OnDelete(id) {
    try {
      const token = localStorage.getItem("Token");

      const response = await axios.delete(
        `https://localhost:44328/api/Booking/Delete/${id}`,
        {
          headers: { Authorization: "Bearer " + token },
        }
      );

      if (response.status === 200) {
        // Booking deleted successfully
        alert("Booking Cancelled successfully");
        getBooking(); // Refresh the booking data after deletion
      } else {
        // Handle other status codes if needed
        alert("Failed to Cancel booking");
      }
    } catch (error) {
      console.error("Error deleting booking:", error);
      // Display an error message to the user
      alert("Failed to Cancel booking");
    }
  }

  
  function OnEdit(b) {
    navigate("/AddBookingDetail", { state: b });
  }
  function onBookNowClick()
  {
    navigate('/BookingPdfPrint');
  }
  const isAdmin = localStorage.getItem("IsAdmin") === "false";
  return (
    
    
    <div>
     
      {isDataAvailable ? (
        <div className="row">
          
          {bookings.map((b, j) => (
            <div className="col-lg-4 col-md-6 mb-4" key={j}>
              <div className="card" width="25%">
                <div className="card-body">
                <div className="card-body" ref={componentRef} margin="20px">
                
                  <h5 className="card-title">Bookings</h5>
                  <p className="card-text">User: {b.userName}</p>
                  
                  <p className="card-text">Check-in: {new Date(b.checkinDate).toLocaleDateString()}</p>
                  <p className="card-text">Check-out: {new Date(b.checkoutDate).toLocaleDateString()}</p>
                  <p className="card-text">Price: {b.bookingPrice}</p>
                  <p className="card-text">Booking Date: {new Date(b.bookingDate).toLocaleDateString()}</p></div>
                  {isAdmin && (
                    <div className="btn-group" role="group">
                      <button
                        type="cancel-button" display= "flex"
                        gap= "10px"  justify-content= "space-between"  
                        margin="20px"
                        onClick={() => {
                          OnDelete(b.bookingId);
                        }}
                        className="btn btn-outline-danger btn-sm"
                      >
                        Cancel
                      </button>
                     
                      
                      <button type="download-button" display= "flex"
                        gap= "10px"  justify-content= "space-between"  
                        margin="20px" onClick={handlePrint} className="btn btn-outline-primary btn-sm">Download</button>

<div>                           
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <h5>Oops! it seems you have not made any bookings yet</h5>
         
        </div>
      )}
       
    </div>
    
  );
}
export function Bookings() {
  const OnClick = () => {
    window.location.href = "/AddBookingDetail";
  };
  const isAdmin = localStorage.getItem("IsAdmin") === "false";
  return (
    <div>
      {isAdmin &&(
      <button onClick={OnClick} className="btn btn-primary ms-4">
        Add New Booking
      </button>
      )}
      <PostBookings />
    </div>
  );
}
/*<p className="card-text">Room: {b.roomId}</p>*/