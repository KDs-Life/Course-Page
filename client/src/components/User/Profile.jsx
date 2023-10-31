import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import axios from "../../api/axiosPrivate";

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
  const [userProfile, setUserProfile] = useState();
  const [tokenTimer, setTokenTimer] = useState(0);

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

  return (
    <>
      <div>Profile Page</div>
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

      <button onClick={handleLogout}>LOGOUT</button>
    </>
  );
}

export default Profile;
