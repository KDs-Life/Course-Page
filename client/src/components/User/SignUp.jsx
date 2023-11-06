import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios"; // Importiere Axios
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
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newUser.password !== newUser.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    axios
      .post("/signup", newUser)
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
        navigate("/login");
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
            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                required
                value={newUser.password}
                onChange={handleChange}
              />
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <Form.Group as={Col} controlId="formGridPasswordConfirm">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                required
                value={newUser.confirmPassword}
                onChange={handleChange}
              />
            </Form.Group>
          </Row>

          <Button type="submit" id="signUp-Btn">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default SignUp;
