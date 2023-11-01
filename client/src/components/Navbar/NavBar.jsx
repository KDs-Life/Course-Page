import { Link } from "react-router-dom";
import NavLink from "react-bootstrap/NavLink";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./NavBar.css";

function NavBar() {
  return (
    <Navbar expand="lg" className="navbar-wrapper" sticky="top">
      <Container className="container-navbar">
        <Navbar.Brand as={Link} to="/" id="navbar-name">
          WAS GEHT!!! CLICK ME 
        </Navbar.Brand >
        <Navbar.Toggle aria-controls="basic-navbar-nav" id="icon" />
        <Navbar.Collapse id="" className="links-container">
          <Nav className="navbar-links">
            <Nav.Link as={Link} to="/activities">
              Kurse
            </Nav.Link>
            <Nav.Link as={Link} to="/login">
              Log-In
            </Nav.Link>
            <Nav.Link as={Link} to="/signup">
              Sign Up
            </Nav.Link>
            <Nav.Link as={Link} to="/profile">
              Profile
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
