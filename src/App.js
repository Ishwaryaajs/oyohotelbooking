
import './App.css';
import React from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

import Home from './Home';
import { Users } from './Users';
import { Hotels } from './Hotels';
import { Bookings } from './Bookings';
import { Rooms } from './Rooms';
import Reservation from './Reservation';

import Layout from './Layout';
import AddUserDetail from './AddUserDetail';
import AddHotelDetail from './AddHotelDetail';
import AddBookingDetail from './AddBookingDetail';
import AddRoomDetail from './AddRoomDetail';
import Login from './login';
import SignUpForm from './SignUpForm';
function App() {
  

  
  return (
    <Routes>
      <Route path="/Login" element={<Login />}></Route>
      <Route path="/SignUpForm" element={<SignUpForm />}></Route>
      <Route path="/" element={<Layout />}>
        
        <Route path="/Home" element={<Home />}></Route>
        
        <Route path="/Users" element={<Users />}></Route>
        <Route path="/AddBookingDetail/update" component={AddBookingDetail} />

        <Route path="/AddUserDetail" element={<AddUserDetail />}></Route>
        <Route path="/Hotels" element={<Hotels />}></Route>
        <Route path="/Rooms" element={<Rooms />}> </Route>
        <Route path="/Rooms/:id" element={<Rooms />}> </Route>
        
        <Route path="/Reservation" element={<Reservation />} /> 
        
        <Route path="/AddHotelDetail" element={<AddHotelDetail />}></Route>

        <Route path="/Bookings" element={<Bookings />}></Route>
        <Route path="/AddBookingDetail" element={<AddBookingDetail />}></Route>
       

        
        <Route path="/AddRoomDetail" element={<AddRoomDetail />}></Route>



      </Route>




    </Routes>


  );
}

export default App;
//<Route path="/AddUserDetail" element={<AddUserDetail />}></Route>
// <Route path="/AddUserDetail" element={<AddUserDetail />}></Route> 



