import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

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
  const [bookingPrice, setBookingPrice] = useState(""); // Added state for booking price
  const [systemDate, setSystemDate] = useState("");
  function getSystemDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Add 1 to month because it's 0-based
    const day = String(currentDate.getDate()).padStart(2, "0");
    const hours = String(currentDate.getHours()).padStart(2, "0");
    const minutes = String(currentDate.getMinutes()).padStart(2, "0");
    const systemDateString = `${year}-${month}-${day}T${hours}:${minutes}`;
    setSystemDate(systemDateString);
  }

  useEffect(() => {
    getSystemDate(); // Get the system date when the component mounts
  }, []);

  function onSubmitClick() {
    alert(
      `Room Id: ${roomId} User Id: ${userId} User Name : ${userName} CheckinDate: ${checkinDate} CheckoutDate: ${checkoutDate} Booking Price: ${bookingPrice} Booking Date:${bookingDate}`
    );
  }

  function handleOnBookingDetailChange(e) {
    let { name, value } = e.target;

    setBookingDetails((prevstate) => {
      return { ...prevstate, [name]: value };
    });
  }
  function OnAddNewBooking() {
    let token = localStorage.getItem("Token");
   // const newBookingDetails = { ...bookingdetails, bookingDate: systemDate };

    axios
      .post("https://localhost:44328/api/Booking", bookingdetails, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((response) => {
        alert("New Booking added succesfully");
        setBookingDetails(IntitalBookingDetails);
      })
      .catch((err) => {
        alert("Failed to add new booking");
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
      .put("https://localhost:44328/api/Booking/Update", bookingdetails,{
        headers: { Authorization: "Bearer " + token },})
      .then((response) => {
        alert(" bookings Updated succesfully");
        navigate("/Bookings");
      })
      .catch((err) => {
        alert("Failed to update booking");
      });
  }

  // Function to calculate booking price based on selected check-in and check-out dates
  function calculateBookingPrice() {
    const checkin = new Date(checkinDate.current.value);
    const checkout = new Date(checkoutDate.current.value);

    // Calculate the difference in days
    const timeDifference = checkout - checkin;
    const daysDifference = timeDifference / (1000 * 3600 * 24);

    // Calculate booking price based on your pricing logic
    const pricePerNight = 450; // You can change this to your actual price
    const totalPrice = daysDifference * pricePerNight;

    setBookingPrice(totalPrice);
  }

  // Call calculateBookingPrice whenever check-in or check-out date changes
  useEffect(() => {
    calculateBookingPrice();
  }, [bookingdetails.checkinDate, bookingdetails.checkoutDate]);

  

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title">Booking Details</h2>
          <form>
            <div className="form-group">
              <label htmlFor="roomId">Room Id</label>
              <input
                type="text"
                className="form-control"
                name="roomId"
                onChange={handleOnBookingDetailChange}
                ref={roomId}
                value={bookingdetails.roomId}
              />
            </div>
            <div className="form-group">
              <label htmlFor="userId">User Id</label>
              <input
                type="text"
                className="form-control"
                name="userId"
                onChange={handleOnBookingDetailChange}
                ref={userId}
                value={bookingdetails.userId}
              />
            </div>
            <div className="form-group">
              <label htmlFor="userName">User Name</label>
              <input
                type="text"
                className="form-control"
                name="userName"
                onChange={handleOnBookingDetailChange}
                ref={userName}
                value={bookingdetails.userName}
              />
            </div>
            <div className="form-group">
              <label htmlFor="checkinDate">Check-in Date</label>
              <input
                type="datetime-local"
                className="form-control"
                name="checkinDate"
                onChange={handleOnBookingDetailChange}
                ref={checkinDate}
                value={bookingdetails.checkinDate}
              />
            </div>
            <div className="form-group">
              <label htmlFor="checkoutDate">Check-out Date</label>
              <input
                type="datetime-local"
                className="form-control"
                name="checkoutDate"
                onChange={handleOnBookingDetailChange}
                ref={checkoutDate}
                value={bookingdetails.checkoutDate}
              />
            </div>
            <div className="form-group">
              <label htmlFor="bookingPrice">Booking Price</label>
              <input
                type="text"
                className="form-control"
                name="bookingPrice"
                readOnly
                value={bookingPrice}
              />
            </div>
            <div className="form-group">
              <label htmlFor="bookingDate">Booking Date</label>
              <input
                type="datetime-local"
                className="form-control"
                name="bookingDate"
                readOnly
                value={systemDate}
              />
            </div>
            {Boolean(location.state) ? (
              <button
                type="button"
                onClick={OnUpdateBooking}
                className="btn btn-primary"
              >
                Update
              </button>
            ) : (
              <button
                type="button"
                onClick={OnAddNewBooking}
                className="btn btn-primary"
              >
                Add Booking
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddBookingDetail;
