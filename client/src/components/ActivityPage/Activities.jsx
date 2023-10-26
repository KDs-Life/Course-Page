import { useState, useEffect } from "react";
import "./Activities.css";
import axios from "../../api/axios";

const winterActivities = [
  // Hier werden Winterkurse mit Platzhalterdaten definiert.
  // In der tatsächlichen Anwendung würden diese Daten wahrscheinlich von einem API-Endpunkt stammen.
  // Diese Daten enthalten Informationen wie Titel, Beschreibung, Startdatum usw.
  {
    id: 1,
    title: "Skikurs für Anfänger",
    images: "https://placehold.co/600x400",
    description: "Grundlagen des Skifahrens für Einsteiger",
    startDate: "",
    minSlots: "",
    maxSlots: "",
    requirements: "",
    address: "",
    price: "",
    category: "",
    publishedDate: "",
  },
  {
    id: 2,
    title: "Fortgeschrittener Skikurs",
    images: "https://placehold.co/600x400",
    description: "Skifahren auf fortgeschrittenem Niveau",
    startDate: "",
    minSlots: "",
    maxSlots: "",
    requirements: "",
    address: "",
    price: "",
    category: "",
    publishedDate: "",
  },
  {
    id: 3,
    title: "Snowboardkurs für Jugendliche",
    images: "https://placehold.co/600x400",
    description: "Snowboarden speziell für Jugendliche",
    startDate: "",
    minSlots: "",
    maxSlots: "",
    requirements: "",
    address: "",
    price: "",
    category: "",
    publishedDate: "",
  },
  {
    id: 4,
    title: "Langlaufkurs",
    images: "https://placehold.co/600x400",
    description: "Langlaufski für alle Altersgruppen",
    startDate: "",
    minSlots: "",
    maxSlots: "",
    requirements: "",
    address: "",
    price: "",
    category: "",
    publishedDate: "",
  },
  {
    id: 5,
    title: "Eiskunstlaufkurs",
    images: "https://placehold.co/600x400",
    description: "Eiskunstlauf für Anfänger und Fortgeschrittene",
    startDate: "",
    minSlots: "",
    maxSlots: "",
    requirements: "",
    address: "",
    price: "",
    category: "",
    publishedDate: "",
  },
  {
    id: 6,
    title: "Schneeschuhwandern",
    images: "https://placehold.co/600x400",
    description: "Naturerlebnis mit Schneeschuhen",
    startDate: "",
    minSlots: "",
    maxSlots: "",
    requirements: "",
    address: "",
    price: "",
    category: "",
    publishedDate: "",
  },
];

function Activities() {
  const [season, setSeason] = useState(null);
  const [showWinterActivity, setShowWinterActivity] = useState(false);
  const [winterActivitiesData, setWinterActivitiesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/activities")
      .then((response) => {
        setWinterActivitiesData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Fehler", error);
        setLoading(false);
      });
  }, []);

  const handleSeasonClick = (selectedSeason) => {
    setSeason(selectedSeason);
    setShowWinterActivity(false);
  };

  const toggleWinterActivity = () => {
    setShowWinterActivity(!showWinterActivity);
  };

  return (
    <>
      <div className="seasonContainer">
        <button onClick={() => handleSeasonClick("Winter")}>Winter</button>
        <button onClick={() => handleSeasonClick("Summer")}>Summer</button>
        <button onClick={() => handleSeasonClick("Autumn")}>Autumn</button>
        <button onClick={() => handleSeasonClick("Spring")}>Spring</button>
      </div>
      {season === "Winter" && (
        <div className="courseContainer">
          <button onClick={toggleWinterActivity}>Winterkurse</button>

          <div
            className={`winterActivityBox ${
              showWinterActivity ? "open" : "closed"
            }`}
          >
            <h2>Winterkurse</h2>
            {loading ? (
              <p>Lade Winterkursdaten...</p>
            ) : (
              <ul>
                {winterActivitiesData.map((activity, key) => (
                  <li key={key}>
                    <strong>{activity.title}</strong>
                    <br />
                    <img src={activity.images} alt="" />
                    {activity.description}
                    {activity.startDate}
                    {activity.minSlots}
                    {activity.maxSlots}
                    {activity.requirements}
                    {activity.address.street}
                    {activity.price}
                    {activity.category}
                    {activity.publishedDate}
                    <br />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Activities;
