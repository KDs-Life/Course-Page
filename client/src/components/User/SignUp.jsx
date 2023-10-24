import { useState } from "react";
import axios from "axios"; // Importiere Axios
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import "./SignUp.css";

function SignUp() {
  const [newUser, setNewUser] = useState({
    email: "",
    firstname: "",
    lastname: "",
    password: "",
    confirmPassword: "",
    address: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/signup", newUser) //Backend beachten!!!!!!!
      .then((response) => {
        console.log("Hallo", response.data);
        alert("User created");
        setNewUser({
          email: "",
          firstname: "",
          lastname: "",
          password: "",
          confirmPassword: "",
          address: "",
        });
      })
      .catch((error) => {
        console.error("Error", error);
        if (error.response) {
          console.log("Server response:", error.response.data);
        }
      });
  };

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  return (
    <div className="sign-up-wrapper">
      <h2 className="sign-up-title">Sign Up</h2>
      <div>
        <Form className="sign-up-form" onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="E-mail"
                required
                name="email"
                value={newUser.email}
                onChange={handleChange}
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="First Name"
                name="firstname"
                value={newUser.firstname}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Last Name"
                name="lastname"
                value={newUser.lastname}
                onChange={handleChange}
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                required
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                required
              />
            </Form.Group>
          </Row>

          <Form.Group className="mb-3" controlId="formGridAddress1">
            <Form.Label>Address</Form.Label>
            <Form.Control type="text" placeholder="adresse" name="adresse" />
          </Form.Group>

          <Button type="submit" id="signUp-Btn">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default SignUp;
