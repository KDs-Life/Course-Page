import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
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
      <Row>
        <Col xs={4}>
          <Form className="sign-up-form" onSubmit={handleSubmit}>
            <Form.Group controlId="formGridEmail">
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
            <Col className="mb-3">
              <Form.Group controlId="formGridPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  required
                  value={newUser.password}
                  onChange={handleChange}
                />
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
            </Col>
            <div className="btn-container">
              <div>
                <Button type="submit">Submit</Button>
              </div>
              <div>
                <Button onClick={() => navigate("/login")}>Log-In</Button>
              </div>
              You already have an account?
            </div>
          </Form>
        </Col>
        <Col xs={1} className="vertical-line"></Col>
        <div>
          <div className="sign-up-img">
            <img src="https://i.pinimg.com/originals/5f/62/98/5f62987c9339cfc7312d717f1899feff.gif" alt="" />
          </div>
        </div>
      </Row>
    </div>
  );
}

export default SignUp;
