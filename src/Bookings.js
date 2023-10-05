import { React, useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import "bootstrap/dist/css/bootstrap.min.css";
import hotelImage from './hotelimages/Nobookings.jpg';
import backgroundImage from './hotelimages/reservedpict.jpg';

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
        
        alert("Booking Cancelled successfully");
        getBooking(); 
      } else {
       
        alert("Failed to Cancel booking");
      }
    } catch (error) {
      console.error("Error deleting booking:", error);
      
      alert("Failed to Cancel booking");
    }
  }

  async function updateBookingStatus(bookingId, status) {
    try {
      const token = localStorage.getItem("Token");
      let inputData = { BookingId: bookingId, IsApproved: status };
      
      const response = await axios({
        url: `https://localhost:44328/api/Booking/UpdateStatus`,
        method: "PUT",
        data: inputData ? inputData : {},
        headers: { Authorization: "Bearer " + token },
      });

      if (response.status === 200) {
        alert(`Booking ${status ? "Approved" : "Rejected"} successfully`);
        getBooking();
      } else {
        alert(`Failed to ${status ? "approve" : "reject"} booking`);
      }
    } catch (error) {
      console.log(error);
      console.error(
        `Error ${status ? "approving" : "rejecting"} booking:`,
        error
      );

      alert("Failed to update booking status");
    }
   
  }
  function OnEdit(item) {
    navigate("/AddBookingDetail", { state: item });
  }

  function OnReject() {
    alert("Booking rejected");
  }

  function onBookNowClick() {
    navigate("/BookingPdfPrint");
  }
  const isAdmin = localStorage.getItem("IsAdmin") === "false";
  const isApproved = localStorage.getItem("IsApproved") === "true";
  const cardStyle={
    border: '1px solid #ccc', 
      borderRadius: '5px',
      margin: '10px',
      padding: '10px',
      backgroundImage: `url(${backgroundImage})`, 
      backgroundSize: 'cover',
      
  }
  return (
    <div>
      {isDataAvailable ? (
        <div className="row">
          {bookings.map((b, j) => (
            <div className="col-lg-4 col-md-6 mb-4" key={j}>
              <div className="card" width="25%" style={cardStyle}>
                <div className="card-body">
                  <div className="card-body" ref={componentRef} margin="20px">
                    <h5 className="card-title">Bookings</h5>
                    <p className="card-text">User: {b.userName}</p>
                    <p className="card-text">HotelName: {b.hotelName}</p>
                    <p className="card-text">HotelAddress: {b.hotelAddress}</p>
                    <p className="card-text">RoomType: {b.roomType}</p>

                    <p className="card-text">
                      Check-in: {new Date(b.checkinDate).toLocaleDateString()}
                    </p>
                    <p className="card-text">
                      Check-out: {new Date(b.checkoutDate).toLocaleDateString()}
                    </p>
                    <p className="card-text">RoomPrice: {b.roomPrice}</p>
                    <p className="card-text">TotalPrice: {b.bookingPrice}</p>
                    <p className="card-text">
                      Booking Date:{" "}
                      {new Date(b.bookingDate).toLocaleDateString()}
                    </p>
                    
                    
                    {isAdmin && (
                      <p className="card-text">
                        Status:
                        {b.isApproved && (
                          <span className="badge bg-success">Confirmed</span>
                        )}
                        {!b.isApproved && (
                          <span className="badge bg-danger">Not Confirmed</span>
                        )}
                      </p>
                    )}
                  </div>

                  {!isAdmin && (
                    <div className="btn-group">
                      <button
                        type="Approve-button"
                        display="flex"
                        margin="20px"
                        onClick={() => {
                          updateBookingStatus(b.bookingId, true); 
                        }}
                        className="btn btn-outline-success btn-sm m-2"
                      >
                        Approve
                      </button>

                      <button
                        type="Reject-button"
                        display="flex"
                        margin="20px"
                        onClick={() => {
                          updateBookingStatus(b.bookingId, false); 
                        }}
                        className="btn btn-outline-danger btn-sm m-2"
                      >
                        Reject
                      </button>
                      <button
                        type="Schedule-button"
                        onClick={() => {
                          OnEdit(b);
                        }}
                        className="btn btn-outline-primary btn-sm m-2"
                      >
                        Schedule
                      </button>
                    </div>
                  )}

                  {isAdmin && (
                    <div className="btn-group" role="group">
                      <button
                        type="cancel-button"
                        display="flex"
                        gap="10px"
                        justify-content="space-between"
                        margin="20px"
                        onClick={() => {
                          OnDelete(b.bookingId);
                        }}
                        className="btn btn-outline-danger btn-sm m-2"
                      >
                        Cancel
                      </button>

                      <button
                        type="download-button"
                        display="flex"
                        gap="10px"
                        justify-content="space-between"
                        margin="20px"
                        onClick={handlePrint}
                        className="btn btn-outline-primary btn-sm m-2"
                      >
                      
                        Download
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        
        <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '80vh', 
        }}
      >
        <img
          src={hotelImage} 
          alt="No bookings available"
          style={{ maxWidth: '100%', maxHeight: '80vh' }} 
        />
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
      <PostBookings />
    </div>
  );
}
/*<p className="card-text">Room: {b.roomId}</p>*/
/* {isAdmin &&(
      <button onClick={OnClick} className="btn btn-primary ms-4">
        Add New Booking
      </button>
      )}*/
      /* <p className="card-text">HotelName: {b.hotelName}</p>
                    <p className="card-text">HotelAddress: {b.hotelAddress}</p>
                    <p className="card-text">RoomType: {b.roomType}</p>*/