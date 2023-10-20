import NavBar from "./components/Navbar/NavBar.jsx";
import HomePage from "./components/HomePage/HomePage.jsx";
import LogIn from "./components/User/LogIn.jsx";
import SignUp from "./components/User/SignUp.jsx";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <>
      <NavBar />
      <HomePage />
      -----!!!!!!LOG-IN FELD !!!!!!-----
      <LogIn />
      !!!!!!-------UNTERES FELD SIGN UP--------!!!!
      <SignUp />
    </>
  );
}

export default App;
