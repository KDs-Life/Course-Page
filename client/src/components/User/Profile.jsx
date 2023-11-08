import { NavLink, useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState, useEffect } from "react";
import { ToastContainer, Flip } from "react-toastify";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import jwtDecode from "jwt-decode";
import axios from "../../api/axiosPrivate";
import "./Profile.css";

function Profile() {
  const { authUser, isLoggedIn, token, role } = useAuth();
  const navigate = useNavigate();
  const [tokenTimer, setTokenTimer] = useState(0);
  const [userProfile, setUserProfile] = useState();

  useEffect(() => {
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
        });
    }
  }, []);

  if (!isLoggedIn) {
    return (
      <>
        <div>You are not logged in</div>
      </>
    );
  }

  return (
    <>
      <Container className="profile-wrapper">
        <Row>
          <Col>
            <h3>Profile</h3>
          </Col>
        </Row>
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>
                  <i className="fa fa-solid fa-user"></i>
                </Card.Title>
                <Card.Text as="h4">Profile data</Card.Text>
                <NavLink to={`edit`}>
                  <Button variant="primary" className="text-nowrap">
                    Edit profile
                  </Button>
                </NavLink>
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>
                  <i className="fa fa-solid fa-lock"></i>
                </Card.Title>
                <Card.Text as="h4">Your Password</Card.Text>
                <NavLink to={`password`}>
                  <Button variant="primary" className="text-nowrap">
                    Change password
                  </Button>
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
                <Card.Text as="h4">Your Bookings</Card.Text>
                <NavLink to={`bookings`}>
                  <Button variant="primary" className="text-nowrap">
                    Show Bookings
                  </Button>
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
                  <Card.Text as="h4">Dashboard</Card.Text>
                  <NavLink to={`/dashboard`}>
                    <Button variant="primary" className="text-nowrap">
                      Dashboard
                    </Button>
                  </NavLink>
                </Card.Body>
              </Card>
            </Col>
          ) : (
            ""
          )}
        </Row>
        <Outlet
          style={{ marginTop: "10px;" }}
          context={[userProfile, setUserProfile]}
        />
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
    </>
  );
}

export default Profile;
