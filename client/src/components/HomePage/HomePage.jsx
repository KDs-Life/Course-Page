import { Container, Row, Col, Button } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
// import "./HomePage.css";

function HomePage() {
  return (
    <>
      {/* Add Carousel component here */}
      <Carousel slide={false}>
        <Carousel.Item>
          <img src="/images/course1.jpg" alt="First slide" />
          <Carousel.Caption>
            <h3>Willkommen bei SkiFuturistisch</h3>
            <p>Erleben Sie die Zukunft des Skifahrens.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img src="/images/course2.jpg" alt="Second slide" />
          <Carousel.Caption>
            <h3>Technologisch fortschrittliche Kurse</h3>
            <p>
              Unsere Kurse nutzen die neuesten Technologien, um Ihr Skierlebnis
              zu optimieren.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img src="/images/course3.jpg" alt="Third slide" />
          <Carousel.Caption>
            <h3>Kontaktieren Sie uns</h3>
            <p>
              Wenn Sie Fragen haben oder buchen möchten, sind wir gerne für Sie
              da.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img src="/images/course4.jpg" alt="Third slide" />
          <Carousel.Caption>
            <h3>Kontaktieren Sie uns</h3>
            <p>
              Wenn Sie Fragen haben oder buchen möchten, sind wir gerne für Sie
              da.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img src="/images/course5.jpg" alt="Third slide" />
          <Carousel.Caption>
            <h3>Kontaktieren Sie uns</h3>
            <p>
              Wenn Sie Fragen haben oder buchen möchten, sind wir gerne für Sie
              da.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img src="/images/course6.jpg" alt="Third slide" />
          <Carousel.Caption>
            <h3>Kontaktieren Sie uns</h3>
            <p>
              Wenn Sie Fragen haben oder buchen möchten, sind wir gerne für Sie
              da.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img src="/images/course7.jpg" alt="Third slide" />
          <Carousel.Caption>
            <h3>Kontaktieren Sie uns</h3>
            <p>
              Wenn Sie Fragen haben oder buchen möchten, sind wir gerne für Sie
              da.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img src="/images/course8.jpg" alt="Third slide" />
          <Carousel.Caption>
            <h3>Kontaktieren Sie uns</h3>
            <p>
              Wenn Sie Fragen haben oder buchen möchten, sind wir gerne für Sie
              da.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img src="/images/course9.jpg" alt="Third slide" />
          <Carousel.Caption>
            <h3>Kontaktieren Sie uns</h3>
            <p>
              Wenn Sie Fragen haben oder buchen möchten, sind wir gerne für Sie
              da.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      {/* Add Container, Row, and Col components here */}
      <Container>
        <Row>
          <Col>
            <h1>Willkommen bei Ski</h1>
            <p>Entdecken Sie die Zukunft des Skifahrens.</p>
            <Button variant="primary">Unsere Kurse</Button>
          </Col>
          <Col>
            <img src="https://placehold.co/400x400" alt="Skiing Image" />
          </Col>
        </Row>
      </Container>

      <footer>
        <Row>
          <Col>
            <h2>Kontaktieren Sie uns</h2>
            <p>
              Wir helfen Ihnen gerne bei Fragen oder Buchungen. Kontaktieren Sie
              uns über die folgenden Informationen:
            </p>
            <p>Email: info@</p>
            <p>Telefon: +12</p>
          </Col>
          <Col>
            <img src="https://placehold.co/400x400" alt="Skiing Image" />
          </Col>
        </Row>
      </footer>
    </>
  );
}

export default HomePage;
