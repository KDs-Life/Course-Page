import ActivitiesCurrent from "../ActivityPage/ActivitiesCurrent";

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
            Explore the world of skiing with our comprehensive ski website. Find
            information on top ski destinations, gear reviews, expert tips, and
            more. Whether you're a beginner or a seasoned pro, we've got you
            covered for all your skiing needs.
          </p>
        </section>
        <section className="service-section">
          <div>
          <img src="https://i.postimg.cc/yYKT7gFs/pngwing-com-1.png" alt="" />
              <h3>Ski-Tour</h3>
           
            <p>Our templates are updated regularly so they don't break.</p>
          </div>

          <div>
            <i className="fas fa-4x fa-gem text-primary mb-3 sr-icon-1">
              <h3>Adult learning courses</h3>
            </i>
            <p>Our templates are updated regularly so they don't break.</p>
          </div>

          <div>
            <i className="fas fa-4x fa-gem text-primary mb-3 sr-icon-1">
              <h3>KEINE AHNUNG</h3>
            </i>
            <p>Our templates are updated regularly so they don't break.</p>
          </div>
        </section>
      </div>
    </>
  );
}

export default HomePage;
