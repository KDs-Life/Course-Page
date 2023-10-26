import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

function Dashboard() {
  const { authUser, isLoggedIn, token } = useAuth();
  if (!isLoggedIn) {
    return <Navigate to="/" replace={true} />;
  } else {
    return (
      <>
        <h2>Admin Dashboard</h2>
        <div>{authUser.email}</div>
      </>
    );
  }
}

export default Dashboard;
