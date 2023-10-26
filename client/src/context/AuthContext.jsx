import { createContext, useContext, useState } from "react";
import jwt_decode from "jwt-decode";

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const [role, setRole] = useState("User");

  // if (token !== "") {
  //   const decoded = jwt_decode(token);
  //   const { email, role } = decoded.UserInfo;
  // }
  const value = {
    authUser,
    setAuthUser,
    isLoggedIn,
    setIsLoggedIn,
    token,
    setToken,
    role,
    setRole,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
