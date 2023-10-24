import { Link } from "react-router-dom";
import NavLink from "react-bootstrap/NavLink";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./NavBar.css";

function NavBar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/">
          React-Bootstrap
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" id="icon" />
        <Navbar.Collapse id="basic-navbar-nav" className="bg-tertiary">
          <Nav className="me-auto">
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
