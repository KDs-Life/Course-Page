import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer>
      <div className="footer-wrapper">
        <div className="impressum">
          <a href="#">Impressium</a>
          <p>© 2021 - All rights reserved</p>
        </div>

        <div className="social-media">
          <a href="#">Facebook</a>
          <a href="#">Twitter</a>
          <a href="#">Instagram</a>
        </div>

        <div className="terms-privacy">
          <a href="#">Terms of Service</a>
          <a href="#">Datenschutz</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
