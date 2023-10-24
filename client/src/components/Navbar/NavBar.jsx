import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./NavBar.css"

function NavBar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary"  >
      <Container>
        <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" id="icon"/>
        <Navbar.Collapse id="basic-navbar-nav" className="bg-tertiary" >
          <Nav className="me-auto">
            <Nav.Link href="/activities">Kurse</Nav.Link>
            <Nav.Link href="/login">Log-In</Nav.Link>
            <Nav.Link href="/signup">Sign Up</Nav.Link>
            <Nav.Link href="/profile">Profile</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
