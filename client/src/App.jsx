import NavBar from "./components/Navbar/NavBar.jsx";
import HomePage from "./components/HomePage/HomePage.jsx";
import LogIn from "./components/User/LogIn.jsx";
import SignUp from "./components/User/SignUp.jsx";
import Profile from "./components/User/Profile.jsx";
import CoursePage from "./components/CoursePage/CoursePage.jsx";
import NotFound from "./components/NotFound.jsx";
import CourseDetails from "./components/CoursePage/CourseDetails.jsx";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/activities" element={<CoursePage />} />
        <Route path="/activities/:id" element={<CourseDetails />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
