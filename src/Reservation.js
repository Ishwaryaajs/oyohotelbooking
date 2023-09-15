import React ,{useState} from "react";
import {PostHotels,Hotels} from './Hotels';
import {PostRooms,Rooms} from './Rooms';

function Reservation() {
    const [hotels, sethotels] = useState([]);
    const [rooms, setrooms] = useState([]);
    
  return (
    <div>
      <h1>Hotel Reservations</h1>
      {hotels.map((hotel) => (
        <div key={hotel.id} className="hotel-card">
          <h2>{hotel.hotelName}</h2>
          <div className="room-cards">
            {rooms
              .filter((room) => room.hotelId === hotel.id)
              .map((room) => (
                <div key={room.id} className="room-card">
                  <h3>Room Type: {room.roomType}</h3>
                  <p>Capacity: {room.capacity}</p>
                  <p>Price: ${room.price}</p>
                  <div className="buttons">
                    <button onClick={() => confirmReservation(hotel, room)}>
                      Confirm
                    </button>
                    <button onClick={() => cancelReservation(hotel, room)}>
                      Cancel
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function confirmReservation(hotel, room) {
  // Implement the confirm logic here
  console.log(`Confirmed reservation for ${room.roomType} at ${hotel.hotelName}`);
}

function cancelReservation(hotel, room) {
  // Implement the cancel logic here
  console.log(`Canceled reservation for ${room.roomType} at ${hotel.hotelName}`);
}

export default Reservation;