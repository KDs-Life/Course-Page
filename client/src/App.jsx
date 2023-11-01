import NavBar from "./components/Navbar/NavBar.jsx";
import HomePage from "./components/HomePage/HomePage.jsx";
import LogIn from "./components/User/LogIn.jsx";
import SignUp from "./components/User/SignUp.jsx";
import Profile from "./components/User/Profile.jsx";
import Activities from "./components/ActivityPage/Activities.jsx";
import NotFound from "./components/NotFound.jsx";
import ActivitiesDetails from "./components/ActivityPage/ActivitiesDetails.jsx";
import Dashboard from "./components/Admin/Dashboard.jsx";
import AuthCheck from "./components/AuthCheck.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import UserDashboard from "./components/Admin/User/UserDashboard.jsx";
import BookingsDashboard from "./components/Admin/Bookings/BookingsDashboard.jsx";
import ActivitiesDashboard from "./components/Admin/Activities/ActivitiesDashboard.jsx";

function App() {
  return (
    <AuthProvider>
      <NavBar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/activities/:id" element={<ActivitiesDetails />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route element={<AuthCheck allowedRoles={["Admin"]} />}>
            <Route path="/dashboard" element={<Dashboard />}>
              <Route path="users" element={<UserDashboard />} />
              <Route path="bookings" element={<BookingsDashboard />} />
              <Route path="activities" element={<ActivitiesDashboard />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
