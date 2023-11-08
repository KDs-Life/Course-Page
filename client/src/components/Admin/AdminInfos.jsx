import { useEffect, useState } from "react";
import { Container, Col, Row, Button, Card, Spinner } from "react-bootstrap";
import axios from "../../api/axiosPrivate";

function AdminInfos() {
  const [users, setUsers] = useState();
  const [bookings, setBookings] = useState();
  const [activities, setActivites] = useState();

  //TODO: load infos on users, bookings and activities for the dashboard
  const getInfos = (target) => {
    axios
      .get(`/dashboard/stats/${target}`, {
        headers: { "Content-type": "application/json" },
        withCredentials: true,
      })
      .then((response) => {
        switch (target) {
          case "users":
            setUsers(response.data[0]);
            break;
          case "bookings":
            setBookings(response.data[0]);
            break;
          case "activities":
            setActivites(response.data[0]);
            break;
          default:
            break;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getInfos("users");
    getInfos("bookings");
    getInfos("activities");
  }, []);

  return (
    <>
      <Container fluid>
        <Row>
          <Col sm={4}>
            <Card>
              <Card.Body>
                <Card.Title>
                  <i className="fa fa-solid fa-user"></i>
                </Card.Title>
                <Card.Text as="h4">
                  Usercount:
                  {users ? (
                    users.count
                  ) : (
                    <Button variant="primary" disabled>
                      <Spinner
                        as="span"
                        animation="grow"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                      Loading Users...
                    </Button>
                  )}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={4}>
            <Card>
              <Card.Body>
                <Card.Title>
                  <i className="fa fa-solid fa-calendar-check"></i>
                </Card.Title>
                <Card.Text as="h4">
                  Bookingcount:
                  {bookings ? (
                    bookings.count
                  ) : (
                    <Button variant="primary" disabled>
                      <Spinner
                        as="span"
                        animation="grow"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                      Loading Bookings...
                    </Button>
                  )}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={4}>
            <Card>
              <Card.Body>
                <Card.Title>
                  <i className="fa fa-regular fa-calendar"></i>
                </Card.Title>
                <Card.Text as="h4">
                  Activitycount:
                  {activities ? (
                    activities.count
                  ) : (
                    <Button variant="primary" disabled>
                      <Spinner
                        as="span"
                        animation="grow"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                      Loading Activities...
                    </Button>
                  )}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default AdminInfos;
