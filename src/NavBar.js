import React from "react";
import "./NavBar.css";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";

import "./NavBar.css";
/* NavBar Component
  Links to:
  * /companies
  * /companies/:handle
  * /jobs
  * /login
  * /signup
  * /profile

*/
function NavBar({logout, currUser}) {

    const handleLogout = () => {
        logout();
    }
  
  return (
    <div>
      <Navbar expand="md">
        <NavLink exact to="/" className="navbar-brand">
          Welcome to Jobly
        </NavLink>
        <Nav className="ml-auto" navbar>
            {currUser && (
                <>
            <NavItem>
            <NavLink to="/companies">Companies</NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/jobs">Jobs</NavLink>
            </NavItem>
            <NavItem>
            <NavLink to="/profile">Profile</NavLink>
          </NavItem>
          <NavItem>
            <button onClick={handleLogout}>Logout</button>
          </NavItem>
          </>
            )}
            {!currUser && (
                <>
                <NavItem>
                <NavLink to="/login">Login</NavLink>
                </NavItem>
                <NavItem>
          <NavLink to="/signup">Sign up</NavLink>
        </NavItem>
        </>
                )}

        </Nav>
      </Navbar>
    </div>
  );
}

export default NavBar;
