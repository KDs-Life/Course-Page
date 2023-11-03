import { Navigate, useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Button, ButtonGroup } from "react-bootstrap";

function Dashboard() {
  const { authUser, isLoggedIn, token } = useAuth();
  const navigate = useNavigate();

  if (!isLoggedIn) {
    return <Navigate to="/" replace={true} />;
  } else {
    return (
      <>
        <h2>Admin Dashboard</h2>
        <ButtonGroup>
          <Button onClick={() => navigate("users")}>Users</Button>
          <Button onClick={() => navigate("bookings")}>Bookings</Button>
          <Button onClick={() => navigate("activities")}>Actvities</Button>
        </ButtonGroup>
        <Outlet />
      </>
    );
  }
}

export default Dashboard;
