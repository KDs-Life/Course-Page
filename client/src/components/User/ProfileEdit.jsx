import { useNavigate, useOutletContext } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useState, useRef, useEffect } from "react";
import { ToastContainer, toast, Flip } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import axios from "../../api/axiosPrivate";

function ProfileEdit() {
  const { authUser } = useAuth();
  const [userProfile, setUserProfile] = useOutletContext();
  const navigate = useNavigate();
  const formRef = useRef();
  const formFirstname = useRef();
  const formLastname = useRef();
  const formPhone = useRef();
  const formStreet = useRef();
  const formHousenumber = useRef();
  const formZip = useRef();
  const formCity = useRef();
  const formCountry = useRef();

  const editProfile = async (e) => {
    e.preventDefault();
    const data = {
      email: authUser,
      phone: formPhone.current?.value,
      firstname: formFirstname.current?.value,
      lastname: formLastname.current?.value,
      street: formStreet.current?.value,
      housenumber: Number(formHousenumber.current?.value),
      zip: Number(formZip.current?.value),
      city: formCity.current?.value,
      country: formCountry.current?.value,
    };
    const myToast = toast.loading("Updatind user data");
    try {
      const response = await axios.put("/user/profile", data);
      toast.update(myToast, {
        render: `User data updated`,
        type: "success",
        isLoading: false,
        autoClose: 2000,
      });
    } catch (error) {
      toast.update(myToast, {
        render: `Error on update`,
        type: "error",
        isLoading: false,
        autoClose: 2000,
      });
    }
  };

  useEffect(() => {
    const getUserdata = () => {
      return axios.post(
        "/user/profile",
        { email: authUser },
        {
          headers: { "Content-type": "application/json" },
          withCredentials: true,
        }
      );
    };
    getUserdata()
      .then((response) => {
        setUserProfile(response.data.data[0]);
      })
      .catch((err) => {
        console.log("ERROR: ", err.message);
      });
  }, []);

  return (
    <>
      <Container fluid="md">
        <div className="form-wrapper">
          <Form onSubmit={editProfile} ref={formRef}>
            <Row className="mb-3">
              <Form.Label>
                <h3>Edit userdata</h3>
              </Form.Label>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formFirstname">
                <Form.Label>Firstname</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter firstname"
                  defaultValue={userProfile.firstname}
                  ref={formFirstname}
                />
                <Form.Control.Feedback type="invalid">
                  Firstname is required
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} controlId="formLastname">
                <Form.Label>Lastname</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter lastname"
                  defaultValue={userProfile.lastname}
                  ref={formLastname}
                />
                <Form.Control.Feedback type="invalid">
                  Lastname is required
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formPhone">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter phonenumber"
                  defaultValue={userProfile.phone}
                  ref={formPhone}
                />
                <Form.Control.Feedback type="invalid">
                  Phonenumber is required
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} controlId="formCountry">
                <Form.Label>Country</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter country"
                  defaultValue={userProfile.country}
                  ref={formCountry}
                />
                <Form.Control.Feedback type="invalid">
                  Country is required
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formStreet">
                <Form.Label>Street</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter street"
                  defaultValue={userProfile.street}
                  ref={formStreet}
                />
                <Form.Control.Feedback type="invalid">
                  Street is required
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} controlId="formHousenumber">
                <Form.Label>Housenumber</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter housenumber"
                  defaultValue={userProfile.housenumber}
                  ref={formHousenumber}
                />
                <Form.Control.Feedback type="invalid">
                  Housenumber is required
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formZip">
                <Form.Label>ZIP</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter ZIP"
                  defaultValue={userProfile.zip}
                  ref={formZip}
                />
                <Form.Control.Feedback type="invalid">
                  ZIP is required
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} controlId="formCity">
                <Form.Label>City</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Enter city"
                  defaultValue={userProfile.city}
                  ref={formCity}
                />
                <Form.Control.Feedback type="invalid">
                  City is required
                </Form.Control.Feedback>
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
                    navigate("/profile");
                  }}
                >
                  Cancel
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Container>
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

export default ProfileEdit;
