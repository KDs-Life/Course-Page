import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axios from "../../api/axios";
import { Alert } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "./LogIn.css";

function LogIn() {
  const { authUser, setAuthUser, isLoggedIn, setIsLoggedIn, token, setToken } =
    useAuth();
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
      setToken((curr) => (curr = response.data.accessToken));
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
      <Row>
        <Col xs={4}>
          <div className="user-log-in-container">
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
          </div>
        </Col> 
      </Row>
    </div>
  );
}

export default LogIn;
