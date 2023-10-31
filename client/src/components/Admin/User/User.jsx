import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import axios from "../../../api/axiosPrivate";

function User() {
  const [users, setUsers] = useState([
    {
      id: 1,
      email: "test",
      firstname: "first",
      lastname: "last",
      role: "User",
      created: "23.10.2023",
      address: 2,
    },
    {
      id: 2,
      email: "test",
      firstname: "first",
      lastname: "last",
      role: "User",
      created: "23.10.2023",
      address: 2,
    },
    {
      id: 3,
      email: "test",
      firstname: "first",
      lastname: "last",
      role: "User",
      created: "23.10.2023",
      address: 2,
    },
  ]);

  const inEuro = (value) => {
    if (typeof value !== Number) return value;
    return new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
    }).format(value);
  };

  // useEffect(() => {
  //   const getUser = () => {
  //     return axios.get("/bookings", {
  //       headers: { "Content-type": "application/json" },
  //       withCredentials: true,
  //     });
  //   };
  //   getUser()
  //     .then((response) => setUsers(response.data))
  //     .catch((err) => {
  //       console.log("ERROR: ", err.message);
  //     });
  // }, []);

  if (!users || users.length === 0) return <div>No Bookings found</div>;

  return (
    <>
      <div>Table with User</div>
      <Table responsive>
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
              <td>{user.created}</td>
              <td>{user.address}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default User;
