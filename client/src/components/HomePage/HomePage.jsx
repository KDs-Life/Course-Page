// import { Container, Row, Col, Button } from "react-bootstrap";
// import Carousel from "react-bootstrap/Carousel";
import { Button } from "react-bootstrap";
import "./HomePage.css";

function HomePage() {
  return (
    <>
      <div className="wrapper-container-homepage">
        <section className="masthead">
          <div className="container">
            <div className="masthead-subheading">
              Willkommen auf der Skii-Erlebnis Seite
            </div>
            <div className="masthead-heading ">Lass dich verzaubern!!</div>
            <Button className="homepage-btn">Log-In</Button>
          </div>
        </section>
        <section className="page-section">
          <div className="container">
            <div className="text-center">
              <h2 className="section-heading">Services</h2>
              <h3 className="section-subheading">
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
              <div className="col-md-4">
                <span className="fa-stack fa-4x">
                  <i className="fas fa-solid fa-child fa-stack-2x text-secondary"></i>
                </span>
                <h4 className="my-3">Kurse für Kinder</h4>
                <p className="">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Minima maxime quam architecto quo inventore harum ex magni,
                  dicta impedit.
                </p>
              </div>

              <div className="col-md-4">
                <span className="fa-stack fa-4x">
                  <i className="fa-solid fa-people-line"></i>
                </span>
                <h4 className="my-3">Kurse für Gruppen und Familien</h4>
                <p className="">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Minima maxime quam architecto quo inventore harum ex magni,
                  dicta impedit.
                </p>
              </div>

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
      <footer className="footer-wrapper">
        <div className="footer-box">
          <div>Copyright &copy; Your Website 2023</div>
          <div className="footer-btn">
            <Button>
              <a className="btn" href="#!" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
            </Button>
            <Button>
              <a className="btn" href="#!" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
            </Button>
            <Button>
              <a className="btn" href="#!" aria-label="LinkedIn">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </Button>
          </div>
          <div className="footer-link">
            <a className="" href="#!">
              Privacy Policy
            </a>
            <a className="" href="#!">
              Terms of Use
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}

export default HomePage;
