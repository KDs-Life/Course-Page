import NavBar from "./components/Navbar/NavBar.jsx";
import HomePage from "./components/HomePage/HomePage.jsx";
import LogIn from "./components/User/LogIn.jsx";
import SignUp from "./components/User/SignUp.jsx";
import Profile from "./components/User/Profile.jsx";
import Activities from "./components/ActivityPage/Activities.jsx";
import NotFound from "./components/NotFound.jsx";
import CourseDetails from "./components/ActivityPage/CourseDetails.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/activities/:id" element={<CourseDetails />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
