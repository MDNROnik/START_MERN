import { useState } from "react";
import { LiaChevronDownSolid } from "react-icons/lia";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router-dom";
import img1 from "../../assets/home/1.jpg";
import img2 from "../../assets/home/2.jpg";
import img3 from "../../assets/home/3.jpg";
import img4 from "../../assets/home/4.jpg";
import img5 from "../../assets/home/5.jpg";
import img6 from "../../assets/home/6.jpg";
const images = [img1, img2, img3, img4, img5, img6];
const Banner = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    // console.log("Next slide clicked");
    setCurrent((current + 1) % images.length);
  };

  const prevSlide = () => {
    // console.log("Previous slide clicked");
    setCurrent((current - 1 + images.length) % images.length);
  };

  // console.log("Current slide index:", current);

  return (
    <div className="bg-black/30">
      <div
        className="relative w-full h-screen bg-center bg-cover flex items-center justify-center transition-all duration-700  "
        style={{
          backgroundImage: `url(${images[current]})`,
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0  bg-black/40 bg-opacity-50"></div>

        {/* Content */}
        <div className="relative z-10 text-white text-center">
          <div className="flex items-center justify-center mb-4 text-sm tracking-widest uppercase">
            <span className="mx-4">←</span>
            <span>Being True</span>
            <span className="mx-4">→</span>
          </div>

          <h1 className="text-7xl font-bold font-playfair mb-8">YOUR CUSINE</h1>

          <div className="flex items-center justify-center space-x-6">
            {/* Left Text */}
            <span className="text-white font-semibold tracking-widest">
              <span>
                <Link className="mx-4" to="/menu">
                  VIEW
                </Link>
              </span>
            </span>

            {/* Diamond Shape */}
            <div className="relative w-20 h-20">
              <div className="absolute inset-0 transform rotate-45 border-2 border-white"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="transform -rotate-45">
                  <LiaChevronDownSolid className="text-white w-6 h-6 transform -rotate-316" />
                </div>
              </div>
            </div>

            {/* Right Text */}
            <span className="text-white font-semibold tracking-widest">
              <span>
                <Link className="mx-4" to={`/order/0`}>
                  MORE
                </Link>
              </span>
            </span>
          </div>
        </div>

        {/* Navigation */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-3xl z-20"
        >
          &#8592;
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-3xl z-20"
        >
          &#8594;
        </button>
      </div>
    </div>
  );
};

export default Banner;
