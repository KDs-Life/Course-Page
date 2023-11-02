import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import axios from "../../api/axios";
import {
  format,
  formatDistanceToNow,
  formatDistanceStrict,
  parseISO,
} from "date-fns";

function ActivitiesDetails() {
  const [activity, setActivity] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`/activities/${id}`)
      .then((response) => {
        setActivity(response.data);
      })
      .catch((error) => {
        console.error("Fehler beim Abrufen der Daten: ", error);
      });
  }, []);

  if (!activity) {
    return <p>Lade...</p>;
  }

  return (
    <>
      <Card className="dflex align-items-center">
        <img
          src={activity.image_url}
          alt={activity.image_alt}
          width={`720px`}
        />
        <Card.Body>
          <Card.Text>{activity.description}</Card.Text>
        </Card.Body>
      </Card>

      <h1>{activity.title}</h1>

      <div>
        {format(parseISO(activity.startdate), "dd.MM.yyyy")} (
        {formatDistanceToNow(parseISO(activity.startdate), {
          addSuffix: true,
        })}
        )<p>MinSlots: {activity.minslots}</p>
        <p>MaxSlots: {activity.maxslots}</p>
        <p>Price: {activity.price} €</p>
        <p>Requirements: {activity.requirements}</p>
        <p>Category: {activity.category}</p>
        <p>Published: {activity.published}</p>
      </div>
    </>
  );
}

export default ActivitiesDetails;
