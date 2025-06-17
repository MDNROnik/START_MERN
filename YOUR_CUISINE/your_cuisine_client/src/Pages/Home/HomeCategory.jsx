import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/pagination";
import slide1 from "../../assets/home/slide1.jpg";
import slide2 from "../../assets/home/slide2.jpg";
import slide3 from "../../assets/home/slide3.jpg";
import slide4 from "../../assets/home/slide4.jpg";
import slide5 from "../../assets/home/slide5.jpg";
import slide6 from "../../assets/home/slide6.jpg";
import SectionTitle from "../Share/SectionTitle";

const images = [slide1, slide2, slide3, slide4, slide5, slide6];

const HomeCategory = () => {
  const [startIndex, setStartIndex] = useState(0);
  const ITEMS_VISIBLE = 3;
  // console.log(images.length);

  const prev = () => {
    setStartIndex((prevIndex) =>
      prevIndex === 0 ? images.length - ITEMS_VISIBLE : prevIndex - 1
    );
  };

  const next = () => {
    setStartIndex((prevIndex) =>
      prevIndex + ITEMS_VISIBLE >= images.length ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="">
      <SectionTitle heading={"Origins and Inspirations"}></SectionTitle>
      <section className=" text-white py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-10">
          {/* Left: Carousel + Heading */}
          <div className="md:w-2/3">
            {/* Carousel */}
            <div className="relative overflow-hidden">
              <div
                className=" flex transition-transform duration-1000 ease-in-out"
                style={{
                  width: `${(images.length * 100) / ITEMS_VISIBLE}%`,
                  transform: `translateX(-${
                    (100 / images.length) * startIndex
                  }%)`,
                }}
              >
                {images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`images ${i}`}
                    className="w-[20%] h-[360px] object-cover rounded-md flex-shrink-0 pr-4"
                  />
                ))}
              </div>

              {/* Navigation buttons */}
              <button
                onClick={prev}
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/50 p-2 text-white rounded-full hover:bg-black z-10"
              >
                <FaChevronLeft />
              </button>
              <button
                onClick={next}
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/50 p-2 text-white rounded-full hover:bg-black z-10"
              >
                <FaChevronRight />
              </button>
            </div>
          </div>

          {/* Right: Description */}
          <div className="text-[#bcaf87] top-1/2 md:w-1/3 md:h-1/3 text-sm md:text-base leading-relaxed">
            <p className="mb-6 mt-8">
              We take pride in providing exceptional service, ensuring your
              every need is met with a smile. Our dedicated staff is here to
              guide you through our menu, recommend pairings, and make your
              dining experience truly exceptional.
            </p>
            <button className="border border-[#bcaf87] px-6 py-2 hover:bg-[#bcaf87]  hover:text-[#07252d] transition">
              <Link to="/menu">Our Menu</Link>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeCategory;
