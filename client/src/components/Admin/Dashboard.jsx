import { useState } from "react";
import { Navigate, useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Stack, Button, Container } from "react-bootstrap";
import { ToastContainer, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Admin.css";

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
          <Stack direction="horizontal" gap={5}>
            <Button onClick={() => navigate("users")}>Users</Button>
            <Button onClick={() => navigate("bookings")}>Bookings</Button>
            <Button onClick={() => navigate("activities")}>Activities</Button>
          </Stack>
          <Stack>
            <Outlet
              style={{ marginTop: "10px;" }}
              context={[loading, setLoading]}
            />
          </Stack>
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
}

export default Dashboard;
