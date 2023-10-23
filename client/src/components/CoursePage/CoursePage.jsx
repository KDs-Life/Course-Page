import { useState } from "react";
import "./CoursePage.css";

// Definiert eine Liste von Winterkursen
const winterCourses = [
  {
    id: 1,
    name: "Skikurs für Anfänger",
    Image: "https://placehold.co/600x400",
    details: "Grundlagen des Skifahrens für Einsteiger",
    beschreibung:
      "Lernen Sie die Grundlagen des Skifahrens in diesem Anfängerkurs. Geeignet für alle Altersgruppen und Fähigkeitsstufen.",
  },
  {
    id: 2,
    name: "Fortgeschrittener Skikurs",
    Image: "https://placehold.co/600x400",
    details: "Skifahren auf fortgeschrittenem Niveau",
    beschreibung:
      "Verbessern Sie Ihre Skifahrkünste in diesem fortgeschrittenen Kurs. Geeignet für erfahrene Skifahrer, die ihre Technik verfeinern möchten.",
  },
  {
    id: 3,
    name: "Snowboardkurs für Jugendliche",
    Image: "https://placehold.co/600x400",
    details: "Snowboarden speziell für Jugendliche",
    beschreibung:
      "Ein spezieller Snowboardkurs für Jugendliche, um das Snowboarden zu erlernen und Spaß im Schnee zu haben.",
  },
  {
    id: 4,
    name: "Langlaufkurs",
    Image: "https://placehold.co/600x400",
    details: "Langlaufski für alle Altersgruppen",
    beschreibung:
      "Entdecken Sie die Freude am Langlaufen in diesem Kurs, der sich sowohl an Anfänger als auch an erfahrene Langläufer richtet.",
  },
  {
    id: 5,
    name: "Eiskunstlaufkurs",
    Image: "https://placehold.co/600x400",
    details: "Eiskunstlauf für Anfänger und Fortgeschrittene",
    beschreibung:
      "Lernen Sie die Grundlagen des Eiskunstlaufs oder verbessern Sie Ihre Fähigkeiten in diesem Kurs, der für alle Altersgruppen geeignet ist.",
  },
  {
    id: 6,
    name: "Schneeschuhwandern",
    Image: "https://placehold.co/600x400",
    details: "Naturerlebnis mit Schneeschuhen",
    beschreibung:
      "Erkunden Sie die winterliche Landschaft auf Schneeschuhen und genießen Sie die Schönheit der Natur im Schnee.",
  },
];

// Die Hauptkomponente, die die Kurse und Jahreszeiten darstellt
function CoursePage() {
  // Verwendung des useState-Hooks, um den aktuellen Zustand der ausgewählten Jahreszeit zu verfolgen
  const [season, setSeason] = useState(null);

  // useState-Hooks, um anzuzeigen/auszublenden
  const [showWinterCourse, setShowWinterCourse] = useState(false);
  // const [showSummerCourse, setShowSummerCourse] = useState(false);
  // const [showAutumnCourse, setShowAutumnCourse] = useState(false);
  // const [showSpringCourse, setShowSpringCourse] = useState(false);

  // Diese Funktion wird aufgerufen, wenn auf einen Jahreszeit-Button geklickt wird
  const handleSeasonClick = (selectedSeason) => {
    // Setzt die ausgewählte Jahreszeit im Zustand
    setSeason(selectedSeason);
    // Versteckt den Button, wenn eine Jahreszeit ausgewählt wird
    setShowWinterCourse(false);
    // setShowSummerCourse(false);
    // setShowAutumnCourse(false);
    // setShowSpringCourse(false);
  };

  return (
    <>
      <div className="seasonContainer">
        {/* Jahreszeit-Buttons, die die handleSeasonClick-Funktion aufrufen */}
        <button onClick={() => handleSeasonClick("Winter")}>Winter</button>
        <button onClick={() => handleSeasonClick("Summer")}>Summer</button>
        <button onClick={() => handleSeasonClick("Autumn")}>Autumn</button>
        <button onClick={() => handleSeasonClick("Spring")}>Spring</button>
      </div>
      {season === "Winter" && (
        // Wenn die Winter-Saison ausgewählt ist, wird der Inhalt angezeigt
        <div className="courseContainer">
          <button onClick={() => setShowWinterCourse(!showWinterCourse)}>
            Winterkurse
          </button>

          {/* INHALT FÜR WINTERKURSE */}
          {showWinterCourse && (
            <div className="winterCourseBox">
              <h2>Winterkurse</h2>
              <ul>
                {/* Liste der Winterkurse */}
                {winterCourses.map((course) => (
                  <li key={course.id}>
                    <strong>Name: {course.name}</strong>
                    <br />
                    <img src={course.Image} alt="" />
                    {course.details}
                    <br />
                    {course.beschreibung}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* INHALT FÜR SOMMERKURSE */}
      {/* INHALT FÜR HERBSTKURSE */}
      {/* INHALT FÜR FRÜHLINGSKURSE */}
    </>
  );
}

export default CoursePage;
