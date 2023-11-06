import NavBar from "./components/Navbar/NavBar.jsx";
import HomePage from "./components/HomePage/HomePage.jsx";
import LogIn from "./components/User/LogIn.jsx";
import SignUp from "./components/User/SignUp.jsx";
import Profile from "./components/User/Profile.jsx";
import ProfileEdit from "./components/User/ProfileEdit.jsx";
import Activities from "./components/ActivityPage/Activities.jsx";
import NotFound from "./components/NotFound.jsx";
import ActivitiesDetails from "./components/ActivityPage/ActivitiesDetails.jsx";
import AuthCheck from "./components/AuthCheck.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./components/Admin/Dashboard.jsx";
import AdminInfos from "./components/Admin/AdminInfos.jsx";
import UserDashboard from "./components/Admin/User/UserDashboard.jsx";
import BookingsDashboard from "./components/Admin/Bookings/BookingsDashboard.jsx";
import ActivitiesDashboard from "./components/Admin/Activities/ActivitiesDashboard.jsx";
import UserEdit from "./components/Admin/User/UserEdit.jsx";
import BookingsEdit from "./components/Admin/Bookings/BookingsEdit.jsx";
import ActivitiesAdd from "./components/Admin/Activities/ActivityAdd.jsx";
import ActivitiesEdit from "./components/Admin/Activities/ActivitiesEdit.jsx";
import ActivityDelete from "./components/Admin/Activities/ActivityDelete.jsx";
import Footer from "./components/Footer/Footer.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

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
          <Route path="/profile" element={<Profile />}>
            <Route path="edit" element={<ProfileEdit />} />
          </Route>
          <Route element={<AuthCheck allowedRoles={["Admin"]} />}>
            <Route path="/dashboard" element={<Dashboard />}>
              <Route path="" element={<AdminInfos />} />
              <Route path="users" element={<UserDashboard />} />
              <Route path="users/edit/:id" element={<UserEdit />} />
              <Route path="bookings" element={<BookingsDashboard />} />
              <Route path="bookings/edit/:id" element={<BookingsEdit />} />
              <Route path="activities" element={<ActivitiesDashboard />} />
              <Route path="activities/add" element={<ActivitiesAdd />} />
              <Route path="activities/edit/:id" element={<ActivitiesEdit />} />
              <Route
                path="activities/delete/:id"
                element={<ActivityDelete />}
              />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
