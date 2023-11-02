import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { format, parseISO } from "date-fns";
import axios from "../../../api/axiosPrivate";

function UserDashboard() {
  const [users, setUsers] = useState();

  useEffect(() => {
    const getUser = () => {
      return axios.get("/user/all", {
        headers: { "Content-type": "application/json" },
        withCredentials: true,
      });
    };
    getUser()
      .then((response) => {
        setUsers(response.data.data);
      })
      .catch((err) => {
        console.log("ERROR: ", err.message);
      });
  }, []);

  if (!users || users.length === 0) return <div>No Users found</div>;

  return (
    <>
      <div>User-Table</div>
      <Table responsive striped>
        <thead>
          <tr>
            <th>id</th>
            <th>email</th>
            <th>firstname</th>
            <th>lastname</th>
            <th>role</th>
            <th>created</th>
            <th>address</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, key) => (
            <tr key={key}>
              <td>{user.id}</td>
              <td>{user.email}</td>
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
