import React from "react";
import hotelImage from "./hotelimages/luxury bedroom.jpg"; // Import the image

export default function Home() {
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "80vh",
    backgroundColor:"rgba(0, 0, 0.5, 0)",
    overflow: "hidden",
    background: `url(${hotelImage}) center/cover`, // Center the image and cover the entire container
  };

  return (
    <div className="mt-5 pt-5" style={containerStyle}>
      <h1
        style={{
          fontFamily: "timesnewroman",
          fontSize: "4rem",
          color: "white",
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjusted background color for better image visibility
          padding: "15px",
          fontWeight: "bold",
          textAlign: "center", // Center the text horizontally
          maxWidth: "80%", // Limit text width for readability
        }}
      >
        Welcome to Hotel Bookings<br></br>
        Discover a world of comfort and luxury at our hotel.
      </h1>
    </div>
  );
}
