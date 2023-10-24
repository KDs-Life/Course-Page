import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";
import Form from "react-bootstrap/Form";
import "./LogIn.css";

function LogIn() {
  const { auth, setAuth } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    try {
      const response = await axios.get("/logout", {
        headers: { "Content-type": "application/json" },
        withCredentials: true,
      });
      setAuth({});
      navigate("/");
      //return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //TODO: check out custom hooks for AXIOS (differantiate between private and non-private calls to the api)

    try {
      const response = await axios.post(
        "/login",
        { email: email, password: password },
        {
          headers: { "Content-type": "application/json" },
          withCredentials: true,
        }
      );
      navigate("/profile");
      setAuth({ auth: true, email: email });
      setEmail("");
      setPwd("");
    } catch (error) {
      if (error.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (error.response?.status === 401) {
        setErrMsg("Unauthorized");
      }
    }
  };
  if (auth && auth === true)
    return (
      <>
        <div>LOGGED IN</div>
        <div>
          <button onClick={handleLogout}>Log-Out</button>
        </div>
      </>
    );
  return (
    <>
      <div className="user-log-in-container">
        <div>
          {errMsg && <p>{errMsg}</p>}
          <Form>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => setPwd(e.target.value)}
                required
              />
            </Form.Group>
            <button type="submit" onClick={handleSubmit}>
              Log-In
            </button>
          </Form>
        </div>
      </div>
    </>
  );
}

export default LogIn;
