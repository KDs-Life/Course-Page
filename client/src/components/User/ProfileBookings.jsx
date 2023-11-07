import { NavLink } from "react-bootstrap";
import { Button, Table, Alert } from "react-bootstrap";
import { useState, useEffect } from "react";
import { ToastContainer, toast, Flip } from "react-toastify";
import { format, parseISO, formatDistanceToNow } from "date-fns";
import { useAuth } from "../../context/AuthContext";
import axios from "../../api/axiosPrivate";

function ProfileBookings() {
  const { authUser } = useAuth();
  const [bookings, setBookings] = useState();

  //TODO: create delete booking function

  const inEuro = (value) => {
    return new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
    }).format(value);
  };

  useEffect(() => {
    const getBookings = () => {
      return axios.get(`/user/bookings/${authUser}`, {
        headers: { "Content-type": "application/json" },
        withCredentials: true,
      });
    };
    getBookings()
      .then((response) => {
        setBookings(response.data);
      })
      .catch((err) => {
        console.log("ERROR: ", err.message);
      });
  }, []);

  if (bookings && bookings.length === 0) {
    return (
      <>
        <Alert variant="secondary">You got no active bookings</Alert>
      </>
    );
  }
  return (
    <>
      <Table responsive="lg" striped>
        <thead>
          <tr>
            <th>Title</th>
            <th>Start</th>
            <th>Booked slots</th>
            <th>Price</th>
            <th>Sum</th>
            <th>Cancel order</th>
          </tr>
        </thead>
        <tbody>
          {bookings &&
            bookings.map((booking, key) => (
              <tr key={key}>
                <td>{booking.title}</td>
                <td>
                  {format(parseISO(booking.startdate), "dd.MM.yyyy")} (
                  {formatDistanceToNow(parseISO(booking.startdate), {
                    addSuffix: true,
                  })}
                  )
                </td>
                <td>{booking.quantity}</td>
                <td>{inEuro(booking.price)}</td>
                <td>{inEuro(booking.sum)}</td>
                <td>
                  <NavLink>
                    <Button variant="danger">Cancel order</Button>
                  </NavLink>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
      <ToastContainer
        position="top-center"
        transition={Flip}
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default ProfileBookings;
