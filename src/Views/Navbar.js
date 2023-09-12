import React from "react";
import { BrowserRouter, Link } from "react-router-dom"
import { useLocation } from "react-router-dom";

const Navbar = () => {
    const navbarStyle = {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center', // Vertically center content
      };
    //   const location = useLocation();
    //   const { pathname } = location;
    //   const splitLocation = pathname.split("/");
    return (
        
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="/">Project</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <a className="nav-link" href="/">Home <span className="sr-only"></span></a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="/">About</a>
                        </li>
                    </ul>
                    <div style={navbarStyle}>
                    <Link to="/login" className="btn btn-primary">
                     Login
                  </Link>
                  <Link to="/register" className="btn btn-primary">
                   Register
                 </Link>
                 </div>
                    {/* <div>
                        <button  className="btn btn-primary">Login</button>                
                    </div>
                    <div>
                        <button  className="btn btn-primary">Register</button>                
                    </div> */}

                    {/* <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form> */}
                </div>
            </nav>
        </div>
    )
}
export default Navbar;
