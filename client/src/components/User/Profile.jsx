import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";

function Profile() {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      const response = axios.get("/logout", {
        headers: { "Content-type": "application/json" },
        withCredentials: true,
      });
      setAuth({});
      navigate("/");
      //return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>Profile Page</div>
      <p>{auth.email}</p>
      <button onClick={handleLogout}>LOGOUT</button>
    </>
  );
}

export default Profile;
