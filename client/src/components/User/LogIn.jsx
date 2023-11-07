import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axios from "../../api/axios";
import { Alert } from "react-bootstrap";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./LogIn.css";
import jwtDecode from "jwt-decode";

function LogIn() {
  const {
    authUser,
    setAuthUser,
    isLoggedIn,
    setIsLoggedIn,
    role,
    setRole,
    setToken,
  } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    try {
      const response = await axios.get("/logout", {
        headers: { "Content-type": "application/json" },
        withCredentials: true,
      });
      setAuthUser({});
      setIsLoggedIn(false);
      setToken((curr) => (curr = ""));
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/login",
        { email: email, password: password },
        {
          headers: { "Content-type": "application/json" },
          withCredentials: true,
        }
      );
      setAuthUser(email);
      setIsLoggedIn(true);
      const tempToken = jwtDecode(response.data.accessToken);
      setToken((curr) => (curr = response.data.accessToken));
      setRole(() => tempToken.role);
      setEmail("");
      setPwd("");
      navigate("/profile");
    } catch (error) {
      if (error.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (error.response?.status === 401) {
        setErrMsg("Wrong credentials");
      }
    }
  };

  if (isLoggedIn)
    return (
      <>
        <div>LOGGED IN</div>
        <div>
          <Button onClick={handleLogout}>Log-Out</Button>
        </div>
      </>
    );

  return (
    <div className="logIn-Wrapper">
      <div className="user-log-in-container">
        <Container>
          <Row>
            <Col>
              <h2 className="logIn-Title">Log-In</h2>
              <div>
                {errMsg !== "" ? <Alert variant="danger">{errMsg}</Alert> : ""}
                <Form className="log-in-form" onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="formGroupEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formGroupPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      onChange={(e) => setPwd(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <div className="btn-container">
                    <Button type="submit">Log-In</Button>
                    <Button onClick={() => navigate("/signup")}>Sign-Up</Button>
                  </div>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default LogIn;
