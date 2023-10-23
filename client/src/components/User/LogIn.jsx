import { useState } from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";

function LogIn() {
  const { auth, setAuth } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const handleLogout = async (e) => {
    try {
      const response = await axios.get("/logout", {
        headers: { "Content-type": "application/json" },
        withCredentials: true,
      });
      setAuth({});
      setEmail("");
      setPwd("");
      return response.data;
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
        <Navigate replace to="/login" />
      </>
    );
  return (
    <>
      <div className="user-log-in-container">
        <div>
          {errMsg && <p>{errMsg}</p>}
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="E-Mail"
              required
            />

            <input
              type="password"
              name="password"
              onChange={(e) => setPwd(e.target.value)}
              placeholder="Password"
              required
            />
            <button type="submit">Log-In</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default LogIn;
