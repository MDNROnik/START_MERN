import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "../../App.css"
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import img from "../../assets/home/testi.jpg"; // Adjust the path as necessary
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import SectionTitle from "../Share/SectionTitle";
const Tesimonials = () => {
  const [reviews, setReviews] = useState([]);
  const axiosPublic = useAxiosPublic();
  useEffect(() => {
    // axiosPublic.get("/review").then((res) => {
    //   setReviews(res.data);
    // });
    fetch("/reviews.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch");
        }
        return response.json();
      })
      .then((data) => setReviews(data))
      .catch((error) => console.error("Error loading JSON:", error));
  }, []);
  console.log(reviews);

  return (
    // <section>
    //   <section className="bg-[#00222B] text-white py-10 px-6 flex flex-col ">
    //     {/* Text Content */}
    //     <SectionTitle heading={"Testimonials"}></SectionTitle>
    //     <div>
    //       <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
    //         {reviews.map((review) => (
    //           <SwiperSlide key={review._id} className="max-w-max">
    //             <div className=" flex flex-col items-center mx-24 my-2 transition-all duration-2000">
    //               <Rating
    //                 style={{ maxWidth: 180 }}
    //                 value={review.rating}
    //                 readOnly
    //               />
    //               <p className="text-4xl text-[#bcaf87] mt-3">“</p>
    //               <p className="text-lg leading-relaxed font-light text-[#bcaf87]">
    //                 {review.details}
    //               </p>
    //               <p className="text-4xl text-[#bcaf87] mt-3">“</p>
    //               <h3 className="mt-8 font-medium text-[#bcaf87]">
    //                 {review.name}
    //               </h3>
    //             </div>
    //           </SwiperSlide>
    //         ))}
    //       </Swiper>
    //     </div>
    //     {/* Image Content */}
    //     <div className="flex  justify-center">
    //       <img
    //         src={img} // Replace with the actual image path
    //         alt={reviews[0]?.name}
    //         className="w-70 bg-black h-70 object-cover rounded-md "
    //       />
    //     </div>
    //   </section>
    // </section>
    <section>
      <section className="bg-[#00222B] text-white py-10 px-4 md:px-10 lg:px-20 flex flex-col gap-10">
        {/* Section Title */}
        <SectionTitle heading="Testimonials" />

        {/* Swiper Content */}
        <div>
          <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
            {reviews.map((review) => (
              <SwiperSlide key={review._id} className="px-4">
                <div className="flex flex-col items-center mx-auto max-w-2xl text-center transition-all duration-1000">
                  <Rating
                    style={{ maxWidth: 180 }}
                    value={review.rating}
                    readOnly
                  />
                  <p className="text-4xl text-[#bcaf87] ">“</p>
                  <p className="text-base md:text-lg leading-relaxed font-light text-[#bcaf87] px-2 sm:px-6">
                    {review.details}
                  </p>
                  <p className="text-4xl text-[#bcaf87] mt-3">“</p>
                  <h3 className="mt-6 font-medium text-[#bcaf87] text-sm md:text-base">
                    {review.name}
                  </h3>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Image Content */}
        <div className="flex justify-center">
          <img
            src={img}
            alt={reviews[0]?.name}
            className="w-40 h-40 sm:w-52 sm:h-52 md:w-60 md:h-60 lg:w-72 lg:h-72 object-cover rounded-md bg-black"
          />
        </div>
      </section>
    </section>
  );
};

export default Tesimonials;
