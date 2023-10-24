import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import axios from "../../api/axios";

function Profile() {
  const { authUser, setAuthUser, isLoggedIn, setIsLoggedIn, token, setToken } =
    useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      const response = axios.get("/logout", {
        headers: { "Content-type": "application/json" },
        withCredentials: true,
      });
      setAuthUser("");
      setIsLoggedIn(false);
      setToken("");
      navigate("/");
      //return response.data;
    } catch (error) {
      console.log(error);
    }
  };

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
      <p>{authUser}</p>
      <p>{token}</p>
      <button onClick={handleLogout}>LOGOUT</button>
    </>
  );
}

export default Profile;
