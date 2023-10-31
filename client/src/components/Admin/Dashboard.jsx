import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Bookings from "./Bookings/Bookings";
import User from "./User/User";

function Dashboard() {
  const { authUser, isLoggedIn, token } = useAuth();
  if (!isLoggedIn) {
    return <Navigate to="/" replace={true} />;
  } else {
    return (
      <>
        <h2>Admin Dashboard</h2>
        <div>{authUser}</div>
        <User />
        <Bookings />
      </>
    );
  }
}

export default Dashboard;
