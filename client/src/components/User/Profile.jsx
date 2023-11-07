import { NavLink, useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState, useEffect } from "react";
import { Container, Row, Col, Button, Card, Form } from "react-bootstrap";
import jwtDecode from "jwt-decode";
import axios from "../../api/axiosPrivate";
import "./Profile.css";

function Profile() {
  const {
    authUser,
    setAuthUser,
    isLoggedIn,
    setIsLoggedIn,
    token,
    setToken,
    role,
    setRole,
  } = useAuth();
  const navigate = useNavigate();
  const [tokenTimer, setTokenTimer] = useState(0);
  const [userProfile, setUserProfile] = useState();
  const [email, setEmail] = useState("");
  const [password, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

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

  useEffect(() => {
    // FIXME: check if token is valid, if not: refresh?
    const timer =
      tokenTimer > 0 && setInterval(() => setTokenTimer(tokenTimer - 1), 1000);
    return () => clearInterval(timer);
  }, [tokenTimer]);

  useEffect(() => {
    if (isLoggedIn) {
      const userToken = jwtDecode(token);
      setTokenTimer(Math.ceil(userToken.exp - Date.now() / 1000));
      const userInfos = () => {
        return axios.post(
          "/user/profile",
          {
            email: authUser,
          },
          { withCredentials: true }
        );
      };
      userInfos()
        .then((response) => setUserProfile(response.data.data))
        .catch((err) => {
          if (err.response.status === "401") console.log("Refresh token");
        }); // NOTE: if 401: refresh accessToken in memory and reload profile?
    }
  }, []);

  if (!isLoggedIn) {
    return (
      <>
        <div>You are not logged in</div>
      </>
    );
  }

  // Usertable-Try

  return (
    <>
      <Container className="profile-wrapper">
        <Row>
          <Col>
            <h3>Profile Page{role}</h3>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>
                  <i className="fa fa-solid fa-user"></i>
                </Card.Title>
                <Card.Text>Usercount</Card.Text>
                <NavLink to={`edit`}>
                  <Button variant="primary">Edit profile</Button>
                </NavLink>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>
                  <i className="fa fa-solid fa-calendar-check"></i>
                </Card.Title>
                <Card.Text>Security</Card.Text>
                <NavLink to={`password`}>
                  <Button variant="primary">Change password</Button>
                </NavLink>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>
                  <i className="fa fa-regular fa-calendar"></i>
                </Card.Title>
                <Card.Text>Bookings</Card.Text>
                <NavLink to={`bookings`}>
                  <Button variant="primary">Show Bookings</Button>
                </NavLink>
              </Card.Body>
            </Card>
          </Col>
          {role === "Admin" ? (
            <Col>
              <Card>
                <Card.Body>
                  <Card.Title>
                    <i className="fa fa-regular fa-calendar"></i>
                  </Card.Title>
                  <Card.Text>Dashboard</Card.Text>
                  <NavLink to={`/dashboard`}>
                    <Button variant="primary">Admin Dashboard</Button>
                  </NavLink>
                </Card.Body>
              </Card>
            </Col>
          ) : (
            ""
          )}
        </Row>
        <Row>
          <Col>
            <Button onClick={handleLogout}>LOGOUT</Button>
            {tokenTimer > 0 ? (
              <p>Timer: {tokenTimer}</p>
            ) : (
              <p>
                <NavLink href="/refresh">Token expired! REFRESH TOKEN</NavLink>
              </p>
            )}
          </Col>
        </Row>
        <Outlet
          style={{ marginTop: "10px;" }}
          context={[userProfile, setUserProfile]}
        />
      </Container>
    </>
  );
}

export default Profile;
