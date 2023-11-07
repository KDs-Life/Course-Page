import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Card, Button, Table, Alert, Stack } from "react-bootstrap";
import { format, formatDistanceToNow, parseISO } from "date-fns";
import axios from "../../../api/axios";

function ActivitiesCurrent() {
  const [activityData, setActivityData] = useState([]);
  const [loading, setLoading] = useState(true);

  const freeSlots = (max, booked) => {
    if (max === 0) {
      return "Free slots available";
    }
    if (max - booked <= 0) {
      return "No slots available";
    }
    return `${max - booked} slots available`;
  };

  useEffect(() => {
    axios
      .get("/activities/frontpage")
      .then((response) => {
        setActivityData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Fehler", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="activities-wrapper">
      <div className="courseContainer container">
        {loading ? (
          <p>Loading activities...</p>
        ) : (
          activityData.map((activity, key) => (
            <Card id="cardBox" key={activity.id}>
              <Card.Img variant="top" src={activity.image_url} />
              <Card.Body className="big-box-activity">
                <Card.Title className="col-12 text-truncate">
                  {activity.title}
                </Card.Title>
                <Card.Text className="information-box">
                  {format(parseISO(activity.startdate), "dd.MM.yyyy")} (
                  {formatDistanceToNow(parseISO(activity.startdate), {
                    addSuffix: true,
                  })}
                  )
                  <br />
                  {freeSlots(activity.maxslots, activity.total_quantity)}
                </Card.Text>
                <NavLink
                  as="a"
                  to={`/activities/${activity.id}`}
                  variant="primary"
                  id="more-info-link"
                >
                  Mehr
                </NavLink>
              </Card.Body>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

export default ActivitiesCurrent;
