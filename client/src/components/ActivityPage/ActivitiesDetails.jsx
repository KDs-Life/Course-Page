import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../api/axios";
import {
  format,
  formatDistanceToNow,
  formatDistanceStrict,
  parseISO,
} from "date-fns";
import "./ActivitiesDetails.css";
import { Button } from "react-bootstrap";

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
      <div className="activity-wrapper-container">
        <h1>{activity.title}</h1>
        <div className="activity-wrapper">
          <img
            src={activity.image_url}
            alt={activity.image_alt}
            width={`720px`}
          />
          <div className="inner-details">
            <table className="details">
              <tr>
                <th>Informationen</th>
              </tr>
              <tr>
                <td>Slots:</td>
                <td>
                  {activity.minslots}/{activity.maxslots}
                </td>
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
                <td>
                  {" "}
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
                </td>
              </tr>
              <Button onClick="" className="booking-btn">
                BUCHEN DU SAU
              </Button>
            </table>
          </div>
        </div>
        <div className="activity-description">
          <div>{activity.description}</div>
        </div>
      </div>
    </>
  );
}

export default ActivitiesDetails;
