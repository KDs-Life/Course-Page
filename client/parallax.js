
document.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const parallaxSpeed = 0.5;
  
    const parallaxElements = document.querySelectorAll(".parallax");
    parallaxElements.forEach((element) => {
      const offset = element.offsetTop;
      const posY = (offset - scrollTop) * parallaxSpeed;
      element.style.backgroundPosition = `center ${posY}px`;
    });
  });
  