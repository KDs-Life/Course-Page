import { useNavigate, useOutletContext } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useState, useRef, useEffect } from "react";
import { ToastContainer, toast, Flip } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import axios from "../../api/axiosPrivate";

function UserPassword() {
  const { authUser } = useAuth();
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});

  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });
  };

  const findFormErrors = () => {
    const { oldPassword, newPassword, confirmPassword } = form;
    const newErrors = {};
    if (!oldPassword || oldPassword === "")
      newErrors.oldPassword = "cannot be blank!";
    if (!newPassword || newPassword === "")
      newErrors.newPassword = "cannot be blank!";
    if (!confirmPassword || confirmPassword === "")
      newErrors.confirmPassword = "cannot be blank!";
    if (newPassword != confirmPassword) {
      newErrors.newPassword = "passwords are not the same!";
      newErrors.confirmPassword = "passwords are not the same!";
    }

    return newErrors;
  };

  const changePassword = async (e) => {
    e.preventDefault();
    const newErrors = findFormErrors();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      const data = {
        email: authUser,
        oldPassword: form.oldPassword,
        newPassword: form.newPassword,
      };
      try {
        const response = await axios.put("/user/password", data);
        if (response.status === 401) {
          toast.error(`Error on password change: ${response.message}`);
          setForm({});
        } else {
          toast.success(`Password changed`);
          setForm({});
        }
      } catch (error) {
        toast.error(`Error on password change`);
        setForm({});
      }
    }
  };

  return (
    <>
      <Container fluid="md">
        <div className="form-wrapper">
          <Form onSubmit={changePassword}>
            <Row className="mb-3">
              <Form.Label>
                <h3>Change password</h3>
              </Form.Label>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="oldPassword">
                <Form.Label>Current password</Form.Label>
                <Form.Control
                  required
                  type="password"
                  placeholder="Enter current password"
                  isInvalid={!!errors.oldPassword}
                  onChange={(e) => setField("oldPassword", e.target.value)}
                  defaultValue={form.oldPassword}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.oldPassword}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="newPassword">
                <Form.Label>New password</Form.Label>
                <Form.Control
                  required
                  type="password"
                  placeholder="Enter new password"
                  isInvalid={!!errors.newPassword}
                  onChange={(e) => setField("newPassword", e.target.value)}
                  defaultValue={form.newPassword}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.newPassword}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="confirmPassword">
                <Form.Label>Confirm new password</Form.Label>
                <Form.Control
                  required
                  type="password"
                  placeholder="Confirm new password"
                  onChange={(e) => {
                    setField("confirmPassword", e.target.value);
                  }}
                  isInvalid={!!errors.confirmPassword}
                  defaultValue={form.confirmPassword}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.confirmPassword}
                </Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row>
              <Col>
                <Button type="submit" onClick={changePassword}>
                  Change password
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </Container>{" "}
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

export default UserPassword;
