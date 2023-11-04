import { useEffect, useRef } from "react";
import { Container, Col, Row, Button, Card, Spinner } from "react-bootstrap";
import axios from "../../api/axiosPrivate";

function AdminInfos() {
  const users = useRef(null);
  const bookings = useRef(null);
  const activities = useRef(null);

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
            users.current = response.data;
            break;
          case "bookings":
            bookings.current = response.data;
            break;
          case "activities":
            activities.current = response.data;
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
  }, []);

  return (
    <>
      <Container>
        <Row>
          <Col sm={4}>
            <Card>
              <Card.Body>
                <Card.Title>
                  <i className="fa fa-solid fa-user"></i>
                </Card.Title>
                <Card.Text>Current Usercount</Card.Text>
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
              </Card.Body>
            </Card>
          </Col>
          <Col sm={4}>
            <Card>
              <Card.Body>
                <Card.Title>
                  <i className="fa fa-solid fa-calendar-check"></i>
                </Card.Title>
                <Card.Text>Current Bookingcount</Card.Text>
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
              </Card.Body>
            </Card>
          </Col>
          <Col sm={4}>
            <Card>
              <Card.Body>
                <Card.Title>
                  <i className="fa fa-regular fa-calendar"></i>
                </Card.Title>
                <Card.Text>Current Activitycount</Card.Text>
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
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default AdminInfos;
