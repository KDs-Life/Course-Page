import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button, Alert } from "react-bootstrap";
import { ToastContainer, toast, Flip } from "react-toastify";
import axios from "../../api/axios";
import "./SignUp.css";

function SignUp() {
  const [status, setStatus] = useState();
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
      toast.error("Passwords do not match");
      return;
    }

    const createUser = () => {
      const myToast = toast.loading("Creating user account");
      axios
        .post("/signup", newUser)
        .then((response) => {
          toast.update(myToast, {
            render: `User created`,
            type: "success",
            isLoading: false,
            autoClose: 2000,
          });
          setStatus("User created");
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
          toast.update(myToast, {
            render: `Error  ${error.message}`,
            type: "error",
            isLoading: false,
            autoClose: 4000,
          });
        });
    };
    createUser();
  };

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  return (
    <div className="sign-up-wrapper">
      <Container>
        <Row>
          <Col lg={12}>
            <h2 className="sign-up-title">Sign Up</h2>
            <Form className="sign-up-form" onSubmit={handleSubmit}>
              {status && <Alert variant="success">{status}</Alert>}
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
                </Form.Group>
                <Form.Group controlId="formGridPassword2">
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

          <div>
            <div className="sign-up-img">
              <img
                src="https://i.pinimg.com/originals/5f/62/98/5f62987c9339cfc7312d717f1899feff.gif"
                alt=""
              />
            </div>
          </div>
        </Row>
      </Container>
      <ToastContainer
        position="top-center"
        transition={Flip}
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default SignUp;
