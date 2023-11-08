import { NavLink } from "react-bootstrap";
import {
  Container,
  Row,
  Col,
  Button,
  Table,
  Alert,
  Modal,
} from "react-bootstrap";
import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { format, parseISO, formatDistanceToNow } from "date-fns";
import { useAuth } from "../../context/AuthContext";
import axios from "../../api/axiosPrivate";

function ProfileBookings() {
  const { authUser } = useAuth();
  const [bookings, setBookings] = useState();
  const [show, setShow] = useState(false);
  const delBooking = useRef();

  const cancelDelete = () => setShow(false);
  const showDelete = (id) => {
    delBooking.current = id;
    setShow(true);
  };

  const deleteBooking = () => {
    toast.success(`Deleted booking #${delBooking.current}`, {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      theme: "colored",
    });
    const deleteBooking = () => {
      return axios.delete(`/bookings/${delBooking.current}`, {
        headers: { "Content-type": "application/json" },
        withCredentials: true,
      });
    };
    deleteBooking();
    delBooking.current = null;
    setShow(false);
  };

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
  }, [bookings]);

  if (bookings && bookings.length === 0) {
    return (
      <>
        <Row className="justify-content-md-center mt-3">
          <Col>
            <Alert as="h4" variant="danger">
              You got no active bookings
            </Alert>
          </Col>
        </Row>
      </>
    );
  }
  return (
    <>
      <Row className="justify-content-md-center mt-5">
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
                      <Button
                        variant="danger"
                        onClick={() => showDelete(booking.id)}
                      >
                        Cancel order
                      </Button>
                    </NavLink>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>

        <Modal show={show} onHide={cancelDelete}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Booking</Modal.Title>
          </Modal.Header>
          <Modal.Body>You are about to delete your booking</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={cancelDelete}>
              Cancel
            </Button>
            <Button variant="primary" onClick={deleteBooking}>
              Delete booking
            </Button>
          </Modal.Footer>
        </Modal>
      </Row>
    </>
  );
}

export default ProfileBookings;
