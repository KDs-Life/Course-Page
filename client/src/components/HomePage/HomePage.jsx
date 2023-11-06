import { Container, Row, Col, Button } from "react-bootstrap";
import "./HomePage.css";

function HomePage() {
  return (
    <>
      <div className="wrapper-container-homepage">
        <section className="masthead">
          <div className="masthead-container">
            <h2>Welcome to your source for Ski-Courses in Freiburg!</h2>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam,
              vitae.
            </p>
          </div>
        </section>
        <section className="page-section">
          <h2>Services</h2>
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
          <section className="service-wrapper">
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
        </section>
      </div>
    </>
  );
}

export default HomePage;
