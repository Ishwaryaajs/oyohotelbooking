import { NavLink, Outlet, Link } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';

function Layout() {
    // if(!localStorage.getItem('IsLoggedIn'))
    // {
    //     return redirect("/login");
    // }
   
    return (
        <div>

            <nav className="navbar navbar-expand-lg bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Hotel Bookings</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <NavLink to="/Home" className="nav-link" aria-current="page" href="#">Home</NavLink>
                            <NavLink to="/Users" className="nav-link" href="#">Users</NavLink>




                            <NavLink to="/Hotels" className="nav-link" href="#">Hotels</NavLink>

                            <NavLink to="/Rooms" className="nav-link" href="#">Rooms</NavLink>
                            <NavLink to="/Bookings" className="nav-link" href="#">Bookings</NavLink>
                           



                        </div>
                        <div className="ms-auto">
                           
                            <Link to="/login" onClick={() => { localStorage.clear() }} className="nav-link" style={{ color: 'red' }}>Logout</Link>
                        </div>
                        
                    </div>
                </div>
            </nav>

            <Outlet />

        </div>
    );
}




export default Layout;