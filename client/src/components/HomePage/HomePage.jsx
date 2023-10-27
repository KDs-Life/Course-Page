// import { Container, Row, Col, Button } from "react-bootstrap";
// import Carousel from "react-bootstrap/Carousel";
import "./HomePage.css";

function HomePage() {
  return (
    <>
      <div className="wrapper-container-homepage">
        <section className="masthead parallax parallax-1">
          <div className="container">
            <div className="masthead-subheading text-uppercase">
              Willkommen auf der Skii-Erlebnis Seite
            </div>
            <div className="masthead-heading ">Lass dich verzaubern!!</div>
            <button className="homepage-btn">Log-In</button>
          </div>
        </section>
        <section className="page-section parallax parallax-2" id="services">
          <div className="container">
            <div className="text-center">
              <h2 className="section-heading text-uppercase">Services</h2>
              <h3 className="section-subheading text-muted">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae
                non eum quod dignissimos nisi alias iusto quibusdam, fugit
                ducimus similique deleniti ex esse magni recusandae quam
                mollitia maiores itaque pariatur quae consequatur voluptas
                aliquam molestiae fugiat vel. Dolores, distinctio. Tempore omnis
                quo fugiat, sit itaque ducimus aut. Voluptates laudantium
                consequatur voluptate quos molestias adipisci, asperiores
                debitis provident tempore illo non quis pariatur facilis hic
                totam odio quisquam nulla libero quas saepe, consectetur
                aspernatur veritatis? Facilis enim, dolore porro harum
                recusandae saepe atque quaerat quae nostrum corrupti, et,
                deserunt voluptatem sit quia quod eveniet magni ducimus unde eum
                cupiditate officia nam.
              </h3>
            </div>
            <div className="row text-center">
              {/* E-Commerce */}
              <div className="col-md-4">
                <span className="fa-stack fa-4x">
                  <i className="fas fa-solid fa-child fa-stack-2x text-secondary"></i>
                </span>
                <h4 className="my-3">Kurse für Kinder</h4>
                <p className="text-muted">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Minima maxime quam architecto quo inventore harum ex magni,
                  dicta impedit.
                </p>
              </div>
              {/* Responsive Design */}
              <div className="col-md-4">
                <span className="fa-stack fa-4x">
                <i className="fa-solid fa-people-line"></i>
                </span>
                <h4 className="my-3">Kurse für Gruppen und Familien</h4>
                <p className="text-muted">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Minima maxime quam architecto quo inventore harum ex magni,
                  dicta impedit.
                </p>
              </div>
              {/* Web Security */}
              <div className="col-md-4">
                <span className="fa-stack fa-4x">
                  <i className="fas fa-circle fa-stack-2x text-primary"></i>
                </span>
                <h4 className="my-3">Privatkurse & Weinachtsevents</h4>
                <p className="text">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Minima maxime quam architecto quo inventore harum ex magni,
                  dicta impedit.
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* Other sections go here */}
      </div>
      <footer className="footer py-4">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-4 text-lg-start">
              Copyright &copy; Your Website 2023
            </div>
            <div className="col-lg-4 my-3 my-lg-0">
              <a
                className="btn btn-dark btn-social mx-2"
                href="#!"
                aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a
                className="btn btn-dark btn-social mx-2"
                href="#!"
                aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                className="btn btn-dark btn-social mx-2"
                href="#!"
                aria-label="LinkedIn">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
            <div className="col-lg-4 text-lg-end">
              <a className="link-dark text-decoration-none me-3" href="#!">
                Privacy Policy
              </a>
              <a className="link-dark text-decoration-none" href="#!">
                Terms of Use
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default HomePage;
