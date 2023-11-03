import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
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
  const [showForm, setShowForm] = useState(false);
  const [userProfile, setUserProfile] = useState();
  const [tokenTimer, setTokenTimer] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPwd] = useState("");
  const [phone, setPhone] = useState("");
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [street, setStreet] = useState("");
  const [housenumber, setHousenumber] = useState("");
  const [zip, setZip] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [description, setDescription] = useState("");
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
      //return response.data;
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

  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = { email: authUser, phone: phone, firstname: firstname, lastname: lastname, street: street, housenumber: Number(housenumber), zip: Number(zip), city: city, country: country, description: description  };
    try {
      const response = await axios.put(
        "/user/profile",
        data,
      );
      console.log(data);
      setPwd("");
      setPhone("");
      setFirstName("");
      setLastName("");
      setStreet("");
      setHousenumber("");
      setZip("");
      setCity("");
      setCountry("");
      setDescription("");
      navigate("/profile");
    } catch (error) {
      if (error.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (error.response?.status === 401) {
        setErrMsg("Wrong credentials");
      }
    }
  };


  return (
    <>
      <div className="profile-wrapper">
        <h3>Profile Page</h3>
        {tokenTimer > 0 ? (
          <p>Timer: {tokenTimer}</p>
        ) : (
          <p>
            <NavLink href="/refresh">Token expired! REFRESH TOKEN</NavLink>
          </p>
        )}
        {userProfile ? (
          <>
            {userProfile.role === "Admin" ? (
              <NavLink to="/dashboard">Dashboard</NavLink>
            ) : (
              ""
            )}
            <div>Role: {userProfile.role}</div>
            <div>Email: {authUser}</div>
            <div>Bookings: {userProfile.bookings}</div>
            <div>Member since: {userProfile.member_since}</div>
          </>
        ) : (
          ""
        )}

        {!showForm ? (
          <Button onClick={() => setShowForm(true)}>Update your data</Button>
        ) : (
          <Form className="Updateform" onSubmit={handleUpdate}>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPwd(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPhone">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              placeholder="Phone"
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="First Name"
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Last Name"
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupStreet">
            <Form.Label>Street</Form.Label>
            <Form.Control
              type="text"
              placeholder="Street"
              onChange={(e) => setStreet(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupHousenumber">
            <Form.Label>Housenumber</Form.Label>
            <Form.Control
              type="text"
              placeholder="Housenumber"
              onChange={(e) => setHousenumber(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupZip">
            <Form.Label>Zip</Form.Label>
            <Form.Control
              type="text"
              placeholder="Zip"
              onChange={(e) => setZip(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupCity">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              placeholder="City"
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupCountry">
            <Form.Label>Country</Form.Label>
            <Form.Control
              type="text"
              placeholder="Country"
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Form.Group>
          <Button onClick={handleUpdate}>Update</Button>
          <Button onClick={() => setShowForm(false)}>Back to Profile</Button>
  
        </Form>
        )}
        <Button onClick={handleLogout}>LOGOUT</Button>
      </div>
    </>
  );
  }

export default Profile;

