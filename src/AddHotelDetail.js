import { useState, useRef, useEffect } from "react";
import axios from "axios";
import hotelImage from "./hotelimages/hoteladd.jpg";
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
    const IntitalHotelDetails = { hotelName: "", hotelAddress: "", hotelState: "", hotelCity: "", hotelCountry: "", hotelRating: "" };
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
            headers: { Authorization: "Bearer " + token },
        })
            .then((response) => {
                alert('New hotel added succesfully');
                setHotelDetails(IntitalHotelDetails);
                navigate('/Hotels');
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
        <div className="container mt-5">
            <div className="card col-md-6 mx-auto">
                <div className="row">
                    <div className="col-md-6">
                        <div className="card-body">
                            <h2 className="card-title">Hotel Details</h2>
                            <form>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="hotelName">Enter Name:</label>
                                            <input type="text" name="hotelName" id="hotelName" className="col-md-18" onChange={handleOnHotelDetailChange} ref={hotelName} value={hoteldetails.hotelName} />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="hotelAddress">Enter Address:</label>
                                            <input type="textarea" name="hotelAddress" id="hotelAddress" className="col-md-18" onChange={handleOnHotelDetailChange} ref={hotelAddress} value={hoteldetails.hotelAddress} />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="hotelState">Enter State:</label>
                                            <input type="text" name="hotelState" id="hotelState" className="col-md-18" onChange={handleOnHotelDetailChange} ref={hotelState} value={hoteldetails.hotelState} />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="hotelCity">Enter City:</label>
                                            <input type="text" name="hotelCity" id="hotelCity" className="col-md-18" onChange={handleOnHotelDetailChange} ref={hotelCity} value={hoteldetails.hotelCity} />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="hotelCountry">Enter Country:</label>
                                            <input type="text" name="hotelCountry" id="hotelCountry" className="col-md-18" onChange={handleOnHotelDetailChange} ref={hotelCountry} value={hoteldetails.hotelCountry} />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="hotelRating">Enter Rating:</label>
                                            <input type="text" name="hotelRating" id="hotelRating" className="col-md-18" onChange={handleOnHotelDetailChange} ref={hotelRating} value={hoteldetails.hotelRating} />
                                        </div>
                                    </div>
                                </div>
                                <br />
                                {Boolean(location.state)
                                    ? <button type="button" onClick={OnUpdateHotel} className="btn btn-primary">Update</button>
                                    : <button type="button" onClick={OnAddNewHotel} className="btn btn-primary">Add Hotel</button>
                                }
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
export default AddHotelDetail;