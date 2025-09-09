import { useEffect } from "react";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Carousel } from "bootstrap"; // Import Carousel directly
import slider1 from "/src/assets/slider1.jpg";
import slider2 from "/src/assets/slider2.jpg";
import slider3 from "/src/assets/slider3.jpg";

const Slider = () => {
  useEffect(() => {
    const carouselElement = document.getElementById("carouselExampleFade");
    if (carouselElement) {
      const carousel = new Carousel(carouselElement, {
        interval: 3000,
        ride: "carousel",
      });
      carousel.cycle(); // Start cycling immediately
    }
  }, []);
  return (
    <div
      id="carouselExampleFade"
      className="carousel slide carousel-fade"
      data-bs-ride="carousel"
      data-bs-interval="3000"
    >
      <div className="carousel-inner">
        <div className="carousel-item active" style={{ height: "600px" }}>
          <img src={slider1} className="d-block w-100" alt="First slide" />
        </div>
        <div className="carousel-item" style={{ height: "600px" }}>
          <img src={slider2} className="d-block w-100" alt="Second slide" />
        </div>
        <div className="carousel-item" style={{ height: "600px" }}>
          <img src={slider3} className="d-block w-100" alt="Third slide" />
        </div>
      </div>

      {/* Controls */}
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleFade"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleFade"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Slider;
