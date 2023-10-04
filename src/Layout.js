import { NavLink, Outlet, Link } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";

function Layout() {
 
  const isLoggedIn = Boolean(localStorage.getItem("IsLoggedIn"));
  
  const isAdmin = localStorage.getItem("IsAdmin") === "true";
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Hotel Bookings
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <NavLink
                to="/Home"
                className="nav-link"
                aria-current="page"
                href="#"
              >
                Home
              </NavLink>
              <NavLink to="/Users" className="nav-link" href="#">
               Profile
              </NavLink>
              <NavLink to="/Hotels" className="nav-link" href="#">
                Hotels
              </NavLink>
           
              <NavLink to="/Bookings" className="nav-link" href="#">
                Bookings
              </NavLink>
            </div>
            <div className="ms-auto">
              {Boolean(localStorage.getItem("IsLoggedIn")) ? (
                <span className="nav-link">
                  Welcome {localStorage.getItem("UserName")}
                </span>
              ) : (
                <span />
              )}
              <Link
                to="/login"
                onClick={() => {
                  localStorage.clear();
                }}
                className="nav-link"
                style={{ color: "red" }}
              >
                Logout
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}

export default Layout;
