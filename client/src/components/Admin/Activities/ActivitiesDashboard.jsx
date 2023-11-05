import { useState, useEffect } from "react";
import { NavLink, useNavigate, useOutletContext } from "react-router-dom";
import { Button, Table, Alert, Stack } from "react-bootstrap";
import { format, formatDistanceToNow, parseISO } from "date-fns";
import axios from "../../../api/axiosPrivate";

function ActivitiesDashboard() {
  const [activities, setActivities] = useState();
  const [loading, setLoading] = useOutletContext();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const getActivities = () => {
      return axios.get("/dashboard/activities", {
        headers: { "Content-type": "application/json" },
        withCredentials: true,
      });
    };
    getActivities()
      .then((response) => {
        setActivities(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log("ERROR: ", err.message);
      });
  }, []);

  if (!activities || loading) return <div>Loading</div>;
  return (
    <>
      <Stack gap={3}>
        <Button onClick={() => navigate("add")} variant="success">
          New Activity <i className="fa fa-solid fa-plus"></i>
        </Button>
        <Table responsive="lg" striped>
          <thead>
            <tr>
              <th>Title</th>
              <th>Start</th>
              <th>Active</th>
              <th>Min slots</th>
              <th>Max slots</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {loading
              ? "Loading"
              : activities.map((activitiy, key) => (
                  <tr key={key} className="align-middle">
                    <td className="align-content-center">
                      <NavLink to={`edit/${activitiy.id}`}>
                        {activitiy.title} (#{activitiy.id})
                      </NavLink>
                    </td>
                    <td>
                      {format(parseISO(activitiy.startdate), "dd.MM.yyyy")} (
                      {formatDistanceToNow(parseISO(activitiy.startdate), {
                        addSuffix: true,
                      })}
                      )
                    </td>
                    <td>{String(activitiy.active)}</td>
                    <td>{activitiy.minslots}</td>
                    <td>{activitiy.maxslots}</td>
                    <td>
                      {Number(activitiy.bookings) === 0 ? (
                        <NavLink to={`delete/${activitiy.id}`}>
                          <Button variant="danger">
                            Delete <i className="fa fa-solid fa-trash"></i>
                          </Button>
                        </NavLink>
                      ) : (
                        <Button variant="danger" disabled>
                          Bookings found!
                          <i className="fa fa-solid fa-trash"></i>
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
          </tbody>
        </Table>
      </Stack>
    </>
  );
}

export default ActivitiesDashboard;
