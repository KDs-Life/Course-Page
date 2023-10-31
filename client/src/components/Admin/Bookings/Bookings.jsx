import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import axios from "../../../api/axiosPrivate";

function Bookings() {
  const [bookings, setBookings] = useState();

  const inEuro = (value) => {
    return new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
    }).format(value);
  };

  useEffect(() => {
    const getBookings = () => {
      return axios.get("/bookings", {
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
      <div>Bookings-Table</div>
      <Table responsive="lg" striped>
        <thead>
          <tr>
            <th>id</th>
            <th>users_id</th>
            <th>activities_id</th>
            <th>quantity</th>
            <th>price</th>
            <th>fullprice</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking, key) => (
            <tr key={key}>
              <td>{booking.id}</td>
              <td>{booking.users_id}</td>
              <td>{booking.activities_id}</td>
              <td>{booking.quantity}</td>
              <td>{inEuro(booking.price)}</td>
              <td>
                {inEuro(Number(booking.price) * Number(booking.quantity))}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default Bookings;
