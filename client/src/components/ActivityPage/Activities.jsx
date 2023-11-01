// Importiere erforderliche Module und Komponenten
import { useState, useEffect } from "react";
import "./Activities.css";
import axios from "../../api/axios";
import "react-bootstrap";
import Card from "react-bootstrap/Card"; // Bootstrap-Komponente für Karten
import Col from "react-bootstrap/Col"; // Bootstrap-Komponente für Spalten
import Row from "react-bootstrap/Row"; // Bootstrap-Komponente für Zeilen
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import { NavLink } from "react-router-dom";

// Platzhalterdaten für Winteraktivitäten (werden später durch echte Daten ersetzt)

function Activities() {
  // Verwaltung des Komponenten-Status mit React Hooks
  const [season, setSeason] = useState("all"); // Aktuelle ausgewählte Saison
  const [activityData, setActivityData] = useState([]); // Daten der Winteraktivitäten
  const [loading, setLoading] = useState(true); // Ladezustand der Daten

  // Effekt, der Daten von einem API-Endpunkt abruft, wenn die Komponente geladen wird
  useEffect(() => {
    axios
      .get("/activities") // TODO: Daten in der DB um Seasons erweitern
      .then((response) => {
        setActivityData(response.data); // Daten aus der API speichern
        setLoading(false); // Ladezustand beenden
      })
      .catch((error) => {
        console.error("Fehler", error); // Fehlermeldung bei API-Aufruf
        setLoading(false); // Ladezustand beenden
      });
  }, []); // Leeres Abhängigkeitsarray bedeutet, dass dieser Effekt nur einmal beim Laden der Komponente ausgeführt wird

  // Funktion zum Behandeln des Klicks auf eine Saison
  const handleFilterClick = (value) => {
    if (value === season) return;
    setSeason(value); // Aktuellen Filter festlegen
  };

  return (
    <>
      <div className="activities-wrapper">
        {/* Ansicht für Saison-Auswahl-Buttons */}
        <div className="seasonContainer">
          <ButtonGroup type="button" name="season">
            <Button onClick={() => handleFilterClick("all")} active>
              All
            </Button>
            <Button onClick={() => handleFilterClick("winter")}>Winter</Button>
            <Button onClick={() => handleFilterClick("summer")}>Summer</Button>
            <Button onClick={() => handleFilterClick("autumn")}>Autumn</Button>
            <Button onClick={() => handleFilterClick("spring")}>Spring</Button>
          </ButtonGroup>
        </div>

        {/* Ansicht für Aktivitäten */}
        <div className="courseContainer">
          {/* Liste von Aktivitäten in Bootstrap-Karten */}

          {/* Rendern der Winteraktivitäten */}

          {loading ? (
            <p>Lade Winterkursdaten...</p>
          ) : (
            activityData.map((activity, key) => (
              <Card id="cardBox" key={activity.id}>
                <Card.Img variant="top" src={`/images/course${key + 1}.jpg`} />
                <Card.Body>
                  <Card.Title>{activity.title}</Card.Title>
                  <div>{activity.id}</div>
                  <Card.Text className="information-box">
                    {activity.description}
                    {activity.startdate}
                    {activity.minslots}
                    {activity.maxslots}

                    {/* OBERE PART HIER ANZEIGEN! 
                          UNTERE PART AUF DETAILS SEITE */}

                    {/* {activity.requirements}
                          {activity.address.street}
                          {activity.address.Housenumber}
                          {activity.address.ZIP}
                          {activity.address.City}
                          {activity.address.Country}
                          {activity.category}
                          {activity.publishedDate} */}
                  </Card.Text>
                  <NavLink
                    as="a"
                    to={`/activities/${activity.id}`}
                    variant="primary"
                    id="more-info-link"
                  >
                    {" "}
                    Mehr
                  </NavLink>
                </Card.Body>
              </Card>
            ))
          )}
        </div>

        {/* Ansicht für Sommeraktivitäten^q */}
        {/* {season === "Summer" && (
          <div className="courseContainer">
            <Button
              onClick={toggleSummerActivity}
              variant="success"
              id="summer-btn"
            >
              Sommerkurse
            </Button>
          </div>
        )} */}
      </div>
    </>
  );
}

export default Activities;
