import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axios from "../../api/axiosPrivate";
import { useState, useEffect } from "react";

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
    if (isLoggedIn) {
      const userInfos = () => {
        return axios.post("/user/profile", {
          email: authUser,
        });
      };
      userInfos()
        .then((response) => {
          setUserProfile(response.data.data);
        })
        .catch((err) => console.log(err));
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
      {userProfile ? (
        <>
          <div>Email: {authUser}</div>
          <div>Bookings: {userProfile.bookings.length}</div>
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
