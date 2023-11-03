import { useState, useEffect } from "react";
import { useOutletContext, NavLink } from "react-router-dom";
import { format, parseISO } from "date-fns";
import Table from "react-bootstrap/Table";
import axios from "../../../api/axiosPrivate";

function UserDashboard() {
  const [users, setUsers] = useState();
  const [loading, setLoading] = useOutletContext();

  useEffect(() => {
    setLoading(true);
    const getUser = () => {
      return axios.get("/dashboard/users", {
        headers: { "Content-type": "application/json" },
        withCredentials: true,
      });
    };
    getUser()
      .then((response) => {
        setUsers(response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("ERROR: ", err.message);
      });
  }, []);
  if (!users || loading) return <div>Loading</div>;
  return (
    <>
      <Table responsive striped>
        <thead>
          <tr>
            <th>email</th>
            <th>firstname</th>
            <th>lastname</th>
            <th>role</th>
            <th>member since</th>
            <th>address</th>
          </tr>
        </thead>
        <tbody>
          {loading
            ? "Loading"
            : users &&
              users.map((user, key) => (
                <tr key={key}>
                  <td>
                    <NavLink to={`edit/${user.id}`}>{user.email}</NavLink>
                  </td>
                  <td>{user.firstname}</td>
                  <td>{user.lastname}</td>
                  <td>{user.role}</td>
                  <td>{format(parseISO(user.created), "dd.MM.yyyy")}</td>
                  <td>{user.address}</td>
                </tr>
              ))}
        </tbody>
      </Table>
    </>
  );
}

export default UserDashboard;
