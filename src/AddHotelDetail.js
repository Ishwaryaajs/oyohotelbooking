import { useState, useRef,useEffect } from "react";
import axios from "axios";

import { useLocation, useNavigate } from 'react-router-dom';
function AddHotelDetail() {
    let location = useLocation();
    let navigate = useNavigate();
    const hotelName = useRef();
    const hotelAddress = useRef();
    const hotelState = useRef();
    const hotelCity = useRef();
    const hotelCountry = useRef();
    const hotelRating = useRef();
    const IntitalHotelDetails={hotelName:"", hotelAddress:"",hotelState:"",hotelCity:"",hotelCountry:"",hotelRating:""};
    const [hoteldetails, setHotelDetails] = useState(IntitalHotelDetails);
    function onSubmitClick() {
        alert(`Hotel Name: ${hotelName.current.value} Hotel Address: ${hotelAddress.current.value} Hotel state: ${hotelState} Hotel City:${hotelCity} Hotel Country:${hotelCountry}`);
    }
    function handleOnHotelDetailChange(e) {
        let { name, value } = e.target;
        setHotelDetails((prevstate) => {
            return ({ ...prevstate, [name]: value })
        })

    }
    function OnAddNewHotel() {
        
    let token = localStorage.getItem("Token");
        axios.post('https://localhost:44328/api/Hotel', hoteldetails, {
            headers: { Authorization: "Bearer " + token },})
            .then((response) => {
                alert('New hotel added succesfully');
                setHotelDetails(IntitalHotelDetails);
            })
            .catch((err) => { alert('Failed to add new hotel') })
    }
    useEffect(() => {


        if (Boolean(location.state)) {
            setHotelDetails(location.state);

        }



    }, [location])
    function OnUpdateHotel() {
        axios.put('https://localhost:44328/api/Hotel/Update', hoteldetails)
            .then((response) => {
                alert(' hotel Updated succesfully');
                navigate('/Hotels');
            })
            .catch((err) => { alert('Failed to update Hotel') })
    }
    return (
        <div>
            <h2>Hotel Details</h2>
            <form onSubmit={onSubmitClick}>
                <label name="hotelName">Enter Name</label>
                <input type="text" name="hotelName" onChange={handleOnHotelDetailChange} ref={hotelName} value={hoteldetails.hotelName} />
                <br />
                <br />
                <label name="hotelAddress">Enter Address</label>
                <input type="textarea" name="hotelAddress" onChange={handleOnHotelDetailChange} ref={hotelAddress} value={hoteldetails.hotelAddress} />
                <br />
                <br />
                <label name="hotelState">Enter State</label>
                <input type="text" name="hotelState" onChange={handleOnHotelDetailChange} ref={hotelState} value={hoteldetails.hotelState} />
                <br />
                <br />
                <label name="hotelCity">Enter city</label>
                <input type="text" name="hotelCity" onChange={handleOnHotelDetailChange} ref={hotelCity} value={hoteldetails.hotelCity} />
                <br />
                <br />
                <label name="hotelCountry">Enter Country</label>
                <input type="text" name="hotelCountry" onChange={handleOnHotelDetailChange} ref={hotelCountry} value={hoteldetails.hotelCountry}/>
                <br />
                <br />
                <label name="hotelRating">Enter Rating</label>
                <input type="text" name="hotelRating" onChange={handleOnHotelDetailChange} ref={hotelRating} value={hoteldetails.hotelRating}/>
                <br />
                <br />
                {Boolean(location.state)
                    ? <button type="button" onClick={OnUpdateHotel} className="btn-btn-success">Update</button>
                    : <button type="button" onClick={OnAddNewHotel} className="btn-btn-success">Add Hotel</button>
                }
             
            </form>
        </div>
    );
}
export default AddHotelDetail;