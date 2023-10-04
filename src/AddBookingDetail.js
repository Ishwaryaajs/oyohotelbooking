import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import hotelImage from "./hotelimages/booking.jpg";
function AddBookingDetail() {
  let location = useLocation();
  let navigate = useNavigate();
  const roomId = useRef();
  const userId = useRef();
  const userName = useRef();
  const checkinDate = useRef();
  const checkoutDate = useRef();
  const bookingDate = useRef();
  const IntitalBookingDetails = {
    roomId: "",
    userId: "",
    userName: "",
    checkinDate: "",
    checkoutDate: "",
    bookingPrice: "",
    bookingDate: "",
  };
  
  const [bookingdetails, setBookingDetails] = useState(IntitalBookingDetails);
  const [bookingPrice, setBookingPrice] = useState(""); 
  const [numberOfDays, setNumberOfDays] = useState(0);
  
  const [systemDate, setSystemDate] = useState("");
  function getSystemDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); 
    const day = String(currentDate.getDate()).padStart(2, "0");
    const hours = String(currentDate.getHours()).padStart(2, "0");
    const minutes = String(currentDate.getMinutes()).padStart(2, "0");
    const systemDateString = `${year}-${month}-${day}T${hours}:${minutes}`;
    setSystemDate(systemDateString);
  }

  useEffect(() => {
    getSystemDate(); 
  }, []);

  function onSubmitClick() {
    alert(
      `Room Id: ${roomId} User Id: ${userId} User Name : ${userName} CheckinDate: ${checkinDate} CheckoutDate: ${checkoutDate} Booking Price: ${bookingPrice} Booking Date:${bookingDate}`
    );
  }

  function handleOnBookingDetailChange(e) {
    let { name, value } = e.target;
    calculateBookingPrice();
    setBookingDetails((prevstate) => {
      return { ...prevstate, [name]: value };
    });
  }
  function OnAddNewBooking() {
    let token = localStorage.getItem("Token");
    let userId = localStorage.getItem("UserId");
    const newBookingDetails = { ...bookingdetails, userId: userId };

    axios
      .post("https://localhost:44328/api/Booking", newBookingDetails, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((response) => {
        alert("Payment succesfully");
        setBookingDetails(IntitalBookingDetails);
      })
      .catch((err) => {
        alert(err.response.data);
        console.log(err);
      });
  }
  useEffect(() => {
    if (Boolean(location.state)) {
      setBookingDetails(location.state);
    }
  }, [location]);
  function OnUpdateBooking() {
    
    let token = localStorage.getItem("Token");
    axios
      .put("https://localhost:44328/api/Booking/Update", bookingdetails, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((response) => {
        alert("Booking Updated Succesfully");
        navigate("/Bookings");
      })
      .catch((err) => {
        alert("Failed to update booking");
      });
  }
  

 
  


  function calculateBookingPrice() {
    const checkin = new Date(checkinDate.current.value);
    const checkout = new Date(checkoutDate.current.value);

    
    const timeDifference = checkout - checkin;
    if(timeDifference != 0){
      const daysDifference = timeDifference / (1000 * 3600 * 24);

      setNumberOfDays(daysDifference);
    const pricePerNight = bookingdetails.roomPrice; 
    const totalPrice = daysDifference * pricePerNight;
    bookingdetails.bookingPrice = totalPrice;
    setBookingPrice(totalPrice);
    }
    else{
      const pricePerNight = bookingdetails.roomPrice; 
      bookingdetails.bookingPrice = pricePerNight;
      setBookingPrice(pricePerNight);
      setNumberOfDays(0);
    }
    
  }
  useEffect(() => {
    calculateBookingPrice();
  }, [bookingdetails.checkinDate, bookingdetails.checkoutDate]);

  return (
    <div className="container mt-5">
      <div className="card col-md-6 mx-auto">
        <div className="row">
          <div className="col-md-6">
            <div className="card-body">
              <h2 className="card-title">Booking Details</h2>
              <form>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="checkinDate">Check-in Date:</label>
                      <input
                        type="date"
                        className="form-control"
                        name="checkinDate"
                        onChange={handleOnBookingDetailChange}
                        ref={checkinDate}
                        value={bookingdetails.checkinDate}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="checkoutDate">Check-out Date:</label>
                      <input
                        type="date"
                        className="form-control"
                        name="checkoutDate"
                        onChange={handleOnBookingDetailChange}
                        ref={checkoutDate}
                        value={bookingdetails.checkoutDate}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="numberOfDays">No of Days:</label>
                      <input
                        type="text"
                        className="form-control"
                        name="numberOfDays"
                        readOnly
                        value={numberOfDays}
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
                        readOnly
                        value={bookingdetails.roomPrice}
                      />
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="bookingPrice">Total Price:</label>
                      <input
                        type="text"
                        className="form-control"
                        name="bookingPrice"
                        readOnly
                        value={bookingdetails.bookingPrice}
                      />
                    </div>
                  </div>
                </div>
                <br/>

                {Boolean(bookingdetails.bookingDate) ? (
                  <button
                    type="button"
                    onClick={OnUpdateBooking}
                    className="btn btn-primary m-2"
                  >
                    Update
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={OnAddNewBooking}
                    className="btn btn-success m-2"
                  >
                    Proceed Payment
                  </button>
                )}
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

export default AddBookingDetail;