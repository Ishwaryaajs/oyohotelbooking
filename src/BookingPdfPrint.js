import React, { useRef,useState,useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const BookingPdfPrint = () => {
    const [bookings, setbookings] = useState([]);
    const[isDataAvailable,setDataAvailable]=useState(false);
    const componentRef = useRef();
    let navigate = useNavigate();
    const getBooking = async () => {
   
        try {
         
         let token = localStorage.getItem("Token");
         let UserId = localStorage.getItem("UserId");
         let IsAdmin = localStorage.getItem("IsAdmin");
         let inputData = { userId: UserId, IsAdmin: IsAdmin };
         const response = await axios({
           url: "https://localhost:44328/api/Booking/GetBookings",
           method: "GET",
           params: inputData ? inputData : {},
           headers: { Authorization: "Bearer " + token },
         });
           const data = response.data;
           setbookings(data);
           setDataAvailable(data.Length>0?true:false)
           console.log(data);
         } catch (error) {
           console.log(error);
         }
      };
      useEffect(() => {
        getBooking();
      }, [])
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
        documentTitle: 'booking-data',
        onAfterPrint: () => alert('Print Success')
        

    });
    return (
        <>
            <div ref={componentRef} style={{ width: '100%', height: window.innerHeight }}>
                <h1 className="text-center my-3 border py-2">Bookings</h1>
                <table border='2' className="table table-light w-75  m-4">
                    <thead>
                        <tr>
                            
                            <th className='p-1'>RoomId</th>
                            <th className='p-1'>CheckinDate</th>
                            <th className='p-1'>CheckOutDate</th>
                            <th className='p-1'>Booking Price</th>
                            <th className='p-1'>Booking Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        {bookings.map((b, j) => {
                            return <tr key={j} value={b}>

                                
                                <td className='p-1'>{b.roomId}</td>
                                <td className='p-1'>{new Date(b.checkinDate).toLocaleDateString()}</td>
                                <td className='p-1'>{new Date(b.checkoutDate).toLocaleDateString()}</td>
                                <td className='p-1'>{b.bookingPrice}</td>
                                <td className='p-1'>{new Date(b.bookingDate).toLocaleDateString()}</td>
                                </tr>;
                        })}
                            </tbody>
                </table>
                <button onClick={handlePrint} className="btn btn-primary ms-4">Download</button>


            </div>
            


        </>
    );
}
export default BookingPdfPrint;