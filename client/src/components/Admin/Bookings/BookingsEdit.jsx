import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Table } from "react-bootstrap";
import axios from "../../../api/axiosPrivate";
import "../Admin.css";

function BookingsEdit() {
  const [bookings, setBookings] = useState();
  const { id } = useParams();

  useEffect(() => {
    const getBookings = () => {
      return axios.get(`/dashboard/bookings/${id}`, {
        headers: { "Content-type": "application/json" },
        withCredentials: true,
      });
    };
    getBookings()
      .then((response) => {
        setBookings((current) => (current = response.data));
      })
      .catch((err) => {
        console.log("ERROR: ", err.message);
      });
  }, []);

  return (
    <>
      <Table responsive="lg" striped>
        <thead>
          <tr>
            <th>Title</th>
            <th>User</th>
            <th>Slots booked</th>
          </tr>
        </thead>
        <tbody>
          {bookings &&
            bookings.map((booking, key) => (
              <tr key={key}>
                <td>{booking.title}</td>
                <td>{booking.email}</td>
                <td>{booking.quantity}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
}

export default BookingsEdit;
