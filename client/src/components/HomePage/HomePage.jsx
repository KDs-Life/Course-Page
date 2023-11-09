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
            <img src="/images/skicourse_icon.png" alt="ski course" />
            <h3>Ski-Tour</h3>
            <p>
              Are you ready for an exhilarating adventure in the heart of the
              mountains? Join our Standard Ski Tours for a memorable journey
              through the snow-covered slopes. We offer an exceptional skiing
              experience that's perfect for individuals
            </p>
          </div>

          <div>
            <img src="images/team_icon.png" alt="group ski tour" />
            <h3>Group Tour</h3>
            <p>
              Are you ready to embark on an unforgettable adventure in the snowy
              embrace of the mountains? Look no further than our Group Ski
              Tours! We specialize in curating the ultimate skiing experience
              for everyone, from friends to family and even coworkers, blending
              excitement and camaraderie with the breathtaking beauty of the
              slopes.
            </p>
          </div>

          <div>
            <img
              src="images/privatelesson_icon.png"
              alt="private ski lessons"
            />
            <h3>Our Private Ski Courses</h3>
            <p>
              Looking to take your skiing abilities to the next level? Our
              Private Ski Courses are the perfect solution for personalized
              coaching and rapid improvement on the slopes.
            </p>
          </div>
        </section>
      </div>
    </>
  );
}

export default HomePage;
