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
import "./ActivitiesDetails.css";

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
      <Card className="activity-wrapper">
        <h1>{activity.title}</h1>
        <img
          src={activity.image_url}
          alt={activity.image_alt}
          width={`720px`}
        />

        <div className="activity-description">
          <Card.Body className="">
            <Card.Text>{activity.description}</Card.Text>
          </Card.Body>
          <div className="activityDetails-date">
            {format(parseISO(activity.startdate), "dd.MM.yyyy")}
            <p>
              (
              {formatDistanceToNow(parseISO(activity.startdate), {
                addSuffix: true,
              })}
              )
            </p>
          </div>
        </div>
        <div className="inner-details">
          <table>
            <tr>
              <th>Überschrift</th>
              <th>Eigenschaft</th>
            </tr>
            <tr>
              <td>MinSlots:</td>
              <td>{activity.minslots}</td>
            </tr>
            <tr>
              <td>MaxSlots:</td>
              <td>{activity.maxslots}</td>
            </tr>
            <tr>
              <td>Price:</td>
              <td>{activity.price} €</td>
            </tr>
            <tr>
              <td>Requirements:</td>
              <td>{activity.requirements}</td>
            </tr>
            <tr>
              <td>Category:</td>
              <td>{activity.category}</td>
            </tr>
            <tr>
              <td>Published:</td>
              <td>{activity.published}</td>
            </tr>
          </table>
        </div>
      </Card>
    </>
  );
}

export default ActivitiesDetails;
