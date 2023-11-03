import { useState, useEffect } from "react";
import { NavLink, useNavigate, useOutletContext } from "react-router-dom";
import { Button, Table } from "react-bootstrap";
import { format, formatDistanceToNow, parseISO } from "date-fns";
import axios from "../../../api/axiosPrivate";

//TODO: get activities for CRUD functions
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
      <Button onClick={() => navigate("add")} variant="success">
        New Activity
      </Button>
      <Table responsive="lg" striped>
        <thead>
          <tr>
            <th>Title</th>
            <th>Start</th>
            <th>Min slots</th>
            <th>Max slots</th>
          </tr>
        </thead>
        <tbody>
          {loading
            ? "Loading"
            : activities.map((activities, key) => (
                <tr key={key}>
                  <td>
                    <NavLink to={`edit/${activities.id}`}>
                      {activities.title} (#{activities.id})
                    </NavLink>
                  </td>
                  <td>
                    {format(parseISO(activities.startdate), "dd.MM.yyyy")} (
                    {formatDistanceToNow(parseISO(activities.startdate), {
                      addSuffix: true,
                    })}
                    )
                  </td>
                  <td>{activities.minslots}</td>
                  <td>{activities.maxslots}</td>
                </tr>
              ))}
        </tbody>
      </Table>
    </>
  );
}

export default ActivitiesDashboard;
