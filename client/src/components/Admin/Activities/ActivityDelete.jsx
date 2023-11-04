import { useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Button, Stack } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "../../../api/axiosPrivate";

function ActivityDelete() {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleClick = () => {
    const myToast = toast.loading("Please wait...");
    const data = {
      id: id,
    };
    const deleteActivity = () => {
      axios
        .delete(`/dashboard/activities/${id}`, data, {
          headers: { "Content-type": "application/json" },
          withCredentials: true,
        })
        .then((response) => {
          toast.update(myToast, {
            render: `Deleted activity id ${response.data[0].id}`,
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
    deleteActivity();
    navigate("/dashboard/activities");
  };

  return (
    <Container fluid="md">
      <div className="form-wrapper">
        <div>Delete activitiy #{id}?</div>
        <Stack gap={3}>
          <Button variant="danger" onClick={handleClick}>
            Delete
          </Button>
          <Button
            variant="warning"
            onClick={() => navigate("/dashboard/activities")}
          >
            Cancel
          </Button>
        </Stack>
      </div>
    </Container>
  );
}

export default ActivityDelete;
