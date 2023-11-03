import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { format, parseISO } from "date-fns";
import axios from "../../../api/axiosPrivate";
import "../Admin.css";

function ActivitiesEdit() {
  const [activity, setActivity] = useState();
  const { id } = useParams();
  const activeOptions = ["true", "false"];
  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(e.target);
  };

  useEffect(() => {
    const getActivity = () => {
      return axios.get(`/dashboard/activities/${id}`, {
        headers: { "Content-type": "application/json" },
        withCredentials: true,
      });
    };
    getActivity()
      .then((response) => setActivity(response.data[0]))
      .catch((err) => {
        console.log("ERROR: ", err.message);
      });
  }, []);

  if (!activity || activity === "") return <div>Activity not found</div>;

  //TODO: select or check for "active: true | false"
  return (
    <>
      <Container fluid="md">
        <div className="form-wrapper">
          <Row>
            <Col>
              <div>Activity Edit</div>
              {activity && (
                <Form className="mb-3" onSubmit={handleFormSubmit}>
                  <Form.Group className="mb-3" controlId="formTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Title"
                      defaultValue={activity.title}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formActive">
                    <Form.Label>Active</Form.Label>
                    <Form.Check
                      type="switch"
                      defaultChecked={activity.active}
                    ></Form.Check>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      placeholder="Description"
                      defaultValue={activity.description}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formStartdate">
                    <Form.Label>Startdate</Form.Label>
                    <Form.Control
                      type="date"
                      placeholder="startdate"
                      defaultValue={format(
                        parseISO(activity.startdate),
                        "yyyy-MM-dd"
                      )}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formMinslots">
                    <Form.Label>Min slots</Form.Label>
                    <Form.Control
                      type="text"
                      defaultValue={activity.minslots}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formMaxslots">
                    <Form.Label>Max slots</Form.Label>
                    <Form.Control
                      type="text"
                      defaultValue={activity.maxslots}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formRequirements">
                    <Form.Label>Requirements</Form.Label>
                    <Form.Control
                      as="textarea"
                      placeholder="Requirements"
                      defaultValue={activity.requirements}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formAdressid">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      defaultValue={activity.address_id}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formImageurl">
                    <Form.Label>Image URL</Form.Label>
                    <Form.Control
                      type="text"
                      defaultValue={activity.image_url}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formImagealt">
                    <Form.Label>Image alt</Form.Label>
                    <Form.Control
                      type="text"
                      defaultValue={activity.image_alt}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formPrice">
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="text" defaultValue={activity.price} />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formCategory">
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                      type="text"
                      defaultValue={activity.category}
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Save
                  </Button>
                </Form>
              )}
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
}
export default ActivitiesEdit;
