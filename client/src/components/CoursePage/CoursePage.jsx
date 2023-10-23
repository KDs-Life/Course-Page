import { useState, useEffect } from 'react';
import axios from 'axios';

function CoursePage() {
  const [courses, setCourses] = useState([]);

  // Harte kodierte Kursdaten als Beispiel
  const exampleCourse = {
    id: 1,
    name: 'Ski-Kurs 101',
    details: 'Anfängerkurs für Skifahrer',
    beschreibung: 'Lernen Sie die Grundlagen des Skifahrens in diesem Anfängerkurs. Geeignet für alle Altersgruppen und Fähigkeitsstufen.',
    image: 'URL_DES_KURS_BILDES',
  };

  useEffect(() => {
    // Hier sollte die URL deiner Backend-API stehen, die Kursdaten bereitstellt
    const apiUrl = 'DIE API';

    axios.get(apiUrl)
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {
        console.error('Fehler beim Abrufen der Daten:', error);
      });
  }, []);

  return (
    <>
      <h1>Unsere Winter / Ski-Kurs Angebote</h1>
      <p>Wir bieten Ihnen eine Vielzahl an Kursen an, die Sie hier buchen können.</p>
      <ul>
        {/* Füge den hart codierten Kurs hinzu */}
        <li key={exampleCourse.id}>
          <strong>Name: {exampleCourse.name}</strong><br />
          Details: {exampleCourse.details}<br />
          Beschreibung: {exampleCourse.beschreibung}
        </li>

        {courses.map((course) => (
          <li key={course.id}>
            <strong>Name: {course.name}</strong><br />
            Details: {course.details}<br />
            Beschreibung: {course.beschreibung}
          </li>
        ))}
      </ul>
      <p>Unser Weinachtsspecial in den Bergen für Familien, Paare, Abenteurer und Gruppen</p>
      <ul>
        {/* Daten für X-Mas Specials ausgeben */}
      </ul>
    </>
  );
}

export default CoursePage;
