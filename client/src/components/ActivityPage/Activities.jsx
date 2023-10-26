// Importiere erforderliche Module und Komponenten
import { useState, useEffect } from "react";
import "./Activities.css";
import axios from "../../api/axios";
import "react-bootstrap";
import Card from "react-bootstrap/Card"; // Bootstrap-Komponente für Karten
import Col from "react-bootstrap/Col"; // Bootstrap-Komponente für Spalten
import Row from "react-bootstrap/Row"; // Bootstrap-Komponente für Zeilen
import Button from "react-bootstrap/Button"; // Bootstrap-Komponente für Buttons

// Platzhalterdaten für Winteraktivitäten (werden später durch echte Daten ersetzt)

function Activities() {
  // Verwaltung des Komponenten-Status mit React Hooks
  const [season, setSeason] = useState(null); // Aktuelle ausgewählte Saison
  const [showWinterActivity, setShowWinterActivity] = useState(false); // Anzeigen/Verbergen von Winteraktivitäten
  const [winterActivitiesData, setWinterActivitiesData] = useState([]); // Daten der Winteraktivitäten
  const [showSummerActivity, setShowSummerActivity] = useState(false);
  // const [summerActivitiesData, setSummerActivitiesData] = useState([]); // Daten der Sommeraktivitäten
  const [loading, setLoading] = useState(true); // Ladezustand der Daten

  // Effekt, der Daten von einem API-Endpunkt abruft, wenn die Komponente geladen wird
  useEffect(() => {
    axios
      .get("/activities")
      .then((response) => {
        setWinterActivitiesData(response.data); // Daten aus der API speichern
        setLoading(false); // Ladezustand beenden
      })
      .catch((error) => {
        console.error("Fehler", error); // Fehlermeldung bei API-Aufruf
        setLoading(false); // Ladezustand beenden
      });
  }, []); // Leeres Abhängigkeitsarray bedeutet, dass dieser Effekt nur einmal beim Laden der Komponente ausgeführt wird

  // Funktion zum Behandeln des Klicks auf eine Saison
  const handleSeasonClick = (selectedSeason) => {
    setSeason(selectedSeason); // Aktuelle Saison festlegen
    setShowWinterActivity(false); // Winteraktivitäten verbergen
    setShowSummerActivity(false); // Sommeraktivitäten verbergen
  };

  // Funktion zum Anzeigen/Verbergen der Winteraktivitäten
  const toggleWinterActivity = () => {
    setShowWinterActivity(!showWinterActivity);
  };
  const toggleSummerActivity = () => {
    setShowSummerActivity(!showSummerActivity);
  };

  return (
    <>
      {/* Ansicht für Saison-Auswahl-Buttons */}
      <div className="seasonContainer">
        <button onClick={() => handleSeasonClick("Winter")} className="season-btn">Winter</button>
        <button onClick={() => handleSeasonClick("Summer")} className="season-btn">Summer</button>
        <button onClick={() => handleSeasonClick("Autumn")} className="season-btn">Autumn</button>
        <button onClick={() => handleSeasonClick("Spring")} className="season-btn">Spring</button>
      </div>

      {/* Ansicht für Winteraktivitäten */}
      {season === "Winter" && (
        <div className="courseContainer">
          <Button onClick={toggleWinterActivity} variant="success">
            Winterkurse
          </Button>
          {/* Liste von Winteraktivitäten in Bootstrap-Karten */}
          <div
            className={`winterActivityBox ${
              showWinterActivity ? "open" : "closed"
            }`}>
            <h2 className="winter-titel">Winterkurse</h2>

            {/* Rendern der Winteraktivitäten */}
            <Row xs={1} md={2} className="g-4">
              {loading ? (
                <p>Lade Winterkursdaten...</p>
              ) : (
                winterActivitiesData.map((activity) => (
                  <Col key={activity.id}>
                    <Card>
                      <Card.Img variant="top" src={activity.images} />
                      <Card.Body>
                        <Card.Title>{activity.title}</Card.Title>
                        <Card.Text>
                          {activity.description}
                          {activity.startDate}
                          {activity.minSlots}
                          {activity.maxSlots}
                          {activity.requirements}
                          {activity.address.street}
                          {activity.address.Housenumber}
                          {activity.address.ZIP}
                          {activity.address.City}
                          {activity.address.Country}
                          {activity.category}
                          {activity.publishedDate}
                        </Card.Text>
                        <Button variant="primary">Buchen</Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))
              )}
            </Row>
          </div>
        </div>
      )}

      {/* Ansicht für Sommeraktivitäten^q */}
      {season === "Summer" && (
        <div className="courseContainer">
          <Button onClick={toggleSummerActivity} variant="success">
            Sommerkurse
          </Button>
        </div>
      )}
    </>
  );
}

export default Activities;
