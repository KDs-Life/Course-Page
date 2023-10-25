import jwt from "jsonwebtoken";

const useAuth = () => {
  const token = useSelector(selectCurrentToken);
  let isManager = false;
  let isAdmin = false;
  let status = "User";

  if (token) {
    const decoded = jwt.decode(token);
    const { username, role } = decoded.UserInfo;

    isManager = role.includes("Manager");
    isAdmin = role.includes("Admin");

    if (isManager) status = "Manager";
    if (isAdmin) status = "Admin";

    return { username, role, status, isManager, isAdmin };
  }

  return { username: "", role: [], isManager, isAdmin, status };
};
export default useAuth;
