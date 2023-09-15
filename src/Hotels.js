import {React,useState, useEffect,useRef } from 'react';
import axios from 'axios';

import { Link,useNavigate } from 'react-router-dom'
import './Hotels.css';
import hotelImage1 from './hotelimages/bangogk hotel.jpg';
import hotelImage2 from './hotelimages/even hotels.jpg';
import hotelImage3 from './hotelimages/rabai hotel.jpg';
import hotelImage4 from './hotelimages/Luxuxy hotel.jpg';
import hotelImage5 from './hotelimages/samhi hotel.jpg';
import hotelImage6 from './hotelimages/hut hotel.jpg';
import hotelImage7 from './hotelimages/lovehotel.jpg';
import hotelImage8 from './hotelimages/park hotel.jpg';
export function PostHotels()
{
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
    useEffect(()=>
    {   getHotel();
    }, [])
    function OnDelete(id) {
      axios.delete("https://localhost:44328/api/Hotel/Delete/" + id)
        .then((response) => {
          alert(' Hotel deleted succesfully');
          getHotel();
  
        })
        .catch((err) => { alert('Failed to delete Hotel') })
    }
  
    function OnEdit(k) {
      navigate('/AddHotelDetail', { state: k });
}
    function onBookNowClick() {
      
      navigate(`/Rooms`);
    }
    const isAdmin = localStorage.getItem("IsAdmin") === "false";
    return (
      <div className="row">
        {hotels.map((hotel, index) => (
          <div key={index} className="col-lg-4 col-md-6 mb-4">
            <div className="card h-100">
              <img
                src={index === 0 ? hotelImage1 : index === 1 ? hotelImage2 : index === 2 ? hotelImage3 : index===3?hotelImage4: index===4? hotelImage5:index===5?hotelImage6:index===6?hotelImage7:hotelImage8} // Use the imported images
                className="card-img-top hotel-image"
                alt={hotel.hotelName}
              />
              <div className="card-body">
                <h5 className="card-title">{hotel.hotelName}</h5>
                <p className="card-text">
                  <strong>Address:</strong> {hotel.hotelAddress}, {hotel.hotelCity}, {hotel.hotelState}, {hotel.hotelCountry}
                  <br />
                  <strong>Rating:</strong> {hotel.hotelRating}
                </p>
              </div>
              <div className="card-footer">
                {isAdmin && (
                  <button
                    type="button"
                    onClick={() => onBookNowClick(hotel.hotelId)}
                    className="btn btn-outline-primary btn-sm"
                  >
                    View Details
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
                }
  
  
  
  
  
  
export function Hotels()
{
  const OnClick=()=>
  {
    window.location.href="/AddHotelDetail";
  }
  const isAdmin = localStorage.getItem("IsAdmin") === "true";
  return(
    <div>
      {isAdmin &&(
      
      <button onClick={OnClick} className="btn btn-primary ms-4">Add New Hotel</button>
      )}
      <PostHotels/>
    </div>
  );
}
/*<button type="button" onClick={() => { OnDelete(k.hotelId) }} className="btn btn-outline-danger btn-sm">Delete</button>
            <button type="button" onClick={() => { OnEdit(k) }} className="btn btn-outline-success btn-sm ms-1">Edit</button>*/