import { React, useState, useEffect, useRef } from 'react';
import axios from 'axios';
import RatingStars from './RatingStars';
import './RatingStars.css';

import { Link, useNavigate } from 'react-router-dom'
import './Hotels.css';
import hotelImage1 from './hotelimages/bangogk hotel.jpg';
import hotelImage2 from './hotelimages/even hotels.jpg';
import hotelImage3 from './hotelimages/rabai hotel.jpg';
import hotelImage4 from './hotelimages/Luxuxy hotel.jpg';
import hotelImage5 from './hotelimages/samhi hotel.jpg';
import hotelImage6 from './hotelimages/hut hotel.jpg';
import hotelImage7 from './hotelimages/lovehotel.jpg';
import hotelImage8 from './hotelimages/park hotel.jpg';
import hotelImage9 from './hotelimages/hotel3.jpg';
import hotelImage10 from './hotelimages/hotelimg.jpg';
import hotelImage11 from './hotelimages/hotelimg2.jpg';
export function PostHotels() {
  const [hotels, sethotels] = useState([]);

  let navigate = useNavigate();

  const getHotel = async () => {
    try {

      let token = localStorage.getItem("Token");
      let inputData = undefined;
      const response = await axios({
        url: "https://localhost:44328/api/Hotel/GetHotels",
        method: "GET",
        params: inputData ? inputData : {},
        headers: { Authorization: "Bearer " + token },
      });
      const data = response.data;
      sethotels(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }

  };
  useEffect(() => {
    getHotel();
  }, [])
  async function OnDelete(id) {
    try {
      const token = localStorage.getItem("Token");
      const response = await axios.delete(
        `https://localhost:44328/api/Hotel/Delete/${id}`,
        { headers: { Authorization: "Bearer " + token } }
      );
  
      console.log("Delete Response:", response); 
  
      if (response.status === 200) {
        alert('Hotel deleted successfully');
        getHotel();
      } else {
        alert("Failed to delete Hotel");
      }
    } catch (error) {
      console.error("Error Deleting Hotel", error);
      alert("Failed to delete hotel");
    }
  }
  

  function OnEdit(k) {
    navigate('/AddHotelDetail', { state: k });
  }
  function setSelectedHotelId(id) {
    navigate("/Rooms/" + id);
  }
  const isAdmin = localStorage.getItem("IsAdmin") === "false";
  const cardStyle = {
    border: '1px solid #ccc',
    borderRadius: '5px',
    margin: '10px',
    padding: '10px',

  }
  return (
    <div className="row">
      {hotels.map((hotel, index) => (
        <div key={index} className="col-lg-4 col-md-6 mb-4">
          <div className="card h-100" style={cardStyle}>
            <img
              src={index === 0 ? hotelImage1 : index === 1 ? hotelImage2 : index === 2 ? hotelImage3 : index === 3 ? hotelImage4 : index === 4 ? hotelImage5 : index === 5 ? hotelImage6 : index === 6 ? hotelImage7 : index === 7 ? hotelImage8 : index === 9 ? hotelImage8
                : index === 10 ? hotelImage9 : index === 11 ? hotelImage10 : hotelImage11}
              className="card-img-top hotel-image"
              alt={hotel.hotelName}
            />
            <div className="card-body">
              <h5 className="card-title">{hotel.hotelName}</h5>
              <p className="card-text">
                <strong>Address:</strong> {hotel.hotelAddress}, {hotel.hotelCity}, {hotel.hotelState}, {hotel.hotelCountry}
                <br />
                <strong>Rating: <RatingStars rating={hotel.hotelRating} /></strong>
              </p>
            </div>
            <div className="card-footer">

              <button
                type="button"
                onClick={() => setSelectedHotelId(hotel.hotelId)}
                className="btn btn-outline-primary btn-sm m-2"
              >
                View Details
              </button>
              {!isAdmin && (
              <div className="btn-group" role="group">
                <button type="cancel-button"
                onClick={() => { OnDelete(hotel.hotelId) }}
                className="btn btn-outline-danger btn-sm">Delete
              </button>
             </div> )}


            </div>
          </div>
        </div>
      ))}
    </div>
  );
}






export function Hotels() {
  const OnClick = () => {
    window.location.href = "/AddHotelDetail";
  }
  const isAdmin = localStorage.getItem("IsAdmin") === "true";
  return (
    <div>
      {isAdmin && (

        <button onClick={OnClick} className="btn btn-primary ms-4">Add New Hotel</button>
      )}
      <PostHotels />
    </div>
  );
}
