import { Container, Row, Col, Button } from "react-bootstrap";
import ActivitiesCurrent from "../Admin/Activities/ActivitiesCurrent";

import "./HomePage.css";

function HomePage() {
  return (
    <>
      <div className="wrapper-container-homepage">
        <section className="hero">
          <div className="hero-title">
            <h1>Ski-Course-Booking</h1>
            <h3>... everything else is just CRUD</h3>
          </div>
        </section>
        <section className="activities-section">
          <h2>Upcoming activities</h2>
          <ActivitiesCurrent />
        </section>
        <section className="about-section">
          <h2>About us</h2>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae non
            eum quod dignissimos nisi alias iusto quibusdam, fugit ducimus
            similique deleniti ex esse magni recusandae quam mollitia maiores
            itaque pariatur quae consequatur voluptas aliquam molestiae fugiat
            vel. Dolores, distinctio. Tempore omnis quo fugiat, sit itaque
            ducimus aut. Voluptates laudantium consequatur voluptate quos
            molestias adipisci, asperiores debitis provident tempore illo non
            quis pariatur facilis hic totam odio quisquam nulla libero quas
            saepe, consectetur aspernatur veritatis? Facilis enim, dolore porro
            harum recusandae saepe atque quaerat quae nostrum corrupti, et,
            deserunt voluptatem sit quia quod eveniet magni ducimus unde eum
            cupiditate officia nam.
          </p>
        </section>
        <section className="service-section">
          <div>
            <i className="fas fa-4x fa-gem text-primary mb-3 sr-icon-1">
              <h3>Sturdy Templates</h3>
            </i>
            <p>Our templates are updated regularly so they don't break.</p>
          </div>

          <div>
            <i className="fas fa-4x fa-gem text-primary mb-3 sr-icon-1">
              <h3>Sturdy Templates</h3>
            </i>
            <p>Our templates are updated regularly so they don't break.</p>
          </div>

          <div>
            <i className="fas fa-4x fa-gem text-primary mb-3 sr-icon-1">
              <h3>Sturdy Templates</h3>
            </i>
            <p>Our templates are updated regularly so they don't break.</p>
          </div>
        </section>
      </div>
    </>
  );
}

export default HomePage;
