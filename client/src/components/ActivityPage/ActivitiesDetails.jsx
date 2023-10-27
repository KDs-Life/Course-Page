import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import axios from "../../api/axios";

function ActivitiesDetails() {
  const [activity, setActivity] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`/activities/${id}`)
      .then((response) => {
        setActivity(response.data[0]);
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
      <Card>
        <img src={activity.images[0].url} alt="BILD" />{" "}
        {/* image-url will change when we switch to SQL !*/}
        <Card.Body>
          <Card.Text>{activity.description}</Card.Text>
        </Card.Body>
      </Card>

      <h1>{activity.title}</h1>

      {activity.address && (
        <div>
          <p>{activity.address.street}</p>
          <p>{activity.address.Housenumber}</p>
          <p>{activity.address.ZIP}</p>
          <p>{activity.address.City}</p>
          <p>{activity.address.Country}</p>
        </div>
      )}
      <p>{activity.category}</p>
      <p>{activity.publishedDate}</p>
    </>
  );
}

export default ActivitiesDetails;
