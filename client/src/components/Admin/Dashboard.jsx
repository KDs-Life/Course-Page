import { useState } from "react";
import { Navigate, useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Button, Container } from "react-bootstrap";

function Dashboard() {
  const { isLoggedIn } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  if (!isLoggedIn) {
    return <Navigate to="/" replace={true} />;
  } else {
    return (
      <>
        <Container>
          <h2>Admin Dashboard</h2>
          <div className="box">
            <Button onClick={() => navigate("users")}>Users</Button>
            <Button onClick={() => navigate("bookings")}>Bookings</Button>
            <Button onClick={() => navigate("activities")}>Activities</Button>
            <Outlet context={[loading, setLoading]} />
          </div>
        </Container>
      </>
    );
  }
}

export default Dashboard;
