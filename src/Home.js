import React from "react";
import hotelImage from "./hotelimages/lobby.jpg";

export default function Home() {
  const containerStyle = {
    display: "flex",
    flexDirection: "row",
    height: "80vh", 
    backgroundColor: "rgba(0, 0, 0, 0)",
    overflow: "hidden",
  };

  const leftHalfStyle = {
    flex: 1,
    background: `url(${hotelImage}) left/cover no-repeat`,
  };

  const rightHalfStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };

  const sectionStyle = {
    padding: "20px",
    textAlign: "center",
    color: "white",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    margin: "10px",
    borderRadius: "5px",
    font:"timesnewroman",
  };

  return (
    <div className="mt-5 pt-5" style={containerStyle}>
      <div style={leftHalfStyle}></div>
      <div style={rightHalfStyle}>
        <div style={sectionStyle}>
          <h2>About</h2>
          <p>
            Welcome to Hotel Bookings. Discover a world of comfort and luxury at our hotel.
            We offers you a privileged experience combining comfort and conviviality. 
          </p>
        </div>
        <div style={sectionStyle}>
          <h2>Services</h2>
          <p>
            We offer a wide range of services to make your stay enjoyable and relaxing.
            Whether you are a backpacker, a solo traveler or with your family, our hotel with top-of-the-range service will meet all your expectations.
          </p>
        </div>
        <div style={sectionStyle}>
          <h2>Explore</h2>
          <p>
          The world is full of darkness and obstacles, and sometimes, all one needs is a get away.
          There are many places to go and hotels are great destinations that one can go to relax and re-evaluate their options.
          Explore our local attractions and activities during your stay with us.
          </p>
        </div>
      </div>
    </div>
  );
}
