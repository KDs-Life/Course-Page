import { useRef, useState } from "react";
import { Button, Form, Container, Row, Col, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../../../api/axiosPrivate";

function ActivitiesAdd() {
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();
  const formRef = useRef();
  const formTitle = useRef();
  const formActive = useRef(false);
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

  const handleChange = (e) => {
    formActive.current = e.target.checked;
  };

  const sendForm = () => {
    const myToast = toast.loading("Creating activity...");
    const data = {
      title: formTitle.current?.value,
      description: formDescription.current?.value,
      active: formActive.current.valueOf,
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
    const newActivity = () => {
      axios
        .post(`/dashboard/activities`, data, {
          headers: { "Content-type": "application/json" },
          withCredentials: true,
        })
        .then((response) => {
          toast.update(myToast, {
            render: `Created activity #${response.data.id}:"${response.data.title}"`,
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
    newActivity();
    navigate("/dashboard/activities");
  };

  const formHandler = (event) => {
    event.preventDefault();
    if (formRef.current?.checkValidity() === false) {
      toast.error("Form validation errors");
    } else {
      sendForm();
    }
    setValidated(true);
  };

  return (
    <>
      <Container fluid="md">
        <div className="form-wrapper">
          <Form
            noValidate
            validated={validated}
            onSubmit={formHandler}
            ref={formRef}
          >
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
                  ref={formTitle}
                />
                <Form.Control.Feedback type="invalid">
                  Title is required
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} controlId="formActive">
                <Form.Label>Active</Form.Label>
                <Form.Select ref={formActive}>
                  <option value="true">True</option>
                  <option value="false">False</option>
                </Form.Select>
              </Form.Group>
              <Form.Group as={Col} controlId="formStartdate">
                <Form.Label>Startdate</Form.Label>
                <Form.Control
                  required
                  type="date"
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
                  defaultValue="0"
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
                  defaultValue="0"
                  ref={formMaxslots}
                />{" "}
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
                    defaultValue="0"
                    ref={formPrice}
                  />{" "}
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
                  ref={formRequirements}
                  placeholder="Requirements"
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formAdressid">
                <Form.Label>Address</Form.Label>
                <Form.Control type="text" ref={formAdressid} />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formImageurl">
                <Form.Label>Image URL</Form.Label>
                <Form.Control type="text" ref={formImageurl} />
              </Form.Group>
              <Form.Group as={Col} controlId="formImagealt">
                <Form.Label>Image alt</Form.Label>
                <Form.Control type="text" ref={formImagealt} />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formCategory">
                <Form.Label>Category</Form.Label>
                <Form.Control type="text" ref={formCategory} />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Button variant="primary" type="submit">
                Save
              </Button>
            </Row>
          </Form>
        </div>
      </Container>
    </>
  );
}
export default ActivitiesAdd;
