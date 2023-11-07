import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { useAuth } from "../../context/AuthContext";
import axios from "../../api/axiosPrivate";
import "./NavBar.css";

function NavBar() {
  const [colorChange, setColorchange] = useState(false);
  const navigate = useNavigate();
  const { setAuthUser, isLoggedIn, setIsLoggedIn, setToken, setRole } =
    useAuth();
  const changeNavbarColor = () => {
    if (window.scrollY >= 80) {
      setColorchange(true);
    } else {
      setColorchange(false);
    }
  };
  window.addEventListener("scroll", changeNavbarColor);

  const handleLogout = () => {
    try {
      const response = axios.get("/logout", {
        headers: { "Content-type": "application/json" },
        withCredentials: true,
      });
      setAuthUser("");
      setIsLoggedIn(false);
      setToken((curr) => (curr = ""));
      setRole((curr) => (curr = ""));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Navbar
      expand="lg"
      className={colorChange ? "navbar-wrapper colorChange" : "navbar-wrapper"}
      sticky="top"
    >
      <Container>
        <Navbar.Brand as={Link} to="/" id="navbar-name">
          SkiCourseBooking
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" id="icon" />
        <Navbar.Collapse id="" className="links-container">
          <Nav className="navbar-links">
            <Nav.Link as={Link} to="/activities">
              Kurse
            </Nav.Link>
            {!isLoggedIn && (
              <>
                <Nav.Link as={Link} to="/login">
                  Log-In
                </Nav.Link>
                <Nav.Link as={Link} to="/signup">
                  Sign Up
                </Nav.Link>
              </>
            )}
            {isLoggedIn && (
              <>
                <Nav.Link as={Link} to="/profile">
                  Profile
                </Nav.Link>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
