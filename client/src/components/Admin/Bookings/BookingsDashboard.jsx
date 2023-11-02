import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Table, Badge } from "react-bootstrap";
import { format, formatDistanceToNow, parseISO } from "date-fns";
import axios from "../../../api/axiosPrivate";

function BookingsDashboard() {
  const [bookings, setBookings] = useState();

  const inEuro = (value) => {
    return new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
    }).format(value);
  };

  useEffect(() => {
    const getBookings = () => {
      return axios.get("/dashboard/bookings", {
        headers: { "Content-type": "application/json" },
        withCredentials: true,
      });
    };
    getBookings()
      .then((response) => setBookings(response.data))
      .catch((err) => {
        console.log("ERROR: ", err.message);
      });
  }, []);

  if (!bookings || bookings.length === 0) return <div>No Bookings found</div>;

  return (
    <>
      <Table responsive="lg" striped>
        <thead>
          <tr>
            <th>Title</th>
            <th>Start</th>
            <th>Bookings</th>
            <th>Max slots</th>
            <th>Booked slots</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking, key) => (
            <tr key={key}>
              <td>
                <NavLink to={`edit/${booking.activities_id}`}>
                  {booking.title}
                </NavLink>
              </td>
              <td>
                {format(parseISO(booking.startdate), "dd.MM.yyyy")} (
                {formatDistanceToNow(parseISO(booking.startdate), {
                  addSuffix: true,
                })}
                )
              </td>
              <td>{booking.bookings}</td>
              <td>{booking.maxslots}</td>
              <td>
                {booking.sum}{" "}
                {booking.sum > booking.maxslots && (
                  <Badge bg="danger">!!!</Badge>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default BookingsDashboard;
