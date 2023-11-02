import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { format, parseISO } from "date-fns";
import axios from "../../../api/axiosPrivate";

function ActivitiesEdit() {
  const [activity, setActivity] = useState();
  const { id } = useParams();
  const activeOptions = ["true", "false"];
  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(e.target);
  };

  // activity:
  //  "id": 11,
  // 	"title": "Test1",
  // 	"description": "Test1",
  // 	"active": false,
  // 	"startdate": "2023-04-13T22:00:00.000Z",
  // 	"minslots": 0,
  // 	"maxslots": 0,
  // 	"requirements": "Test1",
  // 	"address_id": 0,
  // 	"image_url": "http://localhost:5173/images/course9.jpg",
  // 	"image_alt": "Test1",
  // 	"price": 0,
  // 	"category": "Test1",
  // 	"published": "2023-04-13T22:00:00.000Z"

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
      <div>Activity Edit</div>
      {activity && (
        <Form onSubmit={handleFormSubmit}>
          <Form.Group className="mb-3" controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Title"
              defaultValue={activity.title}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formActive">
            <Form.Label>Active ?</Form.Label>
            <Form.Control as="select" value={activity.active}></Form.Control>
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
              defaultValue={format(parseISO(activity.startdate), "yyyy-MM-dd")}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formMinslots">
            <Form.Label>Min slots</Form.Label>
            <Form.Control type="text" defaultValue={activity.minslots} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formMaxslots">
            <Form.Label>Max slots</Form.Label>
            <Form.Control type="text" defaultValue={activity.maxslots} />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formRequirements">
            <Form.Label>Requirements</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Requirements"
              defaultValue={activity.requirements}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Save
          </Button>
        </Form>
      )}
    </>
  );
}
export default ActivitiesEdit;
