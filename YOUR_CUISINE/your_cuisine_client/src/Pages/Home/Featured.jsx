import { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import img1 from "../../assets/home/chef.jpg";
import img2 from "../../assets/home/chef2.jpg";
import img3 from "../../assets/home/chef3.jpg";
import img4 from "../../assets/home/chef4.jpg";

import SectionTitle from "../Share/SectionTitle";
const images = [img1, img2, img3, img4];
const chefs = ["Chef Lorenzo", "Madame Celeste", "Chef Bruno", "Chef Emilia"];
const chefsIntro = [
  "Welcome to my kitchen! I’m Chef Lorenzo, a master of Italian flavors with a modern twist. From hand-rolled pastas to delicate sauces, I believe every dish tells a story. Let’s create something unforgettable together.",
  "Bonjour! I am Madame Celeste, your guide to the art of fine French cuisine. With a passion for precision and elegance, I transform simple ingredients into gourmet experiences. Bon appétit!",
  "Hey there! I’m Chef Bruno, your friendly neighborhood grill master. I bring bold flavors, smoky perfection, and a dash of fun to every plate. Whether it’s BBQ or bistro, I’ve got you covered.",
  "Hello! I’m Chef Emilia, specializing in farm-to-table freshness. My mission is to craft wholesome, vibrant meals using the best local ingredients. Let’s celebrate the beauty of natural flavors together.",
];

const Featured = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    console.log("Next slide clicked");
    setCurrent((current + 1) % images.length);
  };

  const prevSlide = () => {
    console.log("Previous slide clicked");
    setCurrent((current - 1 + images.length) % images.length);
  };
  return (
    <div
      className=" bg-fixed  text-white 
          bg-center bg-cover  transition-all duration-2000 ease-in-out"
      style={{ backgroundImage: `url(${images[current]})` }}
    >
      <div className=" bg-black/70 bg-opacity-50 pt-5">
        <SectionTitle heading="OUR CHEFS" ></SectionTitle>
        <div className="md:flex justify-center items-center pb-20 pt-5 px-36 ">
          <div className="">
            <img
              src={images[current]}
              alt=""
              className="w-400 h-150 object-cover rounded-md flex-shrink-0 pr-4 transition-all duration-2000 ease-in-out"
            />
          </div>
          <div className="md:ml-10 ">
            <div>
              <p className="uppercase">{chefs[current]}</p>
              <p className="h-50 w-50">{chefsIntro[current]}</p>
            </div>

            <div className="flex items-center justify-center mt-8 space-x-4">
              <button
                onClick={prevSlide}
                style={{
                  width: "40px",
                  height: "40px",
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontSize: "20px",
                  transition: "0.3s",
                  cursor: "pointer",
                }}
              >
                <FaArrowLeft />
              </button>
              <button
                onClick={nextSlide}
                style={{
                  width: "40px",
                  height: "40px",
                  backgroundColor: "rgba(255, 255, 255, 0.15)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontSize: "20px",
                  transition: "0.3s",
                  cursor: "pointer",
                }}
              >
                <FaArrowRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Featured;
