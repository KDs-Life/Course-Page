import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Form, Container, Row, Col, InputGroup } from "react-bootstrap";
import { format, parseISO } from "date-fns";
import { toast } from "react-toastify";
import axios from "../../../api/axiosPrivate";
import "../Admin.css";

function ActivitiesEdit() {
  const [activity, setActivity] = useState();
  const { id } = useParams();
  const navigate = useNavigate();
  const formRef = useRef();
  const formTitle = useRef();
  const formActive = useRef();
  const formDescription = useRef();
  const formStartdate = useRef();
  const formMinslots = useRef();
  const formMaxslots = useRef();
  const formRequirements = useRef();
  const formAdressid = useRef();
  const formImageurl = useRef();
  const formImagealt = useRef();
  const formPrice = useRef();
  const formCategory = useRef();

  const handleFormSubmit = (e) => {
    const myToast = toast.loading("Updating activity...");
    e.preventDefault();
    const data = {
      id: id,
      title: formTitle.current?.value,
      description: formDescription.current?.value,
      active: formActive.current?.value,
      startdate: formStartdate.current?.value,
      minslots: Number(formMinslots.current?.value),
      maxslots: Number(formMaxslots.current?.value),
      requirements: formRequirements.current?.value,
      address_id: Number(formAdressid.current?.value),
      image_url: formImageurl.current?.value,
      image_alt: formImagealt.current?.value,
      price: Number(formPrice.current?.value),
      category: formCategory.current?.value,
    };
    const updateActivity = () => {
      axios
        .put(`/dashboard/activities/${id}`, data, {
          headers: { "Content-type": "application/json" },
          withCredentials: true,
        })
        .then((response) => {
          toast.update(myToast, {
            render: `Updated activity #${response.data.id}:"${response.data.title}"`,
            type: "success",
            isLoading: false,
            autoClose: 4000,
          });
        })
        .catch((err) => {
          toast.update(myToast, {
            render: `Error  ${err.message}`,
            type: "error",
            isLoading: false,
            autoClose: 4000,
          });
        });
    };
    updateActivity();
  };

  useEffect(() => {
    const getActivity = () => {
      return axios.get(`/dashboard/activities/${id}`, {
        headers: { "Content-type": "application/json" },
        withCredentials: true,
      });
    };
    getActivity()
      .then((response) => {
        setActivity(response.data[0]);
      })
      .catch((err) => {
        console.log("ERROR: ", err.message);
      });
  }, []);

  if (!activity || activity === "") return <div>Activity not found</div>;

  return (
    <>
      <Container fluid="md">
        <div className="form-wrapper">
          <Form onSubmit={handleFormSubmit} ref={formRef}>
            <Row className="mb-3">
              <Form.Label>
                <h3>Add new Activity</h3>
              </Form.Label>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter Title"
                  defaultValue={activity.title}
                  ref={formTitle}
                />
                <Form.Control.Feedback type="invalid">
                  Title is required
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} controlId="formActive">
                <Form.Label>Active</Form.Label>
                <Form.Select defaultValue={activity.active} ref={formActive}>
                  <option value="true">True</option>
                  <option value="false">False</option>
                </Form.Select>
              </Form.Group>
              <Form.Group as={Col} controlId="formStartdate">
                <Form.Label>Startdate</Form.Label>
                <Form.Control
                  required
                  type="date"
                  defaultValue={format(
                    parseISO(activity.startdate),
                    "yyyy-MM-dd"
                  )}
                  ref={formStartdate}
                  placeholder="startdate"
                />
                <Form.Control.Feedback type="invalid">
                  Startdate is required
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formMinslots">
                <Form.Label>Min slots</Form.Label>
                <Form.Control
                  required
                  type="number"
                  defaultValue={activity.minslots}
                  ref={formMinslots}
                />
                <Form.Control.Feedback type="invalid">
                  Min slots is required
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} controlId="formMaxslots">
                <Form.Label>Max slots</Form.Label>
                <Form.Control
                  required
                  type="number"
                  defaultValue={activity.maxslots}
                  ref={formMaxslots}
                />
                <Form.Control.Feedback type="invalid">
                  Max slots is required
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} controlId="formPrice">
                <Form.Label>Price</Form.Label>
                <InputGroup>
                  <Form.Control
                    required
                    type="number"
                    defaultValue={activity.price}
                    ref={formPrice}
                  />
                  <Form.Control.Feedback type="invalid">
                    Price is required
                  </Form.Control.Feedback>
                  <InputGroup.Text>€</InputGroup.Text>
                </InputGroup>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  required
                  as="textarea"
                  defaultValue={activity.description}
                  ref={formDescription}
                  placeholder="Description"
                />
                <Form.Control.Feedback type="invalid">
                  Description is required
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formRequirements">
                <Form.Label>Requirements</Form.Label>
                <Form.Control
                  as="textarea"
                  defaultValue={activity.requirements}
                  ref={formRequirements}
                  placeholder="Requirements"
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formAdressid">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={activity.address_id}
                  ref={formAdressid}
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formImageurl">
                <Form.Label>Image URL</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={activity.image_url}
                  ref={formImageurl}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formImagealt">
                <Form.Label>Image alt</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={activity.image_alt}
                  ref={formImagealt}
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formCategory">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={activity.category}
                  ref={formCategory}
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Col>
                <Button variant="primary" type="submit">
                  Save
                </Button>
              </Col>
              <Col>
                <Button
                  variant="warning"
                  onClick={() => {
                    navigate("/dashboard/activities");
                  }}
                >
                  Cancel
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Container>
    </>
  );
}
export default ActivitiesEdit;
